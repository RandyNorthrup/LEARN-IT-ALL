---
id: lesson-061-cloud-models
title: "Cloud Service Models (IaaS, PaaS, SaaS)"
chapterId: ch7-cloud-datacenter
order: 61
duration: 20
objectives:
  - Understand the three primary cloud service models
  - Differentiate between IaaS, PaaS, and SaaS
  - Identify appropriate use cases for each service model
  - Recognize the shared responsibility model
  - Compare on-premises vs cloud service models
---

# Cloud Service Models (IaaS, PaaS, SaaS)

## Introduction

**Cloud computing** delivers computing resources (servers, storage, databases, networking, software) over the internet on a pay-as-you-go basis. Cloud service models define the level of control, responsibility, and management between the cloud provider and customer.

This lesson covers the three primary cloud service models—**IaaS, PaaS, and SaaS**—essential knowledge for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand the three primary cloud service models
- Differentiate between IaaS, PaaS, and SaaS
- Identify appropriate use cases for each service model
- Recognize the shared responsibility model
- Compare on-premises vs cloud service models

---

## What is Cloud Computing?

### Definition

**Cloud computing** is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you access technology services from a cloud provider.

### Key Characteristics

**1. On-Demand Self-Service**
- Provision resources automatically without human interaction
- Scale up or down as needed

**2. Broad Network Access**
- Available over the network
- Accessible from various devices (laptop, phone, tablet)

**3. Resource Pooling**
- Provider's resources serve multiple customers
- Resources dynamically assigned based on demand

**4. Rapid Elasticity**
- Quickly scale resources up or down
- Appears unlimited to customer

**5. Measured Service**
- Pay only for what you use
- Usage monitored and billed accordingly

---

## Cloud Networking Fundamentals

Before diving into the service models, it's essential to understand how cloud providers deliver network connectivity—since networking underpins every cloud deployment.

### Virtual Private Cloud (VPC)

A **VPC (Virtual Private Cloud)** is a logically isolated section of the cloud provider's network that you control. Think of it as your own private datacenter within the cloud.

**VPC components:**

| Component | Purpose | Example |
|-----------|---------|--------|
| **Subnets** | Segment the VPC into IP ranges | Public subnet (10.0.1.0/24), Private subnet (10.0.2.0/24) |
| **Route Tables** | Control traffic routing between subnets | Route 0.0.0.0/0 → Internet Gateway |
| **Internet Gateway** | Connect VPC to the public internet | Allows inbound/outbound internet traffic |
| **NAT Gateway** | Allow private subnets outbound internet access | Private instances can download updates |
| **Security Groups** | Stateful firewall rules per instance | Allow TCP 443 inbound from 0.0.0.0/0 |
| **Network ACLs** | Stateless firewall rules per subnet | Deny all traffic from 192.168.1.0/24 |

**VPC architecture example:**
```
┌─────────────────────────────────────────────────┐
│                  VPC (10.0.0.0/16)              │
│                                                 │
│  ┌─────────────────┐  ┌─────────────────┐       │
│  │  Public Subnet  │  │  Private Subnet │       │
│  │  10.0.1.0/24    │  │  10.0.2.0/24    │       │
│  │                 │  │                 │       │
│  │  ┌───────────┐  │  │  ┌───────────┐  │       │
│  │  │ Web Server│  │  │  │ Database  │  │       │
│  │  │ (Public)  │  │  │  │ (Private) │  │       │
│  │  └───────────┘  │  │  └───────────┘  │       │
│  └────────┬────────┘  └────────┬────────┘       │
│           │                    │                 │
│     ┌─────▼──────┐      ┌─────▼──────┐          │
│     │  Internet  │      │    NAT     │          │
│     │  Gateway   │      │  Gateway   │          │
│     └─────┬──────┘      └────────────┘          │
└───────────┼─────────────────────────────────────┘
            │
        Internet
```

