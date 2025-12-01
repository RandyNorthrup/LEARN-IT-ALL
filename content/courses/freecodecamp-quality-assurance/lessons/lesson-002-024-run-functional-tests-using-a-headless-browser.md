---
id: lesson-002-024
title: Run Functional Tests Using a Headless Browser
chapterId: chapter-02
order: 24
duration: 5
objectives:
  - Run Functional Tests Using a Headless Browser
---

# Run Functional Tests Using a Headless Browser

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-mochachai/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

On the page there's an input form. It sends data to the `PUT /travellers` endpoint as an AJAX request.

When the request successfully completes, the client code appends a `<div>` containing the information in the response to the DOM.

Here's an example of how to use Zombie.js to interact with the form:

```js
test('Submit the surname "Polo" in the HTML form', function (done) {
  browser.fill('surname', 'Polo').then(() => {
    browser.pressButton('submit', () => {
      browser.assert.success();
      browser.assert.text('span#name', 'Marco');
      browser.assert.text('span#surname', 'Polo');
      browser.assert.elements('span#dates', 1);
      done();
    });
  });
});
```

First, the `fill` method of the `browser` object fills the `surname` field of the form with the value `'Polo'`. `fill` returns a promise, so `then` is chained off of it.

Within the `then` callback, the `pressButton` method of the `browser` object is used to invoke the form's `submit` event listener. The `pressButton` method is asynchronous.

Then, once a response is received from the AJAX request, a few assertions are made confirming:

1.  The status of the response is `200`
2.  The text within the `<span id='name'></span>` element matches `'Marco'`
3.  The text within the `<span id='surname'></span>` element matches `'Polo'`
4.  There is `1` `<span id='dates'></span>` element.

Finally, the `done` callback is invoked, which is needed due to the asynchronous test.

## Instructions

Within `tests/2_functional-tests.js`, in the `'Submit the surname "Colombo" in the HTML form'` test (`// #5`), automate the following:

1.  Fill in the form with the surname `Colombo`
2.  Press the submit button

And within the `pressButton` callback:

1.  Assert that status is OK `200`
2.  Assert that the text inside the element `span#name` is `'Cristoforo'`
3.  Assert that the text inside the element `span#surname` is `'Colombo'`
4.  Assert that the element(s) `span#dates` exist and their count is `1`

Do not forget to remove the `assert.fail()` call.

## Hints

1. All tests should pass.
2. You should assert that the headless browser request succeeded.
3. You should assert that the text inside the element `span#name` is `'Cristoforo'`.
4. You should assert that the text inside the element `span#surname` is `'Colombo'`.
5. You should assert that the element `span#dates` exist and its count is 1.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 587d8250367417b2b2512c5d*
