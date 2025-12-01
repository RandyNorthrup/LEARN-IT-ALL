---
id: lesson-001-010
title: No Repeats Please
chapterId: chapter-01
order: 10
duration: 5
objectives:
  - No Repeats Please
---

# No Repeats Please

Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that all characters in the provided string are each unique.

For example, `aab` should return 2 because it has 6 total permutations (`aab`, `aab`, `aba`, `aba`, `baa`, `baa`), but only 2 of them (`aba` and `aba`) don't have the same letter (in this case `a`) repeating.

## Starter Code

```html
function permAlone(str) {
  return str;
}

permAlone('aab');
```

## Hints

1. `permAlone("aab")` should return a number.
2. `permAlone("aab")` should return 2.
3. `permAlone("aaa")` should return 0.
4. `permAlone("aabb")` should return 8.
5. `permAlone("abcdefa")` should return 3600.
6. `permAlone("abfdefa")` should return 2640.
7. `permAlone("zzzzzzzz")` should return 0.
8. `permAlone("a")` should return 1.
9. `permAlone("aaab")` should return 0.
10. `permAlone("aaabb")` should return 12.

## Solution

```html
```js
function permAlone(str) {
  return permuter(str).filter(function(perm) {
    return !perm.match(/(.)\1/g);
  }).length;
}

function permuter(str) {
  // http://staff.roguecc.edu/JMiller/JavaScript/permute.html
  //permArr: Global array which holds the list of permutations
  //usedChars: Global utility array which holds a list of "currently-in-use" characters
  var permArr = [], usedChars = [];
  function permute(input) {
    //convert input into a char array (one element for each character)
    var i, ch, chars = input.split("");
    for (i = 0; i < chars.length; i++) {
      //get and remove character at index "i" from char array
      ch = chars.splice(i, 1);
      //add removed character to the end of used characters
      usedChars.push(ch);
      //when there are no more characters left in char array to add, add used chars to list of permutations
      if (chars.length === 0) permArr[permArr.length] = usedChars.join("");
      //send characters (minus the removed one from above) from char array to be permuted
      permute(chars.join(""));
      //add removed character back into char array in original position
      chars.splice(i, 0, ch);
      //remove the last character used off the end of used characters array
      usedChars.pop();
    }
  }
  permute(str);
  return permArr;
}

permAlone('aab');
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a7bf700cd123b9a54eef01d5*
