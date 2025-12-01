---
id: lesson-020-002
title: Step 2
chapterId: chapter-20
order: 2
duration: 5
objectives:
  - Step 2
---

# Step 2

You can access the utilities defined inside the imported module through the dot notation. The dot notation works by appending a dot followed by the utility name to the module name. For example, here's how to access the `ascii_lowercase` constant:

```py
import string


print(string.ascii_lowercase)
# Output: abcdefghijklmnopqrstuvwxyz
```

In this project, you are going to use different constants from the `string` module. 

Declare a new variable called `letters` and assign `string.ascii_letters` to this variable.

## Starter Code

```html
--fcc-editable-region--
import string


--fcc-editable-region--
```

## Hints

1. You should declare a variable named `letters`.
2. You should assign `string.ascii_letters` to your `letters` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564683821b2ee3174e7250e*
