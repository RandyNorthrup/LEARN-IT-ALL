---
id: lesson-016-031
title: Step 16
chapterId: chapter-16
order: 31
duration: 5
objectives:
  - Step 16
---

# Step 16

Still within the `else` block, increment `right_array_index` by `1`.

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
        
--fcc-editable-region--
        else:
            array[sorted_index] = right_part[right_array_index]

--fcc-editable-region--
```

## Hints

1. You should add `1` to the current value of `right_array_index`.
2. const allowedMatches = [
      /else:\s*[^}]*right_array_index\s*\+=\s*1/,
      /else:\s*[^}]*right_array_index\s*=\s*right_array_index\s*\+\s*1/
    ]
    
    const anyMatch = allowedMatches.some((match) => match.test(function_body))
    assert.isTrue(anyMatch);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657823a9f4f372518614c8b7*
