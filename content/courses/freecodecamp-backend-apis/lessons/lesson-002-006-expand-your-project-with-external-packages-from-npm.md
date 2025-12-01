---
id: lesson-002-006
title: Expand Your Project with External Packages from npm
chapterId: chapter-02
order: 6
duration: 5
objectives:
  - Expand Your Project with External Packages from npm
---

# Expand Your Project with External Packages from npm

One of the biggest reasons to use a package manager, is their powerful dependency management. Instead of manually having to make sure that you get all dependencies whenever you set up a project on a new computer, npm automatically installs everything for you. But how can npm know exactly what your project needs? Meet the `dependencies` section of your package.json file.

In this section, packages your project requires are stored using the following format:

```json
"dependencies": {
  "package-name": "version",
  "express": "4.14.0"
}

```

## Instructions

Add version `1.1.0` of the `@freecodecamp/example` package to the `dependencies` field of your `package.json` file.

**Note:** `@freecodecamp/example` is a faux package used as a learning tool.

## Hints

1. `"dependencies"` should include `"@freecodecamp/example"`.
2. `"@freecodecamp/example"` version should be `"1.1.0"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb4367417b2b2512c00*
