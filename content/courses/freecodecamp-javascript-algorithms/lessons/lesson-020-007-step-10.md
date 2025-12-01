---
id: lesson-020-007
title: Step 10
chapterId: chapter-20
order: 7
duration: 5
objectives:
  - Step 10
---

# Step 10

The `choice()` function from the `random` module takes a sequence and returns a random item of the sequence.

Modify your `print()` call to use the `choice()` function and pass `all_characters` as the argument.

## Starter Code

```html
import random
import string


# Define the possible characters for the password
letters = string.ascii_letters
digits = string.digits
symbols = string.punctuation

# Combine all characters
all_characters = letters + digits + symbols

print(all_characters)
--fcc-editable-region--
print(random.random())
--fcc-editable-region--
```

## Hints

1. You should modify your existing `print()` call to print `random.choice(all_characters)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656474314bf37d3c83a85143*
