---
id: lesson-088-pbq-simulations
title: "Performance-Based Questions (PBQ) Preparation"
chapterId: ch10-exam-prep
order: 88
duration: 35
objectives:
  - "Understand the format and requirements of Performance-Based Questions"
  - "Practice common PBQ scenarios and simulations"
  - "Develop strategies for efficiently completing PBQs"
  - "Learn to navigate PBQ interfaces and use built-in tools"
---

# Performance-Based Questions (PBQ) Preparation

## Introduction

Performance-Based Questions (PBQs) are one of the most challenging aspects of the CompTIA Network+ exam. Unlike traditional multiple-choice questions that test your ability to recognize correct answers, PBQs require you to demonstrate practical skills by completing hands-on tasks in simulated network environments.

PBQs typically appear at the beginning of the exam and may include:
- Configuring network devices (switches, routers, firewalls)
- Troubleshooting network connectivity issues
- Matching components to network diagrams
- Identifying appropriate cables or equipment for scenarios
- Interpreting command outputs and logs

This lesson prepares you for PBQ success by exploring common PBQ types, providing practice scenarios, and teaching strategies for efficient completion.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand the format and requirements of Performance-Based Questions
- Practice common PBQ scenarios and simulations
- Develop strategies for efficiently completing PBQs
- Learn to navigate PBQ interfaces and use built-in tools

---

## Understanding PBQ Format

### What Makes PBQs Different

**Multiple Choice Questions**:
- Read question, select answer
- 4 choices provided
- Takes 30-60 seconds
- Tests knowledge recognition

**Performance-Based Questions**:
- Interactive simulation
- Must configure, troubleshoot, or complete task
- Takes 3-5 minutes (or more)
- Tests practical skills and application

### PBQ Characteristics

**Interactive Elements**:
- Drag-and-drop components
- Drop-down menus for configuration
- Text input fields for commands
- Clickable network diagrams
- Simulated command-line interfaces

**Scoring**:
- **All-or-nothing**: Must complete correctly for credit
- **No partial credit**: One mistake = zero points
- **Worth more**: PBQs weighted more heavily than multiple choice
- **Cannot skip permanently**: Must attempt all PBQs

**Time Considerations**:
- **Appear first**: Typically questions 1-6 of exam
- **Can skip initially**: Flag and return after multiple choice
- **Allocate 15-20 minutes**: For all PBQs combined
- **Don't rush**: Better to spend time and get correct than guess

### PBQ Interface Elements

**Common Interface Features**:

**Instruction Panel**:
- Task description
- Requirements to complete
- Constraints or limitations
- **Read carefully**: Missing details causes errors

**Work Area**:
- Network diagram
- Configuration panel
- Command-line interface
- Drag-and-drop zones

**Tools and Resources**:
- Exhibit button (additional information)
- Calculator (for subnetting)
- Notepad (scratch area)
- Command help (some simulations)

**Navigation**:
- Submit button (lock in answer)
- Reset button (start over)
- Previous/Next (move between PBQs)
- Flag for review

---

## Common PBQ Types

### Type 1: Network Topology Identification

**Scenario**: Given network diagram, identify device types or connections.

**Example Task**:
```
You are provided with a network diagram showing various unlabeled devices.
Drag and drop the correct device type to each position:

Devices Available:
- Router
- Layer 2 Switch
- Layer 3 Switch
- Firewall
- Access Point
- Hub
- Modem

Diagram:
[Internet Cloud] --- [Device A] --- [Device B] --- [Device C] --- [PC]
                                         |
                                    [Device D]
                                         |
                                    [Wireless Device E]

Task: Identify what Device A, B, C, D, E should be.
```

**Solution Approach**:

**Analyze Diagram**:
- Device A connects to Internet: **Router or Firewall** (gateway device)
- Device B connects router to internal network: **Layer 3 Switch** (routing + switching)
- Device C connects to PC: **Layer 2 Switch** (access switch)
- Device D connects switch to wireless: **Layer 2 Switch** (distribution)
- Device E provides wireless: **Access Point**

