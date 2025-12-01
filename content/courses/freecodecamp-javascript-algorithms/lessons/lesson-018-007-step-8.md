---
id: lesson-018-007
title: Step 8
chapterId: chapter-18
order: 7
duration: 5
objectives:
  - Step 8
---

# Step 8

Within your `main` function, call the `verify_card_number` function and pass in the `translated_card_number` variable as an argument.

## Starter Code

```html
def verify_card_number(card_number):
    pass

--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    print(translated_card_number)

--fcc-editable-region--
main()
```

## Hints

1. You should have `verify_card_number(translated_card_number)` within the `main` function.
2. assert.match(function_body, / +verify_card_number\(\s*translated_card_number\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656879613a96aba21cbe80b9*
