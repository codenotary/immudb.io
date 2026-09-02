---
title: "From AWS QLDB to immudb: A French Financial Services Company Success Story"
date: 2025-02-06
excerpt: "When AWS announced the discontinuation of its Quantum Ledger Database (QLDB), financial institutions that relied on its immutable ledger capabilities were forced to find alternative solutions. For"
tags: []
author: "Moshe"
image: "/blog/from-aws-qldb-to-immudb-a-french-financial-servi-1.png"
source: "https://immudb.io/blog/from-aws-qldb-to-immudb-a-french-financial-services-company-success-story"
---
When AWS announced the discontinuation of its Quantum Ledger Database (QLDB), financial institutions that relied on its immutable ledger capabilities were forced to find alternative solutions. For one French financial services company, this posed a major challenge, as their trade finance document exchange with other banks relied heavily on QLDB’s ability to provide verifiable, tamper-proof documents. Instead of viewing this as a setback, this customer saw an opportunity to innovate and chose to migrate to immudb, an open-source immutable database. The result? A more flexible, cost-effective, and resilient system for trade finance document tracking.

This financial institute had been using AWS QLDB to manage critical trade finance documents, ensuring compliance with international regulations while providing an auditable trace of document workflow. With AWS announcing the termination of QLDB, this organization faced multiple risks:

- **Data Integrity:** They needed to maintain the same level of immutability and verifiability.

- **Regulatory Compliance:** Trade finance transactions are subject to strict financial regulations, requiring auditability and transparency.

- **Minimal Downtime:** A migration process that could disrupt business operations was unacceptable.

- **Cost and Vendor Lock-in:** The opportunity to move away from cloud dependency and potential cost escalations.

Their development team began evaluating alternative solutions, prioritizing security, transparency, and performance.

![](/blog/from-aws-qldb-to-immudb-a-french-financial-servi-1.png)

## immudb

After extensive evaluation, **immudb** emerged as the best choice for their needs. Unlike traditional relational databases, immudb is designed for high-performance, tamper-proof storage with cryptographic verification, making it a perfect fit for financial applications. Here’s why immudb stood out:

- **Immutable Storage:** Ensures that once trade finance documents are stored, they cannot be altered or deleted.

- **Cryptographic Verification:** Provides cryptographic proofs for every record, reinforcing trust in document authenticity.This is critically important also vis-a-vis their regulators.

- **Self-Hosted & Cloud-Agnostic:** Unlike QLDB, immudb can be deployed on-premises or in any cloud environment, eliminating vendor lock-in.

- **High Performance & Scalability:** Supports fast, immutable transactions even at high data loads.

- **Open-Source & Cost-Effective:** No licensing fees, with the flexibility to customize according to business needs.

## The Migration Process

To ensure a seamless transition from QLDB to immudb, they devised a **three-phase migration strategy**:

## 1. Planning & Data Mapping

The IT team performed a detailed analysis of the existing QLDB schema and mapped it to immudb. Key tasks included:

- Understanding QLDB’s journal-based architecture and translating it into immudb’s append-only model.

- Defining access controls to ensure compliance with GDPR and trade finance regulations.

- Setting up a staging environment to test data migration without impacting live operations.

### 2. Data Migration & Validation

To minimize risk, the migration followed an incremental approach:

- Historical data was exported from QLDB using Amazon’s bulk export tools.

- Data was ingested into immudb using automated scripts that preserved integrity and timestamps.

- The cryptographic verification feature was used to ensure that every migrated record matched the original ledger.

### 3. Integration & Testing

With data successfully migrated, this client focused on integrating immudb with existing applications, including:

- Document tracking portals used by trade finance partners.

- Regulatory reporting tools ensuring continued compliance.

- Internal APIs used by back-office teams for document verification.

Rigorous testing confirmed that immudb met all performance and security benchmarks, allowing for a smooth go-live transition.

## Result

The transition to immudb proved to be a game-changer leading to multiple benefits:

✅ **Regulatory Compliance:** Full auditability of trade finance documents was maintained, meeting financial regulators’ stringent requirements.

✅ **Enhanced Security:** Cryptographic proofs ensured every document was verifiable and tamper-proof.

✅ **Cost Savings:** Moving away from AWS’ managed service eliminated cloud dependency and reduced operating costs.

✅ **Performance Gains:** Faster document retrieval and transaction processing, even under heavy load.

**✅ Increased Control: **The ability to self-host immudb provided full ownership over data management and compliance strategies.

The shutdown of AWS QLDB could have been a major problem for this client’s trade finance operations, but instead, it became a catalyst for innovation. By migrating to immudb, they not only safeguarded its immutable ledger requirements but also gained more flexibility, security, and cost efficiency.

This success story demonstrates that **open-source, self-hosted solutions can provide a robust and future-proof alternative to proprietary cloud services**. For financial institutions looking to ensure data integrity in a post-QLDB world, **immudb offers a powerful solution that aligns with both technical and regulatory demands**.

**Are you facing a similar challenge with immutable databases?**
Learn more about how immudb can help your organization maintain integrity, security, and compliance in the face of evolving cloud services.
