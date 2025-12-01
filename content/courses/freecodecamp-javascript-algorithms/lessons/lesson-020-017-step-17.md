---
id: lesson-020-017
title: Step 17
chapterId: chapter-20
order: 17
duration: 5
objectives:
  - Step 17
---

# Step 17

Next, write a `for` loop with `i` as the loop variable. Use the `range()` function to iterate up to the value of the `length`.

Inside the loop, use the addition assignment operator to add a random character from `all_characters` to the current value of `password`. Use the `choice()` function from the `secrets` module for that.

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
    
--fcc-editable-region--
```

## Hints

1. You should write a `for` loop that iterates over `range(length)`.
2. You should use the `+=` operator to add a random character from `all_characters` to the current value of `password`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65648f4b2281ba50051ae39c*
