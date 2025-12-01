---
id: lesson-001-003
title: Step 3
chapterId: chapter-01
order: 3
duration: 5
objectives:
  - Step 3
---

# Step 3

Python comes with built-in classes that can help us with string manipulation. One of them is the `str` class. It has a method called `maketrans` that can help us create a translation table. This table can be used to replace characters in a string:

```python
str.maketrans({'t': 'c', 'l': 'b'})
```

The above, when called on a string, will replace all `t` characters with `c` and all `l` characters with `b`.

Create a variable called `card_translation` and assign it a translation table to replace all `-` and ` ` characters with an empty string.

## Starter Code

```html
--fcc-editable-region--
def main():
    card_number = '4111-1111-4555-1142'
    
--fcc-editable-region--
```

## Hints

1. You should create a `card_translation` variable within `main`.
2. assert.match(function_body, / +card_translation\s*=/);
    }
})
3. You should assign `card_translation` a value of `str.maketrans({'-': '', ' ': ''})`.
4. const allowedMatches = [
            / +card_translation\s*=\s*str\.maketrans\(\s*\{\s*('|")-\1\s*:\s*('|")\2\s*,\s*('|") \3\s*:\s*('|")\4\s*\}\s*\)/,
            / +card_translation\s*=\s*str\.maketrans\(\s*\{\s*('|") \1\s*:\s*('|")\2\s*,\s*('|")-\3\s*:\s*('|")\4\s*\}\s*\)/,
        ];
        const anyMatch = allowedMatches.some((match) => match.test(function_body));
        assert.isTrue(anyMatch);
    }
})

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 656877f71bba2b97acedf9af*
