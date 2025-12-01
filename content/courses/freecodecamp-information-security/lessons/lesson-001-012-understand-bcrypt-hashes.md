---
id: lesson-001-012
title: Understand BCrypt Hashes
chapterId: chapter-01
order: 12
duration: 5
objectives:
  - Understand BCrypt Hashes
---

# Understand BCrypt Hashes

For the following challenges, you will be working with a new starter project that is different from the previous one. You can find the new starter project to clone on <a href="https://github.com/freeCodeCamp/boilerplate-bcrypt/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

BCrypt hashes are very secure. A hash is basically a fingerprint of the original data- always unique. This is accomplished by feeding the original data into an algorithm and returning a fixed length result. To further complicate this process and make it more secure, you can also *salt* your hash. Salting your hash involves adding random data to the original data before the hashing process which makes it even harder to crack the hash.

BCrypt hashes will always look like `$2a$13$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm` which does have a structure. The first small bit of data `$2a` is defining what kind of hash algorithm was used. The next portion `$13` defines the *cost*. Cost is about how much power it takes to compute the hash. It is on a logarithmic scale of 2^cost and determines how many times the data is put through the hashing algorithm. For example, at a cost of 10 you are able to hash 10 passwords a second on an average computer, however at a cost of 15 it takes 3 seconds per hash... and to take it further, at a cost of 31 it would take multiple days to complete a hash. A cost of 12 is considered very secure at this time. The last portion of your hash `$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm`, looks like one large string of numbers, periods, and letters but it is actually two separate pieces of information. The first 22 characters is the salt in plain text, and the rest is the hashed password!

## Instructions

Add all your code for these lessons in the `server.js` file between the code we have started you off with. Do not change or delete the code we have added for you.

BCrypt has already been added as a dependency, so require it as `bcrypt` in your server.

Submit your page when you think you've got it right.

## Hints

1. BCrypt should be a dependency.
2. BCrypt should be properly required.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 58a25bcef9fc0f352b528e7c*
