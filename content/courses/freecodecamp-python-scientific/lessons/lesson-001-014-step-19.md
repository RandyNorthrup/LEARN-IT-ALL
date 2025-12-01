---
id: lesson-001-014
title: Step 19
chapterId: chapter-01
order: 14
duration: 5
objectives:
  - Step 19
---

# Step 19

Use a `for` loop to iterate over each digit in the `odd_digits` list. Move your `print` call from the previous step into the `for` loop, and change it to print each digit.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]

    print(odd_digits)
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should use a `for` loop over `odd_digits`.
2. assert.match(function_body, /for\s+\w+\s+in\s+odd_digits/);
    }
})
3. You should have `--fcc-expected--` within the `for` loop.
4. assert.equal(function_body.match(new RegExp(`print\\(\\s*${for_loop_variable}\\s*\\)`))?.[0], `print(${for_loop_variable})`);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65687ad86596e0af38640a84*
