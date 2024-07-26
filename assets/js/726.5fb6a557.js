(window.webpackJsonp=window.webpackJsonp||[]).push([[726],{1086:function(e,t,a){"use strict";a.r(t);var i=a(2),n=Object(i.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"immudb-explained"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#immudb-explained"}},[e._v("#")]),e._v(" immudb explained")]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"what-is-immudb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-is-immudb"}},[e._v("#")]),e._v(" What is immudb?")]),e._v(" "),a("p",[e._v("immudb is database with built-in cryptographic proof and verification. It can track changes in sensitive data and the integrity of the history will be protected by the clients, without the need to trust the server.")]),e._v(" "),a("p",[e._v("immudb can operate as a key-value, relational (SQL) or document database, making it a truly no-SQL database. You can add new transactions, but deletion or modification of older transactions isn’t allowed, thus making your data immutable. When a key record's value changes over time (such as a bank balance), you can get multiple instances with different timestamps to give you the complete history of that record's changes. You can store a variety of common data types, verification checksums, or JSON objects.")])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"what-makes-immudb-special"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-makes-immudb-special"}},[e._v("#")]),e._v(" What makes immudb special?")]),e._v(" "),a("FeatureTable"),e._v(" "),a("ul",[a("li",[a("p",[a("strong",[e._v("Keep track of changes and audit them.")]),e._v(" Traditional database transactions and logs are hard to scale and are mutable, so there is no way to know for sure if your data has been compromised. immudb is immutable. You can add new versions of existing records, but never change or delete records. This lets you store critical data without fear of it being changed silently.")])]),e._v(" "),a("li",[a("p",[a("strong",[e._v("Verify your data without sacrificing performance.")]),e._v(" Data stored in immudb is cryptographically coherent and verifiable, just like blockchains, but without all the complexity. Unlike blockchains, immudb can handle millions of transactions per second, and can be used both as a lightweight service or embedded in your application as a library.")])]),e._v(" "),a("li",[a("p",[a("strong",[e._v("Protect yourself from cyber attacks.")]),e._v(" While Cyber Security is an important part of your organization’s business plan, immudb provides another layer of security to ensure data integrity even in the event your perimeter is breached during an attack. Data cannot be deleted or modified once stored into immudb. Additions of new data are logged and auditable, enabling you to view any suspect additions made during the intrusion.")])])])],1),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"how-can-i-use-immudb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-can-i-use-immudb"}},[e._v("#")]),e._v(" How can I use immudb?")]),e._v(" "),a("p",[e._v("Depending on your use case, immudb might function as your application's primary or as a secondary database. As a secondary, complimentary database, use immudb to cross-check the integrity of your important data (by verifying checksums or comparing stored data values). A secondary database enables you to quickly use immudb without completely re-engineering your existing application.")]),e._v(" "),a("h3",{attrs:{id:"use-cases"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#use-cases"}},[e._v("#")]),e._v(" Use cases")]),e._v(" "),a("ul",[a("li",[e._v("Integration with your DevOps ensures code security throughout the development and deployment process. Embed immudb into your "),a("a",{attrs:{href:"https://codenotary.io/blog/securing-your-azure-devops-ecosystem-jenkins-and-kubernetes-aks/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure DevOps"),a("OutboundLink")],1),e._v(" with Jenkins and Kubernetes. Use just "),a("a",{attrs:{href:"https://codenotary.io/blog/jenkins-build-deployment-pipeline-a-how-to-for-ensuring-integrity/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Jenkins"),a("OutboundLink")],1),e._v(". Alternatively, integrate with "),a("a",{attrs:{href:"https://codenotary.io/blog/fully-trusted-gitlab-pipeline/",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitLab"),a("OutboundLink")],1),e._v(" or "),a("a",{attrs:{href:"https://codenotary.io/blog/use-github-actions-for-validated-builds/",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("li",[e._v("Guarantee File Integrity of your critical data. Examples include storing your organization's sensitive financial, credit card transactional, invoices, contracts, educational transcripts, and other important data.")]),e._v(" "),a("li",[e._v("Ensure integrity of your legal Documents and Invoices, contracts, forms, and your downloads and emails.")]),e._v(" "),a("li",[e._v("Save your Internet of Things (IoT) sensor data as a failsafe plan for loss of data.")]),e._v(" "),a("li",[e._v("Keep your investment guidelines or stock market data tamperproof for your investment bank or client financial portfolios.")]),e._v(" "),a("li",[e._v("Store important log files to keep them tamperproof to meet regulations like PCI compliance.")]),e._v(" "),a("li",[e._v("Protect medical data, test results, or recipes from alteration.")]),e._v(" "),a("li",[e._v("Companies use immudb to protect credit card transactions and to secure processes by storing digital certificates and checksums.")])])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"key-value-document-and-sql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#key-value-document-and-sql"}},[e._v("#")]),e._v(" Key value, Document and SQL")]),e._v(" "),a("p",[e._v("immudb can be used as a tamper-proof key value, document or SQL database, with audit history capabilities. Within single immudb instance a user can have multiple databases of both types, it is even possible to have KV, Document and SQL withing single database.")]),e._v(" "),a("p",[e._v("Key value is a foundation layer for Document and SQL, meaning that both Document and SQL are using key value store capabilities underneath.")])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"standalone-and-embeddable"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#standalone-and-embeddable"}},[e._v("#")]),e._v(" Standalone and Embeddable")]),e._v(" "),a("p",[e._v("immudb can be run as full database server with "),a("RouterLink",{attrs:{to:"/1.9.4/production/replication.html"}},[e._v("replicas")]),e._v(" or easily "),a("RouterLink",{attrs:{to:"/1.9.4/embedded/embedding.html"}},[e._v("embedded")]),e._v(" as a lightweight database into application.")],1)]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"running-platforms"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#running-platforms"}},[e._v("#")]),e._v(" Running platforms")]),e._v(" "),a("p",[e._v("immudb server runs in most operating systems: BSD, Linux, OS X, Solaris, Windows, IBM z/OS.")])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"s3-storage-backend"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#s3-storage-backend"}},[e._v("#")]),e._v(" S3 Storage Backend")]),e._v(" "),a("p",[e._v("immudb can store its data in the Amazon S3 service (or a compatible alternative).")])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"how-is-immutability-ensured"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-is-immutability-ensured"}},[e._v("#")]),e._v(" How is immutability ensured?")]),e._v(" "),a("p",[e._v("immudb consistency can be verified by any external client or auditor by calculating transaction state and comparing it with one returned from immudb. The state is represented by a digest, which is calculated as part of the transaction commit phase. Calculating such a value in an accumulative manner ensures that any change already made cannot be reversed.")]),e._v(" "),a("p",[e._v("To increase security, immudb can be provisioned with a signing key to ensure non-repudiation of database states. The immudb server will subsequently sign the state on request from a client application.\nThat means that an auditor or a third party client, for instance, could verify the authenticity of the returned current state.")]),e._v(" "),a("p",[e._v("Check "),a("RouterLink",{attrs:{to:"/1.9.4/production/auditor.html"}},[e._v("auditor")]),e._v(" section for additional details.")],1)]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"theoretical-limits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#theoretical-limits"}},[e._v("#")]),e._v(" Theoretical limits")]),e._v(" "),a("p",[e._v("immudb is an append-only, tamperproof database with key/value and SQL (Structured Query Language) application programming interfaces.")]),e._v(" "),a("p",[e._v("The immudb core persistence layer consists of a cryptographically-immutable log. Transactions are sequentially stored and uniquely identified by unsigned 64-bit integer values, thus setting a theoretical limit of 18446744073709551615 transactions (1^64 - 1).")]),e._v(" "),a("p",[e._v("In order to provide manageable limits, immudb is designed to set an upper bound to the number of key-value pairs included in a single transaction. The default value being 1024, so using default settings, the theoretical number of key-value pairs that can be stored in immudb is: 1024 * (1^64 - 1).")]),e._v(" "),a("p",[e._v("We designed immudb to require stable resources but not imposing strong limitations as most of the settings can be adjusted based on the use-case requirements.")]),e._v(" "),a("p",[e._v("While key-value pairs consist of arbitrary byte arrays, a maximum length may be set at database creation time. Both parameters can be increased as needed, considering:")]),e._v(" "),a("ul",[a("li",[e._v("long keys may degrade performance (when querying data through the index)")]),e._v(" "),a("li",[e._v("longer values requires more memory at runtime")])]),e._v(" "),a("p",[e._v("Note: The cryptographic linking does not impose a practical restriction.")]),e._v(" "),a("p",[e._v("immudb relies on a file abstraction layer and does not directly interact with the underlying file-system, if any. But default storage layer implementation writes data into fixed-size files, default size being 512MB. The current theoretical maximum number of files is 100 millions.")]),e._v(" "),a("p",[e._v("Theoretical limits may be determined by a couple of elements:")]),e._v(" "),a("ul",[a("li",[e._v("max number transactions: 2^64-1 (uint64)")]),e._v(" "),a("li",[e._v("max number of files: 2^63-1 (max file size 2^56-1)")]),e._v(" "),a("li",[e._v("max value length: 32 MB (max size: 2^56-1 bytes)")]),e._v(" "),a("li",[e._v("max key length: 1024 Bytes (max length: 2^31-1 bytes)")])])]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Download the "),a("a",{attrs:{href:"https://codenotary.s3.amazonaws.com/Research-Paper-immudb-CodeNotary_v3.0.pdf",target:"_blank",rel:"noopener noreferrer"}},[e._v("immudb short research paper"),a("OutboundLink")],1),e._v(" to learn about the technical foundations of immudb.")])])],1)}),[],!1,null,null,null);t.default=n.exports}}]);