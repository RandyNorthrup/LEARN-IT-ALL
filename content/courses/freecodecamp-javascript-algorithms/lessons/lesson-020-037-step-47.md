---
id: lesson-020-037
title: Step 47
chapterId: chapter-20
order: 37
duration: 5
objectives:
  - Step 47
---

# Step 47

In a character class, you can combine multiple ranges by writing one range after another inside the square brackets (without any additional characters). For example: `[a-d3-6]` is the combination of `[a-d]` and `[3-6]`.

Now, modify the last regex pattern to match any non-alphanumeric character. Combine the `a-z`, `A-Z`, and `0-9` ranges into a single character class and add a `^` as the first character to negate the pattern.

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
            (nums, r'\d'),
            (lowercase, r'[a-z]'),
            (uppercase, r'[A-Z]'),
            (special_chars, r'')
        ]        
--fcc-editable-region--
    return password
    
# new_password = generate_password(8)
# print(new_password)

pattern = r'\.'
quote = 'Not all those who wander are lost.'
# print(re.findall(pattern, quote))
```

## Hints

1. You should complete your fourth pattern to match any non-alphanumeric character.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564dd65c3c2fa873a83d213*
