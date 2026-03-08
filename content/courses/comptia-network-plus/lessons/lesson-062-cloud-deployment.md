---
id: lesson-062-cloud-deployment
title: "Cloud Deployment Models (Public, Private, Hybrid, Community)"
chapterId: ch7-cloud-datacenter
order: 62
duration: 20
objectives:
  - Understand the four cloud deployment models
  - Compare public, private, hybrid, and community clouds
  - Identify advantages and disadvantages of each model
  - Recognize appropriate use cases for each deployment model
  - Understand multi-cloud strategies
---

# Cloud Deployment Models (Public, Private, Hybrid, Community)

## Introduction

**Cloud deployment models** define where cloud infrastructure is located, who owns it, and who can access it. The deployment model determines security, control, cost, and scalability characteristics of the cloud environment.

This lesson covers the four primary cloud deployment models—**public, private, hybrid, and community clouds**—essential for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand the four cloud deployment models
- Compare public, private, hybrid, and community clouds
- Identify advantages and disadvantages of each model
- Recognize appropriate use cases for each deployment model
- Understand multi-cloud strategies

---

## Overview of Deployment Models

Cloud deployment models describe the **ownership**, **location**, and **access** of cloud infrastructure:

| Model | Ownership | Location | Access |
|-------|-----------|----------|--------|
| **Public** | Cloud provider | Provider's datacenter | General public (multi-tenant) |
| **Private** | Organization or provider | On-premises or hosted | Single organization |
| **Hybrid** | Mixed | Both on-prem and provider | Organization |
| **Community** | Shared among orgs | Shared facility | Specific community |

---

## Public Cloud

### What is Public Cloud?

**Public cloud** services are owned and operated by third-party cloud providers who deliver computing resources (servers, storage, applications) over the public internet to multiple customers (multi-tenancy).

### Characteristics

**Multi-Tenancy:**
- Multiple customers (tenants) share same physical infrastructure
- Logical isolation between tenants
- Resources pooled and dynamically allocated

**Ownership:**
- Provider owns and manages all infrastructure
- Customers rent resources on-demand

**Access:**
- Available to general public over internet
- Anyone can purchase services

**Location:**
- Provider's geographically distributed datacenters
- Customer doesn't control physical location (can choose region)

### Public Cloud Providers

**Major Providers:**
- **Amazon Web Services (AWS)**
- **Microsoft Azure**
- **Google Cloud Platform (GCP)**
- **IBM Cloud**
- **Oracle Cloud Infrastructure (OCI)**
- **Alibaba Cloud**

### Advantages of Public Cloud

✅ **No Capital Expense**
- No upfront hardware costs
- Pay-as-you-go model

✅ **Scalability**
- Virtually unlimited resources
- Scale up or down instantly

✅ **High Availability**
- Provider ensures uptime (99.9%+ SLAs)
- Geographic redundancy

✅ **No Maintenance**
- Provider handles hardware maintenance
- Automatic updates and patches

✅ **Global Reach**
- Deploy applications worldwide
- Low-latency access for global users

✅ **Elasticity**
- Automatically adjust resources based on demand
- Handle traffic spikes without overprovisioning

### Disadvantages of Public Cloud

❌ **Limited Control**
- Cannot customize physical infrastructure
- Dependent on provider's capabilities

❌ **Security Concerns**
- Data stored on shared infrastructure
- Compliance requirements may prohibit public cloud

❌ **Internet Dependency**
- Requires reliable internet connection
- Latency for on-premises users

❌ **Potential for Noisy Neighbors**
- Other tenants' workloads may impact performance
- (Mitigated by provider isolation techniques)

❌ **Data Sovereignty**
- Data may reside in different countries
- Regulatory compliance challenges

### Use Cases for Public Cloud

- **Startups and small businesses**: Low initial cost
- **Development and testing**: Temporary environments
- **Web applications**: Scalable hosting
- **Big data analytics**: Process large datasets
- **Disaster recovery**: Off-site backup storage

---

## Private Cloud

