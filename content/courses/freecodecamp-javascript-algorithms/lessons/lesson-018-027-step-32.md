---
id: lesson-018-027
title: Step 32
chapterId: chapter-18
order: 27
duration: 5
objectives:
  - Step 32
---

# Step 32

Return the result of comparing `0` to `total` modulo `10`.

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
--fcc-editable-region--
    total = sum_of_odd_digits + sum_of_even_digits
    print(total)

--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `return 0 == total % 10` within the `verify_card_number` function.
2. const acceptableMatches = [
            /return +0 *== *total *% *10/,
            /return +total *% *10 *== *0/
        ];
3. const someMatch = acceptableMatches.some((match) => {
            return match.test(function_body);
        });
4. assert.isTrue(someMatch);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687e294ef2bdca637fb213*
