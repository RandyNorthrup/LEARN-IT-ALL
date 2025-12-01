---
id: lesson-018-017
title: Step 22
chapterId: chapter-18
order: 17
duration: 5
objectives:
  - Step 22
---

# Step 22

Below your `print` call, create a variable named `sum_of_even_digits` and assign it a value of `0`.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]

    for digit in odd_digits:
        sum_of_odd_digits += int(digit)
    print(sum_of_odd_digits)
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `sum_of_even_digits = 0` below your `print` call.
2. assert.match(function_body, /sum_of_even_digits\s*=\s*0/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687b68003a61b46fe691f0*
