---
id: lesson-020-035
title: Step 45
chapterId: chapter-20
order: 35
duration: 5
objectives:
  - Step 45
---

# Step 45

Now, turn the four patterns from the `constraints` list into raw strings.

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
            (nums, '[0-9]'),
            (lowercase, '[a-z]'),
            (uppercase, '[A-Z]'),
            (special_chars, '')
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

1. You should turn the four strings inside the `constraints` list into raw strings.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564daa2725b9b8420141b1c*
