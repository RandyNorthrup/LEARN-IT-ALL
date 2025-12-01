---
id: lesson-001-004
title: Step 4
chapterId: chapter-01
order: 4
duration: 5
objectives:
  - Step 4
---

# Step 4

Defining the translation does not in itself translate the string. The `translate` method must be called on the string to be translated with the translation table as an argument:

```py
my_string = "tamperlot"
translation_table = str.maketrans({'t': 'c', 'l': 'b'})
translated_string = my_string.translate(translation_table)
```

Create a variable called `translated_card_number` and assign it the result of calling the `translate` method on `card_number` with `card_translation` as an argument.

## Starter Code

```html
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    
--fcc-editable-region--
```

## Hints

1. You should create a `translated_card_number` variable within `main`.
2. assert.match(function_body, / +translated_card_number\s*=/);
    }
})
3. You should assign `translated_card_number` a value of `card_number.translate(card_translation)`.
4. assert.match(function_body, / +translated_card_number\s*=\s*card_number\.translate\(\s*card_translation\s*\)/);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 656878585631369a6b2d2191*
