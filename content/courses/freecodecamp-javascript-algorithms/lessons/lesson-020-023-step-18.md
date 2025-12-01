---
id: lesson-020-023
title: Step 18
chapterId: chapter-20
order: 23
duration: 5
objectives:
  - Step 18
---

# Step 18

A standalone single underscore is used to represent a value you don't care or that won't be used in your code.
Your iteration variable is not actually used.

Modify your `i` variable into a single underscore.

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
    password = ''
    # Generate password
    for i in range(length):
        password += secrets.choice(all_characters)
    
--fcc-editable-region--
```

## Hints

1. You should modify your `i` variable into `_`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564a767a7241362f7d8d664*
