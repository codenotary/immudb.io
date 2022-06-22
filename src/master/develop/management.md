# Management operations

## User management

User management is exposed with following methods:
* CreateUser
* ChangePermission
* ChangePassword

Password must have between 8 and 32 letters, digits and special characters of which at least 1 uppercase letter, 1 digit and 1 special character.

Admin permissions are:
* PermissionSysAdmin = 255
* PermissionAdmin = 254

Non-admin permissions are:
* PermissionNone = 0
* PermissionR = 1
* PermissionRW = 2

:::: tabs

::: tab Go
```go
client, err := immudb.NewClient()
if err != nil {
    log.Fatal(err)
}

ctx := context.Background()

err = client.OpenSession(ctx, []byte(`immudb`), []byte(`immudb`), "defaultdb")
if err != nil {
    log.Fatal(err)
}

defer client.CloseSession(ctx)

err = client.CreateUser(ctx, []byte(`myNewUser1`), []byte(`myS3cretPassword!`), auth.PermissionR, "defaultdb")
if err != nil {
    log.Fatal(err)
}

err = client.ChangePermission(ctx, schema.PermissionAction_GRANT, "myNewUser1", "defaultDB",  auth.PermissionRW)
if err != nil {
    log.Fatal(err)
}

err = client.ChangePassword(ctx, []byte(`myNewUser1`), []byte(`myS3cretPassword!`), []byte(`myNewS3cretPassword!`))
if err != nil {
    log.Fatal(err)
}
```
:::

::: tab Java

```java
String database = "defaultdb";
String username = "testCreateUser";
String password = "testTest123!";
Permission permission = Permission.PERMISSION_RW;

immuClient.login("immudb", "immudb");
immuClient.useDatabase(database);

try {
    immuClient.createUser(username, password, permission, database);
} catch (StatusRuntimeException e) {
    System.out.println("createUser exception: " + e.getMessage());
}

// We expect getting back the previously created "testCreateUser" user.
System.out.println("listUsers:");
List<User> users = immuClient.listUsers();
users.forEach(user -> System.out.println("\t- " + user));

// Changing the user password.
immuClient.changePassword(username, password, "newTestTest123!");
```

:::

::: tab Python
```python
from grpc import RpcError
from immudb import ImmudbClient
from immudb.constants import PERMISSION_ADMIN, PERMISSION_R, PERMISSION_RW
from immudb.grpc.schema_pb2 import GRANT, REVOKE
from enum import IntEnum

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)
    passwordForNewUsers = "Te1st!@#Test"
    try:
        client.createUser("tester1", passwordForNewUsers, PERMISSION_R, DB)
        client.createUser("tester2", passwordForNewUsers, PERMISSION_RW, DB)
        client.createUser("tester3", passwordForNewUsers, PERMISSION_ADMIN, DB)
    except RpcError as exception:
        print(exception.details())

    users = client.listUsers().userlist.users # immudb.handler.listUsers.listUsersResponse
    for user in users:
        print("User", user.user)
        print("Created by", user.createdby)
        print("Creation date", user.createdat)
        print("Is active", user.active)
        for permission in user.permissions:
            print("Permission", permission.database, permission.permission)
        print("---")

    client.login("tester3", passwordForNewUsers, DB)
    client.changePermission(GRANT, "tester2", DB, PERMISSION_ADMIN)
    client.changePermission(REVOKE, "tester2", DB, PERMISSION_ADMIN)

    client.login(LOGIN, PASSWORD, database = DB)
    # Changing password
    client.changePassword("tester1", "N1ewpassword!", passwordForNewUsers)

    # User logs with new password
    client.login("tester1", "N1ewpassword!")

    client.login(LOGIN, PASSWORD, database = DB)
    client.changePassword("tester1", passwordForNewUsers, "N1ewpassword!")
    

    client.login("tester1", passwordForNewUsers, DB)

    # No permissions to write
    try:
        client.set(b"test", b"test")
    except RpcError as exception:
        print(exception.details())

    # But has permissions to read
    result = client.get(b"test")

    client.login("tester3", passwordForNewUsers, DB)

    # Now will have permissions to write
    client.changePermission(GRANT, "tester1", DB, PERMISSION_RW)
    client.login("tester1", passwordForNewUsers, DB)
    client.set(b"test", b"test")
    result = client.get(b"test")

    client.login("tester3", passwordForNewUsers, DB)

    # Now will have permissions to nothing
    client.changePermission(REVOKE, "tester1", DB, PERMISSION_RW)

    try:
        client.login("tester1", passwordForNewUsers, DB)
    except RpcError as exception:
        print(exception.details())
    
    client.login("tester3", passwordForNewUsers, DB)
    client.changePermission(GRANT, "tester1", DB, PERMISSION_RW)


if __name__ == "__main__":
    main()
```
:::

