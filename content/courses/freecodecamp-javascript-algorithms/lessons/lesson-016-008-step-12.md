---
id: lesson-016-008
title: Step 12
chapterId: chapter-16
order: 8
duration: 5
objectives:
  - Step 12
---

# Step 12

Within the `while` loop, replace `pass` with an `if` statement that checks if the index of `left_part` is less than the index of `right_part`.

Use the `pass` keyword in the body of the `if` statement.

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
        pass
--fcc-editable-region--
```

## Hints

1. You should replace `pass` keyword with an `if` statement with this condition: `left_part[left_array_index] < right_part[right_array_index]`. Add the `pass` keyword to the body of the `if` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656706afd65547d22bee0b68*
