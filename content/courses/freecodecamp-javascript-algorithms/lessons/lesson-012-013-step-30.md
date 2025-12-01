---
id: lesson-012-013
title: Step 30
chapterId: chapter-12
order: 13
duration: 5
objectives:
  - Step 30
---

# Step 30

After your `for` loop, add a `print()` call and pass in the following string to see the values of the variables you have created: `f'Unvisited: {unvisited}\nDistances: {distances}'`.

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
        if node == start:
            distances[node] = 0
        else:
            distances[node] = float('inf')
--fcc-editable-region--
```

## Hints

1. You should print `f'Unvisited: {unvisited}\nDistances: {distances}'` after your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655775221059f5a20493d5d7*
