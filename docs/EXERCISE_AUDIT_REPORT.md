# CompTIA Network+ Exercise Audit Report

**Date:** March 4, 2026  
**Scope:** All 90 exercise files (`exercise-001-*.json` through `exercise-090-*.json`)  
**Path:** `content/courses/comptia-network-plus/exercises/`

---

## 1. Exercise Format/Schema Summary

### Top-Level Fields

All 90 exercises share these core fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Matches filename (without `.json`) |
| `lessonId` | string | References corresponding lesson file |
| `title` | string | Exercise title |
| `description` | string | Exercise scenario/instructions |
| `difficulty` | string | `beginner`, `intermediate`, `advanced`, `medium`, or `hard` |
| `points` | number | Point value (mostly 100) |
| `language` | string | `text`, `cisco-ios`, or `yaml` |
| `starterCode` | string | Fill-in-the-blank template with `_______` placeholders |
| `solution` | string | Completed template with `**bold**` answers |
| `hints` | array | List of hint strings |
| `testCases` | array | Validation test cases |

**Optional field:** `scenario` (present in 9 exercises: 023–031)

### Schema Variants

- **81 files:** Standard 11-field schema
- **9 files:** 12-field schema (adds `scenario` for exercises 023–031)

### Test Case Formats

Three distinct test case schemas exist:

| Format | Count | Keys | Used In |
|--------|-------|------|---------|
| **Format A** (validation) | 22 | `id`, `description`, `validation`, `isHidden` | exercises 001–022 |
| **Format B** (assert) | 67 | `id`, `description`, `input`, `expected`, `assert` | exercises 023–090 |
| **Format C** (testCode) | 1 | `id`, `description`, `testCode` | exercise 055 only |

### Exercise Type

All 90 exercises are **fill-in-the-blank** style where students complete a markdown-formatted template. The `starterCode` contains blanks (`_______`) and the `solution` contains bolded answers (`**answer**`). Test cases validate that required keywords appear in the submitted solution.

---

## 2. Overall Statistics

| Metric | Value |
|--------|-------|
| Total exercise files | 90 |
| Valid JSON | **90/90 (100%)** |
| All required fields present | **90/90 (100%)** |
| `id` matches filename | **90/90 (100%)** |
| `lessonId` matches lesson file | **90/90 (100%)** |
| Exercise/lesson number alignment | **90/90 (100%)** |
| All have hints (3+) | **90/90 (100%)** |
| All have 10+ test cases | **90/90 (100%)** |
| Exercises with issues | **~10** |

### Difficulty Distribution

| Difficulty | Count |
|------------|-------|
| `intermediate` | 59 |
| `beginner` | 13 |
| `advanced` | 13 |
| `hard` | 3 |
| `medium` | 2 |

### Language Distribution

| Language | Count |
|----------|-------|
| `text` | 80 |
| `cisco-ios` | 9 |
| `yaml` | 1 |

### File Size Distribution

| Metric | Value |
|--------|-------|
| Smallest | exercise-065 (7,842 bytes) |
| Largest | exercise-003 (65,910 bytes) |
| Median | 21,246 bytes |

There is an **8:1 size ratio** between the largest and smallest exercises. Exercises 056–075 are significantly smaller (~8–10KB) compared to exercises 001–042 (~30–65KB).

---

## 3. Issues Found

### CRITICAL Issues

**None.** All 90 exercises have:
- Valid JSON ✓
- Correct `id`-to-filename mapping ✓
- Correct `lessonId`-to-lesson mapping ✓
- All required fields present ✓
- Non-empty `testCases`, `starterCode`, `solution`, `hints` ✓

---

### HIGH Issues

#### H1. Placeholder Content in Exercise 029
- **File:** `exercise-029-network-diagramming.json`
- **Issue:** Contains "TBD" placeholder text in the solution's version history table
- **Context:** `| 1.1 | TBD | Future updates | TBD |`
- **Action Required:** Replace TBD values with actual content or remove the placeholder row

