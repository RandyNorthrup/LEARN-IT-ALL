---
id: lesson-076-troubleshooting-methodology
title: "Network Troubleshooting Methodology"
chapterId: "chapter-009-network-troubleshooting"
order: 76
duration: 20
objectives:
  - Understand structured troubleshooting approach
  - Apply the CompTIA troubleshooting methodology
  - Explain each step of the troubleshooting process
  - Differentiate problem identification from solution implementation
  - Document troubleshooting steps and resolutions
---

# Network Troubleshooting Methodology

**Network troubleshooting** requires a systematic approach to identify and resolve issues efficiently. The **CompTIA troubleshooting methodology** provides a structured 7-step process for diagnosing and fixing network problems.

This lesson covers troubleshooting fundamentals—essential for the CompTIA Network+ N10-008 exam.

---

## Why Use a Methodology?

### Benefits of Structured Approach

**Without methodology:**
❌ Random troubleshooting (trial and error)
❌ Overlooking simple issues
❌ Making changes without understanding impact
❌ No documentation of what was tried
❌ Wasting time on wrong solutions

**With methodology:**
✅ Systematic problem-solving
✅ Faster resolution
✅ Fewer mistakes
✅ Better documentation
✅ Reproducible solutions
✅ Knowledge building

---

## CompTIA Troubleshooting Methodology

### The 7-Step Process

1. **Identify the problem**
2. **Establish a theory of probable cause**
3. **Test the theory to determine the cause**
4. **Establish a plan of action to resolve the problem and identify potential effects**
5. **Implement the solution or escalate as necessary**
6. **Verify full system functionality and implement preventive measures**
7. **Document findings, actions, outcomes, and lessons learned**

---

## Step 1: Identify the Problem

### Gather Information

**Ask questions:**
- What is the problem?
- When did it start?
- Has anything changed recently?
- Who is affected?
- Can you reproduce the issue?

**Example questions:**
```
User reports: "Internet is down"

IT: "When did you notice the problem?"
User: "About 30 minutes ago"

IT: "Can you access local file shares?"
User: "Yes, those work fine"

IT: "Are other users having the same issue?"
User: "I don't know, let me check... Yes, everyone in my department"

IT: "Did anything change this morning?"
User: "We had a power outage around 8 AM"
```

### Identify Symptoms

**What's working vs not working:**
- Can ping local devices? (LAN connectivity)
- Can ping gateway? (router reachable)
- Can ping external IP? (internet connectivity)
- Can resolve DNS? (DNS working)

**Example symptom gathering:**
```
✓ Can ping 192.168.1.1 (gateway) - LAN works
✗ Cannot ping 8.8.8.8 - Internet down
✗ Cannot browse websites - Confirms internet issue
✓ Can access file server - LAN resources work
```

### Determine Scope

**Single user or multiple users?**
- One user: Likely workstation/device issue
- Multiple users in one area: Switch or VLAN issue
- Entire site: WAN, router, or ISP issue
- All sites: Core network or provider issue

**Example scope determination:**
```
Problem: Cannot access email

Scope 1: One user → Check user's computer, Outlook config
Scope 2: One department → Check department switch/VLAN
Scope 3: Entire building → Check building router/firewall
Scope 4: All locations → Check email server, internet connection
```

### Duplicate the Problem

**Try to reproduce:**
- Confirm issue still exists
- Understand exact conditions
- Rule out intermittent issues

**If can't reproduce:**
- Was it transient? (temporary network blip)
- User error? (typo in URL)
- Already resolved? (automatic recovery)

---

## Step 2: Establish a Theory of Probable Cause

### Start with Simple/Obvious

**Check simple things first:**
✓ Cable unplugged?
✓ Device powered on?
✓ Wi-Fi disabled?
✓ Airplane mode on?

**Example:**
```
Problem: Laptop can't connect to network
Simple checks:
  - Ethernet cable plugged in? → Yes
  - Link light on NIC? → No
  - Cable damaged? → Visibly bent near connector
  
Theory: Bad cable
```

### Layer-by-Layer Approach (OSI Model)

**Bottom-up (physical to application):**
- Layer 1 (Physical): Cable, NIC, port
- Layer 2 (Data Link): Switch, MAC, VLAN
- Layer 3 (Network): Router, IP, gateway
- Layer 4 (Transport): Port, firewall
- Layer 5-7 (Application): DNS, web server, app

**Top-down (application to physical):**
- Start at application layer
- Work down if issue persists

**Divide and conquer:**
- Test middle layer
- Narrows problem to upper or lower half

### Consider Multiple Theories

**List possible causes:**
```
Problem: Cannot access website

Possible causes:
1. DNS not resolving (nslookup fails)
2. Firewall blocking port 80/443
3. Default gateway incorrect
4. Internet circuit down
5. Web server down
6. Incorrect IP address on workstation
```

