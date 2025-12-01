---
id: lesson-020-053
title: Step 70
chapterId: chapter-20
order: 53
duration: 5
objectives:
  - Step 70
---

# Step 70

Now, remove all the arguments from your function call.

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
new_password = generate_password(length=8)
print(new_password)
--fcc-editable-region--
```

## Hints

1. You should call `generate_password` without arguments.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565c32f89ab8d68b42aff30*
