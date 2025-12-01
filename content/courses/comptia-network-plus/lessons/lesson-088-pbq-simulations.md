---
id: "lesson-088"
title: "Performance-Based Questions (PBQ) Preparation"
chapterId: "chapter-10"
order: 88
duration: 20
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

**Solution**: **D. 172.16.40.0/22**

**Analysis**:
```
Destination: 172.16.45.100

Check each route:
172.16.0.0/16:    172.16.0.0 - 172.16.255.255   ✓ Match (but less specific)
172.16.32.0/19:   172.16.32.0 - 172.16.63.255   ✓ Match
172.16.40.0/22:   172.16.40.0 - 172.16.43.255   ✗ Does NOT include 172.16.45.100

Wait, recalculate /22:
172.16.40.0/22 = 172.16.40.0 - 172.16.43.255 (1024 addresses)

Actually, 172.16.45.100 is NOT in 172.16.40.0/22

Check /19:
172.16.32.0/19 = 172.16.32.0 - 172.16.63.255 ✓ Includes 172.16.45.100

Most specific match: 172.16.32.0/19
```

**Correct Answer**: **C. 172.16.32.0/19**

**Routing Principles**:
- **Longest prefix match**: Most specific route wins
- **/22 is more specific than /19**
- **/19 is more specific than /16**
- Calculate range to verify destination falls within subnet

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

## Practice Scenarios

### Practice Scenario 1: Switch Configuration

**Task**: Configure switch for new office deployment.

**Requirements**:
```
- Create VLAN 10 (Employees) and VLAN 20 (Guest)
- Ports Fa0/1-10: VLAN 10
- Ports Fa0/11-15: VLAN 20
- Port Gi0/1: Trunk to router (allow VLANs 10, 20)
- Port Gi0/2: Trunk to another switch (allow all VLANs)
```

**Solution Commands** (if CLI):
```cisco
! Create VLANs
vlan 10
  name Employees
vlan 20
  name Guest

! Configure access ports
interface range fa0/1-10
  switchport mode access
  switchport access vlan 10

interface range fa0/11-15
  switchport mode access
  switchport access vlan 20

! Configure trunk to router
interface gi0/1
  switchport mode trunk
  switchport trunk allowed vlan 10,20

! Configure trunk to switch
interface gi0/2
  switchport mode trunk
  switchport trunk allowed vlan all
```

### Practice Scenario 2: IP Address Assignment

**Task**: Assign IP addresses based on subnetting.

**Given**: Network 10.1.0.0/22, divide into 4 equal subnets.

**Solution**:
```
/22 = 1024 addresses
Divided by 4 = 256 addresses each
New mask: /24 (255.255.255.0)

Subnet 1: 10.1.0.0/24    (10.1.0.0 - 10.1.0.255)
Subnet 2: 10.1.1.0/24    (10.1.1.0 - 10.1.1.255)
Subnet 3: 10.1.2.0/24    (10.1.2.0 - 10.1.2.255)
Subnet 4: 10.1.3.0/24    (10.1.3.0 - 10.1.3.255)

Device Assignments:
Router (Subnet 1 gateway): 10.1.0.1/24
PC1 (Subnet 1): 10.1.0.10/24, GW 10.1.0.1
Server (Subnet 2): 10.1.1.50/24, GW 10.1.1.1
```

### Practice Scenario 3: Troubleshooting

**Scenario**: User cannot ping external website.

**Given Information**:
```
PC Configuration:
IP: 192.168.1.100/24
Subnet: 255.255.255.0
Gateway: 192.168.1.1
DNS: 8.8.8.8

Test Results:
- ping 192.168.1.100 (self): Success
- ping 192.168.1.1 (gateway): Success
- ping 8.8.8.8 (Google DNS): Fail
- ping google.com: Fail (cannot resolve)
```

**Identify the problem**:
A. IP address misconfigured
B. Subnet mask incorrect
C. Default gateway not working
D. DNS server not responding
E. Router or firewall blocking outbound traffic

**Solution**: **E. Router or firewall blocking outbound traffic**

**Analysis**:
- Ping self works: IP config correct
- Ping gateway works: Local network operational, gateway reachable
- Ping external IP fails: Issue is beyond gateway
- Cannot be DNS (DNS failure would allow ping by IP)
- **Conclusion**: Router or firewall blocking outbound traffic

---

## Summary

**PBQ Characteristics**:
- Interactive simulations requiring hands-on skills
- Appear at beginning of exam (questions 1-6 typically)
- Worth more points than multiple choice
- All-or-nothing scoring (no partial credit)
- Can skip and return later (recommended strategy)

**Common PBQ Types**:
1. **Network topology identification**: Drag devices to diagram
2. **VLAN configuration**: Assign ports to VLANs, configure trunks
3. **IP configuration**: Subnet networks, assign addresses
4. **Cable selection**: Choose appropriate cable for scenarios
5. **ACL configuration**: Create access control rules
6. **Troubleshooting**: Identify misconfigurations
7. **Routing analysis**: Interpret routing tables

**Success Strategies**:
- **Practice beforehand**: Use Packet Tracer, practice exams with PBQs
- **Skip initially**: Complete multiple choice first, return to PBQs
- **Read carefully**: Instructions contain critical requirements
- **Plan before acting**: Think through solution first
- **Verify work**: Double-check before submitting
- **Allocate time**: 3-5 minutes per PBQ, 15-20 minutes total

**Key Skills to Master**:
- VLAN configuration (access and trunk ports)
- IP addressing and subnetting
- Basic router/switch commands
- Troubleshooting methodology
- Cable selection criteria
- ACL rule ordering

**Practice Makes Perfect**:
- Set up home lab (virtual or physical)
- Complete 10+ configuration labs before exam
- Take practice exams with PBQ simulations
- Time yourself during practice (simulate exam pressure)

PBQs test your ability to apply knowledge in practical scenarios. With adequate hands-on practice and strategic time management, you can confidently tackle PBQs and significantly improve your exam score.

---

## Additional References

- **Cisco Packet Tracer**: https://www.netacad.com/courses/packet-tracer
- **CompTIA Network+ Exam Objectives**: Official PBQ examples
- **Professor Messer's PBQ Videos**: YouTube demonstrations
- **Practice Exam Providers**: Udemy, MeasureUp (include PBQ simulations)
