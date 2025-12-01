---
id: lesson-020-028
title: Step 38
chapterId: chapter-20
order: 28
duration: 5
objectives:
  - Step 38
---

# Step 38

The caret, `^`, placed at the beginning of the character class, matches all the characters except those specified in the class.

Add a `^` as the first character inside your character class and see what happens.

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
            (nums, '[0-9]')
        ]        

    return password
    
# new_password = generate_password(8)
# print(new_password)
--fcc-editable-region--
pattern = '[a-z]t'
quote = 'Not all those who wander are lost.'
print(re.findall(pattern, quote))
--fcc-editable-region--
```

## Hints

1. You should add a `^` as the first character inside your character class.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564d096a55d707bd77ab67b*
