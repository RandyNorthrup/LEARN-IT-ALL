---
id: lesson-001-014
title: Hash and Compare Passwords Synchronously
chapterId: chapter-01
order: 14
duration: 5
objectives:
  - Hash and Compare Passwords Synchronously
---

# Hash and Compare Passwords Synchronously

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-bcrypt/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

Hashing synchronously is just as easy to do but can cause lag if using it server side with a high cost or with hashing done very often. Hashing with this method is as easy as calling

```js
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
```

Add this method of hashing to your code and then log the result to the console. Again, the variables used are already defined in the server so you won't need to adjust them. You may notice even though you are hashing the same password as in the async function, the result in the console is different- this is due to the salt being randomly generated each time as seen by the first 22 characters in the third string of the hash. Now to compare a password input with the new sync hash, you would use the compareSync method:

```js
var result = bcrypt.compareSync(myPlaintextPassword, hash);
```

with the result being a boolean true or false.

## Instructions

Add the function in and log the result to the console to see it working.

Submit your page when you think you've got it right.

## Hints

1. Sync hash should be generated and correctly compared.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 58a25bcff9fc0f352b528e7e*
