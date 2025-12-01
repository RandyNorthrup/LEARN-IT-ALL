---
id: lesson-014-064
title: Step 29
chapterId: chapter-14
order: 64
duration: 5
objectives:
  - Step 29
---

# Step 29

Follow accessibility best practices by linking the `input` elements and the `label` elements in the second `fieldset`.

Use `personal-account`, and `business-account` as values for the respective `id` attributes.

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
--fcc-editable-region--
      <fieldset>
        <legend>Account type (required)</legend>
        <label><input type="radio" name="account-type" checked /> Personal</label>
        <label><input type="radio" name="account-type" /> Business</label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. The first `input` element should have an `id` of `personal-account`.
2. The second `input` element should have an `id` of `business-account`.
3. The first `label` element should have a `for` attribute with a value of `personal-account`.
4. The second `label` element should have a `for` attribute with a value of `business-account`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 65045fa2267ce52da6a73676*
