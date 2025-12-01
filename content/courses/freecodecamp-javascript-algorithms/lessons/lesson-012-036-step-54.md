---
id: lesson-012-036
title: Step 54
chapterId: chapter-12
order: 36
duration: 5
objectives:
  - Step 54
---

# Step 54

Python provides a concise way to write `if`/`else` conditionals by using the ternary syntax:

```py
val_1 if condition else val_2
```

The expression above evaluates to `val_1` if `condition` is true, otherwise to `val_2`.

Delete your `print` call and create a variable called `targets_to_print` after your `while` loop. Use the ternary syntax to assign it `[target]` when `target` is truthy, and `graph` otherwise.

## Starter Code

```html
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': [('B', 4), ('D', 7)],
    'D': [('A', 1), ('C', 7)]
}

def shortest_path(graph, start, target = ''):
    unvisited = list(graph)
    distances = {node: 0 if node == start else float('inf') for node in graph}
    paths = {node: [] for node in graph}
    paths[start].append(start)
    
    while unvisited:
        current = min(unvisited, key=distances.get)
        for node, distance in graph[current]:
            if distance + distances[current] < distances[node]:
                distances[node] = distance + distances[current]
                if paths[node] and paths[node][-1] == node:
                    paths[node] = paths[current][:]
                else:
                    paths[node].extend(paths[current])
                paths[node].append(node)
        unvisited.remove(current)
--fcc-editable-region--    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should delete your `print` call.
2. You should create a variable called `targets_to_print` after your `while` loop.
3. You should use the ternary syntax to assign `[target]` when `target` is truthy, and `graph` otherwise to your `targets_to_print` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6559d70c5161b16ff1d6530d*
