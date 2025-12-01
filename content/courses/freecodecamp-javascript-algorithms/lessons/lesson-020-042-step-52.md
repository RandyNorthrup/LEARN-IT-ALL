---
id: lesson-020-042
title: Step 52
chapterId: chapter-20
order: 42
duration: 5
objectives:
  - Step 52
---

# Step 52

Now, combine your raw string with an f-string and interpolate your `symbols` variable inside the character class. Remember that you can interpolate a variable within an f-string using curly brackets `{ }`.

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
--fcc-editable-region--            
            (special_chars, r'\W')
--fcc-editable-region--            
        ]        

    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. The second item in your fourth constraint tuple should be the string `fr'[{symbols}]'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564f32b18480893cf7799fd*
