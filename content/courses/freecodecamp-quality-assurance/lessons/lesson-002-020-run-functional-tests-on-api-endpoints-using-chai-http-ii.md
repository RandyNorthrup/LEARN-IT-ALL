---
id: lesson-002-020
title: Run Functional Tests on API Endpoints using Chai-HTTP II
chapterId: chapter-02
order: 20
duration: 5
objectives:
  - Run Functional Tests on API Endpoints using Chai-HTTP II
---

# Run Functional Tests on API Endpoints using Chai-HTTP II

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-mochachai/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

## Instructions

Within `tests/2_functional-tests.js`, alter the `'Test GET /hello with your name'` test (`// #2`) to assert the `status` and the `text` of the response to make the test pass.

Send your name as a URL query by appending `?name=<your_name>` to the route. The endpoint responds with `'hello <your_name>'`.

## Hints

1. All tests should pass
2. You should test for `res.status` == 200
3. You should test for `res.text` == `'hello <your_name>'`

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 587d824f367417b2b2512c59*
