---
id: lesson-012-css-colors
title: "Color, Contrast, and Themes"
chapterId: ch4-css-foundations
order: 12
duration: 35
objectives:
  - "Use modern color syntax, accessible contrast, and theme-aware system colors."
---

# Color, Contrast, and Themes

## Why this matters

Responsive interfaces work when structure, presentation, and interaction reinforce one another. Use modern color syntax, accessible contrast, and theme-aware system colors. This lesson gives you a mental model first, then asks you to prove it in a real build.

## Theory

- hex, rgb, hsl, hwb, lab, lch, oklab, and oklch express color differently.
- contrast must be checked for text, controls, focus indicators, and states.
- currentColor, color-mix, light-dark, and custom properties reduce theme duplication.

These ideas form one causal chain: browser input becomes a document tree, CSS creates boxes from that tree, and users experience those boxes through different screens, input devices, preferences, and assistive technologies. Test each link instead of treating a passing screenshot as proof.

## Worked reasoning

Before editing code, name the content relationship or layout constraint. Choose the native element or CSS mechanism that expresses it. Then test narrow width, keyboard navigation, zoom, and an unexpected amount of content. This sequence catches structural mistakes before visual polish hides them.

## Build to learn

**WORKSHOP:** Build a status banner using OKLCH tokens and a visible focus color.

1. Read every automated requirement before coding.
2. Make the smallest semantic change that can satisfy one requirement.
3. Use the live preview, then run tests for evidence.
4. When a test fails, explain what the browser currently sees before changing code.
5. After passing, resize the preview mentally: identify one edge case the automated checks do not cover.

## Retrieval check

Without looking back, explain this lesson's most important decision in one sentence. Then name one tempting shortcut and the user who would be harmed by it.
