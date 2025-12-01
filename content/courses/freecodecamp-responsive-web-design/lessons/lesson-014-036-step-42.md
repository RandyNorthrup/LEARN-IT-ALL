---
id: lesson-014-036
title: Step 42
chapterId: chapter-14
order: 36
duration: 5
objectives:
  - Step 42
---

# Step 42

With form submissions, it is useful, and good practice, to provide each submittable element with a `name` attribute. This attribute is used to identify the element in the form submission.

Except for the two `radio` inputs (which you have already named), give each submittable element a unique `name` attribute of your choosing.

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
      <fieldset>
        <label for="profile-picture">Upload a profile picture: <input id="profile-picture" type="file"/></label>
        <label for="age">Input your age (years): <input id="age" type="number" min="13" max="120" /></label>
        <label for="referrer">How did you hear about us?
          <select id="referrer">
            <option value="">(select one)</option>
            <option value="1">freeCodeCamp News</option>
            <option value="2">freeCodeCamp YouTube Channel</option>
            <option value="3">freeCodeCamp Forum</option>
            <option value="4">Other</option>
          </select>
        </label>
        <label for="bio">Provide a bio:
          <textarea id ="bio" rows="3" cols="30" placeholder="I like coding on the beach..."></textarea>
        </label>
      </fieldset>
      <label for="terms-and-conditions">
        <input id="terms-and-conditions" type="checkbox" required /> I accept the <a href="https://www.freecodecamp.org/news/terms-of-service/">terms and conditions</a>
      </label>
      --fcc-editable-region--
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. You should give the `input` expecting a first name a `name` attribute. _PS I would have chosen `first-name`_
2. You should give the `input` expecting a last name a `name` attribute. _PS I would have chosen `last-name`_
3. You should give the `email` a `name` attribute. _PS I would have chosen `email`_
4. You should give the `password` a `name` attribute. _PS I would have chosen `password`_
5. You should give the `checkbox` a `name` attribute. _PS I would have chosen `terms`_
6. You should give the `file` a `name` attribute. _PS I would have chosen `file`_
7. You should give the `number` a `name` attribute. _PS I would have chosen `age`_
8. You should give the `select` element a `name` attribute. _PS I would have chosen `referrer`_
9. You should give the `textarea` element a `name` attribute. _PS I would have chosen `bio`_
10. You should not give any of the `option` elements a `name` attribute.
11. You should not give any of the `label` elements a `name` attribute.
12. You should not give any of the `fieldset` elements a `name` attribute.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60fad1cafcde010995e15306*
