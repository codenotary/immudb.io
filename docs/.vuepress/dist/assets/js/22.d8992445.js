(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{437:function(t,e,a){"use strict";a.r(e);var s=a(45),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"immutably-store-or-guarantee-the-immutability-of-documents-and-invoices-for-compliance-reasons"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#immutably-store-or-guarantee-the-immutability-of-documents-and-invoices-for-compliance-reasons"}},[t._v("#")]),t._v(" Immutably store or guarantee the immutability of documents and invoices for compliance reasons")]),t._v(" "),a("p",[t._v("In most countries, invoices, contracts and important documents relating to the operation and running of businesses must be stored in a forgery-proof manner.")]),t._v(" "),a("p",[t._v("Taking Germany as an example, the GoBD sets the principles of lawful computer-aided accounting.")]),t._v(" "),a("p",[t._v("Some detail:")]),t._v(" "),a("p",[a("strong",[t._v("GoBD")]),t._v(" are the Principles for properly maintaining, keeping and storing books, records and documents in electronic form and for data access, as provided by the German tax authorities. Put simply, the "),a("em",[t._v("GoBD")]),t._v(" deals with how to store information electronically and how to handle tax-relevant documents. The documentation requirements, as well as the control and the use of appropriate IT are regulated in this context. The GoBD also regulates the access of auditors and the scope of the guidelines. Compliance with accounting processes and logging are also addressed.")]),t._v(" "),a("p",[t._v("The main principles are categorized into:")]),t._v(" "),a("ol",[a("li",[t._v("Transparency")]),t._v(" "),a("li",[t._v("Immutability and tracking of changes")]),t._v(" "),a("li",[t._v("Neatness")]),t._v(" "),a("li",[t._v("Completeness")]),t._v(" "),a("li",[t._v("Timely bookings")]),t._v(" "),a("li",[t._v("Accuracy")])]),t._v(" "),a("p",[t._v("While all are important, the focus of this blog post is "),a("strong",[t._v("immutability and tracking of changes")]),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"immutability"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#immutability"}},[t._v("#")]),t._v(" Immutability")]),t._v(" "),a("p",[t._v("The criterion of immutability requires an identification of the changes made to tax-relevant data. The registration is thus absolutely necessary for the bookkeeping. This refers to whether the bookkeeping has taken place at regular intervals. If this is not the case, there is a formal deficiency in the bookkeeping system. Therefore, the commit time must be recorded in each case.")]),t._v(" "),a("p",[t._v("A booking record is considered unchangeable only through the final commit. Any control or authorization by other persons in the company remains unaffected, especially in the case of batch or preliminary entry.")]),t._v(" "),a("p",[t._v("The immutability is thus valid irrespective of whether it is an electronically supported record or a document in paper form. The records with document characteristics and the land registers (inward and outward registers) only have to be provided with a time. Furthermore, the auditor may request activity logs. This also applies to changes to the master data or in the software. For example, office formats often do not meet these requirements.")]),t._v(" "),a("h2",{attrs:{id:"tracking-of-changes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tracking-of-changes"}},[t._v("#")]),t._v(" Tracking of changes")]),t._v(" "),a("p",[t._v("Subsequent changes are to be made exclusively in such a way that both the original content and the fact that changes have been made remain recognisable. In the case of program-generated or program-controlled recordings (automated documents or recurring documents), changes to the generation and control data on which the recording is based shall also be recorded.")]),t._v(" "),a("p",[t._v("This applies in particular to the recording of changes in settings or the parameterisation of the software. If master data (for example, abbreviation or key directories, organizational charts) is changed, the unique meaning in the corresponding transaction data (for example, sales tax key, currency unit, account characteristic) must be retained.")]),t._v(" "),a("p",[t._v("If necessary, master data changes must be excluded or master data with validity specifications must be historized to prevent ambiguous links. It must also not be possible to subsequently change a change history.")]),t._v(" "),a("h2",{attrs:{id:"existing-applications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#existing-applications"}},[t._v("#")]),t._v(" Existing applications")]),t._v(" "),a("p",[t._v("There are countless ways how accounting, bookkeeping and document management is done in different companies, therefore a new technology or solution should ideally work in combination with the existing systems (without or with minimal changes).")]),t._v(" "),a("p",[t._v("The beauty of immudb is, that it can easily be used either as a document storage or simply as a immutable ledger that tracks the unique document identity and its updates or changes.")]),t._v(" "),a("h2",{attrs:{id:"the-data-structure-base"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#the-data-structure-base"}},[t._v("#")]),t._v(" The data structure (base)")]),t._v(" "),a("p",[t._v("Let's assume your software is either storing all invoices and other documents in a file system or a database (PostgreSQL, Microsoft SQL, ...) and tracks also  changes (cancellation, reimbursement aso.).")]),t._v(" "),a("p",[t._v("Every document including invoices have a unique checksum ("),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/SHA-2",target:"_blank",rel:"noopener noreferrer"}},[t._v("SHA-256"),a("OutboundLink")],1),t._v(") based on the file content. Every tiny change to that file will result in a new checksum. That way every document can be securely identified.")]),t._v(" "),a("p",[t._v("When databases are used to store the data you need to keep in mind that only the last value is saved and the former value overwritten. It's up to the software or user to keep track of the changes. Anyone that gains access to the database can change these records without leaving traces.")]),t._v(" "),a("p",[t._v("Using immudb that gets solved automatically, as value changes are never deleted and the full history will be maintained in a tamper-proof way.")]),t._v(" "),a("p",[t._v("Many software products allow to consume events using scripts or software. That feature can be used to update information in immudb while remaining the full change history.")]),t._v(" "),a("h2",{attrs:{id:"introducing-immudb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introducing-immudb"}},[t._v("#")]),t._v(" Introducing immudb")]),t._v(" "),a("p",[t._v("immudb is a lightweight yet highly scalable immutable database. Providing low-latency and high-throughput comparable to a raw key-value store but ensuring any tampering is not only properly identified but scoped.")]),t._v(" "),a("p",[t._v("A well-defined update protocol between clients and server provides an on-demand tampering detection while built-in corruption and consistency checkers give rise to the first-ever proactive tampering awareness database.")]),t._v(" "),a("p",[t._v("immudb security is not about role-based access, it's not about being an open source project, it's about the mathematical algorithms and state update protocol it employs. Whenever immudb is able to provide a satisfactory proof against the returned data, it means data is origin and was not tampered by any means.")]),t._v(" "),a("p",[t._v("Internally, immudb stores data together with a hash data-structure used to generate cryptographic proofs. The additional data structure that is generated can be thought of as a mutable merkle-tree and an update protocol run by clients and server is always made against the current state of immudb.")]),t._v(" "),a("p",[t._v("While immudb shares some technical similarities with blockchain platforms, immudb is not meant to provide smart- contracts or de-centralized governance capabilities. But it pro- vides fully-automated tools to accomplish enterprise-grade immutability, ensuring any tampering on sensitive data is not only detected but scoped.")]),t._v(" "),a("p",[t._v("Immutability is ensured by following a well-defined update protocol. Clients and auditors continuously evaluate the state update provided by the server. Such evaluation is based on cryptographic proofs, meaning validation is mathematically determined, making it impossible to fake or circumvent, resulting in any tampering being immediately detected.")]),t._v(" "),a("h2",{attrs:{id:"implementing-immudb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#implementing-immudb"}},[t._v("#")]),t._v(" Implementing immudb")]),t._v(" "),a("p",[t._v("There are 3 different ways our users shared with us, how they make sure that all documents are stored immutably and tamper-proof.")]),t._v(" "),a("p",[t._v("Keep in mind that immudb is currently a key value store and not a relational database. Nevertheless, the relational database features are on our roadmap.")]),t._v(" "),a("h3",{attrs:{id:"alternative-1-value-document-checksum"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#alternative-1-value-document-checksum"}},[t._v("#")]),t._v(" Alternative 1: Value=document checksum")]),t._v(" "),a("p",[t._v("The idea of that alternative is, that the query to verify the document is based on the transaction id or some other identifier of your software.")]),t._v(" "),a("ol",[a("li",[t._v("Create a sha256 checksum of the document that is stored on the filesystem or a database or of the database entry (for database centric applications)")]),t._v(" "),a("li",[t._v("Create a new entry in immudb, using a unique string or number or combination (might also be the transaction ID of your application) as the key and set the value to the sha256 checksum from step 1")]),t._v(" "),a("li",[t._v("Of course you can create different structures in the value as well, i. e. store a json structure (base64 encoded) that contains the checksum and other information")])]),t._v(" "),a("p",[a("strong",[t._v("Key:")]),t._v(" fb3d9f09-ff3f-42fd-8815-d04bcf565eaa "),a("em",[t._v("# i. e. transaction UUID of the application that manages the invoice")])]),t._v(" "),a("p",[a("strong",[t._v("Value")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"checksum"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"f27a7d87d26ac77dab82539e90e2914b1805e85be9240528f243c089cbc7ee92"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"file"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pdf"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"filename"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"invoice123.pdf"')]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"metadata"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProjectID"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"projectA"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CustomerID"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"customer123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Transaction"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tx123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Status"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"paid"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"User"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"LastModifiedDate"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"D:20200618120429+02'00'\"")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TimeStamp"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"D:20200618120429+02'00'\"")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("strong",[t._v("Advantage:")])]),t._v(" "),a("ul",[a("li",[t._v("simple to implement")])]),t._v(" "),a("p",[a("strong",[t._v("Disadvantage:")])]),t._v(" "),a("ul",[a("li",[a("p",[t._v("not very flexible when it comes to workflows or change tracking")])]),t._v(" "),a("li",[a("p",[t._v("requires the use of a secondary index to accelerate queries; additional data storage required where the document is stored")])])]),t._v(" "),a("h3",{attrs:{id:"alternative-2-key-document-checksum"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#alternative-2-key-document-checksum"}},[t._v("#")]),t._v(" Alternative 2: Key=document checksum")]),t._v(" "),a("p",[t._v("The idea of that alternative is, that the query to verify the document is based on the SHA-256 checksum of the document itself.")]),t._v(" "),a("ol",[a("li",[t._v("Create a sha256 checksum of the document that is stored on the filesystem or a database or of the database entry (for database centric applications)")]),t._v(" "),a("li",[t._v("Create a new entry in immudb, using the sha256 checksum from step 1 as the key and set the value to the document or transaction metadata, like customer id, transaction id, PO number.")]),t._v(" "),a("li",[t._v("Whenever there are changes to the workflow related to the document (with the given checksum) the value is also being updated. Important: the value history with all changes is fully maintained and tamperproof as well.")])]),t._v(" "),a("p",[a("strong",[t._v("Key:")]),t._v(" f27a7d87d26ac77dab82539e90e2914b1805e85be9240528f243c089cbc7ee92 "),a("em",[t._v("# SHA-256 checksum of file")])]),t._v(" "),a("p",[a("strong",[t._v("Value:")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"file"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pdf"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"filename"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"invoice123.pdf"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"metadata"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProjectID"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"projectA"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CustomerID"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"customer123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Transaction"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tx123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Status"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"paid"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"User"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"LastModifiedDate"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"D:20200618120429+02'00'\"")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TimeStamp"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"D:20200618120429+02'00'\"")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("strong",[t._v("Advantage:")])]),t._v(" "),a("ul",[a("li",[t._v("very flexible and allows for simple workflows; very fast queries based on the checksum")])]),t._v(" "),a("p",[a("strong",[t._v("Disadvantage:")])]),t._v(" "),a("ul",[a("li",[a("p",[t._v("needs an implementation of the update procedure")])]),t._v(" "),a("li",[a("p",[t._v("additional data storage required where the document is stored")])])]),t._v(" "),a("h3",{attrs:{id:"alternative-3-full-storage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#alternative-3-full-storage"}},[t._v("#")]),t._v(" Alternative 3: Full storage")]),t._v(" "),a("p",[t._v("Like Alternative 2, but Instead of storing only metadata, the complete file is stored (base64 encoded) in the value as well. One way to do that is creating a json structure, that contains project or process data and having one field (b64content in the example below) that contains the encoded file.")]),t._v(" "),a("p",[a("strong",[t._v("Key:")]),t._v(" f27a7d87d26ac77dab82539e90e2914b1805e85be9240528f243c089cbc7ee92 "),a("em",[t._v("# SHA-256 checksum of file")])]),t._v(" "),a("p",[a("strong",[t._v("Value:")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"file"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pdf"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"filename"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"invoice123.pdf"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Pages"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"14"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"b64content"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"JVBERi0x........"')]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"metadata"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ProjectID"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"projectA"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"CustomerID"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"customer123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Transaction"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tx123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Status"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cancelled"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"User"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"LastModifiedDate"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"D:20200618120429+02'00'\"")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TimeStamp"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"D:20200618120429+02'00'\"")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("strong",[t._v("Advantage:")])]),t._v(" "),a("ul",[a("li",[t._v("no need for an additional data storage")])]),t._v(" "),a("p",[a("strong",[t._v("Disadvantage:")])]),t._v(" "),a("ul",[a("li",[t._v("immudb grows much faster in size")])]),t._v(" "),a("h2",{attrs:{id:"summary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#summary"}},[t._v("#")]),t._v(" Summary")]),t._v(" "),a("p",[t._v("immudb provides a very versatile and easy to implement way to be compliant with regulations")]),t._v(" "),a("p",[t._v("Of course our listed alternatives are far from being complete. Therefore, we would love to hear from you how you solved that issue or what your thoughts are! You can use our chat or email us.")])])}),[],!1,null,null,null);e.default=r.exports}}]);