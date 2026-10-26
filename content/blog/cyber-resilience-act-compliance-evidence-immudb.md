---
title: "Cyber Resilience Act: Compliance Evidence With immudb"
date: 2026-10-26
description: "Learn how immudb helps manufacturers build verifiable Cyber Resilience Act compliance evidence for Linux vulnerability detection, patching, and audits."
excerpt: "A patch report says that a vulnerability was fixed. Six months later, can your team show which devices received the patch, what the follow-up checks found, and whether those records have changed?"
tags: ["immudb", "compliance", "cyber-resilience-act", "audit-log", "immutability"]
keywords: ["Cyber Resilience Act", "CRA compliance", "immudb", "vulnerability remediation evidence", "tamper-proof audit log", "Regulation (EU) 2024/2847"]
image: "/blog/cyber-resilience-act-immudb-preview.png"
---
![Industrial gateways sending security records to a database with cryptographic verification.](/blog/cyber-resilience-act-immudb-preview.png)

A patch report says that a vulnerability was fixed. Six months later, can your team show which devices received the patch, what the follow-up checks found, and whether those records have changed?

For manufacturers of Linux-based products, that is a practical challenge when preparing Cyber Resilience Act compliance evidence. Security teams need records they can retrieve, explain, and check long after the work is done.

[immudb](https://immudb.io/) can help by making changes to stored records detectable through cryptographic verification. It can strengthen the evidence behind a compliance assessment, although the CRA does not require immudb or any particular database.

## What the Cyber Resilience Act requires manufacturers to document

The EU Cyber Resilience Act, Regulation (EU) 2024/2847, sets cybersecurity requirements for products with digital elements within its scope. Several provisions matter when designing an evidence system:

- **Article 13(7):** Manufacturers must systematically document relevant cybersecurity aspects, including vulnerabilities they become aware of.
- **Annex I, Part II:** Vulnerability handling includes identifying and documenting vulnerabilities, addressing and remediating them without delay, and providing secure update mechanisms.
- **Annex VII:** Technical documentation must describe vulnerability handling, production and monitoring processes, and include relevant conformity test reports.

These obligations concern both the security work and the documentation supporting it. See the [official CRA text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R2847).

The main CRA obligations apply from **11 December 2027**. Article 14 reporting obligations for actively exploited vulnerabilities and severe security incidents apply from **11 September 2026**. The [European Commission's CRA overview](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) explains the implementation timeline.

## Where conventional audit logs can fall short

Files, relational databases, and centralized logging platforms can all hold useful security evidence. The weakness appears when someone who controls the system can also rewrite its history.

An attacker with privileged access might remove a failed deployment record. An administrator might overwrite a package version while correcting a mistake. Without a separate integrity check, a reviewer may have no way to distinguish the original history from a revised one.

Some logging systems already address this through protected storage, signatures, or external verification. When evaluating your own setup, ask whether a reviewer can detect changes without relying entirely on the server holding the records.

## How immudb makes security records verifiable

immudb uses an append-only transaction log with cryptographic hashing and Merkle-tree structures. Transactions have sequential identifiers, and database states summarize the committed history. A client can use proofs to check data integrity and consistency with a previously trusted state. The [immudb architecture documentation](https://immudb.io/docs/immudb/) describes this design.

For key-value integrations, SDK operations such as `VerifiedSet` and `VerifiedGet` perform proof verification as part of writing or reading data. Method names and capabilities depend on the SDK and API you use. See the [verified read and write documentation](https://immudb.io/docs/develop/reading/).

The trusted state needs protection too. Keep previously verified states outside the database server's administrative control, and run verification from a separate environment. immudb's [auditor documentation](https://immudb.io/docs/production/auditor/) recommends an independent auditor component.

This gives reviewers a way to check whether supplied records remain consistent with an earlier trusted history. It does not stop someone from destroying storage or make backups unnecessary.

## Example: documenting Linux vulnerability remediation

Consider a hypothetical manufacturer with 10,000 Linux-based industrial gateways. Its security platform identifies an OpenSSH vulnerability affecting 2,000 devices.

The team assigns a remediation identifier and records events for each affected device. A useful evidence record could include:

| Stage | Evidence to capture |
| --- | --- |
| Detection | Device ID, CVE, installed package version, assessment time, scanner identity, and finding |
| Remediation | Approved patch, package checksum, deployment time, executing agent, and result |
| Configuration | Applicable policy, relevant SSH configuration changes, and validation output |
| Verification | Installed package version after deployment, follow-up scan, remaining findings, and status |

Write events as they occur, including failures, retries, and exceptions. Use a separate event ID for each record and link it to the device and remediation identifiers. Record corrections as new events that refer to the earlier record.

![Remediation workflow feeding immudb, with an independent verifier checking records and proofs against a trusted prior state.](/blog/immudb-vulnerability-remediation-evidence.png)

*Conceptual workflow. Capture evidence at every stage; do not wait until remediation is complete to record it.*

Six months later, an auditor requests the history for a sample of gateways. The manufacturer retrieves the linked events and verifies the relevant proofs against states preserved by its independent verification process.

The reviewer can inspect the recorded findings, patch attempts, configuration changes, and follow-up results. Verification helps establish the integrity of those records. The reviewer still needs to assess whether the collection process was reliable and the remediation was adequate.

## What immutable records cannot prove

A false report can be stored with perfect integrity. If a compromised device claims that a patch succeeded, cryptographic verification alone cannot expose that false claim.

For this reason, the evidence pipeline needs controls around collection and storage:

- **Authenticated sources:** Identify the device, agent, or service submitting each event and restrict its permissions.
- **Reliable timing:** Capture event and receipt times, synchronize clocks, and use trusted timestamping where stronger time evidence is needed. Transaction order alone does not prove wall-clock time.
- **Complete collection:** Monitor missing devices, failed submissions, queue backlogs, and gaps in expected events.
- **Retention and recovery:** Preserve records, referenced artifacts, backups, and verification states for the period your obligations require. Test that you can retrieve and verify them.

These are implementation considerations for a trustworthy evidence pipeline, rather than a substitute for assessing the CRA requirements that apply to your product.

## Using immudb in a CRA evidence pipeline

Start with one workflow, such as OpenSSH patching across a gateway fleet. Define the evidence a reviewer would need, connect each event to a device and remediation case, and check the history from detection through follow-up validation.

Then test the audit process itself. Retrieve a sample case, verify its records against independently retained states, and account for failed updates and devices that were offline.

immudb's role is specific: it helps you check the integrity of recorded history. Combined with reliable collection and a documented vulnerability handling process, that makes security records more useful during CRA compliance assessments and incident investigations.

To explore an implementation, start with the [immudb documentation](https://immudb.io/docs/immudb/).
