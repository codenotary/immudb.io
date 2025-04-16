# immudb explained

<WrappedSection>

## What is immudb?

immudb is database with built-in cryptographic proof and verification. It can track changes in sensitive data and the integrity of the history will be protected by the clients, without the need to trust the server.

immudb can operate as a key-value, relational (SQL) or document database, making it a truly no-SQL database. You can add new transactions, but deletion or modification of older transactions isn’t allowed, thus making your data immutable. When a key record's value changes over time (such as a bank balance), you can get multiple instances with different timestamps to give you the complete history of that record's changes. You can store a variety of common data types, verification checksums, or JSON objects.

</WrappedSection>


<WrappedSection>

## What makes immudb special?

<FeatureTable/>

- **Keep track of changes and audit them.** Traditional database transactions and logs are hard to scale and are mutable, so there is no way to know for sure if your data has been compromised. immudb is immutable. You can add new versions of existing records, but never change or delete records. This lets you store critical data without fear of it being changed silently.

- **Verify your data without sacrificing performance.** Data stored in immudb is cryptographically coherent and verifiable, just like blockchains, but without all the complexity. Unlike blockchains, immudb can handle millions of transactions per second, and can be used both as a lightweight service or embedded in your application as a library.

- **Protect yourself from cyber attacks.** While Cyber Security is an important part of your organization’s business plan, immudb provides another layer of security to ensure data integrity even in the event your perimeter is breached during an attack. Data cannot be deleted or modified once stored into immudb. Additions of new data are logged and auditable, enabling you to view any suspect additions made during the intrusion.

</WrappedSection>

<WrappedSection>

## How can I use immudb?

Depending on your use case, immudb might function as your application's primary or as a secondary database. As a secondary, complimentary database, use immudb to cross-check the integrity of your important data (by verifying checksums or comparing stored data values). A secondary database enables you to quickly use immudb without completely re-engineering your existing application.

### Use cases

- Integration with your DevOps ensures code security throughout the development and deployment process. Embed immudb into your [Azure DevOps](https://codenotary.io/blog/securing-your-azure-devops-ecosystem-jenkins-and-kubernetes-aks/) with Jenkins and Kubernetes. Use just [Jenkins](https://codenotary.io/blog/jenkins-build-deployment-pipeline-a-how-to-for-ensuring-integrity/). Alternatively, integrate with [GitLab](https://codenotary.io/blog/fully-trusted-gitlab-pipeline/) or [GitHub](https://codenotary.io/blog/use-github-actions-for-validated-builds/).
- Guarantee File Integrity of your critical data. Examples include storing your organization's sensitive financial, credit card transactional, invoices, contracts, educational transcripts, and other important data.
- Ensure integrity of your legal Documents and Invoices, contracts, forms, and your downloads and emails.
- Save your Internet of Things (IoT) sensor data as a failsafe plan for loss of data.
- Keep your investment guidelines or stock market data tamperproof for your investment bank or client financial portfolios.
- Store important log files to keep them tamperproof to meet regulations like PCI compliance.
- Protect medical data, test results, or recipes from alteration.
- Companies use immudb to protect credit card transactions and to secure processes by storing digital certificates and checksums.

</WrappedSection>

<WrappedSection>

## Key value, Document and SQL

immudb can be used as a tamper-proof key value, document or SQL database, with audit history capabilities. Within single immudb instance a user can have multiple databases of both types, it is even possible to have KV, Document and SQL withing single database.

Key value is a foundation layer for Document and SQL, meaning that both Document and SQL are using key value store capabilities underneath.

</WrappedSection>

<WrappedSection>

## Standalone and Embeddable

immudb can be run as full database server with [replicas](production/replication.md) or easily [embedded](embedded/embedding.md) as a lightweight database into application.

</WrappedSection>

<WrappedSection>

## Running platforms

immudb server runs in most operating systems: BSD, Linux, OS X, Solaris, Windows, IBM z/OS.

</WrappedSection>

<WrappedSection>

## S3 Storage Backend

immudb can store its data in the Amazon S3 service (or a compatible alternative).

</WrappedSection>

<WrappedSection>

## How is immutability ensured?

immudb consistency can be verified by any external client or auditor by calculating transaction state and comparing it with one returned from immudb. The state is represented by a digest, which is calculated as part of the transaction commit phase. Calculating such a value in an accumulative manner ensures that any change already made cannot be reversed.

To increase security, immudb can be provisioned with a signing key to ensure non-repudiation of database states. The immudb server will subsequently sign the state on request from a client application.
That means that an auditor or a third party client, for instance, could verify the authenticity of the returned current state.

Check [auditor](production/auditor.md) section for additional details.

</WrappedSection>

<WrappedSection>

## Theoretical limits

immudb is an append-only, tamperproof database with key/value and SQL (Structured Query Language) application programming interfaces.

The immudb core persistence layer consists of a cryptographically-immutable log. Transactions are sequentially stored and uniquely identified by unsigned 64-bit integer values, thus setting a theoretical limit of 18446744073709551615 transactions (2^64 - 1).

In order to provide manageable limits, immudb is designed to set an upper bound to the number of key-value pairs included in a single transaction. The default value being 1024, so using default settings, the theoretical number of key-value pairs that can be stored in immudb is: 1024 * (2^64 - 1).

We designed immudb to require stable resources but not imposing strong limitations as most of the settings can be adjusted based on the use-case requirements.

While key-value pairs consist of arbitrary byte arrays, a maximum length may be set at database creation time. Both parameters can be increased as needed, considering:

- long keys may degrade performance (when querying data through the index)
- longer values requires more memory at runtime

Note: The cryptographic linking does not impose a practical restriction.

immudb relies on a file abstraction layer and does not directly interact with the underlying file-system, if any. But default storage layer implementation writes data into fixed-size files, default size being 512MB. The current theoretical maximum number of files is 100 millions.

Theoretical limits may be determined by a couple of elements:

- max number transactions: 2^64-1 (uint64)
- max number of files: 2^63-1 (max file size 2^56-1)
- max value length: 32 MB (max size: 2^56-1 bytes)
- max key length: 1024 Bytes (max length: 2^31-1 bytes)

</WrappedSection>

::: tip
Download the [immudb short research paper](https://codenotary.s3.amazonaws.com/Research-Paper-immudb-CodeNotary_v3.0.pdf) to learn about the technical foundations of immudb.
:::