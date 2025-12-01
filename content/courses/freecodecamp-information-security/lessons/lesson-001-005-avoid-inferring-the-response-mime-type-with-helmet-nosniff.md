---
id: lesson-001-005
title: Avoid Inferring the Response MIME Type with helmet.noSniff()
chapterId: chapter-01
order: 5
duration: 5
objectives:
  - Avoid Inferring the Response MIME Type with helmet.noSniff()
---

# Avoid Inferring the Response MIME Type with helmet.noSniff()

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

Browsers can use content or MIME sniffing to override the `Content-Type` header of a response to guess and process the data using an implicit content type. While this can be convenient in some scenarios, it can also lead to some dangerous attacks. This middleware sets the `X-Content-Type-Options` header to `nosniff`, instructing the browser to not bypass the provided `Content-Type`.

## Instructions

Use the `helmet.noSniff()` method on your server.

## Hints

1. helmet.noSniff() middleware should be mounted correctly

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 587d8248367417b2b2512c3a*