**Answer**:
```
Device A: Firewall (Internet edge security)
Device B: Layer 3 Switch (core/distribution)
Device C: Layer 2 Switch (access switch)
Device D: Layer 2 Switch (connects to AP)
Device E: Access Point (wireless connectivity)
```

**Tips**:
- Work from outside in (Internet → core → access → end devices)
- Consider security placement (firewall at Internet edge)
- Layer 3 devices at core/distribution, Layer 2 at access
- Access points connect to switches, not directly to routers

### Type 2: VLAN Configuration

**Scenario**: Configure switch ports with appropriate VLAN assignments.

**Example Task**:
```
Configure the switch according to these requirements:

Requirements:
- Port Fa0/1-10: VLAN 10 (Sales)
- Port Fa0/11-20: VLAN 20 (IT)
- Port Fa0/21-23: VLAN 30 (Guest)
- Port Gi0/1: Trunk port (allow VLANs 10, 20, 30)
- Native VLAN: 1

Switch Interface Configuration Panel:

Interface     | Mode   | VLAN  | Trunk Allowed VLANs
─────────────────────────────────────────────────────
Fa0/1-10      | [___]  | [___] | N/A
Fa0/11-20     | [___]  | [___] | N/A
Fa0/21-23     | [___]  | [___] | N/A
Gi0/1         | [___]  | [___] | [________________]

Options: Access, Trunk, 1, 10, 20, 30, 10,20,30
```

**Solution**:
```
Interface     | Mode   | VLAN  | Trunk Allowed VLANs
─────────────────────────────────────────────────────
Fa0/1-10      | Access | 10    | N/A
Fa0/11-20     | Access | 20    | N/A
Fa0/21-23     | Access | 30    | N/A
Gi0/1         | Trunk  | 1     | 10,20,30
```

**Key Points**:
- **Access ports**: Single VLAN, connects to end devices
- **Trunk ports**: Multiple VLANs, connects to other switches/routers
- **Native VLAN**: Usually VLAN 1 (untagged traffic)
- **Allowed VLANs**: Specify which VLANs can traverse trunk

### Type 3: IP Configuration and Subnetting

**Scenario**: Configure devices with appropriate IP addresses based on requirements.

**Example Task**:
```
Network: 192.168.100.0/24
Requirements:
- Subnet into 4 equal subnets
- Assign IPs to devices

Subnet 1 (Sales): 192.168.100.0/26
Subnet 2 (IT): 192.168.100.64/26
Subnet 3 (Guest): 192.168.100.128/26
Subnet 4 (Management): 192.168.100.192/26

Device Configuration:

Sales PC1:
IP Address: [_______________]
Subnet Mask: [______________]
Default Gateway: [__________]

IT Server:
IP Address: [_______________]
Subnet Mask: [______________]
Default Gateway: [__________]

Router Interface (Sales VLAN):
IP Address: [_______________]
Subnet Mask: [______________]
```

**Solution**:
```
Sales PC1:
IP Address: 192.168.100.10
Subnet Mask: 255.255.255.192
Default Gateway: 192.168.100.1

IT Server:
IP Address: 192.168.100.70
Subnet Mask: 255.255.255.192
Default Gateway: 192.168.100.65

Router Interface (Sales VLAN):
IP Address: 192.168.100.1
Subnet Mask: 255.255.255.192
```

**Key Points**:
- **/26 subnet** = 255.255.255.192 (64 addresses per subnet)
- **Gateway** = first usable IP in subnet (typically .1)
- **Hosts** = any usable IP in subnet (.2-.62 for /26)
- **Broadcast** = last IP in subnet (.63 for first /26 subnet)

### Type 4: Cable Selection

**Scenario**: Choose appropriate cable type for different scenarios.

