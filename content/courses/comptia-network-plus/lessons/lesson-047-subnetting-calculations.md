---
id: lesson-047-subnetting-calculations
title: "Subnetting Calculations and Practice"
sidebar_label: "Lesson 47: Subnetting Calculations"
description: "Master binary subnetting methods, subnet calculations, and advanced problem-solving techniques"
duration: 90
objectives:
  - Perform binary subnetting calculations accurately
  - Apply multiple subnetting methods for efficiency
  - Calculate subnet requirements from host counts
  - Solve complex subnetting problems quickly
  - Design optimal subnet schemes
  - Troubleshoot subnet configuration issues
---

# Lesson 47: Subnetting Calculations and Practice

## Introduction

While understanding subnetting concepts is essential, mastering the calculations is what separates competent network engineers from beginners. This lesson focuses on practical calculation methods, speed techniques, and problem-solving strategies that you'll use daily in network design and troubleshooting.

We'll work through numerous examples, building your calculation speed and accuracy to professional levels.

**Key Principle:** Practice makes perfect - subnetting becomes intuitive with repetition.

## Binary Subnetting Method

### Complete Binary Approach

**Why Learn Binary Method?**
```
Advantages:
✓ Most accurate (no guessing)
✓ Works for any subnet size
✓ Helps understand routing
✓ Required for troubleshooting
✓ Foundation for all shortcuts

When to Use:
- Complex subnetting problems
- When exact precision needed
- Verifying shortcut calculations
- Understanding why things work
```

**Step-by-Step Binary Process:**
```
Problem: Subnet 192.168.10.0/24 into 8 equal subnets

Step 1: Determine bits needed for subnets
  Formula: 2^n >= required subnets
  2^3 = 8 subnets ✓
  Need to borrow 3 bits from host portion

Step 2: Calculate new prefix length
  Original: /24
  Borrowed: +3 bits
  New: /27

Step 3: Draw the subnet mask
  Original /24: 11111111.11111111.11111111.00000000
  New /27:      11111111.11111111.11111111.11100000
                                            ^^^
                                            Borrowed bits

Step 4: Convert last octet to decimal
  11100000 = 128 + 64 + 32 = 224
  Subnet mask: 255.255.255.224

Step 5: Calculate block size
  256 - 224 = 32
  Each subnet spans 32 addresses

Step 6: List all subnets
  Binary (last octet):
  00000000 = 0   → 192.168.10.0/27   (0-31)
  00100000 = 32  → 192.168.10.32/27  (32-63)
  01000000 = 64  → 192.168.10.64/27  (64-95)
  01100000 = 96  → 192.168.10.96/27  (96-127)
  10000000 = 128 → 192.168.10.128/27 (128-159)
  10100000 = 160 → 192.168.10.160/27 (160-191)
  11000000 = 192 → 192.168.10.192/27 (192-223)
  11100000 = 224 → 192.168.10.224/27 (224-255)

Step 7: Calculate usable hosts per subnet
  Host bits: 32 - 27 = 5 bits
  Hosts: 2^5 - 2 = 30 usable hosts per subnet
```

### Binary Subnet Exercise

**Problem: 172.16.0.0/16 → Need 1000 subnets**

```
Solution:

1. Bits needed for 1000 subnets:
   2^9 = 512   (not enough)
   2^10 = 1024 (sufficient) ✓
   Need 10 bits

2. New prefix: /16 + 10 = /26

3. Binary breakdown:
   Original: 11111111.11111111.00000000.00000000 (/16)
   New:      11111111.11111111.11111111.11000000 (/26)
                                 ^^^^^^^^ ^^
                                 8 bits + 2 bits = 10 borrowed

4. Subnet mask:
   First 16 bits: 255.255
   Next 8 bits:   255 (11111111)
   Last 2 bits:   192 (11000000)
   Result: 255.255.255.192

5. Verification:
   Total subnets: 2^10 = 1,024 subnets ✓
   Hosts per subnet: 2^6 - 2 = 62 usable hosts
   Block size: 256 - 192 = 64

6. First few subnets:
   172.16.0.0/26     (0-63)
   172.16.0.64/26    (64-127)
   172.16.0.128/26   (128-191)
   172.16.0.192/26   (192-255)
   172.16.1.0/26     (next octet!)
   ...
   172.16.255.192/26 (last subnet)
```

## The Seven-Second Subnetting Method

### Speed Calculation Technique

**For Exam and Real-World Speed:**

