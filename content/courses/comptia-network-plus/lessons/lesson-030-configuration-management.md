---
id: configuration-management
title: Configuration Management and Automation
chapterId: ch3-network-operations
order: 30
duration: 90
objectives:
  - Implement configuration management systems
  - Use version control for network configs
  - Automate network tasks with Ansible and Python
  - Apply Infrastructure as Code principles
  - Follow automation best practices
---

# Lesson 30: Configuration Management and Automation

## Introduction

Configuration management is the practice of systematically managing, organizing, and controlling changes to network device configurations throughout their lifecycle. Modern network environments require automation to scale effectively, reduce human error, ensure consistency, and accelerate deployment. This lesson covers configuration management principles, version control systems, automation tools (Ansible, Python), Infrastructure as Code (IaC), and best practices for automated network operations.

## Configuration Management Fundamentals

### Why Configuration Management Matters

**Business Drivers:**
- **Consistency:** Ensure all devices follow standards
- **Compliance:** Prove configurations meet requirements
- **Disaster Recovery:** Rapidly restore lost configurations
- **Change Tracking:** Know what changed, when, and by whom
- **Rollback:** Quickly revert problematic changes

**Statistics:**
- 80% of network outages caused by human configuration errors
- Manual configuration 10x slower than automated
- Configuration drift leads to security vulnerabilities
- Untracked changes complicate troubleshooting

### Configuration Lifecycle

```
1. Design → Create baseline configuration templates
2. Deploy → Apply configurations to devices
3. Monitor → Track configuration drift
4. Update → Apply approved changes
5. Audit → Verify compliance with standards
6. Backup → Store configurations securely
7. Restore → Recover from failures
```

## Version Control for Network Configurations

### Why Version Control?

**Benefits:**
- Track every configuration change over time
- Identify who made changes and why
- Compare configurations (current vs. previous)
- Rollback to any previous version
- Collaborate on configuration changes
- Audit trail for compliance

### Git for Network Configurations

**Git Basics:**
```bash
# Initialize Git repository
cd /var/network-configs
git init
git config user.name "Network Team"
git config user.email "network@company.com"

# Add configurations
git add Core-SW-01.cfg
git add Core-SW-02.cfg
git commit -m "Initial commit - baseline configs"

# After changes
git add Core-SW-01.cfg
git commit -m "Added VLAN 40 for Marketing department"

# View history
git log --oneline
git log --follow Core-SW-01.cfg  # History of single file

# Compare versions
git diff HEAD~1 Core-SW-01.cfg  # Current vs. previous
git diff v1.0 v2.0 Core-SW-01.cfg  # Between tags

# Revert to previous version
git checkout HEAD~1 Core-SW-01.cfg
```

**Git Branching for Network Changes:**
```bash
# Create branch for change
git checkout -b vlan-40-marketing
# Make changes to configs
git add .
git commit -m "Add VLAN 40 for Marketing"

# Review and test in lab
# If successful, merge to main
git checkout main
git merge vlan-40-marketing

# If unsuccessful, discard branch
git branch -D vlan-40-marketing
```

**Git Workflow for Network Team:**
```
main (production configs)
  ├── dev (development/testing)
  ├── feature/new-datacenter
  ├── feature/security-hardening
  └── hotfix/emergency-patch

Process:
1. Create feature branch from main
2. Make configuration changes
3. Test in lab environment
4. Peer review (pull request)
5. Merge to main after approval
6. Deploy to production
7. Tag release (v1.2.3)
```

### Configuration Management Tools

#### RANCID (Really Awesome New Cisco confIg Differ)

**Purpose:** Automated configuration backup and change detection

**Features:**
- Polls devices regularly (via telnet/SSH)
- Detects configuration changes
- Emails diffs to administrators
- Stores configs in CVS/SVN/Git

**Installation (Linux):**
```bash
# Install RANCID
sudo apt-get install rancid

# Configure RANCID
cd /var/lib/rancid
sudo -u rancid bin/rancid-cvs
```

**Configuration (`/etc/rancid/rancid.conf`):**
```bash
LIST_OF_GROUPS="production"
CVSROOT=/var/lib/rancid/CVS
RCSSYS=git  # Use Git instead of CVS

FILTER_PWDS=YES  # Remove passwords from configs
NOCOMMSTR=YES  # Remove SNMP community strings
```

**Router Database (`/var/lib/rancid/production/router.db`):**
```
Core-SW-01:cisco:up
Core-SW-02:cisco:up
Core-R-01:cisco:up
Dist-SW-01:cisco:up
```

