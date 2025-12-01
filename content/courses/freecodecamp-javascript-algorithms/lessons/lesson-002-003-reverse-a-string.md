---
id: lesson-002-003
title: Reverse a String
chapterId: chapter-02
order: 3
duration: 5
objectives:
  - Reverse a String
---

# Reverse a String

Reverse the provided string and return the reversed string.

For example, `"hello"` should become `"olleh"`.

## Starter Code

```html
function reverseString(str) {
  return str;
}

reverseString('hello');
```

## Hints

1. `reverseString("hello")` should return a string.
2. `reverseString("hello")` should return the string `olleh`.
3. `reverseString("Howdy")` should return the string `ydwoH`.
4. `reverseString("Greetings from Earth")` should return the string `htraE morf sgniteerG`.

## Solution

```html
```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

reverseString('hello');
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a202eed8fc186c8434cb6d61*
