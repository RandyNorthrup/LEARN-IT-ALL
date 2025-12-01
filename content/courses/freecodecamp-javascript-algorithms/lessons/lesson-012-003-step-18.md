---
id: lesson-012-003
title: Step 18
chapterId: chapter-12
order: 3
duration: 5
objectives:
  - Step 18
---

# Step 18

Add another node connected to `B` to your graph and call it `C`.

Modify your existing dictionary to represent this arrangement: add another key `'C'` to `my_graph` and give it the value of the string `'B'`.

Also, change the value of the existing `'B'` key into the list `['A', 'C']` to represent the multiple connections of your `'B'` node.

## Starter Code

```html
--fcc-editable-region--
my_graph = {
    'A': 'B',
    'B': 'A'
}
--fcc-editable-region--
```

## Hints

1. Your dictionary should have 3 keys — `'A'`, `'B'`, and `'C'`.
2. The value of `my_graph['A']` should be the string `'B'`.
3. `my_graph['B']` should be a list.
4. The value of `my_graph['B']` should be a list containing `'A'` and `'C'`.
5. The value of `my_graph['C']` should be the string `'B'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6557712d77ce2d9bd7e63afd*
