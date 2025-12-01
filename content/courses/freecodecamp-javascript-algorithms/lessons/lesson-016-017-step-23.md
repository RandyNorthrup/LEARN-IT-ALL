---
id: lesson-016-017
title: Step 23
chapterId: chapter-16
order: 17
duration: 5
objectives:
  - Step 23
---

# Step 23

Within the `while` loop, assign `right_part[right_array_index]` to `array[sorted_index]`.

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
        pass
--fcc-editable-region--
```

## Hints

1. You should have `array[sorted_index] = right_part[right_array_index]` in the body of the loop. Don't forget to remove the `pass` keyword in the body of the loop.
2. assert.match(function_body, /while\s+right_array_index\s*<\s*len\(\s*right_part\s*\):[^}]*\barray\s*\[\s*sorted_index\s*\]\s*=\s*right_part\s*\[\s*right_array_index\s*\]/);
  }
})
3. There should be no `pass` keyword in the `while` loop
4. assert.match(function_body, /while\s+right_array_index\s*<\s*len\(\s*right_part\s*\):(?:(?!\bpass\b)[^}])*\barray\s*\[\s*sorted_index\s*\]\s*=\s*right_part\s*\[\s*right_array_index\s*\]/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569b5c820a6a1859786e774*
