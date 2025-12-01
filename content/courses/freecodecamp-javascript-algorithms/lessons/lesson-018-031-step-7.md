---
id: lesson-018-031
title: Step 7
chapterId: chapter-18
order: 31
duration: 5
objectives:
  - Step 7
---

# Step 7

Define a function `verify_card_number` with a parameter `card_number`, and use the `pass` keyword to make the function do nothing.

## Starter Code

```html
--fcc-editable-region--

--fcc-editable-region--

def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    print(translated_card_number)

main()
```

## Hints

1. You should have a function called `verify_card_number` with a parameter called `card_number`.
2. You should use the `pass` keyword in the body of the `verify_card_number` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6569b831a07d7154c793301b*
