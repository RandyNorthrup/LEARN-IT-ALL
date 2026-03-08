# CompTIA Network+ Lessons 061–090 Quality Audit Report

**Scope**: Lessons 061–090 (Chapters 7–10)  
**Date**: 2025-01-20  
**Standard**: University-grade courseware quality  
**Target Word Count**: 3,000–6,000 words per lesson  

---

## Executive Summary

30 lesson files were audited across four chapters. The content splits into **two distinct quality tiers**, indicating that lessons 077–090 were written (or rewritten) at a significantly higher standard than lessons 061–076. The most impactful finding is that **zero lessons contain a Practice Questions section**—a critical omission for exam-prep material. Sixteen of 30 lessons fall below the 3,000-word minimum, and structural conventions (section headings, references) are inconsistent across the two tiers.

| Metric | Value |
|--------|-------|
| Total lessons audited | 30 |
| Lessons meeting 3,000-word target | **14 / 30 (47%)** |
| Lessons below 2,000 words ("thin") | **8 / 30 (27%)** |
| Lessons with Practice Questions | **0 / 30 (0%)** |
| Lessons with correct frontmatter | **30 / 30 (100%)** |
| CRITICAL issues | 1 |
| HIGH issues | 2 |
| MEDIUM issues | 3 |
| LOW issues | 2 |

---

## Chapter Mapping Verification

All `chapterId` and `order` fields are **correct** for every file.

| Chapter | Expected `chapterId` | Lessons | Status |
|---------|---------------------|---------|--------|
| Ch 7 – Cloud & Datacenter | `ch7-cloud-datacenter` | 061–067 | ✅ All correct |
| Ch 8 – WAN Technologies | `ch8-wan-technologies` | 068–075 | ✅ All correct |
| Ch 9 – Network Troubleshooting | `ch9-network-troubleshooting` | 076–085 | ✅ All correct |
| Ch 10 – Exam Prep | `ch10-exam-prep` | 086–090 | ✅ All correct |

---

## Per-Lesson Summary Table

### Chapter 7 – Cloud & Datacenter (Lessons 061–067)

| # | Filename | Words | Duration | Has Intro | Has Summary/Takeaways | Has Practice Qs | Has References | Quality Rating | Issues |
|---|----------|------:|:--------:|:---------:|:---------------------:|:---------------:|:--------------:|:--------------:|--------|
| 061 | lesson-061-cloud-models.md | 1,799 | 23 min | ✓ paragraph | ✓ Key Takeaways (L425) | ✗ | ✓ (L437) | ⚠️ THIN | Below 3K words |
| 062 | lesson-062-cloud-deployment.md | 2,002 | 22 min | ✓ paragraph | ✓ Key Takeaways (L474) | ✗ | ✓ (L486) | ⚠️ THIN | Below 3K words |
| 063 | lesson-063-virtualization.md | 2,298 | 25 min | ✓ paragraph | ✓ Key Takeaways (L567) | ✗ | ✓ (L580) | ⚠️ THIN | Below 3K words |
| 064 | lesson-064-network-virtualization.md | 2,014 | 20 min | ✓ paragraph | ✓ Key Takeaways (L515) | ✗ | ✓ (L530) | ⚠️ THIN | Below 3K words |
| 065 | lesson-065-storage-networking.md | 2,228 | 25 min | ✓ paragraph | ✓ Key Takeaways (L547) | ✗ | ✓ (L562) | ⚠️ THIN | Below 3K words |
| 066 | lesson-066-datacenter-architecture.md | 1,736 | 19 min | ✓ paragraph | ✓ Key Takeaways (L413) | ✗ | ✓ (L428) | 🔴 VERY THIN | Far below 3K words |
| 067 | lesson-067-cloud-connectivity.md | 2,253 | 25 min | ✓ paragraph | ✓ Key Takeaways (L561) | ✗ | ✓ (L574) | ⚠️ THIN | Below 3K words |

**Chapter 7 average**: 2,047 words — **32% below target**

### Chapter 8 – WAN Technologies (Lessons 068–075)

