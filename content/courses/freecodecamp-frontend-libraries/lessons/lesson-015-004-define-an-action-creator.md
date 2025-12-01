---
id: lesson-015-004
title: Define an Action Creator
chapterId: chapter-15
order: 4
duration: 5
objectives:
  - Define an Action Creator
---

# Define an Action Creator

After creating an action, the next step is sending the action to the Redux store so it can update its state. In Redux, you define action creators to accomplish this. An action creator is simply a JavaScript function that returns an action. In other words, action creators create objects that represent action events.

## Instructions

Define a function named `actionCreator()` that returns the `action` object when called.

## Starter Code

```html
const action = {
  type: 'LOGIN'
}
// Define an action creator here:
```

## Hints

1. The function `actionCreator` should exist.
2. Running the `actionCreator` function should return the `action` object.
3. The returned `action` should have a key property `type` with value `LOGIN`.

## Solution

```html
```js
const action = {
  type: 'LOGIN'
}
const actionCreator = () => {
  return action;
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403614e*
