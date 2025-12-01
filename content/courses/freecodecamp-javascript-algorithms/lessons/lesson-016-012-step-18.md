---
id: lesson-016-012
title: Step 18
chapterId: chapter-16
order: 12
duration: 5
objectives:
  - Step 18
---

# Step 18

The `while` loop you created compares one element from `left_part` with another in `right_part`, then adds the smaller element to the main `array` list.

It will continue this operation until there are no elements left to be compared. But `left_part` may still have elements left while `right_part` has none, and vice versa.

Create another `while` loop to copy the remaining elements in `left_part` into the `array` list. Use `left_array_index < len(left_part)` for the `while` condition.

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

--fcc-editable-region--
```

## Hints

1. Your `while` loop should have this condition: `left_array_index < len(left_part)`. Don't forget to use the `pass` keyword in the body of the loop.
2. assert.match(function_body, /^\s{4}while\s+left_array_index\s*<\s*len\(\s*left_part\s*\):/m);
  }
})
3. You should have the `pass` keyword in the body of your `while` loop
4. assert.match(function_body, /while\s+left_array_index\s*<\s*len\(\s*left_part\s*\):[^}]*\bpass\b/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656710d1e0ec62253426db24*
