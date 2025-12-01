---
id: lesson-018-006
title: Step 6
chapterId: chapter-18
order: 6
duration: 5
objectives:
  - Step 6
---

# Step 6

Call the `main` function at the end of your script.

## Starter Code

```html
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    print(translated_card_number)


--fcc-editable-region--
```

## Hints

1. You should have `main()` outside of the `main` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65687946130b0ea10aa19b75*
