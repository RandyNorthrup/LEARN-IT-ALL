---
id: lesson-020-025
title: Step 31
chapterId: chapter-20
order: 25
duration: 5
objectives:
  - Step 31
---

# Step 31

As you can see from the output, now your regex matches the first `l` inside the string.

In your pattern, you can add a quantifier after a character to specify how many times that character should be repeated. For example, the `+` quantifier means it should repeat one or more times.

Add a `+` quantifier to your pattern.

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
pattern = re.compile('l')
quote = 'Not all those who wander are lost.'
print(pattern.search(quote))
--fcc-editable-region--
```

## Hints

1. You should modify your `pattern` variable into `re.compile('l+')`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564c67db26c417561ab510d*
