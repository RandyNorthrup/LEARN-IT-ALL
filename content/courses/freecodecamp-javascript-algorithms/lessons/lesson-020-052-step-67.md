---
id: lesson-020-052
title: Step 67
chapterId: chapter-20
order: 52
duration: 5
objectives:
  - Step 67
---

# Step 67

As long as all the arguments in a function call are keyword arguments, the order of the arguments doesn't matter.

To confirm this, try to change the order of `length=8` and `nums=1` in your function call.

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
new_password = generate_password(length=8, nums=1, special_chars=1, uppercase=1, lowercase=1)
print(new_password)
--fcc-editable-region--
```

## Hints

1. You should change the order of `length=8` and `nums=1` in your `generate_password()` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565c234de8cdf673c96bdf3*
