---
id: lesson-014-023
title: Step 26
chapterId: chapter-14
order: 23
duration: 5
objectives:
  - Step 26
---

# Step 26

Within each corresponding `label` element, and immediately after the `input` element, add a space and add the following text:

```md
Personal 
Business 
```

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
--fcc-editable-region--
        <label><input type="radio" /></label>
        <label><input type="radio" /></label>
--fcc-editable-region--
      </fieldset>
      <fieldset></fieldset>
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. You should give the first `label` the text `Personal`.
2. You should give the second `label` the text `Business`.
3. You should give the first `label` text one space at the front.
4. You should give the second `label` text one space at the front.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60f8604682407e0d017bbf7f*
