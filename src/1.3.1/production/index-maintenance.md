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
<<< @/src/code-examples/go/maintenance-index/main.go
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

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

immudb uses a btree to index key-value entries. While the key is the same submitted by the client, the value stored in the btree is an offset to the file where the actual value as stored, its size and hash value.
The btree is keep in memory as new data is inserted, getting a key or even the historical values of a key can directly be made by using a mutex lock on the btree but scanning by prefix requires the tree to be stored into disk, this is referred as a snapshot.
The persistence is implemented in append-only mode, thus whenever a snapshot is created (btree flushed to disk), updated and new nodes are appended to the file, while new or updated nodes may be linked to unmodified nodes (already written into disk) and those unmodified nodes are not rewritten.
The snapshot creation does not necessarily take place upon each scan by prefix, it's possible to reuse an already created one, client can provide his requirements on how new the snapshot should be by providing a transaction ID which at least must be indexed (sinceTx).
After some time, several snapshots may be created (specified by flushAfter properties of the btree and the scan requests), the file backing the btree will hold several old snapshots. Thus the clean index process will dump to a different location only the latest snapshot but in this case also writing the unmodified nodes. Once that dump is done, the index folder is replaced by the new one.
While the clean process is made, no data is indexed and there will be an extra disk space requirement due to the new dump. Once completed, a considerable disk space will be reduced by removing the previously indexed data (older snapshots).
The btree and clean up process is something specific to indexing. And will not lock transaction processing as indexing is asynchronously generated.

</WrappedSection>