---
id: lesson-020-024
title: Step 29
chapterId: chapter-20
order: 24
duration: 5
objectives:
  - Step 29
---

# Step 29

The `search()` function from the `re` module analyzes the string passed as the argument looking for the first place where the regex pattern matches the string.

Declare a variable called `quote` and assign the string `'Not all those who wander are lost.'` to this variable. Then, print the result of `pattern.search(quote)`.

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
pattern = re.compile('i')

--fcc-editable-region--
```

## Hints

1. You should have a `quote` variable.
2. You should assign the provided string to your new `quote` variable.
3. You should print `pattern.search(quote)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564b8c9349bd76dc037967b*
