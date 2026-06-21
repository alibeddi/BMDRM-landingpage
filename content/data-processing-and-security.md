---
title: "Data Processing & Security"
meta_title: "Data Processing & Security Overview | BMDRM"
description: "How BMDRM processes data and protects information across our secure video hosting, encryption, and DRM streaming platform."
draft: false
---

**Last Updated:** May 19, 2026

## 1. Introduction

This Data Processing & Security Overview describes how BMDRM ("BMDRM," "we," "our," or "us") processes data and protects information across our secure video hosting, encryption, and DRM streaming platform (the "Services"). It supplements our [Privacy Policy](/privacy-policy/), [Terms of Service](/terms-of-service/), and any executed Data Processing Agreement ("DPA").

This document is intended to give customers, security reviewers, compliance teams, and integration partners a clear, enterprise-grade view of our data handling and security posture.

## 2. Data Roles

### 2.1 BMDRM as Data Controller

BMDRM acts as a **Data Controller** for:

- Account registration and profile data.
- Billing and tax-related information.
- Customer support communications.
- Platform usage analytics that we collect for our own operational and security purposes.

### 2.2 BMDRM as Data Processor

BMDRM acts as a **Data Processor** for:

- Customer Content, including videos, audio, subtitles, thumbnails, watermark configurations, and embedded metadata.
- Any personal data that customers or their end users introduce into the Services as part of Customer Content (e.g., personal data appearing in subtitles, descriptions, or viewer access lists).
- Files and folders imported from connected cloud storage providers (such as Google Drive, OneDrive, Dropbox, S3-compatible storage, or FTP/SFTP servers).

When acting as a Processor, BMDRM processes data **solely on the documented instructions of the customer** and in accordance with the executed DPA.

## 3. Purposes of Processing

BMDRM processes Customer Content and related data **only** to:

- Import content from sources designated by the customer.
- Transcode, package, and prepare content for adaptive streaming.
- Encrypt content and apply DRM and watermarking.
- Host content on secure storage.
- Deliver content via secure streaming and content delivery networks.
- Provide playback analytics and operational telemetry.
- Maintain backups and ensure service continuity.
- Provide support and troubleshoot at the customer's request.
- Detect, prevent, and respond to security incidents and abuse.

We do **not**:

- Sell Customer Content or any personal data.
- Use Customer Content for advertising or marketing.
- Scan Customer Content for behavioral profiling or third-party marketing.
- Use Customer Content to train machine learning models for third parties.

## 4. Cloud Storage Connectors

BMDRM integrates with third-party storage providers including Google Drive, Microsoft OneDrive, Dropbox, FTP/FTPS/SFTP servers, and Amazon S3-compatible storage. For all connectors:

- Connections are **initiated by the user**.
- BMDRM requests the **minimum OAuth scopes or credentials** required for the selected functionality.
- BMDRM accesses **only files and folders that the user explicitly selects**.
- OAuth access tokens and refresh tokens are stored encrypted at rest.
- Tokens are used solely to perform user-initiated operations (browsing selected folders, importing selected files, refreshing metadata).
- Users may revoke access at any time from the BMDRM dashboard or from the third-party provider; upon revocation, the associated tokens are destroyed.

Use of Google APIs is described in detail in the [Google API Services User Data Disclosure](/google-api-services-disclosure/).

## 5. Sub-processors

BMDRM relies on a vetted set of sub-processors for infrastructure hosting, content delivery, transcoding compute, monitoring, customer support tooling, and payment processing. Each sub-processor is engaged under a written agreement requiring:

- Confidentiality.
- Implementation of appropriate technical and organizational measures.
- Compliance with applicable data protection laws.
- Restrictions on the further engagement of sub-processors.

A current list of sub-processors is available to customers on request via **contact@bmdrm.com**. We provide advance notice of material changes to our sub-processor list where required.

## 6. International Data Transfers

Where customer data is transferred across borders, BMDRM relies on lawful transfer mechanisms, including:

