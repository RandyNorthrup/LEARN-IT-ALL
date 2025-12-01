---
id: lesson-012-040
title: Step 21
chapterId: chapter-12
order: 40
duration: 5
objectives:
  - Step 21
---

# Step 21

Now modify `my_graph['B']` into a list of tuples, where the first element in the tuple is the connected node, and the second element is the distance. The `B-C` distance is `4`.

## Starter Code

```html
--fcc-editable-region--
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': ['A', 'C'],
--fcc-editable-region--    
    'C': ['B', 'D'],
    'D': ['A', 'C']
}
```

## Hints

1. `my_graph['B']` should be a list containing the tuples `('A', 3)` and `('C', 4)`.
2. `my_graph` should have 4 keys named `'A'`, `'B'`, `'C'`, and `'D'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6566195b0a021bb660b2b4b1*
