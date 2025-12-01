---
id: lesson-001-011
title: Step 16
chapterId: chapter-01
order: 11
duration: 5
objectives:
  - Step 16
---

# Step 16

Remove the `print` call from the `main` function.

## Starter Code

```html
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]

--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    print(translated_card_number)

    verify_card_number(translated_card_number)
--fcc-editable-region--

main()
```

## Hints

1. You should not have a `print` call within the `main` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65687a005aba3ea815b84e68*
