---
id: lesson-014-020
title: Step 23
chapterId: chapter-14
order: 20
duration: 5
objectives:
  - Step 23
---

# Step 23

With `type="password"` you can use the `pattern` attribute to define a regular expression that the password must match to be considered valid.

Add a `pattern` attribute to the password `input` element to require the input match: `[a-z0-5]{8,}`

The above is a regular expression which matches eight or more lowercase letters or the digits `0` to `5`. Then, remove the `minlength` attribute, and try it out.

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
        <label for="first-name">Enter Your First Name: <input id="first-name" type="text" required /></label>
        <label for="last-name">Enter Your Last Name: <input id="last-name" type="text" required /></label>
        <label for="email">Enter Your Email: <input id="email" type="email" required /></label>
        <label for="new-password">Create a New Password: <input id="new-password" type="password" minlength="8" required /></label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
      <fieldset></fieldset>
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. You should give the password `input` element a `pattern` attribute.
2. You should give the `pattern` attribute a value of `[a-z0-5]{8,}`.
3. You should remove the `minlength` attribute from the password `input` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60f84ec41116b209c280ba91*
