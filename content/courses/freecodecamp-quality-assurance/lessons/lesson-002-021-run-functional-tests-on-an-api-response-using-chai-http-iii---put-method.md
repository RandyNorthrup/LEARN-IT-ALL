---
id: lesson-002-021
title: Run Functional Tests on an API Response using Chai-HTTP III - PUT method
chapterId: chapter-02
order: 21
duration: 5
objectives:
  - Run Functional Tests on an API Response using Chai-HTTP III - PUT method
---

# Run Functional Tests on an API Response using Chai-HTTP III - PUT method

As a reminder, this project is being built upon the following starter project  cloned from <a href="https://github.com/freeCodeCamp/boilerplate-mochachai/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

When you test a `PUT` request, you'll often send data along with it. The data you include with your `PUT` request is called the body of the request.

To send a `PUT` request and a JSON object to the `'/travellers'` endpoint, you can use `chai-http` plugin's `put` and `send` methods:

```js
chai
  .request(server)
  .keepOpen()
  .put('/travellers')
  .send({
    "surname": [last name of a traveller of the past]
  })
  ...
```

And the route responds with:

```json
{
  "name": [first name],
  "surname": [last name],
  "dates": [birth - death years]
}
```

See the server code for the different responses to the `'/travellers'` endpoint.

## Instructions

Within `tests/2_functional-tests.js`, alter the `'Send {surname: "Colombo"}'` test (`// #3`) and use the `put` and `send` methods to test the  `'/travellers'` endpoint.

Send the following JSON object with your PUT request:

```json
{
  "surname": "Colombo"
}
```

Check for the following within the `request.end` callback:

1.  The `status` should be `200`
2.  The `type` should be `application/json`
3.  The `body.name` should be `Cristoforo`
4.  The `body.surname` should be `Colombo`

Follow the assertion order above - we rely on it. Also, be sure to remove `assert.fail()` once complete.

## Hints

1. All tests should pass.
2. You should test for `res.status` to be 200.
3. You should test for `res.type` to be `'application/json'`.
4. You should test for `res.body.name` to be `'Cristoforo'`.
5. You should test for `res.body.surname` to be `'Colombo'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 587d824f367417b2b2512c5a*
