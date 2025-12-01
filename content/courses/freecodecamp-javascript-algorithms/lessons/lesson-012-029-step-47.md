---
id: lesson-012-029
title: Step 47
chapterId: chapter-12
order: 29
duration: 5
objectives:
  - Step 47
---

# Step 47

The `.extend()` method, allows you to add elements from an iterable to the end of a list:

```py
my_list = ['larch', 'birch']
tree_list = ['fir', 'redwood', 'pine']
my_list.extend(tree_list)
print(my_list) # Output: ['larch', 'birch', 'fir', 'redwood', 'pine']
```

Create an `else` clause and use the `.extend()` method to add the current node path to the neighbor node path.

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
    print(f'Unvisited: {unvisited}\nDistances: {distances}\nPaths: {paths}')
    
#shortest_path(my_graph, 'A')
```

## Hints

1. You should create an `else` clause after your nested `if` statement.
2. You should have `paths[node].extend(paths[current])` in your `else` clause.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6557913b8fe5c0bc834c9f4f*