| # | Filename | Words | Duration | Has Intro | Has Summary/Takeaways | Has Practice Qs | Has References | Quality Rating | Issues |
|---|----------|------:|:--------:|:---------:|:---------------------:|:---------------:|:--------------:|:--------------:|--------|
| 068 | lesson-068-wan-fundamentals.md | 1,734 | 22 min | ✓ paragraph | ✓ Key Takeaways (L523) | ✗ | ✓ (L538) | 🔴 VERY THIN | Far below 3K words |
| 069 | lesson-069-leased-lines.md | 1,644 | 19 min | ✓ paragraph | ✓ Key Takeaways (L394) | ✗ | ✓ (L409) | 🔴 VERY THIN | Lowest word count in audit |
| 070 | lesson-070-mpls.md | 2,062 | 25 min | ✓ paragraph | ✓ Key Takeaways (L456) | ✗ | ✓ (L471) | ⚠️ THIN | Below 3K words |
| 071 | lesson-071-broadband-technologies.md | 2,093 | 25 min | ✓ paragraph | ✓ Key Takeaways (L531) | ✗ | ✓ (L546) | ⚠️ THIN | Below 3K words |
| 072 | lesson-072-cellular-technologies.md | 2,052 | 25 min | ✓ paragraph | ✓ Key Takeaways (L535) | ✗ | ✓ (L550) | ⚠️ THIN | Below 3K words |
| 073 | lesson-073-satellite-communications.md | 1,741 | 20 min | ✓ paragraph | ✓ Key Takeaways (L460) | ✗ | ✓ (L475) | 🔴 VERY THIN | Far below 3K words |
| 074 | lesson-074-remote-access-technologies.md | 1,996 | 25 min | ✓ paragraph | ✓ Key Takeaways (L598) | ✗ | ✓ (L613) | ⚠️ THIN | Below 3K words |
| 075 | lesson-075-sd-wan.md | 1,652 | 20 min | ✓ paragraph | ✓ Key Takeaways (L486) | ✗ | ✓ (L501) | 🔴 VERY THIN | Second-lowest word count |

**Chapter 8 average**: 1,872 words — **38% below target**

### Chapter 9 – Network Troubleshooting (Lessons 076–085)

| # | Filename | Words | Duration | Has Intro | Has Summary/Takeaways | Has Practice Qs | Has References | Quality Rating | Issues |
|---|----------|------:|:--------:|:---------:|:---------------------:|:---------------:|:--------------:|:--------------:|--------|
| 076 | lesson-076-troubleshooting-methodology.md | 2,161 | 25 min | ✓ paragraph | ✓ Key Takeaways (L550) | ✗ | ✓ (L565) | ⚠️ THIN | Below 3K words |
| 077 | lesson-077-command-line-tools.md | 4,871 | 45 min | ✓ ## Introduction | ✓ Summary (L1075) | ✗ | ✗ | ✅ GOOD | No references section |
| 078 | lesson-078-network-utilities.md | 4,661 | 60 min | ✓ ## Introduction | ✓ Summary (L1314) | ✗ | ✗ | ✅ GOOD | No references section |
| 079 | lesson-079-packet-analyzers.md | 4,318 | 50 min | ✓ ## Introduction | ✓ Summary (L993) | ✗ | ✗ | ✅ GOOD | No references section |
| 080 | lesson-080-cable-testers.md | 4,458 | 55 min | ✓ ## Introduction | ✓ Summary (L877) | ✗ | ✗ | ✅ GOOD | No references section |
| 081 | lesson-081-wireless-tools.md | 3,614 | 45 min | ✓ ## Introduction | ✓ Summary (L741) | ✗ | ✗ | ✅ GOOD | No references section |
| 082 | lesson-082-common-issues-physical.md | 4,481 | 55 min | ✓ ## Introduction | ✓ Summary (L845) | ✗ | ✗ | ✅ GOOD | No references section |
| 083 | lesson-083-common-issues-logical.md | 4,233 | 55 min | ✓ ## Introduction | ✓ Summary (L1196) | ✗ | ✗ | ✅ GOOD | No references section |
| 084 | lesson-084-performance-issues.md | 4,464 | 55 min | ✓ ## Introduction | ✓ Summary (L1046) | ✗ | ✗ | ✅ GOOD | No references section |
| 085 | lesson-085-documentation-troubleshooting.md | 5,288 | 65 min | ✓ ## Introduction | ✓ Summary (L1236) | ✗ | ✗ | ✅ EXCELLENT | Best in audit; no refs |

**Chapter 9 average**: 4,255 words (exc. 076) / 3,860 words (inc. 076) — **meets target**

### Chapter 10 – Exam Prep (Lessons 086–090)

