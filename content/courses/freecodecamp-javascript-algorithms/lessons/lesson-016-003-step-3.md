---
id: lesson-016-003
title: Step 3
chapterId: chapter-16
order: 3
duration: 5
objectives:
  - Step 3
---

# Step 3

The merge sort algorithm mainly performs three actions:

- Divide an unsorted sequence of items into sub-parts
- Sort the items in the sub-parts
- Merge the sorted sub-parts

The above happens recursively until the sub-parts are merged into the complete sorted sequence. Let's start by dividing the sequence.

First, replace the `pass` keyword with a variable `middle_point`. Use the integer division operator (`//`) to divide the length of the `array` list by 2 and assign the result to your new `middle_point` variable. Remember to indent your code.

## Starter Code

```html
--fcc-editable-region--
def merge_sort(array):
    pass
--fcc-editable-region--
```

## Hints

1. You should not have `pass` in the body of the function.
2. assert.notMatch(function_body, /^\s{4}pass/m);
  }
})
3. You should declare a `middle_point` variable and assign `len(array) // 2` to it.
4. assert.match(function_body, /^\s{4}middle_point\s*=\s*len\(\s*array\s*\)\s*\/\/\s*2/m);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6564aee9c077774ea49c3faf*