### What is Private Cloud?

**Private cloud** infrastructure is dedicated to a single organization. It can be hosted on-premises in the organization's own datacenter or hosted by a third-party provider, but resources are NOT shared with other organizations.

### Characteristics

**Single-Tenancy:**
- Dedicated resources for one organization
- No sharing with other companies

**Ownership:**
- Organization owns (on-premises) or leases dedicated infrastructure
- Full control over configuration

**Access:**
- Accessible only to authorized users within organization
- Can be accessed remotely via VPN

**Location:**
- **On-premises**: Organization's own datacenter
- **Hosted**: Provider's datacenter (dedicated hardware)

### Types of Private Cloud

**1. On-Premises Private Cloud**
- Infrastructure in organization's datacenter
- Organization owns and manages everything
- Example: VMware vSphere environment

**2. Hosted Private Cloud**
- Dedicated infrastructure at provider's datacenter
- Provider manages physical hardware
- Customer manages VMs and applications
- Example: AWS Outposts, Azure Stack

### Advantages of Private Cloud

✅ **Enhanced Security**
- Dedicated resources, no multi-tenancy
- Full control over security policies

✅ **Compliance**
- Meets regulatory requirements (HIPAA, PCI-DSS)
- Data residency control

✅ **Customization**
- Tailor infrastructure to specific needs
- Custom networking and security configurations

✅ **Performance**
- Predictable performance (no noisy neighbors)
- Dedicated bandwidth

✅ **Legacy Support**
- Integrate with existing on-premises systems
- Support legacy applications

### Disadvantages of Private Cloud

❌ **High Capital Expense**
- Must purchase hardware upfront
- Significant initial investment

❌ **Limited Scalability**
- Scaling requires purchasing more hardware
- Capacity planning required

❌ **Maintenance Burden**
- Organization responsible for maintenance
- Requires IT staff and expertise

❌ **Longer Deployment Time**
- Procurement and setup take weeks/months
- Not as rapid as public cloud

❌ **Geographic Limitations**
- Limited to organization's datacenter locations
- Difficult to achieve global distribution

### Use Cases for Private Cloud

- **Financial institutions**: High security and compliance
- **Healthcare**: HIPAA compliance requirements
- **Government**: Data sovereignty and security
- **Large enterprises**: Predictable, high-performance workloads
- **Organizations with existing datacenters**: Leverage current investments

---

## Hybrid Cloud

### What is Hybrid Cloud?

**Hybrid cloud** combines public and private cloud environments, allowing data and applications to move between them. Organizations use on-premises private cloud for sensitive workloads and public cloud for less sensitive, scalable workloads.

### Characteristics

**Mixed Infrastructure:**
- Public cloud + private cloud (or on-premises)
- Integrated via network connections

**Data and Application Portability:**
- Workloads can move between environments
- "Cloud bursting" to public cloud during peak demand

**Unified Management:**
- Single pane of glass to manage both environments
- Consistent policies across clouds

### Hybrid Cloud Architectures

**Example 1: On-Premises + Public Cloud**
```
[On-Premises Datacenter]   <--- VPN/Direct Connect --->   [AWS Public Cloud]
  - Sensitive data                                           - Web servers
  - Core databases                                           - Development/test
  - Legacy applications                                      - Analytics workloads
```

**Example 2: Private Cloud + Public Cloud**
```
[Hosted Private Cloud]   <--- Interconnect --->   [Azure Public Cloud]
  - Production databases                             - Application servers
  - Regulated workloads                              - Disaster recovery
```

### Advantages of Hybrid Cloud

✅ **Flexibility**
- Use right cloud for each workload
- Balance cost, security, and performance

✅ **Cost Optimization**
- Keep sensitive data private (higher cost)
- Use public cloud for variable workloads (lower cost)

✅ **Scalability with Control**
- Scale into public cloud when needed
- Maintain control over critical systems

✅ **Disaster Recovery**
- Replicate to public cloud for DR
- Lower DR costs than second datacenter

