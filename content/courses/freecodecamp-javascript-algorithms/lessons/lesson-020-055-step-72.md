---
id: lesson-020-055
title: Step 72
chapterId: chapter-20
order: 55
duration: 5
objectives:
  - Step 72
---

# Step 72

Finally, put the last two lines of your code inside an `if` statement that execute when `__name__ == '__main__'`. In this way, your code won't run when imported as a module. Otherwise, it will call `generate_password()` and print the generated password. 

With that, the password generator project is complete.

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
new_password = generate_password()
print('Generated password:', new_password)
--fcc-editable-region--
```

## Hints

1. You should have an `if` statement that checks if `__name__ == '__main__'`.
2. You should put the `new_password` assignment and the following `print()` call in your new `if` statement body.

## Solution

```html
```py
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
    

if __name__ == '__main__':
    new_password = generate_password()
    print('Generated password:', new_password)
    
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565c4767f49286aec825c6d*