> **Exam Tip:** On the CompTIA Network+ exam, understand that a VPC is the foundational networking construct in cloud environments. Security Groups are **stateful** (return traffic automatically allowed), while Network ACLs are **stateless** (must explicitly allow return traffic).

### Cloud Connectivity Options

Organizations connect to cloud providers using several methods:

**Public Internet:**
- Standard internet connection to cloud services
- Encrypted via HTTPS/TLS
- Variable performance (shared internet)

**VPN (Virtual Private Network):**
- Encrypted tunnel over public internet
- IPsec site-to-site VPN between on-premises and cloud
- Lower cost than dedicated connections
- Latency depends on internet path

**Direct/Dedicated Connection:**
- Private, dedicated link to cloud provider
- Bypasses public internet entirely
- Consistent low latency and high bandwidth
- Examples: AWS Direct Connect, Azure ExpressRoute, Google Cloud Interconnect

```
On-Premises         Connection Type         Cloud Provider
┌──────────┐                               ┌──────────┐
│  Router  │── Public Internet (VPN) ──────│  VPC     │
│          │── Direct Connect (Private) ───│          │
│          │── SD-WAN (Hybrid) ────────────│          │
└──────────┘                               └──────────┘
```

> **Key Insight:** Direct connections (AWS Direct Connect, Azure ExpressRoute) provide **consistent network performance** with typical latencies of 1-5 ms versus 10-50 ms over public internet VPN. They are preferred for latency-sensitive workloads like database replication and real-time analytics.

---

## The Three Cloud Service Models

The cloud service models form a hierarchy of abstraction, with each model building on the previous one:

```
[SaaS] ← Highest abstraction (least control)
[PaaS]
[IaaS] ← Lowest abstraction (most control)
[On-Premises] ← Full control and responsibility
```

---

## Infrastructure as a Service (IaaS)

### What is IaaS?

**IaaS** provides virtualized computing resources over the internet. The cloud provider manages the physical infrastructure (servers, storage, networking), while customers manage the operating systems, applications, and data.

### What the Provider Manages

- **Physical hardware**: Servers, storage devices, network equipment
- **Virtualization layer**: Hypervisors, virtual machines
- **Data center**: Power, cooling, physical security
- **Network infrastructure**: Routers, switches, load balancers

### What the Customer Manages

- **Operating systems**: Windows, Linux, etc.
- **Middleware**: Runtime environments, libraries
- **Applications**: Software deployed on VMs
- **Data**: Databases, files, backups
- **Security**: OS patches, firewall rules, access control

### IaaS Examples

**Major Providers:**
- **Amazon Web Services (AWS)**: EC2 (Elastic Compute Cloud)
- **Microsoft Azure**: Virtual Machines
- **Google Cloud Platform (GCP)**: Compute Engine
- **IBM Cloud**: Virtual Servers
- **Oracle Cloud**: Compute Instances

### Use Cases for IaaS

✅ **Development and Testing**
- Quickly spin up test environments
- Avoid capital expense for dev servers

✅ **Website Hosting**
- Host websites on virtual servers
- Scale resources during traffic spikes

✅ **Storage and Backup**
- Store backups in the cloud
- Disaster recovery solutions

✅ **High-Performance Computing**
- Run compute-intensive workloads
- Pay only when needed

✅ **Lift and Shift Migration**
- Move existing apps to cloud without rewriting
- Maintain control over OS and configuration

### Advantages of IaaS

- **No capital expense**: No need to buy physical servers
- **Scalability**: Add or remove resources quickly
- **Flexibility**: Full control over OS and applications
- **Disaster recovery**: Geographic redundancy
- **Pay-as-you-go**: Only pay for resources used

### Disadvantages of IaaS

- **Management overhead**: Customer manages OS, patches, security
- **Complexity**: Requires IT expertise
- **Legacy compatibility**: May not support all legacy systems

### IaaS Network Configuration Example

