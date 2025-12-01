---
id: lesson-014-026
title: Step 31
chapterId: chapter-14
order: 26
duration: 5
objectives:
  - Step 31
---

# Step 31

Add the text `I accept the terms and conditions` immediately after the `input` element in the newly added `label`. Then link the text `terms and conditions` to the following location:

```md
https://www.freecodecamp.org/news/terms-of-service/
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
        <legend>Account type (required)</legend>
        <label for="personal-account"><input id="personal-account" type="radio" name="account-type" checked /> Personal</label>
        <label for="business-account"><input id="business-account" type="radio" name="account-type" /> Business</label>
      </fieldset>
      <fieldset></fieldset>
--fcc-editable-region--
      <label for="terms-and-conditions"><input id="terms-and-conditions" type="checkbox" required /></label>
--fcc-editable-region--
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. You should add `I accept the terms and conditions` text to the `label` following the third `fieldset`.
2. You should use an `a` element to link to the terms and conditions.
3. You should put the new text immediately after the `input` element in the `label`.
4. You should give the `a` element an `href` of `https://www.freecodecamp.org/news/terms-of-service/`.
5. You should only wrap the `a` element around the text `terms and conditions`.
6. The text inside your anchor element has extra leading or trailing whitespace. The only spaces in the anchor text should be between the words `terms`, `and`, and `conditions`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60fab8367d35de04e5cb7929*
