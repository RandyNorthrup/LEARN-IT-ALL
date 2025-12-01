---
id: lesson-012-032
title: Step 50
chapterId: chapter-12
order: 32
duration: 5
objectives:
  - Step 50
---

# Step 50

If you try to uncomment your function call, it won't work. You have a couple of bugs to fix. The first one happens because in the nested `if` you are trying to access an element that might not exist in your `paths[node]` list. So, you need to be sure that `paths[node]` is not empty before accessing `paths[node][-1]`.

Add an additional condition to your nested `if` statement to ensure that `paths[node]` is non-empty before accessing `paths[node][-1]`.

## Starter Code

```html
my_graph = {
    'A': [('B', 3), ('D', 1)],
    'B': [('A', 3), ('C', 4)],
    'C': [('B', 4), ('D', 7)],
    'D': [('A', 1), ('C', 7)]
}

def shortest_path(graph, start):
    unvisited = list(graph)
    distances = {node: 0 if node == start else float('inf') for node in graph}
    paths = {node: [] for node in graph}
    paths[start].append(start)
    
    while unvisited:
        current = min(unvisited, key=distances.get)
        for node, distance in graph[current]:
            if distance + distances[current] < distances[node]:
                distances[node] = distance + distances[current]
--fcc-editable-region--                
                if paths[node][-1] == node:
                    paths[node] = paths[current]
--fcc-editable-region--                   
                else:
                    paths[node].extend(paths[current])
                paths[node].append(node)
        unvisited.remove(current)
    
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should add `paths[node]` as the first condition to your nested `if` statement. Use the `and` operator to combine your conditions.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 655791e6cf5e03be3de73451*
