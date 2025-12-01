---
id: lesson-015-005
title: Dispatch an Action Event
chapterId: chapter-15
order: 5
duration: 5
objectives:
  - Dispatch an Action Event
---

# Dispatch an Action Event

`dispatch` method is what you use to dispatch actions to the Redux store. Calling `store.dispatch()` and passing the value returned from an action creator sends an action back to the store.

Recall that action creators return an object with a type property that specifies the type of action that has occurred. Then the method dispatches an action object to the Redux store. Based on the previous challenge's example, the following lines are equivalent, and both dispatch the action of type `LOGIN`:

```js
store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' });
```

## Instructions

The Redux store in the code editor has an initialized state that's an object containing a `login` property currently set to `false`. There's also an action creator called `loginAction()` which returns an action of type `LOGIN`. Dispatch the `LOGIN` action to the Redux store by calling the `dispatch` method, and pass in the action created by `loginAction()`.

## Starter Code

```html
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
```

## Hints

1. Calling the function `loginAction` should return an object with `type` property set to the string `LOGIN`.
2. The store should be initialized with an object with property `login` set to `false`.
3. The `store.dispatch()` method should be used to dispatch an action of type `LOGIN`.

## Solution

```html
```js
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

store.dispatch(loginAction());
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403614f*
