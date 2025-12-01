---
id: lesson-001-028
title: Step 33
chapterId: chapter-01
order: 28
duration: 5
objectives:
  - Step 33
---

# Step 33

Adjust the `verify_card_number` call such that if it returns `True`, print `'VALID!'` to the console. Otherwise, print `'INVALID!'`.

## Starter Code

```html
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]

    for digit in odd_digits:
        sum_of_odd_digits += int(digit)

    sum_of_even_digits = 0
    even_digits = card_number_reversed[1::2]
    for digit in even_digits:
        number = int(digit) * 2
        if number >= 10:
            number = (number // 10) + (number % 10)
        sum_of_even_digits += number
    total = sum_of_odd_digits + sum_of_even_digits
    print(total)
    return total % 10 == 0
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)
--fcc-editable-region--

main()
```

## Hints

1. You should have `if verify_card_number(translated_card_number):` within the `main` function.
2. You should have `print('VALID!')` within the `if` statement.
3. assert.match(block_body, /print\(\s*('|")VALID!\1\s*\)/);
    }
})
4. You should have `print('INVALID!')` within the `else` clause.
5. assert.match(block_body, /print\(\s*('|")INVALID!\1\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65687e457ab1c4cb8c3fe7c8*
