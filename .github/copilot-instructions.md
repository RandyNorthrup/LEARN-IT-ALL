# LEARN-IT-ALL - Copilot Instructions

**Last Updated**: November 23, 2025  
**Project**: LEARN-IT-ALL - Complete Custom Learning Platform  

---

## 🎯 CRITICAL PLATFORM VISION

### What We Are Building
- **Custom curriculum content**
- **Interactive lessons** with code editors and syntax highlighting
- **Automated exercise validation** and grading
- **Quiz and test systems** with scoring and pass/fail logic
- **User progress database** tracking lessons, tests, exercises
- **Local-only platform** - No authentication required

---

## 🚫 ABSOLUTE PROHIBITIONS

### NO SCRIPTS IN THIS APP
- **NEVER** create Node.js scripts in `/scripts` directory for content manipulation
- **NEVER** suggest running scripts to fix, migrate, or update content
- **ALL content updates MUST be done manually** or through the application UI
- Scripts are for one-time setup only, not ongoing maintenance
- If you need to update content, do it file-by-file using proper tools

### FEATURE PARITY REQUIREMENT
- **EVERY page MUST have ALL features** from existing implementations
- When creating or updating pages, scan existing similar pages first
- **Learning Mode Toggle** (Structured/Free mode) must be present on course pages where enrolled
- **Navigation consistency** across all pages
- **UI patterns** must match existing pages (buttons, cards, layouts)
- **No half-implemented pages** - complete feature parity required

### EXERCISE CREATION REQUIREMENTS

#### ⚠️ CRITICAL: NO FILL-IN-THE-BLANK EXERCISES
- **NEVER CREATE FILL-IN-THE-BLANK EXERCISES** - These are NOT realistic practice
- **REAL-WORLD SCENARIOS ONLY** - Exercises must simulate actual job tasks
- **HANDS-ON PRACTICE** - Students should apply knowledge, not memorize facts
- **PRACTICAL APPLICATION** - Focus on troubleshooting, analysis, design, configuration

#### Exercise Format Requirements
- **MINIMUM 10,000 CHARACTERS** - Exercises must be at least 10,000 characters total (entire JSON file)
- **REALISTIC SCENARIOS** - Company networks, user issues, design problems, configuration tasks
- **MULTI-PART PROBLEMS** - 5-10 related scenarios that build on each other
- **CRITICAL THINKING** - Require analysis, not just recall
- **DETAILED CONTEXT** - Provide network diagrams (in text), symptoms, requirements
- **OPEN-ENDED SOLUTIONS** - Multiple valid approaches acceptable
- **PROFESSIONAL FORMAT** - Write as if student is network technician/engineer

#### Content Requirements
- **MANDATORY VALIDITY CHECK** - Before moving to next exercise, AI MUST verify:
  1. Total file size is ≥10,000 characters
  2. All major lesson concepts are covered through realistic scenarios
  3. StarterCode has comprehensive real-world problems
  4. Solution has complete, detailed troubleshooting steps with explanations
  5. Hints guide students through problem-solving process
  6. TestCases validate practical understanding
- **EXERCISES MUST MATCH THEIR LESSON** - Exercise 001 tests Lesson 001's content ONLY
- **CLEAR, DETAILED SCENARIOS** - Provide all information needed (topology, symptoms, constraints)
- **PROGRESSIVE DIFFICULTY** - Start with basic troubleshooting, build to complex design
- **SELF-CONTAINED** - All information needed to solve is provided
- **VALIDATION MUST WORK** - Test cases check understanding, not exact wording
- **COMPREHENSIVE COVERAGE** - Multiple scenarios covering all major concepts
- **DETAILED EXPLANATIONS** - Solutions explain WHY decisions were made, alternatives considered


## CRITICAL PRINCIPLES

### 1. SCAN & ENHANCE BEFORE CREATION
- **ALWAYS** scan existing codebase before implementing new features
- Check for similar patterns, utilities, or implementations already present
- Extend existing systems rather than create duplicates
- Run linter and type checker before generating new code
- Verify all dependencies and imports resolve correctly