**Quick Reference Chart (Memorize!):**
```
Prefix  Mask Value  Block Size  Subnets  Hosts
/25     128        128         2        126
/26     192        64          4        62
/27     224        32          8        30
/28     240        16          16       14
/29     248        8           32       6
/30     252        4           64       2

Pattern Recognition:
- Block size HALVES as prefix increases
- Hosts = Block size - 2
- Subnets DOUBLE as prefix increases
```

**Seven-Second Process:**
```
Problem: What subnet does 192.168.1.78/27 belong to?

Step 1: Recognize /27 → Block size 32 (instant recall)

Step 2: Divide IP by block size
  78 ÷ 32 = 2 remainder 14
  IP is in the 3rd subnet (0, 32, 64, 96...)
                              ^
                              2nd boundary

Step 3: Multiply subnet number by block size
  2 × 32 = 64

Answer: 192.168.1.64/27 (completed in ~7 seconds)

Verification:
  Range: 64-95
  78 is within range ✓
```

**Alternative Method: Nearest Multiple:**
```
Problem: 10.50.35.100/22 - Find network address

/22 breakdown:
  8 + 8 + 6 bits = 22
  Third octet has the action

Mask in third octet: 6 bits on = 11111100 = 252
Block size: 256 - 252 = 4

Find nearest multiple of 4 below 35:
  32 (next would be 36, too high)

Answer: 10.50.32.0/22

Full range:
  Network: 10.50.32.0
  Broadcast: 10.50.35.255
  Usable: 10.50.32.1 - 10.50.35.254
```

## Working Backwards from Requirements

### Hosts-to-Prefix Conversion

**Problem Type 1: Given host count, find subnet**

```
Requirement: Need subnet for 500 hosts

Step 1: Add network and broadcast addresses
  500 + 2 = 502 total addresses needed

Step 2: Find next power of 2
  2^8 = 256   (too small)
  2^9 = 512   (sufficient) ✓

Step 3: Host bits = 9, so prefix = 32 - 9 = /23

Step 4: Calculate details
  Subnet mask: 255.255.254.0
  Block size: 256 - 254 = 2
  Usable hosts: 512 - 2 = 510 ✓
  
Answer: /23 subnet provides 510 usable hosts
```

**Problem Type 2: Multiple subnet requirements**

```
Given: 192.168.100.0/24
Requirements:
  - 3 subnets with 50 hosts each
  - 2 subnets with 25 hosts each
  - 5 subnets with 10 hosts each

Solution Process:

1. Sort by size (largest first):
   50 hosts → /26 (62 hosts)
   25 hosts → /27 (30 hosts)
   10 hosts → /28 (14 hosts)

2. Allocate in order:

   Subnet A (50): 192.168.100.0/26   (0-63)
   Subnet B (50): 192.168.100.64/26  (64-127)
   Subnet C (50): 192.168.100.128/26 (128-191)
   
   Subnet D (25): 192.168.100.192/27 (192-223)
   Subnet E (25): 192.168.100.224/27 (224-255)
   
   Problem! No space left for /28 subnets
   
3. Recalculate with better planning:
   
   50 hosts × 3 = Need at least 156 addresses
   25 hosts × 2 = Need at least 54 addresses
   10 hosts × 5 = Need at least 55 addresses
   Total: ~265 addresses (exceeds /24!)

4. Reality check:
   /24 provides 254 usable hosts
   Requirements exceed capacity
   
   Options:
   a) Request additional /24 network
   b) Reduce number of subnets
   c) Use larger starting block (/23)

Lesson: Always verify total capacity!
```

### Subnets-to-Prefix Conversion

**Problem: How many subnets from 10.0.0.0/22?**

```
Step 1: Identify the interesting octet
  /22 = 8 + 8 + 6 + 0
  Third octet has 6 network bits

Step 2: Calculate
  Original Class A has /8
  Borrowed: 22 - 8 = 14 bits
  Subnets: 2^14 = 16,384 possible /22 subnets

Step 3: From single /22, how many can we create?
  If breaking 10.0.0.0/22 into /24s:
  Borrowed: 24 - 22 = 2 bits
  Subnets: 2^2 = 4 subnets
  
  Results:
  10.0.0.0/24
  10.0.1.0/24
  10.0.2.0/24
  10.0.3.0/24
```

## Advanced Calculation Scenarios

### Scenario 1: Variable Subnet Sizes

**VLSM Preview Problem:**

