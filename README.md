# TypeScript Social Network

With the option to use TypeScript for the Social Network, I've made this as a resource which can be referenced by teachers. It's open to any comments, criticisms or recommendations. Some of the decisions have been made on a subjective basis, though I will explain the reasoning behind them.

Each part of the project has it's own branch, though the final product has been pushed to main. There were some imperfections in the earlier parts which have been corrected later on and will be visible only in main, though these were small improvements to TS interfaces and nothing significant.

As far as possible I've tried to incorporate React-TypeScript best practises as outlined in the [typescript-cheatsheets](https://github.com/typescript-cheatsheets/react) repo on Github. This is a community built reference for those using TypeScript.

Where JSX is returned I have used the .tsx extension. VS Code offers more accurate TS support in a React component when the .tsx extension is used.

## Type definitions

Typescript requires type definitions. When working in our own files we can make them ourselves, but what about the libraries we install? We need to install type definitions for these. Fortunately a lot of very popular libraries we use like `axios`, `redux` and `socket.io` come with them by default, but a lot of them need to installed manually.

The project directory students start with installs type definitions for `react-router-dom`, though in order to do this project with TypeScript they will also require type definitions for both `react` and `react-dom`. These can be additionally installed with the following.

```bash
    npm install --save-dev @types/react @types/react-dom
```

I have also added type definitions for Styled Components to use in this project

```bash
    npm install --save-dev @types/styled-components
```

## Function Components

When typing a React function component, the recommendation is to avoid using the React.FC type. So code like this has not been used:

```ts
const Profile: React.FC = () => {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;
```

The criticism of React.FC is that is assumes that all compoments receive a children prop, but that is not always the case. Instead the recommendation is that the component type be a function which returns a JSX element.

```ts
type FunctionComponent = () => JSX.Element;
```

Fortinately TypeScript is clever enough to simply infer this from the code, and as a result none of the function components have been explicitly typed. When hovering the mouse over the Profile constant, VS Code informs us that this is a function which returns a JSX element

![FC implicitly typed](/md-images/returned-jsx-element.png)

It is interesting to note that should you choose to use the React.FC custom type, it is not necessary to import React in order to use this. This lives within a TypeScript namespace called React.

### Prop Types

Had we been using the React.FC custom component type, a generic type can be accepted for typing any component props received.

![Prop types with React.FC](/md-images/react-fc-prop-types.png)

However, since this custom type has not been used anywhere, props have been typed using the following syntax:

![Prop types without React.FC](/md-images/react-jsx-prop-types.png)

### State Types

TypeScript is very good at infering basic types where useState has been used. When hovering the mouse over the name variable here, VS Code shows is this value is a string.

![TS infering FC state type](/md-images/useState-string.png)

Assigning it a value of any other type is not allowed.

![useState value is a string](/md-images/useState-number.png)

However it struggles with anything more complex than the most basic types. An example of this would be the FindPeople component. A user search returns an array of objects, each object representing a different user. TypeScript is not capable of infering these types. In this scenario I have typed one user.

```ts
export interface User {
    first: string;
    last: string;
    id: number;
    image: string;
}
```

You can then inform TypeScript that the value of this item in state is an array of users like this:

![Array of users](/md-images/typing-users-array.png)

Rather than differentiate between state types which can be inferred and those which can, every useState has been explicitly typed.

![Every useState is explicitly typed](/md-images/typing-useState.png)

Where an item in state is initialised as null, a union type can be used to accomodate this.

![User array union type](/md-images/user-union-type.png)

## Class Components

Class components accept 2 generic types. One for typing the component props, and another for typing state. These values can be passed like this.

![Typing a class component](/md-images/class-component-types.png)

In some of our class components we receive no props, though still have values in state to type. Since props types are the second generic type passed, a placeholder is needed for props which are not going to be received.

TypeScript doesn't like you to type something as an empty object, you have to be more specific than that. Functioning solutions to this problem are to use `any`, `null`, or `void`, though I have opted for `Record<string, never>` to indicate this is an object which will never be passed anything as this feels closer to what is actually happening.

## Creating complex interfaces

Some of the data we use in this project can involve large objects. Creating an interface for a large object can be a cumbersome process, though I have come up with a solution to this which is far less time consuming.