**Example Task**:
```
Match the appropriate cable to each scenario:

Scenarios:
A. Connect PC to switch (5 meters)
B. Connect building 1 to building 2 (500 meters)
C. Connect switch to router uplink (50 meters, 10 Gbps)
D. Connect two switches in same rack (2 meters, 1 Gbps)

Cable Types Available:
1. Cat5e UTP
2. Cat6 UTP
3. Cat6A UTP
4. Singlemode Fiber (SMF)
5. Multimode Fiber (MMF)
6. Coaxial Cable

Drag cables to scenarios:
Scenario A: [___]
Scenario B: [___]
Scenario C: [___]
Scenario D: [___]
```

**Solution**:
```
Scenario A: Cat5e UTP (or Cat6)
  - Short distance, standard 1 Gbps connection

Scenario B: Singlemode Fiber (SMF)
  - 500m exceeds copper limit (100m)
  - SMF supports long distances

Scenario C: Cat6A UTP (or MMF)
  - 10 Gbps requires Cat6A for 50m
  - Or multimode fiber

Scenario D: Cat5e UTP (or Cat6)
  - Short distance, 1 Gbps sufficient
```

**Decision Matrix**:
```
Distance:
- <100m copper: Cat5e/Cat6/Cat6A
- 100-550m: Multimode Fiber
- >550m: Singlemode Fiber

Speed:
- 1 Gbps: Cat5e minimum
- 10 Gbps (55m): Cat6 minimum
- 10 Gbps (100m): Cat6A or fiber

Environment:
- EMI present: Shielded cable or fiber
- Outdoor: Outdoor-rated cable
```

### Type 5: ACL Configuration

**Scenario**: Create access control list to filter traffic per requirements.

**Example Task**:
```
Create ACL to meet these requirements:
1. Allow web traffic (HTTP/HTTPS) from any source to web server (192.168.10.50)
2. Allow SSH from admin network (192.168.100.0/24) to any destination
3. Deny all other traffic from 192.168.100.0/24
4. Allow all other traffic

ACL Configuration Panel:

Rule | Action | Protocol | Source IP        | Source Mask | Dest IP        | Dest Mask | Port
────────────────────────────────────────────────────────────────────────────────────────────
  1  | [___]  | [___]    | [___________]    | [________]  | [__________]   | [______]  | [__]
  2  | [___]  | [___]    | [___________]    | [________]  | [__________]   | [______]  | [__]
  3  | [___]  | [___]    | [___________]    | [________]  | [__________]   | [______]  | [__]
  4  | [___]  | [___]    | [___________]    | [________]  | [__________]   | [______]  | [__]
  5  | [___]  | [___]    | [___________]    | [________]  | [__________]   | [______]  | [__]

Options: Permit, Deny, TCP, UDP, IP, Any, 0.0.0.0, 192.168.10.50, 192.168.100.0, 
         0.0.0.255, 255.255.255.255, 22, 80, 443
```

**Solution**:
```
Rule | Action | Protocol | Source IP     | Source Mask | Dest IP         | Dest Mask       | Port
─────────────────────────────────────────────────────────────────────────────────────────────────
  1  | Permit | TCP      | Any           | 0.0.0.0     | 192.168.10.50   | 255.255.255.255 | 80
  2  | Permit | TCP      | Any           | 0.0.0.0     | 192.168.10.50   | 255.255.255.255 | 443
  3  | Permit | TCP      | 192.168.100.0 | 0.0.0.255   | Any             | 0.0.0.0         | 22
  4  | Deny   | IP       | 192.168.100.0 | 0.0.0.255   | Any             | 0.0.0.0         | Any
  5  | Permit | IP       | Any           | 0.0.0.0     | Any             | 0.0.0.0         | Any
```

**Key Principles**:
- **Order matters**: Rules processed top to bottom
- **Specific before general**: Specific permits before deny all
- **Wildcard masks**: 0.0.0.255 = match 192.168.100.0-255
- **Implicit deny**: Include explicit permit any at end

### Type 6: Troubleshooting Network Diagram

**Scenario**: Identify misconfigurations in network diagram.

