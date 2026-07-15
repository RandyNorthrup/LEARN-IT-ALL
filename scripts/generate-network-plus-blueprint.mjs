import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

const modules = [
  {
    id: 'network-evidence-method',
    title: 'Network Evidence, Safety, and Troubleshooting Method',
    context:
      'Operate a safe virtual help-desk lab with tickets, diagrams, baselines, commands, packet evidence, and change records.',
    artifact: 'a reproducible network evidence notebook',
    objectives: [
      'Use the N10-009 troubleshooting method before guessing fixes.',
      'Protect production state and user data while gathering evidence.',
      'Communicate symptoms, scope, cause, action, outcome, and prevention clearly.',
    ],
    skills: [
      [
        'net-troubleshooting-method',
        'Apply identify, theorize, test, plan, implement or escalate, verify, prevent, and document steps to one network incident.',
        'Trying the most common fix before recording symptoms is the fastest reliable method.',
      ],
      [
        'net-scope-symptoms',
        'Separate user report, observed symptom, affected scope, recent change, and reproducible condition before forming a theory.',
        'A user description of the cause is equivalent to independently observed evidence.',
      ],
      [
        'net-hypothesis-isolation',
        'Form one falsifiable probable-cause theory and isolate it with bottom-up, top-down, or divide-and-conquer evidence.',
        'Changing several layers together is efficient because one change will reveal the cause.',
      ],
      [
        'net-change-safety',
        'Assess impact, backup configuration, define rollback, obtain authority, and avoid destructive testing on live networks.',
        'Troubleshooting authority automatically includes permission to change production configuration.',
      ],
      [
        'net-verification-prevention',
        'Verify the original task plus retained services and identify a preventive control after a bounded repair.',
        'A successful ping proves the full affected application and user workflow is restored.',
      ],
      [
        'net-incident-documentation',
        'Record timeline, environment, commands, findings, actions, outcomes, lessons, and evidence without exposing secrets.',
        'Command history alone is a complete and understandable incident record.',
      ],
    ],
  },
  {
    id: 'network-models-flows',
    title: 'OSI, TCP/IP, Encapsulation, and Traffic Evidence',
    context:
      'Trace a client request through host, switch, router, firewall, service, and return path using captures and diagrams.',
    artifact: 'a layered packet-flow diagnosis',
    objectives: [
      'Use OSI and TCP/IP models as evidence maps rather than protocol mythology.',
      'Trace addressing, encapsulation, PDUs, state, and device responsibility end to end.',
      'Interpret packet evidence without claiming visibility into encrypted or absent layers.',
    ],
    skills: [
      [
        'net-osi-layers',
        'Explain the responsibilities and failure evidence of all seven OSI reference-model layers.',
        'Every protocol and appliance operates at exactly one OSI layer.',
      ],
      [
        'net-tcpip-mapping',
        'Map TCP/IP link, internet, transport, and application functions to OSI layers without treating either as packet reality.',
        'OSI layers five through seven always appear as separate headers on the wire.',
      ],
      [
        'net-encapsulation-pdus',
        'Trace data, segments or datagrams, packets, frames, and bits through encapsulation, forwarding, and decapsulation.',
        'A router forwards the original Ethernet frame unchanged between networks.',
      ],
      [
        'net-layer-addressing',
        'Distinguish MAC, IP, port, name, and application identifiers by scope, lifetime, and forwarding purpose.',
        'A destination MAC address identifies the final remote server across the internet.',
      ],
      [
        'net-tcp-udp-state',
        'Compare TCP reliability and state with UDP datagrams and select transport behavior from application requirements.',
        'UDP is always faster and TCP is always more appropriate for important data.',
      ],
      [
        'net-packet-capture-limits',
        'Interpret frame, packet, transport, and application capture fields while accounting for vantage point, encryption, offload, and missing traffic.',
        'One packet capture contains every hop and decrypted application payload automatically.',
      ],
    ],
  },
  {
    id: 'network-appliances-cloud',
    title: 'Appliances, Functions, Storage, and Cloud Connectivity',
    context:
      'Design service paths across physical and virtual devices, private cloud networks, public services, and storage.',
    artifact: 'a labeled hybrid-service path',
    objectives: [
      'Compare device and application functions instead of memorizing boxes.',
      'Trace policy, availability, storage, and traffic effects across virtual and physical appliances.',
      'Choose cloud models and connectivity from security, latency, scale, and ownership needs.',
    ],
    skills: [
      [
        'net-routing-switching-appliances',
        'Compare router, switch, firewall, access point, controller, proxy, load balancer, IDS, and IPS forwarding or inspection roles.',
        'A device name determines one fixed OSI layer and one fixed deployment form.',
      ],
      [
        'net-nas-san',
        'Compare NAS and SAN access models, protocols, traffic patterns, redundancy, and use cases.',
        'NAS and SAN are interchangeable names for any shared disk appliance.',
      ],
      [
        'net-cdn-vpn-qos-ttl',
        'Explain CDN, VPN, QoS, and TTL functions and how each changes delivery, privacy, priority, or loop lifetime.',
        'QoS creates bandwidth and guarantees performance across networks you do not control.',
      ],
      [
        'net-nfv-vpc-controls',
        'Explain NFV, VPC boundaries, security groups, security lists, subnets, route tables, and virtual gateways.',
        'A VPC is physically isolated hardware and therefore needs no network policy.',
      ],
      [
        'net-cloud-gateways-connectivity',
        'Choose internet, NAT, VPN, or dedicated cloud connectivity by direction, reachability, performance, and risk.',
        'A NAT gateway accepts unsolicited inbound internet connections by default.',
      ],
      [
        'net-cloud-service-deployment',
        'Compare public, private, hybrid and SaaS, PaaS, IaaS responsibility boundaries.',
        'Moving to IaaS transfers operating-system and network security responsibility to the provider.',
      ],
      [
        'net-cloud-scale-multitenancy',
        'Distinguish scalability, elasticity, multitenancy, availability, and geographic placement with measurable requirements.',
        'Elasticity and scalability are identical terms for buying a larger server.',
      ],
    ],
  },
  {
    id: 'network-protocols-services',
    title: 'Ports, Protocols, Services, and Traffic Types',
    context:
      'Build and diagnose a service-access matrix from client, firewall, resolver, server, and capture evidence.',
    artifact: 'a verified protocol and service matrix',
    objectives: [
      'Associate standard ports with purpose, security, and transport behavior.',
      'Trace name, address, session, and application dependencies instead of memorizing isolated numbers.',
      'Distinguish traffic delivery types and tunneling or security protocols.',
    ],
    skills: [
      [
        'net-standard-ports',
        'Use N10-009 standard ports for file transfer, remote administration, mail, DNS, DHCP, web, time, monitoring, directory, database, desktop, and voice services.',
        'Knowing a port number proves the service is enabled, secure, and reachable.',
      ],
      [
        'net-secure-insecure-services',
        'Compare secure and insecure service alternatives such as SSH or Telnet, HTTPS or HTTP, LDAPS or LDAP, and SFTP or FTP.',
        'Changing a service to a commonly secure port automatically enables encryption.',
      ],
      [
        'net-dns-dhcp-time-dependencies',
        'Explain how DNS, DHCP, NTP, PTP, and NTS dependencies affect authentication, addressing, logging, and service reachability.',
        'Successful IP connectivity proves DNS and time are irrelevant to the application.',
      ],
      [
        'net-icmp-tcp-udp-gre',
        'Compare ICMP, TCP, UDP, and GRE purpose, headers, state, errors, and troubleshooting evidence.',
        'ICMP is a transport protocol that uses TCP-style port numbers.',
      ],
      [
        'net-ipsec-ah-esp-ike',
        'Explain AH, ESP, IKE, tunnel or transport placement, encryption, integrity, peer negotiation, and NAT interaction.',
        'IPsec is one encryption protocol that always protects the complete original frame.',
      ],
      [
        'net-traffic-delivery-types',
        'Distinguish unicast, broadcast, multicast, and anycast delivery scope and network behavior.',
        'Anycast sends one packet simultaneously to every server sharing the address.',
      ],
    ],
  },
  {
    id: 'network-media-topologies',
    title: 'Media, Connectors, Transceivers, and Architectures',
    context:
      'Select and document a campus and data-center physical design under distance, bandwidth, environment, and redundancy constraints.',
    artifact: 'a physical media and topology bill of design',
    objectives: [
      'Select copper, fiber, wireless, cellular, satellite, and transceivers from measurable constraints.',
      'Match connectors, form factors, standards, and polarity correctly.',
      'Choose topologies and traffic architectures from failure domains and flow patterns.',
    ],
    skills: [
      [
        'net-ethernet-media',
        'Compare 802.3 copper categories, shielding, distance, speed, duplex, PoE, coaxial, DAC, and twinax use cases.',
        'A higher cable category always increases link speed without device or distance constraints.',
      ],
      [
        'net-fiber-media',
        'Compare single-mode and multimode fiber, wavelengths, distance, bandwidth, bend, contamination, and safety concerns.',
        'Single-mode and multimode fiber can share any transceiver when connectors fit.',
      ],
      [
        'net-wireless-cellular-satellite',
        'Compare 802.11, cellular, and satellite media by coverage, latency, capacity, interference, mobility, and cost.',
        'Wireless bandwidth labels describe guaranteed application throughput.',
      ],
      [
        'net-connectors',
        'Identify SC, LC, ST, MPO, RJ11, RJ45, F-type, and BNC connectors and avoid incompatible media assumptions.',
        'Connector shape alone identifies cable category, speed, and supported protocol.',
      ],
      [
        'net-transceivers',
        'Select Ethernet or Fibre Channel SFP and QSFP form factors by protocol, wavelength, fiber, distance, lane, and device support.',
        'Any SFP with the right connector operates in any SFP port.',
      ],
      [
        'net-topologies',
        'Compare mesh, hybrid, star, hub-and-spoke, point-to-point, and failure effects.',
        'A logical topology diagram always matches the physical cable layout.',
      ],
      [
        'net-campus-datacenter-architecture',
        'Compare three-tier, collapsed-core, and spine-leaf architectures plus north-south and east-west traffic.',
        'Spine-leaf eliminates oversubscription and all possible single points of failure.',
      ],
    ],
  },
  {
    id: 'network-ipv4-subnetting',
    title: 'IPv4 Addressing, CIDR, VLSM, and Subnet Design',
    context:
      'Create an address plan for departments, infrastructure, guests, point-to-point links, growth, and route summarization.',
    artifact: 'a validated IPv4 subnet allocation workbook',
    objectives: [
      'Classify special, public, private, and legacy classful address context.',
      'Calculate network, broadcast, host range, prefix, mask, and capacity accurately.',
      'Allocate VLSM subnets and summarize routes without overlap or wasted assumptions.',
    ],
    skills: [
      [
        'net-ipv4-binary-mask',
        'Convert IPv4 octets and masks between binary and dotted decimal and explain contiguous prefix bits.',
        'Subnet masks may use any pattern of ones and zeros if host counts work.',
      ],
      [
        'net-ipv4-special-ranges',
        'Identify RFC1918, APIPA, loopback, unspecified, limited broadcast, multicast, and public addressing behavior.',
        'A private IPv4 address is globally unique and internet-routable after DNS registration.',
      ],
      [
        'net-cidr-network-range',
        'Calculate network address, broadcast address, usable host range, prefix length, and address count for CIDR blocks.',
        'The first and last address are usable hosts in every IPv4 subnet.',
      ],
      [
        'net-vlsm-allocation',
        'Allocate largest-to-smallest VLSM networks with growth, infrastructure, alignment, and non-overlap evidence.',
        'VLSM means choosing unrelated masks without aligning subnet boundaries.',
      ],
      [
        'net-route-summarization',
        'Summarize contiguous IPv4 networks only when common prefix, routing ownership, and failure behavior support aggregation.',
        'Any adjacent-looking decimal networks can be summarized into one route.',
      ],
      [
        'net-classful-legacy',
        'Recognize class A through E historical boundaries without using classful thinking to replace CIDR design.',
        'Modern routing still derives subnet masks from the first IPv4 octet.',
      ],
      [
        'net-ipv4-address-plan',
        'Document scopes, gateways, reservations, exclusions, VLANs, DHCP pools, static infrastructure, and IPAM ownership.',
        'An address spreadsheet is complete even when it omits VLAN and DHCP relationships.',
      ],
    ],
  },
  {
    id: 'network-ipv6-modern',
    title: 'IPv6 and Modern Programmable Networks',
    context:
      'Extend the branch design for IPv6, centralized policy, overlays, zero trust, SASE, and infrastructure as code.',
    artifact: 'a dual-stack and programmable-network transition plan',
    objectives: [
      'Use IPv6 notation, types, scopes, neighbor behavior, and transition choices.',
      'Explain SDN, SD-WAN, VXLAN, ZTA, SASE, and SSE without marketing shortcuts.',
      'Treat network automation as reviewed software with drift and rollback controls.',
    ],
    skills: [
      [
        'net-ipv6-notation-prefix',
        'Compress, expand, classify, and subnet IPv6 addresses and prefixes without inventing IPv4 broadcast behavior.',
        'IPv6 removes subnetting because the address space is large.',
      ],
      [
        'net-ipv6-address-types',
        'Distinguish global unicast, link-local, unique local, multicast, anycast, loopback, and unspecified IPv6 addresses.',
        'IPv6 uses broadcast for neighbor discovery just as IPv4 uses ARP broadcast.',
      ],
      [
        'net-ipv6-autoconfiguration',
        'Explain SLAAC, router advertisements, DHCPv6 choices, neighbor discovery, and default-gateway learning.',
        'SLAAC always supplies DNS and every other host option without additional mechanisms.',
      ],
      [
        'net-ipv6-transition',
        'Choose dual stack, tunneling, or NAT64 from application compatibility, operations, observability, and deprecation needs.',
        'NAT64 allows any IPv6-only application to reach any IPv4 service transparently.',
      ],
      [
        'net-sdn-sdwan-vxlan',
        'Explain SDN control separation, SD-WAN policy and transport abstraction, and VXLAN overlay identifiers and use cases.',
        'SD-WAN replaces all underlay circuits and makes transport performance irrelevant.',
      ],
      [
        'net-zta-sase-sse',
        'Relate zero-trust policy decisions, least privilege, continuous context, SASE, and SSE service boundaries.',
        'Zero trust means no internal connectivity is allowed and a VPN is unnecessary.',
      ],
      [
        'net-infrastructure-code',
        'Manage network templates, playbooks, inventories, source control, review, conflict, drift, upgrade, and rollback evidence.',
        'Automation removes the need for change review because templates are repeatable.',
      ],
    ],
  },
  {
    id: 'network-routing',
    title: 'Routing, Selection, Translation, and Redundancy',
    context:
      'Connect branch, headquarters, cloud, and internet routes while diagnosing asymmetry and failover.',
    artifact: 'a routed hybrid branch design',
    objectives: [
      'Read and compare routes by prefix, administrative distance, and metric.',
      'Explain static, dynamic, default, translated, and redundant gateway behavior.',
      'Verify forwarding and return paths with tables and packet evidence.',
    ],
    skills: [
      [
        'net-routing-table-forwarding',
        'Read connected, static, dynamic, default, and host routes and select the longest matching destination prefix.',
        'Routers choose the route with the lowest metric before comparing prefix length.',
      ],
      [
        'net-static-default-routes',
        'Configure and evaluate static and default routes with next-hop reachability, recursion, failover, and documentation.',
        'A default route overrides more specific routes because zero is the lowest network.',
      ],
      [
        'net-dynamic-routing',
        'Compare BGP, EIGRP, and OSPF scope, neighbor behavior, path information, convergence, and use cases at N10-009 depth.',
        'All dynamic routing protocols choose paths using the same metric.',
      ],
      [
        'net-route-preference',
        'Distinguish prefix length, administrative distance, and protocol metric in route-selection evidence.',
        'Administrative distance is advertised end to end by every routing protocol.',
      ],
      [
        'net-nat-pat',
        'Trace static or dynamic NAT and PAT translations, direction, state, address conservation, and troubleshooting evidence.',
        'NAT is a firewall and automatically permits only safe traffic.',
      ],
      [
        'net-fhrp-vip',
        'Explain FHRP virtual IP and gateway failover behavior, election, state, and host transparency.',
        'A virtual IP load-balances every client packet equally across gateways.',
      ],
      [
        'net-subinterfaces',
        'Use router or firewall subinterfaces with 802.1Q tags and gateway addresses for segmented routing.',
        'One physical interface can carry only one IP network and one VLAN.',
      ],
    ],
  },
  {
    id: 'network-switching',
    title: 'VLANs, Trunks, STP, Aggregation, and MTU',
    context:
      'Segment a campus switch fabric for staff, voice, guest, management, and redundant uplinks.',
    artifact: 'a verified switched campus configuration plan',
    objectives: [
      'Configure VLAN membership and tagged links without native-VLAN ambiguity.',
      'Prevent loops and predict spanning-tree port behavior.',
      'Aggregate links and manage speed, duplex, MTU, and SVI dependencies.',
    ],
    skills: [
      [
        'net-vlan-database-access',
        'Create VLANs and assign access interfaces while matching documentation, endpoint purpose, and broadcast-domain boundaries.',
        'A VLAN exists automatically when an access port is assigned an unused number.',
      ],
      [
        'net-trunks-native-voice',
        'Configure 802.1Q trunks, allowed VLANs, native VLAN, and voice VLAN behavior without mismatch or leakage.',
        'Native VLAN traffic is always tagged and therefore cannot mismatch.',
      ],
      [
        'net-svi-intervlan',
        'Explain switch virtual interfaces for management or Layer 3 gateways and the dependencies for an SVI to become operational.',
        'Creating an SVI automatically routes between VLANs on every switch.',
      ],
      [
        'net-spanning-tree',
        'Predict root bridge selection, root and designated roles, alternate paths, states, convergence, and loop symptoms.',
        'Spanning tree disables every redundant link permanently.',
      ],
      [
        'net-link-aggregation',
        'Bundle compatible links with a shared aggregation protocol and verify member, hashing, capacity, and failure behavior.',
        'Two physical links in a bundle double one flow throughput automatically.',
      ],
      [
        'net-speed-duplex',
        'Negotiate or configure compatible speed and duplex and diagnose mismatch through counters and link behavior.',
        'A duplex mismatch always prevents the link from coming up.',
      ],
      [
        'net-mtu-jumbo',
        'Choose MTU and jumbo-frame settings end to end while accounting for encapsulation and path consistency.',
        'Enabling jumbo frames on one switch improves every connected application.',
      ],
    ],
  },
  {
    id: 'network-wireless',
    title: 'Wireless Design, Configuration, and Validation',
    context:
      'Design staff, guest, and point-to-point wireless service across crowded, regulated, and mobile spaces.',
    artifact: 'a secure wireless survey and deployment plan',
    objectives: [
      'Choose bands, channels, widths, antennas, and AP architecture from measured requirements.',
      'Configure identities, encryption, authentication, guest isolation, and roaming.',
      'Validate coverage, capacity, interference, and client behavior rather than signal alone.',
    ],
    skills: [
      [
        'net-wifi-standards-bands',
        'Compare relevant 802.11 capabilities across 2.4, 5, and 6 GHz bands, channel availability, range, and client support.',
        'A newer Wi-Fi generation guarantees every client uses its maximum speed.',
      ],
      [
        'net-wifi-channels-width',
        'Choose channel, width, reuse, and band steering from regulatory domain, overlap, contention, capacity, and coverage.',
        'Wider channels always increase network capacity in crowded deployments.',
      ],
      [
        'net-ssid-bssid-ess',
        'Distinguish SSID, BSSID, ESS, hidden names, and client discovery without treating an SSID as a security control.',
        'Hiding an SSID prevents unauthorized clients from discovering the network.',
      ],
      [
        'net-wireless-topologies',
        'Choose infrastructure, mesh, ad hoc, and point-to-point wireless topology from backhaul, mobility, scale, and failure needs.',
        'Mesh access points need no wired or wireless backhaul planning.',
      ],
      [
        'net-wpa-authentication',
        'Choose WPA2 or WPA3 and PSK or enterprise authentication with migration, certificate, credential, and client constraints.',
        'WPA3 personal eliminates weak passwords and all evil-twin risk.',
      ],
      [
        'net-guest-captive',
        'Design guest isolation and captive portals without confusing web acceptance with link-layer encryption or identity.',
        'A captive portal encrypts all guest wireless traffic automatically.',
      ],
      [
        'net-antennas-ap-control',
        'Choose directional or omnidirectional antennas and autonomous or lightweight AP management from coverage and operations needs.',
        'Higher antenna gain creates more transmit power in every direction.',
      ],
      [
        'net-wireless-survey-roaming',
        'Perform predictive and measured surveys and verify RSSI, SNR, interference, utilization, roaming, and application outcomes.',
        'Strong RSSI alone proves a wireless cell has sufficient capacity and quality.',
      ],
    ],
  },
  {
    id: 'network-physical-installation',
    title: 'Facilities, Racks, Cabling, Power, and Environment',
    context:
      'Plan an MDF, IDFs, racks, patching, power, cooling, security, and maintenance access for a new site.',
    artifact: 'a facilities-ready network installation package',
    objectives: [
      'Place distribution spaces, racks, panels, pathways, and devices for service and safety.',
      'Calculate power and redundancy without exceeding circuits or PoE budgets.',
      'Control temperature, humidity, airflow, fire, and physical access risks.',
    ],
    skills: [
      [
        'net-mdf-idf-racks',
        'Place MDF and IDF spaces, rack units, pathways, grounding, clearances, and service loops from building constraints.',
        'An IDF is simply a smaller rack and needs no distance or power planning.',
      ],
      [
        'net-patch-fiber-panels',
        'Document patch panels, fiber distribution panels, labels, polarity, ports, pathways, and change ownership.',
        'Patch panels are active devices that regenerate weak signals.',
      ],
      [
        'net-airflow-locking',
        'Align port-side intake or exhaust, hot and cold airflow, lockable access, and maintenance reach.',
        'Mixing intake directions improves cooling by circulating more air.',
      ],
      [
        'net-ups-pdu-load',
        'Calculate UPS runtime, PDU and circuit load, voltage, redundancy, graceful shutdown, and PoE power budget.',
        'A PDU always provides battery backup and voltage conversion.',
      ],
      [
        'net-environment-fire',
        'Monitor temperature and humidity and select compatible detection, suppression, water, dust, and contamination controls.',
        'Any fire extinguisher is safe for energized network equipment.',
      ],
    ],
  },
  {
    id: 'network-services',
    title: 'DHCP, DNS, IPv6 Services, and Time',
    context:
      'Implement redundant address, name, and time services for clients, infrastructure, and secure operations.',
    artifact: 'a validated core network-services design',
    objectives: [
      'Configure dynamic addressing and relays with exclusions and reservations.',
      'Build and troubleshoot forward, reverse, authoritative, recursive, and secure DNS behavior.',
      'Select and verify time services required for logs, certificates, and authentication.',
    ],
    skills: [
      [
        'net-dhcp-scopes-options',
        'Configure DHCP scopes, leases, reservations, exclusions, gateways, DNS options, and pool capacity.',
        'A reservation and an exclusion are interchangeable DHCP configuration.',
      ],
      [
        'net-dhcp-relay',
        'Use DHCP relay or IP helper across routed boundaries and trace discover, offer, request, and acknowledgment evidence.',
        'DHCP broadcast crosses routers automatically when a server exists elsewhere.',
      ],
      [
        'net-slaac-dhcpv6',
        'Choose SLAAC, stateless or stateful DHCPv6, and router-advertisement flags based on address and option needs.',
        'DHCPv6 supplies the IPv6 default gateway to clients.',
      ],
      [
        'net-dns-records',
        'Use A, AAAA, CNAME, MX, TXT, NS, and PTR records with correct owner, target, and dependency semantics.',
        'A CNAME can coexist freely with every other record at the same owner name.',
      ],
      [
        'net-dns-zones-roles',
        'Distinguish forward and reverse, primary and secondary, authoritative and non-authoritative, recursive, caching, and hosts-file behavior.',
        'A recursive resolver is authoritative for every answer it caches.',
      ],
      [
        'net-dns-security-privacy',
        'Explain DNSSEC authenticity and DoH or DoT transport privacy without claiming either provides every property.',
        'DNS over HTTPS validates that a DNS answer was signed by the zone owner.',
      ],
      [
        'net-time-protocols',
        'Choose and verify NTP, PTP, and NTS by precision, hierarchy, authentication, delay, and application requirements.',
        'NTP and PTP provide identical accuracy and security on every network.',
      ],
    ],
  },
  {
    id: 'network-access-management',
    title: 'Remote Access and Network Management Paths',
    context:
      'Provide secure operator, vendor, and user connectivity with recoverable in-band and out-of-band paths.',
    artifact: 'a least-privilege management access plan',
    objectives: [
      'Choose VPN scope and tunneling behavior from user and routing needs.',
      'Select SSH, GUI, API, console, and jump-host paths with authentication and audit.',
      'Preserve an out-of-band recovery route without bypassing security.',
    ],
    skills: [
      [
        'net-site-client-vpn',
        'Compare site-to-site and client-to-site VPNs, clientless access, authentication, authorization, and route scope.',
        'A site-to-site VPN automatically authorizes every device on both networks.',
      ],
      [
        'net-split-full-tunnel',
        'Choose split or full tunnel by traffic path, inspection, performance, privacy, DNS, and local-network risk.',
        'Full tunnel guarantees all endpoint traffic is secure even when the device is compromised.',
      ],
      [
        'net-management-methods',
        'Choose SSH, GUI, API, or console management with encrypted transport, identity, least privilege, and logging.',
        'A web management interface is safer than SSH because it is graphical.',
      ],
      [
        'net-jump-host',
        'Use a hardened jump host as a controlled management choke point with MFA, recording, patching, and limited reach.',
        'A jump host removes the need to secure the destination devices.',
      ],
      [
        'net-inband-outofband',
        'Compare in-band and out-of-band management paths and preserve isolated recovery without creating an unmonitored bypass.',
        'Out-of-band management is physically unreachable to attackers by definition.',
      ],
    ],
  },
  {
    id: 'network-operations-monitoring',
    title: 'Documentation, Change, Lifecycle, and Monitoring',
    context:
      'Operate a living network source of truth with baselines, telemetry, alerts, configuration, and service ownership.',
    artifact: 'an operations and observability runbook',
    objectives: [
      'Maintain diagrams, inventories, IPAM, maps, SLAs, and configuration sources of truth.',
      'Use safe change, lifecycle, backup, patch, and decommissioning processes.',
      'Collect and correlate monitoring evidence without mistaking data volume for observability.',
    ],
    skills: [
      [
        'net-diagrams-inventory-ipam',
        'Maintain physical, logical, rack, cable, Layer 1 to 3 diagrams, asset inventory, licensing, warranty, and IPAM records.',
        'One automatically discovered topology replaces every physical and ownership record.',
      ],
      [
        'net-sla-wireless-maps',
        'Use SLAs, service objectives, wireless surveys, and heat maps with date, method, owner, and limitation context.',
        'A heat map is permanent evidence and needs no measured validation after changes.',
      ],
      [
        'net-lifecycle-management',
        'Plan EOL, EOS, patches, operating systems, firmware, licensing, replacement, and secure decommissioning.',
        'End of support means a device stops forwarding traffic immediately.',
      ],
      [
        'net-change-configuration',
        'Use request, impact, approval, schedule, backup, baseline, golden configuration, rollback, verification, and review controls.',
        'A successful lab change may be copied to production without separate impact analysis.',
      ],
      [
        'net-snmp',
        'Use SNMP v2c or v3, MIBs, polling, traps, community or user security, and management scope appropriately.',
        'SNMP traps provide a complete history and remove the need for polling.',
      ],
      [
        'net-flow-packet-baseline',
        'Combine flow data, packet capture, interface metrics, and baselines to distinguish conversation, content, and anomaly evidence.',
        'Flow records contain complete packet payloads for application diagnosis.',
      ],
      [
        'net-log-siem-api',
        'Aggregate syslog and application events, correlate in SIEM, and integrate APIs with time, identity, parsing, retention, and access controls.',
        'Centralizing logs guarantees events are complete, correctly parsed, and trustworthy.',
      ],
      [
        'net-discovery-mirroring-monitoring',
        'Use scheduled or ad hoc discovery, port mirroring, and traffic, performance, availability, and configuration monitoring.',
        'Port mirroring captures every packet without oversubscription or drop risk.',
      ],
    ],
  },
  {
    id: 'network-resilience-recovery',
    title: 'Availability, Disaster Recovery, and Validation',
    context:
      'Define recovery objectives and prove branch, service, configuration, and site recovery under realistic failures.',
    artifact: 'a tested network continuity plan',
    objectives: [
      'Calculate and distinguish repair, failure, data-loss, and recovery-time metrics.',
      'Choose sites and active modes from business and technical constraints.',
      'Validate recovery through tabletop and technical exercises.',
    ],
    skills: [
      [
        'net-rpo-rto',
        'Define RPO and RTO from business impact and map them to backup, replication, restoration, and test requirements.',
        'RPO measures how quickly a service must return after failure.',
      ],
      [
        'net-mttr-mtbf',
        'Use MTTR and MTBF as population and process indicators without treating averages as individual guarantees.',
        'A higher MTTR indicates a more reliable component.',
      ],
      [
        'net-dr-sites',
        'Compare cold, warm, and hot sites by readiness, data, network, staffing, cost, and activation time.',
        'A hot site is instantly current without replication or operational testing.',
      ],
      [
        'net-active-modes',
        'Compare active-active and active-passive designs including health checks, state, quorum, load, split brain, and failover.',
        'Active-active design removes every shared dependency and failure mode.',
      ],
      [
        'net-dr-testing',
        'Run tabletop and validation tests with scenarios, observers, success criteria, rollback, evidence, and remediation owners.',
        'A written disaster-recovery plan is proven once leadership approves it.',
      ],
    ],
  },
  {
    id: 'network-security',
    title: 'Network Security, Attacks, Segmentation, and Hardening',
    context:
      'Threat-model and harden enterprise, guest, IoT, OT, management, and remote-access network zones.',
    artifact: 'a defense-in-depth network security plan',
    objectives: [
      'Apply CIA, risk, identity, certificates, encryption, and physical controls to network decisions.',
      'Recognize attack evidence without collapsing vulnerability, exploit, threat, and impact.',
      'Implement least privilege, segmentation, NAC, filtering, and hardening with verification.',
    ],
    skills: [
      [
        'net-cia-risk-terms',
        'Distinguish confidentiality, integrity, availability, risk, threat, vulnerability, exploit, likelihood, and impact.',
        'A vulnerability is the same thing as an active attacker exploiting it.',
      ],
      [
        'net-encryption-certificates-pki',
        'Protect data in transit and at rest and explain certificates, PKI trust, self-signed limits, key management, and rotation.',
        'Encryption automatically authenticates the peer and protects key storage.',
      ],
      [
        'net-iam-authentication',
        'Use MFA, SSO, RADIUS, LDAP, SAML, TACACS+, time-based authentication, authorization, RBAC, and least privilege appropriately.',
        'Authentication proves what an identity is allowed to do.',
      ],
      [
        'net-physical-deception-compliance',
        'Apply cameras, locks, geofencing, honeypots, honeynets, audits, data locality, PCI DSS, and GDPR within their actual scope.',
        'Deploying a honeypot prevents attackers from reaching production systems.',
      ],
      [
        'net-segmentation-zones',
        'Enforce trusted, untrusted, screened, guest, BYOD, IoT, IIoT, SCADA, ICS, and OT boundaries with explicit flows.',
        'Internal segmentation is unnecessary when the internet edge has a firewall.',
      ],
      [
        'net-layer2-attacks',
        'Explain VLAN hopping, MAC flooding, ARP poisoning or spoofing, rogue DHCP, and their switching impact and evidence.',
        'Encryption at the application layer prevents every Layer 2 attack.',
      ],
      [
        'net-wireless-name-attacks',
        'Explain evil twin, rogue AP, DNS poisoning or spoofing, and on-path behavior with detection and user impact.',
        'A familiar SSID proves an access point belongs to the organization.',
      ],
      [
        'net-dos-social-malware',
        'Explain DoS or DDoS, phishing, dumpster diving, shoulder surfing, tailgating, and malware network impact.',
        'Network controls can fully prevent every social-engineering compromise.',
      ],
      [
        'net-device-hardening-nac',
        'Disable unused ports and services, change defaults, use port security, 802.1X, MAC filtering limits, and key management.',
        'MAC filtering provides strong identity because MAC addresses cannot be changed.',
      ],
      [
        'net-acl-filtering',
        'Design ordered ACL, URL, and content filtering rules with least privilege, state, direction, logging, and exception review.',
        'An ACL automatically evaluates the most specific rule before earlier rules.',
      ],
    ],
  },
  {
    id: 'network-troubleshooting',
    title: 'Physical, Service, and Performance Troubleshooting',
    context:
      'Resolve a multi-symptom campus incident across cabling, interfaces, switching, routing, addressing, wireless, and application performance.',
    artifact: 'an evidence-backed incident resolution packet',
    objectives: [
      'Diagnose physical and interface counters before replacing devices blindly.',
      'Trace switching, routing, addressing, and service dependencies.',
      'Separate bandwidth, throughput, latency, loss, jitter, congestion, and wireless causes.',
    ],
    skills: [
      [
        'net-cable-faults',
        'Diagnose wrong media, category, shielding, crosstalk, interference, attenuation, termination, polarity, and TX or RX transposition.',
        'A link light proves cabling meets speed and error requirements.',
      ],
      [
        'net-interface-counters',
        'Interpret CRC, runts, giants, drops, errors, negotiation, and port status trends with time and traffic context.',
        'Any CRC counter value proves the cable is currently defective.',
      ],
      [
        'net-poe-transceiver-faults',
        'Diagnose PoE budget or standard problems and transceiver protocol, wavelength, fiber, distance, and signal mismatches.',
        'A powered endpoint proves the switch has enough PoE budget for all ports.',
      ],
      [
        'net-stp-vlan-acl-faults',
        'Diagnose loops, root selection, port roles and states, VLAN assignment, trunking, and ACL direction or order.',
        'A blocked spanning-tree port is always a fault that should be enabled.',
      ],
      [
        'net-route-address-faults',
        'Diagnose route table, default route, gateway, IP, duplicate address, subnet mask, and pool-exhaustion failures.',
        'If the destination route exists, the return path must also exist.',
      ],
      [
        'net-congestion-capacity',
        'Distinguish congestion, contention, bottleneck, bandwidth, throughput, and capacity using baselines and path evidence.',
        'A high interface speed guarantees high end-to-end application throughput.',
      ],
      [
        'net-latency-loss-jitter',
        'Measure and relate latency, packet loss, jitter, retransmission, queueing, and application tolerance.',
        'Average latency alone reveals packet loss and jitter behavior.',
      ],
      [
        'net-wireless-performance-faults',
        'Diagnose channel overlap, interference, signal loss, insufficient coverage, disassociation, roaming, and capacity.',
        'Increasing AP transmit power fixes weak coverage without affecting clients or roaming.',
      ],
    ],
  },
  {
    id: 'network-tools-capstone',
    title: 'Tools, Device Commands, PBQs, and Certification Capstone',
    context:
      'Use software, hardware, discovery, capture, and device evidence to design, implement, secure, operate, and repair a branch network.',
    artifact: 'a performance-based branch network capstone',
    objectives: [
      'Choose the least invasive tool that can falsify the current theory.',
      'Interpret host, discovery, capture, cable, wireless, and device command evidence.',
      'Integrate every N10-009 domain in performance-based tasks and a final exam.',
    ],
    skills: [
      [
        'net-host-cli-tools',
        'Use ping, traceroute or tracert, nslookup, dig, netstat, ip, ifconfig, ipconfig, arp, and tcpdump with platform-aware interpretation.',
        'A successful ping proves DNS, transport ports, and the application are healthy.',
      ],
      [
        'net-protocol-nmap',
        'Use protocol analyzers and authorized Nmap discovery or service probes with scope, timing, vantage, and false-result awareness.',
        'A closed or filtered port always proves the destination service is stopped.',
      ],
      [
        'net-discovery-speed-tools',
        'Use LLDP or CDP and speed tests while accounting for device support, advertisement trust, test path, server, and competing load.',
        'An internet speed test measures the capacity of every internal network segment.',
      ],
      [
        'net-hardware-tools',
        'Choose toner, cable tester, tap, Wi-Fi analyzer, and visual fault locator with correct media, safety, and evidence limits.',
        'A toner certifies cable category, wire map, length, and throughput.',
      ],
      [
        'net-device-show-commands',
        'Interpret MAC table, route, interface, configuration, ARP, VLAN, and power command outputs without assuming vendor syntax.',
        'One show command provides enough context to change production configuration.',
      ],
      [
        'net-pbq-integration',
        'Solve performance-based configuration and troubleshooting tasks by preserving requirements, recording state, and verifying all paths.',
        'PBQs reward rapid trial-and-error changes more than planned verification.',
      ],
      [
        'net-certification-evidence',
        'Defend a complete design, implementation, operations, security, recovery, and troubleshooting result against N10-009 objectives.',
        'Memorizing acronyms and port numbers demonstrates complete Network Plus readiness.',
      ],
    ],
  },
];

