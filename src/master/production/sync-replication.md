# Synchronous Replication

<WrappedSection>

## Synchronous Replication

Replication is a common technique used in distributed databases to achieve scalable data distribution for better fault tolerance. Multiple replicas of a primary database server are created for higher durability. One of the replication methods is to update each replica as part of a single atomic transaction, also known as synchronous replication. Consensus algorithms apply this approach to achieve strong consistency on a replicated data set. immudb now supports the option for synchronous replication.

### Architecture

In synchronous replication, each commit of a write transaction will wait until there is a confirmation that the commit has been committed to both the primary and quorum of replica server(s). This method minimizes the possibility of data loss.

immudb uses a quorum-based technique to enforce consistent operation in a distributed cluster. A quorum of replicas is used to ensure that synchronous replication is achieved even when replication is not completed across all replica servers. A quorum is a majority of the number of replicas in a cluster setup. The quorum can be set when creating or updating the database on the primary node.

The primary server will wait for acknowledgment from a quorum of replica server(s) that each transaction is durably stored before proceeding. The drawback is that if enough replica server(s) go down or can’t commit a transaction, and the quorum is not reached, the primary server goes into a hung state.

![synchronous replication](/immudb/replication-sync.png)

Comparing this to the asynchronous replication mode, the primary server does not need to wait for transaction-completion acknowledgment from the replica server. The replication transactions queue up on the replica server, and the two servers can remain out-of-sync for a specified time until the processing completes.

![asynchronous replication](/immudb/replication-async.png)

immudb provides support for synchronous replication by means of a follower approach. There are two grpc endpoint used for replication:

- `ExportTx`: Used by replicas to fetch precommitted transactions from the primary database server, and also to send the current database state to update the primary server.

- `ReplicateTx`: Used by replicas to commit precommitted transactions (fetched from the primary) on the replica server.

The primary server keeps a record of the current state of each replica. The current state of each replica is updated through the `ExportTx` grpc call from the replica server. So when a new transaction request comes to the primary server, it precommits the transaction, and checks if a quorum (on the transaction) has been reached by the replica server(s) by checking their state continuously. If the quorum was reached, the transaction is marked as successful.

<div class="wrapped-picture">

![how synchronous replication works](/immudb/replication-state.png)

</div>

</WrappedSection>

<WrappedSection>

## Deciding on number of servers in a cluster

Synchronous replication in a cluster can function only if the majority of servers are up and running. In systems with enabled data replication, it is important to consider the throughput of write operations. Every time data is written to the cluster, it needs to be copied to multiple replicas. Every additional server adds some overhead to complete this write. The latency of data write is directly proportional to the number of servers forming the quorum.

</WrappedSection>

<WrappedSection>

## Settings

Synchronous replication is enabled per database. The following flags in the `immuadmin` tool will help in setting up synchronous replication for your database.

```bash
Flags:
      --replication-allow-tx-discarding              allow precommitted transactions to be discarded if the follower diverges from the master
      --replication-commit-concurrency uint32        number of concurrent replications (default 10)
      --replication-follower-password string         set password used for replication
      --replication-follower-username string         set username used for replication
      --replication-is-replica                       set database as a replica
      --replication-master-address string            set master address
      --replication-master-database string           set master database to be replicated
      --replication-master-port uint32               set master port
      --replication-prefetch-tx-buffer-size uint32   maximum number of prefeched transactions (default 100)
      --replication-sync-acks uint32                 set a minimum number of replica acknowledgements required before transactions can be committed
      --replication-sync-enabled                     enable synchronous replication
```

</WrappedSection>

<WrappedSection>

## Setup

This setup guides you through a simple demonstration of how synchronous replication works in immudb. Starting with a 2-node local cluster, you'll write some data and verify that it replicates in sync.

#### Before you begin

Make sure you already have [immudb installed](../running/download.md).

> Since you're running a local cluster, all nodes use the same hostname (`localhost`).

#### Step 1. Start the cluster

1. Run the primary server:

   ```bash
   $ immudb --dir data_master
   ```

