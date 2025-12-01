---
id: lesson-012-016
title: Step 33
chapterId: chapter-12
order: 16
duration: 5
objectives:
  - Step 33
---

# Step 33

The `list()` type constructor enables you to build a list from an iterable.

Modify the assignment of your `unvisited` variable to use `list()`, and pass `graph` as the iterable.

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
    
    print(f'Unvisited: {unvisited}\nDistances: {distances}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should use `list()` to generate a list from the `graph` dictionary.
2. You should assign `list(graph)` to `unvisited`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65577739f57ecca6c39bb4e9*