| # | Filename | Words | Duration | Has Intro | Has Summary/Takeaways | Has Practice Qs | Has References | Quality Rating | Issues |
|---|----------|------:|:--------:|:---------:|:---------------------:|:---------------:|:--------------:|:--------------:|--------|
| 086 | lesson-086-exam-overview.md | 3,233 | 40 min | ✓ ## Introduction | ✓ Summary (L725) | ✗ | ✗ | ✅ GOOD | No references section |
| 087 | lesson-087-study-strategies.md | 3,953 | 50 min | ✓ ## Introduction | ✓ Summary (L898) | ✗ | ✗ | ✅ GOOD | No references section |
| 088 | lesson-088-pbq-simulations.md | 2,805 | 35 min | ✓ ## Introduction | ✓ Summary (L631) | ✗ | ✗ | ⚠️ BORDERLINE | Just under 3K words |
| 089 | lesson-089-exam-tips.md | 2,921 | 35 min | ✓ ## Introduction | ✓ Summary (L617) | ✗ | ✗ | ⚠️ BORDERLINE | Just under 3K words |
| 090 | lesson-090-career-paths.md | 3,653 | 45 min | ✓ ## Introduction | ✗ MISSING | ✗ | ✓ Additional Resources (L774) | ⚠️ FAIR | No Summary/Takeaways |

**Chapter 10 average**: 3,313 words — **meets target (marginal)**

---

## Categorized Issues

### 🔴 CRITICAL

#### C1: No Practice Questions in Any Lesson (All 30 files)

**Impact**: For an exam-prep course targeting the CompTIA N10-008 certification, the complete absence of self-assessment questions is a fundamental pedagogical gap. Students have no mechanism for retrieval practice within the lesson context.

**Affected files**: ALL 30 lessons (061–090)

**Recommendation**: Add a `## Practice Questions` section to every lesson with 5–10 questions of mixed types:
- 3–5 multiple-choice questions mirroring N10-008 format
- 1–2 scenario-based questions
- 1 drag-and-drop / matching exercise where applicable
- Answer key with brief explanations

---

### 🟠 HIGH

#### H1: Lessons 061–076 Are Substantially Underweight (16 files)

**Impact**: These 16 lessons average only ~2,000 words—roughly 33% below the 3,000-word minimum target. For university-grade courseware, this depth is insufficient to cover the technical material with adequate explanation, examples, and context.

**Worst offenders** (below 1,800 words):
| File | Words | Gap |
|------|------:|-----|
| [lesson-069-leased-lines.md](../content/courses/comptia-network-plus/lessons/lesson-069-leased-lines.md) | 1,644 | −1,356 |
| [lesson-075-sd-wan.md](../content/courses/comptia-network-plus/lessons/lesson-075-sd-wan.md) | 1,652 | −1,348 |
| [lesson-066-datacenter-architecture.md](../content/courses/comptia-network-plus/lessons/lesson-066-datacenter-architecture.md) | 1,736 | −1,264 |
| [lesson-068-wan-fundamentals.md](../content/courses/comptia-network-plus/lessons/lesson-068-wan-fundamentals.md) | 1,734 | −1,266 |
| [lesson-073-satellite-communications.md](../content/courses/comptia-network-plus/lessons/lesson-073-satellite-communications.md) | 1,741 | −1,259 |

**Recommendation**: Expand each of lessons 061–076 to at least 3,000 words by adding:
- Deeper technical explanations with prose paragraphs (not just bullet lists)
- More real-world scenarios and case studies
- Additional ASCII diagrams or comparison tables
- `## Introduction` section with narrative context (matching 077–090 format)
- Exam relevance callouts (e.g., "**Exam Tip**: CompTIA frequently tests…")

#### H2: Lessons 077–090 Missing References Section (14 files)

**Impact**: Academic credibility requires citation of authoritative sources (RFCs, vendor documentation, CompTIA objectives, textbooks). These 14 lessons have no `## References` section at all.