A typical IaaS deployment involves configuring virtual networking alongside compute resources. Here is a conceptual example of provisioning a web server in an IaaS environment:

```
Step 1: Create Virtual Network
  - VPC CIDR: 10.0.0.0/16
  - Public Subnet: 10.0.1.0/24 (Availability Zone A)
  - Private Subnet: 10.0.2.0/24 (Availability Zone B)

Step 2: Configure Security Groups
  - Web Server SG:
    Inbound:  TCP 80  (HTTP)   from 0.0.0.0/0
    Inbound:  TCP 443 (HTTPS)  from 0.0.0.0/0
    Inbound:  TCP 22  (SSH)    from 10.0.0.0/16
    Outbound: All traffic allowed

  - Database SG:
    Inbound:  TCP 3306 (MySQL) from Web Server SG
    Outbound: All traffic allowed

Step 3: Launch Instances
  - Web Server: t3.medium, Public Subnet, Public IP
  - Database:   r5.large, Private Subnet, No Public IP

Step 4: Configure Route Tables
  - Public Subnet  → 0.0.0.0/0 via Internet Gateway
  - Private Subnet → 0.0.0.0/0 via NAT Gateway
```

> **Key Insight:** In IaaS, you are responsible for network segmentation, firewall rules, and routing—just as you would be in an on-premises datacenter. The cloud provider handles the physical switches, routers, and cabling underneath.

### IaaS Cost Model

| Cost Component | Billing Model | Example |
|---------------|---------------|----------|
| **Compute** | Per hour/second | $0.0464/hr for t3.medium |
| **Storage** | Per GB/month | $0.023/GB for standard SSD |
| **Network egress** | Per GB transferred out | $0.09/GB (first 10 TB) |
| **Network ingress** | Free | Data uploaded to cloud |
| **Public IP** | Per hour (if idle) | $0.005/hr for unused Elastic IP |

> **Exam Tip:** Cloud providers typically charge for **outbound** (egress) data transfer but not **inbound** (ingress). This is a common exam topic and an important cost consideration when designing cloud architectures.

---

## Platform as a Service (PaaS)

### What is PaaS?

**PaaS** provides a complete development and deployment environment in the cloud. The provider manages infrastructure AND the platform (OS, middleware, runtime), while customers focus on developing and managing applications.

### What the Provider Manages

- **Everything in IaaS** (hardware, virtualization, networking)
- **Operating systems**: Managed and patched by provider
- **Middleware**: Application servers, runtimes
- **Development tools**: IDEs, version control, CI/CD
- **Database management systems**: Managed databases

### What the Customer Manages

- **Applications**: Custom code and logic
- **Data**: Application data
- **User access**: Authentication and authorization

### PaaS Examples

**Major Providers:**
- **AWS**: Elastic Beanstalk, Lambda (serverless)
- **Microsoft Azure**: App Service, Azure Functions
- **Google Cloud**: App Engine, Cloud Functions
- **Heroku**: Application hosting platform
- **Salesforce Platform**: Force.com

### Use Cases for PaaS

✅ **Application Development**
- Focus on code, not infrastructure
- Built-in development tools and frameworks

✅ **API Development and Management**
- Create and deploy REST APIs
- Built-in API gateways

✅ **Business Analytics and Intelligence**
- Analyze data without managing databases
- Built-in analytics tools

✅ **Rapid Prototyping**
- Quickly test ideas
- Minimal setup time

✅ **Microservices Architecture**
- Deploy containerized applications
- Orchestration managed by provider

### Advantages of PaaS

- **Faster development**: Pre-configured environments
- **Reduced complexity**: No OS/middleware management
- **Built-in scalability**: Platform handles scaling
- **Focus on code**: Developers focus on application logic
- **Collaboration**: Teams work on same platform

### Disadvantages of PaaS