2. In a new terminal, start replica server:

   ```bash
   $ immudb --dir data_follower \
      --port=3324 \
      --pgsql-server=false \
      --metrics-server=false
   ```

3. In a new terminal, use the [`immuadmin`](../connecting/clitools.md) command to create a database on the primary server:

   Login to immudb

   ```shell
   $ immuadmin login immudb
   ```

   Create a database `db` that requires 1 confirmation from the synchronous followers to do the commit.

   > Note that the number of confirmations needed (`--replication-sync-acks` option) should be set to `ceil(number of followers/2)`
     to achieve majority-based quorum.

   ```shell
   $ immuadmin database create primarydb \
      --replication-sync-acks 1 \
      --replication-sync-enabled
   ```

   At this point, the `primarydb` has been created on the primary server.

4. Use the [`immuadmin`](../connecting/clitools.md) command to create a database on the replica server:

   Login to immudb

   ```shell
   $ immuadmin login immudb -p 3324
   ```

   Create a database `replicadb` which will sync from the primary server's database `primarydb`

   ```shell
   $ immuadmin database create replicadb -p 3324 \
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
   $ immuclient login immudb
   ```

   Select database

   ```shell
   $ immuclient use primarydb
   ```

   Set a value

   ```shell
   $ immuclient safeset foo bar
   ```

2. Verify the transaction on the replica server using the [`immuclient`](../connecting/clitools.md) command:

   Login to immudb

   ```shell
   $ immuclient login immudb -p 3324
   ```

   Select database

   ```shell
   $ immuclient use primarydb -p 3324
   ```

   Verify the key

   ```shell
   $ immuclient safeget foo -p 3324
   ```

#### Step 3. Stop the replica server

1. Stop the replica server running on port 3325

2. Send a transaction to the primary server:

   Login to immudb

   ```shell
   $ immuclient login immudb
   ```

   Select database

   ```shell
   $ immuclient use primarydb
   ```

   Set a value

   ```shell
   $ immuclient safeset foo bar
   ```

   The client will block. This is because the primarydb requires 1 sync follower, and since the replica server is down, there is no ack from the replica server, hence synchronous transaction is blocked.

</WrappedSection>

<WrappedSection>

## Recovering from a replica loss

The primary node will continue read and write operations as long as the required quorum of replicas can send write confirmation to the primary node.
If there are not enough confirmations, write operations will be queued and will wait for enough replicas to synchronize with the cluster.
Read operations in such cases will continue to work.

The simplest way to recover the replica is to simply add a new replica into the cluster and setup replication in the same way as during
the initial cluster setup, e.g.:

```shell
$ immuadmin database create replicadb -p 3324 \
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

The new replica will start fetching transactions from the primary node and as soon as it synchronizes all transactions
it will become a valid member of the quorum for transaction confirmation.

### Speeding up initial replica synchronization

The synchronization process of a new replica may take a lot of time if the database is large or has to handle a lot of normal traffic.
Such replica will fetch all transactions performing additional checksum calculations and validations.
That way the security of the whole cluster is further hardened revealing tampering attempts in any transaction
in the database including those transactions that were not accessed for a very long time.

There are situations however when the speed of recovery is crucial.
In such a situations the data of the database may be copied from another cluster node.
This should be done while the database is unloaded:

#### Step 1. Create replica database

```shell
$ immuadmin database create replicadb -p 3324 \
   --replication-enabled \
   --replication-master-address 127.0.0.1 \
   --replication-master-database primarydb \
   --replication-follower-username immudb \
   --replication-follower-password immudb \
   --replication-master-port 3322 \
   --replication-sync-enabled \
   --replication-prefetch-tx-buffer-size 1000 \
   --replication-commit-concurrency 100
database 'replicadb' {replica: true} successfully created
```

#### Step 2. Unload replica from the database

Once database is unloaded, we can safely work on the files of that database.

```shell
$ immuadmin database unload replicadb
database 'replicadb' successfully unloaded
```

#### Step 3. Copy files from other node

```shell
$ rsync -ave --delete \
   <HEALTHY_REPLICA_HOST>:<HEALTHYREPLICA_DATA_DIR>/replicadb/ \
   <NEW_REPLICA_HOST>:<NEW_REPLICA_DATA_DIR>/replicadb/
