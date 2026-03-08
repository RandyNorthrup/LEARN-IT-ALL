# CompTIA Network+ Quiz Audit Report

**Date:** June 2025  
**Scope:** All 11 quiz files in `content/courses/comptia-network-plus/quizzes/`  
**Total Questions Audited:** 535

---

## 1. Question Counts Per Quiz

| Quiz File | Chapter | Questions | MC | T/F | Multi-Select | Scenario | PBQ |
|---|---|---|---|---|---|---|---|
| quiz-01-chapter-1.json | Networking Fundamentals | 50 | 50 | — | — | — | — |
| quiz-02-chapter-2.json | Network Implementations | 50 | 50 | — | — | — | — |
| quiz-03-chapter-3.json | Network Operations | 50 | 50 | — | — | — | — |
| quiz-04-chapter-4.json | Network Security | 60 | 50 | 5 | 5 | — | — |
| quiz-05-chapter-5.json | IP Addressing & Subnetting | 60 | 40 | 10 | 10 | — | — |
| quiz-06-chapter-6.json | Wireless Networking | 45 | 45 | — | — | — | — |
| quiz-07-chapter-7.json | Cloud & Datacenter | 40 | 40 | — | — | — | — |
| quiz-08-chapter-8.json | WAN Technologies | 40 | 40 | — | — | — | — |
| quiz-09-chapter-9.json | Network Troubleshooting | 50 | 50 | — | — | — | — |
| quiz-10-chapter-10.json | Exam Preparation Review | 40 | 20 | 5 | 5 | 5 | 5 |
| final-exam.json | Comprehensive Final | 50 | 30 | 5 | 5 | 5 | 5 |
| **TOTAL** | | **535** | **465** | **25** | **25** | **10** | **10** |

**Assessment:** Question counts are solid. Quizzes 1-3 and 6-9 are exclusively multiple-choice and would benefit from adding true/false, multi-select, and scenario-based questions to match the diversity in quizzes 4, 5, 10, and the final exam — and to better simulate the actual CompTIA N10-008 exam format which includes PBQs.

---

## 2. Correct Answers Validation

**Result: ALL 535 questions have correct answers marked.** ✅

Every question was programmatically verified:
- Multiple-choice and scenario questions all have `correctAnswer` (0-indexed integer)
- True/false questions all have `correctAnswer` (boolean)
- Multiple-select questions all have `correctAnswers` (array)

No missing answer keys found in any file.

---

## 3. Question Quality Assessment

**Overall Grade: B+ (Certification exam quality with caveats)**

### Strengths
- **Explanations are exceptional**: Every question includes a detailed explanation that teaches the concept, not just states the answer. Many explanations include CLI commands, real-world context, and comparison to alternatives.
- **Topic coverage is comprehensive**: Questions span all CompTIA N10-008 exam objectives across networking fundamentals, implementations, operations, security, troubleshooting, and emerging technologies.
- **Difficulty distribution is appropriate**: Mix of easy recall, medium application, and hard scenario/analysis questions.
- **Scenario and PBQ questions** (quizzes 10 and final) are excellent and realistic for cert exam prep.

### Weaknesses
- **Quizzes 1-3 and 6-9 lack question type diversity** — 100% multiple-choice doesn't simulate the actual CompTIA exam well.
- **Quiz 2 explanations are very verbose** — some explanations are 5-8 sentences which may overwhelm learners studying for a certification.
- **Some questions are too Cisco-specific** for a vendor-neutral CompTIA exam (e.g., quiz-02 ch2-q37 asks about `ip nat inside source list 1 interface GigabitEthernet0/1 overload`, ch2-q46 about `show vlan brief`). CompTIA Network+ doesn't test Cisco IOS syntax at this depth.

---

## 4. Duplicate Questions

### Confirmed Duplicates (identical or near-identical question + options)

