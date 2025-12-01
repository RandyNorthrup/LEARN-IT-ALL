---
id: lesson-001-003
title: Mitigate the Risk of Clickjacking with helmet.frameguard()
chapterId: chapter-01
order: 3
duration: 5
objectives:
  - Mitigate the Risk of Clickjacking with helmet.frameguard()
---

# Mitigate the Risk of Clickjacking with helmet.frameguard()

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

Your page could be put in a `<frame>` or `<iframe>` without your consent. This can result in clickjacking attacks, among other things. Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained by executing your page in a malicious context, by means of iframing. In that context, a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.

We don’t need our app to be framed.

## Instructions

Use `helmet.frameguard()` passing with the configuration object `{action: 'deny'}`.

## Hints

1. helmet.frameguard() middleware should be mounted correctly
2. helmet.frameguard() 'action' should be set to 'DENY'

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 587d8247367417b2b2512c38*
