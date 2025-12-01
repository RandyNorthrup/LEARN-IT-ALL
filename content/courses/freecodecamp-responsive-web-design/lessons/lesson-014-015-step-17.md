---
id: lesson-014-015
title: Step 17
chapterId: chapter-14
order: 15
duration: 5
objectives:
  - Step 17
---

# Step 17

Nest an `input` element within each `label`. Be sure to add each `input` after the `label` text, and include a space after the colon.

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
        <label>Enter Your First Name:</label>
        <label>Enter Your Last Name:</label>
        <label>Enter Your Email:</label>
        <label>Create a New Password:</label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
      <fieldset></fieldset>
    </form>
  </body>
</html>
```

## Hints

1. You should add four `input` elements to the `fieldset` element.
2. You should nest the `input` elements within the `label` elements.
3. You should add the first `input` after the `label` text `Enter Your First Name:`, and include a space after the colon.
4. You should add the second `input` after the `label` text `Enter Your Last Name:`, and include a space after the colon.
5. You should add the third `input` after the `label` text `Enter Your Email:`, and include a space after the colon.
6. You should add the fourth `input` after the `label` text `Create a New Password:`, and include a space after the colon.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60f805f813eaf2049bc2ceea*
