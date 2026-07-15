---
id: lesson-009-css-foundations
title: "CSS Foundations and the Cascade"
chapterId: ch4-css-foundations
order: 9
duration: 35
objectives:
  - "Write valid rules and predict cascade, specificity, inheritance, and source order."
---

# CSS Foundations and the Cascade

## Why this matters

Responsive interfaces work when structure, presentation, and interaction reinforce one another. Write valid rules and predict cascade, specificity, inheritance, and source order. This lesson gives you a mental model first, then asks you to prove it in a real build.

## Theory

- selectors choose elements while declarations pair properties with values.
- origin, importance, cascade layers, specificity, scope proximity, and source order resolve conflicts.
- inheritance and initial values differ by property.

These ideas form one causal chain: browser input becomes a document tree, CSS creates boxes from that tree, and users experience those boxes through different screens, input devices, preferences, and assistive technologies. Test each link instead of treating a passing screenshot as proof.

## Worked reasoning

Before editing code, name the content relationship or layout constraint. Choose the native element or CSS mechanism that expresses it. Then test narrow width, keyboard navigation, zoom, and an unexpected amount of content. This sequence catches structural mistakes before visual polish hides them.

## Build to learn

**WORKSHOP:** Style a reading card using low-specificity reusable selectors.

1. Read every automated requirement before coding.
2. Make the smallest semantic change that can satisfy one requirement.
3. Use the live preview, then run tests for evidence.
4. When a test fails, explain what the browser currently sees before changing code.
5. After passing, resize the preview mentally: identify one edge case the automated checks do not cover.

## Retrieval check

Without looking back, explain this lesson's most important decision in one sentence. Then name one tempting shortcut and the user who would be harmed by it.
