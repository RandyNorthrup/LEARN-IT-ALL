---
id: lesson-038-013
title: Match Characters that Occur Zero or More Times
chapterId: chapter-38
order: 13
duration: 5
objectives:
  - Match Characters that Occur Zero or More Times
---

# Match Characters that Occur Zero or More Times

The last challenge used the plus `+` sign to look for characters that occur one or more times. There's also an option that matches characters that occur zero or more times.

The character to do this is the asterisk or star: `*`.

```js
let soccerWord = "gooooooooal!";
let gPhrase = "gut feeling";
let oPhrase = "over the moon";
let goRegex = /go*/;
soccerWord.match(goRegex);
gPhrase.match(goRegex);
oPhrase.match(goRegex);
```

In order, the three `match` calls would return the values `["goooooooo"]`, `["g"]`, and `null`.

## Instructions

Create a regex `chewieRegex` that uses the `*` character to match an uppercase `A` character immediately followed by zero or more lowercase `a` characters in `chewieQuote`. Your regex does not need flags or character classes, and it should not match any of the other quotes.

## Starter Code

```html
const chewieQuote = "Aaaaaaaaaaaaaaaarrrgh!";
// Only change code below this line
let chewieRegex = /change/; // Change this line
// Only change code above this line

let result = chewieQuote.match(chewieRegex);
```

## Hints

1. Your regex `chewieRegex` should use the `*` character to match zero or more `a` characters.
2. Your regex should match the string `A` in `chewieQuote`.
3. Your regex should match the string `Aaaaaaaaaaaaaaaa` in `chewieQuote`.
4. Your regex `chewieRegex` should match 16 characters in `chewieQuote`.
5. Your regex should not match any characters in the string `He made a fair move. Screaming about it can't help you.`
6. Your regex should not match any characters in the string `Let him have it. It's not wise to upset a Wookiee.`

## Solution

```html
```js
const chewieQuote = "Aaaaaaaaaaaaaaaarrrgh!";
let chewieRegex = /Aa*/;
let result = chewieQuote.match(chewieRegex);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db6367417b2b2512b9a*
