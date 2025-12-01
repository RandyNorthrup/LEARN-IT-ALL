---
id: lesson-001-005
title: Step 5
chapterId: chapter-01
order: 5
duration: 5
objectives:
  - Step 5
---

# Step 5

Print the translated card number to the console.

## Starter Code

```html
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)
    
--fcc-editable-region--
```

## Hints

1. You should print `translated_card_number` to the console.
2. assert.match(function_body, / +print\(\s*translated_card_number\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6568789edf2ed39c81983cc4*
