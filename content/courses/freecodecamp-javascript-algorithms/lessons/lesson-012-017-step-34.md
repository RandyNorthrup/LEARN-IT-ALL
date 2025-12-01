---
id: lesson-012-017
title: Step 34
chapterId: chapter-12
order: 17
duration: 5
objectives:
  - Step 34
---

# Step 34

With a dictionary comprehension, you can create a dictionary starting from an existing dictionary:

```py
{key: val for key in dict}
```

In the example above, `val` is the value that `key` will have in the new dictionary, and `dict` is the existing dictionary.

You want to keep track of the paths between the starting node and each other node.

After the `distances` variable, create a `paths` variable and assign it a dictionary with all the keys from `graph`. Assign an empty list to each key and use a dictionary comprehension to build your dictionary.

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
    
    print(f'Unvisited: {unvisited}\nDistances: {distances}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should have a variable named `paths`.
2. Your `paths` variable should use the dictionary comprehension syntax to assign an empty list to each node in graph.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65577791ad8c26a7705e2919*