**Cron Job (Automated Backups):**
```bash
# /etc/cron.d/rancid
# Run every hour
0 * * * * rancid /var/lib/rancid/bin/rancid-run
```

#### Oxidized (Modern RANCID Alternative)

**Advantages:**
- Web interface
- RESTful API
- Git integration (native)
- Supports 130+ device types

**Installation (Docker):**
```bash
docker run -d -p 8888:8888 \
  -v /etc/oxidized:/root/.config/oxidized \
  -v /var/lib/oxidized:/var/lib/oxidized \
  oxidized/oxidized:latest
```

**Configuration (`/etc/oxidized/config`):**
```yaml
---
username: admin
password: admin123
model: ios
interval: 3600  # Backup every hour
use_syslog: false
debug: false
threads: 30
timeout: 20
retries: 3

input:
  default: ssh
  debug: false
  ssh:
    secure: false

output:
  default: git
  git:
    user: Oxidized
    email: oxidized@company.com
    repo: "/var/lib/oxidized/configs.git"

source:
  default: csv
  csv:
    file: "/var/lib/oxidized/router.db"
    delimiter: !ruby/regexp /:/
    map:
      name: 0
      model: 1
      username: 2
      password: 3

hooks:
  email_diff:
    type: exec
    events: [post_store]
    cmd: 'mail -s "Config Change: $OX_NODE_NAME" network@company.com < $OX_NODE_MSG'
```

**Router Database (`/var/lib/oxidized/router.db`):**
```
Core-SW-01:ios:admin:password
Core-SW-02:ios:admin:password
Core-R-01:ios:admin:password
FW-01:asa:admin:password
```

## Configuration Automation with Ansible

### Why Ansible for Networks?

**Advantages:**
- Agentless (SSH-based)
- Human-readable YAML syntax
- Extensive network module library
- Idempotent (safe to run multiple times)
- Open-source

### Ansible Basics

**Installation:**
```bash
# Install Ansible
pip install ansible

# Verify installation
ansible --version
```

**Inventory File (`inventory.ini`):**
```ini
[core_switches]
core-sw-01 ansible_host=192.168.1.1
core-sw-02 ansible_host=192.168.1.2

[distribution_switches]
dist-sw-01 ansible_host=192.168.1.10
dist-sw-02 ansible_host=192.168.1.11

[access_switches]
access-sw-101 ansible_host=192.168.2.1
access-sw-102 ansible_host=192.168.2.2

[all:vars]
ansible_connection=network_cli
ansible_network_os=ios
ansible_user=admin
ansible_password=admin123
ansible_become=yes
ansible_become_method=enable
ansible_become_password=enable123
```

### Ansible Playbook Examples

#### Example 1: Backup Configurations
```yaml
# backup-configs.yml
---
- name: Backup Network Device Configurations
  hosts: all
  gather_facts: no
  
  tasks:
    - name: Backup running config
      ios_command:
        commands:
          - show running-config
      register: config_output
    
    - name: Save config to file
      copy:
        content: "{{ config_output.stdout[0] }}"
        dest: "/backups/{{ inventory_hostname }}_{{ ansible_date_time.date }}.cfg"
```

**Run Playbook:**
```bash
ansible-playbook -i inventory.ini backup-configs.yml
```

#### Example 2: Configure VLANs
```yaml
# configure-vlans.yml
---
- name: Configure VLANs on Switches
  hosts: access_switches
  gather_facts: no
  
  vars:
    vlans:
      - id: 10
        name: Sales
      - id: 20
        name: Engineering
      - id: 30
        name: Guest
  
  tasks:
    - name: Create VLANs
      ios_vlan:
        vlan_id: "{{ item.id }}"
        name: "{{ item.name }}"
        state: present
      loop: "{{ vlans }}"
    
    - name: Save configuration
      ios_config:
        save_when: always
```

#### Example 3: Ensure Security Baseline
```yaml
# security-baseline.yml
---
- name: Enforce Security Baseline
  hosts: all
  gather_facts: no
  
  tasks:
    - name: Enable password encryption
      ios_config:
        lines:
          - service password-encryption
    
    - name: Disable unused services
      ios_config:
        lines:
          - no ip http server
          - no ip http secure-server
          - no service pad
          - no ip source-route
    
    - name: Set SSH version 2
      ios_config:
        lines:
          - ip ssh version 2
    
    - name: Configure VTY lines for SSH only
      ios_config:
        lines:
          - transport input ssh
        parents: line vty 0 4
    
    - name: Set login banner
      ios_banner:
        banner: motd
        text: |
          *********************************************************
          WARNING: Unauthorized access prohibited.
          All activity is monitored and logged.
          *********************************************************
        state: present
    
    - name: Save configuration
      ios_config:
        save_when: always
```

