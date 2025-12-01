---
id: lesson-009-001
title: Caesars Cipher
chapterId: chapter-09
order: 1
duration: 5
objectives:
  - Caesars Cipher
---

# Caesars Cipher

One of the simplest and most widely known <dfn>ciphers</dfn> is a <dfn>Caesar cipher</dfn>, also known as a <dfn>shift cipher</dfn>. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the <a href="https://www.freecodecamp.org/news/how-to-code-the-caesar-cipher-an-introduction-to-basic-encryption-3bf77b4e19f7/" target="_blank" rel="noopener noreferrer nofollow">ROT13</a> cipher, where the values of the letters are shifted by 13 places. Thus `A ↔ N`, `B ↔ O` and so on.

Write a function which takes a <a href="https://www.freecodecamp.org/news/how-to-code-the-caesar-cipher-an-introduction-to-basic-encryption-3bf77b4e19f7/" target="_blank" rel="noopener noreferrer nofollow">ROT13</a> encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

## Starter Code

```html
function rot13(str) {
  return str;
}

rot13("SERR PBQR PNZC");
```

## Hints

1. `rot13("SERR PBQR PNZC")` should decode to the string `FREE CODE CAMP`
2. `rot13("SERR CVMMN!")` should decode to the string `FREE PIZZA!`
3. `rot13("SERR YBIR?")` should decode to the string `FREE LOVE?`
4. `rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")` should decode to the string `THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.`

## Solution

```html
```js
var lookup = {
  'A': 'N','B': 'O','C': 'P','D': 'Q',
  'E': 'R','F': 'S','G': 'T','H': 'U',
  'I': 'V','J': 'W','K': 'X','L': 'Y',
  'M': 'Z','N': 'A','O': 'B','P': 'C',
  'Q': 'D','R': 'E','S': 'F','T': 'G',
  'U': 'H','V': 'I','W': 'J','X': 'K',
  'Y': 'L','Z': 'M'
};

function rot13(encodedStr) {
  var codeArr = encodedStr.split("");  // String to Array
  var decodedArr = []; // Your Result goes here
  // Only change code below this line

  decodedArr = codeArr.map(function(letter) {
    if(lookup.hasOwnProperty(letter)) {
      letter = lookup[letter];
    }
    return letter;
  });

  // Only change code above this line
  return decodedArr.join(""); // Array to String
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 56533eb9ac21ba0edf2244e2*
