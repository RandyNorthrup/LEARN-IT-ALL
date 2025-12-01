---
id: lesson-012-004
title: Step 19
chapterId: chapter-12
order: 4
duration: 5
objectives:
  - Step 19
---

# Step 19

Add one last node, `'D'`, which is connected with `'A'` and `'C'`.

Modify your dictionary to represent this structure. Again, use a list to represent multiple connections.

## Starter Code

```html
--fcc-editable-region--
my_graph = {
    'A': 'B',
    'B': ['A', 'C'],
    'C': 'B'
}
--fcc-editable-region--
```

## Hints

1. Your dictionary should have 4 keys called `'A'`, `'B'`, `'C'`, and `'D'`.
2. `my_graph['A']` should be a list.
3. `my_graph['A']` should be a list containing `'B'` and `'D'`.
4. `my_graph['B']` should be a list.
5. `my_graph['B']` should be a list containing `'A'` and `'C'`.
6. `my_graph['C']` should be a list.
7. `my_graph['C']` should be a list containing `'B'` and `'D'`.
8. `my_graph['D']` should be a list.
9. `my_graph['D']` should be a list containing `'A'` and `'C'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6557716aadbd2d9c42c0e69a*
