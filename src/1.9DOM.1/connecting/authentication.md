# Authentication

<WrappedSection>

## With credentials

The immudb server runs on port 3322 as the default. The code examples below illustrate how to connect your client to the server and authenticate using default options and the default username and password.
You can modify defaults on the immudb server in [immudb.toml](https://github.com/codenotary/immudb/blob/master/configs/immudb.toml) in the config folder.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/connect-with-auth/main.go
:::

::: tab Python

```python
from grpc import RpcError
from immudb import ImmudbClient

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)


def main():
    client = ImmudbClient(URL)
    # database parameter is optional
    client.login(LOGIN, PASSWORD, database=DB)
    client.logout()

    # Bad login
    try:
        client.login("verybadlogin", "verybadpassword")
    except RpcError as exception:
        print(exception.debug_error_string())
        print(exception.details())


if __name__ == "__main__":
    main()

```
:::

::: tab Java

Under the hood, during `login`, a token is being retrieved from the server,
stored in memory and reused for subsequent operations.

The state is internally used for doing _verified_ operations (such as verifiedSet or verifiedGet).

```java
// Setting the "store" where the internal states are being persisted.
FileImmuStateHolder stateHolder = FileImmuStateHolder.newBuilder()
            .withStatesFolder("immu_states")
            .build();

// Creating an new ImmuClient instance.
ImmuClient immuClient = ImmuClient.newBuilder()
            .withStateHolder(stateHolder)
            .withServerUrl("localhost")
            .withServerPort(3322)
            .build();

// Login with default credentials.
immuClient.login("immudb", "immudb");
```

:::

::: tab .NET

The following code snippets show how to create a client.

Using default configuration:

``` csharp
    ImmuClient immuClient = ImmuClient.NewBuilder().Build();

    // or

    Immuclient immuClient = new ImmuClient();
    Immuclient immuClient = new ImmuClient("localhost", 3322);

```

Setting `immudb` url and port:

``` csharp
    ImmuClient immuClient = ImmuClient.NewBuilder()
                                .WithServerUrl("localhost")
                                .WithServerPort(3322)
                                .Build();

    ImmuClient immuClient = ImmuClient.NewBuilder()
                                .WithServerUrl("localhost")
                                .WithServerPort(3322)
                                .Build();

```

Customizing the `State Holder`:

``` csharp
    FileImmuStateHolder stateHolder = FileImmuStateHolder.NewBuilder()
                                        .WithStatesFolder("./my_immuapp_states")
                                        .Build();

    ImmuClient immuClient = ImmuClient.NewBuilder()
                                      .WithStateHolder(stateHolder)
                                      .Build();
```

Use `Open` and `Close` methods to initiate and terminate user sessions:

``` csharp
    await immuClient.Open("usr1", "pwd1", "defaultdb");

    // Interact with immudb using logged-in user.
    //...

    await immuClient.Close();

    // or one liner open the session right 
    client = await ImmuClient.NewBuilder().Open();

    //then close it
    await immuClient.Close();

```

:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

<WrappedSection>

## With Mutual TLS

To enable mutual authentication, a certificate chain must be provided to both the server and client.
That will cause each to authenticate with the other simultaneously.
In order to generate certs, use the [generate.sh](https://github.com/codenotary/immudb/tree/master/tools/mtls) tool from immudb repository. It generates a list of folders containing certificates and private keys to set up a mTLS connection.

</WrappedSection>

<WrappedSection>

```bash
./generate.sh localhost mysecretpassword
```

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/connect-with-mtls/main.go
:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Java
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab .NET
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.NET SDK github project](https://github.com/codenotary/immudb4net/issues/new)
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
 const loginReq: Parameters.Login = { user: IMMUDB_USER, password: IMMUDB_PWD }
 const loginRes = await cl.login(loginReq)
 console.log('success: login:', loginRes)
})()
```

:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

<WrappedSection>

## No Auth

You also have the option to run immudb with authentication disabled. This method is depreciated and not recommended.  

A server configured with databases and user permissions can't be instantiated without authentication enabled. If a valid token is present, authentication is enabled by default.

</WrappedSection>

<WrappedSection>

```bash
$ ./immudb --auth=false
```

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/connect-with-no-auth/main.go
:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Java

```java
FileImmuStateHolder stateHolder = FileImmuStateHolder.newBuilder()
            .withStatesFolder("immu_states")
            .build();

ImmuClient immuClient = ImmuClient.newBuilder()
            .withStateHolder(stateHolder)
            .withServerUrl("localhost")
            .withServerPort(3322)
            .withAuth(false) // No authentication is needed.
            .build();
try {
    immuClient.set(key, val);
} catch (CorruptedDataException e) {
    // ...
}
```

:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

