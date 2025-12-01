---
id: lesson-020-008
title: Step 11
chapterId: chapter-20
order: 8
duration: 5
objectives:
  - Step 11
---

# Step 11

Every time the code runs, you should see a random character from the `all_characters` string. This is exactly what you want to achieve to create a random password.

However, the algorithm on which `random` relies makes the generated pseudo-random numbers predictable. Therefore, although the `random` module is suitable for the most common applications, it cannot be used for cryptographic purposes, due to its deterministic nature. 

Instead of importing `random`, import the `secrets` module. Then change the `print()` call to use `secrets.choice(all_characters)`.

## Starter Code

```html
--fcc-editable-region--
import random
import string


# Define the possible characters for the password
letters = string.ascii_letters
digits = string.digits
symbols = string.punctuation

# Combine all characters
all_characters = letters + digits + symbols

print(all_characters)
print(random.choice(all_characters))
--fcc-editable-region--
```

## Hints

1. You should import the `secrets` module instead of the `random` module.
2. You should modify your existing `print()` call to print `secrets.choice(all_characters)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656475bbf1c2573de1d2c69c*
