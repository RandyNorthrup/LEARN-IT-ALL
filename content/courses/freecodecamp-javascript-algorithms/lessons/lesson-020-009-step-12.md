---
id: lesson-020-009
title: Step 12
chapterId: chapter-20
order: 9
duration: 5
objectives:
  - Step 12
---

# Step 12

Although the effect might seem equal to `random.choice()`, `secrets` ensures you the most secure source of randomness that your operating system can provide.

Now, delete your two `print()` calls.

## Starter Code

```html
import secrets
import string


# Define the possible characters for the password
letters = string.ascii_letters
digits = string.digits
symbols = string.punctuation

# Combine all characters
all_characters = letters + digits + symbols
--fcc-editable-region--
print(all_characters)
print(secrets.choice(all_characters))
--fcc-editable-region--
```

## Hints

1. You should delete your two `print()` calls.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656477845006313fbfea0ad1*