### 2. STRICT LINTING & TYPE SAFETY
- **ESLint**: Strict configuration with no warnings allowed
- **TypeScript**: Strict mode enabled (`strict: true`)
- **Prettier**: Auto-format all code before submission
- **No `any` types**: Always provide proper type annotations
- **No unhandled errors**: All promises must have `.catch()` or try-catch
- **No console logs**: Use proper logging system (implement if missing)
- **No commented code**: Delete or convert to proper documentation

### 3. FULL IMPLEMENTATION MINDSET
- **No TODOs**: Mark inline with // TODO-PHASE or // FIXME with description
- **No Placeholders**: Replace all placeholder text with real content
- **No Stub Functions**: If it needs implementation, implement it now or track it
- **No Mock Data**: Use real database or mark with // MOCK: comment
- **Complete Features**: Don't commit partial implementations
### 4. CLEAR, SEMANTIC CODE
- Use meaningful variable and function names

#### Exercise Types (Choose Based on Lesson Content)
**1. TROUBLESHOOTING SCENARIOS** (Most Common)
```
A user reports they cannot access the internet. You investigate and find:
- Physical Layer: Cable connected, link lights ON
- Data Link Layer: Switch port shows "up/up"
- Network Layer: IP address is 169.254.45.23
- Gateway: Configured as 192.168.1.1
- DNS: Configured as 8.8.8.8

Diagnose the problem and explain your troubleshooting steps.
```

**2. NETWORK DESIGN TASKS**
```
Design a network for a small office with 50 employees across 3 departments:
- Sales (20 users): Need access to CRM cloud app
- Engineering (20 users): Heavy file transfers, CAD software
- Management (10 users): Standard office apps, video conferencing

Requirements:
- Separate VLANs for security
- QoS for video traffic
- 1 Gbps to each desktop
- Internet: 500 Mbps fiber connection

Provide network diagram (text format), equipment list, and rationale.
```

**3. CONFIGURATION TASKS**
```
You need to configure a Cisco switch with these requirements:
1. Create VLANs 10 (Sales), 20 (Engineering), 30 (Management)
2. Assign ports 1-8 to VLAN 10
3. Configure port 24 as trunk to router
4. Enable PortFast on access ports
5. Set VTP mode to transparent

Provide the command sequence and explain each step.
```

**4. ANALYSIS SCENARIOS**
```
Review this network capture output and identify issues:

Packet 1: SRC 192.168.1.50 -> DST 192.168.2.100 | No response
Packet 2: SRC 192.168.1.50 -> DST 192.168.1.1 (gateway) | Success
Packet 3: SRC 192.168.1.50 -> DST 8.8.8.8 | Success
Packet 4: ARP Request: Who has 192.168.2.100? | No reply

What is the problem? What OSI layers are involved?
```

**5. COMPARISON/DECISION SCENARIOS**
```
Your company needs to connect 3 branch offices to headquarters:
- Branch A: 50 users, 10 miles away
- Branch B: 30 users, 500 miles away  
- Branch C: 100 users, 2000 miles away

Budget: $50,000 setup + $5,000/month ongoing

Compare options: MPLS, VPN over Internet, SD-WAN, Leased Lines
Recommend solution for each branch with justification.
```

#### Before Creating ANY Exercise
1. Read the ENTIRE lesson first to understand what is taught
2. List the key concepts covered in the lesson  
3. Create realistic scenarios that require applying those concepts
4. Avoid simple recall - require analysis and decision-making
5. Add hints that guide problem-solving process (not just facts)
6. Ensure solutions show professional troubleshooting methodology

