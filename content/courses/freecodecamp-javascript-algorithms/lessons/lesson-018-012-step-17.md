---
id: lesson-018-012
title: Step 17
chapterId: chapter-18
order: 12
duration: 5
objectives:
  - Step 17
---

# Step 17

Within the `verify_card_number` function, create a variable `odd_digits` that contains every other digit of the `card_number_reversed` string.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `odd_digits = card_number_reversed[::2]` within the `verify_card_number` function.
2. assert.match(function_body, /odd_digits\s*=\s*card_number_reversed\s*\[\s*:\s*:\s*2\s*\]/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687a8253766cac4c99c57f*
