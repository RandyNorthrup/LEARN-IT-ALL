---
id: lesson-020-018
title: Step 19
chapterId: chapter-20
order: 18
duration: 5
objectives:
  - Step 19
---

# Step 19

After the loop, add a `return` statement to your function so it returns the `password` variable.

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
--fcc-editable-region--
    password = ''
    # Generate password
    for _ in range(length):
        password += secrets.choice(all_characters)
    
--fcc-editable-region--
```

## Hints

1. You should return `password` at the end of your function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656490295d346850a4c4f2b5*