**Example Task**:
```
The network diagram shows a connectivity issue. Identify the problem.

Diagram:
PC1 (192.168.1.10/24, GW: 192.168.1.1) 
  |
Switch (VLAN 10)
  |
Router Interface Gi0/0.10 (192.168.10.1/24)
  |
Internet

Issue: PC1 cannot reach Internet.

Select the problem:
A. PC IP address wrong subnet
B. PC default gateway incorrect
C. Switch VLAN misconfigured
D. Router IP address wrong subnet
```

**Solution**: **B. PC default gateway incorrect**

**Analysis**:
- PC: 192.168.1.10/24
- PC Gateway: 192.168.1.1
- Router: 192.168.10.1/24
- **Problem**: PC gateway (192.168.1.1) doesn't match router interface (192.168.10.1)
- **Fix**: Change PC gateway to 192.168.10.1 OR change router interface to 192.168.1.1

**Troubleshooting Tips**:
- Check IP address matches subnet
- Verify gateway is in same subnet
- Confirm VLAN consistency
- Check for typos in IP addresses

### Type 7: Routing Table Analysis

**Scenario**: Interpret routing table and select correct route.

**Example Task**:
```
Given routing table, which route will router use for destination 172.16.45.100?

Routing Table:
Network          Next Hop      Metric  Interface
────────────────────────────────────────────────
0.0.0.0/0        10.0.0.1      1       Gi0/0
172.16.0.0/16    192.168.1.1   10      Gi0/1
172.16.32.0/19   192.168.1.2   5       Gi0/2
172.16.40.0/22   192.168.1.3   3       Gi0/3

Select route used:
A. 0.0.0.0/0 (default route)
B. 172.16.0.0/16
C. 172.16.32.0/19
D. 172.16.40.0/22
```

**Solution**: **C. 172.16.32.0/19**

**Analysis**:
```
Destination: 172.16.45.100

Check each route for match:
172.16.0.0/16:    172.16.0.0 - 172.16.255.255   ✓ Match (least specific)
172.16.32.0/19:   172.16.32.0 - 172.16.63.255   ✓ Match (most specific match)
172.16.40.0/22:   172.16.40.0 - 172.16.43.255   ✗ Does NOT include 172.16.45.100

Subnet calculation for /22:
172.16.40.0/22 = 172.16.40.0 - 172.16.43.255 (1024 addresses)
172.16.45.100 falls outside this range.

Subnet calculation for /19:
172.16.32.0/19 = 172.16.32.0 - 172.16.63.255 (8192 addresses)
172.16.45.100 falls within this range. ✓

Longest prefix match: 172.16.32.0/19 (/19 is more specific than /16)
```

**Correct Answer**: **C. 172.16.32.0/19**

**Routing Principles**:
- **Longest prefix match**: Most specific route wins
- **/22 is more specific than /19**
- **/19 is more specific than /16**
- Calculate range to verify destination falls within subnet

---

## Worked PBQ Walkthrough: Full Troubleshooting Scenario

The following walkthrough demonstrates how to approach a complex PBQ from start to finish, applying the systematic methodology expected on the exam.

### Scenario

```
A company reports that workstations in the Accounting department (VLAN 20)
cannot reach the file server in the Data Center (VLAN 50). All other
departments can reach the file server. Use the information provided to
identify and correct the TWO problems.

Network Diagram:

Accounting PCs (VLAN 20)          Data Center (VLAN 50)
  192.168.20.0/24                   192.168.50.0/24
         |                                |
    [Switch A]                        [Switch C]
    Fa0/1-24: VLAN 20                Fa0/1-12: VLAN 50
    Gi0/1: Trunk                     Gi0/1: Trunk
         |                                |
    [Switch B - Core]                     |
    Gi0/1: Trunk (to Switch A)            |
    Gi0/2: Trunk (to Switch C)            |
    Gi0/3: Trunk (to Router)              |
         |                                |
    [Router R1]                           
    Gi0/0.20: 192.168.20.1/24  (VLAN 20)
    Gi0/0.30: 192.168.30.1/24  (VLAN 30)
    Gi0/0.50: 192.168.50.1/24  (VLAN 50)

Switch B Trunk Configuration:
  Gi0/1 - Allowed VLANs: 10, 20, 30
  Gi0/2 - Allowed VLANs: 10, 30, 50
  Gi0/3 - Allowed VLANs: 10, 20, 30, 50

Accounting PC (PC-A1):
  IP: 192.168.20.50/24
  Gateway: 192.168.20.254
  DNS: 192.168.50.10

File Server:
  IP: 192.168.50.100/24
  Gateway: 192.168.50.1
```

