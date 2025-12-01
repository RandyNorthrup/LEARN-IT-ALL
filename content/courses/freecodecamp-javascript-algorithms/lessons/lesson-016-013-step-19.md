---
id: lesson-016-013
title: Step 19
chapterId: chapter-16
order: 13
duration: 5
objectives:
  - Step 19
---

# Step 19

Remove the `pass` keyword. For the `while` loop's code block, assign `left_part[left_array_index]` to `array[sorted_index]`.

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
        pass
--fcc-editable-region--
```

## Hints

1. You should have `array[sorted_index] = left_part[left_array_index]` in the body of the loop. Don't forget to remove the `pass` keyword in the body of the loop.
2. assert.match(function_body, /while\s+left_array_index\s*<\s*len\(\s*left_part\s*\):[^}]*\barray\s*\[\s*sorted_index\s*\]\s*=\s*left_part\s*\[\s*left_array_index\s*\]/);
  }
})
3. You should not have `pass` in the `while` loop.
4. assert.match(function_body, /while\s+left_array_index\s*<\s*len\(\s*left_part\s*\):(?:(?!\bpass\b)[^}])*\barray\s*\[\s*sorted_index\s*\]\s*=\s*left_part\s*\[\s*left_array_index\s*\]/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569b0a63423f65dd30888df*
