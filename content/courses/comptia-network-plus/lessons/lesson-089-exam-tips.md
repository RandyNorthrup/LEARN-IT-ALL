---
id: "lesson-089"
title: "Exam Day Tips and Test-Taking Strategies"
chapterId: "chapter-10"
order: 89
duration: 22
objectives:
  - "Master proven test-taking strategies for multiple-choice questions"
  - "Recognize and avoid common exam traps and distractors"
  - "Develop effective time management techniques for exam day"
  - "Prepare mentally and logistically for exam success"
---

# Exam Day Tips and Test-Taking Strategies

## Introduction

Passing the CompTIA Network+ N10-008 exam requires more than just technical knowledge—it demands strategic test-taking skills, effective time management, and the ability to navigate tricky questions designed to test not only what you know, but how well you can apply that knowledge under pressure.

This lesson equips you with proven strategies used by successful test-takers to maximize your score. You'll learn how to:
- Identify and avoid common question traps
- Manage your time effectively across 90 questions
- Approach different question types strategically
- Stay calm and focused during the exam
- Handle difficult questions without losing momentum

These strategies, combined with your technical preparation, will give you the confidence and skills needed to perform your best on exam day.

---

## Before Exam Day

### Final Week Preparation

**What to Focus On**:
- **Review weak areas**: Focus on domains where practice scores are lowest
- **Daily flashcard review**: 30-60 minutes of spaced repetition
- **Light practice exams**: One full-length exam to maintain readiness
- **Command-line tools**: Memorize syntax and output interpretation
- **Port numbers**: Review most common (FTP, SSH, Telnet, SMTP, DNS, HTTP, HTTPS, RDP)
- **Troubleshooting methodology**: Practice the 7-step process until automatic

**What NOT to Do**:
- ❌ **Cramming new material**: Focus on reinforcing existing knowledge
- ❌ **All-day study marathons**: Causes burnout and exhaustion
- ❌ **Neglecting self-care**: Sleep, nutrition, and exercise matter
- ❌ **Taking difficult practice exams**: Can damage confidence

**24 Hours Before Exam**:
```
Evening Before:
- Light review (flashcards, notes)
- Prepare exam day materials (ID, confirmation)
- Set two alarms
- Avoid alcohol, caffeine after 6 PM
- Go to bed at reasonable time (aim for 7-8 hours sleep)

Morning Of:
- Eat balanced breakfast
- Arrive 30 minutes early (testing center) or prepare space (online)
- Light review of key concepts (10-15 minutes)
- Mental preparation, positive visualization
```

### Logistics Checklist

**For Testing Center**:
- [ ] Two forms of valid ID (government-issued with signature)
- [ ] Exam confirmation email or code
- [ ] Know testing center location and parking
- [ ] Arrive 30 minutes early
- [ ] Dress comfortably (layers for temperature control)
- [ ] Use restroom before starting exam

**For Online Proctoring**:
- [ ] Test system requirements 24 hours before
- [ ] Clear workspace (360° camera check)
- [ ] Close all applications and browser tabs
- [ ] Disable notifications (phone, computer)
- [ ] Have ID ready for webcam verification
- [ ] Stable internet connection verified
- [ ] Backup power source if possible

**Items NOT Allowed**:
- Mobile phones, smartwatches
- Notes, books, reference materials
- Food, drinks (water may be allowed at testing center)
- Headphones, earbuds
- Hats, sunglasses (unless religious/medical)

---

## Time Management Strategy

### Understanding the Timeline

**Exam Specifications**:
- **Total time**: 90 minutes
- **Total questions**: Maximum 90 questions
- **Question types**: PBQs (5-6) + Multiple Choice (84-85)
- **Average time per question**: 1 minute (but varies by type)

### Recommended Time Allocation

**Phase 1: Skip PBQs (2-3 minutes)**:
```
Time: 0:00 - 0:03
- Flag all PBQs (typically questions 1-6)
- Quickly click through to multiple choice
- Don't read PBQs in detail yet
- Goal: Get to easier questions quickly
```

**Phase 2: Multiple Choice Questions (60-65 minutes)**:
```
Time: 0:03 - 1:05
- Answer all multiple choice systematically
- Spend 45-60 seconds per easy question
- Spend 90-120 seconds per difficult question
- Flag questions you're unsure about
- Don't overthink—first instinct often correct
- Goal: Complete all multiple choice with ~25 minutes remaining
```

**Phase 3: PBQs (20-25 minutes)**:
```
Time: 1:05 - 1:25
- Return to flagged PBQs
- Allocate 3-5 minutes per PBQ
- Read instructions carefully
- Complete systematically
- If stuck after 5 minutes, make best effort and move on
- Goal: Complete all PBQs with time to spare
```