```
Network: 172.20.0.0/16
Departments with requirements:

Engineering: 4000 hosts
Sales: 2000 hosts
Marketing: 1000 hosts
HR: 500 hosts
IT: 200 hosts
Management: 50 hosts

Solution:

Engineering (4000 hosts):
  Need: 4000 + 2 = 4002
  2^12 = 4096 ✓
  Prefix: /20 (32 - 12 = 20)
  Subnet: 172.20.0.0/20
  Range: 172.20.0.0 - 172.20.15.255

Sales (2000 hosts):
  Need: 2002
  2^11 = 2048 ✓
  Prefix: /21
  Subnet: 172.20.16.0/21
  Range: 172.20.16.0 - 172.20.23.255

Marketing (1000 hosts):
  Need: 1002
  2^10 = 1024 ✓
  Prefix: /22
  Subnet: 172.20.24.0/22
  Range: 172.20.24.0 - 172.20.27.255

HR (500 hosts):
  Need: 502
  2^9 = 512 ✓
  Prefix: /23
  Subnet: 172.20.28.0/23
  Range: 172.20.28.0 - 172.20.29.255

IT (200 hosts):
  Need: 202
  2^8 = 256 ✓
  Prefix: /24
  Subnet: 172.20.30.0/24
  Range: 172.20.30.0 - 172.20.30.255

Management (50 hosts):
  Need: 52
  2^6 = 64 ✓
  Prefix: /26
  Subnet: 172.20.31.0/26
  Range: 172.20.31.0 - 172.20.31.63

Summary:
  Total used: 172.20.0.0 - 172.20.31.63
  Remaining: 172.20.31.64 - 172.20.255.255
  Efficient allocation with room for growth
```

### Scenario 2: Subnet Verification

**Is this configuration valid?**

```
Given:
  Host IP: 10.5.47.200
  Subnet Mask: 255.255.240.0
  Gateway: 10.5.32.1

Question: Is the gateway in the same subnet?

Solution:

1. Determine prefix length:
   255.255.240.0
   Third octet: 240 = 11110000 (4 bits)
   Prefix: 8 + 8 + 4 = /20

2. Find block size:
   256 - 240 = 16

3. Find host's subnet:
   47 ÷ 16 = 2 remainder 15
   Nearest multiple of 16 below 47: 32
   Host subnet: 10.5.32.0/20
   Range: 10.5.32.0 - 10.5.47.255

4. Check gateway:
   Gateway: 10.5.32.1
   Is 32.1 within 32.0 - 47.255? YES ✓

Answer: Configuration is VALID
Gateway and host are in same subnet
```

**Invalid Configuration Example:**

```
Given:
  Host IP: 192.168.10.50
  Subnet Mask: 255.255.255.224 (/27)
  Gateway: 192.168.10.65

Verification:

1. Block size: 256 - 224 = 32

2. Host's subnet:
   50 ÷ 32 = 1 remainder 18
   Subnet: 192.168.10.32/27
   Range: 32-63

3. Gateway's subnet:
   65 ÷ 32 = 2 remainder 1
   Subnet: 192.168.10.64/27
   Range: 64-95

4. Result:
   Host: 192.168.10.32/27 (32-63)
   Gateway: 192.168.10.64/27 (64-95)
   DIFFERENT SUBNETS! ❌

Problem: Gateway unreachable (different broadcast domain)
Solution: Change gateway to 192.168.10.33-62 range
```

### Scenario 3: Summarization Preview

**Route Summarization Calculation:**

```
Need to summarize these routes:
  192.168.16.0/24
  192.168.17.0/24
  192.168.18.0/24
  192.168.19.0/24

Binary analysis:

192.168.16.0 = ...00010000.00000000
192.168.17.0 = ...00010001.00000000
192.168.18.0 = ...00010010.00000000
192.168.19.0 = ...00010011.00000000
                  ^^^^^^
                  Common bits

Common prefix through bit 21:
  11000000.10101000.00010[000.00000000]
  
Summary route: 192.168.16.0/21

Verification:
  /21 range: 192.168.16.0 - 192.168.23.255
  Covers all four /24 networks ✓
  Efficient routing table entry
```

## Troubleshooting with Subnetting

### Common Configuration Errors

**Error 1: Duplicate IP Addresses**

```
Symptom: Two hosts with same IP

Analysis:
  Host A: 10.1.1.50/24 on VLAN 10
  Host B: 10.1.1.50/25 on VLAN 20

Are they actually duplicates?

Host A subnet: 10.1.1.0/24 (0-255)
Host B subnet: 10.1.1.0/25 (0-127)

Same IP, different subnet masks:
- If in same broadcast domain: CONFLICT ❌
- If in different VLANs: Technically OK but BAD PRACTICE

Best Practice: Never reuse IPs even across subnets
Risk of misrouting and confusion
```

