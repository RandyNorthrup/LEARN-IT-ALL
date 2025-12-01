---
id: lesson-001-010
title: Set a Content Security Policy with helmet.contentSecurityPolicy()
chapterId: chapter-01
order: 10
duration: 5
objectives:
  - Set a Content Security Policy with helmet.contentSecurityPolicy()
---

# Set a Content Security Policy with helmet.contentSecurityPolicy()

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

This challenge highlights one promising new defense that can significantly reduce the risk and impact of many type of attacks in modern browsers. By setting and configuring a Content Security Policy you can prevent the injection of anything unintended into your page. This will protect your app from XSS vulnerabilities, undesired tracking, malicious frames, and much more. CSP works by defining an allowed list of content sources which are trusted. You can configure them for each kind of resource a web page may need (scripts, stylesheets, fonts, frames, media, and so on...). There are multiple directives available, so a website owner can have a granular control. See HTML 5 Rocks, KeyCDN for more details. Unfortunately CSP is unsupported by older browsers.

By default, directives are wide open, so it’s important to set the defaultSrc directive as a fallback. Helmet supports both defaultSrc and default-src naming styles. The fallback applies for most of the unspecified directives.

## Instructions

In this exercise, use `helmet.contentSecurityPolicy()`. Configure it by adding a `directives` object. In the object, set the `defaultSrc` to `["'self'"]` (the list of allowed sources must be in an array), in order to trust only your website address by default. Also set the `scriptSrc` directive so that you only allow scripts to be downloaded from your website (`'self'`), and from the domain `'trusted-cdn.com'`.

Hint: in the `'self'` keyword, the single quotes are part of the keyword itself, so it needs to be enclosed in double quotes to be working.

## Hints

1. helmet.contentSecurityPolicy() middleware should be mounted correctly
2. Your csp config is not correct. defaultSrc should be ["'self'"] and scriptSrc should be ["'self'", 'trusted-cdn.com']

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 587d8249367417b2b2512c3f*
