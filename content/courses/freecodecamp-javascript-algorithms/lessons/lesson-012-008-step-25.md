---
id: lesson-012-008
title: Step 25
chapterId: chapter-12
order: 8
duration: 5
objectives:
  - Step 25
---

# Step 25

To keep track of the visited nodes, you need a list of all the nodes in the graph. Once a node is visited, it will be removed from that list.

Now, replace the `pass` keyword with a variable named `unvisited` and assign it an empty list.

## Starter Code

```html
--fcc-editable-region--
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': [('B', 4), ('D', 7)],
    'D': [('A', 1), ('C', 7)]
}

def shortest_path(graph, start):
    pass
--fcc-editable-region--
```

## Hints

1. You should have a variable called `unvisited` inside the `shortest_path` function.
2. You should assign an empty list to your `unvisited` variable. Remember to delete `pass`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655773f8b8b5db9fc6d0ae76*