**Error 2: Incorrect Subnet Mask**

```
Host cannot reach gateway

Configuration:
  Host IP: 192.168.1.100
  Host Mask: 255.255.255.0 (/24)
  Gateway: 192.168.1.129
  Gateway Mask: 255.255.255.128 (/25)

Problem Analysis:

Host thinks:
  "I'm in 192.168.1.0/24 (0-255)"
  "Gateway 192.168.1.129 is in my subnet"
  "I'll ARP for gateway" → ARP fails
  
Gateway thinks:
  "I'm in 192.168.1.128/25 (128-255)"
  "Host 192.168.1.100 is in different subnet (0-127)"
  "Need to route to reach host"

Result: Asymmetric routing, communication fails

Solution: Match subnet masks!
  Option A: Both use /24
  Option B: Both use /25 (may need to move IPs)
```

**Error 3: Gateway Outside Subnet**

```
Configuration:
  Host: 172.16.5.10/24
  Gateway: 172.16.6.1

Problem:
  Host subnet: 172.16.5.0 - 172.16.5.255
  Gateway: 172.16.6.1 (different subnet!)

Host behavior:
  1. Host needs to send packet outside subnet
  2. Looks up default gateway: 172.16.6.1
  3. Realizes gateway is not in local subnet
  4. Cannot ARP for gateway MAC address
  5. Communication FAILS ❌

Solution: Gateway MUST be in same subnet as host
  Correct gateway: 172.16.5.1 - 172.16.5.254
```

## Subnetting Practice Problems

### Problem Set 1: Basic Calculations

**Problem 1:**
```
Given: 192.168.50.0/24
Create 8 equal subnets
Find: New subnet mask and first 3 subnets

Solution:
Bits needed: 2^3 = 8 → 3 bits
New prefix: /24 + 3 = /27
Mask: 255.255.255.224
Block size: 32

Subnets:
1. 192.168.50.0/27   (0-31)
2. 192.168.50.32/27  (32-63)
3. 192.168.50.64/27  (64-95)
```

**Problem 2:**
```
Given: 10.100.0.0/16
Need: Subnets with 1000 hosts each
Find: How many subnets can you create?

Solution:
Hosts needed: 1000 + 2 = 1002
Next power of 2: 2^10 = 1024
Host bits: 10
Prefix for each: /22 (32 - 10)

From /16 to /22:
Borrowed bits: 22 - 16 = 6
Subnets: 2^6 = 64 subnets ✓

Each /22 subnet:
  Block size: 1024 addresses
  Usable hosts: 1022
  
Answer: 64 subnets of 1022 hosts each
```

**Problem 3:**
```
What subnet does 172.25.143.201/19 belong to?

Solution:
/19 = 8 + 8 + 3
Third octet: 3 bits on = 11100000 = 224
Block size: 256 - 224 = 32

143 ÷ 32 = 4 remainder 15
4 × 32 = 128

Network: 172.25.128.0/19
Broadcast: 172.25.159.255
Range: 172.25.128.0 - 172.25.159.255

Answer: 172.25.128.0/19
```

### Problem Set 2: Advanced Scenarios

**Problem 4:**
```
Design subnet scheme:
Network: 10.20.0.0/22
Departments:
  A: 300 hosts
  B: 150 hosts
  C: 100 hosts
  D: 50 hosts

Solution:

Dept A: 300 hosts → /23 (510 hosts)
  10.20.0.0/23 (10.20.0.0 - 10.20.1.255)

Dept B: 150 hosts → /24 (254 hosts)
  10.20.2.0/24 (10.20.2.0 - 10.20.2.255)

Dept C: 100 hosts → /25 (126 hosts)
  10.20.3.0/25 (10.20.3.0 - 10.20.3.127)

Dept D: 50 hosts → /26 (62 hosts)
  10.20.3.128/26 (10.20.3.128 - 10.20.3.191)

Remaining: 10.20.3.192 - 10.20.3.255
```

**Problem 5:**
```
Troubleshoot:
Host A: 192.168.75.45/26 cannot ping Host B: 192.168.75.82/26

Analysis:

Host A:
  Block size: 64
  45 ÷ 64 = 0 remainder 45
  Subnet: 192.168.75.0/26 (0-63)

Host B:
  82 ÷ 64 = 1 remainder 18
  Subnet: 192.168.75.64/26 (64-127)

Finding: Different subnets!
Host A: 0-63
Host B: 64-127

Hosts are in different broadcast domains
Need router between them to communicate

Solution options:
1. Move Host B to 192.168.75.0/26 subnet
2. Configure routing between subnets
3. Change to /25 subnet to include both hosts
```

