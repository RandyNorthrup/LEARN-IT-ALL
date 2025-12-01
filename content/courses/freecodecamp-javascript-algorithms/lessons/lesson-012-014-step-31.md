---
id: lesson-012-014
title: Step 31
chapterId: chapter-12
order: 14
duration: 5
objectives:
  - Step 31
---

# Step 31

Now, call your function passing `my_graph` and `'A'` as the arguments.

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
    print(f'Unvisited: {unvisited}\nDistances: {distances}')
--fcc-editable-region--
```

## Hints

1. You should call `shortest_path` passing `my_graph` and `'A'` as the arguments.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655776db1eeae0a620e42a0d*
