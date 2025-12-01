---
id: lesson-015-016
title: Remove an Item from an Array
chapterId: chapter-15
order: 16
duration: 5
objectives:
  - Remove an Item from an Array
---

# Remove an Item from an Array

Time to practice removing items from an array. The spread operator can be used here as well. Other useful JavaScript methods include `slice()` and `concat()`.

## Instructions

The reducer and action creator were modified to remove an item from an array based on the index of the item. Finish writing the reducer so a new state array is returned with the item at the specific index removed.

## Starter Code

```html
const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);
```

## Hints

1. The Redux store should exist and initialize with a state equal to `[0,1,2,3,4,5]`
2. `removeItem` and `immutableReducer` both should be functions.
3. Dispatching the `removeItem` action creator should remove items from the state and should NOT mutate state.
4. assert(isFrozen)
assert.deepEqual(state_1, [0, 1, 2, 4, 5]) 
assert.deepEqual(state_2, [0, 1, 4, 5]) 
assert.deepEqual(state_3, [5])

## Solution

```html
```js
const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403615a*
