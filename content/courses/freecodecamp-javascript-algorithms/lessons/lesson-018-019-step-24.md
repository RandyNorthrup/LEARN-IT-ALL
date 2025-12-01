---
id: lesson-018-019
title: Step 24
chapterId: chapter-18
order: 19
duration: 5
objectives:
  - Step 24
---

# Step 24

Loop over the even digits and print each to the console.

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
    even_digits = card_number_reversed[1::2]
    
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have a `for` loop over `even_digits` within the `verify_card_number` function.
2. assert.match(function_body, /for +(\w+) +in +even_digits:/);
    }
})
3. You should have `--fcc-expected--` within the `for` loop.
4. // Get the name of the variable used in the for loop
        const for_loop_variable = function_body.match(/for +(\w+) +in +even_digits:/)?.[1];
        assert.exists(for_loop_variable);
5. const [_,lower_function_body] = function_body.split("sum_of_even_digits");
6. assert.equal(lower_function_body.match(new RegExp(`print\\(\\s*${for_loop_variable}\\s*\\)`))?.[0], `print(${for_loop_variable})`);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687bbfd9a7d6b78cd5b5cf*
