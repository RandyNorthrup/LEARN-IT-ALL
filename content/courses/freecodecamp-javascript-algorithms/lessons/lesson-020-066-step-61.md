---
id: lesson-020-066
title: Step 61
chapterId: chapter-20
order: 66
duration: 5
objectives:
  - Step 61
---

# Step 61

Instead of using a loop and a counter variable, you can achieve the same result with a different approach, which you are going to implement in the next few steps.

`all()` is a built-in Python function that returns `True` if all the elements inside a given iterable evaluate to `True`. Otherwise, it returns `False`.

Replace your existing `for` loop and two `if` statements with a single `if` statement. For the `if` condition, use a call to the `all()` function and pass an empty list as the argument to the function call.

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
        for constraint, pattern in constraints:
            if constraint <= len(re.findall(pattern, password)):
                count += 1
            
        if count == 4:
--fcc-editable-region--
            break

    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should replace your existing `for` loop and two `if` statements with a single `if` statement.
2. Your new `if` condition should be `all([])`.
3. You should have `break` inside your new `if` body.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6577319039f4f7de9251b822*
