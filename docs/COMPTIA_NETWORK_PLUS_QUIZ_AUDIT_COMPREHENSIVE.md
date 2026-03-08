# CompTIA Network+ Quiz Comprehensive Audit Report

**Date:** 2025-01-XX  
**Scope:** All 11 quiz/exam files in `content/courses/comptia-network-plus/quizzes/`  
**Total Questions Reviewed:** 535  

---

## Table of Contents

1. [Per-Quiz Summary](#1-per-quiz-summary)
2. [Issue Severity Summary](#2-issue-severity-summary)
3. [CRITICAL Issues](#3-critical-issues)
4. [HIGH Issues](#4-high-issues)
5. [MEDIUM Issues](#5-medium-issues)
6. [LOW Issues](#6-low-issues)
7. [Cross-Quiz Duplicates](#7-cross-quiz-duplicates)
8. [Within-Quiz Duplicates](#8-within-quiz-duplicates)
9. [Schema Consistency Analysis](#9-schema-consistency-analysis)
10. [Recommendations](#10-recommendations)

---

## 1. Per-Quiz Summary

| File | Questions | Types | TimeLimit | PassScore | Structural Issues |
|------|-----------|-------|-----------|-----------|-------------------|
| quiz-01-chapter-1.json | 50 | MC(50) | 3600s (60m) | 70 | 0 |
| quiz-02-chapter-2.json | 50 | MC(50) | 3600s (60m) | 70 | 0 |
| quiz-03-chapter-3.json | 50 | MC(50) | 3600s (60m) | 70 | 0 |
| quiz-04-chapter-4.json | 60 | MC(50) TF(5) MS(5) | 3600s (60m) | 70 | 0 |
| quiz-05-chapter-5.json | 60 | MC(40) TF(10) MS(10) | 3600s (60m) | 70 | 0 |
| quiz-06-chapter-6.json | 45 | MC(45) | 3600s (60m) | 70 | 0 |
| quiz-07-chapter-7.json | 40 | MC(40) | 3300s (55m) | 70 | 0 |
| quiz-08-chapter-8.json | 40 | MC(40) | 3300s (55m) | 70 | 0 |
| quiz-09-chapter-9.json | 50 | MC(50) | 4200s (70m) | 70 | 0 |
| quiz-10-chapter-10.json | 40 | MC(20) SC(5) TF(5) MS(5) PB(5) | 3600s (60m) | 70 | 0 |
| final-exam.json | 50 | MC(30) SC(5) TF(5) MS(5) PB(5) | 5400s (90m) | 80 | 0 |
| **TOTAL** | **535** | | | | |

**Legend:** MC=multiple-choice, TF=true-false, MS=multiple-select, SC=scenario, PB=performance-based

---

## 2. Issue Severity Summary

| Severity | Count | Description |
|----------|-------|-------------|
| **CRITICAL** | 3 | Factual errors that teach wrong information; schema mismatch preventing grading |
| **HIGH** | 2 | Wrong answer marked correct; ungraded question types |
| **MEDIUM** | 2 | Questionable accuracy; cross-quiz duplicate |
| **LOW** | 1 | Non-standard question types not in TypeScript union |
| **TOTAL** | **8** | |

---

## 3. CRITICAL Issues

### 3.1 CRITICAL — quiz-02 Q2: 40GBASE-SR4 Does NOT Use WDM

- **File:** `quiz-02-chapter-2.json`, question `ch2-q2`
- **Question:** "Which fiber optic standard uses wavelength division multiplexing (WDM) to achieve 40 Gbps over multimode fiber?"
- **Marked Answer:** `[0] 40GBASE-SR4` (correctAnswer: 0)
- **Why It's Wrong:** 40GBASE-SR4 uses **parallel optics** — 4 separate fiber lanes each carrying 10G at the **same** wavelength (850nm). The "SR4" literally means "Short Range, 4 lanes." It does NOT use WDM (wavelength division multiplexing). **40GBASE-LR4** is the standard that uses CWDM (4 wavelengths: 1271, 1291, 1311, 1331 nm), but it operates over **single-mode** fiber, not multimode.
- **Explanation Error:** The explanation states "40GBASE-SR4 uses 4 wavelengths (WDM) over multimode fiber" — this is factually incorrect.
- **Impact:** Students learn incorrect information about fiber optic standards, a core Network+ topic.
- **Fix Options:**
  - **Option A:** Change the question to: "Which fiber optic standard uses parallel optics (4 lanes) to achieve 40 Gbps over multimode fiber?" — Answer remains 40GBASE-SR4.
  - **Option B:** Change the correct answer to 40GBASE-LR4 and modify the question to ask about single-mode fiber.
  - **Option C:** Rewrite entirely to correctly distinguish SR4 (parallel optics/multimode) from LR4 (WDM/single-mode).

---

### 3.2 CRITICAL — quiz-05 Q7: Subnetting Answer Is Wrong (/24 Should Be /23)

- **File:** `quiz-05-chapter-5.json`, question `q7`
- **Question:** "You need to subnet 172.16.0.0/16 to create at least 100 subnets with as many hosts as possible per subnet. What prefix length should you use?"
- **Marked Answer:** `[2] /24` (correctAnswer: 2) — 254 hosts per subnet
- **Correct Answer:** `[1] /23` — 510 hosts per subnet
- **Why It's Wrong:** The question asks for "at least 100 subnets with **as many hosts as possible**." To maximize hosts, you use the fewest subnet bits that still meet the 100-subnet requirement:
  - 7 subnet bits: 2^7 = 128 subnets (≥ 100 ✓), prefix = /16 + 7 = **/23**, hosts = 2^9 - 2 = **510**
  - 8 subnet bits: 2^8 = 256 subnets (≥ 100 ✓), prefix = /16 + 8 = /24, hosts = 2^8 - 2 = 254
  - /23 meets the subnet requirement AND provides more hosts per subnet.
- **Self-Contradicting Explanation:** The explanation says "Need 7 bits for 100+ subnets (2^7 = 128 subnets)" then immediately says "add 8 bits" — contradicting itself. It even acknowledges "/23 only gives 128 subnets (2^7)" which IS sufficient since 128 ≥ 100.
- **Confirmation:** quiz-10 Q36 (`q36`) asks the identical question and has the **correct** answer: "/23 mask, 510 hosts" with a correct explanation: "we need 7 bits (2^7=128 subnets ≥ 100). This gives us /23 (16+7=23)."
- **Impact:** Students learn incorrect subnetting math — a heavily tested Network+ topic.
- **Fix:** Change `correctAnswer` from `2` to `1` and rewrite the explanation to match quiz-10 Q36's correct explanation.

---

### 3.3 CRITICAL — Schema Mismatch: JSON Data vs TypeScript Types

- **Affected:** ALL 535 questions across ALL 11 files
- **Issue:** The TypeScript type definitions in `src/types/quiz.ts` define one schema, but the actual JSON data uses a completely different format:

| Aspect | TypeScript Types | Actual JSON Data |
|--------|-----------------|------------------|
| MC options | `QuizOption[]` (`{id: string, text: string}`) | `string[]` (plain strings) |
| MC correctAnswer | `string` (option id like `"a"`) | `number` (0-based index like `0`) |
| MS options | `QuizOption[]` (`{id, text}`) | `{id, text}[]` (**matches**) |
| MS correctAnswer field | `correctAnswers: string[]` | `correctAnswers: string[]` (**matches**) |
| TF correctAnswer | `boolean` | `boolean` (**matches**) |
| TF options | none expected | none present (**matches**) |

- **Grading Impact:** The grading code in `src/app/api/courses/[courseId]/quizzes/[quizId]/submit/route.ts` performs `userAnswer.answer === question.correctAnswer`. If the frontend sends string option IDs as the TypeScript types suggest, but the JSON has integer indices, the strict equality check (`===`) will always return `false` — **all MC answers would be graded as wrong**.
- **Note:** This may not cause runtime bugs if the frontend also sends numeric indices, but it represents a type-safety violation that could break under refactoring.
- **Fix:** Either update the JSON files to use `{id, text}` options with string ID answers, or update the TypeScript types to match the actual data format (numeric index + string array options).

---

## 4. HIGH Issues

### 4.1 HIGH — quiz-10 Q20: Wrong Answer (5 GHz vs 6 GHz Channels)

- **File:** `quiz-10-chapter-10.json`, question `q20`
- **Question:** "Which wireless frequency band has more non-overlapping channels?"
- **Options:** `[0] 2.4 GHz`, `[1] 5 GHz`, `[2] Both are equal`, `[3] 6 GHz`
- **Marked Answer:** `[1] 5 GHz` (correctAnswer: 1)
- **Why It's Wrong:** The 6 GHz band (Wi-Fi 6E) has approximately **59 non-overlapping 20 MHz channels** (or 7 × 160 MHz channels), far exceeding 5 GHz's ~24 non-overlapping channels. Since 6 GHz is listed as option [3], it is the correct answer.
- **Self-Contradicting Explanation:** The explanation itself states: "6 GHz (WiFi 6E) has even more but is newer" — directly admitting 6 GHz has more channels while marking 5 GHz as correct.
- **Fix:** Change `correctAnswer` from `1` to `3` and update the explanation: "The 6 GHz band (Wi-Fi 6E) provides the most non-overlapping channels (~59 at 20 MHz width), followed by 5 GHz (~24 channels), and 2.4 GHz (3 channels: 1, 6, 11)."
- **Alternative Fix:** If the intent is to compare only 2.4 vs 5 GHz, remove option [3] (6 GHz) entirely.

---

### 4.2 HIGH — Ungraded Question Types: `scenario` and `performance-based`

- **Affected Files:** `final-exam.json` (Q41-Q50), `quiz-10-chapter-10.json` (Q31-Q40)
- **Count:** 20 questions total (10 scenario + 10 performance-based)
- **Issue:** The grading switch statement in `submit/route.ts` handles: `multiple-choice`, `multiple-select`, `true-false`, `code-completion`, `coding-exercise`, `multi-part`. The `scenario` and `performance-based` types fall through to the `default` case which **always returns `{correct: false, pointsEarned: 0}`**.
- **Impact:** Students answering these 20 questions correctly will always receive 0 points. In quiz-10 this affects 10/40 questions (25% of the quiz). In the final exam, also 10/50 (20%).
- **Fix:** Add case handlers for `'scenario'` and `'performance-based'` in the grading switch, or alias them to `gradeMultipleChoice` since they use the same data structure (options + integer correctAnswer).

---

## 5. MEDIUM Issues

### 5.1 MEDIUM — quiz-01 Q2: Multimode Fiber Distance (550m vs IEEE Standard)

- **File:** `quiz-01-chapter-1.json`, question `q2`
- **Question:** "What is the maximum transmission distance for multimode fiber at 10 Gbps?"
- **Marked Answer:** `[2] 550 meters`
- **Analysis:** IEEE 802.3ae specifies 10GBASE-SR over multimode fiber at:
  - OM3: 300m
  - OM4: 400m
  
  The 550m figure appears in some CompTIA study guides and vendor documentation, but is not the official IEEE standard. Since this is a CompTIA Network+ prep course, 550m is **acceptable** as many exam prep materials use this figure.
- **Recommendation:** Add a note in the explanation acknowledging the IEEE specs: "Per IEEE 802.3ae: 300m (OM3) / 400m (OM4). Many CompTIA sources cite 550m as the practical maximum for OM4."
- **Severity Justification:** Medium because while not strictly accurate per IEEE standards, it aligns with common CompTIA exam prep material.

---

### 5.2 MEDIUM — Cross-Quiz Duplicate: quiz-08 Q2 ≡ final-exam Q15

- **Original:** `final-exam.json`, question `q15`
- **Duplicate:** `quiz-08-chapter-8.json`, question `q2`
- **Question Text:** "Which WAN technology uses labels to forward packets?"
- **Answer:** MPLS (both)
- **Impact:** Students see the exact same question in both the Chapter 8 quiz and the final exam. This provides an unfair advantage on the final exam and reduces content coverage.
- **Fix:** Rewrite one of the two questions. Suggestion for quiz-08 Q2: "What is the primary advantage of MPLS over traditional IP routing?" or "Which WAN technology creates Label Switched Paths (LSPs) for traffic engineering?"

---

## 6. LOW Issues

### 6.1 LOW — Non-Standard Question Types Not in TypeScript Union

- **Affected Files:** `final-exam.json`, `quiz-10-chapter-10.json`
- **Types:** `scenario` (10 questions) and `performance-based` (10 questions)
- **Issue:** The TypeScript `QuizQuestion` union type in `src/types/quiz.ts` does not include `scenario` or `performance-based` variants. These types are functionally identical to `multiple-choice` (same data structure: options array + integer correctAnswer) but are typed differently.
- **Impact:** TypeScript will flag these as type errors if strict type checking is applied during JSON loading.
- **Fix:** Either:
  - Add `ScenarioQuestion` and `PerformanceBasedQuestion` interfaces to the union type
  - Or change these questions' type fields to `"multiple-choice"` since they share the same structure

---

## 7. Cross-Quiz Duplicates

| # | File A | Q ID | File B | Q ID | Question (truncated) |
|---|--------|------|--------|------|---------------------|
| 1 | final-exam.json | q15 | quiz-08-chapter-8.json | q2 | "Which WAN technology uses labels to forward packets?" |

**Near-Duplicate (Same Topic, Different Wording):**

| # | File A | Q ID | File B | Q ID | Topic |
|---|--------|------|--------|------|-------|
| 1 | quiz-05-chapter-5.json | q7 | quiz-10-chapter-10.json | q36 | Subnetting 172.16.0.0/16 for 100+ subnets (quiz-05 has wrong answer, quiz-10 has correct answer) |

---

## 8. Within-Quiz Duplicates

**None found.** All questions within each individual quiz file are unique.

---

## 9. Schema Consistency Analysis

### 9.1 JSON Validity
All 11 files parse as valid JSON. ✅

### 9.2 Required Top-Level Fields
All files contain: `id`, `courseId`, `title`, `description`, `questions`, `passingScore`, `timeLimit`, `tags`. ✅

### 9.3 Required Question Fields
All questions contain: `id`, `type`, `question`, `explanation`, `points`. ✅

### 9.4 correctAnswer Validation

| Question Type | Count | correctAnswer Format | In Bounds | Notes |
|---------------|-------|---------------------|-----------|-------|
| multiple-choice | 410 | Integer (0-based index) | ✅ All valid | Index always < options.length |
| true-false | 25 | Boolean (true/false) | ✅ N/A | No options array needed |
| multiple-select | 30 | `correctAnswers: string[]` | ✅ All valid | Uses letter IDs ("a","b","c") matching option IDs |
| scenario | 10 | Integer (0-based index) | ✅ All valid | Same format as multiple-choice |
| performance-based | 10 | Integer (0-based index) | ✅ All valid | Same format as multiple-choice |

### 9.5 Question Count Validation

| Requirement | Threshold | Files Below | Status |
|-------------|-----------|-------------|--------|
| Chapter quizzes | ≥ 30 | None | ✅ Pass |
| Final exam | ≥ 40 | None | ✅ Pass |

### 9.6 Time Limit Validation
All `timeLimit` values are in seconds, range 3300-5400s (55-90 minutes). Reasonable for quiz sizes. ✅

### 9.7 Passing Score Validation
- Chapter quizzes: 70% (all consistent) ✅
- Final exam: 80% (appropriately higher) ✅

### 9.8 Option Format Inconsistency

| Question Type | Options Format | Expected by TypeScript |
|---------------|---------------|----------------------|
| multiple-choice | `string[]` | `QuizOption[] ({id, text})` |
| scenario | `string[]` | Not defined |
| performance-based | `string[]` | Not defined |
| multiple-select | `{id, text}[]` | `QuizOption[] ({id, text})` ✅ |
| true-false | No options | No options ✅ |

Multiple-choice options use simple strings while multiple-select uses `{id, text}` objects. This inconsistency should be resolved.

---

## 10. Recommendations

### Priority 1 — Fix Immediately (CRITICAL + HIGH)

1. **quiz-02 Q2:** Rewrite question/answer/explanation to correctly distinguish 40GBASE-SR4 (parallel optics) from 40GBASE-LR4 (WDM).

2. **quiz-05 Q7:** Change `correctAnswer` from `2` to `1` (change from /24 to /23). Update explanation to: "Need 7 bits for 100+ subnets (2^7 = 128 ≥ 100). Starting from /16: 16 + 7 = /23. Each /23 provides 2^9 - 2 = 510 usable hosts per subnet."

3. **quiz-10 Q20:** Change `correctAnswer` from `1` to `3` (change from 5 GHz to 6 GHz). Update explanation to reflect 6 GHz having ~59 non-overlapping channels.

4. **submit/route.ts:** Add grading handlers for `scenario` and `performance-based` question types. Simplest fix:
   ```typescript
   case 'scenario':
   case 'performance-based':
     return gradeMultipleChoice(question as MultipleChoiceQuestion, userAnswer);
   ```

### Priority 2 — Fix Soon (MEDIUM)

5. **Cross-quiz duplicate:** Rewrite either quiz-08 Q2 or final-exam Q15 to cover MPLS from a different angle.

6. **quiz-01 Q2:** Add clarification to explanation about IEEE standard vs common exam figures for multimode fiber distance.

### Priority 3 — Fix When Convenient (LOW + Schema)

7. **Unify data format:** Choose one option format for all question types:
   - **Recommended:** Migrate all questions to `{id, text}` options with string ID-based `correctAnswer`, matching the TypeScript types.
   - **Alternative:** Update TypeScript types to accept `string[]` options with numeric `correctAnswer`.

8. **Add `scenario` and `performance-based` to TypeScript types** or convert them to `multiple-choice`.

---

## Appendix: Files Audited

```
content/courses/comptia-network-plus/quizzes/
├── final-exam.json          (50 questions, 144KB)
├── quiz-01-chapter-1.json   (50 questions)
├── quiz-02-chapter-2.json   (50 questions)
├── quiz-03-chapter-3.json   (50 questions)
├── quiz-04-chapter-4.json   (60 questions)
├── quiz-05-chapter-5.json   (60 questions)
├── quiz-06-chapter-6.json   (45 questions)
├── quiz-07-chapter-7.json   (40 questions)
├── quiz-08-chapter-8.json   (40 questions)
├── quiz-09-chapter-9.json   (50 questions)
└── quiz-10-chapter-10.json  (40 questions)
```

**Total:** 535 questions across 11 files, ~400KB of JSON data.
