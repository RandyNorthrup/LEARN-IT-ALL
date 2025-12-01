---
id: lesson-016-010
title: Step 15
chapterId: chapter-16
order: 10
duration: 5
objectives:
  - Step 15
---

# Step 15

In a previous step, you assigned the element in the `left_part` to the `array` list because it was smaller. But this will not always be the case. In some comparison cases, the element on the right could be smaller. 

Create an `else` clause to execute when the `left_part` index is not less than the `right_part` index.

Inside the `else` block, assign `right_part[right_array_index]` to `array[sorted_index]`.

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
--fcc-editable-region--
        if left_part[left_array_index] < right_part[right_array_index]:
            array[sorted_index] = left_part[left_array_index]
            left_array_index += 1
--fcc-editable-region--
```

## Hints

1. You should have `array[sorted_index] = right_part[right_array_index]` in the body of your `else` clause.
2. assert.match(function_body, /else:\s*[^}]*array\s*\[\s*sorted_index\s*\]\s*=\s*right_part\s*\[\s*right_array_index\s*\]/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656709e50ed928da35260276*
