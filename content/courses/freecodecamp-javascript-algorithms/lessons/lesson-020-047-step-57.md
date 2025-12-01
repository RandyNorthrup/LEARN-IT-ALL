---
id: lesson-020-047
title: Step 57
chapterId: chapter-20
order: 47
duration: 5
objectives:
  - Step 57
---

# Step 57

Inside your `for` loop, compare `constraint` and the length of the list returned by `findall()`. Use the `<=` operator for that.

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
        for constraint, pattern in constraints:
            len(re.findall(pattern, password))
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should compare `constraint` and the length of the list returned by `findall` using the `<=` operator inside your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565bb128adfcd5ec362382d*
