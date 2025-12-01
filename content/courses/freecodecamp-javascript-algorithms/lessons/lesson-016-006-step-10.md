---
id: lesson-016-006
title: Step 10
chapterId: chapter-16
order: 6
duration: 5
objectives:
  - Step 10
---

# Step 10

Now it's time to sort and merge the lists (`left_part` and `right_part`) into the original `array`. 

You can do this by comparing elements on both lists, and merging the smaller element to the main list. You are going to do this comparison for all the indexes in `left_part` and `right_part`.

Create three variables: `left_array_index`, `right_array_index`, and `sorted_index` and set their values to `0`. These variables will help you keep track of each index during the sorting process.

## Starter Code

```html
def merge_sort(array):
    
    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]
    merge_sort(left_part)
    merge_sort(right_part)

--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should have a variable named `left_array_index` inside your `merge_sort` function
2. assert.match(function_body, /left_array_index/);
  }
})
3. The value of `left_array_index` should be 0
4. assert.match(function_body, /left_array_index\s*=\s*0/);
  }
})
5. You should have a variable named `right_array_index` inside your `merge_sort` function
6. assert.match(function_body, /right_array_index/);
  }
})
7. The value of `right_array_index` should be 0
8. assert.match(function_body, /right_array_index\s*=\s*0/);
  }
})
9. You should have a variable named `sorted_index` inside your `merge_sort` function
10. assert.match(function_body, /sorted_index/);
  }
})
11. The value of `sorted_index` should be 0
12. assert.match(function_body, /sorted_index\s*=\s*0/);
  }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656680b0fc79f2c38a34d90e*