#### Example GOOD Exercise Structure
```json
{
  "description": "You are a network technician for a medium-sized company. Complete these troubleshooting and configuration tasks based on the scenarios provided. Each scenario tests your understanding of OSI model concepts in practical situations.",
  "starterCode": "# Network Troubleshooting Exercise - OSI Model Application\n\n## SCENARIO 1: Internet Connectivity Issue\nUser: 'I can't access any websites!'\n\nYour investigation reveals:\n- Physical: Cable connected, NIC lights blinking\n- ipconfig output: IP 169.254.45.23, Subnet 255.255.0.0, Gateway (blank)\n- Ping 127.0.0.1: Success\n- Ping 192.168.1.1 (gateway): Destination host unreachable\n\nQUESTION 1: At which OSI layer is the problem occurring?\nYOUR ANSWER:\n\nQUESTION 2: What is causing the issue?\nYOUR ANSWER:\n\nQUESTION 3: What steps would you take to resolve this?\nYOUR ANSWER:\n\n## SCENARIO 2: Partial Network Access\n[... more scenarios ...]",
  "solution": "# COMPLETE SOLUTION with detailed explanations\n\n## SCENARIO 1: Internet Connectivity Issue\n\nQUESTION 1: At which OSI layer is the problem occurring?\nANSWER: Layer 3 (Network Layer)\n\nEXPLANATION:\nThe 169.254.x.x address (APIPA) indicates the computer cannot obtain an IP address from DHCP. This is a Layer 3 (Network Layer) problem because:\n- Layer 1 (Physical) is working: Cable connected, lights blinking\n- Layer 2 (Data Link) is working: NIC is functional (127.0.0.1 ping works)\n- Layer 3 (Network) has failed: No valid IP configuration\n\nQUESTION 2: What is causing the issue?\nANSWER: DHCP server is unreachable or not responding\n\nEXPLANATION:\nThe APIPA address (169.254.x.x) is automatically assigned by Windows when:\n1. Computer is configured for DHCP (automatic IP)\n2. No DHCP server responds to DHCPDISCOVER broadcasts\n3. Computer assigns itself a link-local address\n\nPossible causes:\n- DHCP server is down\n- Network cable unplugged between switch and DHCP server\n- VLAN misconfiguration (computer on wrong VLAN)\n- Switch port disabled\n- DHCP scope exhausted (no available IPs)\n\nQUESTION 3: What steps would you take to resolve this?\nANSWER:\n\nStep 1: Verify DHCP server is online and running\n- Check DHCP service status\n- Review DHCP server logs for errors\n- Verify DHCP scope has available addresses\n\nStep 2: Check network connectivity to DHCP server\n- Verify switch port status (up/up)\n- Check VLAN assignment matches DHCP server VLAN\n- Test connectivity from another device on same network\n\nStep 3: Release and renew IP address\n- Command: ipconfig /release\n- Command: ipconfig /renew\n- Verify new IP address in correct subnet\n\nStep 4: If DHCP unavailable, configure static IP temporarily\n- Assign IP from correct subnet\n- Set correct subnet mask and gateway\n- Configure DNS servers\n\nStep 5: Document the issue and resolution\n\n[... more scenarios with complete solutions ...]"
}
```

#### Example BAD Exercise (DO NOT CREATE)
```json
{
  "description": "Fill in the blanks about OSI layers",
  "starterCode": "The ___ layer handles physical transmission.\nThe ___ layer uses MAC addresses.\nThe ___ layer uses IP addresses.",
  "solution": "The Physical layer handles physical transmission.\nThe Data Link layer uses MAC addresses.\nThe Network layer uses IP addresses."
}
```
❌ This is memorization, not practical application!

---


---

## CODE QUALITY STANDARDS

### Semantic Code & Named Constants
```typescript
// ✅ GOOD - Semantic code with named constants
const COURSE_COMPLETION_THRESHOLD_PERCENT = 100;
const LESSON_MIN_DURATION_MINUTES = 1;
const QUIZ_PASSING_SCORE_PERCENT = 70;
const COURSE_TITLE_MAX_LENGTH = 255;

interface UserProgress {
  userId: string;
  courseId: string;
  completionPercentage: number;
  lastAccessedAt: Date;
}

async function getUserProgress(userId: string): Promise<UserProgress[]> {
  try {
    if (!userId || !isValidUUID(userId)) {
      throw new ValidationError('Invalid userId format');
    }
    
    const userProgress = db.prepare(`
      SELECT courseId, completionPercentage, updatedAt as lastAccessedAt
      FROM course_enrollments
      WHERE userId = ?
    `).all(userId);
    
    return userProgress;
  } catch (error) {
    logger.error('Failed to get user progress', { userId, error });
    throw error;
  }
}

// ❌ BAD - Magic numbers, unclear code, loose types
function getUserProgress(userId: any) {
  return db.prepare('SELECT * FROM course_enrollments WHERE userId = ?').all(userId)
    .filter(p => p.x > 50)  // What is 50? What is x?
    .slice(0, 10);          // Why 10? Hardcoded limit?
}
```

