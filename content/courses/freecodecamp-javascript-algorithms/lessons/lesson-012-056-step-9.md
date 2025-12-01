---
id: lesson-012-056
title: Step 9
chapterId: chapter-12
order: 56
duration: 5
objectives:
  - Step 9
---

# Step 9

To iterate over the keys of a dictionary, you can simply put the dictionary into a `for` loop. The code below would print each key in the dictionary `dict`:

```py
for i in dict:
   print(i)
```

Replace the `print()` call with a `for` loop that iterates over `copper` and prints each key.

## Starter Code

```html
--fcc-editable-region--
copper = {
    'species': 'guinea pig',
    'age': 2
}
copper['food'] = 'hay'
copper['species'] = 'Cavia porcellus'

print(copper)
--fcc-editable-region--
```

## Hints

1. You should not have `print(copper)` in your code.
2. You should create a `for` loop to iterate over the `copper` dictionary.
3. You should print each key of the `copper` inside your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65b7cd2b7bd9a684ccf1dc16*
