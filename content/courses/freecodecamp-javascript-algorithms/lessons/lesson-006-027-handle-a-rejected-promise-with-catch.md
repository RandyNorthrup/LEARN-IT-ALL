---
id: lesson-006-027
title: Handle a Rejected Promise with catch
chapterId: chapter-06
order: 27
duration: 5
objectives:
  - Handle a Rejected Promise with catch
---

# Handle a Rejected Promise with catch

`catch` is the method used when your promise has been rejected. It is executed immediately after a promise's `reject` method is called. Here’s the syntax:

```js
myPromise.catch(error => {
  
});
```

`error` is the argument passed in to the `reject` method.

## Instructions

Add the `catch` method to your promise. Use `error` as the parameter of its callback function and log `error` to the console.

## Starter Code

```html
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to false to represent an unsuccessful response from a server
  let responseFromServer = false;
    
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

## Hints

1. You should call the `catch` method on the promise.
2. Your `catch` method should have a callback function with `error` as its parameter.
3. You should log `error` to the console.

## Solution

```html
```js
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to false to represent an unsuccessful response from a server
  let responseFromServer = false;
    
  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
});

makeServerRequest.catch(error => {
  console.log(error);
});
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 5cdafbe72913098997531682*
