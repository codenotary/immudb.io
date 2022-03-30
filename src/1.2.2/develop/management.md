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
 client, err := c.NewImmuClient(c.DefaultOptions())
 if err != nil {
  log.Fatal(err)
 }
 ctx := context.Background()
 _ , err = client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

<br/>

## Multiple databases

Starting with version 0.7.0 of immudb, we introduced multi-database support.
By default, the first database is either called `defaultdb` or based on the environment variable `IMMUDB_DBNAME`.
Handling users and databases requires the appropriate privileges.
Users with `PermissionAdmin` can control everything. Non-admin users have restricted permissions and can read or write only their databases, assuming sufficient privileges.
> Each database has default MaxValueLen and MaxKeyLen values. These are fixed respectively to 1MB and 1KB. These values at the moment are not exposed to client SDK and can be modified using internal store options.

:::: tabs

::: tab Go

This example shows how to create a new database and how to write records to it.
To create a new database, use `CreateDatabase` method then `UseDatabase` to select the newly created one.

```go
 client, err := c.NewImmuClient(c.DefaultOptions())
 if err != nil {
  log.Fatal(err)
 }
 ctx := context.Background()
 _ , err = client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

 err = client.CreateDatabase(ctx, &schema.Database{
  Databasename: "myimmutabledb",
 })
 if err != nil {
  log.Fatal(err)
 }
 dbList, err := client.DatabaseList(ctx)
 if err != nil {
  log.Fatal(err)
 }
 fmt.Printf("database list: %v", dbList)

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

List<String> dbs = immuClient.databases();
// We should have three entries: "defaultdb", "db1", and "db2".
```

:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

<br/>

## Index Cleaning

It's important to keep disk usage under control. `CleanIndex` it's a temporary solution to launch an internal clean routine that could free disk space.

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
 client.CleanIndex(ctx, &emptypb.Empty{})
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::
