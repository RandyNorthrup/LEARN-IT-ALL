---
id: lesson-020-065
title: Step 35
chapterId: chapter-20
order: 65
duration: 5
objectives:
  - Step 35
---

# Step 35

Now, turn the empty string in the constraint tuple into a regex pattern to match a single digit. Use a character class specifying each digit from `0` to `9`.

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
            (nums, '')
        ]        
--fcc-editable-region--
    return password
    
# new_password = generate_password(8)
# print(new_password)

pattern = 'w[ha]'
quote = 'Not all those who wander are lost.'
# print(re.findall(pattern, quote))
```

## Hints

1. You should have the `(nums, '[0123456789]')` tuple in your `constraints` list.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656f10458134d4c4e283a2f1*
