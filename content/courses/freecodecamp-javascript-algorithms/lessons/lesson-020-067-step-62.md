---
id: lesson-020-067
title: Step 62
chapterId: chapter-20
order: 67
duration: 5
objectives:
  - Step 62
---

# Step 62

Right now, `all()` is taking an empty list as the argument. Populate that empty list using the comprehension syntax so that the list stores the results of evaluating the expression `constraint <= len(re.findall(pattern, password))` for each `constraint`-`pattern` tuple in the `constraints` list.

In this way, you'll break out of the `while` loop only after all the requirements are fulfilled.

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
        if all([]):
--fcc-editable-region--        
            break
    
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should pass `[constraint <= len(re.findall(pattern, password)) for constraint, pattern in constraints]` to the `all()` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657732654845d8e2fb1217e6*
