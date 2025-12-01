---
id: lesson-008-021
title: DNA Pairing
chapterId: chapter-08
order: 21
duration: 5
objectives:
  - DNA Pairing
---

# DNA Pairing

Pairs of DNA strands consist of nucleobase pairs. Base pairs are represented by the characters <em>AT</em> and <em>CG</em>, which form building blocks of the DNA double helix.

The DNA strand is missing the pairing element. Write a function to match the missing base pairs for the provided DNA strand. For each character in the provided string, find the base pair character. Return the results as a 2d array.

For example, for the input `GCG`, return `[["G", "C"], ["C","G"], ["G", "C"]]`

The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.

## Starter Code

```html
function pairElement(str) {
  return str;
}

pairElement("GCG");
```

## Hints

1. `pairElement("ATCGA")` should return `[["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]]`.
2. `pairElement("TTGAG")` should return `[["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]]`.
3. `pairElement("CTCTA")` should return `[["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]]`.

## Solution

```html
```js
var lookup = Object.create(null);
lookup.A = 'T';
lookup.T = 'A';
lookup.C = 'G';
lookup.G = 'C';

function pairElement(str) {
 return str.split('').map(function(p) {return [p, lookup[p]];});
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: afd15382cdfb22c9efe8b7de*
