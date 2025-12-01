---
id: lesson-020-071
title: Step 68
chapterId: chapter-20
order: 71
duration: 5
objectives:
  - Step 68
---

# Step 68

Modify your function declaration to take default parameters. Use `16` for the `length` and `1` for the other constraints.

## Starter Code

```html
import re
import secrets
import string

--fcc-editable-region--
def generate_password(length, nums, special_chars, uppercase, lowercase):
--fcc-editable-region--
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
            (special_chars, fr'[{symbols}]'),
            (uppercase, r'[A-Z]'),
            (lowercase, r'[a-z]')
        ]

        # Check constraints        
        if all(
            constraint <= len(re.findall(pattern, password))
            for constraint, pattern in constraints
        ):
            break
    
    return password
    

new_password = generate_password(nums=1, length=8, special_chars=1, uppercase=1, lowercase=1)
print(new_password)
```

## Hints

1. Your function should take default parameters.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657db2114b4029241956f5d6*