| # | Severity | File A | Q ID | File B | Q ID | Issue |
|---|---|---|---|---|---|---|
| 1 | **CRITICAL** | final-exam.json | q15 | quiz-01 | q40 | 100% identical: "Which WAN technology uses labels to forward packets?" — same options |
| 2 | **CRITICAL** | quiz-01 | q40 | quiz-08 | q2 | 100% identical: same question and 90% same options (MPLS) |
| 3 | **CRITICAL** | quiz-04 | q26 | quiz-06 | q7 | 100% identical: "Which wireless security protocol is considered obsolete..." (WEP) |
| 4 | **CRITICAL** | quiz-04 | q27 | quiz-06 | q8 | 100% identical: "What encryption algorithm does WPA2 use?" (AES) |
| 5 | **HIGH** | quiz-01 | q27 | quiz-06 | q2 | 100% text match: "Maximum theoretical speed of Wi-Fi 6 (802.11ax)?" |
| 6 | **HIGH** | quiz-01 | q33 | quiz-06 | q11 | 95% match: "centralized authentication in enterprise Wi-Fi/wireless networks?" (RADIUS) |
| 7 | **HIGH** | quiz-04 | q17 | quiz-08 | q4 | 93% match: "Which IPsec mode encrypts only the payload..." (Transport mode) |
| 8 | **HIGH** | final-exam | q28 | quiz-04 | q23 | 91% match: "difference between IDS and IPS" — different options |
| 9 | **MEDIUM** | quiz-04 | q30 | quiz-06 | q16 | 83% match: Evil twin attack question — slightly different wording |
| 10 | **MEDIUM** | quiz-02 | ch2-q30 | quiz-03 | q6 | 85% match: Traffic policing vs traffic shaping |
| 11 | **MEDIUM** | quiz-05 | q7 | quiz-10 | q36 | 62% text but same problem: subnet 172.16.0.0/16 for 100 subnets |
| 12 | **LOW** | final-exam | q31 | quiz-10 | q21 | 94% match but different values (/28 vs /27) — acceptable as review |

**3 questions appear in 3+ files**: "Which WAN technology uses labels to forward packets?" appears in quiz-01 q40, quiz-08 q2, AND final-exam q15.

**Recommendation:** Remove or rephrase at least the 7 CRITICAL/HIGH duplicates. The MPLS question appearing in 3 files is egregious.

---

## 5. Content-to-Chapter Mapping

### Chapter-Lesson Assignments (from course.json)
| Chapter | Lessons | Topics |
|---|---|---|
| Ch1 | 001-010 | OSI, TCP/IP, protocols, topologies, network types |
| Ch2 | 011-022 | Ethernet, switching, VLANs, STP, routing, PoE, devices |
| Ch3 | 023-030 | Documentation, monitoring, performance, change mgmt, backup, HA |
| Ch4 | 031-042 | Security concepts, crypto, VPN, firewalls, IDS/IPS, wireless security, IR |
| Ch5 | 043-052 | IPv4, subnetting, VLSM, IPv6, DHCP, DNS |
| Ch6 | 053-060 | Wi-Fi standards, antennas, security protocols, deployment, troubleshooting |
| Ch7 | 061-067 | Cloud models, virtualization, network virtualization, storage, datacenter |
| Ch8 | 068-075 | WAN fundamentals, leased lines, MPLS, broadband, cellular, SD-WAN |
| Ch9 | 076-085 | Troubleshooting methodology, CLI tools, packet analyzers, common issues |
| Ch10 | 086-090 | Exam overview, study strategies, PBQs, tips, career paths |

### Content Mapping Issues

| Quiz | Question | Issue |
|---|---|---|
| quiz-01 | q40 (MPLS), q41 (SD-WAN) | WAN topics belong in Chapter 8, not Chapter 1 |
| quiz-01 | q39 (Spine-leaf architecture) | Datacenter topic belongs in Chapter 7 |
| quiz-01 | q47 (Metro Ethernet MAN) | WAN topic belongs in Chapter 8 |
| quiz-02 | ch2-q25 to ch2-q42 (QoS, NAT) | Quiz 2 references "Lesson 21: Quality of Service" and "Lesson 22: NAT" which don't match actual lesson files (lesson-021 is Power over Ethernet). Either the quiz references use a different numbering or lessons were renumbered after quiz creation |
| quiz-03 | q6 (traffic shaping/policing) | Overlaps with quiz-02 ch2-q30. Topic fits Ch3 (operations/QoS) but the overlap is notable |
| quiz-03 | q17-q18, q45 (HSRP) | High Availability is in Ch3 (lesson-028), so this IS correctly placed |

**Overall:** Most questions map well to their chapter content. The main issue is quiz-01 being overly broad — it includes WAN, datacenter, and wireless topics that properly belong to later chapters. Quiz-02's internal reference numbers don't match the actual lesson file numbering.

---

## 6. JSON Structure Validity

### All 11 files parse as valid JSON ✅

### Schema Inconsistencies (SIGNIFICANT)

