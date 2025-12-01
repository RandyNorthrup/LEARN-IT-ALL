---
id: lesson-012-018
title: Step 35
chapterId: chapter-12
order: 18
duration: 5
objectives:
  - Step 35
---

# Step 35

Dictionary comprehensions support conditional `if`/`else` syntax too:

```py
{key: val_1 if condition else val_2 for key in dict}
```

In the example above, `dict` is the existing dictionary. When `condition` evaluates to `True`, `key` will have the value `val_1` , otherwise `val_2`.

Use a dictionary comprehension to create a dictionary based on `graph` and assign it to the `distances` variable. Give the key a value of zero if the node is equal to the starting node, and infinite otherwise. Use `float('inf')` to achieve the latter.

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
    unvisited = list(graph)
    distances = {}
    paths = {node: [] for node in graph}
    print(f'Unvisited: {unvisited}\nDistances: {distances}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should use the dictionary comprehension syntax to give a value to your `distances` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65577a17564ce8a8e06c1460*
