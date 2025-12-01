---
id: lesson-016-028
title: Step 7
chapterId: chapter-16
order: 28
duration: 5
objectives:
  - Step 7
---

# Step 7

Pass `left_part` as the argument to the `merge_sort()` call you added in the last step.

## Starter Code

```html
--fcc-editable-region--
def merge_sort(array):
    
    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]
    
    merge_sort()
--fcc-editable-region--
```

## Hints

1. You should pass `left_part` as the argument to your `merge_sort()` call.
2. assert.match(function_body, /merge_sort\s*\(\s*left_part\s*\)/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65772ef923f922cd720e5008*
