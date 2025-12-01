---
id: lesson-001-008
title: Disable DNS Prefetching with helmet.dnsPrefetchControl()
chapterId: chapter-01
order: 8
duration: 5
objectives:
  - Disable DNS Prefetching with helmet.dnsPrefetchControl()
---

# Disable DNS Prefetching with helmet.dnsPrefetchControl()

As a reminder, this project is being built upon the following starter project cloned from <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>.

To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks on a link. This may lead to over-use of the DNS service (if you own a big website, visited by millions people…), privacy issues (one eavesdropper could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not). If you have high security needs you can disable DNS prefetching, at the cost of a performance penalty.

## Instructions

Use the `helmet.dnsPrefetchControl()` method on your server.

## Hints

1. helmet.dnsPrefetchControl() middleware should be mounted correctly

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/information-security/)*
*Original Challenge ID: 587d8248367417b2b2512c3d*
