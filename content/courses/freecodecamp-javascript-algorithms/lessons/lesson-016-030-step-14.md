---
id: lesson-016-030
title: Step 14
chapterId: chapter-16
order: 30
duration: 5
objectives:
  - Step 14
---

# Step 14

After assigning the `left_part` index to the sorted array, increment `left_array_index` by `1`.

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

--fcc-editable-region--
```

## Hints

1. You should add `1` to the current value of `left_array_index`.
2. const allowedMatches = [
      /while\s+left_array_index\s*<\s*len\(\s*left_part\s*\)\s+and\s+right_array_index\s*<\s*len\(\s*right_part\s*\):\s*[^}]*if\s+left_part\s*\[\s*left_array_index\s*\]\s*<\s*right_part\s*\[\s*right_array_index\s*\]\s*:\s*[^}]*left_array_index\s*\+=\s*1\s*(?!.*\bpass\b)/,
      /while\s+left_array_index\s*<\s*len\(\s*left_part\s*\)\s+and\s+right_array_index\s*<\s*len\(\s*right_part\s*\):\s*[^}]*if\s+left_part\s*\[\s*left_array_index\s*\]\s*<\s*right_part\s*\[\s*right_array_index\s*\]\s*:\s*[^}]*left_array_index\s*=\s*left_array_index\s*\+\s*1\s*(?!.*\bpass\b)/
    ]
3. const anyMatch = allowedMatches.some((match) => match.test(function_body));
    assert.isTrue(anyMatch);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6577562501feabdf0984a184*
