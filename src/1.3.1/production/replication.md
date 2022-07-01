
# Replication

<WrappedSection>

### Replication strategy

immudb includes support for replication by means of a follower approach. A database can be created or configured either to be a master or a replica of another database.

<div class="wrapped-picture">

![replication using grpc clients](/immudb/replication-servers.jpg)

</div>

During replication, master databases have a passive role. The grpc endpoint `ExportTx` is used by replicas to fetch unseen committed transactions from the master.

Replicas are read only and any direct write operation will be rejected. Using replicas allow to distribute query loads.

<div class="wrapped-picture">

![replicator fetches committed txs via grpc calls and replicate them using in-process method invocations](/immudb/replication-comm.jpg)

</div>

</WrappedSection>

<WrappedSection>
### Replication and users

As shown in the diagram above, the replicator fetches committed transaction from the master via grpc calls. Internally, the replicator instantiates an immudb client (using the official golang SDK) and fetches unseen committed transactions from the master. In order to do so, the replicator requires valid user credentials with admin permissions, otherwise the master will reject any request.

</WrappedSection>

<WrappedSection>

### Creating a replica

Creating a replica of an existent database using immuadmin is super easy: 

```bash
$ ./immuadmin login immudb
Password:
logged in
$ ./immuadmin database create --replication-enabled=true --replication-follower-username=immudb --replication-follower-password=immudb --replication-master-database=defaultdb replicadb
database 'replicadb' {replica: true} successfully created
```

::: tip
Display all database creation flags with 

```bash
$ ./immuadmin help database create 
```
:::

### Creating a second immudb instance to replicate systemdb and defaultdb behaves similarly

Start immudb with enabled replication:

```bash
$ ./immudb --replication-enabled=true --replication-follower-password=immudb  --replication-follower-username=immudb --replication-master-address=127.0.0.1
```

::: tip
Display all replication flags 
```bash
$ ./immudb --help
```
:::

</WrappedSection>

<WrappedSection>
### Multiple replicas

It's possible to create multiple replicas of a database. Each replica works independently of the others.

<div class="wrapped-picture">

![multiple replicas of the same master database](/immudb/replication-multiple.jpg)

</div>

Given the master database acts in passive mode, there are no special steps needed in order to create more replicas. Thus, by repeating the same steps to create the first replica it's possible to configure new ones.

</WrappedSection>

<WrappedSection>

### Replica of a replica

In case many replicas are needed or the master database is under heavy load, it's possible to delegate the creation of replicas to an existent replica. This way, the master database is not affected by the total number of replicas being created.

<div class="wrapped-picture">

![a replica indirectly following the master](/immudb/replication-chain.jpg)

</div>

</WrappedSection>

<WrappedSection>

### External replicator

By creating a database as a replica but with disabled replication, no replicator is created for the database and an external process could be used to replicate committed transactions from the master. The grpc endpoint `ReplicateTx` may be used to externally replicate a transaction.

</WrappedSection>

<WrappedSection>

### Heterogeneous settings

Replication is configured per database. Thus, the same immudb server may hold several master and replica databases at the same time.

<div class="wrapped-picture">

<img src="/immudb/replication-server.jpg" width="300" alt="a single immudb server can hold multiple master and replica databases"/>

</div>

</WrappedSection>







