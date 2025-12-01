---
id: lesson-020-063
title: Step 33
chapterId: chapter-20
order: 63
duration: 5
objectives:
  - Step 33
---

# Step 33

To check that the generated password meets the required features, you are going to use the `findall()` function from the `re` module. It's similar to `search` but it returns a list with all the occurrences of the matched pattern.

Replace the `search()` call with `findall()` and check the output.

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
            (nums, '')
        ]        

    return password
    
# new_password = generate_password(8)
# print(new_password)
--fcc-editable-region--
pattern = 'l+'
quote = 'Not all those who wander are lost.'
print(re.search(pattern, quote))
--fcc-editable-region--
```

## Hints

1. You should modify your existing `print()` call replacing `search()` with `findall()`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656f0bc259c1f6b57486ed68*
