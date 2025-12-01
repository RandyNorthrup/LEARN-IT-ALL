---
id: lesson-020-060
title: Step 25
chapterId: chapter-20
order: 60
duration: 5
objectives:
  - Step 25
---

# Step 25

After your `for` loop, create a `constraints` variable and assign an empty list to this variable.

## Starter Code

```html
import secrets
import string


def generate_password(length, nums, special_chars, uppercase, lowercase):
    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols
--fcc-editable-region--
    while True:
        password = ''
        # Generate password
        for _ in range(length):
            password += secrets.choice(all_characters)
        
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should declare a `constraints` variable after your `for` loop and assign an empty list to this variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656ef7f792734072dedd8319*