### Question the Obvious

**Don't assume:**
- "It was working yesterday" (doesn't mean config unchanged)
- "No one touched it" (someone may have)
- "It's always been that way" (maybe that's the problem)

---

## Step 3: Test the Theory to Determine the Cause

### Test One Theory at a Time

**Methodical testing:**
```
Theory 1: DNS issue
Test: nslookup google.com
Result: Resolves correctly → Theory disproven

Theory 2: Firewall blocking
Test: Ping 8.8.8.8 (external IP)
Result: Timeout → Firewall or routing issue

Theory 3: Default gateway incorrect
Test: ipconfig /all → Gateway: 192.168.1.1
      Ping 192.168.1.1 → Success
Result: Gateway correct and reachable → Theory disproven

Theory 4: Internet circuit down
Test: Check router WAN interface status
Result: WAN interface down → THEORY CONFIRMED
```

### If Theory Confirmed

**Move to Step 4:**
- Establish plan of action
- Prepare to implement solution

### If Theory Not Confirmed

**Re-establish new theory:**
- Return to Step 2
- Consider other possible causes
- May need to escalate if all theories exhausted

### Use Appropriate Tools

**Testing tools:**
- `ping`: Test connectivity
- `ipconfig/ifconfig`: Check IP config
- `nslookup/dig`: Test DNS
- `traceroute/tracert`: Trace path
- `netstat`: Check connections
- Cable tester: Physical layer
- Wi-Fi analyzer: Wireless issues

---

## Step 4: Establish a Plan of Action

### Define the Solution

**What needs to be done:**
```
Problem: WAN interface down on router
Root cause: ISP circuit outage

Plan of action:
1. Contact ISP to report outage
2. Check ISP status page for known issues
3. Estimate downtime (get ETA from ISP)
4. Notify affected users
5. Consider failover to backup circuit if available
```

### Identify Potential Effects

**What will solution impact?**

**Example 1: Reboot switch**
- Effect: All devices lose connectivity for 2 minutes
- Timing: Do during maintenance window (evening)

**Example 2: Change firewall rule**
- Effect: May break existing connections
- Risk: Could block critical traffic if misconfigured

**Example 3: Replace failed router**
- Effect: Network downtime during replacement
- Timing: Schedule during off-hours

### Assess Risks

**Risk assessment:**
- What could go wrong?
- Is there a rollback plan?
- Do we have backups?
- Have we tested in lab?

### Get Approval if Needed

**Changes requiring approval:**
- Network downtime
- Configuration changes
- Hardware replacement
- Cost implications

---

## Step 5: Implement the Solution or Escalate

### Implement the Solution

**Execute the plan:**
```
Example: Replace failed switch

1. Schedule maintenance window (11 PM - 1 AM)
2. Notify users of downtime
3. Backup current switch configuration
4. Label all cables before disconnecting
5. Swap switch
6. Restore configuration
7. Test connectivity
8. Monitor for issues
```

### Make One Change at a Time

**Avoid multiple simultaneous changes:**
```
❌ BAD: Change IP address AND replace cable AND update driver
        (If it works, which change fixed it?)

✅ GOOD: Change IP address → Test → Still broken
         Replace cable → Test → Still broken
         Update driver → Test → Fixed! (Driver was the issue)
```

### Escalate if Necessary

**When to escalate:**
- Beyond your expertise
- Requires higher-level access
- Vendor support needed
- Management decision required

**Escalation example:**
```
Problem: Core router kernel panic (crashing)
Your level: Network technician (no access to router OS)
Escalate to: Senior network engineer or vendor TAC
```

---

## Step 6: Verify Full System Functionality

### Test the Fix

**Confirm problem resolved:**
```
Problem: User couldn't access file server

After fix (corrected IP address):
✓ Ping file server → Success
✓ Map network drive → Success
✓ Open files from share → Success
✓ Ask user to test → User confirms working
```

### Test Related Systems

**Don't just test the immediate problem:**
```
Fixed: Switch port speed (was 10 Mbps, set to 1 Gbps)

Test:
✓ Speed now 1 Gbps
✓ Can still access network resources
✓ VoIP phone works (same switch)
✓ Printer works (same switch)
```

### Implement Preventive Measures

**Prevent recurrence:**
- Update documentation
- Create monitoring alert
- Add to backup schedule
- Train users

**Example preventive measures:**
```
Problem: Backup failed due to full disk
Solution: Deleted old backups, backup successful

Preventive measures:
1. Set up disk space monitoring (alert at 80%)
2. Implement backup rotation policy (30-day retention)
3. Schedule monthly disk cleanup
4. Document procedure for future reference
```

---

## Step 7: Document Findings, Actions, and Outcomes

### Why Document?

**Benefits:**
✅ Future reference (same issue happens again)
✅ Knowledge base for team
✅ Track trends (recurring issues)
✅ Audit trail (compliance)
✅ Training material

### What to Document

**Ticket/incident report should include:**

1. **Problem description:**
   - What was reported
   - Symptoms observed
   - Users/systems affected

2. **Steps taken:**
   - Tests performed
   - Theories investigated
   - Commands run

3. **Root cause:**
   - What actually caused the issue

4. **Solution:**
   - What fixed the problem
   - Configuration changes made

5. **Outcome:**
   - System returned to normal
   - User confirmed resolution

6. **Preventive measures:**
   - Steps to prevent recurrence

### Documentation Example

```
Ticket #12345: Email Server Unreachable

Problem:
Users in Building A unable to access email (Outlook connection timeout)
Started: 2024-11-22 09:15
Affected: 45 users in Building A
No recent changes reported

Troubleshooting Steps:
1. Verified email server status: Running
2. Pinged email server from admin workstation: Success
3. Pinged email server from user workstation (Building A): Timeout
4. Checked Building A switch: All lights green
5. Checked VLAN configuration: VLAN 10 (Building A) missing from trunk port
6. Reviewed recent changes: Switch replaced yesterday, trunk config not applied

Root Cause:
Trunk port on new switch not configured for VLAN 10.
Building A devices (VLAN 10) unable to reach email server (VLAN 20).

Solution:
Added VLAN 10 to trunk port on new switch:
  interface GigabitEthernet0/1
  switchport trunk allowed vlan add 10

Verification:
- Pinged email server from Building A workstation: Success
- User tested Outlook: Connected successfully
- Tested 5 random workstations in Building A: All working

Preventive Measures:
1. Created switch replacement checklist (includes VLAN verification)
2. Updated switch config template to include all VLANs
3. Implemented post-replacement testing procedure

Resolved: 2024-11-22 10:45
Time to resolution: 1.5 hours
```

---

## Troubleshooting Best Practices

### Do's

✅ **Follow the methodology** (don't skip steps)
✅ **Ask questions** (gather information)
✅ **Start simple** (check obvious things first)
✅ **Make one change at a time** (isolate variables)
✅ **Document everything** (for future reference)
✅ **Test thoroughly** (verify full functionality)
✅ **Communicate** (keep users informed)

### Don'ts

❌ **Don't guess randomly** (use systematic approach)
❌ **Don't assume** (verify assumptions)
❌ **Don't make multiple changes** (can't identify what fixed it)
❌ **Don't skip documentation** (will forget details)
❌ **Don't ignore security** (maintain change control)
❌ **Don't work alone** (escalate if needed)

---

## Common Troubleshooting Mistakes

### Mistake 1: Skipping Information Gathering

**Problem:**
- Jump to solution without understanding problem
- Fix wrong thing

**Solution:**
- Always complete Step 1 thoroughly

### Mistake 2: Not Testing Theory

**Problem:**
- Assume first theory is correct
- Implement solution that doesn't fix issue

**Solution:**
- Always test theories (Step 3)

### Mistake 3: Multiple Simultaneous Changes

**Problem:**
- Change multiple things at once
- Don't know which change fixed it
- Can't reproduce solution

**Solution:**
- One change at a time, test after each

### Mistake 4: Not Verifying Full Functionality

**Problem:**
- Assume fix worked without testing
- Create new issues unintentionally

**Solution:**
- Thoroughly test (Step 6)

### Mistake 5: Poor Documentation

**Problem:**
- Forget what was done
- Same issue happens again, start from scratch

**Solution:**
- Document immediately (Step 7)

---

## Key Takeaways

1. **CompTIA troubleshooting methodology** has 7 steps: Identify, Theory, Test, Plan, Implement, Verify, Document
2. **Step 1: Identify the problem** by gathering information, asking questions, and determining scope
3. **Step 2: Establish theory** starting with simple/obvious causes, using OSI model layer approach
4. **Step 3: Test the theory** methodically, one at a time; if not confirmed, return to Step 2
5. **Step 4: Establish plan** defining solution and identifying potential effects before implementing
6. **Step 5: Implement solution** or escalate if beyond your expertise; make one change at a time
7. **Step 6: Verify full system functionality** and implement preventive measures to avoid recurrence
8. **Step 7: Document findings** including problem, steps, root cause, solution, and preventive measures
9. **Make one change at a time** to isolate what actually fixed the problem
10. **Follow the methodology systematically** instead of random trial-and-error troubleshooting

---

## References

- **CompTIA Network+ N10-008 Objective 5.1:** Explain the network troubleshooting methodology
- CompTIA A+ and Network+ Troubleshooting Methodology
- ITIL Incident Management Best Practices
- Professor Messer: Network+ N10-008 - Troubleshooting Methodology

---

**Next Lesson:** Lesson 77 - Troubleshooting Tools (Hardware and Software)
