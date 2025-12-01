---
id: lesson-001-002
title: Start a Working Express Server
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Start a Working Express Server
---

# Start a Working Express Server

In the first two lines of the file `myApp.js`, you can see how easy it is to create an Express app object. This object has several methods, and you will learn many of them in these challenges. One fundamental method is `app.listen(port)`. It tells your server to listen on a given port, putting it in running state. For testing reasons, we need the app to be running in the background so we added this method in the `server.js` file for you.

Let’s serve our first string! In Express, routes takes the following structure: `app.METHOD(PATH, HANDLER)`. METHOD is an http method in lowercase. PATH is a relative path on the server (it can be a string, or even a regular expression). HANDLER is a function that Express calls when the route is matched. Handlers take the form `function(req, res) {...}`, where req is the request object, and res is the response object. For example, the handler

```js
function(req, res) {
  res.send('Response String');
}
```

will serve the string 'Response String'.

## Instructions

Use the `app.get()` method to serve the string "Hello Express" to GET requests matching the `/` (root) path. Be sure that your code works by looking at the logs.

**Note:** All the code for these lessons should be added in between the few lines of code we have started you off with.

## Hints

1. Your app should serve the string 'Hello Express'

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb0367417b2b2512bee*
