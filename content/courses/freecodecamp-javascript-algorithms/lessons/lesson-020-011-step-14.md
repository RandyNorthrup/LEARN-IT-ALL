---
id: lesson-020-011
title: Step 14
chapterId: chapter-20
order: 11
duration: 5
objectives:
  - Step 14
---

# Step 14

Your `generate_password` function needs a few parameters. Start by adding a `length` parameter.

## Starter Code

```html
--fcc-editable-region--
import secrets
import string


def generate_password():    
    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols

--fcc-editable-region--
```

## Hints

1. Your `generate_password` function should take a `length` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65647c71a5d2bd431596f629*