**Phase 4: Review (5 minutes)**:
```
Time: 1:25 - 1:30
- Review flagged questions
- Check for obvious mistakes
- Verify PBQ configurations
- Change answers only if certain of error
- Don't second-guess without good reason
```

### Time Management Tips

**Track Your Pace**:
```
At 30 minutes: Should be at question 35-40
At 45 minutes: Should be at question 50-55
At 60 minutes: Should be at question 70-75
At 65 minutes: All multiple choice complete
```

**If Running Behind**:
- Speed up on questions you're confident about
- Spend less time on questions you'd be guessing anyway
- Don't sacrifice accuracy for speed early in exam
- Consider quickly answering remaining questions, then reviewing

**If Ahead of Schedule**:
- Maintain steady pace (don't rush and make mistakes)
- Use extra time for thorough PBQ completion
- More time for review phase

---

## Question-Answering Strategies

### General Approach for All Questions

**1. Read Carefully**:
```
❌ Bad: Skim question, jump to answers
✓ Good: Read entire question, note key words

Example:
"Which of the following is the BEST solution..."
- Key word: BEST (multiple may work, choose optimal)
- All answers might be correct, but one is better

"A user reports they CANNOT connect to the wireless network..."
- Key word: CANNOT (looking for problems, not solutions)
- Focus on causes of failure
```

**2. Identify Question Type**:
- **Best answer**: Choose optimal solution from multiple valid options
- **Most likely**: Identify most probable cause/solution
- **First step**: Choose initial troubleshooting action
- **Except/NOT**: All are correct except one (tricky wording)

**3. Analyze Before Looking at Answers**:
- Read scenario completely
- Identify the actual problem
- Think about solution before seeing choices
- Then evaluate answers against your solution

**4. Eliminate Wrong Answers**:
- Cross out obviously incorrect answers
- Narrow to 2-3 possibilities
- Choose best remaining option
- Increases odds even if guessing

### Multiple Choice Strategies

**Strategy 1: The "Process of Elimination" Method**

```
Question: A company needs to connect two buildings 800 meters apart. 
Which cable type should be used?

A. Cat6 UTP
B. Cat6A STP
C. Multimode fiber
D. Singlemode fiber

Analysis:
- Distance: 800 meters
- Eliminate: Cat6/Cat6A (max 100m for copper) ❌
- Remaining: MMF or SMF
- MMF: Maximum ~550m ❌
- SMF: Supports 10km+ ✓

Answer: D (by elimination)
```

**Strategy 2: The "Keywords" Method**

Look for keywords that signal correct answers:
- **Best, most, optimal**: Comparing good solutions, choose best
- **First, next**: Troubleshooting sequence matters
- **Least, minimum**: Looking for lowest/smallest valid option
- **Most likely**: Probability-based, choose common scenario

**Strategy 3: The "Absolute Words" Trap**

Be cautious of absolute words—often incorrect:
- **Always, never, all, none, every, must**: Too extreme
- **Usually, often, sometimes, may, might, should**: More realistic

```
Example:
❌ "Network segmentation ALWAYS prevents all security breaches"
   - Too absolute, nothing is 100% guaranteed

✓ "Network segmentation can help reduce the risk of security breaches"
   - More accurate, realistic
```

**Strategy 4: The "Length" Heuristic**

Sometimes (not always) correct answers are:
- Longer and more detailed
- More specific and precise
- Include qualifiers and conditions

```
Question: What is the purpose of a default route?

A. Routes all traffic
B. Routes specific subnets
C. Forwards packets to a next-hop router when no specific route match exists
D. Blocks traffic

Analysis:
- A is too vague
- B is opposite of "default"
- C is detailed and accurate ✓
- D is incorrect

Answer: C (most complete explanation)
```

### Handling Different Question Types

**Scenario-Based Questions**:

```
Example:
"A network administrator is troubleshooting a connectivity issue. 
Users in VLAN 10 cannot communicate with users in VLAN 20. 
Both VLANs are configured on the same switch. Trunking is configured 
properly. What is the MOST likely cause?"

A. Cable failure
B. Switch port down
C. Missing inter-VLAN routing
D. Incorrect subnet mask

Approach:
1. Identify scenario: Different VLANs, same switch, no communication
2. Recall concept: VLANs are separate broadcast domains
3. Key insight: VLANs need Layer 3 routing to communicate
4. Evaluate: C directly addresses VLAN communication ✓

Answer: C
```

**"Choose Two" or "Choose Three" Questions**:

```
Question: Which of the following are characteristics of TCP? 
(Choose TWO)

A. Connectionless
B. Connection-oriented
C. Unreliable
D. Includes error checking
E. Uses UDP
F. Faster than UDP

Approach:
1. Know TCP characteristics: Connection-oriented, reliable, error checking
2. Eliminate: A (opposite), C (opposite), E (wrong protocol), F (actually slower)
3. Select: B and D ✓

Answer: B, D
```

**Command Output Questions**:

```
Question: Analyze this output from 'ipconfig /all':
IPv4 Address: 169.254.10.50
Subnet Mask: 255.255.0.0
Default Gateway: (blank)

What does this indicate?

A. Static IP configured
B. DHCP server assigned address
C. APIPA address assigned
D. Invalid configuration

Approach:
1. Recognize 169.254.x.x: APIPA range
2. Recall: APIPA activates when DHCP fails
3. Confirm: No gateway = no DHCP ✓

Answer: C
```

---

## Common Traps and How to Avoid Them

### Trap 1: The "Technically Correct but Not Best" Trap

**The Setup**:
Multiple answers are technically correct, but one is clearly better.

**Example**:
```
Question: A user cannot access the internet. What should a technician do FIRST?

A. Replace the network cable
B. Reinstall the network driver
C. Verify physical connectivity
D. Check if DHCP is working

Analysis:
All could eventually help, but:
- A, B, D are specific actions (might be unnecessary)
- C is logical first step (follows troubleshooting methodology) ✓

Answer: C (follows proper methodology)
```

**How to Avoid**:
- Look for "FIRST", "BEST", "MOST likely" in question
- Choose answer that follows best practices
- Prefer diagnostic steps before fixes
- Follow troubleshooting methodology (identify before solving)

### Trap 2: The "Familiar Term" Distractor

**The Setup**:
Answer includes terms you've studied, but doesn't actually answer the question.

**Example**:
```
Question: What technology allows multiple VLANs to traverse a single link?

A. VLAN trunking ✓
B. VLAN hopping
C. VLAN pruning
D. VLAN tagging

Analysis:
- All terms contain "VLAN" (familiar)
- B is attack, not solution ❌
- C is optimization, not core technology ❌
- D is mechanism, not complete answer ❌
- A is correct technology ✓

Answer: A
```

**How to Avoid**:
- Don't choose answer just because term sounds familiar
- Understand what term actually means
- Ensure answer directly solves stated problem

### Trap 3: The "Overthinking" Trap

**The Setup**:
Simple question, but you imagine complex scenario not in question.

**Example**:
```
Question: What port does HTTPS use?

A. 80
B. 443 ✓
C. 8080
D. 22

Your thought: "Well, HTTPS can be configured on any port, so maybe they're 
asking about common alternatives like 8080 for web proxies..."

Analysis:
- Question is straightforward: standard HTTPS port
- Don't add complexity not in question
- Don't overthink simple questions

Answer: B (standard HTTPS port)
```

**How to Avoid**:
- Take question at face value
- Don't add constraints or scenarios not mentioned
- If question is simple, answer is probably simple
- Trust your preparation

### Trap 4: The "Partial Truth" Trap

**The Setup**:
Answer is partially correct but incomplete or has one incorrect element.

**Example**:
```
Question: What is the maximum distance for 1000BASE-T?

A. 100 meters ✓
B. 185 meters
C. 500 meters
D. 1000 meters

Distractor thinking: 
- "It's called 1000BASE-T, so maybe 1000 meters?" ❌
- Name refers to speed (1000 Mbps), not distance

Answer: A (Ethernet copper standard = 100m max)
```

**How to Avoid**:
- Verify entire answer is correct
- One incorrect detail makes entire answer wrong
- Don't make assumptions based on naming

### Trap 5: The "Reverse Logic" Trap

**The Setup**:
Question uses "EXCEPT" or "NOT", testing opposite of what you expect.

**Example**:
```
Question: All of the following are benefits of VLANs EXCEPT:

A. Improved security
B. Better traffic management
C. Reduced broadcast domains
D. Increased broadcast traffic ✓

Analysis:
- A, B, C are true benefits
- D is actually what VLANs REDUCE, not increase
- "EXCEPT" means find the FALSE statement

Answer: D (this is NOT a benefit)
```

**How to Avoid**:
- Circle or underline "EXCEPT" or "NOT" in question
- Flip your thinking: find the wrong answer
- Double-check you're answering correctly

### Trap 6: The "All of the Above" / "None of the Above" Trap

**The Setup**:
These answers are attractive but require ALL other options to be correct/incorrect.

**Strategy**:
```
If "All of the above" appears:
- If you know ONE answer is wrong, eliminate "All of the above"
- If you're certain at least TWO are correct, consider "All of the above"

If "None of the above" appears:
- Only choose if you're CERTAIN all other options are incorrect
- This is rarely correct—use with extreme caution
```

---

## Handling Difficult Questions

### When You're Stuck

**Option 1: Use Logic and Elimination**
```
Even if you don't know answer, you can often eliminate 2-3 options:
- Cross out obviously wrong answers
- Guess between remaining 1-2 options
- 50% odds much better than 25%
```

**Option 2: Look for Context Clues**
```
Sometimes other questions provide hints:
- Later question might reference same concept
- PBQ scenario might include related information
- Don't rely on this, but stay aware
```

**Option 3: Flag and Move On**
```
Don't get stuck:
- Flag question for review
- Make your best guess (don't leave blank)
- Move forward
- Return if time permits
- First instinct often correct
```

### Should You Change Answers?

**Research shows**:
- Changing answers is beneficial **IF** you have specific reason
- Changing due to "gut feeling" often makes it worse

**Change answer if**:
- ✓ You misread question initially
- ✓ You recall specific fact that contradicts your answer
- ✓ You notice keyword you missed ("NOT", "EXCEPT", "BEST")
- ✓ Another question triggered your memory

**DON'T change if**:
- ❌ Just feeling uncertain
- ❌ Other answer "looks better" without reason
- ❌ Running out of time and panicking

---

## Mental Preparation and Exam Psychology

### Managing Test Anxiety

**Before Exam**:
- **Deep breathing**: 4 counts in, hold 4, out 4, hold 4 (repeat 5 times)
- **Positive visualization**: See yourself successfully completing exam
- **Physical preparation**: Good sleep, nutrition, exercise reduce anxiety
- **Perspective**: It's one exam, you can retake if needed

**During Exam**:
```
If anxiety hits:
1. Close eyes, take 3 deep breaths
2. Remind yourself: "I've prepared, I know this material"
3. Refocus on current question only
4. Don't think about score or remaining questions
```

### Maintaining Focus

**Strategies**:
- **One question at a time**: Don't think about previous or next questions
- **Scheduled breaks**: Close eyes for 30 seconds every 20-30 questions
- **Body position**: Sit up straight, maintain good posture
- **Hydration**: Sip water if allowed (testing center)

**When Confidence Drops**:
```
You hit a string of difficult questions and think "I'm failing..."

Reality check:
- Exam has questions of varying difficulty
- Everyone gets hard questions
- You don't need 100% to pass (720/900 = 80%)
- Hard questions often weighted same as easy ones
- Keep pushing forward
```

### The Final Minutes

**With 5 Minutes Remaining**:
```
1. Ensure all questions answered (no blanks)
2. Quickly review flagged questions
3. Check PBQ completeness
4. Don't make hasty changes
5. Take final deep breath
6. Submit with confidence
```

**After Clicking "Submit"**:
- Results displayed immediately
- Pass/Fail status shown
- Domain performance breakdown provided
- If passed: Celebrate! You're Network+ certified!
- If failed: Note weak domains, schedule retake, keep learning

---

## Summary

**Key Test-Taking Strategies**:
- **Time management**: Skip PBQs initially, complete multiple choice first, return to PBQs with 20-25 minutes remaining
- **Read carefully**: Note keywords (BEST, FIRST, MOST, EXCEPT, NOT)
- **Eliminate wrong answers**: Narrow to 2-3 options before selecting
- **Don't overthink**: Take questions at face value, trust your preparation
- **Flag and move on**: Don't get stuck, make best guess and continue

**Common Traps to Avoid**:
- Choosing "technically correct" over "best answer"
- Selecting familiar terms without verifying they answer question
- Overthinking simple questions by imagining complex scenarios
- Missing "EXCEPT" or "NOT" wording in questions
- Changing answers without specific reason

**Mental Preparation**:
- Practice stress management techniques before exam day
- Maintain focus with one-question-at-a-time approach
- Keep perspective: You can retake if needed
- Trust your preparation and first instincts

**Exam Day Logistics**:
- Arrive early with proper ID and confirmation
- Use restroom before starting
- Skip PBQs initially to build confidence with easier questions
- Allocate time strategically: 60-65 min multiple choice, 20-25 min PBQs, 5 min review

**Remember**:
- You need 720/900 (80%) to pass, not perfection
- Difficult questions are designed to be challenging
- Your preparation has equipped you to succeed
- Stay calm, work systematically, and trust your knowledge

With these strategies combined with your technical preparation, you're ready to walk into the testing center with confidence and pass the Network+ exam on your first attempt!

---

## Additional References

- **CompTIA Exam Policies**: Official testing rules and procedures
- **Pearson VUE Testing Center Locator**: Find nearby testing locations
- **Test Anxiety Resources**: Stress management techniques
- **Professor Messer Success Bundle**: Exam day tips and strategies
