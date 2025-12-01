---
id: lesson-020-020
title: Step 21
chapterId: chapter-20
order: 20
duration: 5
objectives:
  - Step 21
---

# Step 21

Check the result by printing your new variable.

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
new_password = generate_password(8)

--fcc-editable-region--
```

## Hints

1. You should print `new_password`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656491fa4e69005287eb5a9a*