#### Example 4: Deploy NTP Configuration
```yaml
# configure-ntp.yml
---
- name: Configure NTP on All Devices
  hosts: all
  gather_facts: no
  
  vars:
    ntp_servers:
      - 10.1.1.50
      - 10.1.1.51
    timezone: PST -8
  
  tasks:
    - name: Configure timezone
      ios_config:
        lines:
          - clock timezone {{ timezone }}
    
    - name: Configure NTP servers
      ios_config:
        lines:
          - ntp server {{ item }}
      loop: "{{ ntp_servers }}"
    
    - name: Verify NTP synchronization
      ios_command:
        commands:
          - show ntp status
      register: ntp_status
    
    - name: Display NTP status
      debug:
        msg: "{{ ntp_status.stdout_lines }}"
```

#### Example 5: Audit Compliance
```yaml
# audit-compliance.yml
---
- name: Audit Network Device Compliance
  hosts: all
  gather_facts: no
  
  tasks:
    - name: Get running configuration
      ios_command:
        commands:
          - show running-config
      register: running_config
    
    - name: Check password encryption enabled
      assert:
        that:
          - "'service password-encryption' in running_config.stdout[0]"
        fail_msg: "Password encryption NOT enabled on {{ inventory_hostname }}"
        success_msg: "Password encryption enabled on {{ inventory_hostname }}"
    
    - name: Check SSH version 2
      assert:
        that:
          - "'ip ssh version 2' in running_config.stdout[0]"
        fail_msg: "SSH version 2 NOT enforced on {{ inventory_hostname }}"
        success_msg: "SSH version 2 enforced on {{ inventory_hostname }}"
    
    - name: Check VTY SSH-only
      assert:
        that:
          - "'transport input ssh' in running_config.stdout[0]"
        fail_msg: "VTY lines NOT restricted to SSH on {{ inventory_hostname }}"
        success_msg: "VTY lines restricted to SSH on {{ inventory_hostname }}"
```

### Advanced Ansible: Roles and Templates

**Ansible Role Structure:**
```
roles/
└── cisco-baseline/
    ├── tasks/
    │   └── main.yml
    ├── templates/
    │   └── baseline-config.j2
    ├── vars/
    │   └── main.yml
    └── handlers/
        └── main.yml
```

**Template Example (`templates/baseline-config.j2`):**
```jinja2
! {{ inventory_hostname }} Baseline Configuration
! Generated: {{ ansible_date_time.iso8601 }}

hostname {{ inventory_hostname }}

! Management
enable secret {{ enable_password }}
service password-encryption

! AAA
aaa new-model
aaa authentication login default local
username {{ admin_user }} privilege 15 secret {{ admin_password }}

! Console
line con 0
  logging synchronous
  exec-timeout 5 0

! VTY
line vty 0 4
  transport input ssh
  exec-timeout 10 0

! SSH
ip domain-name {{ domain_name }}
crypto key generate rsa modulus 2048
ip ssh version 2

! Logging
logging buffered 51200
logging host {{ syslog_server }}
service timestamps log datetime msec localtime
service sequence-numbers

! SNMP
snmp-server community {{ snmp_ro_community }} RO
snmp-server location {{ location }}
snmp-server contact {{ contact_email }}

! NTP
{% for ntp in ntp_servers %}
ntp server {{ ntp }}
{% endfor %}
clock timezone {{ timezone }}

! Banner
banner motd ^
{{ motd_banner }}
^
```

**Using Template in Playbook:**
```yaml
# deploy-baseline.yml
---
- name: Deploy Baseline Configuration
  hosts: all
  gather_facts: no
  
  vars:
    admin_user: admin
    admin_password: SecurePass123!
    enable_password: EnablePass123!
    domain_name: company.local
    syslog_server: 10.1.1.200
    snmp_ro_community: public123
    location: "Datacenter A"
    contact_email: network@company.com
    ntp_servers:
      - 10.1.1.50
      - 10.1.1.51
    timezone: PST -8
    motd_banner: |
      ******************************************
      WARNING: Unauthorized access prohibited
      ******************************************
  
  tasks:
    - name: Generate configuration from template
      template:
        src: baseline-config.j2
        dest: "/tmp/{{ inventory_hostname }}_baseline.cfg"
    
    - name: Apply baseline configuration
      ios_config:
        src: "/tmp/{{ inventory_hostname }}_baseline.cfg"
    
    - name: Save configuration
      ios_config:
        save_when: always
```

