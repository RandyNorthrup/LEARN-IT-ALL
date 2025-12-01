---
id: lesson-016-027
title: Step 8
chapterId: chapter-16
order: 27
duration: 5
objectives:
  - Step 8
---

# Step 8

Call the `merge_sort()` function again. Do not pass in any argument for now.

## Starter Code

```html
--fcc-editable-region--
def merge_sort(array):
    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]
    
    merge_sort(left_part)

--fcc-editable-region--
```

## Hints

1. You should call `merge_sort()` again after the previous function call.
2. assert.match(function_body, /merge_sort\s*\(\s*\)/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6577254891048c8f2c19e961*
