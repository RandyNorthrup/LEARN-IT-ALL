---
id: lesson-020-070
title: Step 66
chapterId: chapter-20
order: 70
duration: 5
objectives:
  - Step 66
---

# Step 66

It works, but there are still a couple of things you can improve. First of all, calling a function with 5 arguments can create confusion on which value will be assigned to which parameter.

You can call a function using keyword arguments, that is writing the parameter name explicitly followed by the assignment operator and the value. For example:

```py
def add(x, y):
    return x + y

add(x=1, y=7) # 8
```

Modify your function call to use keyword arguments.

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
new_password = generate_password(8, 1, 1, 1, 1)
print(new_password)
--fcc-editable-region--
```

## Hints

1. Your `new_password` variable should have the value of `generate_password(length=8, nums=1, special_chars=1, uppercase=1, lowercase=1)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657dadf4d8b93c1704f3a57c*
