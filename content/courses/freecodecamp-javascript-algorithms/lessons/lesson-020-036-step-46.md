---
id: lesson-020-036
title: Step 46
chapterId: chapter-20
order: 36
duration: 5
objectives:
  - Step 46
---

# Step 46

The character class `\d` is a shorthand for `[0-9]`. Replace this character class with the shorthand inside your first constraint tuple.

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
--fcc-editable-region--        
        constraints = [
            (nums, r'[0-9]'),
            (lowercase, r'[a-z]'),
            (uppercase, r'[A-Z]'),
            (special_chars, r'')
        ]        
--fcc-editable-region--
    return password
    
# new_password = generate_password(8)
# print(new_password)

pattern = r'\.'
quote = 'Not all those who wander are lost.'
# print(re.findall(pattern, quote))
```

## Hints

1. You should turn the `[0-9]` class into `\d`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564db880cf9408535f17ff4*
