---
id: lesson-012-011
title: Step 28
chapterId: chapter-12
order: 11
duration: 5
objectives:
  - Step 28
---

# Step 28

The distance from the starting node is zero, because the algorithm begins its assessment right from there.

After appending `node` to `unvisited` in your loop, create an `if` statement that triggers if the node is equal to the starting node. Then assign `0` to that node inside the `distances` dictionary.

## Starter Code

```html
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': [('B', 4), ('D', 7)],
    'D': [('A', 1), ('C', 7)]
}

--fcc-editable-region--
def shortest_path(graph, start):
    unvisited = []
    distances = {}
    for node in graph:
        unvisited.append(node)
--fcc-editable-region--
```

## Hints

1. You should create an `if` statement that executes when `node` is equal to `start`.
2. Inside your new `if` statement you should assign `0` to the node in the `distances` dictionary.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655774955b097ea14897db12*
