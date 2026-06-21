---
title: "Google API Services User Data Disclosure"
meta_title: "Google API Services User Data Disclosure | BMDRM"
description: "How BMDRM uses Google APIs, including OAuth scopes, data handling, security, and the Limited Use commitment."
draft: false
---

**Last Updated:** May 19, 2026

## 1. Overview

BMDRM ("BMDRM," "we," "our," or "us") operates a secure video hosting, encryption, and DRM streaming platform (the "Services"). To allow customers to import video content stored in Google Drive, BMDRM integrates with Google APIs, including Google OAuth 2.0 and the Google Drive API.

This page describes, in clear and specific terms, what Google user data BMDRM accesses, how that data is used, how it is stored and protected, and how users can revoke access at any time.

## 2. Limited Use Affirmation

> **BMDRM's use and transfer of information received from Google APIs to any other app will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.**

We confirm that information obtained through Google APIs is used only to provide or improve user-facing features that are prominent in the BMDRM experience, in line with Limited Use requirements. Specifically:

- We do **not** use Google user data to serve advertisements.
- We do **not** sell Google user data.
- We do **not** transfer Google user data to third parties for purposes unrelated to providing or improving the user-facing features of the Services.
- We do **not** allow humans to read Google user data unless we have the user's affirmative consent for specific files, doing so is necessary for security purposes (such as investigating abuse), to comply with applicable law, or for internal operations where the data has been aggregated and anonymized.
- We do **not** use Google user data to develop, improve, or train generalized or non-personalized AI and machine learning models.

## 3. Why BMDRM Requests Google Drive Access

BMDRM requests access to Google Drive solely to allow users to **import video content** that they own or are authorized to use into the BMDRM platform.

Specifically, Google Drive access is used to:

- **Browse** the user's Google Drive to display selectable files and folders (only those the user chooses to navigate).
- **Read metadata** (file name, size, MIME type, modification date) for files the user selects.
- **Download** the specific files that the user selects for import into BMDRM.
- **Process** the imported files for transcoding, encryption, packaging, watermarking, secure hosting, and DRM-protected streaming, in accordance with the user's instructions.

## 4. How Access Is Initiated

- Access to a Google account is **initiated only by the user** via the standard Google OAuth 2.0 consent flow.
- BMDRM does **not** pre-fetch, pre-scan, or access Google Drive content before explicit user authorization.
- During consent, Google displays the specific scopes BMDRM is requesting; users may approve or decline.
- BMDRM requests the **minimum scopes** necessary to provide the import functionality the user has selected.

## 5. OAuth Scopes

BMDRM requests only the scopes required for the specific feature being used. Typical scopes include:

- A read-only Drive scope sufficient to list and download files the user selects.
- Where appropriate, narrower per-file scopes are used so BMDRM can access **only** the files explicitly chosen by the user via Google's Picker or equivalent selection UI.

We continually review our scope usage and reduce it whenever feasible. Where the broader `drive.readonly` scope is requested, it is solely to provide the file-import functionality described above and is **not** used to enumerate, index, or otherwise read files the user has not selected.

## 6. What BMDRM Does With Imported Files

Once a user selects a file for import, BMDRM uses it **only** to:

1. **Import** the file into the user's BMDRM account.
2. **Process** the file (e.g., probe, validate, generate thumbnails).
3. **Transcode** the file into adaptive streaming formats.
4. **Encrypt and package** the file for DRM-protected delivery.
5. **Apply watermarking** if configured by the user.
6. **Host** the resulting protected assets on BMDRM secure storage.
7. **Stream** the content securely to the audiences authorized by the user.

Imported files are **not** used for advertising, sold, scanned for marketing, profiled, or used to train third-party machine learning models.

## 7. Storage and Security of Google Data

- **OAuth tokens:** Google access tokens and refresh tokens are stored encrypted at rest using strong cryptographic algorithms and are never logged in plaintext. Token access is restricted via role-based access controls and audit logging.
- **Imported files:** Files imported from Google Drive are stored in BMDRM's encrypted infrastructure, subject to the same security controls applicable to all Customer Content (see [Data Processing & Security Overview](/data-processing-and-security/)).
- **Transport security:** All traffic between BMDRM, Google APIs, and the user's browser is protected by TLS 1.2 or higher.
- **Key management:** Cryptographic keys are managed via a dedicated key management service with strict access policies.
- **Monitoring:** Access to systems that handle Google user data is monitored, and anomalous activity is alerted on and investigated.

## 8. Revoking Access

Users may revoke BMDRM's access to their Google account at any time. Revocation can be performed:

- From the BMDRM dashboard, by disconnecting the Google Drive integration.
- From the Google Account permissions page at [https://myaccount.google.com/permissions](https://myaccount.google.com/permissions).

Upon revocation:

- BMDRM's stored access and refresh tokens for that connection are destroyed.
- Future API calls to Google on behalf of that user cease.
- Files that were already imported into BMDRM remain in the user's BMDRM account, subject to the user's content management settings. Users may delete those imported assets from BMDRM at any time.

## 9. Data Sharing

BMDRM does **not** share Google user data with third parties other than:

- Vetted infrastructure sub-processors strictly necessary to provide the Services (e.g., cloud hosting, CDN), under written agreements requiring confidentiality and appropriate safeguards.
- As required by law, regulation, or valid legal process.

A current list of sub-processors is available on request via **contact@bmdrm.com**.

## 10. Data Retention

- OAuth tokens are retained while the integration is active and destroyed upon revocation or account termination.
- Imported files are retained as Customer Content according to the user's configuration and deletion instructions.
- Operational logs containing references to Google API operations are retained for a limited period for security, audit, and operational purposes.

## 11. Changes to This Disclosure

We may update this disclosure to reflect changes in functionality, scopes, or Google policies. Material changes will be reflected by an updated "Last Updated" date and, where appropriate, communicated to users in the application.

## 12. Contact

For questions about BMDRM's use of Google APIs, OAuth scopes, or this disclosure, contact:

**BMDRM Privacy & Compliance**
Email: **contact@bmdrm.com**
