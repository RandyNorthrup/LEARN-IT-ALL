---
id: lesson-019-css-accessibility
title: "Accessible CSS and User Preferences"
chapterId: ch7-css-access-layout
order: 19
duration: 35
objectives:
  - "Preserve zoom, focus, contrast, target size, reading order, and user preferences."
---

# Accessible CSS and User Preferences

## Why this matters

Responsive interfaces work when structure, presentation, and interaction reinforce one another. Preserve zoom, focus, contrast, target size, reading order, and user preferences. This lesson gives you a mental model first, then asks you to prove it in a real build.

## Theory

- CSS can create barriers through hidden focus, fixed text, clipped content, and reordered layouts.
- prefers-reduced-motion, prefers-contrast, forced-colors, and color-scheme respect environment needs.
- responsive reflow at zoom is an accessibility requirement, not polish.

These ideas form one causal chain: browser input becomes a document tree, CSS creates boxes from that tree, and users experience those boxes through different screens, input devices, preferences, and assistive technologies. Test each link instead of treating a passing screenshot as proof.

## Worked reasoning

Before editing code, name the content relationship or layout constraint. Choose the native element or CSS mechanism that expresses it. Then test narrow width, keyboard navigation, zoom, and an unexpected amount of content. This sequence catches structural mistakes before visual polish hides them.

## Build to learn

**LAB:** Repair an animated call-to-action so focus and reduced-motion users receive equivalent feedback.

1. Read every automated requirement before coding.
2. Make the smallest semantic change that can satisfy one requirement.
3. Use the live preview, then run tests for evidence.
4. When a test fails, explain what the browser currently sees before changing code.
5. After passing, resize the preview mentally: identify one edge case the automated checks do not cover.

## Retrieval check

Without looking back, explain this lesson's most important decision in one sentence. Then name one tempting shortcut and the user who would be harmed by it.
