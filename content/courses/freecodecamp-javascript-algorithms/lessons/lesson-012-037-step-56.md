---
id: lesson-012-037
title: Step 56
chapterId: chapter-12
order: 37
duration: 5
objectives:
  - Step 56
---

# Step 56

Now it's better but you don't want to print the details about the starting node.

Before the `print` call, add an `if` statement to execute when `node` is equal to `start` and use the `continue` keyword to go to the next loop iteration.

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
    targets_to_print = [target] if target else graph
    for node in targets_to_print:
        print(f'\n{start}-{node} distance: {distances[node]}\nPath: {" -> ".join(paths[node])}')
    
shortest_path(my_graph, 'A')
--fcc-editable-region--
```

## Hints

1. You should nest an `if` statement to check that `node` is equal to `start` inside your `for` loop.
2. You should use the `continue` keyword to go to the next iteration inside your new `if` statement.
3. }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6559d86fe1b8947954b9178d*