const projects = [
  {
    id: 'branch-address-switch-plan',
    afterModuleId: 'network-switching',
    title: 'Addressed and Segmented Branch Network',
    stakeholder: 'A nonprofit opening a fifty-user branch office',
    userNeed:
      'Staff, voice, guests, management, printers, and growth need documented routed and switched connectivity.',
    constraints: [
      'VLSM allocation has no overlap',
      'Redundant switching cannot create loops',
      'Every VLAN path and rollback is verified',
    ],
    competencyIds: [
      'net-ipv4-address-plan',
      'net-routing-table-forwarding',
      'net-vlan-database-access',
      'net-trunks-native-voice',
      'net-spanning-tree',
      'net-link-aggregation',
    ],
    rubricDimensions: [
      'Address and route correctness',
      'Switching resilience and verification',
      'Documentation and rollback quality',
    ],
  },
  {
    id: 'secure-wireless-site',
    afterModuleId: 'network-security',
    title: 'Secure Community Center Wireless Deployment',
    stakeholder: 'A community center serving staff, learners, guests, and managed devices',
    userNeed:
      'Users need reliable wireless access with appropriate identity, isolation, coverage, capacity, and support evidence.',
    constraints: [
      'Guest and internal paths are isolated',
      'Coverage and capacity use measured evidence',
      'Management access requires least privilege and MFA',
    ],
    competencyIds: [
      'net-wifi-channels-width',
      'net-wpa-authentication',
      'net-wireless-survey-roaming',
      'net-segmentation-zones',
      'net-device-hardening-nac',
      'net-acl-filtering',
    ],
    rubricDimensions: [
      'RF design and measured validation',
      'Identity and segmentation strength',
      'Operations and troubleshooting readiness',
    ],
  },
  {
    id: 'network-operations-incident',
    afterModuleId: 'network-troubleshooting',
    title: 'Network Operations and Incident Recovery',
    stakeholder: 'An operations team responsible for a hybrid campus and cloud service',
    userNeed:
      'Operators need monitoring, change, recovery, and troubleshooting evidence that restores service without unsafe guessing.',
    constraints: [
      'Every change has authority and rollback',
      'Recovery meets stated RPO and RTO',
      'Root cause uses correlated device and user evidence',
    ],
    competencyIds: [
      'net-change-configuration',
      'net-snmp',
      'net-log-siem-api',
      'net-rpo-rto',
      'net-dr-testing',
      'net-route-address-faults',
      'net-latency-loss-jitter',
    ],
    rubricDimensions: [
      'Incident method and root cause',
      'Operational evidence and safety',
      'Recovery and prevention quality',
    ],
  },
  {
    id: 'network-plus-branch-capstone',
    afterModuleId: 'network-tools-capstone',
    title: 'N10-009 Branch Network Capstone',
    stakeholder: 'A growing organization connecting a branch, cloud services, and remote operators',
    userNeed:
      'The organization needs a complete design, implementation plan, security model, monitoring package, and repaired failure scenario.',
    constraints: [
      'Covers all five N10-009 domains',
      'Includes at least three performance-based tasks',
      'Every claim cites configuration command capture or measurement evidence',
    ],
    competencyIds: [
      'net-certification-evidence',
      'net-pbq-integration',
      'net-device-show-commands',
      'net-infrastructure-code',
      'net-cloud-gateways-connectivity',
      'net-incident-documentation',
    ],
    rubricDimensions: [
      'Cross-domain technical correctness',
      'Performance-based verification',
      'Professional evidence and communication',
    ],
  },
];

