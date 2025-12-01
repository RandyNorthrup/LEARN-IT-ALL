---
id: lesson-012-059
title: Step 12
chapterId: chapter-12
order: 59
duration: 5
objectives:
  - Step 12
---

# Step 12

As you can see from the output, `.items()` creates a data structure that stores each key-value pair in a distinct tuple. To iterate over the elements in those tuples you can add a second loop variable:

```py
for i, j in dict.items():
    print(i, j)
```

Modify your `for` loop to take two loop variables and print both of them inside the loop body.

## Starter Code

```html
--fcc-editable-region--
copper = {
    'species': 'guinea pig',
    'age': 2
}
copper['food'] = 'hay'
copper['species'] = 'Cavia porcellus'

for i in copper.items():
    print(i)
--fcc-editable-region--
```

## Hints

1. You should modify your `for` loop to use two variables.
2. You should print both loop variables inside your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65b7d3319ebec69b983fb91b*
