---
id: lesson-020-068
title: Step 63
chapterId: chapter-20
order: 68
duration: 5
objectives:
  - Step 63
---

# Step 63

Having `all([expression for i in iterable])`, means that a new list is created by evaluating `expression` for each `i` in `iterable`. After the `all()` function iterates over the newly created list, the list is deleted automatically, since it is no longer needed.

Memory can be saved by using a generator expression. Generator expressions follow the syntax of list comprehensions but they use parentheses instead of square brackets.

Change your list comprehension into a generator expression by removing the square brackets.

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

        # Check constraints
        count = 0
--fcc-editable-region--
        if all(
            [
                constraint <= len(re.findall(pattern, password))
                for constraint, pattern in constraints
            ]
        ):
--fcc-editable-region--
            break
    
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should turn your list comprehension into a generator expression by removing the square brackets.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6577333feab1e8e927014f03*
