---
id: lesson-020-006
title: Step 9
chapterId: chapter-20
order: 6
duration: 5
objectives:
  - Step 9
---

# Step 9

The `random` module contains a pseudo-random number generator. Most of its functionalities depend on the `random()` function, which returns a floating point number in the range between `0.0` (inclusive) and `1.0` (exclusive).

Call the `random()` function from the `random` module and print the result.

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

--fcc-editable-region--
```

## Hints

1. You should print the result of calling `random.random()`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656470d517833a39bb8b5608*