✅ **Compliance**
- Keep regulated data in private cloud
- Use public cloud for non-regulated workloads

✅ **Cloud Bursting**
- Handle traffic spikes by temporarily using public cloud
- Return to private cloud when demand decreases

### Disadvantages of Hybrid Cloud

❌ **Complexity**
- Managing two environments
- Integration challenges

❌ **Networking Challenges**
- Requires reliable, high-bandwidth connections
- VPN or dedicated connections (AWS Direct Connect, Azure ExpressRoute)

❌ **Security Considerations**
- Data moving between clouds
- Consistent security policies required

❌ **Cost Management**
- Tracking costs across multiple platforms
- Unexpected data transfer charges

❌ **Skillset Requirements**
- Staff must understand both environments
- More training needed

### Hybrid Cloud Connectivity Options

**1. VPN (Virtual Private Network)**
- Encrypted tunnel over internet
- Lower cost, moderate performance
- Suitable for non-critical workloads

**2. Direct Connect / ExpressRoute**
- Dedicated private connection
- Higher cost, high performance
- Low latency, predictable bandwidth
- Examples: AWS Direct Connect, Azure ExpressRoute

**3. SD-WAN**
- Software-defined WAN
- Optimize traffic routing between sites
- Combines multiple connections

### Use Cases for Hybrid Cloud

- **Gradual cloud migration**: Move workloads over time
- **Cloud bursting**: Handle peak demand
- **Disaster recovery**: Replicate to cloud for DR
- **Development in cloud, production on-premises**: Test in public cloud, deploy to private
- **Compliance with flexibility**: Regulated data private, other data public

---

## Community Cloud

### What is Community Cloud?

**Community cloud** infrastructure is shared among several organizations with common concerns (security, compliance, jurisdiction). It may be managed by organizations or a third-party provider.

### Characteristics

**Shared Among Similar Organizations:**
- Multiple organizations with shared goals
- Common compliance or security requirements

**Ownership:**
- Jointly owned by community members OR
- Managed by third-party provider

**Access:**
- Limited to community members only
- Not available to general public

### Examples of Community Cloud

**Healthcare:**
- Hospitals sharing HIPAA-compliant cloud
- Medical research institutions

**Government:**
- Federal agencies sharing secure cloud
- Example: AWS GovCloud, Azure Government

**Education:**
- Universities sharing research cloud
- K-12 schools sharing educational platforms

**Financial Services:**
- Banks sharing financial transaction processing
- Compliance with financial regulations

### Advantages of Community Cloud

✅ **Cost Sharing**
- Lower cost than private cloud (shared among organizations)
- More affordable than each org building own cloud

✅ **Compliance**
- Built to meet specific regulatory requirements
- Shared compliance certifications

✅ **Security**
- Higher security than public cloud
- Trusted community members

✅ **Collaboration**
- Easier data sharing among community members
- Common platforms and standards

### Disadvantages of Community Cloud

❌ **Limited Availability**
- Not as widely available as public cloud
- Fewer providers

❌ **Shared Resources**
- Still multi-tenant (within community)
- Potential performance impacts

❌ **Governance Challenges**
- Coordinating among multiple organizations
- Agreeing on policies and changes

❌ **Less Flexibility**
- Constrained by community requirements
- May not fit all members' needs perfectly

### Use Cases for Community Cloud

- **Government agencies**: Shared secure infrastructure
- **Healthcare networks**: HIPAA-compliant shared resources
- **Research institutions**: Collaborative research platforms
- **Financial services**: Shared compliance infrastructure

---

## Multi-Cloud Strategy

### What is Multi-Cloud?

**Multi-cloud** uses services from multiple public cloud providers simultaneously (e.g., AWS + Azure + GCP) to avoid vendor lock-in and leverage best-of-breed services.

**Not the same as hybrid cloud:**
- **Hybrid**: Private + public
- **Multi-cloud**: Multiple public clouds

### Advantages of Multi-Cloud

✅ **Avoid Vendor Lock-In**
- Not dependent on single provider
- Easier to negotiate pricing

