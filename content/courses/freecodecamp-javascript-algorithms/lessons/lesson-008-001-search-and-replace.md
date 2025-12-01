---
id: lesson-008-001
title: Search and Replace
chapterId: chapter-08
order: 1
duration: 5
objectives:
  - Search and Replace
---

# Search and Replace

Perform a search and replace on the sentence using the arguments provided and return the new sentence.

First argument is the sentence to perform the search and replace on.

Second argument is the word that you will be replacing (before).

Third argument is what you will be replacing the second argument with (after).

**Note:** Preserve the case of the first character in the original word when you are replacing it. For example if you mean to replace the word `Book` with the word `dog`, it should be replaced as `Dog`

## Starter Code

```html
function myReplace(str, before, after) {
  return str;
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
```

## Hints

1. `myReplace("Let us go to the store", "store", "mall")` should return the string `Let us go to the mall`.
2. `myReplace("He is Sleeping on the couch", "Sleeping", "sitting")` should return the string `He is Sitting on the couch`.
3. `myReplace("I think we should look up there", "up", "Down")` should return the string `I think we should look down there`.
4. `myReplace("This has a spellngi error", "spellngi", "spelling")` should return the string `This has a spelling error`.
5. `myReplace("His name is Tom", "Tom", "john")` should return the string `His name is John`.
6. `myReplace("Let us get back to more Coding", "Coding", "algorithms")` should return the string `Let us get back to more Algorithms`.

## Solution

```html
```js
function myReplace(str, before, after) {
  if (before.charAt(0) === before.charAt(0).toUpperCase()) {
    after = after.charAt(0).toUpperCase() + after.substring(1);
  } else {
    after = after.charAt(0).toLowerCase() + after.substring(1);
  }
  return str.replace(before, after);
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a0b5010f579e69b815e7c5d6*