## Network Automation with Python

### Python Networking Libraries

#### Netmiko (SSH Connection Library)
```python
from netmiko import ConnectHandler

# Device connection parameters
device = {
    'device_type': 'cisco_ios',
    'host': '192.168.1.1',
    'username': 'admin',
    'password': 'admin123',
    'secret': 'enable123',  # Enable password
}

# Connect to device
connection = ConnectHandler(**device)
connection.enable()  # Enter enable mode

# Send commands
output = connection.send_command('show ip interface brief')
print(output)

# Send configuration commands
config_commands = [
    'interface GigabitEthernet0/1',
    'description Uplink to Core',
    'no shutdown'
]
output = connection.send_config_set(config_commands)
print(output)

# Save configuration
connection.send_command('write memory')

# Disconnect
connection.disconnect()
```

#### Paramiko (Low-level SSH Library)
```python
import paramiko

# Create SSH client
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

# Connect
client.connect('192.168.1.1', username='admin', password='admin123')

# Execute command
stdin, stdout, stderr = client.exec_command('show version')

# Read output
output = stdout.read().decode('utf-8')
print(output)

# Close connection
client.close()
```

#### NAPALM (Vendor-Agnostic Library)
```python
from napalm import get_network_driver

# Select driver (ios, junos, eos, nxos, etc.)
driver = get_network_driver('ios')

# Connect to device
device = driver(
    hostname='192.168.1.1',
    username='admin',
    password='admin123'
)

device.open()

# Get device facts
facts = device.get_facts()
print(f"Hostname: {facts['hostname']}")
print(f"Model: {facts['model']}")
print(f"Serial: {facts['serial_number']}")
print(f"Uptime: {facts['uptime']}")

# Get interface information
interfaces = device.get_interfaces()
for interface, details in interfaces.items():
    print(f"{interface}: {details['is_up']}, {details['speed']} Mbps")

# Compare configurations (dry-run)
device.load_merge_candidate(filename='new_config.txt')
diff = device.compare_config()
print("Configuration diff:")
print(diff)

# If satisfied, commit
device.commit_config()

# Or discard
device.discard_config()

device.close()
```

### Python Automation Scripts

#### Example 1: Bulk Configuration Backup
```python
import os
from datetime import datetime
from netmiko import ConnectHandler

# List of devices
devices = [
    {'device_type': 'cisco_ios', 'host': '192.168.1.1', 'username': 'admin', 'password': 'admin123'},
    {'device_type': 'cisco_ios', 'host': '192.168.1.2', 'username': 'admin', 'password': 'admin123'},
    {'device_type': 'cisco_ios', 'host': '192.168.1.3', 'username': 'admin', 'password': 'admin123'},
]

# Backup directory
backup_dir = '/backups/network'
os.makedirs(backup_dir, exist_ok=True)

# Timestamp
timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

for device in devices:
    try:
        print(f"Connecting to {device['host']}...")
        connection = ConnectHandler(**device)
        
        # Get hostname
        hostname = connection.send_command('show run | include hostname').split()[1]
        
        # Backup running config
        config = connection.send_command('show running-config')
        
        # Save to file
        filename = f"{backup_dir}/{hostname}_{timestamp}.cfg"
        with open(filename, 'w') as f:
            f.write(config)
        
        print(f"Backup saved: {filename}")
        connection.disconnect()
        
    except Exception as e:
        print(f"Error backing up {device['host']}: {e}")
```

#### Example 2: Interface Status Report
```python
from netmiko import ConnectHandler
import csv

devices = [
    {'device_type': 'cisco_ios', 'host': '192.168.1.1', 'username': 'admin', 'password': 'admin123'},
    {'device_type': 'cisco_ios', 'host': '192.168.1.2', 'username': 'admin', 'password': 'admin123'},
]

# CSV output
with open('interface_report.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Device', 'Interface', 'Status', 'Protocol', 'Description'])
    
    for device in devices:
        connection = ConnectHandler(**device)
        hostname = connection.send_command('show run | include hostname').split()[1]
        
        output = connection.send_command('show ip interface brief')
        
        # Parse output (skip header)
        for line in output.split('\n')[1:]:
            if line.strip():
                parts = line.split()
                interface = parts[0]
                ip = parts[1]
                status = parts[4]
                protocol = parts[5]
                
                writer.writerow([hostname, interface, status, protocol, ip])
        
        connection.disconnect()

print("Interface report generated: interface_report.csv")
```

