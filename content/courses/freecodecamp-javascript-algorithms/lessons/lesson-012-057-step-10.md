---
id: lesson-012-057
title: Step 10
chapterId: chapter-12
order: 57
duration: 5
objectives:
  - Step 10
---

# Step 10

If you want to iterate over the values of the dictionary keys, one way is to use the `.values()` method.

Modify your `for` loop to iterate over `copper.values()` instead of `copper` and look at the output.

## Starter Code

```html
--fcc-editable-region--
copper = {
    'species': 'guinea pig',
    'age': 2
}
copper['food'] = 'hay'
copper['species'] = 'Cavia porcellus'

for i in copper:
    print(i)
--fcc-editable-region--
```

## Hints

1. You should modify your `for` loop to iterate over `copper.values()` instead of `copper`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65b7cf140d34058d7ea8935f*
