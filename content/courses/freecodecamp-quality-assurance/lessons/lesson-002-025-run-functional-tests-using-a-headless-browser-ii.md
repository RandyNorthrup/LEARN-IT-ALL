---
id: lesson-002-025
title: Run Functional Tests Using a Headless Browser II
chapterId: chapter-02
order: 25
duration: 5
objectives:
  - Run Functional Tests Using a Headless Browser II
---

# Run Functional Tests Using a Headless Browser II

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-mochachai/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

## Instructions

Within `tests/2_functional-tests.js`, in the `'Submit the surname "Vespucci" in the HTML form'` test (`// #6`), automate the following:

1.  Fill in the form with the surname `Vespucci`
2.  Press the submit button

And within the `pressButton` callback:

1.  Assert that status is OK `200`
2.  Assert that the text inside the element `span#name` is `'Amerigo'`
3.  Assert that the text inside the element `span#surname` is `'Vespucci'`
4.  Assert that the element(s) `span#dates` exist and their count is `1`

Do not forget to remove the `assert.fail()` call.

## Hints

1. All tests should pass.
2. You should assert that the headless browser request succeeded.
3. You should assert that the text inside the element `span#name` is `'Amerigo'`.
4. You should assert that the text inside the element `span#surname` is `'Vespucci'`.
5. You should assert that the element `span#dates` exist and its count is 1.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 5f8884f4c46685731aabfc41*
