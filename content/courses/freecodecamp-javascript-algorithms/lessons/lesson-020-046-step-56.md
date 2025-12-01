---
id: lesson-020-046
title: Step 56
chapterId: chapter-20
order: 46
duration: 5
objectives:
  - Step 56
---

# Step 56

You are interested in the number of elements in the list returned by the `findall()` function.

Pass your existent `findall()` call to the `len()` function.

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
            re.findall(pattern, password)
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should call the `len()` function with `re.findall(pattern, password)` as the argument.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565012a2564509d40a90048*
