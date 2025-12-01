---
id: lesson-016-022
title: Step 29
chapterId: chapter-16
order: 22
duration: 5
objectives:
  - Step 29
---

# Step 29

It's time to test the `merge_sort` function!

Replace `pass` with a list called `numbers`, and assign this list to it: `[4, 10, 6, 14, 2, 1, 8, 5]`

## Starter Code

```html
def merge_sort(array):
    if len(array) <= 1:
        return
    
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

--fcc-editable-region--
if __name__ == '__main__':
    pass
--fcc-editable-region--
```

## Hints

1. You should replace `pass` with a `numbers` list with these values: `[4, 10, 6, 14, 2, 1, 8, 5]`
2. You should not have the `pass` keyword in the body of your `if` statement

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569beee367427c90c74899e*