**Affected files**:
- [lesson-077-command-line-tools.md](../content/courses/comptia-network-plus/lessons/lesson-077-command-line-tools.md)
- [lesson-078-network-utilities.md](../content/courses/comptia-network-plus/lessons/lesson-078-network-utilities.md)
- [lesson-079-packet-analyzers.md](../content/courses/comptia-network-plus/lessons/lesson-079-packet-analyzers.md)
- [lesson-080-cable-testers.md](../content/courses/comptia-network-plus/lessons/lesson-080-cable-testers.md)
- [lesson-081-wireless-tools.md](../content/courses/comptia-network-plus/lessons/lesson-081-wireless-tools.md)
- [lesson-082-common-issues-physical.md](../content/courses/comptia-network-plus/lessons/lesson-082-common-issues-physical.md)
- [lesson-083-common-issues-logical.md](../content/courses/comptia-network-plus/lessons/lesson-083-common-issues-logical.md)
- [lesson-084-performance-issues.md](../content/courses/comptia-network-plus/lessons/lesson-084-performance-issues.md)
- [lesson-085-documentation-troubleshooting.md](../content/courses/comptia-network-plus/lessons/lesson-085-documentation-troubleshooting.md)
- [lesson-086-exam-overview.md](../content/courses/comptia-network-plus/lessons/lesson-086-exam-overview.md)
- [lesson-087-study-strategies.md](../content/courses/comptia-network-plus/lessons/lesson-087-study-strategies.md)
- [lesson-088-pbq-simulations.md](../content/courses/comptia-network-plus/lessons/lesson-088-pbq-simulations.md)
- [lesson-089-exam-tips.md](../content/courses/comptia-network-plus/lessons/lesson-089-exam-tips.md)
- [lesson-090-career-paths.md](../content/courses/comptia-network-plus/lessons/lesson-090-career-paths.md) (has `## Additional Resources` but no formal references)

**Recommendation**: Add a `## References` section to each file citing relevant CompTIA exam objectives, RFCs, vendor docs, and textbook chapters.

---

### 🟡 MEDIUM

#### M1: Inconsistent Section Naming Between Tiers

**Impact**: Reduces navigability and makes automated tooling (table-of-contents generators, linters) harder to implement.

| Convention | Used in | Section Name |
|------------|---------|-------------|
| Tier 1 | 061–076 | `## Key Takeaways` |
| Tier 2 | 077–089 | `## Summary` |
| Tier 2 exception | 090 | *(none — missing entirely)* |

**Recommendation**: Standardize on one heading. Suggested: `## Summary` with a `### Key Takeaways` sub-section containing a bulleted list, applied uniformly to all 30 lessons.

#### M2: Inconsistent Introduction Formatting

**Impact**: Lessons 061–076 begin with an untitled introductory paragraph immediately after the `# Title`. Lessons 077–090 use a proper `## Introduction` heading with multi-paragraph narrative. The latter is substantially better for readability and screen-reader accessibility.

**Affected files**: Lessons 061–076 (16 files)

**Recommendation**: Add `## Introduction` heading to lessons 061–076 and expand the intro content to 2–3 paragraphs covering lesson scope, prerequisites, and exam relevance.

#### M3: Lesson 090 Missing Summary/Key Takeaways

**Impact**: The final lesson in the course has no wrap-up section. It ends with a "Closing Words" subsection inside the last content section but lacks a formal `## Summary` or `## Key Takeaways`.

**File**: [lesson-090-career-paths.md](../content/courses/comptia-network-plus/lessons/lesson-090-career-paths.md)

**Recommendation**: Add a `## Summary` section with key takeaways before the `## Additional Resources` section.

---

### 🟢 LOW

#### L1: Duration Values Proportional But Reflect Thin Content (061–076)

**Impact**: Duration values (19–25 min) are proportional to the current word counts but will need updating once content is expanded.

**Recommendation**: After expanding lesson content per H1, recalculate durations using the formula: ~1 min per 100 words + time for diagrams/exercises.

#### L2: Lessons 088–089 Slightly Below 3,000 Words

**Impact**: At 2,805 and 2,921 words respectively, these lessons are close to the target but technically below it. For exam-prep strategy lessons, this may be acceptable depending on scope.

**Files**:
- [lesson-088-pbq-simulations.md](../content/courses/comptia-network-plus/lessons/lesson-088-pbq-simulations.md) — 2,805 words
- [lesson-089-exam-tips.md](../content/courses/comptia-network-plus/lessons/lesson-089-exam-tips.md) — 2,921 words

**Recommendation**: Minor expansion (200–500 words each) with additional PBQ practice scenarios (088) or more question-type-specific strategies (089).

---

## Structural Quality by Tier

### Tier 1: Lessons 061–076 (Compact Format)