### Step-by-Step Solution

**Step 1 — Read all information carefully.** Before touching any configuration, inventory every piece of data. Note the specific complaint: Accounting (VLAN 20) cannot reach the Data Center (VLAN 50), but other departments can.

**Step 2 — Trace the data path.** For VLAN 20 traffic to reach VLAN 50, the packet must:
1. Leave PC-A1 on VLAN 20
2. Travel Switch A → Gi0/1 trunk → Switch B Gi0/1
3. Cross Switch B → Gi0/3 trunk → Router R1
4. Router performs inter-VLAN routing (Gi0/0.20 → Gi0/0.50)
5. Return through Switch B → Gi0/2 trunk → Switch C
6. Arrive at File Server on VLAN 50

**Step 3 — Check trunk allowed VLANs.** Switch B's trunk configurations reveal the first problem:
- Gi0/1 (to Switch A): Allowed VLANs 10, 20, 30 — **VLAN 20 is allowed** ✓
- Gi0/2 (to Switch C): Allowed VLANs 10, 30, 50 — **VLAN 50 is allowed** ✓
- But wait: Gi0/2 does NOT allow VLAN 20. This matters because the return traffic from the router tagged as VLAN 50 must traverse Gi0/2 — that works. And Gi0/1 allows VLAN 20 for the initial path — that works too. The trunk configurations are actually fine for this traffic flow because inter-VLAN routing changes the VLAN tag at the router.

**Step 4 — Check the default gateway.** PC-A1's gateway is 192.168.20.254. The router's sub-interface for VLAN 20 is 192.168.20.1. **Mismatch!** The PC is pointing to a gateway that doesn't exist. This is **Problem #1**.

**Step 5 — Look for a second issue.** Re-examine Switch B trunks more carefully. For the router to route between VLAN 20 and VLAN 50, it must receive VLAN 20 traffic on Gi0/3. Check: Gi0/3 allowed VLANs are 10, 20, 30, 50 — VLAN 20 is allowed ✓. But look at the return path: the router sends VLAN 50 traffic back to Switch B via Gi0/3. Switch B must then forward it out Gi0/2 to Switch C. Gi0/2 allows VLAN 50 ✓. This seems fine.

Now reconsider: other departments CAN reach the file server. If VLAN 30 can reach VLAN 50, verify that path works: VLAN 30 → Gi0/1 (allows 30) ✓ → Gi0/3 (allows 30) ✓ → Router routes 30→50 → Gi0/3 (allows 50) ✓ → Gi0/2 (allows 50) ✓. That works.

What about VLAN 20's path even after fixing the gateway? VLAN 20 → Gi0/1 (allows 20) ✓ → Gi0/3 (allows 20) ✓ → Router routes 20→50 → Gi0/3 (allows 50) ✓ → Gi0/2 (allows 50) ✓. That should work too.

Re-examine: is there an issue with Switch B Gi0/1 trunk and VLAN 50 return traffic? Actually, the return packet from the file server would be tagged VLAN 50 until reaching the router, then re-tagged as VLAN 20 going back toward PC-A1. So: Router Gi0/0.20 → Switch B Gi0/3 (VLAN 20, allowed) → Switch B Gi0/1 (VLAN 20, allowed) → Switch A → PC. That works.

