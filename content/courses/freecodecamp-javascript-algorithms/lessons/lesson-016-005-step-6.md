---
id: lesson-016-005
title: Step 6
chapterId: chapter-16
order: 5
duration: 5
objectives:
  - Step 6
---

# Step 6

Now that you've divided the `array` list into two separate lists, you'll keep dividing each list until every element stands alone in its own list. A list with a single number is always sorted.

To do that, recursively call `merge_sort` inside your function. Do not pass in any argument for now.

## Starter Code

```html
def merge_sort(array):
--fcc-editable-region--
    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]

--fcc-editable-region--
```

## Hints

1. You should call `merge_sort` at the bottom of your function body.
2. assert.match(function_body, /merge_sort\s*\(\s*\)/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656639771fed09b5c0e8fe71*
