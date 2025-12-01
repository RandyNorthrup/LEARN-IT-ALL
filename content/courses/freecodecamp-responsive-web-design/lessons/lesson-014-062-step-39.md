---
id: lesson-014-062
title: Step 39
chapterId: chapter-14
order: 62
duration: 5
objectives:
  - Step 39
---

# Step 39

Link the applicable form elements and their `label` elements together.

Use `profile-picture`, `age`, `referrer`, and `bio` as values for the respective `id` attributes.

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
        <label>How did you hear about us?
          <select>
            <option value="">(select one)</option>
            <option value="1">freeCodeCamp News</option>
            <option value="2">freeCodeCamp YouTube Channel</option>
            <option value="3">freeCodeCamp Forum</option>
            <option value="4">Other</option>
          </select>
        </label>
        <label>Provide a bio:
          <textarea></textarea>
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

1. The first `input` element should have an `id` of `profile-picture`.
2. The second `input` element should have an `id` of `age`.
3. The `select` element should have an `id` of `referrer`.
4. The `textarea` element should have an `id` of `bio`.
5. The first `label` element should have a `for` attribute with a value of `profile-picture`.
6. The second `label` element should have a `for` attribute with a value of `age`.
7. The third `label` element should have a `for` attribute with a value of `referrer`.
8. The fourth `label` element should have a `for` attribute with a value of `bio`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 62ff919a7b5612c0670923a5*
