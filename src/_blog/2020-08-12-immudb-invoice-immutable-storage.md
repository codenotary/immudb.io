---
title: Immutably store or guarantee the immutability of documents and invoices for compliance reasons
image: /blog/mascot.jpg
excerpt: 
    immudb - a new way to stay compliant with the principles for properly maintaining, keeping and storing books, records and documents in electronic form
date: 2020-08-12
tags: 
  - Compliance
  - GoBD
  - immutability
  - bookkeeping
  - document recording
author: Dennis
location: Switzerland
---

# Immutably store or guarantee the immutability of documents and invoices for compliance reasons

In most countries, invoices, contracts and important documents relating to the operation and running of businesses must be stored in a forgery-proof manner.

Taking Germany as an example, the GoBD sets the principles of lawful computer-aided accounting.  

Some detail:

**GoBD** are the Principles for properly maintaining, keeping and storing books, records and documents in electronic form and for data access, as provided by the German tax authorities. Put simply, the *GoBD* deals with how to store information electronically and how to handle tax-relevant documents. The documentation requirements, as well as the control and the use of appropriate IT are regulated in this context. The GoBD also regulates the access of auditors and the scope of the guidelines. Compliance with accounting processes and logging are also addressed.

The main principles are categorized into:

1. Transparency
2. Immutability and tracking of changes
3. Neatness
4. Completeness
5. Timely bookings
6. Accuracy

While all are important, the focus of this blog post is **immutability and tracking of changes**.

## Immutability

The criterion of immutability requires an identification of the changes made to tax-relevant data. The registration is thus absolutely necessary for the bookkeeping. This refers to whether the bookkeeping has taken place at regular intervals. If this is not the case, there is a formal deficiency in the bookkeeping system. Therefore, the commit time must be recorded in each case.

A booking record is considered unchangeable only through the final commit. Any control or authorization by other persons in the company remains unaffected, especially in the case of batch or preliminary entry.

The immutability is thus valid irrespective of whether it is an electronically supported record or a document in paper form. The records with document characteristics and the land registers (inward and outward registers) only have to be provided with a time. Furthermore, the auditor may request activity logs. This also applies to changes to the master data or in the software. For example, office formats often do not meet these requirements.



## Tracking of changes

Subsequent changes are to be made exclusively in such a way that both the original content and the fact that changes have been made remain recognisable. In the case of program-generated or program-controlled recordings (automated documents or recurring documents), changes to the generation and control data on which the recording is based shall also be recorded. 

This applies in particular to the recording of changes in settings or the parameterisation of the software. If master data (for example, abbreviation or key directories, organizational charts) is changed, the unique meaning in the corresponding transaction data (for example, sales tax key, currency unit, account characteristic) must be retained. 

If necessary, master data changes must be excluded or master data with validity specifications must be historized to prevent ambiguous links. It must also not be possible to subsequently change a change history.



## Existing applications

There are countless ways how accounting, bookkeeping and document management is done in different companies, therefore a new technology or solution should ideally work in combination with the existing systems (without or with minimal changes).

The beauty of immudb is, that it can easily be used either as a document storage or simply as a immutable ledger that tracks the unique document identity and its updates or changes.

## The data structure (base)

Let's assume your software is either storing all invoices and other documents in a file system or a database (PostgreSQL, Microsoft SQL, ...) and tracks also  changes (cancellation, reimbursement aso.).

