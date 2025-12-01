---
id: lesson-012-007
title: Step 24
chapterId: chapter-12
order: 7
duration: 5
objectives:
  - Step 24
---

# Step 24

The algorithm will start at a specified node. Then it will explore the graph to find the shortest path between the starting node, or *source*, and all the other nodes.

For that your function needs two parameters: `graph`, and `start`. Add them to your function declaration.

## Starter Code

```html
--fcc-editable-region--
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': [('B', 4), ('D', 7)],
    'D': [('A', 1), ('C', 7)]
}

def shortest_path():
    pass
--fcc-editable-region--
```

## Hints

1. Your function should take `graph` and `start` as the parameters, in this order.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655773b0591c5f9f4045883e*
