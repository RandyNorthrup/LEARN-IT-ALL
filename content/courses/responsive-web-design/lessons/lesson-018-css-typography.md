---
id: lesson-018-css-typography
title: "Readable, Resilient Typography"
chapterId: ch6-flex-typography
order: 18
duration: 35
objectives:
  - "Choose font stacks and tune measure, rhythm, weight, spacing, and wrapping."
---

# Readable, Resilient Typography

## Why this matters

Responsive interfaces work when structure, presentation, and interaction reinforce one another. Choose font stacks and tune measure, rhythm, weight, spacing, and wrapping. This lesson gives you a mental model first, then asks you to prove it in a real build.

## Theory

- system and web font stacks need fallbacks and appropriate loading strategy.
- line height, measure, paragraph spacing, and hierarchy drive readability.
- font-display, variable fonts, text-wrap, hyphenation, and overflow-wrap handle performance and edge cases.

These ideas form one causal chain: browser input becomes a document tree, CSS creates boxes from that tree, and users experience those boxes through different screens, input devices, preferences, and assistive technologies. Test each link instead of treating a passing screenshot as proof.

## Worked reasoning

Before editing code, name the content relationship or layout constraint. Choose the native element or CSS mechanism that expresses it. Then test narrow width, keyboard navigation, zoom, and an unexpected amount of content. This sequence catches structural mistakes before visual polish hides them.

## Build to learn

**LAB:** Typeset a long-form article with fluid heading and readable measure.

1. Read every automated requirement before coding.
2. Make the smallest semantic change that can satisfy one requirement.
3. Use the live preview, then run tests for evidence.
4. When a test fails, explain what the browser currently sees before changing code.
5. After passing, resize the preview mentally: identify one edge case the automated checks do not cover.

## Retrieval check

Without looking back, explain this lesson's most important decision in one sentence. Then name one tempting shortcut and the user who would be harmed by it.
