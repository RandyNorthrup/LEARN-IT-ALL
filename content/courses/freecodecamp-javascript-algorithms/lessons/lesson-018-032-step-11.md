---
id: lesson-018-032
title: Step 11
chapterId: chapter-18
order: 32
duration: 5
objectives:
  - Step 11
---

# Step 11

Print the value of the `card_number_reversed` variable to the console.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[0:4]
    
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

1. You should have `print(card_number_reversed)` within the `verify_card_number` function.
2. assert.match(function_body, /print\(\s*card_number_reversed\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656b4638cb8bcf2729afe9a9*
