---
id: lesson-014-018
title: Step 21
chapterId: chapter-14
order: 18
duration: 5
objectives:
  - Step 21
---

# Step 21

At this point, you should be able to submit the form. However, you might notice not much happens.

To make the form more interactive, add the `required` attribute to the `input` elements in the first `fieldset`.

Now, if you try to submit the form without filling in the required fields, you will see an error message.

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
      <input type="submit" value="Submit" />
--fcc-editable-region--
    </form>
  </body>
</html>
```

## Hints

1. You should give the first `input` element a `required` attribute.
2. You should give the second `input` element a `required` attribute.
3. You should give the third `input` element a `required` attribute.
4. You should give the fourth `input` element a `required` attribute.
5. You should not give the `submit` `input` a `required` attribute.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60f81616cff80508badf9ad5*
