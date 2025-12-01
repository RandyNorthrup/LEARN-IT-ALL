---
id: lesson-014-014
title: Step 16
chapterId: chapter-14
order: 14
duration: 5
objectives:
  - Step 16
---

# Step 16

The `rem` unit stands for root `em`, and is relative to the font size of the `html` element.

As `label` elements are inline by default, they are all displayed side by side on the same line, making their text hard to read. To make them appear on separate lines, add `display: block` to the `label` element, and add a `margin` of `0.5rem 0`, to separate them from each other.

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
        <label>Enter Your First Name:</label>
        <label>Enter Your Last Name:</label>
        <label>Enter Your Email:</label>
        <label>Create a New Password:</label>
      </fieldset>
      <fieldset></fieldset>
      <fieldset></fieldset>
    </form>
  </body>
</html>
```

## Hints

1. You should use the `label` selector.
2. You should add a `display` property of value `block`.
3. You should add a `margin` property of value `0.5rem 0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60f803d5241e6a0433a523a1*
