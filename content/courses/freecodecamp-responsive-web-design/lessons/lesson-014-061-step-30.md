---
id: lesson-014-061
title: Step 30
chapterId: chapter-14
order: 61
duration: 5
objectives:
  - Step 30
---

# Step 30

You need to confirm that the user has read the terms and conditions.

Add a `label` element. Inside the newly created `label` element add an `input` element and set the `type` attribute to `checkbox`. Make this `input` element `required` so users can not sign up without agreeing to the terms and conditions.

Add an `id` and `for` attribute with the value `terms-and-conditions` to the elements for accessibility.

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
      <fieldset>
        <label for="first-name">Enter Your First Name: <input id="first-name" type="text" required /></label>
        <label for="last-name">Enter Your Last Name: <input id="last-name" type="text" required /></label>
        <label for="email">Enter Your Email: <input id="email" type="email" required /></label>
        <label for="new-password">Create a New Password: <input id="new-password" type="password" pattern="[a-z0-5]{8,}" required /></label>
      </fieldset>
      <fieldset>
        <legend>Account type (required)</legend>
        <label for="personal-account"><input id="personal-account" type="radio" name="account-type" checked /> Personal</label>
        <label for="business-account"><input id="business-account" type="radio" name="account-type" /> Business</label>
      </fieldset>
      <fieldset></fieldset>
--fcc-editable-region--

--fcc-editable-region--
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. You should add an `label` after the third `fieldset` element.
2. You should add an `input` to the `label` element.
3. You should add a `type` attribute of value `checkbox` to the `input` element.
4. You should add a `required` attribute to the `input` element.
5. The `input` element should have an `id` of `terms-and-conditions`.
6. The `label` element should have a `for` attribute with a value of `terms-and-conditions`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 62ff8e998d3e7eae14d6ae3b*
