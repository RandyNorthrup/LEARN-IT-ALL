---
id: lesson-016-021
title: Step 27
chapterId: chapter-16
order: 21
duration: 5
objectives:
  - Step 27
---

# Step 27

Replace the `pass` keyword within the `if` statement with a `return` statement. This will stop the execution of the `merge_sort` function when the given condition is true.

## Starter Code

```html
--fcc-editable-region--
def merge_sort(array):
    if len(array) <= 1:
        pass
--fcc-editable-region--
    
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
    
    while right_array_index < len(right_part):
        array[sorted_index] = right_part[right_array_index]
        right_array_index += 1
        sorted_index += 1
```

## Hints

1. You should replace `pass` with a `return` statement in the body of the `if` statement.
2. assert.match(function_body, /if\s+len\(\s*array\s*\)\s*<=\s*1:\s*return/);
  }
})
3. There should be no `pass` keyword in the body of the `if` statement
4. assert.match(function_body, /if\s+len\(\s*array\s*\)\s*<=\s*1:\s*(?!.*\bpass\b).*return/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569bca4dd9feab7b295a5e1*
