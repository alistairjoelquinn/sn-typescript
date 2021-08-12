# TypeScript Social Network

With the option to use TypeScript for the Social Network, I've made this as a resource which can be referenced by teachers. It's open to any comments, criticism or recommended improvements. Some of the decisions have been made on a subjective basis, though I will explain the reasoning behind them.

Each Part of the project has it's own branch, though the final product has been pushed to main. There were some imperfections in the earlier parts which have been corrected later on and will be visible only in main, though these were small improvements to TS interfaces and nothing significant.

As far as possible I've tried to incorporate React-TypeScript best practises as outlined in the [typescript-cheatsheets](https://github.com/typescript-cheatsheets/react) repo on Github. This is a community built reference for those using TypeScript.

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

When typing a React function component, the recommendation is to avoid using the React.FC type.
![React.FC](/md-images/React-FC.png)
