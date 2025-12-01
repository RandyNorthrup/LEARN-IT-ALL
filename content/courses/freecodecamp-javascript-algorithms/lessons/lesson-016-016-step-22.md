---
id: lesson-016-016
title: Step 22
chapterId: chapter-16
order: 16
duration: 5
objectives:
  - Step 22
---

# Step 22

Now, you are going to replicate the same `while` loop logic for `right_part`.

Create a `while` loop that runs when `right_array_index` is less than `len(right_part)`, and use the `pass` keyword in the body of the loop.

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

--fcc-editable-region--
```

## Hints

1. Your `while` loop should have this condition: `right_array_index < len(right_part)`. Don't forget to use the `pass` keyword in the body of the loop.
2. assert.match(function_body, /^\s{4}while\s+right_array_index\s*<\s*len\(\s*right_part\s*\):/m);
  }
})
3. You should have the `pass` keyword in the body of your `while` loop
4. assert.match(function_body, /while\s+right_array_index\s*<\s*len\(\s*right_part\s*\):[^}]*\bpass\b/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569b4e0bd29d17d4b53b16c*
