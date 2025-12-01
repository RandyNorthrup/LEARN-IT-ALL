---
id: lesson-001-026
title: Step 31
chapterId: chapter-01
order: 26
duration: 5
objectives:
  - Step 31
---

# Step 31

Below the second `for` loop of the `verify_card_number` function, create a variable named `total`, and assign it the value of the sum of the odd and even digits. Print `total` to the console.

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
        sum_of_even_digits += number
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `total = sum_of_odd_digits + sum_of_even_digits` within the `verify_card_number` function.
2. const function_body_indentation = function_body.match(/^\s*/)[0];
3. const total_re = new RegExp(`^${function_body_indentation}total\\s*=\\s*(sum_of_odd_digits\\s*\\+\\s*sum_of_even_digits|sum_of_even_digits\\s*\\+\\s*sum_of_odd_digits)`, "m");
4. assert.match(function_body, total_re);
    }
})
5. You should have `print(total)` within the `verify_card_number` function.
6. assert.match(function_body, /print\(\s*total\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65687e0ed12e20c91811a48d*