Every document including invoices have a unique checksum ([SHA-256](https://en.wikipedia.org/wiki/SHA-2)) based on the file content. Every tiny change to that file will result in a new checksum. That way every document can be securely identified.

When databases are used to store the data you need to keep in mind that only the last value is saved and the former value overwritten. It's up to the software or user to keep track of the changes. Anyone that gains access to the database can change these records without leaving traces.

Using immudb that gets solved automatically, as value changes are never deleted and the full history will be maintained in a tamper-proof way.

Many software products allow to consume events using scripts or software. That feature can be used to update information in immudb while remaining the full change history. 



## Introducing immudb

immudb is a lightweight yet highly scalable immutable database. Providing low-latency and high-throughput comparable to a raw key-value store but ensuring any tampering is not only properly identified but scoped. 

A well-defined update protocol between clients and server provides an on-demand tampering detection while built-in corruption and consistency checkers give rise to the first-ever proactive tampering awareness database.

immudb security is not about role-based access, it's not about being an open source project, it's about the mathematical algorithms and state update protocol it employs. Whenever immudb is able to provide a satisfactory proof against the returned data, it means data is origin and was not tampered by any means. 

Internally, immudb stores data together with a hash data-structure used to generate cryptographic proofs. The additional data structure that is generated can be thought of as a mutable merkle-tree and an update protocol run by clients and server is always made against the current state of immudb.

While immudb shares some technical similarities with blockchain platforms, immudb is not meant to provide smart- contracts or de-centralized governance capabilities. But it pro- vides fully-automated tools to accomplish enterprise-grade immutability, ensuring any tampering on sensitive data is not only detected but scoped.

Immutability is ensured by following a well-defined update protocol. Clients and auditors continuously evaluate the state update provided by the server. Such evaluation is based on cryptographic proofs, meaning validation is mathematically determined, making it impossible to fake or circumvent, resulting in any tampering being immediately detected.



## Implementing immudb

There are 3 different ways our users shared with us, how they make sure that all documents are stored immutably and tamper-proof.

Keep in mind that immudb is currently a key value store and not a relational database. Nevertheless, the relational database features are on our roadmap. 

### Alternative 1: Value=document checksum

The idea of that alternative is, that the query to verify the document is based on the transaction id or some other identifier of your software.

1. Create a sha256 checksum of the document that is stored on the filesystem or a database or of the database entry (for database centric applications)
2. Create a new entry in immudb, using a unique string or number or combination (might also be the transaction ID of your application) as the key and set the value to the sha256 checksum from step 1
3. Of course you can create different structures in the value as well, i. e. store a json structure (base64 encoded) that contains the checksum and other information

**Key:** fb3d9f09-ff3f-42fd-8815-d04bcf565eaa *# i. e. transaction UUID of the application that manages the invoice*

**Value**:

```json
{
    "checksum": "f27a7d87d26ac77dab82539e90e2914b1805e85be9240528f243c089cbc7ee92",
    "file": {
		"type": "pdf",
		"filename": "invoice123.pdf"
	},
	"metadata": {
		"ProjectID": "projectA",
		"CustomerID": "customer123",
		"Transaction": "tx123",
        "Status": "paid",
		"User": "user1",
		"LastModifiedDate": "D:20200618120429+02'00'",
		"TimeStamp": "D:20200618120429+02'00'"
	}
}
```



**Advantage:** 

* simple to implement

**Disadvantage:** 

* not very flexible when it comes to workflows or change tracking

* requires the use of a secondary index to accelerate queries; additional data storage required where the document is stored



### Alternative 2: Key=document checksum

The idea of that alternative is, that the query to verify the document is based on the SHA-256 checksum of the document itself.

1. Create a sha256 checksum of the document that is stored on the filesystem or a database or of the database entry (for database centric applications)
2. Create a new entry in immudb, using the sha256 checksum from step 1 as the key and set the value to the document or transaction metadata, like customer id, transaction id, PO number. 
3. Whenever there are changes to the workflow related to the document (with the given checksum) the value is also being updated. Important: the value history with all changes is fully maintained and tamperproof as well.

**Key:** f27a7d87d26ac77dab82539e90e2914b1805e85be9240528f243c089cbc7ee92 *# SHA-256 checksum of file*

**Value:**

```json
{
	"file": {
		"type": "pdf",
		"filename": "invoice123.pdf",
	},
	"metadata": {
		"ProjectID": "projectA",
		"CustomerID": "customer123",
		"Transaction": "tx123",
        "Status": "paid",
		"User": "user1",
		"LastModifiedDate": "D:20200618120429+02'00'",
		"TimeStamp": "D:20200618120429+02'00'"
	}
}
```



**Advantage:** 

* very flexible and allows for simple workflows; very fast queries based on the checksum

**Disadvantage:**

* needs an implementation of the update procedure

* additional data storage required where the document is stored



### Alternative 3: Full storage

Like Alternative 2, but Instead of storing only metadata, the complete file is stored (base64 encoded) in the value as well. One way to do that is creating a json structure, that contains project or process data and having one field (b64content in the example below) that contains the encoded file.

**Key:** f27a7d87d26ac77dab82539e90e2914b1805e85be9240528f243c089cbc7ee92 *# SHA-256 checksum of file*

**Value:**

```json
{
	"file": {
		"type": "pdf",
		"filename": "invoice123.pdf",
		"Pages": "14",
		"b64content": "JVBERi0x........"
	},
	"metadata": {
		"ProjectID": "projectA",
		"CustomerID": "customer123",
		"Transaction": "tx123",
        "Status": "cancelled",
		"User": "user1",
		"LastModifiedDate": "D:20200618120429+02'00'",
		"TimeStamp": "D:20200618120429+02'00'"
	}
}
```

**Advantage:**

* no need for an additional data storage

**Disadvantage:**

* immudb grows much faster in size



## Summary

immudb provides a very versatile and easy to implement way to be compliant with regulations 

Of course our listed alternatives are far from being complete. Therefore, we would love to hear from you how you solved that issue or what your thoughts are! You can use our chat or email us.