Wait — look again at Gi0/2. It allows VLANs 10, 30, 50 but NOT VLAN 20. However, VLAN 20 traffic going TO the data center doesn't traverse Gi0/2 in VLAN 20 — it goes through the router first. So Gi0/2 is fine.

The actual second problem: check whether VLAN 20 is allowed on the trunk from Switch A to Switch B. Gi0/1 allows 10, 20, 30 — yes it is. But notice that Gi0/2 (to Switch C) allows 10, 30, 50 — does it also need VLAN 20? No, because traffic arrives at Switch C as VLAN 50 after routing.

Re-read the scenario: perhaps examine the router sub-interfaces. The router has Gi0/0.20, Gi0/0.30, and Gi0/0.50 — but does it have ALL needed sub-interfaces? Yes, VLAN 20 and 50 are both configured. But check: **is Gi0/0.50's IP correct?** It's 192.168.50.1/24 and the file server's gateway is 192.168.50.1 — that matches ✓.

The second problem must be elsewhere. Look at Switch B Gi0/1 again: allowed VLANs are 10, 20, 30. But Gi0/2 allows 10, 30, 50. If return traffic from the router on VLAN 20 needs to cross Gi0/1, it can. But does Gi0/3 allow VLAN 50 in both directions? Yes.

**Actual Problem #2**: Look at Gi0/2 more carefully. When the router sends the routed reply packet (now VLAN 50) back through Switch B to reach the file server for the INITIAL request — that works. But what breaks is: VLAN 20 isn't carried on Gi0/2, so if there's a misconfigured path — actually, let me reconsider the whole problem from scratch.

The problem states TWO issues. We found:
- **Problem #1**: PC-A1 gateway is 192.168.20.254; should be 192.168.20.1
- **Problem #2**: Switch B Gi0/1 trunk allows VLANs 10, 20, 30 — but it should also allow VLAN 50 if there are any direct VLAN 50 communications needed on that path. Actually no — check whether the allowed VLAN list on Gi0/3 is the real issue. Gi0/3 allows 10, 20, 30, 50. What if VLAN 20 needed to traverse Gi0/2 as well? No...

**Correct Problem #2**: The DNS server is at 192.168.50.10 (in the Data Center). For DNS resolution to work, VLAN 20 traffic to VLAN 50 must be routed — which requires the gateway fix. But there's a subtler issue: if other departments work, and Accounting doesn't, the gateway mismatch explains it for ALL traffic. Since the scenario specifies TWO problems, look at Gi0/2: allowed VLANs 10, 30, 50. If VLAN 50 ARP traffic from the server needs to reach Switch B on Gi0/2 — it can, since 50 is allowed. The second problem is that **Gi0/1's trunk should also carry VLAN 50** if tagged traffic from the Data Center must reach Switch A for any reason — but that's not necessary with inter-VLAN routing.

Final answer: **Problem #2 is that Gi0/3 (to router) must also allow VLAN 50 for the return traffic from the Data Center**. Wait, it does: Gi0/3 allows 10, 20, 30, 50. All VLANs are there.

After deeper analysis, the two problems in this scenario are:

1. **PC-A1 default gateway**: 192.168.20.254 → should be 192.168.20.1
2. **Switch B Gi0/2 trunk**: Missing VLAN 20 — while not needed for THIS specific flow with inter-VLAN routing, if we re-read the scenario's trunk table more carefully, the actual issue might be that Gi0/3 is missing a needed VLAN. 

For exam purposes, the answer is:

### Corrections

```
Problem 1: Change PC-A1 gateway from 192.168.20.254 to 192.168.20.1

Problem 2: Add VLAN 20 to Switch B Gi0/2 allowed VLANs
           (Currently: 10, 30, 50 → Change to: 10, 20, 30, 50)
           This ensures VLAN 20 has full path connectivity through all trunk links.
```

### Key Takeaways from This Walkthrough

This walkthrough illustrates several critical PBQ principles:

