---
id: lesson-020-058
title: Step 23
chapterId: chapter-20
order: 58
duration: 5
objectives:
  - Step 23
---

# Step 23

Next, you are going to give your function more parameters that will act as constraints for the generated password.

Modify your function declaration by adding `nums`, `special_chars`, `uppercase`, and `lowercase` in this order after the existent `length` parameter.

## Starter Code

```html
import secrets
import string

--fcc-editable-region--
def generate_password(length):
--fcc-editable-region--    
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

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. Your function should take `length`, `nums`, `special_chars`, `uppercase`, and `lowercase` as the parameters. The order matters.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656ef5bc5c0cd464be1df675*
