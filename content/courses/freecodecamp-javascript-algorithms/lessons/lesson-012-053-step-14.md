---
id: lesson-012-053
title: Step 14
chapterId: chapter-12
order: 53
duration: 5
objectives:
  - Step 14
---

# Step 14

Now that you reviewed the basic aspects of dictionaries, you can proceed to build the shortest path algorithm.

Delete every line of code after the declaration of the `copper` dictionary.

## Starter Code

```html
copper = {
    'species': 'guinea pig',
    'age': 2
}
--fcc-editable-region--
copper['food'] = 'hay'
copper['species'] = 'Cavia porcellus'
del copper['age']

for i, j in copper.items():
    print(i, j)
--fcc-editable-region--
```

## Hints

1. You should delete all the lines of code after the declaration of your dictionary.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6579cd5f6dd62c189e53ddbb*
