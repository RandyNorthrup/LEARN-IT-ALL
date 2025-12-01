---
id: lesson-001-022
title: Step 27
chapterId: chapter-01
order: 22
duration: 5
objectives:
  - Step 27
---

# Step 27

To prevent the multiplication of one digit from being greater than `9`, within the even digit loop, add an `if` statement that checks if `number` is greater than or equal to `10`. If it is, print `number`.

## Starter Code

```html
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]

    for digit in odd_digits:
        sum_of_odd_digits += int(digit)

--fcc-editable-region--
    sum_of_even_digits = 0
    even_digits = card_number_reversed[1::2]
    for digit in even_digits:
        number = int(digit) * 2
        
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `if number >= 10:` within the `for` loop.
2. You should have `print(number)` within the `if` statement.
3. const [_,lower_function_body] = function_body.split("sum_of_even_digits");
4. assert.match(lower_function_body, /print\s*\(\s*number\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65687da2e60409c45595bbe1*