#### H2. Inconsistent Difficulty Vocabulary
- **Issue:** Five different difficulty values are used, but two pairs appear to represent the same level:
  - `medium` (2 exercises) vs `intermediate` (59 exercises) — these likely mean the same thing
  - `hard` (3 exercises) vs `advanced` (13 exercises) — these likely mean the same thing
- **Files with `medium`:** exercise-027, exercise-029
- **Files with `hard`:** exercise-026, exercise-028, exercise-030
- **Action Required:** Standardize to 3 levels (`beginner`, `intermediate`, `advanced`) or define clear distinction between `medium`/`intermediate` and `hard`/`advanced`

#### H3. Inconsistent Test Case Schema (3 Formats)
- **Issue:** Three different test case schemas are used across the 90 exercises, which will complicate the test runner/grading engine:
  - **Format A** (exercises 001–022): uses `validation` string + `isHidden` boolean
  - **Format B** (exercises 023–090): uses `assert` string + `input`/`expected` fields
  - **Format C** (exercise 055 only): uses `testCode` string
- **Action Required:** Standardize to one test case format across all exercises, or ensure the grading engine handles all three

---

### MEDIUM Issues

#### M1. Short/Abbreviated Titles (3 exercises)
| Exercise | Title | Length |
|----------|-------|--------|
| exercise-070-mpls.json | "MPLS" | 4 chars |
| exercise-075-sd-wan.json | "SD-WAN" | 6 chars |
| exercise-089-exam-tips.json | "Exam Tips" | 9 chars |

**Recommendation:** Expand to descriptive titles (e.g., "MPLS Label Switching Fundamentals", "SD-WAN Architecture and Benefits", "CompTIA Network+ Exam Tips and Strategies")

#### M2. Shallow Test Case Descriptions (1 exercise)
- **File:** `exercise-054-wifi-standards.json`
- **Issue:** 7 of 10 test case descriptions are extremely short (3–8 chars), consisting only of a technology name like "OFDMA", "TWT", "6 GHz"
- **Recommendation:** Expand descriptions to explain what's being tested (e.g., "Identifies OFDMA as the technology enabling multi-user simultaneous channel access")

#### M3. Significant Content Size Disparity
- Exercises 001–042 average ~35–40KB (rich, scenario-based, multi-section)
- Exercises 056–090 average ~8–11KB (simpler fill-in-the-blank with 10 items per section)
- The later exercises are functionally complete but have roughly **1/4 the depth** of the early exercises
- **Affected exercises (smallest 15):**
  - exercise-065 (7.8KB), exercise-069 (8.0KB), exercise-056 (8.3KB)
  - exercise-068 (8.4KB), exercise-064 (8.4KB), exercise-070 (8.5KB)
  - exercise-061 (8.7KB), exercise-057 (8.7KB), exercise-063 (8.7KB)
  - exercise-058 (8.8KB), exercise-066 (8.8KB), exercise-059 (9.2KB)
  - exercise-067 (9.0KB), exercise-072 (9.7KB), exercise-074 (9.9KB)
- **Recommendation:** Consider expanding exercises 056–090 with additional sections, scenarios, or deeper analysis questions to match the quality of exercises 001–042

#### M4. Points Distribution Lacks Variety
- 83 of 90 exercises are worth 100 points regardless of difficulty or depth
- Only 7 exercises use different point values (75, 110, 120, 150)
- **Recommendation:** Align points with difficulty levels (e.g., beginner=75, intermediate=100, advanced=150)

---

### LOW Issues

#### L1. Test Case Validation Approach Is Keyword-Based
- Most test cases (especially Format B) simply check if a keyword appears in the solution: `assert ('aes' in solution.lower())`
- This is easily gameable — a student could type all keywords without meaningful context
- The early exercises (Format A) have slightly better validation with regex patterns
- **Recommendation for future improvement:** Consider requiring structured JSON answers or more sophisticated validation

