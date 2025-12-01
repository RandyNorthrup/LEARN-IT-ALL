---
id: lesson-012-052
title: Step 13
chapterId: chapter-12
order: 52
duration: 5
objectives:
  - Step 13
---

# Step 13

You can remove a key-value pair from a dictionary by using the `del` keyword:

```py
my_dict = {
    'name': 'Michael',
    'occupation': 'Lumberjack'
}

del my_dict['occupation']
```

Just before your `for` loop, use the `del` keyword to delete the `'age'` key and its value from `copper`.

## Starter Code

```html
--fcc-editable-region--
copper = {
    'species': 'guinea pig',
    'age': 2
}
copper['food'] = 'hay'
copper['species'] = 'Cavia porcellus'

for i, j in copper.items():
    print(i, j)
--fcc-editable-region--
```

## Hints

1. You should use the `del` keyword to delete `copper['age']` before the `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6579cbab9825b8170974c69a*
