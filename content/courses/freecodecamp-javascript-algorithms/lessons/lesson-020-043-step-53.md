---
id: lesson-020-043
title: Step 53
chapterId: chapter-20
order: 43
duration: 5
objectives:
  - Step 53
---

# Step 53

Below the `constraints` list, add a comment saying `Check constraints`.

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
--fcc-editable-region--        
        constraints = [
            (nums, r'\d'),
            (lowercase, r'[a-z]'),
            (uppercase, r'[A-Z]'),            
            (special_chars, fr'[{symbols}]')            
        ]
        
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should add the provided comment.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564f583ca6fbf9556098dd6*
