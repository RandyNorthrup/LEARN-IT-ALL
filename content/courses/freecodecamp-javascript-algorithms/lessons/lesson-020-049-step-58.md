---
id: lesson-020-049
title: Step 58
chapterId: chapter-20
order: 49
duration: 5
objectives:
  - Step 58
---

# Step 58

Right before your `for` loop, declare a `count` variable and assign the value zero to this variable.

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
            constraint <= len(re.findall(pattern, password))
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should declare a `count` variable and assign the value `0` to this variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565c014db6e9b63c257771d*
