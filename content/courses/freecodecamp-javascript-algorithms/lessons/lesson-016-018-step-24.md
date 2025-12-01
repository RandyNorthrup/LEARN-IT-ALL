---
id: lesson-016-018
title: Step 24
chapterId: chapter-16
order: 18
duration: 5
objectives:
  - Step 24
---

# Step 24

Now, use the `+=` operator to increment `right_array_index` by `1`.

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

    while left_array_index < len(left_part):
        array[sorted_index] = left_part[left_array_index]
        left_array_index += 1
        sorted_index += 1
    
--fcc-editable-region--
    while right_array_index < len(right_part):
        array[sorted_index] = right_part[right_array_index]

--fcc-editable-region--
```

## Hints

1. You should have `right_array_index += 1` within the `while` loop.
2. assert.match(function_body, /while\s+right_array_index\s*<\s*len\(\s*right_part\s*\):[^}]*\bright_array_index\s*\+=\s*1\b/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569b68fac723e8c20223ed3*