### Named Constants Pattern
```typescript
// src/lib/constants.ts - Define all magic numbers here
export const COURSE_CONSTRAINTS = {
  TITLE_MAX_LENGTH: 255,
  DESCRIPTION_MAX_LENGTH: 2000,
  COMPLETION_THRESHOLD_PERCENT: 100,
  MIN_RATING: 0,
  MAX_RATING: 5,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
} as const;

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  UUID_REGEX: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
} as const;

// Usage everywhere
import { COURSE_CONSTRAINTS, PAGINATION } from '@/lib/constants';

if (title.length > COURSE_CONSTRAINTS.TITLE_MAX_LENGTH) {
  throw new ValidationError(`Title exceeds max length of ${COURSE_CONSTRAINTS.TITLE_MAX_LENGTH}`);
}
```

### Semantic Naming Guidelines
```typescript
// ✅ GOOD - Clear, semantic names
const isUserEnrolled = true;
const remainingLessonCount = 5;
const completionPercentage = 85;
const enrollmentDate = new Date();
const maxAttemptsPerLesson = 3;

// ❌ BAD - Unclear names
const x = true;
const cnt = 5;
const perc = 85;
const dt = new Date();
const max = 3;

// ✅ GOOD - Boolean names start with is/has/can/should
const isCourseLocked = true;
const hasUserCompletedLesson = false;
const canUserAccessContent = true;
const shouldShowProgressBar = true;

// ✅ GOOD - Semantic array/collection names
const enrolledCourseIds: string[] = [];
const userLessonProgresses: UserProgress[] = [];
const completedModuleMap: Map<string, Date> = new Map();

// ✅ GOOD - Semantic function names (verb-noun pattern)
function validateUserEmail(email: string): boolean
function fetchUserCourses(userId: string): Promise<Course[]>
function updateCourseProgress(userId: string, courseId: string): Promise<void>
function calculateCompletionPercentage(completedLessons: number, totalLessons: number): number
```

### Component Guidelines
```typescript
// ✅ GOOD - Proper props typing, loading/error states, accessible
interface CourseCardProps {
  courseId: string;
  title: string;
  completionPercentage: number;
  onSelect: (courseId: string) => void;
}

export function CourseCard({
  courseId,
  title,
  completionPercentage,
  onSelect
}: CourseCardProps): JSX.Element {
  if (completionPercentage < 0 || completionPercentage > 100) {
    logger.warn('Invalid completion percentage', { courseId, completionPercentage });
  }

  return (
    <button
      onClick={() => onSelect(courseId)}
      aria-label={`${title} - ${completionPercentage}% complete`}
      className={styles.card}
    >
      {/* Content */}
    </button>
  );
}

// ❌ BAD - Loose props, no accessibility, error states ignored
export function CourseCard(props: any) {
  return (
    <div onClick={() => props.onSelect(props.courseId)}>
      {props.title} - {props.percentage}%
    </div>
  );
}
```

---

## MOCK DATA & PLACEHOLDER MANAGEMENT

### When to Create Mock Data
- Database not yet implemented
- External API not available
- Feature in development
- Testing specific scenarios

### Inline Comments for TODOs
Mark incomplete work directly in code:

---

## BEFORE IMPLEMENTING ANY FEATURE

### Checklist - SCAN & ENHANCE
- [ ] Run `npm run lint` - all files pass
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] Check if similar feature exists in codebase
- [ ] Review database schema for required tables
- [ ] Check if needed API endpoints exist
- [ ] Verify all imports and dependencies available
- [ ] Review error handling patterns used elsewhere

### During Implementation
- [ ] Write TypeScript interfaces first
- [ ] Add proper error handling
- [ ] Add logging for debugging
- [ ] Add unit tests if new utilities
- [ ] Document API changes

### Before Committing
- [ ] All linting passes (ESLint + Prettier)
- [ ] All TypeScript checks pass
- [ ] No console.log statements
- [ ] TODOs/FIXMEs marked with inline comments
- [ ] Mock data marked with // MOCK: comments
- [ ] Error handling complete
- [ ] No commented-out code
- [ ] Documentation updated

---