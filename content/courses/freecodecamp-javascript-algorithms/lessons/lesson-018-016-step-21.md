---
id: lesson-018-016
title: Step 21
chapterId: chapter-18
order: 16
duration: 5
objectives:
  - Step 21
---

# Step 21

Currently, your script throws a `TypeError` because you are trying to add a string to an integer. You can fix this by converting the `digit` variable to an integer before adding it to `sum_of_odd_digits`, using the built-in `int` function:

```python
my_string = '123'
my_int = int(my_string)
```

Convert the `digit` variable to an integer before adding it to `sum_of_odd_digits`. Then, move the `print` call to the end of the `verify_card_number` function to print the value of `sum_of_odd_digits`.

## Starter Code

```html
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]

--fcc-editable-region--
    for digit in odd_digits:
        print(digit)
        sum_of_odd_digits += digit
        
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    verify_card_number(translated_card_number)

main()
```

## Hints

1. You should have `sum_of_odd_digits += int(digit)` within the `for` loop.
2. assert.match(function_body, /sum_of_odd_digits\s*\+=\s*int\(\s*digit\s*\)/);
    }
})
3. You should have `print(sum_of_odd_digits)` at the end of the `verify_card_number` function.
4. assert.match(function_body, /print\(\s*sum_of_odd_digits\s*\)/);
    }
})
5. You should not have `print(digit)` anymore.
6. const no_comments = __helpers.python.removeComments(function_body);
7. assert.notMatch(no_comments, /print\(\s*digit\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687b48f2201ab32e06c37c*
