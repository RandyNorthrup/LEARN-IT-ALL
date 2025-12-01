---
id: lesson-001-010
title: Get Query Parameter Input from the Client
chapterId: chapter-01
order: 10
duration: 5
objectives:
  - Get Query Parameter Input from the Client
---

# Get Query Parameter Input from the Client

Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object `req.query`. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JavaScript, you can use specific methods to encode/decode these characters.

<blockquote>route_path: '/library'<br>actual_request_URL: '/library?userId=546&#x26;bookId=6754' <br>req.query: {userId: '546', bookId: '6754'}</blockquote>

## Instructions

Build an API endpoint, mounted at `GET /name`. Respond with a JSON document, taking the structure `{ name: 'firstname lastname'}`. The first and last name parameters should be encoded in a query string e.g. `?first=firstname&last=lastname`.

**Note:** In the following exercise you are going to receive data from a POST request, at the same `/name` route path. If you want, you can use the method `app.route(path).get(handler).post(handler)`. This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.

## Hints

1. Test 1 : Your API endpoint should respond with `{ "name": "Mick Jagger" }` when the `/name` endpoint is called with `?first=Mick&last=Jagger`
2. Test 2 : Your API endpoint should respond with `{ "name": "Keith Richards" }` when the `/name` endpoint is called with `?first=Keith&last=Richards`

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb2367417b2b2512bf6*
