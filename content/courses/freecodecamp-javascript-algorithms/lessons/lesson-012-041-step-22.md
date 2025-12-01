---
id: lesson-012-041
title: Step 22
chapterId: chapter-12
order: 41
duration: 5
objectives:
  - Step 22
---

# Step 22

In the same way, modify the remaining two lists considering that the `C-D` distance is `7`.

## Starter Code

```html
--fcc-editable-region--
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': ['B', 'D'],
    'D': ['A', 'C']
}
--fcc-editable-region--
```

## Hints

1. `my_graph['C']` should be a list containing the tuples `('B', 4)` and `('D', 7)`.
2. `my_graph['D']` should be a list containing the tuples `('A', 1)` and `('C', 7)`.
3. `my_graph` should have 4 keys named `'A'`, `'B'`, `'C'`, and `'D'`.
4. `my_graph['A']` should be a list containing the tuples `('B', 3)` and `('D', 1)`.
5. `my_graph['B']` should be a list containing the tuples `('A', 3)` and `('C', 4)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65661b72d6745ebec6a96923*
