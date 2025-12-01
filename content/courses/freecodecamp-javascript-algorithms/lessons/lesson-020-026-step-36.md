---
id: lesson-020-026
title: Step 36
chapterId: chapter-20
order: 26
duration: 5
objectives:
  - Step 36
---

# Step 36

Character classes also allow you to indicate a range of characters to match. You need to specify the starting and the ending characters separated by an hyphen, `-`. Characters follow the Unicode order.

Modify your `pattern` variable to match any letter `t` preceded by a lowercase letter in the `quote` variable. Use the range of characters from `a` to `z` for that.

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
            (nums, '[0123456789]')
        ]        

    return password
    
# new_password = generate_password(8)
# print(new_password)
--fcc-editable-region--
pattern = 'w[ha]'
quote = 'Not all those who wander are lost.'
print(re.findall(pattern, quote))
--fcc-editable-region--
```

## Hints

1. You should modify your `pattern` variable to match any letter `t` in `quote` preceded by a lowercase letter using the `[a-z]` class.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564cbb6311a40783b3f5de6*
