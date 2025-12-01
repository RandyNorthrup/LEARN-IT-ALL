---
id: lesson-015-002
title: Get State from the Redux Store
chapterId: chapter-15
order: 2
duration: 5
objectives:
  - Get State from the Redux Store
---

# Get State from the Redux Store

The Redux store object provides several methods that allow you to interact with it. For example, you can retrieve the current `state` held in the Redux store object with the `getState()` method.

## Instructions

The code from the previous challenge is re-written more concisely in the code editor. Use `store.getState()` to retrieve the `state` from the `store`, and assign this to a new variable `currentState`.

## Starter Code

```html
const store = Redux.createStore(
  (state = 5) => state
);

// Change code below this line
```

## Hints

1. The Redux store should have a value of 5 for the initial state.
2. A variable `currentState` should exist and should be assigned the current state of the Redux store.

## Solution

```html
```js
const store = Redux.createStore(
  (state = 5) => state
);

// Change code below this line
const currentState = store.getState();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403614c*