| Issue | Affected Files | Details |
|---|---|---|
| **timeLimit units** | quiz-02 (3600), final-exam (5400) vs all others (55-70) | Quiz 02 and final use **seconds**; all others use **minutes**. This will cause bugs if the app doesn't handle both. |
| **totalPoints mismatch** | final-exam.json | Declares `totalPoints: 900` but actual sum of question points = **705**. Quiz-02 is correct (500 declared, 500 actual). |
| **Points per question** | All files | quiz-01/04/05/06/07/08/09: 2-3 pts; quiz-02/03: 10 pts; quiz-10: 1-5 pts; final: 10-25 pts. No standardization. |
| **`references` vs `reference`** | quiz-02 | Uses `reference` (singular string) while 8 other quizzes use `references` (array). Quiz-03 has NO reference field at all. |
| **Per-question difficulty** | quiz-02, quiz-03 | Have `difficulty` per question; all other quizzes only have difficulty in metadata. |
| **Question ID format** | quiz-02 | Uses `ch2-qN` format; all others use `qN`. |
| **Multiple-select option format** | quiz-04/05 vs quiz-10/final | Quiz 04/05: options are plain strings, `correctAnswers` uses 0-based integers `[0, 1, 2]`. Quiz 10/final: options are objects `{"id": "a", "text": "..."}`, `correctAnswers` uses letter strings `["a", "b"]`. |
| **Metadata fields** | Various | No consistent schema. Some have `estimatedTime` + `timeLimit`, some have only one. Some have `tags`, `totalPoints`, `type` — others don't. |
| **Missing passingScore** | quiz-05, quiz-10 | These two quizzes don't have a `passingScore` field. |

### Recommended Canonical Schema

```json
{
  "id": "string",
  "courseId": "string",
  "chapterId": "string",
  "title": "string",
  "description": "string",
  "difficulty": "string",
  "type": "string",
  "timeLimit": "number (minutes)",
  "passingScore": "number (percentage)",
  "tags": ["array"],
  "questions": [{
    "id": "string (qN format)",
    "type": "multiple-choice|true-false|multiple-select|scenario|performance-based",
    "difficulty": "easy|medium|hard",
    "question": "string",
    "options": ["string array"],
    "correctAnswer": "number (0-indexed) | boolean",
    "correctAnswers": "number[] (0-indexed, for multiple-select only)",
    "explanation": "string",
    "points": "number",
    "references": ["string array"]
  }]
}
```

---

## 7. Factual Errors and Concerns

### Confirmed Issues

| # | File | Q ID | Issue | Severity |
|---|---|---|---|---|
| 1 | quiz-05 | q44 | **CNAME chain question marked FALSE is technically incorrect.** The question asks if "A DNS CNAME record **can** point to another CNAME record." Per RFC 1034, CNAME chains ARE valid and functional. The explanation says "FALSE (best practice)" — this conflates "should not" with "cannot." Should be TRUE with explanation that it's discouraged. | **HIGH** |
| 2 | final-exam | metadata | `totalPoints: 900` but actual sum = 705. **Data integrity error.** | **MEDIUM** |
| 3 | quiz-02 | ch2-q37 | Cisco IOS command syntax (`ip nat inside source list 1 interface GigabitEthernet0/1 overload`) is too vendor-specific for CompTIA Network+. CompTIA is vendor-neutral. | **LOW** |
| 4 | quiz-02 | ch2-q46 | `show vlan brief` is Cisco-specific CLI. Same concern as above. | **LOW** |
| 5 | quiz-02 | ch2-q39 | `show ip nat translations` — Cisco-specific. | **LOW** |
| 6 | quiz-03 | q41, q43 | Ansible `loop` keyword and `ios_config` module — too implementation-specific for N10-008. Network automation is tested at a high level. | **LOW** |

### Verified Correct (Flagged But Accurate)

- **Quiz 1 q3** (RSTP as fastest STP version): Acceptable — RSTP is the correct answer for CompTIA exam purposes.
- **Quiz 5 q49** (IPv6 ULA equivalence to RFC 1918): Correctly marked TRUE with accurate nuance in explanation.
- **Quiz 1 q36** (Windows traceroute uses ICMP) vs **Quiz 9 q34** (Linux traceroute uses UDP): Both correct, different platforms — not duplicates.

---

## Summary of Required Actions

### Priority 1 — Must Fix
1. **Remove 4 identical duplicate questions** across quiz-01/quiz-04/quiz-06/quiz-08/final-exam
2. **Fix final-exam `totalPoints`** (900 → 705 or adjust question points)
3. **Standardize `timeLimit` units** — convert quiz-02 and final-exam from seconds to minutes
4. **Fix quiz-05 q44** CNAME chain answer (change to TRUE or reword question)

### Priority 2 — Should Fix
5. **Standardize multiple-select format** — pick either 0-indexed integers or letter IDs consistently
6. **Standardize `reference`/`references` field** — use `references` (array) everywhere
7. **Add `passingScore` to quiz-05 and quiz-10**
8. **Fix quiz-02 question ID format** (`ch2-qN` → `qN`)
9. **Rephrase 3 near-duplicate questions** (IPsec mode, RADIUS/auth, evil twin)

### Priority 3 — Nice to Have
10. **Add question type diversity** to quizzes 1-3 and 6-9 (T/F, multi-select, scenarios)
11. **Standardize points** across all quizzes
12. **Add per-question `difficulty`** to all quizzes (currently only quiz-02 and quiz-03 have it)
13. **Review Cisco-specific questions** in quiz-02 and quiz-03 for vendor neutrality
14. **Normalize metadata schema** across all files
