---
id: lesson-015-003
title: Define a Redux Action
chapterId: chapter-15
order: 3
duration: 5
objectives:
  - Define a Redux Action
---

# Define a Redux Action

Since Redux is a state management framework, updating state is one of its core tasks. In Redux, all state updates are triggered by dispatching actions. An action is simply a JavaScript object that contains information about an action event that has occurred. The Redux store receives these action objects, then updates its state accordingly. Sometimes a Redux action also carries some data. For example, the action carries a username after a user logs in. While the data is optional, actions must carry a `type` property that specifies the 'type' of action that occurred.

Think of Redux actions as messengers that deliver information about events happening in your app to the Redux store. The store then conducts the business of updating state based on the action that occurred.

## Instructions

Writing a Redux action is as simple as declaring an object with a type property. Declare an object `action` and give it a property `type` set to the string `'LOGIN'`.

## Starter Code

```html
// Define an action here:
```

## Hints

1. An `action` object should exist.
2. The `action` object should have a key property `type` with value `LOGIN`.

## Solution

```html
```js
const action = {
  type: 'LOGIN'
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403614d*
