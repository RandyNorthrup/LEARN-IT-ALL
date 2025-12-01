---
id: lesson-016-032
title: Step 5
chapterId: chapter-16
order: 32
duration: 5
objectives:
  - Step 5
---

# Step 5

Use the slice syntax to extract the right half of `array` and assign it to a variable named `right_part`.

## Starter Code

```html
--fcc-editable-region--
def merge_sort(array):
    middle_point = len(array) // 2
    left_part = array[:middle_point]
--fcc-editable-region--
```

## Hints

1. You should have a variable named `right_part`
2. assert.match(function_body, /right_part\s*(?!=)/m);
  }
})
3. You should assign `array[middle_point:]` to the `right_part` variable
4. assert.match(function_body, /right_part\s*=\s*array\s*\[\s*middle_point\s*:\s*\]/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657f3a661730891aa64f3568*
