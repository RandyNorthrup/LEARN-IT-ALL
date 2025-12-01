---
id: lesson-002-022
title: Run Functional Tests on an API Response using Chai-HTTP IV - PUT method
chapterId: chapter-02
order: 22
duration: 5
objectives:
  - Run Functional Tests on an API Response using Chai-HTTP IV - PUT method
---

# Run Functional Tests on an API Response using Chai-HTTP IV - PUT method

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-mochachai/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

This exercise is similar to the previous one.

Now that you know how to test a `PUT` request, it's your turn to do it from scratch.

## Instructions

Within `tests/2_functional-tests.js`, alter the `'Send {surname: "da Verrazzano"}'` test (`// #4`) and use the `put` and `send` methods to test the  `'/travellers'` endpoint.

Send the following JSON object with your PUT request:

```json
{
  "surname": "da Verrazzano"
}
```

Check for the following within the `request.end` callback:

1.  The `status` should be `200`
2.  The `type` should be `application/json`
3.  The `body.name` should be `Giovanni`
4.  The `body.surname` should be `da Verrazzano`

Follow the assertion order above - we rely on it. Also, be sure to remove `assert.fail()` once complete.

## Hints

1. All tests should pass
2. You should test for `res.status` to be 200
3. You should test for `res.type` to be `'application/json'`
4. You should test for `res.body.name` to be `'Giovanni'`
5. You should test for `res.body.surname` to be `'da Verrazzano'`

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 587d824f367417b2b2512c5b*
