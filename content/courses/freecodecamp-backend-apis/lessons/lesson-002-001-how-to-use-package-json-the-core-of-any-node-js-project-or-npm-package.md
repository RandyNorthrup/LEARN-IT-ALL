---
id: lesson-002-001
title: How to Use package.json, the Core of Any Node.js Project or npm Package
chapterId: chapter-02
order: 1
duration: 5
objectives:
  - How to Use package.json, the Core of Any Node.js Project or npm Package
---

# How to Use package.json, the Core of Any Node.js Project or npm Package

Working on these challenges will involve you writing your code using one of the following methods:

- Clone <a href="https://github.com/freeCodeCamp/boilerplate-npm/" target="_blank" rel="noopener noreferrer nofollow">this GitHub repo</a> and complete these challenges locally.
- Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

The `package.json` file is the center of any Node.js project or npm package. It stores information about your project. It consists of a single JSON object where information is stored in key-value pairs. There are only two required fields; `name` and `version`, but it’s good practice to provide additional information.

You can create the `package.json` file from the terminal using the `npm init` command. This will run a guided setup. Using `npm init` with the `-y` flag will generate the file without having it ask any questions, `npm init -y`.

If you look at the file tree of your project, you will find the `package.json` file on the top level of the tree. This is the file that you will be improving in the next couple of challenges.

One of the most common pieces of information in this file is the `author` field. It specifies who created the project, and can consist of a string or an object with contact or other details. An object is recommended for bigger projects, but a simple string like the following example will do for this project.

```json
"author": "Jane Doe",
```

## Instructions

Add your name as the `author` of the project in the `package.json` file.

**Note:** Remember that you’re writing JSON, so all field names must use double-quotes (") and be separated with a comma (,).

## Hints

1. `package.json` should have a valid "author" key

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb3367417b2b2512bfb*
