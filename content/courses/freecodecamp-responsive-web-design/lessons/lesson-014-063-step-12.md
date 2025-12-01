---
id: lesson-014-063
title: Step 12
chapterId: chapter-14
order: 63
duration: 5
objectives:
  - Step 12
---

# Step 12

The `method` attribute specifies how to send form-data to the URL specified in the `action` attribute. The form-data can be sent via a `GET` request as URL parameters (with `method="get"`) or via a `POST` request as data in the request body (with `method="post"`).

Set the `method` attribute to send your form data via a `POST` request.

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
    --fcc-editable-region--
    <form action='https://register-demo.freecodecamp.org'></form>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. You shouldn't add a new `form` element.
2. Your `form` element should have a `method` attribute.
3. Your `method` attribute should be set to `post`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63541ef4f96cd82e8e6c788a*
