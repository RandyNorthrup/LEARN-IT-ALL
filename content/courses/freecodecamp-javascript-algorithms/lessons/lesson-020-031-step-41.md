---
id: lesson-020-031
title: Step 41
chapterId: chapter-20
order: 31
duration: 5
objectives:
  - Step 41
---

# Step 41

Add one last tuple to your list. Use the `special_chars` parameter as the first item and an empty string as the second item.

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
            (uppercase, '[A-Z]')
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

1. You should add a fourth tuple to the `constraints` list using `special_chars` as the first item and an empty string as the second item.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564d500f1a48e7f2b732a37*
