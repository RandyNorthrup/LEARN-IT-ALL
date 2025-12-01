---
id: lesson-020-032
title: Step 42
chapterId: chapter-20
order: 32
duration: 5
objectives:
  - Step 42
---

# Step 42

The dot character is a wildcard that matches any character in a string — except for a newline character by default. Modify `pattern` to match the entire string by replacing the current pattern with a `.` followed by the `+` quantifier.

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
            (nums, '[0-9]'),
            (lowercase, '[a-z]'),
            (uppercase, '[A-Z]'),
            (special_chars, '')
        ]        

    return password
    
# new_password = generate_password(8)
# print(new_password)
--fcc-editable-region--
pattern = '[^a-z]t'
quote = 'Not all those who wander are lost.'
print(re.findall(pattern, quote))
--fcc-editable-region--
```

## Hints

1. You should modify your `pattern` variable to match the whole `quote` string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564d68c34027a8072a704f4*
