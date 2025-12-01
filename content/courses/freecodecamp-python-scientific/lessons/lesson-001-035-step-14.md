---
id: lesson-001-035
title: Step 14
chapterId: chapter-01
order: 35
duration: 5
objectives:
  - Step 14
---

# Step 14

Just as the step is optional, a start at `0` and an end at the end of the slice are optional:

```python
my_string = 'camperbot'
camperbot = my_string[::]
```

Assign the reverse of the full `card_number` string to the `card_number_reversed` variable.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[-1:-5:-1]
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

1. You should have `card_number_reversed = card_number[::-1]` within the `verify_card_number` function.
2. assert.match(function_body, /card_number_reversed\s*=\s*card_number\s*\[\s*:\s*:\s*-1\s*\]/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 656b481ec4976439565a78b2*