- **Less control**: Limited OS and runtime customization
- **Vendor lock-in**: Apps may depend on provider-specific features
- **Migration challenges**: Difficult to move between platforms

---

## Software as a Service (SaaS)

### What is SaaS?

**SaaS** delivers fully functional applications over the internet. The provider manages everything—infrastructure, platform, AND application. Customers simply use the software via a web browser or app.

### What the Provider Manages

- **Everything in IaaS and PaaS**
- **Application software**: Complete application
- **Application updates**: Patches and upgrades
- **Security**: Application-level security
- **Availability**: Uptime and performance

### What the Customer Manages

- **User access**: Who can use the application
- **User data**: Data entered into application
- **Configuration**: Application settings and preferences

### SaaS Examples

**Business Applications:**
- **Microsoft 365**: Word, Excel, Outlook (email, productivity)
- **Google Workspace**: Gmail, Docs, Sheets
- **Salesforce**: CRM (Customer Relationship Management)
- **Slack**: Team collaboration
- **Zoom**: Video conferencing
- **Dropbox**: File storage and sharing
- **QuickBooks Online**: Accounting software

### Use Cases for SaaS

✅ **Email and Collaboration**
- Microsoft 365, Google Workspace
- No email server management

✅ **Customer Relationship Management (CRM)**
- Salesforce, HubSpot
- Track customer interactions

✅ **Project Management**
- Asana, Trello, Monday.com
- Manage tasks and projects

✅ **Human Resources**
- Workday, BambooHR
- Employee management, payroll

✅ **Accounting and Finance**
- QuickBooks Online, Xero
- Financial management without software installation

### Advantages of SaaS

- **No installation**: Access via web browser
- **Automatic updates**: Provider handles patches and upgrades
- **Accessibility**: Access from anywhere with internet
- **Lower cost**: Subscription-based pricing
- **Minimal IT overhead**: No servers to manage

### Disadvantages of SaaS

- **Limited customization**: Standardized features
- **Data security concerns**: Data stored by third party
- **Internet dependency**: Requires reliable internet connection
- **Vendor lock-in**: Difficult to switch providers

---

## Emerging "as a Service" Models (XaaS)

Beyond the three core models, cloud computing has spawned many specialized service models. These are collectively known as **XaaS (Anything as a Service)**.

### FaaS (Function as a Service) / Serverless

**FaaS** allows developers to run individual functions without managing servers or containers. The provider automatically scales, and you pay only for execution time.

**Characteristics:**
- Code runs in response to events (HTTP request, database change, file upload)
- Scales to zero when idle (no cost when not executing)
- Execution limited (typically 15-minute maximum runtime)
- Stateless (no persistence between invocations)

**Examples:**
- AWS Lambda
- Azure Functions
- Google Cloud Functions

**FaaS pricing example:**
```
AWS Lambda Pricing:
  - First 1 million requests/month: FREE
  - After: $0.20 per 1 million requests
  - Compute: $0.0000166667 per GB-second

Example: 10 million requests, 128 MB memory, 200 ms avg:
  Cost = ~$2.08/month
  (vs. running an EC2 instance 24/7: ~$33/month)
```

### DaaS (Desktop as a Service)

**DaaS** provides virtual desktops hosted in the cloud, accessible from any device.

**Examples:**
- Amazon WorkSpaces
- Azure Virtual Desktop (AVD)
- Citrix Cloud

**Use case:** Remote workers who need a consistent desktop environment with centralized data security and IT management.

### DBaaS (Database as a Service)

**DBaaS** provides managed database instances where the provider handles patching, backups, scaling, and high availability.

**Examples:**
- Amazon RDS, Aurora
- Azure SQL Database
- Google Cloud SQL

### SECaaS (Security as a Service)

**SECaaS** delivers security services from the cloud, including email filtering, SIEM, vulnerability scanning, and identity management.

**Examples:**
- Cloudflare (DDoS protection, WAF)
- CrowdStrike (endpoint protection)
- Okta (identity management)