✅ **Best-of-Breed**
- Use AWS for compute, Google for AI/ML, Azure for Microsoft integration
- Choose best service from each provider

✅ **Geographic Coverage**
- Use provider with datacenters in required regions
- Compliance with data residency laws

✅ **Redundancy**
- If one provider fails, workloads failover to another
- Higher availability

### Disadvantages of Multi-Cloud

❌ **Complexity**
- Managing multiple providers
- Different APIs, tools, billing

❌ **Higher Costs**
- Data transfer between clouds expensive
- Less volume discounts

❌ **Skillset Requirements**
- Staff must learn multiple platforms
- Increased training costs

---

## Cloud Migration Strategies (The 6 R's)

When organizations move workloads to the cloud, they use one or more **migration strategies** known as the **6 R's**. Understanding these strategies is essential for planning effective cloud deployments.

### The 6 R's of Cloud Migration

| Strategy | Description | Effort | Risk | Best For |
|----------|-------------|--------|------|----------|
| **Rehost** (Lift and Shift) | Move as-is to cloud VMs | Low | Low | Quick migration, legacy apps |
| **Replatform** (Lift and Reshape) | Minor optimizations during migration | Medium | Low-Med | Apps that benefit from managed services |
| **Repurchase** (Drop and Shop) | Replace with SaaS product | Low | Medium | CRM, email, HR systems |
| **Refactor** (Re-architect) | Redesign for cloud-native | High | High | Apps needing cloud scalability |
| **Retire** | Decommission unused applications | Low | Low | Redundant or obsolete systems |
| **Retain** (Revisit) | Keep on-premises for now | None | Low | Regulated or recently upgraded apps |

**Migration Strategy Decision Flow:**
```
Start: Assess Application
  │
  ├─ No longer needed? → RETIRE
  │
  ├─ SaaS replacement available? → REPURCHASE
  │
  ├─ Regulatory/compliance block? → RETAIN
  │
  ├─ Needs cloud-native features? → REFACTOR
  │
  ├─ Minor tweaks improve it? → REPLATFORM
  │
  └─ Just move it quickly? → REHOST
```

**Real-World Examples:**
```
Rehost:   Move on-prem VMware VMs to AWS EC2 instances
Replatform: Move MySQL on VM to AWS RDS (managed database)
Repurchase: Replace on-prem Exchange with Microsoft 365
Refactor:  Rewrite monolithic app as microservices on Kubernetes
Retire:    Shut down legacy reporting tool nobody uses
Retain:    Keep mainframe banking app on-premises (for now)
```

---

## Cloud Landing Zone Concepts

A **landing zone** is a pre-configured, secure cloud environment that provides the foundation for migrating workloads. Think of it as the "prepared infrastructure" that follows organizational best practices before any applications are deployed.

### Landing Zone Components

```
Cloud Landing Zone Architecture:
┌─────────────────────────────────────────────────┐
│                Landing Zone                      │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │ Identity &  │  │ Network     │  │ Logging & │  │
│  │ Access Mgmt │  │ Topology    │  │ Monitoring│  │
│  └─────────────┘  └─────────────┘  └───────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │ Security    │  │ Governance  │  │ Cost Mgmt │  │
│  │ Policies    │  │ & Guardrails│  │ & Billing │  │
│  └─────────────┘  └─────────────┘  └───────────┘  │
└─────────────────────────────────────────────────┘

Key Elements:
  • Account structure (multi-account strategy)
  • VPC/VNet design with proper CIDR planning
  • IAM roles and security baselines
  • Centralized logging (CloudTrail, Azure Monitor)
  • Network connectivity (VPN, Direct Connect)
  • Compliance guardrails (SCPs, Azure Policy)
  • Cost controls and budgets
```

---

## Cloud-Native Design Patterns

Cloud-native applications are designed specifically to take advantage of cloud computing characteristics. These patterns differ significantly from traditional on-premises application design.

### Key Cloud-Native Patterns

