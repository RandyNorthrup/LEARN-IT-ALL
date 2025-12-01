---
id: lesson-020-021
title: Step 27
chapterId: chapter-20
order: 21
duration: 5
objectives:
  - Step 27
---

# Step 27

The `re` module allows you to use *regular expressions* in your code. You will learn more about regular expressions very soon.

For now, add an `import` statement at the top of your code to import the `re` module.

## Starter Code

```html
--fcc-editable-region--

import secrets
import string
--fcc-editable-region--

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
```

## Hints

1. You should import the `re` module.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656494269ccce754411a2112*
