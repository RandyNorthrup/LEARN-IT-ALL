---
id: lesson-016-014
title: Step 20
chapterId: chapter-16
order: 14
duration: 5
objectives:
  - Step 20
---

# Step 20

Still within the `while` loop, increment the value of `left_array_index` by 1.

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

    while left_array_index < len(left_part) and right_array_index < len(right_part):
        if left_part[left_array_index] < right_part[right_array_index]:
            array[sorted_index] = left_part[left_array_index]
            left_array_index += 1
        else:
            array[sorted_index] = right_part[right_array_index]
            right_array_index += 1
        sorted_index += 1
        
--fcc-editable-region--
    while left_array_index < len(left_part):
        array[sorted_index] = left_part[left_array_index]

--fcc-editable-region--
```

## Hints

1. You should use the `+=` operator to increment the current value of `left_array_index` by one within the `while` loop.
2. assert.match(function_body, /while\s+left_array_index\s*<\s*len\(\s*left_part\s*\):[^}]*\bleft_array_index\s*\+=\s*1\b/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569b19d31a09b65b4bc390a*
