# Concepts

Download the [immudb short research paper](https://codenotary.s3.amazonaws.com/Research-Paper-immudb-CodeNotary_v3.0.pdf) to learn about the technical foundations of immudb.

<WrappedSection>

## Consistency and state signature

Immudb consistency can be verified by any external client or auditor by calculating transaction state and comparing it with one returned from immudb. The state is represented by the root digest of a Merkle tree and is calculated for every database transaction. It allows for verification at each transaction.

To increase security, providing immudb with a signing key enables the cryptographic state signature.
That means that an auditor or a third party client, for instance, could verify the authenticity of the returned current state.

Immuclient and [immugw](https://github.com/codenotary/immugw) are shipped with auditor capabilities.
To get the (signed) state in combination with the immuclient with auditor capabilities:
```bash
immuclient audit-mode --audit-username {immudb-username} --audit-password {immudb-pw} --server-signing-pub-key {state-public-key}
```

Check [tamper-proof operations](develop/operations.htm) and [running an auditor with immuclient](develop/auditor.html) paragraphs for additional details.

</WrappedSection>

<WrappedSection>

## Key value and SQL

Immudb can be used as a tamper-proof key value store or SQL database, with audit history capabilities. Within single immudb instance a user can have both types of databases, it is even possible to have KV and SQL withing single database.

Key value is a foundation layer for SQL, meaning that SQL is using key value store capabilities underneath. 

Check [user quickstart](quickstart.html) for instructions on how to start working with KV or SQL. 

</WrappedSection>

<WrappedSection>

## Operation modes

Immudb can be run as full database server with [replicas](operations/replication.html) or easily [embedded](develop/embedding.html) as a lightweight database into application.

</WrappedSection>

<WrappedSection>

## immugw communication
Immugw can be found in its [own repository](https://github.com/codenotary/immugw)

immugw proxies REST client communication and gRPC server interface. For security reasons, immugw should not run on the same server as immudb. The following diagram shows how the communication works:

![immugw communication explained](/diagram-immugw.svg)

</WrappedSection>
