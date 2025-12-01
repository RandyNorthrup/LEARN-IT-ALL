---
id: lesson-020-041
title: Step 51
chapterId: chapter-20
order: 41
duration: 5
objectives:
  - Step 51
---

# Step 51

Since the underscore character is a valid character for variable names, it is included in the `\w` character class (equivalent to `[a-zA-Z0-9_]`), which can be conveniently used to match variable names.

Therefore, the `\W` character class is equivalent to `[^a-zA-Z0-9_]` with the underscore character that is not matched. For this reason you cannot use it to match all your special characters.

Delete the last three lines in your code.

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
quote = '_'
print(re.findall(pattern, quote))
--fcc-editable-region--
```

## Hints

1. You should delete the last three lines in your code.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564f0279e23ce924eedd1b2*