#### L2. Exercise 055 Uses Unique Schema
- `exercise-055-wireless-antennas.json` is the only file using `testCode` in test cases instead of `validation` or `assert`
- This is a one-off inconsistency that the grading engine must handle as a special case

#### L3. `language: "text"` for 80 Exercises
- Most exercises use plain text fill-in-the-blank rather than actual code
- For a networking course this is acceptable, but the `cisco-ios` (9 exercises) and `yaml` (1 exercise) exercises provide a more authentic hands-on experience
- **Enhancement opportunity:** Convert more exercises to `cisco-ios` or command-line format where applicable

---

## 4. Exercises Significantly Weaker Than Others

### Tier Analysis

**Strong exercises (001–042):** 30–65KB each, feature:
- Rich scenario-based descriptions
- Multi-section content (4–6 parts with 5–10 items each)
- Cisco IOS configuration exercises (9 of these)
- Complex validation with specific value checks
- YAML/Ansible configuration exercises

**Adequate exercises (043–055):** 15–43KB each, feature:
- Good fill-in-the-blank templates
- Multiple sections with reasonable depth
- Solid test case coverage

**Thin exercises (056–090):** 7–12KB each, feature:
- Basic fill-in-the-blank with ~30 blanks across 3 sections
- Simple keyword-only assertions
- Minimal scenario context
- All use `language: "text"` (no hands-on CLI/config)

### Bottom 10 (Weakest Exercises by Content Depth)

| Rank | Exercise | Size | Notes |
|------|----------|------|-------|
| 1 | exercise-065-storage-networking | 7.8KB | Basic fill-in-the-blank only |
| 2 | exercise-069-leased-lines | 8.0KB | Basic fill-in-the-blank only |
| 3 | exercise-056-wireless-security-protocols | 8.3KB | Basic fill-in-the-blank only |
| 4 | exercise-068-wan-fundamentals | 8.4KB | Basic fill-in-the-blank only |
| 5 | exercise-064-network-virtualization | 8.4KB | Basic fill-in-the-blank only |
| 6 | exercise-070-mpls | 8.5KB | Also has abbreviated title |
| 7 | exercise-061-cloud-models | 8.7KB | Basic fill-in-the-blank only |
| 8 | exercise-057-wireless-deployment | 8.7KB | Basic fill-in-the-blank only |
| 9 | exercise-063-virtualization | 8.7KB | Basic fill-in-the-blank only |
| 10 | exercise-058-wireless-authentication | 8.8KB | Basic fill-in-the-blank only |

These exercises are **functionally valid** (correct JSON, proper field mapping, 10 test cases each, 10 hints each) but are **~4x thinner** than the best exercises and lack scenario-based depth.

---

## 5. Summary

| Category | Count | Details |
|----------|-------|---------|
| **CRITICAL** | 0 | No structural or mapping errors |
| **HIGH** | 3 | 1 placeholder (TBD), inconsistent difficulty vocab, inconsistent test case schemas |
| **MEDIUM** | 4 | Short titles, shallow test descriptions, content size disparity, flat points |
| **LOW** | 3 | Keyword-only validation, one-off schema, missed CLI opportunities |

### Pass Rate
The course exercises are **structurally sound** — 100% valid JSON, 100% correct ID/lesson mappings, all have hints and test cases. The primary concern is the **quality gap between early and late exercises** and **schema inconsistencies** that should be standardized.

### Priority Actions
1. **Standardize difficulty vocabulary** to 3 levels (beginner/intermediate/advanced)
2. **Standardize test case schema** to one format across all 90 exercises
3. **Remove TBD placeholder** from exercise-029
4. **Expand exercises 056–090** with additional sections and scenario-based content to match the depth of exercises 001–042
5. **Expand abbreviated titles** on exercises 070, 075, 089
