---
id: lesson-020-061
title: Step 26
chapterId: chapter-20
order: 61
duration: 5
objectives:
  - Step 26
---

# Step 26

A tuple is another built-in data structure in Python. Tuples are very much like lists, but they are defined with parentheses `()`, instead of square brackets. Also, tuples are immutable, unlike lists.

```py
my_tuple = ('larch', 1, True)
```

Your `constraints` list is going to store tuples. The first item of each tuple will be a constraint parameter.

Modify the `constraints` list assignment by adding a tuple to your list. Use `nums` as the first item and an empty string as the second item.

## Starter Code

```html
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
        constraints = []
        
--fcc-editable-region--
    return password

# new_password = generate_password(8)
# print(new_password)
```

## Hints

1. You should add a tuple to the `constraints` list.
2. You should add `(nums, '')` to the `constraints` list.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656ef89b4b486b7a16077864*
