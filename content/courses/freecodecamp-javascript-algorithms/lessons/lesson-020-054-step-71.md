---
id: lesson-020-054
title: Step 71
chapterId: chapter-20
order: 54
duration: 5
objectives:
  - Step 71
---

# Step 71

Modify your `print()` call to take the string `'Generated password:'` as the first argument, before `new_password`.

## Starter Code

```html
import re
import secrets
import string


def generate_password(length=16, nums=1, special_chars=1, uppercase=1, lowercase=1):

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
    
--fcc-editable-region--
new_password = generate_password()
print(new_password)
--fcc-editable-region--
```

## Hints

1. You should pass the string `'Generated password:'` and `new_password` to your `print()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565c3a146bd5469b62bc59e*
