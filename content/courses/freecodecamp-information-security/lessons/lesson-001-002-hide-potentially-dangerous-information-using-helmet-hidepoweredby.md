---
id: lesson-001-002
title: Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
---

# Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express. `X-Powered-By: Express` is sent in every request coming from Express by default. Use the `helmet.hidePoweredBy()` middleware to remove the X-Powered-By header.

## Hints

1. helmet.hidePoweredBy() middleware should be mounted correctly

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 587d8247367417b2b2512c37*
