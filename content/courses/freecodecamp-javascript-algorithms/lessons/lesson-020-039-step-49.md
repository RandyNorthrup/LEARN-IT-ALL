---
id: lesson-020-039
title: Step 49
chapterId: chapter-20
order: 39
duration: 5
objectives:
  - Step 49
---

# Step 49

Now, turn `pattern` into the shorthand class for non-alphanumeric characters.

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
pattern = r'\.'
quote = 'Not all those who wander are lost.'
print(re.findall(pattern, quote))
--fcc-editable-region--
```

## Hints

1. Your `pattern` variable should be `'\W'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564eebf0d2d6390b9377197*
