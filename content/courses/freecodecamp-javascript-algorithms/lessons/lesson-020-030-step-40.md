---
id: lesson-020-030
title: Step 40
chapterId: chapter-20
order: 30
duration: 5
objectives:
  - Step 40
---

# Step 40

Add a third tuple to the `constraints` list. Use the `uppercase` parameter as the first item and a regex pattern that matches a single uppercase letter as the second item.

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
            (lowercase, '[a-z]')
        ]        
--fcc-editable-region--
    return password
    
# new_password = generate_password(8)
# print(new_password)

pattern = '[^a-z]t'
quote = 'Not all those who wander are lost.'
# print(re.findall(pattern, quote))
```

## Hints

1. You should add a third tuple to the `constraints` list using `uppercase` as the first item and a character class that matches a single uppercase letter as the second item.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564d2eeb36ebe7dd9bd1ee9*