::: tab Node.js
```ts
import ImmudbClient from 'immudb-node'
import Parameters from 'immudb-node/types/parameters'
import { USER_ACTION, USER_PERMISSION } from 'immudb-node/dist/types/user'

const IMMUDB_HOST = '127.0.0.1'
const IMMUDB_PORT = '3322'
const IMMUDB_USER = 'immudb'
const IMMUDB_PWD = 'immudb'

const cl = new ImmudbClient({ host: IMMUDB_HOST, port: IMMUDB_PORT });

(async () => {
	await cl.login({ user: IMMUDB_USER, password: IMMUDB_PWD })

	const createUserRequest: Parameters.CreateUser = {
		user: 'myNewUser1',
		password: 'myS3cretPassword!',
		permission: USER_PERMISSION.READ_ONLY,
		database: 'defaultdb',
	};
	const createUserRes = cl.createUser(createUserRequest)
	console.log('success: createUser', createUserRes)

	const changePermissionReq: Parameters.ChangePermission = {
		action: USER_ACTION.GRANT,
		username: 'myNewUser1',
		database: 'defaultDB',
		permission: USER_PERMISSION.READ_WRITE
	}
	const changePermissionRes = await cl.changePermission(changePermissionReq)
	console.log('success: changePermission', changePermissionRes)

	const changePasswordReq: Parameters.ChangePassword = {
		user: 'myNewUser1',
		oldpassword: 'myS3cretPassword!',
		newpassword: 'myNewS3cretPassword!'
	}
	const changePasswordRes = await cl.changePassword(changePasswordReq)
	console.log('success: changePassword', changePermissionRes)
})()
```
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

<br/>

## Database management

Multi-database support is included in immudb server. immudb automatically creates an initial database named `defaultdb`.

Managing users and databases requires the appropriate privileges. A user with `PermissionAdmin` rights can manage everything. Non-admin users have restricted access and can only read or write databases to which they have been granted permission.

Each database can be configured with a variety of settings. While some values can be changed at any time (though it may require a database reload to take effect), following ones are fixed and cannot be changed: FileSize, MaxKeyLen, MaxValueLen, MaxTxEntries and IndexOptions.MaxNodeSize.

### Configuration options

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
| writeTxHeaderVersion | Uint32 | transaction header version, used for backwards compatibility |
| autoload | Bool | if set to false, do not load database on startup |

Replication settings:

| Name | Type | Description |
|------|------|-------------|
| replica | Bool | if true, the database is a replica of another one |
| masterDatabase | String | name of the database to replicate |
| masterAddress | String | hostname of the master immudb instance |
| masterPort | Uint32 | tcp port of the master immudb instance |
| followerUsername | String | username used to connect to the master immudb instance |
| followerPassword | String | password used to connect to the master immudb instance |

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

### Database creation and selection

This example shows how to create a new database and how to write records to it.
To create a new database, use `CreateDatabaseV2` method then `UseDatabase` to select the newly created one.

:::: tabs

::: tab Go