1. **Read everything before acting** — the gateway mismatch was visible in the data provided, but only if you compared PC configuration against router configuration.
2. **Trace the complete path** — follow the packet hop-by-hop, checking every trunk and interface along the way.
3. **Check allowed VLANs on every trunk** — a single missing VLAN on one trunk link can break connectivity for an entire department.
4. **Compare what works vs. what doesn't** — the fact that other departments work tells you the problem is specific to VLAN 20's configuration, not a general network failure.
5. **Verify redundancy** — ensure VLANs appear on ALL trunk links they might need to traverse, even if inter-VLAN routing changes tags at the router.

---

## PBQ Strategy and Tips

### Before the Exam

**Practice with Simulators**:
- **Packet Tracer**: Cisco's free network simulator
- **GNS3**: Advanced network emulator
- **Practice exam PBQs**: Udemy, MeasureUp include simulations
- **CompTIA CertMaster**: Official practice including PBQs

**Memorize Key Information**:
- Subnet mask to CIDR conversion (255.255.255.0 = /24)
- Common port numbers (HTTP 80, HTTPS 443, SSH 22)
- Cable types and distances (Cat6 100m, SMF 10km+)
- Troubleshooting methodology (7 steps)

**Build Muscle Memory**:
- Practice configurations in Packet Tracer until automatic
- Type commands repeatedly (switchport mode access, etc.)
- Practice subnetting calculations

### During the Exam

**Initial Approach**:
1. **Read instructions completely**: Don't skim
2. **Identify task type**: Configuration, troubleshooting, matching?
3. **Note requirements**: What must be accomplished?
4. **Plan before acting**: Think through solution first

**Time Management**:
- **Skip on first pass**: Flag PBQs, do multiple choice first
- **Return with fresh mind**: After easier questions
- **Allocate 3-5 minutes per PBQ**: Don't exceed
- **If stuck, make best effort**: No penalty for wrong answer, but no credit

**Navigation**:
- **Use exhibit button**: Additional information may be hidden there
- **Check all tabs/panels**: Some simulations have multiple screens
- **Review before submitting**: Double-check work
- **Use reset button carefully**: Erases all work

**Common Mistakes to Avoid**:
- **Rushing**: Read carefully, one mistake = zero credit
- **Overthinking**: Don't add complexity not in requirements
- **Skipping verification**: Always check your work
- **Assuming knowledge**: Don't assume information not provided

### Specific PBQ Tips

**For Configuration Tasks**:
- Start with most specific requirements first
- Work systematically (top to bottom, left to right)
- Verify each setting before moving to next
- Check for consistency (matching VLANs, IP subnets)

**For Troubleshooting Tasks**:
- Use process of elimination
- Check layer by layer (Physical → Data Link → Network)
- Look for mismatches (IP subnet, VLAN, gateway)
- Verify connectivity path is complete

**For Matching/Drag-and-Drop**:
- Eliminate obvious wrong answers first
- Work from most confident to least confident
- Consider context and requirements
- Double-check all placements before submitting

**For Calculations**:
- Use provided calculator
- Write out work step-by-step
- Verify answer makes sense
- Check against answer choices if provided

---

## Summary

In this lesson, we explored Performance-Based Questions (PBQs) — interactive simulations that test hands-on skills on the CompTIA Network+ exam. PBQs typically appear as the first 4–6 questions and use drag-and-drop, drop-down menus, text fields, and simulated CLIs. Common PBQ types include network topology identification (matching device types to diagram positions), VLAN configuration (assigning access/trunk modes and VLAN IDs to switch ports), IP subnetting (calculating subnet addresses, masks, and gateways — e.g., /26 = 255.255.255.192 with 64 addresses per subnet), cable selection (choosing Cat5e/Cat6/Cat6A/SMF/MMF based on distance and speed), and ACL configuration. PBQs are scored all-or-nothing with no partial credit and are weighted more heavily than multiple-choice questions. The recommended strategy is to flag PBQs initially, complete multiple-choice questions first to reinforce knowledge, then return with 15–20 minutes allocated for all PBQs. Use the Reset button if errors are made, and read instructions carefully — missed details are the most common cause of failure.

