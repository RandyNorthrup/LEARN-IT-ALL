---
id: lesson-016-004
title: Step 4
chapterId: chapter-16
order: 4
duration: 5
objectives:
  - Step 4
---

# Step 4

In the previous step, you got the mid point. You can use it to divide `array` into two and assign each part to new variables. 

Use the slice syntax to extract the left half of `array` and assign it to a variable named `left_part`.

## Starter Code

```html
--fcc-editable-region--
def merge_sort(array):
    middle_point = len(array) // 2

--fcc-editable-region--
```

## Hints

1. You should have a variable named `left_part` in your `merge_sort` function.
2. assert.match(function_body, /left_part\s*(?!=)/m);
  }
})
3. You should assign `array[:middle_point]` to the `left_part` variable.
4. assert.match(function_body, /left_part\s*=\s*array\s*\[\s*:\s*middle_point\s*\]/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656627b47bd2d2a4afbc945d*
