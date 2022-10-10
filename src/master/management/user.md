# User management

<WrappedSection>

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

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/user-create/main.go
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
        
        String database = "defaultdb";
        String username = "testCreateUser";
        String password = "testTest123!";
        Permission permission = Permission.PERMISSION_RW;

        client.createUser(username, password, permission, database);
        
        System.out.println("listUsers:");
        List<User> users = client.listUsers();
        users.forEach(user -> System.out.println("\t- " + user));

        // Changing the user password.
        client.changePassword(username, password, "newTestTest123!");
    }

}
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

::: tab .NET

```csharp

var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

try
{
    await client.CreateUser("testUser", "testTest123!", Permission.PERMISSION_ADMIN, "defaultdb");
}
catch (Exception e)
{
    Console.WriteLine($"An exception in create user: {e}");
    return;
}

await client.ChangePassword("testUser", "testTest123!", "newTestTest123!");
await client.Close();

```

:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<br/>