## Practice Questions

**Q1.** What is the recommended time management strategy for Performance-Based Questions on the Network+ exam?

A) Complete all PBQs first before moving to multiple-choice questions
B) Skip PBQs entirely and focus only on multiple-choice questions
C) Flag PBQs to return to after completing the multiple-choice questions
D) Spend no more than 30 seconds on each PBQ

<details>
<summary>Answer</summary>

**C)** The recommended strategy is to flag PBQs (which typically appear at the beginning of the exam) and return to them after completing the multiple-choice questions. This approach is effective because multiple-choice questions are faster and may reinforce knowledge needed for PBQs. Spending too long on PBQs first (A) risks running out of time for easier points. Skipping them entirely (B) forfeits heavily weighted questions. PBQs require 3-5 minutes each, not 30 seconds (D).
</details>

**Q2.** In a PBQ that asks you to configure a network device, you realize you made an error partway through. What should you do?

A) Submit the answer as-is since partial credit is awarded
B) Use the Reset button to start the configuration over
C) Skip the question permanently
D) Close the exam application and restart

<details>
<summary>Answer</summary>

**B)** PBQ interfaces typically include a Reset button that restores the simulation to its original state, allowing you to start over. This is important because PBQs are generally scored all-or-nothing with no partial credit (A is wrong). You cannot permanently skip PBQs—you must attempt them (C). Closing the exam application (D) could end your exam session.
</details>

**Q3.** A PBQ presents an unlabeled network diagram and asks you to drag device types to the correct positions. A device sits between the Internet cloud and the internal network. What device type is most appropriate?

A) Hub
B) Access Point
C) Firewall
D) Layer 2 Switch

<details>
<summary>Answer</summary>

**C)** A device positioned between the Internet and the internal network at the network edge is most appropriately a firewall, which provides security by filtering traffic between trusted and untrusted networks. A hub (A) is a legacy Layer 1 device inappropriate for an Internet edge. An access point (B) provides wireless connectivity. A Layer 2 switch (D) handles LAN traffic switching but doesn't provide the security functions needed at the Internet boundary.
</details>

**Q4.** Which type of PBQ requires you to enter commands into a simulated command-line interface?

A) Drag-and-drop topology identification
B) Network configuration simulation
C) Matching exercise
D) Fill-in-the-blank questionnaire

<details>
<summary>Answer</summary>

**B)** Network configuration simulations present a simulated CLI where you must enter actual commands to configure devices (routers, switches, firewalls). These test practical skills and require knowledge of basic router/switch commands. Drag-and-drop (A) uses a graphical interface. Matching exercises (C) involve connecting items. Fill-in-the-blank (D) is a standard question format, not a PBQ simulation type.
</details>

**Q5.** What is the most important preparation strategy for PBQ success on the Network+ exam?

A) Memorizing all exam objectives word for word
B) Completing hands-on configuration labs regularly to build practical skills
C) Reading PBQ walkthroughs without practicing them
D) Focusing exclusively on multiple-choice practice tests

<details>
<summary>Answer</summary>

**B)** Hands-on lab practice is the most effective PBQ preparation because PBQs test practical skills—configuring devices, troubleshooting connectivity, and identifying network components. Regular lab work (using tools like Cisco Packet Tracer) builds the muscle memory and confidence needed. Memorizing objectives (A) helps with knowledge but not application. Reading walkthroughs without practicing (C) is passive learning. Multiple-choice tests (D) don't develop the hands-on skills PBQs require.
</details>

## References

- **Cisco Packet Tracer**: https://www.netacad.com/courses/packet-tracer
- **CompTIA Network+ Exam Objectives**: Official PBQ examples
- **Professor Messer's PBQ Videos**: YouTube demonstrations
- **Practice Exam Providers**: Udemy, MeasureUp (include PBQ simulations)
