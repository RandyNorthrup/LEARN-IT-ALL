---
id: lesson-014-032
title: Step 37
chapterId: chapter-14
order: 32
duration: 5
objectives:
  - Step 37
---

# Step 37

Submitting the form with an option selected would not send a useful value to the server. As such, each `option` needs to be given a `value` attribute. Without which, the text content of the `option` will be submitted to the server.

Give the first `option` a `value` of `""`, and the subsequent `option` elements `value` attributes from `1` to `4`.

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
        <label for="personal-account"><input id="personal-account" type="radio" name="account-type" checked/> Personal</label>
        <label for="business-account"><input id="business-account" type="radio" name="account-type" /> Business</label>
      </fieldset>
--fcc-editable-region--
      <fieldset>
        <label>Upload a profile picture: <input type="file" /></label>
        <label>Input your age (years): <input type="number" min="13" max="120" /></label>
        <label>How did you hear about us?
          <select>
            <option>(select one)</option>
            <option>freeCodeCamp News</option>
            <option>freeCodeCamp YouTube Channel</option>
            <option>freeCodeCamp Forum</option>
            <option>Other</option>
          </select>
        </label>
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

1. You should give the first `option` a `value` of `""`.
2. You should give the second `option` a `value` of `1`.
3. You should give the third `option` a `value` of `2`.
4. You should give the fourth `option` a `value` of `3`.
5. You should give the fifth `option` a `value` of `4`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60faca286cb48b07f6482970*
