---
id: lesson-020-056
title: Step 30
chapterId: chapter-20
order: 56
duration: 5
objectives:
  - Step 30
---

# Step 30

The value `None` is returned since `'i'` is not found inside the parsed string.

Now, modify the string passed to `re.compile()` into `'l'` and see the result.

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
            (nums, '')
        ]        

    return password
    
# new_password = generate_password(8)
# print(new_password)    
--fcc-editable-region--
pattern = re.compile('i')
quote = 'Not all those who wander are lost.'
print(pattern.search(quote))
--fcc-editable-region--
```

## Hints

1. You should modify your `pattern` variable into `re.compile('l')`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656eec2f40d18056cc58b229*
