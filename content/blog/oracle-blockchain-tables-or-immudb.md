---
title: "Oracle Blockchain Tables or immudb? Keep the Transactional Database Transactional"
date: 2026-09-04
description: "Oracle Blockchain Tables put append-only records inside the OLTP database. Compare them with immudb on schema semantics, retention rules and client-side cryptographic verification."
excerpt: "Oracle AI Database can hold append-only, cryptographically chained rows next to your normal transactional tables. The architectural question is whether immutability belongs inside the transactional database at all — or in a database built for it."
tags: ["immudb", "oracle", "architecture", "audit-log", "immutability"]
keywords: ["Oracle Blockchain Tables", "immudb", "immutable database", "tamper-proof audit log", "Oracle AI Database", "cryptographic verification", "append-only table"]
image: "/blog/oracle-blockchain-tables-or-immudb.png"
---
Oracle AI Database includes Blockchain Tables, giving Oracle users a way to create append-only, cryptographically chained records inside the same database that handles their normal transactional workloads. The capability is technically sophisticated. The architectural question, however, is whether immutability should be added as a special mode inside the transactional database — or handled by a database designed specifically for immutable data.

For many applications, the simpler architecture is: keep Oracle for OLTP and send records that must be independently tamper-evident to immudb.

![Oracle Blockchain Tables or immudb — keep the transactional database transactional](/blog/oracle-blockchain-tables-or-immudb.png)

## What an Oracle Blockchain Table actually asks of you

Oracle Blockchain Tables require developers and DBAs to understand a separate set of table semantics. A current Oracle AI Database blockchain table might look like this:

```sql
CREATE BLOCKCHAIN TABLE audit_events (
    event_id        NUMBER,
    account_id      NUMBER,
    event_type      VARCHAR2(64),
    event_data      VARCHAR2(4000),
    created_at      TIMESTAMP
)
NO DROP UNTIL 31 DAYS IDLE
NO DELETE LOCKED
HASHING USING SHA2_512 VERSION V2;
```

Those clauses are not decorative. Oracle requires specific blockchain-table retention and hashing rules. `NO DELETE LOCKED`, for example, permanently prevents row deletion, while `NO DROP UNTIL ... IDLE` controls when the table itself may be dropped. Oracle also distinguishes V1 and V2 blockchain formats, and a table cannot simply be converted between those versions later.

Internally, Oracle creates additional hidden `ORABCTAB_*` columns containing chain identifiers, sequence information and cryptographic hashes. Each inserted row incorporates the hash of an earlier row, producing tamper evidence.

That works, but it means the Oracle estate now contains two substantially different classes of data: ordinary mutable relational data and blockchain-managed data, with different lifecycle, deletion and administration rules.

## Business state and evidence are not the same workload

Consider an order-processing system. Oracle remains an excellent place for the operational record:

```sql
CREATE TABLE orders (
    order_id       NUMBER PRIMARY KEY,
    customer_id    NUMBER,
    status         VARCHAR2(20),
    total          NUMBER(12,2)
);

UPDATE orders
SET status = 'SHIPPED'
WHERE order_id = 912837;
```

Orders naturally change. Addresses change. Status changes. Payments may be reversed. Transactional systems need `UPDATE`, `DELETE`, constraints, joins and mature transaction processing.

An immutable audit event has almost exactly the opposite requirement.

## Writing the evidence to immudb instead

Instead of turning part of Oracle into a different kind of database, the application can write the business transaction to Oracle and the evidence to immudb:

```sql
CREATE TABLE audit_events (
    id INTEGER AUTO_INCREMENT,
    order_id INTEGER,
    event VARCHAR,
    actor VARCHAR,
    created_at TIMESTAMP,
    PRIMARY KEY id
);
```

Then:

```sql
INSERT INTO audit_events
    (order_id, event, actor, created_at)
VALUES
    (912837, 'ORDER_SHIPPED', 'warehouse-17', NOW());
```

There is no special `BLOCKCHAIN` table type to configure. Immutability is a property of the database architecture itself. immudb permits new transactions and new versions while protecting historical transactions against modification or deletion.

## Verification the client can perform itself

The distinction becomes even more important when verification matters.

With Oracle Blockchain Tables, cryptographic chaining is implemented and maintained by Oracle inside Oracle Database. With immudb, verification is exposed to clients. SDK operations such as [`VerifiedGet`](/docs/develop/reading/) obtain cryptographic proofs from the server and verify them client-side. A client therefore does not have to rely exclusively on the database server's assertion that history is intact.

Conceptually:

```go
value, err := client.VerifiedGet(ctx, []byte("audit:912837"))
if err != nil {
    log.Fatal(err)
}
```

The application consuming the evidence can participate in verifying its integrity.

## The operational case for separation

There is also an operational advantage to separation. The Oracle DBA can continue treating Oracle as Oracle: tune indexes, manage schemas, upgrade applications and operate transactional workloads without introducing unusual retention rules into selected tables.

immudb can meanwhile have a narrowly defined responsibility:

```text
Oracle AI Database
    |
    +-- customers
    +-- orders
    +-- inventory
    +-- payments
           |
           | security/audit events
           v
        immudb
    +-- audit trail
    +-- compliance evidence
    +-- signatures
    +-- software provenance
```

This is classic separation of concerns.

## One question, not a new table type

Oracle Blockchain Tables are an impressive solution when an organization insists that immutable records remain entirely inside Oracle. But using the same database engine for both mutable business state and immutable evidence is not automatically simpler simply because everything carries the Oracle logo.

For systems already running Oracle, the cleaner design can be surprisingly straightforward: let Oracle do what Oracle does exceptionally well — transaction processing — and let immudb do what it was designed to do — preserve and cryptographically verify history.

Instead of adding blockchain semantics to every application that needs trustworthy records, developers simply decide one thing:

> Is this business state, or is this evidence?

Business state goes to Oracle.

Evidence goes to immudb.

Ready to try it? Start with [running immudb](/docs/running/), then connect from your language with the [official SDKs](/docs/connecting/sdks/) and read up on the [immutable audit log](/docs/develop/sql/auditlog/).
