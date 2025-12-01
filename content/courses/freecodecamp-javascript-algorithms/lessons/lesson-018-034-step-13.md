---
id: lesson-018-034
title: Step 13
chapterId: chapter-18
order: 34
duration: 5
objectives:
  - Step 13
---

# Step 13

Reverse the order of the digits in the last four digits of `card_number`, by using a slice with a step of `-1`. You can use either negative or positive indices for the start and end indices.

## Starter Code

```html
--fcc-editable-region--
def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[0:4:2]
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

1. You should have `card_number_reversed = card_number[-1:-5:-1]` within the `verify_card_number` function. Expected `--fcc-actual--` to equal `--fcc-expected--`.
2. const pyCode = `
card_number = "4111111145551142"
${def}
${function_body.match(/ +/)[0]}return card_number_reversed
3. verify_card_number(card_number)
`;
        const out = runPython(pyCode, {});
        assert.equal(out, "2411");
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 656b47dc2cf39e37025dc033*
