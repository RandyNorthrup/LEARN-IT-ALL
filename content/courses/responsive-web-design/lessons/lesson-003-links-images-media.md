---
id: lesson-003-links-images-media
title: "Connect Pages, Images, Audio, and Video"
chapterId: ch1-web-foundations
order: 3
duration: 35
objectives:
  - "Choose accessible links and media elements with resilient fallback content."
---

# Connect Pages, Images, Audio, and Video

## Why this matters

Responsive interfaces work when structure, presentation, and interaction reinforce one another. Choose accessible links and media elements with resilient fallback content. This lesson gives you a mental model first, then asks you to prove it in a real build.

## Theory

- links need meaningful accessible names.
- images need purpose-appropriate alt text and explicit dimensions reduce layout shift.
- audio, video, picture, source, track, SVG, and iframe solve different media jobs.

These ideas form one causal chain: browser input becomes a document tree, CSS creates boxes from that tree, and users experience those boxes through different screens, input devices, preferences, and assistive technologies. Test each link instead of treating a passing screenshot as proof.

## Worked reasoning

Before editing code, name the content relationship or layout constraint. Choose the native element or CSS mechanism that expresses it. Then test narrow width, keyboard navigation, zoom, and an unexpected amount of content. This sequence catches structural mistakes before visual polish hides them.

## Build to learn

**LAB:** Create a small media gallery with an image, caption, and playable video.

1. Read every automated requirement before coding.
2. Make the smallest semantic change that can satisfy one requirement.
3. Use the live preview, then run tests for evidence.
4. When a test fails, explain what the browser currently sees before changing code.
5. After passing, resize the preview mentally: identify one edge case the automated checks do not cover.

## Retrieval check

Without looking back, explain this lesson's most important decision in one sentence. Then name one tempting shortcut and the user who would be harmed by it.
