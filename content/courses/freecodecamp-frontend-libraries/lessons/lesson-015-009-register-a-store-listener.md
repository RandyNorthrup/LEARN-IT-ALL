---
id: lesson-015-009
title: Register a Store Listener
chapterId: chapter-15
order: 9
duration: 5
objectives:
  - Register a Store Listener
---

# Register a Store Listener

Another method you have access to on the Redux `store` object is `store.subscribe()`. This allows you to subscribe listener functions to the store, which are called whenever an action is dispatched against the store. One simple use for this method is to subscribe a function to your store that simply logs a message every time an action is received and the store is updated.

## Instructions

Write a callback function that increments the global variable `count` every time the store receives an action, and pass this function in to the `store.subscribe()` method. You'll see that `store.dispatch()` is called three times in a row, each time directly passing in an action object. Watch the console output between the action dispatches to see the updates take place.

## Starter Code

```html
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// Global count variable:
let count = 0;

// Change code below this line

// Change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
```

## Hints

1. Dispatching the `ADD` action on the store should increment the state by `1`.
2. There should be a listener function subscribed to the store using `store.subscribe`.
3. The `store.subscribe` should receive a function.
4. The function passed to `store.subscribe` should not be called.
5. The callback to `store.subscribe` should also increment the global `count` variable as the store is updated.

## Solution

```html
```js
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);
 let count = 0;
// Change code below this line

store.subscribe( () =>
 {
 count++;
 }
);

// Change code above this line

store.dispatch({type: ADD});
store.dispatch({type: ADD});
store.dispatch({type: ADD});
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036153*
