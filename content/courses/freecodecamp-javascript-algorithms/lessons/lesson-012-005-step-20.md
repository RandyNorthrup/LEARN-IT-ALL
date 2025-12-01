---
id: lesson-012-005
title: Step 20
chapterId: chapter-12
order: 5
duration: 5
objectives:
  - Step 20
---

# Step 20

A graph is called a *weighted* graph when its edges are associated with weights, representing a distance, time or other quantitative value.

In your case, these weights will be the distances between each node, or point in space. To represent a weighted graph you can modify your dictionary, using a list of tuples for each value.

The first element in the tuple will be the connected node, and the second element will be an integer number indicating the distance.

Modify `my_graph['A']` into a list of tuples, considering that the `A-B` distance is `3` and the `A-D` distance is `1`.

## Starter Code

```html
--fcc-editable-region--
my_graph = {
    'A': ['B', 'D'],
--fcc-editable-region--    
    'B': ['A', 'C'],
    'C': ['B', 'D'],
    'D': ['A', 'C']
}
```

## Hints

1. `my_graph["A"]` should be a list containing the tuples `('B', 3)` and `('D', 1)`.
2. `my_graph` should have 4 keys named `'A'`, `'B'`, `'C'`, and `'D'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655771d889132f9ccd341060*
