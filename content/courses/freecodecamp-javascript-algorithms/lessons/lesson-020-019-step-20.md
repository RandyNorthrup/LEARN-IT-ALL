---
id: lesson-020-019
title: Step 20
chapterId: chapter-20
order: 19
duration: 5
objectives:
  - Step 20
---

# Step 20

Finally, declare a variable `new_password` and assign it the result of calling `generate_password`. Pass `8` as the argument to your `generate_password` call.

## Starter Code

```html
import secrets
import string


def generate_password(length):
    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols

    password = ''
    # Generate password
    for _ in range(length):
        password += secrets.choice(all_characters)
        
    return password
    
--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should call `generate_password` passing `8` as the argument.
2. You should assign `generate_password(8)` to the variable `new_password`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65649122c7f77f519aaf0975*
