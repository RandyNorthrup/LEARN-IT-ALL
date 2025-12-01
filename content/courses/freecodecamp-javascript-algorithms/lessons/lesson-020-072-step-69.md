---
id: lesson-020-072
title: Step 69
chapterId: chapter-20
order: 72
duration: 5
objectives:
  - Step 69
---

# Step 69

When you combine default arguments with keyword arguments, you are able to explicitly pass fewer arguments than those required by the function. The arguments that are not explicitly passed to the function call will take their default values.

Modify your `generate_password()` call to take only `length=8`.

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
new_password = generate_password(nums=1, length=8, special_chars=1, uppercase=1, lowercase=1)
print(new_password)
--fcc-editable-region--
```

## Hints

1. You should pass only `length=8` to your `generate_password()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657db4cb77190e33a20e852a*
