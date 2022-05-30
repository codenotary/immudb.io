# Concepts

Download the [immudb short research paper](https://codenotary.s3.amazonaws.com/Research-Paper-immudb-CodeNotary_v3.0.pdf) to learn about the technical foundations of immudb.

<WrappedSection>

## Consistency and state signature

immudb consistency can be verified by any external client or auditor by calculating transaction state and comparing it with one returned from immudb. The state is represented by a digest, which is calculated as part of the transaction commit phase. Calculating such a value in an accumulative manner ensures that any change already made cannot be reversed.

To increase security, immudb can be provisioned with a signing key to ensure non-repudiation of database states. The immudb server will subsequently sign the state on request from a client application.
That means that an auditor or a third party client, for instance, could verify the authenticity of the returned current state.

immuclient and [immugw](https://github.com/codenotary/immugw) are shipped with auditor capabilities.
To get the (signed) state in combination with the immuclient with auditor capabilities:
```bash
immuclient audit-mode --audit-username {immudb-username} --audit-password {immudb-pw} --server-signing-pub-key {state-public-key}
```

Check [tamper-proof operations](develop/operations) and [running an auditor with immuclient](operations/auditor) paragraphs for additional details.

</WrappedSection>

<WrappedSection>

## Key value and SQL

immudb can be used as a tamper-proof key value store or SQL database, with audit history capabilities. Within single immudb instance a user can have multiple databases of both types, it is even possible to have KV and SQL withing single database.

Key value is a foundation layer for SQL, meaning that SQL is using key value store capabilities underneath. 

Check [user quickstart](getstarted/quickstart) for instructions on how to start working with KV or SQL. 

</WrappedSection>

<WrappedSection>

## Operation modes

immudb can be run as full database server with [replicas](operations/replication.html) or easily [embedded](develop/embedding.html) as a lightweight database into application.

</WrappedSection>
