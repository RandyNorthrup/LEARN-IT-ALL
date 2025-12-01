---
id: lesson-018-021
title: Step 26
chapterId: chapter-18
order: 21
duration: 5
objectives:
  - Step 26
---

# Step 26

The next part of the Luhn Algorithm is to multiply all the even digits by `2`.

Within the even digit `for` loop, replace the `print` call with a variable named `number` and assign it the value of `digit` multiplied by `2`.

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
        print(digit)
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `number = int(digit) * 2` within the `for` loop.
2. assert.match(function_body, /number\s*=\s*int\(\s*digit\s*\)\s*\*\s*2/);
    }
})
3. You should not have `print(digit)` within the `for` loop.
4. const no_comments = __helpers.python.removeComments(function_body);
5. assert.notMatch(no_comments, /print\s*\(\s*digit\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687c8d86e18cbd775a53c9*
