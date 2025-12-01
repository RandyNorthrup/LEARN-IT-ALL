---
id: lesson-061-cloud-models
title: "Cloud Service Models (IaaS, PaaS, SaaS)"
chapterId: "chapter-007-cloud-datacenter"
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

**Cloud computing** delivers computing resources (servers, storage, databases, networking, software) over the internet on a pay-as-you-go basis. Cloud service models define the level of control, responsibility, and management between the cloud provider and customer.

This lesson covers the three primary cloud service models—**IaaS, PaaS, and SaaS**—essential knowledge for the CompTIA Network+ N10-008 exam.

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

## Key Takeaways

1. **IaaS** provides virtualized infrastructure; customer manages OS and applications
2. **PaaS** provides development platform; customer manages applications only
3. **SaaS** provides complete applications; customer manages data and access
4. **Shared responsibility model** defines provider vs customer responsibilities
5. **More abstraction = less control** but also less management overhead
6. Choose service model based on control needs, expertise, and use case
7. Organizations often use **multiple service models** for different needs

---

## References

- **CompTIA Network+ N10-008 Objective 1.8:** Summarize cloud concepts and connectivity options
- **NIST Definition of Cloud Computing** (SP 800-145)
- AWS, Azure, Google Cloud documentation
- Professor Messer: Network+ N10-008 - Cloud Models

---

**Next Lesson:** Lesson 62 - Cloud Deployment Models (Public, Private, Hybrid, Community)