### XaaS Comparison Table

| Model | What's Provided | Customer Manages | Example |
|-------|----------------|-------------------|----------|
| **FaaS** | Serverless functions | Code only | AWS Lambda |
| **DaaS** | Virtual desktops | User profiles, apps | Amazon WorkSpaces |
| **DBaaS** | Managed databases | Schema, queries, data | Amazon RDS |
| **SECaaS** | Security tools | Policy configuration | Cloudflare |
| **NaaS** | Network infrastructure | Network policies | Cisco Meraki |
| **STaaS** | Storage | Data, access control | AWS S3 |

> **Exam Tip:** The CompTIA Network+ exam may reference XaaS models beyond the core three. Focus on understanding the **shared responsibility boundary** for each—what the provider manages vs. what the customer manages.

---

## Comparison of Service Models

| Aspect | IaaS | PaaS | SaaS |
|--------|------|------|------|
| **Control** | High (OS, apps) | Medium (apps only) | Low (config only) |
| **Responsibility** | Customer manages most | Shared management | Provider manages all |
| **Flexibility** | Very flexible | Moderate | Limited |
| **Complexity** | High | Medium | Low |
| **Use Case** | Infrastructure hosting | App development | End-user applications |
| **Target User** | IT admins, DevOps | Developers | End users, business |
| **Examples** | AWS EC2, Azure VMs | AWS Lambda, Heroku | Microsoft 365, Salesforce |

---

## The Shared Responsibility Model

The **shared responsibility model** defines which security and management tasks are handled by the cloud provider vs the customer.

### On-Premises (Customer Manages Everything)

```
[Applications]      ← Customer
[Data]              ← Customer
[Runtime]           ← Customer
[Middleware]        ← Customer
[Operating System]  ← Customer
[Virtualization]    ← Customer
[Servers]           ← Customer
[Storage]           ← Customer
[Networking]        ← Customer
[Physical Security] ← Customer
```

### IaaS Responsibility

```
[Applications]      ← Customer
[Data]              ← Customer
[Runtime]           ← Customer
[Middleware]        ← Customer
[Operating System]  ← Customer
[Virtualization]    ← Provider
[Servers]           ← Provider
[Storage]           ← Provider
[Networking]        ← Provider
[Physical Security] ← Provider
```

### PaaS Responsibility

```
[Applications]      ← Customer
[Data]              ← Customer
[Runtime]           ← Provider
[Middleware]        ← Provider
[Operating System]  ← Provider
[Virtualization]    ← Provider
[Servers]           ← Provider
[Storage]           ← Provider
[Networking]        ← Provider
[Physical Security] ← Provider
```

### SaaS Responsibility

```
[Applications]      ← Provider
[Data]              ← Customer (data input)
[Runtime]           ← Provider
[Middleware]        ← Provider
[Operating System]  ← Provider
[Virtualization]    ← Provider
[Servers]           ← Provider
[Storage]           ← Provider
[Networking]        ← Provider
[Physical Security] ← Provider
```

**Key Insight:** As you move up the stack (IaaS → PaaS → SaaS), the provider takes on more responsibility, and the customer has less control but also less management burden.

### Security Responsibilities in Detail

Understanding what you must secure at each level is critical for the exam and for real-world cloud deployments:

| Security Domain | On-Prem | IaaS | PaaS | SaaS |
|----------------|---------|------|------|------|
| **Physical security** | Customer | Provider | Provider | Provider |
| **Network security** | Customer | Shared | Provider | Provider |
| **OS patching** | Customer | Customer | Provider | Provider |
| **Application security** | Customer | Customer | Customer | Provider |
| **Data encryption** | Customer | Customer | Customer | Shared |
| **Identity/Access** | Customer | Customer | Customer | Customer |
| **Data classification** | Customer | Customer | Customer | Customer |