```go
client, err := immudb.NewClient()
if err != nil {
    log.Fatal(err)
}

ctx := context.Background()

err = client.OpenSession(ctx, []byte(`immudb`), []byte(`immudb`), "defaultdb")
if err != nil {
    log.Fatal(err)
}

defer client.CloseSession(ctx)

err = client.CreateDatabaseV2(ctx, "myimmutabledb", &schema.DatabaseNullableSettings{
    MaxConcurrency: 10, // this setting determines how many transactions can be handled concurrently
})
if err != nil {
    log.Fatal(err)
}

_, err = client.UseDatabase(ctx, &schema.Database{
    Databasename: "myimmutabledb",
})
if err != nil {
    log.Fatal(err)
}

// writing in myimmutabledb
_, err = client.Set(ctx, []byte(`key`), []byte(`val`))
if err != nil {
    log.Fatal(err)
}
```
:::

::: tab Java

```java
immuClient.createDatabase("db1");
immuClient.createDatabase("db2");

immuClient.useDatabase("db1");

try {
    immuClient.set("k0", new byte[]{0, 1, 2, 3});
} catch (CorruptedDataException e) {
    // ...
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
    testDatabase = "test"
    
    databases = client.databaseList()
    if(testDatabase not in databases):
        client.createDatabase(testDatabase)

    client.useDatabase("test")
    client.set(b"test", b"test")
    print(client.get(b"test"))

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

	const useDatabaseReq: Parameters.UseDatabase = {
		databasename: 'myimmutabledb'
	}
	const useDatabaseRes = await cl.useDatabase(useDatabaseReq)
	console.log('success: useDatabase', useDatabaseRes)

	await cl.set('key', 'val')
})()
```
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

### Database listing

This example shows how to list existent databases using `DatabaseListV2` method.

:::: tabs

::: tab Go

```go
client, err := immudb.NewClient()
if err != nil {
    log.Fatal(err)
}

ctx := context.Background()

err = client.OpenSession(ctx, []byte(`immudb`), []byte(`immudb`), "defaultdb")
if err != nil {
    log.Fatal(err)
}

defer client.CloseSession(ctx)

res, err := client.DatabaseListV2(ctx)
if err != nil {
    log.Fatal(err)
}

for _, db := range res.Databases {
    fmt.Printf("database: %s, loaded: %v\r\n", db.Name, db.Loaded)
}
```
:::

::: tab Java
```java
List<String> dbs = immuClient.databases();
// List of database names
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
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

### Database loading/unloading

Databases can be dynamically loaded and unloaded without having to restart the server. After the database is unloaded, all its resources are released. Unloaded databases cannot be queried or written to, but their settings can still be changed.
Upon startup, the immudb server will automatically load databases with the attribute `Autoload` set to true. If a user-created database cannot be loaded successfully, it remains closed, but the server continues to run normally.
As a default, autoloading is enabled when creating a database, but it can be disabled during creation or turned on/off at any time thereafter.

Following example shows how to load and unload a database using `LoadDatabase` and `UnloadDatabase` methods.

:::: tabs

::: tab Go

```go
client, err := immudb.NewClient()
if err != nil {
    log.Fatal(err)
}

ctx := context.Background()

err = client.OpenSession(ctx, []byte(`immudb`), []byte(`immudb`), "defaultdb")
if err != nil {
    log.Fatal(err)
}

defer client.CloseSession(ctx)

_, err = client.LoadDatabase(ctx, &schema.LoadDatabaseRequest{Database: "mydb"})
if err != nil {
    log.Fatal(err)
}

_, err = client.UseDatabase(ctx, &schema.Database{
    Databasename: "mydb",
})
if err != nil {
    log.Fatal(err)
}

// do amazing stuff

_, err = client.UnloadDatabase(ctx, &schema.UnloadDatabaseRequest{Database: "mydb"})
if err != nil {
    log.Fatal(err)
}
```
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

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

### Database settings

Database settings can be individually changed using `UpdateDatabaseV2` method.

Each database can be configured with a variety of settings. While some values can be changed at any time (though it may require a database reload to take effect), following ones are fixed and cannot be changed: FileSize, MaxKeyLen, MaxValueLen, MaxTxEntries and IndexOptions.MaxNodeSize.

Note: Replication settings take effect without the need of reloading the database.

Following example shows how to update database using `UpdateDatabaseV2` method.

:::: tabs

::: tab Go

```go
client, err := immudb.NewClient()
if err != nil {
    log.Fatal(err)
}

ctx := context.Background()
	
