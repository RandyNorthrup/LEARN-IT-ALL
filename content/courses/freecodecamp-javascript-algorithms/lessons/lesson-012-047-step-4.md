---
id: lesson-012-047
title: Step 4
chapterId: chapter-12
order: 47
duration: 5
objectives:
  - Step 4
---

# Step 4

You can access the data stored in a dictionary through its keys:

```py
my_dict = {
    'name': 'Michael',
    'occupation': 'Lumberjack'
}

my_dict['name'] # 'Michael'
```

After your dictionary, follow the example above to access the `'species'` key of `copper` and print the result.

## Starter Code

```html
--fcc-editable-region--
copper = {
    'species': 'guinea pig',
    'age': 2
}

--fcc-editable-region--
```

## Hints

1. You should not modify the assignment of your dictionary.
2. You should use `copper['species']` to access the value of the `'species'` key.
3. You should call `print()` passing `copper['species']` as argument.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6578b57361f2f132a02e2a18*
