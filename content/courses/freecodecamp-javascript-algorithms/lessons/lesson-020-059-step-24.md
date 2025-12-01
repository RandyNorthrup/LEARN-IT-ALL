---
id: lesson-020-059
title: Step 24
chapterId: chapter-20
order: 59
duration: 5
objectives:
  - Step 24
---

# Step 24

Put your `password` variable declaration and the following `for` loop inside a `while` loop. Use `True` as the condition for your new loop.

## Starter Code

```html
import secrets
import string


def generate_password(length, nums, special_chars, uppercase, lowercase):
    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols
--fcc-editable-region--
    password = ''
    # Generate password
    for _ in range(length):
        password += secrets.choice(all_characters)
--fcc-editable-region--        
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should create a `while True` loop enclosing your existing `password` declaration and `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656ef783bba6976de014eaa8*
