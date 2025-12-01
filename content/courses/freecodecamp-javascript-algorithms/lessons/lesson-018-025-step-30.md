---
id: lesson-018-025
title: Step 30
chapterId: chapter-18
order: 25
duration: 5
objectives:
  - Step 30
---

# Step 30

Outside of the `if` statement, add `number` to `sum_of_even_digits`. Also, remove the `print` call.

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
        if number >= 10:
            number = (number // 10) + (number % 10)
            print(number)
        
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `sum_of_even_digits += number` within the `for` loop.
2. assert.match(block_body, /sum_of_even_digits\s*\+=\s*number/);
    }
})
3. You should not have `print(number)` within the `for` loop.
4. const no_comments = __helpers.python.removeComments(function_body);
5. assert.notMatch(no_comments, /print\s*\(\s*number\s*\)/);
    }
})
6. You should not have `sum_of_even_digits += number` within the `if` statement.
7. assert.notMatch(block_body, /sum_of_even_digits *\+= *number/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687e069cf4e0c85b0a06b1*