const finalExamCompetencyIds = [
  'net-troubleshooting-method',
  'net-osi-layers',
  'net-encapsulation-pdus',
  'net-routing-switching-appliances',
  'net-standard-ports',
  'net-ethernet-media',
  'net-campus-datacenter-architecture',
  'net-cidr-network-range',
  'net-vlsm-allocation',
  'net-ipv6-transition',
  'net-sdn-sdwan-vxlan',
  'net-routing-table-forwarding',
  'net-nat-pat',
  'net-trunks-native-voice',
  'net-spanning-tree',
  'net-wifi-channels-width',
  'net-wpa-authentication',
  'net-ups-pdu-load',
  'net-dhcp-relay',
  'net-dns-security-privacy',
  'net-site-client-vpn',
  'net-change-configuration',
  'net-flow-packet-baseline',
  'net-rpo-rto',
  'net-segmentation-zones',
  'net-layer2-attacks',
  'net-device-hardening-nac',
  'net-interface-counters',
  'net-route-address-faults',
  'net-latency-loss-jitter',
  'net-host-cli-tools',
  'net-device-show-commands',
  'net-pbq-integration',
];

export const networkPlusConfig = {
  id: 'comptia-network-plus',
  title: 'CompTIA Network+ N10-009 Applied Networking',
  version: 'N10-009-2.0.0',
  researchedAt: '2026-07-13T00:00:00.000Z',
  modules,
  projects,
  finalExamCompetencyIds,
  masteryThresholdPercent: 85,
  minimumQuestionBankSize: 450,
  examContext:
    'Solve unfamiliar multiple-choice and performance-based network concepts, implementation, operations, security, and troubleshooting cases at current N10-009 weighting and depth.',
  audience: {
    description:
      'Entry-level network technicians and support professionals who need vendor-neutral N10-009 knowledge plus repeated practical design, command, capture, security, operations, and troubleshooting experience.',
    entryKnowledge: [
      'Operate a computer, terminal, browser, and basic file system; nine to twelve months of networking exposure is recommended but not required.',
    ],
    deviceConstraints: [
      'Desktop or tablet browser; optional packet-capture and virtual network lab tools',
    ],
    accessibilityAssumptions: [
      'Learners may use keyboard navigation, zoom, screen readers, voice input, or reduced motion; diagrams require equivalent structured text.',
    ],
  },
  scope: {
    includes: [
      'All CompTIA Network Plus N10-009 objectives and domain weights',
      'Vendor-neutral performance-based configuration, packet, design, security, and troubleshooting practice',
      'Four cumulative branch, wireless, operations, and certification projects',
    ],
    excludes: [
      'Vendor-specific expert command memorization',
      'Live unauthorized scanning or production changes',
    ],
    nextCourses: ['network-engineering-labs'],
  },
  sources: [
    {
      title: 'CompTIA Network Plus N10-009 Exam Objectives',
      authority: 'certification-objectives',
      url: 'https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf',
      version: 'N10-009 v4.0',
      reviewedAt: '2026-07-13',
      scope:
        'Controls every certification domain, objective, acronym, tool, protocol, and performance-based scope decision.',
    },
    {
      title: 'Internet Protocol Version 6 Specification',
      authority: 'standard',
      url: 'https://www.rfc-editor.org/rfc/rfc8200',
      version: 'RFC 8200',
      reviewedAt: '2026-07-13',
      scope:
        'Controls IPv6 packet, addressing, extension, and transition explanations at foundational depth.',
    },
    {
      title: 'Zero Trust Architecture',
      authority: 'standard',
      url: 'https://csrc.nist.gov/pubs/sp/800/207/final',
      version: 'NIST SP 800-207',
      reviewedAt: '2026-07-13',
      scope:
        'Controls zero-trust terminology, policy decision, trust, identity, and least-privilege coverage.',
    },
    {
      title: 'IEEE 802.3 Ethernet Standard',
      authority: 'standard',
      url: 'https://standards.ieee.org/ieee/802.3/10422/',
      version: 'IEEE 802.3-2022',
      reviewedAt: '2026-07-13',
      scope: 'Controls Ethernet media, link, speed, duplex, and physical-layer terminology.',
    },
  ],
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await generateCourseBlueprint(networkPlusConfig);
  console.log(
    `Generated Network Plus blueprint: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
  );
}
