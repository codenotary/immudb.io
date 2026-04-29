# Index cleaning

<WrappedSection>

Maintaining a healthy disk usage is crucial. immudb has two operations operations aiming to remove unreferenced data from the index.
A full index clean-up is achieved by calling `CompactIndex`, which is a routine that creates a fresh index based on the current state, removing all intermediate data generated over time. 
The index is generated asynchronously, so new transactions may take place while it is created. As a result, if the server is constantly overloaded, there will likely be blocking times when the newly compacted index replaces the current one.

In the case of continuous load on the server, the `FlushIndex` operation may be used instead. It will dump the current index into disk while partly removing unreferenced data. The `cleanupPercentage` attribute indicates how much space will be scanned for unreferenced data. Even though this operation blocks transaction processing, choosing a small percentage e.g. 0.1 may not significantly hinder normal operations while reducing used storage space. 

Partial compaction may be triggered automatically by immudb. Database settings can be modified to set the `cleanupPercentage` attribute to non-zero in order to accomplish this.

</WrappedSection>

:::: tabs

::: tab Go

```go
package main

import (
	"context"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
	"google.golang.org/protobuf/types/known/emptypb"
)

func main() {
	opts := immudb.DefaultOptions().
		WithAddress("localhost").
		WithPort(3322)

	client := immudb.NewClient().WithOptions(opts)
	err := client.OpenSession(
		context.TODO(),
		[]byte(`immudb`),
		[]byte(`immudb`),
		"defaultdb",
	)
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(context.TODO())

	// partial index cleanup
	_, err = client.FlushIndex(
		context.TODO(),
		0.1,   // Cleanup percentage, this % of index nodes data will be scanned for unreferenced data
		false, // if true, fsync after writing data to avoid index regeneration in the case of an unexpected crash
	)
	if err != nil {
		log.Fatal(err)
	}

	// full async index cleanup
	err = client.CompactIndex(context.TODO(), &emptypb.Empty{})
	if err != nil {
		log.Fatal(err)
	}
}
```

:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import io.codenotary.immudb4j.*;

public class App {

    public static void main(String[] args) {
        FileImmuStateHolder stateHolder = FileImmuStateHolder.newBuilder()
                    .withStatesFolder("./immudb_states")
                    .build();

        ImmuClient client = ImmuClient.newBuilder()
                    .withServerUrl("127.0.0.1")
                    .withServerPort(3322)
                    .withStateHolder(stateHolder)
                    .build();

        client.login("immudb", "immudb");

        // partial index cleanup
        client.flushIndex(0.1, false);

        // full async index cleanup
        client.cleanIndex();
    }

}
```
:::

::: tab .NET

```csharp

var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

await client.FlushIndex(0.1f, false);

await client.Close();

```

:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

## How indexing works

immudb uses a btree to index key-value entries. While the key is the same submitted by the client, the value stored in the btree is an offset to the file where the actual value as stored, its size and hash value.

The btree is keep in memory as new data is inserted, getting a key or even the historical values of a key can directly be made by using a mutex lock on the btree but scanning by prefix requires the tree to be stored into disk, this is referred as a snapshot.
The persistence is implemented in append-only mode, thus whenever a snapshot is created (btree flushed to disk), updated and new nodes are appended to the file, while new or updated nodes may be linked to unmodified nodes (already written into disk) and those unmodified nodes are not rewritten.

The snapshot creation does not necessarily take place upon each scan by prefix, it's possible to reuse an already created one, client can provide his requirements on how new the snapshot should be by providing a transaction ID which at least must be indexed (sinceTx).

After some time, several snapshots may be created (specified by flushAfter properties of the btree and the scan requests), the file backing the btree will hold several old snapshots. Thus the clean index process will dump to a different location only the latest snapshot but in this case also writing the unmodified nodes. Once that dump is done, the index folder is replaced by the new one.

While the clean process is made, no data is indexed and there will be an extra disk space requirement due to the new dump. Once completed, a considerable disk space will be reduced by removing the previously indexed data (older snapshots).
The btree and clean up process is something specific to indexing. And will not lock transaction processing as indexing is asynchronously generated.

</WrappedSection>

<WrappedSection>

## compactor tool

To manage index compaction, you can use the [compactor](https://github.com/codenotary/immudb-tools/tree/main/compactor) tool,
part of the [immudb-tools](https://github.com/codenotary/immudb-tools) repository.

This tool can be used to perform periodic maintenance on your database indexes, or to configure online compaction.

The maintenance can be performed in three different ways:
- online compaction
- percentage compaction
- full flush

In all three modes, new indexes are calculated and old one are discarded. Indexes are organized in chunk files; each time a file only contains discarded indexes, it is automatically deleted.

### Online compaction

This kind of compaction is performed by immudb during normal write operations: once the amount of new written data reaches the percentage threshold configured per one database, immudb cleans up specified percentage of the index data, discarding old unreferenced data.

For every database, users can specify a percentage of total written data to be reindexed on every write.

The compactor tool can be used to enable this mode, and to set the percentage threshold. Once this is done, there is no need to run compactor tool periodically: the compaction will happen automatically.


### Flush compaction

In this mode, the tool calls for immudb to immediately perform a partial compaction, reindexing the oldest data up to the specified percentage. It is similar to the previous mode, but it is performed immediately and must be periodically issued.
The advantage is that you have control on the time when compaction is performed, so that you can leverage periods of less intense activity (e.g.: weekends or nights).


### Full compaction

All indexes are rebuilt. Very resource intensive, but it gives you the most compact representation of indexes.

You can get more information in the [README](https://github.com/codenotary/immudb-tools/tree/main/compactor)

</WrappedSection>