## Infrastructure as Code (IaC)

### Concept
Treat network infrastructure as software:
- Configurations stored as code (version controlled)
- Changes reviewed like code (pull requests)
- Deployed automatically (CI/CD pipelines)
- Tested before production (automated testing)

### Benefits
- **Reproducibility:** Identical deployments every time
- **Scalability:** Deploy 10 or 1,000 devices with same effort
- **Speed:** Automated deployment in minutes vs. hours/days
- **Quality:** Automated testing reduces errors
- **Documentation:** Code IS the documentation

### Example: Terraform for Network Infrastructure

**Terraform Configuration (`network.tf`):**
```hcl
# Provider configuration
provider "aci" {
  username = var.aci_username
  password = var.aci_password
  url      = var.aci_url
}

# Create tenant
resource "aci_tenant" "production" {
  name        = "Production"
  description = "Production tenant"
}

# Create VRF
resource "aci_vrf" "prod_vrf" {
  tenant_dn = aci_tenant.production.id
  name      = "prod_vrf"
}

# Create Bridge Domains and Subnets
resource "aci_bridge_domain" "web_bd" {
  tenant_dn = aci_tenant.production.id
  name      = "web_bd"
  vrf_dn    = aci_vrf.prod_vrf.id
}

resource "aci_subnet" "web_subnet" {
  bridge_domain_dn = aci_bridge_domain.web_bd.id
  ip               = "10.10.10.1/24"
  scope            = ["public"]
}

# Create Application Profile
resource "aci_application_profile" "web_app" {
  tenant_dn = aci_tenant.production.id
  name      = "web_app"
}

# Create EPGs (Endpoint Groups)
resource "aci_application_epg" "web_epg" {
  application_profile_dn = aci_application_profile.web_app.id
  name                   = "web_epg"
  bridge_domain_dn       = aci_bridge_domain.web_bd.id
}
```

**Deploy:**
```bash
terraform init
terraform plan
terraform apply
```

## Best Practices for Configuration Management

### 1. Golden Config (Baseline)
- Define standard configurations for each device type
- Store as templates with variables
- All devices should match golden config (or have documented exceptions)

### 2. Configuration Drift Detection
```python
# Pseudo-code for drift detection
golden_config = load_template('golden-config-switch.j2')
for device in devices:
    current_config = get_config(device)
    diff = compare(golden_config, current_config)
    if diff:
        alert(f"Configuration drift detected on {device}: {diff}")
```

### 3. Pre-Change Validation
- Syntax checking before deployment
- Dry-run/check mode
- Rollback plan automated

**Ansible Check Mode:**
```bash
ansible-playbook playbook.yml --check --diff
# Shows what WOULD change without applying
```

### 4. Post-Change Validation
```yaml
# Ansible validation task
- name: Verify VLAN configuration
  ios_command:
    commands:
      - show vlan brief
  register: vlan_output

- name: Assert VLAN 40 exists
  assert:
    that:
      - "'40' in vlan_output.stdout[0]"
    fail_msg: "VLAN 40 not found after configuration"
```

### 5. Audit Logging
- Log all configuration changes
- Include: who, what, when, why
- Store logs centrally (syslog, SIEM)
- Retention per compliance requirements

## Summary

Modern configuration management requires:

**1. Version Control:**
- Git for configuration files
- Track all changes over time
- Enable rollback and comparison

**2. Automated Backups:**
- RANCID or Oxidized for regular backups
- Store in version control
- Alert on configuration changes

**3. Automation Tools:**
- Ansible for configuration deployment
- Python for custom scripts
- NAPALM for vendor-agnostic automation

**4. Infrastructure as Code:**
- Configurations as code (templates, playbooks)
- Automated testing and validation
- CI/CD pipelines for network changes

**5. Best Practices:**
- Golden configs (baselines)
- Drift detection
- Pre/post-change validation
- Comprehensive audit logging
- Regular testing of automation

Configuration management and automation are no longer optional - they are essential for managing modern, large-scale networks efficiently and reliably.

## Review Questions

1. What is the purpose of version control for network configurations?
2. What is the difference between RANCID and Oxidized?
3. What are the benefits of using Ansible for network automation?
4. What is idempotency and why is it important?
5. What is NAPALM and what advantage does it provide?
6. What is configuration drift and why should it be detected?
7. What is "Infrastructure as Code" (IaC)?
8. What should be included in a configuration baseline (golden config)?
9. Why is pre-change validation important in automation?
10. What Python library would you use for SSH connections to network devices?
