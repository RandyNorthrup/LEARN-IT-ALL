---
id: lesson-002-004
title: Test for Truthiness
chapterId: chapter-02
order: 4
duration: 5
objectives:
  - Test for Truthiness
---

# Test for Truthiness

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-mochachai/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

`isTrue()` will test for the boolean value `true` and `isNotTrue()` will pass when given anything but the boolean value of `true`.

```js
assert.isTrue(true, 'This will pass with the boolean value true');
assert.isTrue('true', 'This will NOT pass with the string value "true"');
assert.isTrue(1, 'This will NOT pass with the number value 1');
```

`isFalse()` and `isNotFalse()` also exist, and behave similarly to their true counterparts except they look for the boolean value of `false`.

## Instructions

Within `tests/1_unit-tests.js` under the test labeled `#4` in the `Basic Assertions` suite, change each `assert` to either `assert.isTrue` or `assert.isNotTrue` to make the test pass (should evaluate to `true`). Do not alter the arguments passed to the asserts.

## Hints

1. All tests should pass.
2. You should choose the correct method for the first assertion - `isTrue` vs. `isNotTrue`.
3. You should choose the correct method for the second assertion - `isTrue` vs. `isNotTrue`.
4. You should choose the correct method for the third assertion - `isTrue` vs. `isNotTrue`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 587d824b367417b2b2512c49*
