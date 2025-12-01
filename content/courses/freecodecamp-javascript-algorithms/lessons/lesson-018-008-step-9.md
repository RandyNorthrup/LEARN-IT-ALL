---
id: lesson-018-008
title: Step 9
chapterId: chapter-18
order: 8
duration: 5
objectives:
  - Step 9
---

# Step 9

<!-- TODO: Find better places to split explanation up. -->

The Luhn algorithm is as follows:

1. From the right to left, double the value of every second digit; if the product is greater than 9, sum the digits of the products.
2. Take the sum of all the digits.
3. If the sum of all the digits is a multiple of 10, then the number is valid; else it is not valid.

Assume an example of an account number "7992739871" that will have a check digit added, making it of the form 7992739871x:

```markdown
Account number      7   9  9  2  7  3  9   8  7  1  x
Double every other  7  18  9  4  7  6  9  16  7  2  x
Sum 2-char digits   7   9  9  4  7  6  9   7  7  2  x
```

Replace the `pass` statement with a variable `sum_of_odd_digits` and a value of `0`.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    pass

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

1. You should have `sum_of_odd_digits = 0` within the `verify_card_number` function.
2. assert.match(function_body, /sum_of_odd_digits\s*=\s*0/);
    }
})
3. You should not have `pass` within the `verify_card_number` function.
4. assert.notMatch(function_body, /pass/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656879a66338b2a461d5d307*
