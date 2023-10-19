# Database management

<WrappedSection>

Multi-database support is included in immudb server. immudb automatically creates an initial database named `defaultdb`.

Managing users and databases requires the appropriate privileges. A user with `PermissionAdmin` rights can manage everything. Non-admin users have restricted access and can only read or write databases to which they have been granted permission.

Each database can be configured with a variety of settings. While some values can be changed at any time (though it may require a database reload to take effect), following ones are fixed and cannot be changed: FileSize, MaxKeyLen, MaxValueLen, MaxTxEntries and IndexOptions.MaxNodeSize.

</WrappedSection>

<WrappedSection>

## Database creation

This example shows how to create a new database and how to write records to it.
To create a new database, use `CreateDatabaseV2` method.

:::: tabs

::: tab Go
<<< @/src/code-examples/go/database-create/main.go
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
    
        client.createDatabase("db1");
    }

}
```

:::

::: tab Python

```python
from immudb import ImmudbClient

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)

    client.createDatabase("db1")

if __name__ == "__main__":
    main()
```

:::

::: tab Node.js

```ts
import ImmudbClient from 'immudb-node'
import Parameters from 'immudb-node/types/parameters'

const IMMUDB_HOST = '127.0.0.1'
const IMMUDB_PORT = '3322'
const IMMUDB_USER = 'immudb'
const IMMUDB_PWD = 'immudb'

const cl = new ImmudbClient({ host: IMMUDB_HOST, port: IMMUDB_PORT });

(async () => {
    await cl.login({ user: IMMUDB_USER, password: IMMUDB_PWD })

    const createDatabaseReq: Parameters.CreateDatabase = {
        databasename: 'myimmutabledb'
    }

    const createDatabaseRes = await cl.createDatabase(createDatabaseReq)
    console.log('success: createDatabase', createDatabaseRes)
})()
```

:::

::: tab .NET

```csharp
var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

var dbName = "mydatabase";
await client.CreateDatabase(dbName);
await client.UseDatabase(dbName);

await client.Close();
```

:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

</WrappedSection>

<WrappedSection>

## Listing databases

This example shows how to list existent databases using `DatabaseListV2` method.

:::: tabs

::: tab Go
<<< @/src/code-examples/go/database-list/main.go
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

        List<String> dbs = client.databases();
        // List of database names
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

::: tab .NET

```csharp
var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

var databases = await client.Databases();
foreach(var database in databases)
{
    Console.WriteLine(database);
}

await client.Close();
```

:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

</WrappedSection>

<WrappedSection>

## Database loading/unloading

Databases can be dynamically loaded and unloaded without having to restart the server. After the database is unloaded, all its resources are released. Unloaded databases cannot be queried or written to, but their settings can still be changed.
Upon startup, the immudb server will automatically load databases with the attribute `Autoload` set to true. If a user-created database cannot be loaded successfully, it remains closed, but the server continues to run normally.
As a default, autoloading is enabled when creating a database, but it can be disabled during creation or turned on/off at any time thereafter.

Following example shows how to load and unload a database using `LoadDatabase` and `UnloadDatabase` methods.

:::: tabs

::: tab Go
<<< @/src/code-examples/go/database-load-unload/main.go
:::

::: tab Java
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .NET
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4net/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

</WrappedSection>

<WrappedSection>

## Database settings

Database settings can be individually changed using `UpdateDatabaseV2` method.

Each database can be configured with a variety of settings. While some values can be changed at any time (though it may require a database reload to take effect), following ones are fixed and cannot be changed: FileSize, MaxKeyLen, MaxValueLen, MaxTxEntries and IndexOptions.MaxNodeSize.

Note: Replication settings take effect without the need of reloading the database.

Following example shows how to update database using `UpdateDatabaseV2` method.

:::: tabs

::: tab Go
<<< @/src/code-examples/go/database-settings/main.go
:::

::: tab Java
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .NET
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4net/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

</WrappedSection>

<WrappedSection>

## Configuration options

Following main database options are available:

| Name | Type | Description |
|------|------|-------------|
| replicationSettings | Replication Setings | Repliation settings are described below |
| indexSettings | Index Settings | Index settings are described below |
| fileSize | Uint32 | maximum file size of files on disk generated by immudb |
| maxKeyLen | Uint32 | maximum length of keys for entries stored in the database |
| maxValueLen | Uint32 | maximum length of values for entries stored in the database |
| maxTxEntries | Uint32 | maximum number of entries inside one transaction |
| excludeCommitTime | Bool | if set to true, commit time is not added to transaction headers allowing reproducible database state |
| maxConcurrency | Uint32 | max number of concurrent operations on the db |
| maxIOConcurrency | Uint32 | max number of concurrent IO operations on the db |
| txLogCacheSize | Uint32 | size of transaction log cache |
| vLogMaxOpenedFiles | Uint32 | maximum number of open files for payload data |
| txLogMaxOpenedFiles | Uint32 | maximum number of open files for transaction log |
| commitLogMaxOpenedFiles | Uint32 | maximum number of open files for commit log |
| syncFrequency | duration | set the fsync frequency during commit process (default 20ms)
| write-buffer-size | uint32 | set the size of in-memory buffers for file abstractions (default 4194304)
| writeTxHeaderVersion | Uint32 | transaction header version, used for backwards compatibility |
| autoload | Bool | if set to false, do not load database on startup |

Replication settings:

| Name | Type | Description |
|------|------|-------------|
| replica         | Bool   | if true, the database is a replica of another one |
| primaryDatabase | String | name of the database to replicate |
| primaryHost     | String | hostname of the primary immudb instance |
| primaryPort     | Uint32 | tcp port of the primary immudb instance |
| primaryUsername | String | username used to connect to the primary immudb instance |
| primaryPassword | String | password used to connect to the primary immudb instance |

Additional index options:

| Name | Type | Description |
|------|------|-------------|
| flushThreshold | Uint32 | threshold in number of entries between automatic flushes |
| syncThreshold | Uint32 | threshold in number of entries between flushes with sync |
| cacheSize | Uint32 | size of btree node cache |
| maxNodeSize | Uint32 | max size of btree node in bytes |
| maxActiveSnapshots | Uint32 | max number of active in-memory btree snapshots |
| renewSnapRootAfter | Uint64 | threshold in time for automated snapshot renewal during data scans |
| compactionThld | Uint32 | minimum number of flushed snapshots to enable full compaction of the index |
| delayDuringCompaction | Uint32 | extra delay added during indexing when full compaction is in progress |
| nodesLogMaxOpenedFiles | Uint32 | maximum number of files opened for nodes data |
| historyLogMaxOpenedFiles | Uint32 | maximum number of files opened for nodes history |
| commitLogMaxOpenedFiles | Uint32 | maximum number of files opened for commit log |
| flushBufferSize | Uint32 | in-memory buffer size when doing flush operation |
| cleanupPercentage | Float | % of data to be cleaned up from during next automatic flush operation |

</WrappedSection>
