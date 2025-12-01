---
id: lesson-020-038
title: Step 48
chapterId: chapter-20
order: 38
duration: 5
objectives:
  - Step 48
---

# Step 48

In the same way the `[0-9]` class is equivalent to `\d`, the `[^0-9]` class is equivalent to `\D`. Alphanumeric characters can be matched with `\w` and non-alphanumeric characters can be matched with `\W`.

Replace the `[^a-zA-Z0-9]` character class with `\W`.

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
            (nums, r'\d'),
            (lowercase, r'[a-z]'),
            (uppercase, r'[A-Z]'),
            (special_chars, r'[^a-zA-Z0-9]')
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

1. You should replace the `[^a-zA-Z0-9]` character class with `\W`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564de10a0887f882b0012d3*
