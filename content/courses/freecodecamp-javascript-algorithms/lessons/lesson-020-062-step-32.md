---
id: lesson-020-062
title: Step 32
chapterId: chapter-20
order: 62
duration: 5
objectives:
  - Step 32
---

# Step 32

You can obtain the same result without using the `compile()` function. Modify your `pattern` variable into the literal string `'l+'`. Then, change the `print()` call to print `re.search(pattern, quote)`.

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
pattern = re.compile('l+')
quote = 'Not all those who wander are lost.'
print(pattern.search(quote))
--fcc-editable-region--
```

## Hints

1. You should modify your `pattern` variable into the literal string `'l+'`.
2. You should print `re.search(pattern, quote)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656f04b20397d9a574cc7eb2*
