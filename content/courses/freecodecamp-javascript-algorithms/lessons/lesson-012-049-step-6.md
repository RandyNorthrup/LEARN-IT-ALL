---
id: lesson-012-049
title: Step 6
chapterId: chapter-12
order: 49
duration: 5
objectives:
  - Step 6
---

# Step 6

To add a new key-value pair after declaring a dictionary, you can indicate the key in the same way you would access an existing key, and set the value of the new key by using the assignment operator:

```py
my_dict = {
    'name': 'Michael',
    'occupation': 'Lumberjack'
}

my_dict['country'] = 'Canada'
```

Delete your `print()` call. Then, after the `copper` declaration, add the key `'food'` to your dictionary and set its value to `'hay'`.

## Starter Code

```html
--fcc-editable-region--
copper = {
    'species': 'guinea pig',
    'age': 2
}
print(copper['age'])
--fcc-editable-region--
```

## Hints

1. You should not have `print(copper['age'])` in your code.
2. You should add the key `'food'` to `copper` after declaring the dictionary.
3. You should set `copper['food']` to `'hay'` after declaring the dictionary.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6579717f0920131304286804*
