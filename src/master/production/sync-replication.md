# Synchronous Replication

<WrappedSection>

### Synchronous Replication

Replication is a common technique used in distributed databases to achieve scalable data distribution for better fault tolerance. Multiple replicas of a primary database server are created for higher durability. One of the replication methods is to update each replica as part of a single atomic transaction, also known as synchronous replication. Consensus algorithms apply this approach to achieve strong consistency on a replicated data set. Immudb now supports the option for synchronous replication.

### Architecture

In synchronous replication, each commit of a write transaction will wait until the confirmation that the commit has been committed to both the primary and quorum of replica server(s). This method minimizes the possibility of data loss.

ImmuDB uses a quorum-based technique to enforce consistent operation in a distributed cluster. A quorum of replicas is used to ensure that synchronous replication is achieved even when replication is not completed across all replica servers. A quorum is a majority of the number of replicas in a cluster setup. The quorum can be set when you create or update your database.

The primary server will wait for acknowledgment from a quorum of replica server(s) that each transaction is committed before proceeding. The drawback is that if enough replica server(s) go down or can’t commit a transaction, and the quorum is not reached, the primary server goes into a hung state.

![synchronous replication](/immudb/replication-sync.png)

Compare this to the asynchronous replication mode, the primary server does not need to wait for transaction-completion acknowledgment from the replica server. The replication transactions queue up on the replica server, and the two servers can remain out-of-sync for a specified time until the processing completes.

![asynchronous replication](/immudb/replication-async.png)

ImmuDB provides support for synchronous replication by means of a follower approach. There are two grpc endpoint used for replication:

- `ExportTx`: Used by replicas to fetch precommitted transactions from the primary database server, and also to send the current database state to update the primary server.

- `ReplicateTx`: Used by replicas to commit precommitted transactions (fetched from the primary) on the replica server.

The primary server keeps a record of the current state of each replica. The current state of each replica is updated through the `ExportTx` grpc call from the replica server. So when a new transaction request comes to the primary server, it precommits the transaction, and checks if a quorum (on the transaction) has been reached by the replica server(s) by checking their state continously. If the quorum was reached, the transaction is marked as successful.

<div class="wrapped-picture">

![how synchronous replication works](/immudb/replication-state.png)

</div>

</WrappedSection>

<WrappedSection>

### Deciding on number of servers in a cluster

Synchronous replication in a cluster can function only if the majority of servers are up and running. In systems doing data replication, it is important to consider the throughput of write operations. Every time data is written to the cluster, it needs to be copied to multiple replicas. Every additional server adds some overhead to complete this write. The latency of data write is directly proportional to the number of servers forming the quorum.

</WrappedSection>

<WrappedSection>

### Settings

Synchronous replication is enabled per database. The following flags in the `immuadmin` tool will help in setting up synchronous replication for your database.

```bash
Flags:
      --replication-allow-tx-discarding              allow precommitted transactions to be discarded if the follower diverges from the master
      --replication-commit-concurrency uint32        set the number of threads for concurrent replication
      --replication-follower-password string         set password used for replication
      --replication-follower-username string         set username used for replication
      --replication-is-replica                       set database as a replica
      --replication-master-address string            set master address
      --replication-master-database string           set master database to be replicated
      --replication-master-port uint32               set master port
      --replication-prefetch-tx-buffer-size uint32   maximum number of prefeched transactions (default 100)
      --replication-sync-enabled                     enable synchronous replication
      --replication-sync-followers uint32            set a minimum number of followers for ack replication before transactions can be committed
```

</WrappedSection>

<WrappedSection>

### Setup

This setup guides you through a simple demonstration of how synchronous replication works in ImmuDB. Starting with a 2-node local cluster, you'll write some data and verify that it replicates in sync.

#### Before you begin

Make sure you already have [ImmuDB installed](../running/download.md).

> Since you're running a local cluster, all nodes use the same hostname (`localhost`).

#### Step 1. Start the cluster

1. Run the primary server:

   ```bash
   $  ./immudb --dir data_master
   ```

2. In a new terminal, start replica server:

   ```bash
   $  ./immudb --dir data_follower \
      --port=3324 \
      --pgsql-server=false \
      --metrics-server=false
   ```

3. In a new terminal, use the [`immuadmin`](../connecting/clitools.md) command to create a database on the primary server:

   Login to immudb

   ```shell
   $ /immuadmin login immudb
   ```

   Create a database `db` that requires 1 confirmation from the synchronous followers to do the commit. 

   > Note that `replication-sync-followers` is not the number of existing followers, but the number of confirmations needed, which ideally should be set to `ceil(number of followers/2)` to commit a transaction on the primary server.

   ```shell
   $ ./immuadmin database create primarydb \
   --replication-sync-followers 1 \
   --replication-sync-enabled
   ```

   At this point, the `primarydb` has been created on the primary server.

4. Use the [`immuadmin`](../connecting/clitools.md) command to create a database on the replica server:

   Login to immudb

   ```shell
   $ /immuadmin login immudb -p 3324
   ```

   Create a database `replicadb` which will sync from the primary server's database `primarydb`

   ```shell
   $ ./immuadmin database create replicadb -p 3324 \
   --replication-enabled \
   --replication-master-address 127.0.0.1 \
   --replication-master-database primarydb \
   --replication-follower-username immudb \
   --replication-follower-password immudb \
   --replication-master-port 3322 \
   --replication-sync-enabled \
   --replication-prefetch-tx-buffer-size 1000 \
   --replication-commit-concurrency 100
   ```

   At this point, the `replicadb` has been created on the replica server to sync with the `primarydb` on master server.

#### Step 2. Send a request

1. Use the [`immuclient`](../connecting/clitools.md) command to commit a transaction on the primary server:

   Login to immudb

   ```shell
   $ ./immuclient login immudb
   ```

   Select database

   ```shell
   $ ./immuclient use primarydb
   ```

   Set a value

   ```shell
   $ ./immuclient safeset foo bar
   ```

2. Verify the transaction on the replica server using the [`immuclient`](../connecting/clitools.md) command:

   Login to immudb

   ```shell
   $ ./immuclient login immudb -p 3324
   ```

   Select database

   ```shell
   $ ./immuclient use primarydb -p 3324
   ```

   Verify the key

   ```shell
   $ ./immuclient safeget foo -p 3324
   ```

#### Step 3. Stop the replica server

1. Stop the replica server running on port 3325

2. Send a transaction to the primary server:

   Login to immudb

   ```shell
   $ ./immuclient login immudb
   ```

   Select database

   ```shell
   $ ./immuclient use primarydb
   ```

   Set a value

   ```shell
   $ ./immuclient safeset foo bar
   ```

   The client will block. This is because the primarydb requires 1 sync follower, and since the replica server is down, there is no ack from the replica server, hence synchronous transaction is blocked.

</WrappedSection>