sending incremental file list
....

sent 590,357,187 bytes  received 230 bytes  168,673,547.71 bytes/sec
total size is 590,212,158  speedup is 1.00
```

> Note: if there are writes on the database happening during the sync, it is necessary to
> unload the source replica before copying files to avoid inconsistencies between database files.

#### Step 4. Load database on new replica

```shell
$ immuadmin database load replicadb
database 'replicadb' successfully unloaded
```

</WrappedSection>

<WrappedSection>

## Recovering from a primary loss

Current immudb cluster setup requires the primary node to be always predefined.
This means that in case of a primary node loss,
it is necessary to manually promote a replica to become the primary node.

#### Step 1. Inspect states of all replicas in the cluster and choose the new primary node

```shell
$ immuclient login immudb
Password:
Successfully logged in

$ immuclient use replicadb
Now using replicadb

$ immuclient status
database:  replicadb
txID:      734931
hash:      5e2f2feec159bc19c952a7a93832338a178936c5b258d0c906b7c145faf3a4b5
```

The node with highest txID value should become the new primary node.

#### Step 2. Switch the selected replica to become new primary

```shell
$ immuadmin database update replicadb -p 3324 \
   --replication-sync-enabled \
   --replication-sync-acks 1 \
   --replication-is-replica=false
database 'replicadb' {replica: false} successfully updated
```

> Note that the number of required sync followers may be temporarily lowered due to the loss of the primary node.

#### Step 3. Switch other replicas to follow new primary

```shell
$ immuadmin database update replicadb -p 3325 \
   --replication-master-address 127.0.0.1 \
   --replication-master-database replicadb \
   --replication-master-port 3324
```

#### Step 4. Truncate precommitted transactions on other replicas if needed

It may happen that the new replica will reject synchronizing with the new primary.
In such case immudb will report an error in logs:

```text
immudb 2022/10/11 15:57:42 ERROR: follower precommit state at 'replicadb' diverged from master's
```

To fix this issue the replica may need to discard precommited transactions.
This can be easily instructed with the flag `replication-allow-tx-discarding` as follows:

```shell
$ immuadmin database update replicadb -p 3325 --replication-allow-tx-discarding
```

In the case immudb instance itself is run a replica, to fix that issue please restart immudb with the `--replication-allow-tx-discarding` flag that will discard any transaction on the replica that has not yet been fully committed.

#### Step 5. Start a new replica to restore original cluster size

Because the primary node was irrecoverably lost, a new replica should be spawned in its place.
Please refer to the previous section dealing with the loss of replica for more details
on how to add a replacement replica node.

#### Step 6. Point immudb clients to the new primary node

Clients performing write operations should now be switched to the new primary node.

</WrappedSection>

<WrappedSection>

## Changing configuration of a locked primary database

In most cases the primary database can be easily updated and the change will be applied without the need for a restart.
That way the primary node can change the number of required confirmations,
enable/disable synchronous replication and even be converted to a replica.

There can be a situation though where the database is already blocked with writes waiting for confirmations from replicas.
This could happen if replicas became unavailable
or as a result of misconfiguration where the replicas quorum value was set to some large value.

In this situation trying to change the configuration of the database will block as well and will be unblocked once
the database itself continues committing transactions.

If the database can not be fixed to restore commits (e.g. if it is impossible to add enough synced replicas quickly enough),
the following workaround can be used (please note that it requires immudb restart):

1. Update database settings, e.g. run `immuadmin database update` command - that operation will block indefinitely but will
   already persist new database settings
2. Restart the immudb database instance - upon restart, the configuration of the database is read and applied from persistent settings
   thus it will apply the configuration set in the previous step.

With this approach, the number of required confirmations can be lowered down to the correct value
or disabled to switch to asynchronous replication.

</WrappedSection>
