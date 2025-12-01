---
id: lesson-008-016
title: Pig Latin
chapterId: chapter-08
order: 16
duration: 5
objectives:
  - Pig Latin
---

# Pig Latin

Pig Latin is a way of altering English Words. The rules are as follows:

\- If a word begins with a consonant, take the first consonant or consonant cluster, move it to the end of the word, and add `ay` to it.

\- If a word begins with a vowel, just add `way` at the end.

## Instructions

Translate the provided string to Pig Latin. Input strings are guaranteed to be English words in all lowercase.

## Starter Code

```html
function translatePigLatin(str) {
  return str;
}

translatePigLatin("consonant");
```

## Hints

1. `translatePigLatin("california")` should return the string `aliforniacay`.
2. `translatePigLatin("paragraphs")` should return the string `aragraphspay`.
3. `translatePigLatin("glove")` should return the string `oveglay`.
4. `translatePigLatin("algorithm")` should return the string `algorithmway`.
5. `translatePigLatin("eight")` should return the string `eightway`.
6. Should handle words where the first vowel comes in the middle of the word.  `translatePigLatin("schwartz")` should return the string `artzschway`.
7. Should handle words without vowels. `translatePigLatin("rhythm")` should return the string `rhythmay`.

## Solution

```html
```js
function translatePigLatin(str) {
  if (isVowel(str.charAt(0))) return str + "way";
  var front = [];
  str = str.split('');
  while (str.length && !isVowel(str[0])) {
    front.push(str.shift());
  }
  return [].concat(str, front).join('') + 'ay';
}

function isVowel(c) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: aa7697ea2477d1316795783b*