| Pattern | Description | Benefit |
|---------|-------------|---------|
| **Microservices** | Break application into small, independent services | Independent scaling and deployment |
| **Containerization** | Package app with dependencies in containers | Consistency across environments |
| **Serverless** | Run code without managing servers | Zero idle cost, automatic scaling |
| **Event-driven** | Services communicate via events/messages | Loose coupling, better resilience |
| **Auto-scaling** | Automatically adjust resources to demand | Cost optimization, performance |
| **Infrastructure as Code** | Define infrastructure in version-controlled files | Reproducibility, audit trail |

---

## Multi-Cloud vs Hybrid Cloud Comparison

| Aspect | Multi-Cloud | Hybrid Cloud |
|--------|-------------|---------------|
| **Definition** | Multiple public cloud providers | Public cloud + private/on-prem |
| **Example** | AWS + Azure + GCP | AWS + on-premises datacenter |
| **Primary Goal** | Avoid vendor lock-in, best-of-breed | Balance security/control with scale |
| **Data Location** | Across multiple public clouds | Split between on-prem and cloud |
| **Complexity** | Very high (multiple APIs, tools) | High (two different environments) |
| **Cost** | Potentially higher (less volume discount) | Medium (optimize per workload) |
| **Compliance** | Challenging (multiple providers) | Easier (sensitive data stays private) |
| **Networking** | Cloud-to-cloud interconnects | VPN/Direct Connect to cloud |
| **Skills Needed** | Expertise in multiple platforms | Cloud + on-prem expertise |
| **Redundancy** | Excellent (provider-level failover) | Good (environment-level failover) |

**Can You Have Both?**
```
Yes! Many enterprises use multi-cloud AND hybrid strategies:

  On-Premises              AWS                 Azure
  ┌─────────────┐    ┌───────────┐    ┌───────────┐
  │ Databases   │<--->│ Web Apps  │    │ AI/ML     │
  │ Legacy Apps │    │ Storage   │    │ Office365 │
  │ Compliance  │    │ Lambda    │    │ DevOps    │
  └─────────────┘    └───────────┘    └───────────┘
       │                   │               │
       └─────────────────┴───────────────┘
         Hybrid (on-prem + cloud)
           + Multi-cloud (AWS + Azure)
```

---

## Comparison of Deployment Models

| Aspect | Public | Private | Hybrid | Community |
|--------|--------|---------|--------|-----------|
| **Cost** | Low (pay-as-you-go) | High (upfront + maintenance) | Medium | Medium (shared cost) |
| **Scalability** | Very high | Limited | High | Medium |
| **Security** | Standard | High | High (for private portion) | High |
| **Control** | Low | High | Medium | Medium |
| **Compliance** | May be limited | Full compliance | Flexible | Community-specific |
| **Maintenance** | Provider | Customer | Mixed | Shared/Provider |
| **Use Case** | General workloads | Sensitive/regulated | Mixed requirements | Shared compliance needs |

---

## Summary

1. **Public cloud** offers low cost and high scalability but limited control
2. **Private cloud** provides security and control but higher cost
3. **Hybrid cloud** combines benefits of both, enabling flexible workload placement
4. **Community cloud** serves organizations with shared compliance or security needs
5. **Multi-cloud** uses multiple public cloud providers to avoid lock-in
6. Choose deployment model based on **security**, **compliance**, **cost**, and **scalability** requirements
7. Most enterprises use **hybrid or multi-cloud** strategies

---

## Practice Questions

**Q1.** A healthcare organization wants to keep patient data on its own infrastructure while using cloud resources for its public website. Which cloud deployment model BEST fits this scenario?

A) Public cloud
B) Private cloud
C) Hybrid cloud
D) Community cloud

<details>
<summary>Answer</summary>

**C)** Hybrid cloud combines private cloud (for sensitive patient data) with public cloud (for the website), allowing organizations to place workloads based on security and compliance requirements.
</details>

**Q2.** Which cloud deployment model provides the HIGHEST level of scalability at the LOWEST cost?

