---
id: lesson-006-026
title: Handle a Fulfilled Promise with then
chapterId: chapter-06
order: 26
duration: 5
objectives:
  - Handle a Fulfilled Promise with then
---

# Handle a Fulfilled Promise with then

Promises are most useful when you have a process that takes an unknown amount of time in your code (i.e. something asynchronous), often a server request. When you make a server request it takes some amount of time, and after it completes you usually want to do something with the response from the server. This can be achieved by using the `then` method.

```js
Promise.prototype.then(onFulfilled, onRejected)
```

The `then` method schedules callback functions for the eventual completion of a Promise - either fulfillment or rejection. One of the `onFulfilled` and `onRejected` handlers will be executed to handle the current promise's fulfillment or rejection. When the promise is fulfilled with `resolve` the `onFulfilled` handler is called.

```js
myPromise.then(result => {
  
});
```

`result` comes from the argument given to the `resolve` method.

## Instructions

Add the `then` method to your promise. Use `result` as the parameter of its callback function and log `result` to the console.

## Starter Code

```html
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to true to represent a successful response from a server
  let responseFromServer = true;
    
  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});
```

## Hints

1. You should call the `then` method on the promise.
2. Your `then` method should have a callback function with `result` as its parameter.
3. You should log `result` to the console.

## Solution

```html
```js
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to true to represent a successful response from a server
  let responseFromServer = true;
    
  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
});
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 5cdafbd72913098997531681*
