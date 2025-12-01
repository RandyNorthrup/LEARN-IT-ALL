---
id: lesson-020-016
title: Step 16
chapterId: chapter-20
order: 16
duration: 5
objectives:
  - Step 16
---

# Step 16

Below your new variable, add a comment saying `Generate password`.

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
    
--fcc-editable-region--
```

## Hints

1. You should add the provided comment.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65648eefbee2014f5815f4ba*
