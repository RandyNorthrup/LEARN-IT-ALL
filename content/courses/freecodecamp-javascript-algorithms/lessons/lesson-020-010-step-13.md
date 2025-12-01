---
id: lesson-020-010
title: Step 13
chapterId: chapter-20
order: 10
duration: 5
objectives:
  - Step 13
---

# Step 13

Declare a `generate_password` function and write all your code except the `import` lines inside the function body.

## Starter Code

```html
import secrets
import string

--fcc-editable-region--
# Define the possible characters for the password
letters = string.ascii_letters
digits = string.digits
symbols = string.punctuation

# Combine all characters
all_characters = letters + digits + symbols

--fcc-editable-region--
```

## Hints

1. You should declare a function named `generate_password`.
2. The import statements should still be outside the function.
3. The four variable declarations should be moved inside the function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656479aa5f298441c190bf8f*