A) Private cloud
B) Public cloud
C) Community cloud
D) Hybrid cloud

<details>
<summary>Answer</summary>

**B)** Public cloud offers the highest scalability and lowest cost because resources are shared among many tenants, leveraging economies of scale.
</details>

**Q3.** Several government agencies share a cloud infrastructure that meets their common regulatory compliance requirements. Which deployment model does this describe?

A) Public cloud
B) Private cloud
C) Hybrid cloud
D) Community cloud

<details>
<summary>Answer</summary>

**D)** Community cloud is shared among organizations with common concerns such as regulatory compliance, security requirements, or mission objectives.
</details>

**Q4.** An organization uses AWS for compute, Azure for AI services, and Google Cloud for big data analytics. Which strategy does this describe?

A) Hybrid cloud
B) Multi-cloud
C) Community cloud
D) Private cloud

<details>
<summary>Answer</summary>

**B)** Multi-cloud uses multiple public cloud providers to avoid vendor lock-in, leverage best-of-breed services, and improve redundancy.
</details>

**Q5.** Which cloud deployment model gives the organization the MOST control over security and customization?

A) Public cloud
B) Private cloud
C) Hybrid cloud
D) Community cloud

<details>
<summary>Answer</summary>

**B)** Private cloud provides the most control since the infrastructure is dedicated to a single organization, allowing full customization of security, networking, and compute resources.
</details>

**Q6.** A company normally runs all workloads on-premises but uses public cloud resources during peak shopping seasons to handle increased traffic. What is this technique called?

A) Multi-cloud
B) Cloud bursting
C) Cloud-native
D) Community cloud

<details>
<summary>Answer</summary>

**B)** Cloud bursting is a hybrid cloud technique where workloads "burst" from private infrastructure to public cloud during periods of high demand, then return to private when demand decreases.
</details>

**Q7.** What is the PRIMARY disadvantage of a private cloud compared to a public cloud?

A) Less security
B) Higher cost
C) Less customization
D) More vendor lock-in

<details>
<summary>Answer</summary>

**B)** Private cloud has higher capital and operational costs because the organization must purchase, maintain, and manage its own infrastructure rather than sharing costs with other tenants.
</details>

**Q8.** Which factor is MOST important when choosing between public and private cloud deployment?

A) Internet bandwidth
B) Number of users
C) Data sensitivity and compliance requirements
D) Programming language

<details>
<summary>Answer</summary>

**C)** Data sensitivity and compliance requirements are the most important factors. Highly regulated data (healthcare, financial) may require private cloud, while less sensitive workloads can use public cloud.
</details>

**Q9.** What is the PRIMARY risk of a multi-cloud strategy that uses services from several different cloud providers simultaneously?

A) Reduced redundancy
B) Increased management complexity and the need for staff skilled in multiple platforms
C) Inability to meet compliance requirements
D) Loss of internet connectivity

<details>
<summary>Answer</summary>

**B)** Multi-cloud increases management complexity because each provider has different APIs, billing, tooling, and security models. Staff must be trained across multiple platforms. However, multi-cloud improves redundancy (not reduces it), and compliance can still be met with proper configuration.
</details>

**Q10.** An organization is migrating to the cloud and decides to replace its on-premises CRM software with Salesforce. Which cloud migration strategy (from the 6 R's) does this represent?

A) Rehost
B) Replatform
C) Repurchase
D) Refactor

<details>
<summary>Answer</summary>

**C)** Repurchase (also called "Drop and Shop") involves replacing an existing application with a cloud-based SaaS product such as Salesforce. Rehost moves the app as-is, replatform makes minor optimizations, and refactor redesigns the application for cloud-native architecture.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.8:** Summarize cloud concepts and connectivity options
- **NIST SP 800-145:** The NIST Definition of Cloud Computing
- AWS, Azure, Google Cloud documentation
- Professor Messer: Network+ N10-009 - Cloud Deployment Models

---

**Next Lesson:** Lesson 63 - Virtualization Technologies (Hypervisors, VMs, Containers)
