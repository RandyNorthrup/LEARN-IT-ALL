---
id: lesson-001-033
title: Step 12
chapterId: chapter-01
order: 33
duration: 5
objectives:
  - Step 12
---

# Step 12

Change `card_number_reversed` to be every second digit of the first four digits of `card_number`.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[0:4]
    print(card_number_reversed)
    
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

1. You should have `card_number_reversed = card_number[0:4:2]` within the `verify_card_number` function.
2. assert.match(function_body, /card_number_reversed\s*=\s*card_number\s*\[\s*0\s*:\s*4\s*:\s*2\s*\]/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 656b475b394390334828eb12*
