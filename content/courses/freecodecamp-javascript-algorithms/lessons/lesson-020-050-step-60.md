---
id: lesson-020-050
title: Step 60
chapterId: chapter-20
order: 50
duration: 5
objectives:
  - Step 60
---

# Step 60

Finally, after the `for` loop, create an `if` statement to check if `count` is equal to `4` and break out of the `while` loop by using the `break` statement.

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
            if constraint <= len(re.findall(pattern, password)):
                count += 1
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should create an `if` statement that checks if `count` is equal to `4` after the `for` loop.
2. You should use `break` inside your new `if` to break out of the `while` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565c084627071646f94c4b0*
