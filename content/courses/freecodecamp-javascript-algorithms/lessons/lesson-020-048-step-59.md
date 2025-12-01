---
id: lesson-020-048
title: Step 59
chapterId: chapter-20
order: 48
duration: 5
objectives:
  - Step 59
---

# Step 59

Turn the expression inside your `for` loop into an `if` statement. Use the existing expression `constraint <= len(re.findall(pattern, password))` as the `if` condition.

Inside the new conditional statement, increment the `count` value by `1`.

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
        for constraint, pattern in constraints:
            constraint <= len(re.findall(pattern, password))
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should turn `constraint <= len(re.findall(pattern, password))` into the `if` condition.
2. You should increment `count` by one inside your new `if` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565bd4265158360de8e2ae7*
