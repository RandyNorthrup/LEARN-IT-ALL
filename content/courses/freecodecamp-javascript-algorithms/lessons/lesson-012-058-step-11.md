---
id: lesson-012-058
title: Step 11
chapterId: chapter-12
order: 58
duration: 5
objectives:
  - Step 11
---

# Step 11

Finally, if you want to be able to go through the key-value pairs, you can use the `.items()` method.

Modify your `for` loop to iterate over `copper.items()` instead of `copper.values()`.

## Starter Code

```html
--fcc-editable-region--
copper = {
    'species': 'guinea pig',
    'age': 2
}
copper['food'] = 'hay'
copper['species'] = 'Cavia porcellus'

for i in copper.values():
    print(i)
--fcc-editable-region--
```

## Hints

1. You should mmodify your `for` loop to iterate over `copper.items()` instead of `copper.values()`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65b7d25992879698180e6a71*