| Attribute | Status | Notes |
|-----------|--------|-------|
| Frontmatter `id` | ✅ All correct | Matches filename without `.md` |
| Frontmatter `title` | ✅ All present | Descriptive, accurate |
| Frontmatter `chapterId` | ✅ All correct | Matches chapter map |
| Frontmatter `order` | ✅ All correct | Matches lesson number |
| Frontmatter `duration` | ✅ Proportional | 19–25 min; will need update after expansion |
| Frontmatter `objectives` | ✅ All present | 4–6 objectives each; substantive |
| `## Introduction` heading | ✗ Missing | Has intro paragraph but no heading |
| Technical content | ⚠️ Adequate | Bullet-point-heavy; lacks prose depth |
| Code blocks / diagrams | ✅ Present | ASCII art diagrams and config examples |
| Tables | ✅ Present | Comparison and specification tables |
| Real-world examples | ✅ Present | Practical scenarios included |
| `## Key Takeaways` | ✅ All present | 5–8 bullet points each |
| `## Practice Questions` | ✗ Missing | Universal gap |
| `## References` | ✅ All present | 4–6 references each |
| TODO / placeholder text | ✅ None found | Content is complete |
| Factual accuracy | ✅ No errors noted | Technically sound for N10-008 |

### Tier 2: Lessons 077–090 (Enhanced Format)

| Attribute | Status | Notes |
|-----------|--------|-------|
| Frontmatter `id` | ✅ All correct | Matches filename without `.md` |
| Frontmatter `title` | ✅ All present | Quoted strings, descriptive |
| Frontmatter `chapterId` | ✅ All correct | Matches chapter map |
| Frontmatter `order` | ✅ All correct | Matches lesson number |
| Frontmatter `duration` | ✅ Proportional | 35–65 min; appropriate for word counts |
| Frontmatter `objectives` | ✅ All present | 4–5 objectives each; quoted strings |
| `## Introduction` heading | ✅ All present | Multi-paragraph with scope, context |
| Technical content | ✅ Strong | Detailed prose, extensive examples |
| Code blocks / diagrams | ✅ Present | Extensive command-line examples (077–079) |
| Tables | ✅ Present | Comparison and specification tables |
| Real-world examples | ✅ Present | Practical scenarios and case studies |
| `## Summary` | ✅ Present (13/14) | Missing only in lesson 090 |
| `## Practice Questions` | ✗ Missing | Universal gap |
| `## References` | ✗ Missing (all 14) | No citation of sources |
| TODO / placeholder text | ✅ None found | Content is complete |
| Factual accuracy | ✅ No errors noted | Technically sound for N10-008 |

---

## Word Count Distribution

```
Words  File
─────  ──────────────────────────────────────────────
1,644  lesson-069-leased-lines.md              ████████░░░░░░░░░░░░░░░░░░ 🔴
1,652  lesson-075-sd-wan.md                    ████████░░░░░░░░░░░░░░░░░░ 🔴
1,734  lesson-068-wan-fundamentals.md          ████████░░░░░░░░░░░░░░░░░░ 🔴
1,736  lesson-066-datacenter-architecture.md   █████████░░░░░░░░░░░░░░░░░ 🔴
1,741  lesson-073-satellite-communications.md  █████████░░░░░░░░░░░░░░░░░ 🔴
1,799  lesson-061-cloud-models.md              █████████░░░░░░░░░░░░░░░░░ ⚠️
1,996  lesson-074-remote-access-technologies.md ██████████░░░░░░░░░░░░░░░░ ⚠️
2,002  lesson-062-cloud-deployment.md          ██████████░░░░░░░░░░░░░░░░ ⚠️
2,014  lesson-064-network-virtualization.md    ██████████░░░░░░░░░░░░░░░░ ⚠️
2,052  lesson-072-cellular-technologies.md     ██████████░░░░░░░░░░░░░░░░ ⚠️
2,062  lesson-070-mpls.md                      ██████████░░░░░░░░░░░░░░░░ ⚠️
2,093  lesson-071-broadband-technologies.md    ██████████░░░░░░░░░░░░░░░░ ⚠️
2,161  lesson-076-troubleshooting-methodology.md ███████████░░░░░░░░░░░░░░░ ⚠️
2,228  lesson-065-storage-networking.md        ███████████░░░░░░░░░░░░░░░ ⚠️
2,253  lesson-067-cloud-connectivity.md        ███████████░░░░░░░░░░░░░░░ ⚠️
2,298  lesson-063-virtualization.md            ███████████░░░░░░░░░░░░░░░ ⚠️
─── 3,000 word target ─────────────────────────────────────────────────────
2,805  lesson-088-pbq-simulations.md           ██████████████░░░░░░░░░░░░ ⚠️
2,921  lesson-089-exam-tips.md                 ██████████████░░░░░░░░░░░░ ⚠️
3,233  lesson-086-exam-overview.md             ████████████████░░░░░░░░░░ ✅
3,614  lesson-081-wireless-tools.md            ██████████████████░░░░░░░░ ✅
3,653  lesson-090-career-paths.md              ██████████████████░░░░░░░░ ✅
3,953  lesson-087-study-strategies.md          ████████████████████░░░░░░ ✅
4,233  lesson-083-common-issues-logical.md     █████████████████████░░░░░ ✅
4,318  lesson-079-packet-analyzers.md          █████████████████████░░░░░ ✅
4,458  lesson-080-cable-testers.md             ██████████████████████░░░░ ✅
4,464  lesson-084-performance-issues.md        ██████████████████████░░░░ ✅
4,481  lesson-082-common-issues-physical.md    ██████████████████████░░░░ ✅
4,661  lesson-078-network-utilities.md         ███████████████████████░░░ ✅
4,871  lesson-077-command-line-tools.md        ████████████████████████░░ ✅
5,288  lesson-085-documentation-troubleshooting.md ██████████████████████████ ✅
```

