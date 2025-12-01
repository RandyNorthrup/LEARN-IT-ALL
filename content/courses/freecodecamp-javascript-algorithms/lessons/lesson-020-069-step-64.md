---
id: lesson-020-069
title: Step 64
chapterId: chapter-20
order: 69
duration: 5
objectives:
  - Step 64
---

# Step 64

You don't need the `count` variable anymore. Delete this variable and its value.

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
        count = 0
        if all(
            constraint <= len(re.findall(pattern, password))
            for constraint, pattern in constraints
        ):
--fcc-editable-region--
            break
    
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should delete the `count = 0` line.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657733bc97eb83efdb7e3988*
