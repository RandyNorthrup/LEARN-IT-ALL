---
id: lesson-014-016
title: Step 19
chapterId: chapter-14
order: 16
duration: 5
objectives:
  - Step 19
---

# Step 19

Specifying the `type` attribute of an `input` element is important for the browser to know what kind of data it should expect. If the `type` is not specified, the browser will default to `text`.

Give the first two `input` elements a `type` attribute of `text`, the third a `type` attribute of `email`, and the fourth a `type` attribute of `password`.

The `email` type only allows emails with a `@` and a `.` in the domain.
The `password` type obscures the input, and warns if the site does not use HTTPS.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Registration Form</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Registration Form</h1>
    <p>Please fill out this form with the required information</p>
    <form method="post" action='https://register-demo.freecodecamp.org'>
--fcc-editable-region--
      <fieldset>
        <label for="first-name">Enter Your First Name: <input id="first-name" /></label>
        <label for="last-name">Enter Your Last Name: <input id="last-name" /></label>
        <label for="email">Enter Your Email: <input id="email" /></label>
        <label for="new-password">Create a New Password: <input id="new-password" /></label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
      <fieldset></fieldset>
    </form>
  </body>
</html>
```

## Hints

1. You should give the first `input` element a `type` attribute of `text`.
2. You should give the second `input` element a `type` attribute of `text`.
3. You should give the third `input` element a `type` attribute of `email`.
4. You should give the fourth `input` element a `type` attribute of `password`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60f80e0081e0f2052ae5b505*