err = client.OpenSession(ctx, []byte(`immudb`), []byte(`immudb`), "defaultdb")
if err != nil {
    log.Fatal(err)
}

defer client.CloseSession(ctx)

res, err := client.UpdateDatabaseV2(ctx, "mydb", &schema.DatabaseNullableSettings{
    TxLogCacheSize: &schema.NullableUint32{Value: 1000},
})
if err != nil {
    log.Fatal(err)
}
```
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

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

<br/>

## Index cleaning

Maintaining a healthy disk usage is crucial. immudb has two operations operations aiming to remove unreferenced data from the index.
A full index clean-up is achieved by calling `CompactIndex`, which is a routine that creates a fresh index based on the current state, removing all intermediate data generated over time. The index is generated asynchronously, so new transactions may take place while it is created. As a result, if the server is constantly overloaded, there will likely be blocking times when the newly compacted index replaces the current one.
In the case of continuous load on the server, the `FlushIndex` operation may be used instead. It will dump the current index into disk while partly removing unreferenced data. The `cleanupPercentage` attribute indicates how much space will be scanned for unreferenced data. Even though this operation blocks transaction processing, choosing a small percentage e.g. 0.1 may not significantly hinder normal operations while reducing used storage space. 

Partially compaction may be triggered automatically by immudb. Database settings can be modified to set the `cleanupPercentage` attribute to non-zero in order to accomplish this.

> immudb uses a btree to index key-value entries. While the key is the same submitted by the client, the value stored in the btree is an offset to the file where the actual value as stored, its size and hash value.
The btree is keep in memory as new data is inserted, getting a key or even the historical values of a key can directly be made by using a mutex lock on the btree but scanning by prefix requires the tree to be stored into disk, this is referred as a snapshot.
The persistence is implemented in append-only mode, thus whenever a snapshot is created (btree flushed to disk), updated and new nodes are appended to the file, while new or updated nodes may be linked to unmodified nodes (already written into disk) and those unmodified nodes are not rewritten.
The snapshot creation does not necessarily take place upon each scan by prefix, it's possible to reuse an already created one, client can provide his requirements on how new the snapshot should be by providing a transaction ID which at least must be indexed (sinceTx).
After some time, several snapshots may be created (specified by flushAfter properties of the btree and the scan requests), the file backing the btree will hold several old snapshots. Thus the clean index process will dump to a different location only the latest snapshot but in this case also writing the unmodified nodes. Once that dump is done, the index folder is replaced by the new one.
While the clean process is made, no data is indexed and there will be an extra disk space requirement due to the new dump. Once completed, a considerable disk space will be reduced by removing the previously indexed data (older snapshots).
The btree and clean up process is something specific to indexing. And will not lock transaction processing as indexing is asynchronously generated.

:::: tabs

::: tab Go
```go
// full async index cleanup
err = client.CompactIndex(ctx, &emptypb.Empty{})
// error handling

// partial index cleanup
err = client.FlushIndex(ctx, &schema.FlushIndexRequest{
    CleanupPercentage: 0.1,
	Synced:            false, // if true, fsync after writing data to avoid index regeneration in the case of an unexpected crash
// error handling
```
:::

::: tab Java

```java
immuClient.cleanIndex();
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
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

<br/>

## HealthCheck

HealthCheck return an error if `immudb` status is not ok.
:::: tabs
::: tab Go
```go
err = client.HealthCheck(ctx)
```
:::

::: tab Java

```java
boolean isHealthy = immuClient.healthCheck();
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
    check = client.healthCheck()    # Returns bool
    print(check)                    # True

if __name__ == "__main__":
    main()
```
:::

::: tab Node.js
```ts
import ImmudbClient from 'immudb-node'

const IMMUDB_HOST = '127.0.0.1'
const IMMUDB_PORT = '3322'
const IMMUDB_USER = 'immudb'
const IMMUDB_PWD = 'immudb'

const cl = new ImmudbClient({ host: IMMUDB_HOST, port: IMMUDB_PORT });

(async () => {
	await cl.login({ user: IMMUDB_USER, password: IMMUDB_PWD })

	await cl.health()
})()
```
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::
