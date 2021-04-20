# immudb explained

## What is immudb?
A lightweight, high-speed, immutable database solution capable of processing millions of transactions a second. It provides cryptographic verification of your data integrity without the cost and complexity associated with classic blockchain. You have the flexibility to host immudb on-premise or in the cloud.

<FeatureTable/>

The immudb is a non-relational, NoSQL database. Data is a collection of key-values with time stamps. You can add records, but deletion or modification isn’t allowed making your data immutable. When a record's value changes over time (such as a bank balance), you can get multiple instances with different time stamps to give you the complete change history of that record. Store a variety of common data types, verification checksums, or JSONs.

Depending on your use case, immudb might function as your application's primary or as a secondary database. As a secondary, complimentary database, use immudb to cross-check the data integrity of your important data (by verifying checksums or comparing stored data values). A secondary database enables you to quickly use immudb without completely re-engineering your existing application.

- For additional technical background on immudb and its performance, see the [Readme](https://github.com/codenotary/immudb/blob/master/README.md) within CodeNotary's immudb GitHub Project.
- For additional information on immudb, see our [documentation](https://docs.immudb.io/master/).


## Why use immudb?
<img align="right" src="https://codenotary.io/images/immudb/mascot.png" width="240px"/>It ensures the integrity of your organization's data. While Cyber Security is an important part of your organization’s business plan, immudb provides another layer of security to ensure data integrity even in the event your perimeter is breached during an attack.  Data cannot be deleted or modified once stored into immudb. Additions of new data are logged and auditable, enabling you to view any suspect additions made during the intrusion.

Use cases:
  - Integration with your DevOps ensures code security throughout the development and deployment process. Embed immudb into your [Azure DevOps](https://codenotary.io/blog/securing-your-azure-devops-ecosystem-jenkins-and-kubernetes-aks/) with Jenkins and Kubernetes. Use just [Jenkins](https://codenotary.io/blog/jenkins-build-deployment-pipeline-a-how-to-for-ensuring-integrity/). Alternatively, integrate with [Git Lab](https://codenotary.io/blog/fully-trusted-gitlab-pipeline/) or [GitHub](https://codenotary.io/blog/use-github-actions-for-validated-builds/).

  - Guarantee [File Integrity](https://codenotary.io/blog/file-integrity-monitoring-change-management/) of your critical data. Examples include storing your organization's sensitive financial, credit card transactional, invoices, contracts, educational transcripts, and other important data.

  - Ensure integrity of your legal [Documents and Invoices](https://codenotary.io/blog/immutably-store-or-guarantee-the-immutability-of-documents-and-invoices-for-compliance-reasons/), contracts, forms, and your downloads and emails.

  - Save your Internet of Things (IoT) sensor data as a failsafe plan for loss of data.

  - Keep your investment guidelines or stock market data tamperproof for your investment bank or client financial portfolios.

  - Store important log files to keep them tamperproof to meet regulations like PCI compliance.

  - Protect medical data, test results, or recipes from alteration.