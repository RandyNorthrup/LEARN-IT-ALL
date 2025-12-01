---
id: lesson-014-017
title: Step 20
chapterId: chapter-14
order: 17
duration: 5
objectives:
  - Step 20
---

# Step 20

The first `input` element with a `type` of `submit` is automatically set to submit its nearest parent `form` element.

To handle the form submission, after the last `fieldset` element add an `input` element with the `type` attribute set to `submit` and the `value` attribute set to `Submit`.

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
        <label for="first-name">Enter Your First Name: <input id="first-name" type="text" /></label>
        <label for="last-name">Enter Your Last Name: <input id="last-name" type="text" /></label>
        <label for="email">Enter Your Email: <input id="email" type="email" /></label>
        <label for="new-password">Create a New Password: <input id="new-password" type="password" /></label>
      </fieldset>
      <fieldset></fieldset>
      <fieldset></fieldset>

--fcc-editable-region--
    </form>
  </body>
</html>
```

## Hints

1. You should add the `input` element after the last `fieldset` element.
2. You should give the `input` element a `type` attribute of `submit`.
3. You should give the `input` element a `value` attribute of `Submit`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60f81167d0d4910809f88945*
