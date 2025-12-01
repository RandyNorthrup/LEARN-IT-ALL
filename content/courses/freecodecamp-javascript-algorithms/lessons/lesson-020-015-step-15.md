---
id: lesson-020-015
title: Step 15
chapterId: chapter-20
order: 15
duration: 5
objectives:
  - Step 15
---

# Step 15

At the bottom of your function, declare a `password` variable and assign an empty string to this variable.

## Starter Code

```html
import secrets
import string


def generate_password(length):
    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols
--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should have a `password` variable inside your function with the value of an empty string. Pay attention to the indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65648e4c5b316c4ec5e4fddc*