---

## Prioritized Remediation Plan

### Phase 1 — Critical (Do First)
1. **Add Practice Questions to all 30 lessons** (Issue C1)
   - Start with Chapters 7–8 (061–075) since they need other work anyway
   - 5–10 questions per lesson in N10-008 exam format
   - Include answer key with explanations

### Phase 2 — High Priority
2. **Expand lessons 061–076 to 3,000+ words** (Issue H1)
   - Add `## Introduction` sections (fixes M2 simultaneously)
   - Deepen technical explanations with prose paragraphs
   - Add exam-relevance callouts and additional diagrams
   - Estimated effort: ~1,000–1,400 words per lesson × 16 lessons
3. **Add `## References` to lessons 077–090** (Issue H2)
   - Cite CompTIA N10-008 exam objectives
   - Include relevant RFCs, vendor docs, textbooks

### Phase 3 — Medium Priority
4. **Standardize section naming** (Issue M1)
   - Adopt `## Summary` + `### Key Takeaways` pattern across all 30 lessons
5. **Add Summary section to lesson 090** (Issue M3)
6. **Standardize introduction format** across all 30 lessons (Issue M2)

### Phase 4 — Low Priority
7. **Recalculate durations** after content expansion (Issue L1)
8. **Minor expansion of lessons 088–089** (Issue L2)

---

## Content Quality Notes

### Strengths
- **Factual accuracy**: No technical errors detected across all 30 files
- **Exam alignment**: Content aligns with CompTIA N10-008 exam objectives
- **Tier 2 quality (077–090)**: Excellent depth, extensive examples, strong command-line demonstrations
- **Visual aids**: All lessons use ASCII diagrams, code blocks, and/or tables
- **No placeholder content**: All files contain complete, finished material
- **Correct frontmatter**: 100% pass rate on id, title, chapterId, order, objectives

### Weaknesses
- **Two-tier quality gap**: Lessons 061–076 read like quick-reference guides; 077–090 read like university lecture notes
- **No self-assessment mechanism**: Zero practice questions across entire audit scope
- **Missing references in Tier 2**: Despite being better written, the enhanced lessons dropped the references section
- **Bullet-point dependency (Tier 1)**: Lessons 061–076 rely heavily on bulleted lists rather than explanatory prose

---

## Appendix: Frontmatter Field Verification

All 30 files passed frontmatter validation. Details:

| Field | Rule | Pass Rate |
|-------|------|-----------|
| `id` | Must match filename without `.md` extension | 30/30 ✅ |
| `title` | Must be present, descriptive, and accurate | 30/30 ✅ |
| `chapterId` | Must match chapter assignment map | 30/30 ✅ |
| `order` | Must equal lesson number (061–090) | 30/30 ✅ |
| `duration` | Must be reasonable for content length | 30/30 ✅ |
| `objectives` | Must be present with 4+ substantive entries | 30/30 ✅ |
