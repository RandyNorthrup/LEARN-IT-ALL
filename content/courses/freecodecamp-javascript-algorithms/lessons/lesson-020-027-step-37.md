---
id: lesson-020-027
title: Step 37
chapterId: chapter-20
order: 27
duration: 5
objectives:
  - Step 37
---

# Step 37

Now, modify the pattern in your constraint tuple to indicate the range of all digits using square brackets.

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
--fcc-editable-region--        
        constraints = [
            (nums, '[0123456789]')
        ]        
--fcc-editable-region--
    return password
    
# new_password = generate_password(8)
# print(new_password)

pattern = '[a-z]t'
quote = 'Not all those who wander are lost.'
#print(re.findall(pattern, quote))
```

## Hints

1. You should have the `(nums, '[0-9]')` tuple in your `constraints` list.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564cf2e8642517abdf9d6e2*
