---
id: lesson-002-010
title: Test if a Value Falls within a Specific Range
chapterId: chapter-02
order: 10
duration: 5
objectives:
  - Test if a Value Falls within a Specific Range
---

# Test if a Value Falls within a Specific Range

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-mochachai/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

```javascript
.approximately(actual, expected, delta, [message])
```

Asserts that the `actual` is equal to `expected`, to within a +/- `delta` range.

## Instructions

Within `tests/1_unit-tests.js` under the test labeled `#10` in the `Comparisons` suite, change each `assert` to `assert.approximately` to make the test pass (should evaluate to `true`).

Choose the minimum range (3rd parameter) to make the test always pass. It should be less than 1.

## Hints

1. All tests should pass.
2. You should choose the correct range for the first assertion - `approximately(actual, expected, range)`.
3. You should choose the correct range for the second assertion - `approximately(actual, expected, range)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 587d824c367417b2b2512c4f*
