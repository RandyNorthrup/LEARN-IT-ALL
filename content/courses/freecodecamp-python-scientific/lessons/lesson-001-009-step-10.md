---
id: lesson-001-009
title: Step 10
chapterId: chapter-01
order: 9
duration: 5
objectives:
  - Step 10
---

# Step 10

You have accessed elements (characters) of a string before, using the index operator `[]`. You can also use the index operator to access a range of characters in a string with `string[start:stop:step]`:

```python
my_string = 'camperbot'
my_string[0:6] == 'camper' # True
my_string[0:6:3] == 'cp' # True
```

Where `start` is the starting index (inclusive), `stop` is the ending index (exclusive), and `step` is the amount of characters to skip over. If not specified, `step` is default to 1.

Create a variable named `card_number_reversed` and assign it the value of the first 4 characters of `card_number`.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    
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

1. You should have `card_number_reversed = card_number[0:4]` within the `verify_card_number` function.
2. assert.match(function_body, /card_number_reversed\s*=\s*card_number\s*\[\s*0\s*:\s*4\s*\]/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 656879c6f35a85a59c06b3a7*
