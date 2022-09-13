# Connecting

## With credentials

The immudb server runs on port 3322 as the default. The code examples below illustrate how to connect your client to the server and authenticate using default options and the default username and password.
You can modify defaults on the immudb server in [immudb.toml](https://github.com/codenotary/immudb/blob/master/configs/immudb.toml) in the config folder.
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

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

## With Mutual TLS

To enable mutual authentication, a certificate chain must be provided to both the server and client.
That will cause each to authenticate with the other simultaneously.
In order to generate certs, use the [generate.sh](https://github.com/codenotary/immudb/tree/master/tools/mtls) tool from immudb repository. It generates a list of folders containing certificates and private keys to set up a mTLS connection.

<WrappedSection>

```bash
./generate.sh localhost mysecretpassword
```

</WrappedSection>

:::: tabs

::: tab Go

```go
package main

import (
	"context"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
	// Folder cotaining MTLS certificates
	pathToMTLSFolder := "./mtls"

	opts := immudb.DefaultOptions().
		WithAddress("localhost").
		WithPort(3322).
		WithMTLs(true).
		WithMTLsOptions(
			immudb.MTLsOptions{}.
				WithCertificate(pathToMTLSFolder + "/4_client/certs/localhost.cert.pem").
				WithPkey(pathToMTLSFolder + "/4_client/private/localhost.key.pem").
				WithClientCAs(pathToMTLSFolder + "/2_intermediate/certs/ca-chain.cert.pem").
				WithServername("localhost"),
		)

	client := immudb.NewClient().WithOptions(opts)
	err := client.OpenSession(context.TODO(), []byte(`immudb`), []byte(`immudb`), "defaultdb")
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(context.TODO())

	// do amazing stuff
}
```

:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Java
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

## No Auth

You also have the option to run immudb with authentication disabled. This method is depreciated and not recommended.  

<WrappedSection>

```bash
$ ./immudb --auth=false
```

</WrappedSection>

However, without authentication enabled, it's not possible to connect to a server already configured with databases and user permissions. If a valid token is present, authentication is enabled by default.

:::: tabs

::: tab Go

```go
package main

import (
	"context"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
	client, err := immudb.NewImmuClient(
		immudb.DefaultOptions().
			WithAddress("localhost").
			WithPort(3322).
			WithAuth(false),
	)
	if err != nil {
		log.Fatal(err)
	}

	_, err = client.VerifiedSet(context.TODO(), []byte(`immudb`), []byte(`hello world`))
	if err != nil {
		log.Fatal(err)
	}
}
```

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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

