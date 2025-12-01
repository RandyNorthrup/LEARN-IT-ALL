---
id: lesson-020-051
title: Step 65
chapterId: chapter-20
order: 51
duration: 5
objectives:
  - Step 65
---

# Step 65

Now it's time to test your function. Uncomment the last two lines in your code and modify the function call passing 5 arguments. Use `8` for the length and `1` for the other four constraints.

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
            (nums, r'\d'),
            (lowercase, r'[a-z]'),
            (uppercase, r'[A-Z]'),            
            (special_chars, fr'[{symbols}]')            
        ]
        
        # Check constraints        
        if all(
            constraint <= len(re.findall(pattern, password))
            for constraint, pattern in constraints
        ):
            break

    return password
    
--fcc-editable-region--
# new_password = generate_password(8)
# print(new_password)
--fcc-editable-region--
```

## Hints

1. You should call `generate_password` with the provided arguments.
2. You should print your `new_password` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6565c13fdb798865c161d8f8*
