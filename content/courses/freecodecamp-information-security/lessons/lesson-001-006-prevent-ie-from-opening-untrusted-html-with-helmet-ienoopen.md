---
id: lesson-001-006
title: Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()
chapterId: chapter-01
order: 6
duration: 5
objectives:
  - Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()
---

# Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open those HTML files in the context of your site. This means that an untrusted HTML page could start doing bad things in the context of your pages. This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site's context.

## Instructions

Use the `helmet.ieNoOpen()` method on your server.

## Hints

1. helmet.ieNoOpen() middleware should be mounted correctly

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 587d8248367417b2b2512c3b*