> **Key Insight:** Regardless of service model, the customer is **always** responsible for their own **data classification**, **user access management**, and **compliance requirements**. "You can outsource operations, but you cannot outsource accountability."

### Multicloud and Hybrid Strategies

Most enterprises don't use a single cloud provider or a single service model. Common strategies include:

**Multicloud:**
- Using multiple cloud providers simultaneously
- Example: AWS for compute, Azure for Active Directory, Google Cloud for AI/ML
- Avoids vendor lock-in but increases complexity

**Hybrid Cloud:**
- Combination of on-premises infrastructure and cloud services
- Example: Sensitive data on-premises, web applications in cloud
- Connected via VPN or dedicated link (Direct Connect/ExpressRoute)

```
┌──────────────────────────────────────────────────┐
│              Hybrid Cloud Architecture           │
│                                                  │
│  On-Premises           Cloud (IaaS/PaaS/SaaS)   │
│  ┌──────────┐          ┌──────────┐              │
│  │ Database │◀── VPN ──│ Web App  │              │
│  │ (PII)    │  or DC   │ (Public) │              │
│  └──────────┘          └──────────┘              │
│  ┌──────────┐          ┌──────────┐              │
│  │ File     │◀── Sync──│ Backup   │              │
│  │ Server   │          │ (S3/Blob)│              │
│  └──────────┘          └──────────┘              │
└──────────────────────────────────────────────────┘
```

---

## Choosing the Right Service Model

### When to Use IaaS

- Need full control over operating system
- Running legacy applications
- Custom security requirements
- Specific compliance needs
- Lift-and-shift migrations

### When to Use PaaS

- Developing cloud-native applications
- Need rapid development and deployment
- Want to avoid OS management
- Building APIs and microservices
- Using serverless architectures

### When to Use SaaS

- Need ready-to-use software
- Want minimal IT involvement
- Require access from multiple devices
- Prefer subscription pricing
- Don't need customization

---

## Real-World Scenarios

**Scenario 1: Startup Building a Mobile App**

**Requirements:**
- Develop iOS/Android app with backend API
- Fast time to market
- Limited IT staff

**Solution:** **PaaS**
- Use AWS Lambda or Google Cloud Functions for backend
- Focus on app development, not infrastructure
- Auto-scaling handles traffic growth

---

**Scenario 2: Enterprise Running ERP System**

**Requirements:**
- Migrate on-premises ERP to cloud
- Maintain control over OS and configuration
- Specific security and compliance requirements

**Solution:** **IaaS**
- Use Azure Virtual Machines or AWS EC2
- Full control over OS and ERP installation
- Customize security configurations

---

**Scenario 3: Small Business Email and Collaboration**

**Requirements:**
- Email, calendar, document sharing
- No IT staff
- Accessible from anywhere

**Solution:** **SaaS**
- Use Microsoft 365 or Google Workspace
- No server management required
- Automatic updates and backups

---

## Summary

1. **IaaS** provides virtualized infrastructure; customer manages OS and applications
2. **PaaS** provides development platform; customer manages applications only
3. **SaaS** provides complete applications; customer manages data and access
4. **Shared responsibility model** defines provider vs customer responsibilities
5. **More abstraction = less control** but also less management overhead
6. Choose service model based on control needs, expertise, and use case
7. Organizations often use **multiple service models** for different needs

---

## Practice Questions

**Q1.** Which cloud service model provides the customer with the MOST control over the operating system and installed applications?

A) SaaS
B) PaaS
C) IaaS
D) FaaS

<details>
<summary>Answer</summary>

**C)** IaaS (Infrastructure as a Service) provides virtualized infrastructure where the customer manages the operating system, middleware, and applications. The provider manages only the physical hardware and hypervisor.
</details>

**Q2.** A company uses a cloud-based email service where all software, updates, and maintenance are handled by the provider. Which cloud service model does this describe?

A) IaaS
B) PaaS
C) DaaS
D) SaaS

