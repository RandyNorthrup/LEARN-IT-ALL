---
id: lesson-020-057
title: Step 22
chapterId: chapter-20
order: 57
duration: 5
objectives:
  - Step 22
---

# Step 22

It seems all fine, but it would be nice to have a way to check that the generated password complies to specific features. For example, a minimum number of special characters, digits, or uppercase/lowercase letters. You are going to take care of that very soon.

For now, comment out the last two lines of your code.

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
print(new_password)
--fcc-editable-region--
```

## Hints

1. You should turn the last two lines of your code into comments.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656ef54070c72161e6feb90f*
