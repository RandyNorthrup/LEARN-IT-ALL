---
id: lesson-014-025
title: Step 28
chapterId: chapter-14
order: 25
duration: 5
objectives:
  - Step 28
---

# Step 28

Currently users can submit the form without checking the radio inputs. Although you previously used the `required` attribute to indicate that an input is required, it won't work in this case because adding `required` to both inputs will convey the wrong information to users.

To solve this, you can provide context of what is needed by adding a `legend` element with text `Account type (required)` before the `label` elements within the second `fieldset`. Then add the `checked` attribute to the `Personal` input to ensure the form is submitted with the required data in it.

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
--fcc-editable-region--
      <fieldset>

        <label><input type="radio" name="account-type" /> Personal</label>
        <label><input type="radio" name="account-type" /> Business</label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

## Hints

1. Your `input` elements should remain `type` of `radio`.
2. You should add a `legend` element within the second `fieldset` element.
3. You should add `Account type (required)` text to the `legend` element.
4. You should give an attribute of `checked` to the `Personal` input.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 60fab4a123ce4b04526b082b*
