---
id: lesson-014-060
title: Step 18
chapterId: chapter-14
order: 60
duration: 5
objectives:
  - Step 18
---

# Step 18

Following accessibility best practices, link the `input` elements and the `label` elements together using the `for` attribute.

Use `first-name`, `last-name`, `email`,  and `new-password` as values for the respective `id` attributes.

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
        <label>Enter Your First Name: <input /></label>
        <label>Enter Your Last Name: <input /></label>
        <label>Enter Your Email: <input /></label>
        <label>Create a New Password: <input /></label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
      <fieldset></fieldset>
    </form>
  </body>
</html>
```

## Hints

1. The first `input` element should have an `id` of `first-name`.
2. The second `input` element should have an `id` of `last-name`.
3. The third `input` element should have an `id` of `email`.
4. The fourth `input` element should have an `id` of `new-password`.
5. The first `label` element should have a `for` attribute with a value of `first-name`.
6. The second `label` element should have a `for` attribute with a value of `last-name`.
7. The third `label` element should have a `for` attribute with a value of `email`.
8. The fourth `label` element should have a `for` attribute with a value of `new-password`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 62ff8b9dab5ac88e4d3d43a3*
