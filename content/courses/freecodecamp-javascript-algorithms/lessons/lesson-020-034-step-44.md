---
id: lesson-020-034
title: Step 44
chapterId: chapter-20
order: 34
duration: 5
objectives:
  - Step 44
---

# Step 44

Python provides a particular type of string called *raw* string. Raw strings are prefixed with a `r`. The key distinction from regular strings lies in how they handle the backslash character: in raw strings, backslashes are treated as literal characters rather than escape characters. When writing regular expressions, using raw strings is a good practice, since they can usually contain a lot of `\` characters.

Turn your `pattern` string into a raw string by prefixing it with a `r`.

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
pattern = '\.'
quote = 'Not all those who wander are lost.'
print(re.findall(pattern, quote))
--fcc-editable-region--
```

## Hints

1. You should modify your `pattern` variable into `r'\.'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564d97a5ef99783216a6229*
