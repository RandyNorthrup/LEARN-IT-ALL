---
id: lesson-001-computer-browser-tooling
title: "How Browsers Turn Files into Pages"
chapterId: ch1-web-foundations
order: 1
duration: 35
objectives:
  - "Trace a request from URL to rendered document and use developer tools to inspect it."
---

# How Browsers Turn Files into Pages

## Why this matters

Responsive interfaces work when structure, presentation, and interaction reinforce one another. Trace a request from URL to rendered document and use developer tools to inspect it. This lesson gives you a mental model first, then asks you to prove it in a real build.

## Theory

- URLs identify resources while HTTP moves representations.
- HTML supplies structure, CSS supplies presentation, and browser developer tools expose the result.
- file names, folders, and relative paths determine whether assets resolve.

These ideas form one causal chain: browser input becomes a document tree, CSS creates boxes from that tree, and users experience those boxes through different screens, input devices, preferences, and assistive technologies. Test each link instead of treating a passing screenshot as proof.

## Worked reasoning

Before editing code, name the content relationship or layout constraint. Choose the native element or CSS mechanism that expresses it. Then test narrow width, keyboard navigation, zoom, and an unexpected amount of content. This sequence catches structural mistakes before visual polish hides them.

## Build to learn

**WORKSHOP:** Build a browser field guide with a useful heading, navigation, and a DevTools reminder.

1. Read every automated requirement before coding.
2. Make the smallest semantic change that can satisfy one requirement.
3. Use the live preview, then run tests for evidence.
4. When a test fails, explain what the browser currently sees before changing code.
5. After passing, resize the preview mentally: identify one edge case the automated checks do not cover.

## Retrieval check

Without looking back, explain this lesson's most important decision in one sentence. Then name one tempting shortcut and the user who would be harmed by it.
