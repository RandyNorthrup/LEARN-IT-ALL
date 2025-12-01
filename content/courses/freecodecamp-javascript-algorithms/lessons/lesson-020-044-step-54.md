---
id: lesson-020-044
title: Step 54
chapterId: chapter-20
order: 44
duration: 5
objectives:
  - Step 54
---

# Step 54

After your new comment, write a `for` loop to iterate over the `constraints` list. Use `constraint` and `pattern` as the loop variables.

## Starter Code

```html
import re
import secrets
import string


def generate_password(length, nums, special_chars, uppercase, lowercase):
    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols

    while True:
        password = ''
        # Generate password
        for _ in range(length):
            password += secrets.choice(all_characters)
       
        constraints = [
            (nums, r'\d'),
            (lowercase, r'[a-z]'),
            (uppercase, r'[A-Z]'),            
            (special_chars, fr'[{symbols}]')            
        ]
--fcc-editable-region--         
        # Check constraints
        
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should write a `for` loop to iterate over the `constraints` list.
2. Your `for` loop should use `constraint` and `pattern` as the loop variables to iterate over the `constraints` list.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564f834dd717998092cfd47*
