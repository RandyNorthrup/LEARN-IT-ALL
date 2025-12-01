---
id: lesson-016-033
title: Step 28
chapterId: chapter-16
order: 33
duration: 5
objectives:
  - Step 28
---

# Step 28

You can use the `__name__` variable to determine if a Python script is being run as the main program or if it is being imported as a module (code written in another Python file).

If the value of `__name__` is set to `'__main__'`, it implies that the current script is the main program, and not a module.

In this project, you'll use the current script as the main program.

Create an `if` statement that checks whether the value of `__name__` is `'__main__'`.

Use the `pass` keyword in the body of the `if` statement.

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

--fcc-editable-region--
```

## Hints

1. Your `if` statement should check if `__name__` has a value of `'__main__'`

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657f59751d5a5c9b069ae0f3*
