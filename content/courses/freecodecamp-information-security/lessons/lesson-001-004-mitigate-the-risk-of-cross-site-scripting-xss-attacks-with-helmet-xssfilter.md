---
id: lesson-001-004
title: >-
chapterId: chapter-01
order: 4
duration: 5
objectives:
  - >-
---

# >-

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.

The basic rule to lower the risk of an XSS attack is simple: "Never trust user's input". As a developer you should always sanitize all the input coming from the outside. This includes data coming from forms, GET query urls, and even from POST bodies. Sanitizing means that you should find and encode the characters that may be dangerous e.g. &lt;, >.

Modern browsers can help mitigating the risk by adopting better software strategies. Often these are configurable via http headers.

The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it. It still has limited support.

## Instructions

Use `helmet.xssFilter()` to sanitize input sent to your server.

## Hints

1. helmet.xssFilter() middleware should be mounted correctly

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 587d8247367417b2b2512c39*
