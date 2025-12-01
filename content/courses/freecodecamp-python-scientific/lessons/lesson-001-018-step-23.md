---
id: lesson-001-018
title: Step 23
chapterId: chapter-01
order: 18
duration: 5
objectives:
  - Step 23
---

# Step 23

Create a variable `even_digits` and assign it the even digits of the reversed card number.

## Starter Code

```html
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]

    for digit in odd_digits:
        sum_of_odd_digits += int(digit)
    print(sum_of_odd_digits)

--fcc-editable-region--
    sum_of_even_digits = 0
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `even_digits = card_number_reversed[1::2]` within the `verify_card_number` function.
2. assert.match(function_body, /even_digits\s*=\s*card_number_reversed\s*\[\s*1\s*:\s*:\s*2\s*\]/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65687b8eb0bbf7b5d41b610b*