<details>
<summary>Answer</summary>

**D)** SaaS (Software as a Service) provides fully managed applications like email, CRM, or office suites. The customer only manages data and user access.
</details>

**Q3.** A development team needs a cloud environment that provides runtime, middleware, and development tools so they can focus solely on writing application code. Which service model should they choose?

A) IaaS
B) PaaS
C) SaaS
D) DaaS

<details>
<summary>Answer</summary>

**B)** PaaS (Platform as a Service) provides the development platform including runtime, middleware, and tools. The customer manages only the application code and data.
</details>

**Q4.** In the shared responsibility model, which component is ALWAYS the responsibility of the cloud provider regardless of the service model?

A) Application security
B) Operating system patching
C) Physical datacenter security
D) Data encryption

<details>
<summary>Answer</summary>

**C)** Physical datacenter security (power, cooling, physical access) is always the cloud provider's responsibility across all service models (IaaS, PaaS, and SaaS).
</details>

**Q5.** Which cloud service model gives the customer the LEAST amount of management responsibility?

A) IaaS
B) PaaS
C) SaaS
D) On-premises

<details>
<summary>Answer</summary>

**C)** SaaS requires the least management from the customer. The provider handles everything from infrastructure to application maintenance. The customer only manages data and access.
</details>

**Q6.** A company deploys virtual machines in the cloud and installs its own database software on them. Which service model is being used?

A) SaaS
B) PaaS
C) IaaS
D) DBaaS

<details>
<summary>Answer</summary>

**C)** IaaS provides virtualized computing resources (VMs, storage, networking). Installing custom software on cloud VMs is a hallmark of IaaS usage.
</details>

**Q7.** Which statement BEST describes the relationship between cloud service models and abstraction?

A) More abstraction provides more customer control
B) Less abstraction reduces management overhead
C) More abstraction means less customer control but less management overhead
D) Abstraction level does not affect control or management

<details>
<summary>Answer</summary>

**C)** As abstraction increases from IaaS to PaaS to SaaS, the customer gives up control over infrastructure components but gains reduced management overhead since the provider handles more.
</details>

**Q8.** Which of the following is an example of PaaS?

A) Microsoft 365
B) Amazon EC2
C) Google App Engine
D) Dropbox

<details>
<summary>Answer</summary>

**C)** Google App Engine is a PaaS offering that provides a platform for developing and hosting web applications. Amazon EC2 is IaaS, and Microsoft 365 and Dropbox are SaaS.
</details>

**Q9.** Which cloud computing characteristic allows resources to be rapidly scaled up or down to match demand, appearing virtually unlimited to the customer?

A) Measured service
B) Broad network access
C) Rapid elasticity
D) Resource pooling

<details>
<summary>Answer</summary>

**C)** Rapid elasticity allows cloud resources to be quickly provisioned and released to scale with demand, appearing essentially unlimited. Measured service refers to pay-per-use billing, broad network access means availability over the network, and resource pooling means the provider's resources serve multiple tenants.
</details>

**Q10.** A company runs individual functions in the cloud that execute only when triggered by an event, and pays only for the compute time consumed during execution. Which service model is this?

A) IaaS
B) PaaS
C) SaaS
D) FaaS (Function as a Service)

<details>
<summary>Answer</summary>

**D)** FaaS (Function as a Service), also known as serverless computing, runs individual functions in response to events and charges only for execution time. Examples include AWS Lambda and Azure Functions. Unlike IaaS or PaaS, the customer manages only the function code—no servers, OS, or runtime configuration.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.8:** Summarize cloud concepts and connectivity options
- **NIST Definition of Cloud Computing** (SP 800-145)
- AWS, Azure, Google Cloud documentation
- Professor Messer: Network+ N10-009 - Cloud Models

---

**Next Lesson:** Lesson 62 - Cloud Deployment Models (Public, Private, Hybrid, Community)
