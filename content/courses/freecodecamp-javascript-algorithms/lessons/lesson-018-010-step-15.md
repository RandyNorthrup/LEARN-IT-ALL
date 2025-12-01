---
id: lesson-018-010
title: Step 15
chapterId: chapter-18
order: 10
duration: 5
objectives:
  - Step 15
---

# Step 15

Remove the `print` call from the `verify_card_number` function.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    print(card_number_reversed)
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    print(translated_card_number)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should not have a `print` call within the `verify_card_number` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656879e1c749d7a6c5eba2d2*
