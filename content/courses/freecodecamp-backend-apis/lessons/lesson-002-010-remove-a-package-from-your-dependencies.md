---
id: lesson-002-010
title: Remove a Package from Your Dependencies
chapterId: chapter-02
order: 10
duration: 5
objectives:
  - Remove a Package from Your Dependencies
---

# Remove a Package from Your Dependencies

You have now tested a few ways you can manage dependencies of your project by using the package.json's dependencies section. You have also included external packages by adding them to the file and even told npm what types of versions you want, by using special characters such as the tilde or the caret.

But what if you want to remove an external package that you no longer need? You might already have guessed it, just remove the corresponding key-value pair for that package from your dependencies.

This same method applies to removing other fields in your package.json as well.

## Instructions

Remove the `@freecodecamp/example` package from your dependencies.

**Note:** Make sure you have the right amount of commas after removing it.

## Hints

1. `"dependencies"` should not include `"@freecodecamp/example"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb5367417b2b2512c04*
