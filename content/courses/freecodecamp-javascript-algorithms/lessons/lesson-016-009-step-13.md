---
id: lesson-016-009
title: Step 13
chapterId: chapter-16
order: 9
duration: 5
objectives:
  - Step 13
---

# Step 13

When the `if` condition evaluates to `True`, it means that the element in the `left_part` list is smaller than the element it is being compared to in the `right_part` list.

In that case, you can assign the `left_part` index to the sorted array. 

Inside the `if` block, remove `pass` and assign `left_part[left_array_index]` to `array[sorted_index]`.

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
            pass

--fcc-editable-region--
```

## Hints

1. You should replace `pass` with `array[sorted_index] = left_part[left_array_index]` in the body of the `if` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656707e11e671ed54c96f7ec*
