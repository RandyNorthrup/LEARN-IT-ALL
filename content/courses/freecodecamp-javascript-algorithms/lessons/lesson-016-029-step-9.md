---
id: lesson-016-029
title: Step 9
chapterId: chapter-16
order: 29
duration: 5
objectives:
  - Step 9
---

# Step 9

Pass `right_part` as the argument to the `merge_sort()` call you added in the last step.

## Starter Code

```html
--fcc-editable-region--
def merge_sort(array):
    
    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]

    merge_sort(left_part)
    merge_sort()
--fcc-editable-region--
```

## Hints

1. You should pass `right_part` as the argument to your last `merge_sort()` call.
2. assert.match(function_body, /merge_sort\s*\(\s*right_part\s*\)/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6577320da0d4c2e594d418e2*