### Problem Set 3: Speed Drills

**Quick Fire (30 seconds each):**

```
1. /28 = how many hosts?
   Answer: 14 (2^4 - 2)

2. 255.255.255.240 = what prefix?
   Answer: /28

3. /25 block size?
   Answer: 128

4. How many /27 subnets in a /24?
   Answer: 8 (2^3)

5. What subnet: 10.5.5.77/29?
   Answer: 10.5.5.72/29 (block size 8, 77÷8=9r5, 9×8=72)

6. Broadcast address of 172.16.40.0/22?
   Answer: 172.16.43.255 (block size 4, range 40-43)

7. First usable IP of 192.168.1.96/27?
   Answer: 192.168.1.97

8. Last usable IP of 192.168.1.96/27?
   Answer: 192.168.1.126 (broadcast is 127)
```

## Subnetting Shortcuts and Tricks

### The Chart Method

**Create Your Own Reference:**
```
For /24 subnetting:

Prefix  Mask  Block  Subnets  Hosts
/25     128   128    2        126
/26     192   64     4        62
/27     224   32     8        30
/28     240   16     16       14
/29     248   8      32       6
/30     252   4      64       2

Memorization tip: "Big Block Bobby Has 30 Friends"
B=Block B=Big B=Bobby H=Has 30=Thirty F=Friends
128-64-32-16-8-4-2 (powers of 2 backwards)
```

### The Increment Trick

**Finding Subnet Boundaries Fast:**
```
Given: Need to find 10th subnet of 192.168.1.0/26

Block size: 64
Shortcut: 10 × 64 = 640

640 > 255, so it wraps:
640 - 256 = 384
384 - 256 = 128

But we're counting from 0:
Subnets 0-3 in .0
Subnets 4-7 in .1
Subnets 8-11 in .2

10th subnet (index 9): 192.168.2.128/26

Verification: Count up
0,64,128,192 (octet .0) = subnets 0-3
0,64,128,192 (octet .1) = subnets 4-7
0,64,128,192 (octet .2) = subnets 8-11
         ^^^
         This is subnet #10 (index 9) ✓
```

## Summary

This lesson provided intensive practice with:

**Calculation Methods:**
- Complete binary approach for accuracy
- Seven-second speed method for efficiency
- Working backwards from requirements
- Verification and troubleshooting techniques

**Key Skills Developed:**
- Binary subnet mask calculations
- Quick subnet identification
- Host count to prefix conversion
- Subnet design for multiple requirements
- Configuration validation

**Problem-Solving Strategies:**
- Allocate largest subnets first
- Verify total capacity before designing
- Use consistent calculation methods
- Double-check gateway configurations
- Practice speed drills regularly

**Best Practices:**
- Memorize powers of 2 (2^1 through 2^16)
- Keep a quick reference chart handy
- Verify calculations with binary method
- Plan for 30-50% growth
- Document your subnet design

**Next Steps:**
- Continue practicing daily
- Work through timed exercises
- Learn VLSM for complex scenarios
- Study route summarization
- Apply to real network designs

## Additional Resources

- **Subnetting Practice**: SubnettingPractice.com
- **Calculators**: ipcalc, sipcalc (for verification)
- **CompTIA Network+ N10-008**: Domain 1.4 - Subnetting
- **RFC 1878**: Variable Length Subnet Table
- **Practice Apps**: Subnetting trainer mobile apps

## Challenge Problems

**Expert Level:**

1. Given 172.16.0.0/12, create a subnet scheme for 50 branch offices with 500 hosts each. Show first 3 allocations.

2. Summarize these networks into the smallest possible CIDR block:
   - 10.64.0.0/18
   - 10.64.64.0/18
   - 10.64.128.0/18
   - 10.64.192.0/18

3. Troubleshoot: Host at 192.168.100.75/28 with gateway 192.168.100.65 cannot reach internet. Why?

4. Design VLSM scheme for 10.0.0.0/16 with departments needing 8000, 4000, 2000, 1000, 500, 250, 125, and 60 hosts.

5. How many usable /26 subnets can you create from 172.20.0.0/19 while leaving room for one /22 management network?

**Work through these independently, then verify with binary method!**
