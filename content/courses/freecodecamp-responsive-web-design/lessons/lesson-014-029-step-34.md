---
id: lesson-014-029
title: Step 34
chapterId: chapter-14
order: 29
duration: 5
objectives:
  - Step 34
---

# Step 34

Adding a dropdown to the form is easy with the `select` element. The `select` element is a container for a group of `option` elements, and the `option` element acts as a label for each dropdown option. Both elements require closing tags.

Start by adding a `select` element below the last `label` element. Then nest 5 `option` elements within the `select` element.

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
--fcc-editable-region--
      <fieldset>
        <label>Upload a profile picture: <input type="file" /></label>
        <label>Input your age (years): <input type="number" min="13" max="120" /></label>

      </fieldset>
--fcc-editable-region--
      <label for="terms-and-conditions">
        <input id="terms-and-conditions" type="checkbox" required /> I accept the <a href="https://www.freecodecamp.org/news/terms-of-service/">terms and conditions</a>
      </label>
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. You should add a `select` element to the third `fieldset`.
2. You should nest 5 `option` elements inside the `select` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60fac4095512d3066053d73c*
