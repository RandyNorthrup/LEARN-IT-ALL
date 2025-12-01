---
id: lesson-018-013
title: Step 18
chapterId: chapter-18
order: 13
duration: 5
objectives:
  - Step 18
---

# Step 18

Print the value of the `odd_digits` variable to the console.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `print(odd_digits)` within the `verify_card_number` function.
2. assert.match(function_body, /print\(\s*odd_digits\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687a923dd792ad339f9c09*
