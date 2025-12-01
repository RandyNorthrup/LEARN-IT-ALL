---
id: lesson-020-040
title: Step 50
chapterId: chapter-20
order: 40
duration: 5
objectives:
  - Step 50
---

# Step 50

The space characters and the final period are matched, as they are the only non-alphanumeric characters in the string.

Now turn your `quote` string into a single underscore character.

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
            (lowercase, r'[a-z]'),
            (uppercase, r'[A-Z]'),
            (special_chars, r'\W')
        ]        

    return password
    
# new_password = generate_password(8)
# print(new_password)
--fcc-editable-region--
pattern = r'\W'
quote = 'Not all those who wander are lost.'
print(re.findall(pattern, quote))
--fcc-editable-region--
```

## Hints

1. Your `quote` variable should be `'_'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564efa70114b591b74d5679*
