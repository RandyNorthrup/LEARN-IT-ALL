---
id: lesson-001-009
title: Get Route Parameter Input from the Client
chapterId: chapter-01
order: 9
duration: 5
objectives:
  - Get Route Parameter Input from the Client
---

# Get Route Parameter Input from the Client

When building an API, we have to allow users to communicate to us what they want to get from our service. For example, if the client is requesting information about a user stored in the database, they need a way to let us know which user they're interested in. One possible way to achieve this result is by using route parameters. Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the `req.params` object.

<blockquote>route_path: '/user/:userId/book/:bookId'<br>actual_request_URL: '/user/546/book/6754' <br>req.params: {userId: '546', bookId: '6754'}</blockquote>

## Instructions

Build an echo server, mounted at the route `GET /:word/echo`. Respond with a JSON object, taking the structure `{echo: word}`. You can find the word to be repeated at `req.params.word`. You can test your route from your browser's address bar, visiting some matching routes, e.g. `your-app-rootpath/freecodecamp/echo`.

## Hints

1. Test 1 : Your echo server should repeat words correctly
2. Test 2 : Your echo server should repeat words correctly

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb2367417b2b2512bf5*
