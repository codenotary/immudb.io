# Performance guide

<WrappedSection>

## Dependency on the B-Tree index

Immudb is built in a layered approach.
The most low-level layer in immudb is an immutable log of changes.
An atomic entry in this log level corresponds to a single transaction.
Each transaction has an ID assigned - those IDs are increasing monotonically
thus it is easy to reference a specific transaction ID.

Each transaction contains a list of Key-Metadata-Value entries which correspond to
changes to the database made within such transaction.

Transactions ending up in immudb are protected from tampering attacks
by the parallel Merkle tree structure built from the transaction data.

By default immudb builds an additional index based on a B-tree structure for fast key lookup.
This B-Tree is built in an asynchronous routine in parallel to the write operations.
This asynchronous nature of indexing can be used to gain significant performance gains
by avoiding strict dependency on the indexing.

```text
+------------------+
|        SQL       |
+---------+--------+
          |
          v
+------------------+
|   KV (Indexed)   |
+---------+--------+
          |
          v
+------------------+
|        Log       |
+---------+--------+
```

### Using immudb as an immutable ledger

To achieve the best performance immudb can be used as an immutable ledger only.
In such case the index can be completely ignored to avoid performance and time penalty due to indexing.
Below is the list of operations that do not rely on the index at all.

* Data should be inserted into the database in asynchronous mode
  that is enabled by setting the `noWait` GRPC argument to `true`.
  To avoid dependency on the index one should also avoid using
  conditional writes and [ExecAll][exec-all] operations.
* To read the data from the database, use one of the following operations:
  * [GetAt][get-at-since] to get value of a key set at given tx ID,
  * [GetAtTxID][get-at-TxID] to get all entries from given transaction,
  * [TxScan][tx-scan] to perform an enhanced scan of entries within one transaction.
  Standard retrieval of the most recent value for given key should not be used.
  In most cases this means that the transaction ID must be stored in some external persistent storage.

The SQL layer heavily depends on the B-tree index thus it can not be used when immudb is
treated as an immutable ledger only.

[get-at-since]: <../develop/reading.md#get-at-and-since-a-transaction>
[get-at-TxID]: <../develop/reading.md#get-at-txid>
[tx-scan]: <../develop/transactions.md#txscan>
[exec-all]: <../develop/transactions.md#execall>
[cond-write]: <../develop/reading.md#conditional-writes>

### Indexed KV layer - asynchronous

Working with Key-Value entries is hard without the ability to quickly get the value behind some key
which require the B-Tree index structure.

The B-Tree index is built in an asynchronous mode - once data is inserted into the transaction log,
a separate routine periodically updates it.
By default all immudb operations wait for the index to be up to date
to ensure that the most recent writes are already fully processed.
In some use cases such waiting for the indexer is not necessary and can be skipped
or reduced that leads to a much greater performance of the application.
Below is the list of operations that adjust the index processing requirements.

* Data can be inserted into the database in asynchronous mode
  that is enabled by setting the `noWait` GRPC argument to `true`.
  By doing so, the data is inserted as quickly as possible into the
  transaction log and right after that, the response is sent to the caller
  without waiting for the index at all.
  To avoid dependency on the btree one must also avoid using
  [conditional writes][cond-write] and [ExecAll][exec-all] operations that implicitly require
  up-to-date index.
* Reading the data from the database should be done by using one of the following operations:
  * [GetAt][get-at-since] to get value of a key set at given tx ID,
  * [GetAtTxID][get-at-TxID] to get all entries from given transaction,
  * [GetSince][get-at-since] where the indexer is only required to process up to given transaction ID,
  * [TxScan][tx-scan] to perform an enhanced scan of entries within one transaction.

The SQL layer heavily depends on the B-tree index thus it can not be used when relaxed indexing requirements are used.

### Indexed KV layer - synchronous

This mode of operation is very similar to the asynchronous one but with the requirement
that the B-tree index must be up-to-date. This is the default mode that immudb operates in.

When using immudb in synchronous mode, all functionalities of immudb's KV interface can be used.
Certain operations such as [ExecAll][exec-all] or [conditional writes][cond-write] require up-to-date index
and should only be used when there's a guarantee that those will meet the performance
requirements of the application.

### SQL

When immudb is used as an SQL database, all operations require an up to date index.
This means that optimizations that relax B-tree indexing requirements can not be used.

The SQL layer in immudb is built on top of the KV layer.
For each row in SQL table one entry is generated for the primary key.
That entry contains the whole row data.

In addition to that, for every index on that table, one additional KV entry
is added that keeps the reference to the original entry created for the primary key.

</WrappedSection>

<WrappedSection>

## Data modelling

Applications can structure their data in many different ways.
The chosen data model will affect the performance of the immudb.
Below are some tips that can help optimizing and selecting the correct model for the data.

### KV layer - key length

Short keys should be preferred over long ones. Long keys naturally increase the disk space usage
increasing the overall IO pressure but also affect the shape of the B-Tree. The longer keys are used,
the deeper B-tree will become and thus a longer B-tree traversal needs to be performed to find specific
key entry. Larger B-tree will also mean that the internal B-tree cache will perform much worse reducing
hit/miss ratio.

### KV layer - sequential keys

Sequentially built keys (like those based on monotonically increasing numbers)
should be preferred over randomly generated ones.
This directly relates to hit/miss ration of the the B-tree cache.
Sequential keys tend to use similar parts of the B-tree thus there is a much higher
probability that B-tree traversal will use cached nodes.

This is especially important when immudb is used with an S3 remote storage.
Any B-tree cache miss will result in a heavy read operation for the S3 server.

### SQL layer - indexes

All SQL operations in immudb are lowered to operations on the KV layer.
To optimize the performance of the SQL engine it is thus important to
understand how immudb generates keys for the KV layer from SQL data.

Low-level keys generated by the SQL layer are directly related to
SQL indexes. Each index consists of serialized values of columns
that are part of the index. This means that the more columns are in
the index, the longer keys will be produced. Same happens with
column types. Small types such as INTEGER will result in short
low-level key where larger ones (such as VARCHAR with large limit)
will produce very long keys.

Each table can have multiple indexes where each new index will
generate new entries inserted into the KV layer. It is thus important
to avoid creating unnecessary indexes.

</WrappedSection>

<WrappedSection>

## immudb replicas

immudb offers [replication](replication.md) mechanism where replicas follow the leader
node cloning its data.

Such replica nodes can be used to handle read operations reducing the
load in the leader node. In such scenario it is important to ensure
that the replica is following the leader in asynchronous mode
resulting in an eventual consistency guarantees.

Replication can be configured in various ways including tree-like topology
and multiple replication levels (like [replicas of replicas](replication.md#replica-of-a-replica)).
With such feature, the immudb cluster can be scaled to a very large topology with the ability
to handle huge read workloads.

</WrappedSection>

<WrappedSection>

## embedded immudb vs standalone service

immudb can be easily [embedded](../embedded/embedding.md) into other golang applications.
By doing so, the application does access immudb data directly without additional TCP connection.
That way the additional cost of handling TCP connectivity, GRPC serialization etc. are removed.

It is important to note however that the embedded immudb interface is much simpler
than the GRPC API - e.g. it has no direct support for references or sorted sets.
In addition to that, any networking-related features such as replication or backups
must be handled by the application itself.

</WrappedSection>