[jsonformatter.org](https://jsonformatter.org/json-to-typescript) will convert a JSON object into a TypeScript interface. Where nested objects exist, these will generate sub-interfaces which build the complete type.

![JSON Formatter](/md-images/jsonformatter.png)

In order to copy a complex object to the clip board as JSON I have been using the following code.

```ts
axios
    .get(`get-some-data`)
    .then(({ data }) => {
        window.prompt('', JSON.stringify(data));
        doSomething(data);
    })
    .catch(console.log);
```

This will open a prompt window where the input field is prepopulated with the JSON object and already highlighted. You can just `cmd + c` and past it into jsonformatter to get you TS interface. I know there are more recent ways of copying to the clipboard in JS but this one gave me the least problems and works in every browser.

## Events

Typing events requires you to be specific about the type of event which took place, and also the element on which it happened. This is necessary as different events on different elements will produce an event object containing slightly different values.

There are multiple locations where the application listens for a change event or a click event. Change events generally involve listening for a user input. The event object can be typed here using the `React.ChangeEvent` type. This accepts a generic type representing the element type. For an input field this would be an `HTMLInputElement`, so a typed event object would look like this.

```ts
handleChange(event: React.ChangeEvent<HTMLInputElement>) { }
```

A click event is considered to be of the `React.MouseEvent` type. If the element the user clicked on was a button, then a typed event object would look like this.

```ts
handleSubmit(event: React.MouseEvent<HTMLButtonElement>) { }
```

## Redux

Redux Thunk has been used for the action creators. There are two main considerations when typing this part of the project. The first one is how to type state, the second is how to type the action creators. Let's begin with state.

Defining state is important as you will use this type definition in multiple places. What needs to be defined is a structure of what state will look like, which can be referred to as IState, or initial state. In this project it will be a single object containing an array of users, and an array of chat comments.

In the FindPeople and Chat components, we have pre-existing type definitions for a single user and a single chat object. These have been imported so we can specify what the expected stucture of our state will be like this.

```ts
import { User } from '../FindPeople';
import { ChatMessage } from '../Chat';

export interface UserType extends User {
    accepted: boolean | null;
    friendshipId?: string;
}

export interface IState {
    users: UserType[];
    comments: ChatMessage[];
}

const initialState: IState = {
    users: [],
    comments: [],
};
```

Our reducer action object has been typed to allow anything to be recieved as the payload, though if necessary, a union type could be used to limit the possible values we can accept

```ts
interface Action {
    type: string;
    payload: any;
}
```

Our action creators have been typed using ThunkAction, imported from Redux Thunk. This accepts 4 generic types. The first and third of these are not needed, though we have passed RootState and AnyAction as the second and fourth. RootState can be exported from start.tsx like this:

```ts
const store = createStore(reducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export type RootState = ReturnType<typeof store.getState>;
```

Once imported we can create a custom type for typing each of our action creators like this:

```ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../start';
import { AnyAction } from 'redux';

type AppThunk = ThunkAction<Promise<any>, RootState, unknown, AnyAction>;
```

A completed action creator would look like this:

```ts
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../start';
import { UserType } from './reducer';

export type AppThunk = ThunkAction<Promise<any>, RootState, unknown, AnyAction>;

export const getFriendsList = (): AppThunk => async (dispatch) => {
    const { data } = (await axios
        .get('/friendship/friends-list')
        .catch((err) => console.log('err getting friends list: ', err))) as { data: UserType[] };
    dispatch({
        type: 'friends/get-friends-list',
        payload: {
            users: data,
        },
    });
};
```

Our final consideration in typing Redux, is typing useSelector and useDispatch. In order that these don't need to be typed every time they are used we can created custom hooks, and instead import these. They are located in a file called hooks.ts which lives in the redux directory.

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import type { RootState } from '../start';
import { IState } from './reducer';

export type ReduxDispatch = ThunkDispatch<IState, any, Action>;

export const useAppDispatch = (): ReduxDispatch => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Socket.io

Having already typed Redux, half of the work in typing `socket.io` is already done. The remainder is to update the socket.ts file as follows.

```ts
import { io, Socket } from 'socket.io-client';

import { ChatMessage } from '../Chat';
import { getMessages, chatMessage } from '../redux/actions';
import { ReduxDispatch } from '../redux/hooks';

export let socket: Socket;

export const init = ({ dispatch }: { dispatch: ReduxDispatch }) => {
    if (!socket) {
        socket = io();
        socket.on('chatMessages', (msgs: ChatMessage[]) => dispatch(getMessages(msgs)));
        socket.on('chatMessage', (msg: ChatMessage) => dispatch(chatMessage(msg)));
    }
};
```

We are typing 4 items here. The socket itself, the dispatch method, and the two values received from the server which are passed to our callback functions.

The socket can simply be typing using the `Socket` type imported from `socket.io`. THe dispatch method has been destructured from the store value passed to our `init` function, in order that we can type it using the custom `RedixDispatch` type we've exported from the hooks.ts file. Finally the ChatMessage interface, which we've used to type both incoming values, has been imported from the `Chat.tsx` file where it was created.

## CSS

The styling done is relatively basic and not that different to what is in the course material. I've used Styled Components because:

-   I like to have my styles scoped to each component
-   I like to have my CSS written in the same file that I am working in
-   I like to be able to write conditional CSS based on JavaScript values
-   I like to be able to use the SCSS syntax where it's possible to nest styles, or make use of ampersand eg..

```css
a {
    color: red;
    &:hover {
        color: white;
    }
}
```

One of the frustrations of Styled Components is that it generates a large alphanumeric for each of the element class names. When debugging in the dev tools it becomes almost impossible to tell which element is which. To overcome this problem I've used babel-plugin-styled-components as a babel plugin which prepends both the element and the file name to the alphanumeric making it clear which element is which.

This:

![Class names without babel SC plugin](/md-images/without-babel-loader.png)

Becomes this:

![Class names with babel SC plugin](/md-images/with-babel-loader.png)

## es-lint

I have found you get the most out of TypeScript when you have good feedback from VS Code. I began by opting for a much stricter set of es-lint rules, then as I encounter something I don't like I turn it off. I've found opting out of rules far easier than opting in. One of the big benefits of this is that I learn about coding best practises that I had no idea about.

You will find in the package.json that I have installed a few extra plugins to assist in linting. I've taken most of these from the Next.js Typescript setup because I've been happy with it. Some of the rules were too strict though and I have turned these off. You can see which rules have been customised in the .eslintrc file.
