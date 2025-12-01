---
id: lesson-016-011
title: Step 17
chapterId: chapter-16
order: 11
duration: 5
objectives:
  - Step 17
---

# Step 17

The `if` and `else` statements you created in the previous steps will assign elements to the sorted array. 

Each element assigned to the sorted array takes up an index in the list. So you have to move to the next index without an element.

Below the `if`/`else` block, but still within the `while` loop increment `sorted_index` by 1. This should not be in the body of the `if` or `else` statement

## Starter Code

```html
def merge_sort(array):
    
    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]

    merge_sort(left_part)
    merge_sort(right_part)

    left_array_index = 0
    right_array_index = 0
    sorted_index = 0

--fcc-editable-region--
    while left_array_index < len(left_part) and right_array_index < len(right_part):
        if left_part[left_array_index] < right_part[right_array_index]:
            array[sorted_index] = left_part[left_array_index]
            left_array_index += 1
        else:
            array[sorted_index] = right_part[right_array_index]
            right_array_index += 1
--fcc-editable-region--
```

## Hints

1. You should increment the current value of `sorted_index` by 1.
2. assert.match(function_body, /^\s{8}sorted_index\s*(\+=\s*1|=\s*sorted_index\s*\+\s*1)/m);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65670d1ef177e7e2b76d9528*
