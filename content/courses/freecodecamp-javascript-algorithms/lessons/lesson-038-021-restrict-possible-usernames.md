---
id: lesson-038-021
title: Restrict Possible Usernames
chapterId: chapter-38
order: 21
duration: 5
objectives:
  - Restrict Possible Usernames
---

# Restrict Possible Usernames

Usernames are used everywhere on the internet. They are what give users a unique identity on their favorite sites.

You need to check all the usernames in a database. Here are some simple rules that users have to follow when creating their username.

1) Usernames can only use alphanumeric characters.

2) The only numbers in the username have to be at the end. There can be zero or more of them at the end. Username cannot start with the number.

3) Username letters can be lowercase and uppercase.

4) Usernames have to be at least two characters long. A two-character username can only use alphabet letters as characters.

## Instructions

Change the regex `userCheck` to fit the constraints listed above.

## Starter Code

```html
let username = "JackOfAllTrades";
let userCheck = /change/; // Change this line
let result = userCheck.test(username);
```

## Hints

1. Your regex should match the string `JACK`
2. Your regex should not match the string `J`
3. Your regex should match the string `Jo`
4. Your regex should match the string `Oceans11`
5. Your regex should match the string `RegexGuru`
6. Your regex should not match the string `007`
7. Your regex should not match the string `9`
8. Your regex should not match the string `A1`
9. Your regex should not match the string `BadUs3rnam3`
10. Your regex should match the string `Z97`
11. Your regex should not match the string `c57bT3`
12. Your regex should match the string `AB1`
13. Your regex should not match the string `J%4`

## Solution

```html
```js
let username = "JackOfAllTrades";
const userCheck = /^[a-z]([0-9]{2,}|[a-z]+\d*)$/i;
let result = userCheck.test(username);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db8367417b2b2512ba2*