- European Commission Standard Contractual Clauses ("SCCs").
- UK International Data Transfer Addendum.
- Equivalent safeguards under applicable national laws.

Customers may select preferred processing regions for certain workloads where supported by their plan.

## 7. Security Program

BMDRM maintains a comprehensive information security program based on industry-recognized practices.

### 7.1 Encryption

- **In transit:** All connections to the BMDRM dashboard, APIs, and player endpoints are protected by TLS 1.2 or higher with modern cipher suites.
- **At rest:** Customer Content, OAuth tokens, credentials, and sensitive configuration data are encrypted at rest using strong symmetric algorithms (e.g., AES-256).
- **DRM:** Streaming content can be protected by industry DRM systems and additional packaging-layer encryption.

### 7.2 Key Management

- Cryptographic keys are generated, stored, and rotated using managed key management services with strict access controls.
- Separation of duties applies between key custodians and operational personnel.
- Sensitive keys are never stored alongside the data they protect.

### 7.3 Access Controls

- Role-based access controls ("RBAC") with least-privilege principles.
- Multi-factor authentication ("MFA") for privileged access to production systems.
- Just-in-time access for sensitive operations where applicable.
- Regular access reviews and timely deprovisioning of departing personnel.

### 7.4 Network and Infrastructure Security

- Segmented production environments with restricted ingress and egress.
- Web application firewalling and DDoS mitigation at the edge.
- Hardened images, patch management, and configuration baselines.
- Continuous infrastructure monitoring and anomaly detection.

### 7.5 Application Security

- Secure software development lifecycle practices.
- Code review and dependency vulnerability scanning.
- Static and dynamic application security testing.
- Periodic third-party penetration testing.

### 7.6 Audit Logging and Monitoring

- Centralized, tamper-resistant logging of administrative actions, authentication events, and significant API operations.
- 24/7 monitoring with alerting and on-call response.
- Regular review of security events and detection rules.

### 7.7 Backups and Resilience

- Encrypted backups with regularly tested restoration procedures.
- Architectural redundancy across availability zones.
- Documented business continuity and disaster recovery plans.

### 7.8 Personnel Security

- Background checks where permitted by law.
- Mandatory security and privacy training upon onboarding and annually.
- Confidentiality obligations in employment and contractor agreements.

## 8. Incident Response

BMDRM maintains a documented incident response plan covering identification, containment, eradication, recovery, and post-incident review. In the event of a personal data breach affecting customer data, we will:

- Notify affected customers without undue delay and in accordance with our DPA and applicable law.
- Provide relevant facts, mitigation steps, and recommended customer actions.
- Cooperate with customers and competent authorities as required.

## 9. Data Retention and Deletion

- Customer Content is retained according to customer configuration and is deleted upon customer instruction or account termination, subject to short, security-controlled backup retention windows.
- OAuth tokens are destroyed when an integration is revoked or an account is terminated.
- Operational logs are retained for a limited period (typically up to 24 months) for security, audit, and operational purposes.

## 10. Customer Responsibilities

To maintain a strong security posture, customers should:

- Configure access controls, signed URLs, and playback restrictions appropriate to their use case.
- Protect their account credentials and API keys.
- Manage user roles and revoke access for departing team members.
- Carefully select OAuth scopes and integration permissions.
- Review playback domains, watermarking, and DRM settings before publishing sensitive content.

## 11. Audits and Compliance Cooperation

BMDRM cooperates with customer security reviews under reasonable terms. Available materials may include:

- Security questionnaires and architectural overviews.
- Summary results of independent assessments where applicable.
- Documentation of policies and processes upon request and subject to confidentiality.

We do **not** publish or claim certifications or attestations we do not hold; the current status of any third-party assessments is available on request.

## 12. Contact

For questions about our data processing and security practices, including DPA requests and sub-processor information, contact:

**BMDRM Security & Compliance**
Email: **contact@bmdrm.com**
