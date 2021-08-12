# TypeScript Social Network

With the option to use TypeScript for the Social Network, I've made this as a resource which can be referenced by teachers. It's open to any comments, criticism or recommended improvements. Some of the decisions have been made on a subjective basis, though I will explain the reasoning behind them.

Each part of the project has it's own branch, though the final product has been pushed to main. There were some imperfections in the earlier parts which have been corrected later on and will be visible only in main, though these were small improvements to TS interfaces and nothing significant.

As far as possible I've tried to incorporate React-TypeScript best practises as outlined in the [typescript-cheatsheets](https://github.com/typescript-cheatsheets/react) repo on Github. This is a community built reference for those using TypeScript.

Where JSX is returned I have used the .tsx extension. VS Code offers more accurate TS support in a React component when the .tsx extension is used.

## CSS

I'll cover this first as it doesn't affect TS and is less important. The styling done is relatively basic and not that different to what is in the course material.

I've used Styled Components because:

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

Becomes this:

## Function Components

When typing a React function component, the recommendation is to avoid using the React.FC type. So code like this has not been used:

![React.FC](/md-images/react-fc.png)

The criticism of React.FC is that is assumes that all compoments receive a children prop, but that is not always the case. Instead the recommendation is that the component type be a function which returns a JSX element.

```ts
type FunctionComponent = () => JSX.Element;
```

Fortinately TypeScript is clever enough to simply infer this from the code, and as a result none of the function components have been explicitly typed.

![FC implicitly typed](/md-images/returned-jsx-element.png)

It is interesting to note that should you choose to use the React.FC custom type, it is not necessary to import React in order to use this. This lives within a TypeScript namespace called React.

### Prop Types

When using the React.FC custom component type, a generic type can be accepted for typing any component props received.

![Prop types with React.FC](/md-images/react-fc-prop-types.png)

Since this custom type has not been used anywhere, props have been typed using the following syntax:

![Prop types without React.FC](/md-images/react-jsx-prop-types.png)

### State Types

TypeScript is very good at infering basic types where useState has been used

![TS infering FC state type](/md-images/useState-string.png)

![useState value is a string](/md-images/useState-number.png)

However it struggles with anything more complex than the most basic types. An example of this would be the FindPeople component. A user search returns an array of objects, each object representing a different user. TypeScript is not capable of infering these types. In this scenario I have typed one user.

![User interface](/md-images/user-interface.png)

You can then inform TypeScript that the value of this item in state is an array of users like this:

![Array of users](/md-images/typing-users-array.png)

Rather than differentiate between state types which can be inferred and those which can, every useState has been explicitly typed.

![Every useState is explicitly typed](/md-images/typing-useState.png)

Where an item in state is initialised as null, a union type can be used to accomodate this.

![User array union type](/md-images/user-union-type.png)

## Class Components
