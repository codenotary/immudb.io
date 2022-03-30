# SDKs api

## Contents
- [Connection and authentication](#connection-and-authentication)
    - [Mutual TLS](#mutual-tls)
    - [Disable authentication](#disable-authentication)
    - [Verify state signature](#verify-state-signature)
- [State management](#state-management)
- [Tamperproof reading and writing](#tamperproof-reading-and-writing)
    - [Verified get and set](#verified-get-and-set)
- [Writing and reading](#writing-and-reading)
    - [Get and Set](#get-and-set)
    - [Get at and since a transaction](#get-at-and-since-a-transaction)
    - [Transaction by index](#transaction-by-index)
    - [Verified transaction by index](#verified-transaction-by-index)
- [History](#history)
- [Counting](#counting)
- [Scan](#scan)
- [References](#references)
    - [SetReference and VerifiedSetReference](#setreference-and-verifiedsetreference)
    - [Resolving reference with transaction id](#resolving-reference-with-transaction-id)
- [Secondary indexes](#secondary-indexes)
    - [Sorted sets](#sorted-sets)
- [Transactions](#transactions)
    - [SetAll](#setall)
    - [GetAll](#setall)
    - [ExecAll](#execall)
    - [Txs Scan](#txs-scan)
- [Tamperproofing utilities](#tamperproofing-utilities)
    - [Current State](#current-state)
- [User management (ChangePermission,SetActiveUser,DatabaseList)](#user-management)
- [Multiple databases(CreateDatabase,UseDatabase)](#multiple-databases)
- [Index cleaning](#index-cleaning)
- [Health](#health)
- [Immudb SDKs examples](#immudb-sdks-examples)


## Connection and authentication

The immudb server runs on port 3323 as the default. The code examples below illustrate how to connect your client to the server and authenticate using default options and the default username and password.
You can modify defaults on the immudb server in `immudb.toml` in the config folder.
:::: tabs

::: tab Go

The Login method returns a token required for all interactions with the server.

```go
import (
	"context"
	"log"

	"github.com/codenotary/immudb/pkg/client"
	"google.golang.org/grpc/metadata"
)

func main() {
c, err := client.NewImmuClient(client.DefaultOptions())
if err != nil {
    log.Fatal(err)
}
ctx := context.Background()
// login with default username and password and storing a token
lr , err := c.Login(ctx, []byte(`immudb`), []byte(`immudb`))
if err != nil {
    log.Fatal(err)
}
// set up an authenticated context that will be required in future operations
md := metadata.Pairs("authorization", lr.Token)
ctx = metadata.NewOutgoingContext(context.Background(), md)
```
:::

::: tab Java

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
	const loginReq: Parameters.Login = { user: IMMUDB_USER, password: IMMUDB_PWD }
	const loginRes = await cl.login(loginReq)
	console.log('success: login:', loginRes)
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

### Mutual TLS
To enable mutual authentication, a certificate chain must be provided to both the server and client.
That will cause each to authenticate with the other simultaneously.
In order to generate certs, use the openssl tool:
[generate.sh](https://github.com/codenotary/immudb/tree/master/tools/mtls).
```bash
./generate.sh localhost mysecretpassword
```
This generates a list of folders containing certificates and private keys to set up a mTLS connection.
:::: tabs

::: tab Go
```go
	client, err := c.NewImmuClient(
		c.DefaultOptions().WithMTLsOptions(
			c.MTLsOptions{}.WithCertificate("{path-to-immudb-src-folder}/tools/mtls/4_client/certs/localhost.cert.pem").
				WithPkey("{path-to-immudb-src-folder}/tools/mtls/4_client/private/localhost.key.pem").
				WithClientCAs("{path-to-immudb-src-folder}/tools/mtls/2_intermediate/certs/ca-chain.cert.pem").
				WithServername("localhost"),
				).
			WithMTLs(true),
		)
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	// login with default username and password
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

### Disable authentication
You also have the option to run immudb with authentication disabled. However, without authentication enabled, it's not possible to connect to a server already configured with databases and user permissions. If a valid token is present, authentication is enabled by default.

:::: tabs

::: tab Go
```go
    client, err := c.NewImmuClient(
		c.DefaultOptions().WithAuth(false),
	)
	if err != nil {
		log.Fatal(err)
	}
	vi, err := client.VerifiedSet(ctx, []byte(`immudb`), []byte(`hello world`))
	if  err != nil {
		log.Fatal(err)
	}
```
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

## State management

It's the responsibility of the immudb client to track the server state. That way it can check each verified read or write operation against a trusted state.

:::: tabs

::: tab Go
The component in charge of state handling is the `StateService`.
To set up the `stateService` 3 interfaces need to be implemented and provided to the `StateService` constructor:
* `Cache` interface in the `cache` package. Standard cache.NewFileCache provides a file state store solution.
* `StateProvider` in the `stateService` package. It provides a fresh state from immudb server when the client is being initialized for the first time. Standard StateProvider provides a service that retrieve immudb first state hash from a gRPC endpoint.
* `UUIDProvider` in the `stateService` package. It provides the immudb identifier. This is needed to allow the client to safely connect to multiple immudb instances. Standard UUIDProvider provides the immudb server identifier from a gRPC endpoint.

Following an example how to obtain a client instance with a custom state service.
```go
    func MyCustomImmuClient(options *c.Options) (cli c.ImmuClient, err error) {
    	ctx := context.Background()

    	cli = c.DefaultClient()

    	options.DialOptions = cli.SetupDialOptions(options)

    	cli.WithOptions(options)

    	var clientConn *grpc.ClientConn
    	if clientConn, err = cli.Connect(ctx); err != nil {
    		return nil, err
    	}

    	cli.WithClientConn(clientConn)

    	serviceClient := schema.NewImmuServiceClient(clientConn)
    	cli.WithServiceClient(serviceClient)

    	if err = cli.WaitForHealthCheck(ctx); err != nil {
    		return nil, err
    	}

    	immudbStateProvider := stateService.NewImmudbStateProvider(serviceClient)
    	immudbUUIDProvider := stateService.NewImmudbUUIDProvider(serviceClient)

    	customDir := "custom_state_dir"
    	os.Mkdir(customDir, os.ModePerm)
    	stateService, err := stateService.NewStateService(
    		cache.NewFileCache(customDir),
    		logger.NewSimpleLogger("immuclient", os.Stderr),
    		immudbStateProvider,
    		immudbUUIDProvider)
    	if err != nil {
    		return nil, err
    	}

    	dt, err := timestamp.NewDefaultTimestamp()
    	if err != nil {
    		return nil, err
    	}

    	ts := c.NewTimestampService(dt)
    	cli.WithTimestampService(ts).WithStateService(stateService)

    	return cli, nil
    }
```
:::

::: tab Java

Any immudb server has its own UUID. This is exposed as part of the login response.
Java SDK can use any implementation of the `ImmuStateHolder` interface, which specifies two methods:
- `ImmuState getState(String serverUuid, String database)` for getting a state.
- `void setState(String serverUuid, ImmuState state)` for setting a state.

Note that a state is related to a specific database (identified by its name) and a server (identified by the UUID).
Currently, Java SDK offers two implementations of this interface for storing and retriving a state:
- `FileImmuStateHolder` that uses a disk file based store.
- `SerializableImmuStateHolder` that uses an in-memory store.

As most of the code snippets include `FileImmuStateHolder`, please find below an example using the in-memory alternative:
```java
SerializableImmuStateHolder stateHolder = new SerializableImmuStateHolder();

ImmuClient immuClient = ImmuClient.newBuilder()
                .withStateHolder(stateHolder)
                .withServerUrl("localhost")
                .withServerPort(3322)
                .build();

immuClient.login("immudb", "immudb");
immuClient.useDatabase("defaultdb");
// ...
immuClient.logout();
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

### Verify state signature

If `immudb` is launched with a private signing key, each signed request can be verified with the public key.
This ensures the server identity.
Check [state signature](/master/immudb/#state-signature) to see how to generate a valid key.

:::: tabs

::: tab Go
```go
    	c, err := client.NewImmuClient(client.DefaultOptions().WithServerSigningPubKey("../../immudb/src/wrong.public.key"))
    	if err != nil {
    		log.Fatal(err)
    	}
    	ctx := context.Background()

    	lr , err := c.Login(ctx, []byte(`immudb`), []byte(`immudb`))
    	if err != nil {
    		log.Fatal(err)
    	}

    	md := metadata.Pairs("authorization", lr.Token)
    	ctx = metadata.NewOutgoingContext(context.Background(), md)

    	if _, err := c.Set(ctx, []byte(`immudb`), []byte(`hello world`)); err != nil {
    		log.Fatal(err)
    	}

    	var state *schema.ImmutableState
    	if state, err = c.CurrentState(ctx); err != nil {
    		log.Fatal(err) // if signature is not verified here is trigger an appropriate error
    	}

    	fmt.Print(state)
```
:::

::: tab Java

```java
// Having immudb server running with state signature enabled
// (by starting it, for example using `immudb --signingKey private_key.pem`)
// we provision the client with the public key file, and this implies that
// state signature verification is done on the client side
// each time the state is retrieved from the server.

File publicKeyFile = new File("path/to/public_key.pem");

immuClient = ImmuClient.newBuilder()
                    .withServerUrl("localhost")
                    .withServerPort(3322)
                    .withServerSigningKey(publicKeyFile.getAbsolutePath())
                    .build();

try {
    ImmuState state = immuClient.currentState();
    // It should all be ok as long as the immudb server has been started with
    // state signature feature enabled, otherwise, this verification will fail.

} catch (RuntimeException e) {
    // State signature failed.
}
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
	await cl.set({ key: 'immudb', value: 'hello world' })

	const currentStateRes = await cl.currentState();
	console.log('success: currentState', currentStateRes)
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

## Tamperproof reading and writing

You can read and write records securely using built-in cryptographic verification.


### Verified get and set
The client implements the mathematical validations, while your application uses a traditional read or write function.

:::: tabs

::: tab Go
```go
	tx, err := client.VerifiedSet(ctx, []byte(`hello`), []byte(`immutable world`))
    if  err != nil {
    	log.Fatal(err)
	}

	fmt.Printf("Successfully committed and verified tx %d\n", tx.Id)

    entry, err := client.VerifiedGet(ctx, []byte(`hello`))
    if  err != nil {
    	log.Fatal(err)
	}

	fmt.Printf("Successfully retrieved and verified entry: %v\n", entry)
```
:::

::: tab Java

```java
try {
    TxMetadata txMd = immuClient.verifiedSet(key, val);
    System.out.println("Successfully committed and verified tx " + txMd.id);
} catch (VerificationException e) {
    // ...
}

try {
    Entry vEntry = immuClient.verifiedGet(key);
    System.out.println("Successfully retrieved and verified entry: " + vEntry);
} catch (VerificationException e) {
    // ...
}
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
	
	const verifiedSetReq: Parameters.VerifiedSet = {
		key: 'hello',
		value: 'world',
	}
	const verifiedSetRes = await cl.verifiedSet(verifiedSetReq)
	console.log('success: verifiedSet', verifiedSetRes)

	const verifiedGetReq: Parameters.VerifiedGet = {
		key: 'hello',
	}
	const verifiedGetRes = await cl.verifiedGet(verifiedGetReq)
	console.log('success: verifiedGet', verifiedGetRes)
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

## Writing and reading

The format for writing data is the same in both Set and VerifiedSet, as is the same for reading data in both Get and VerifiedGet.

The only difference is that VerifiedSet returns proofs needed to mathematically verify that the data was not tampered.
Note that generating that proof has a slight performance impact, so primitives are allowed without the proof.
It is still possible get the proofs for a specific item at any time, so the decision about when or how frequently to do checks (with the Verify version of a method) is completely up to the user.
It's possible also to use dedicated [auditors](immuclient/#auditor) to ensure the database consistency, but the pattern in which every client is also an auditor is the more interesting one.

### Get and Set

:::: tabs

::: tab Go
```go
    tx, err = client.Set(ctx, []byte(`hello`), []byte(`immutable world`))
	if  err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Successfully committed tx %d\n", tx.Id)

	entry, err := client.Get(ctx, []byte(`hello`))
	if  err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Successfully retrieved entry: %v\n", entry)
```
:::

::: tab Java

```java
String key = "key1";
byte[] value = new byte[]{1, 2, 3};

try {
    immuClient.set(key, value);
} catch (CorruptedDataException e) {
    // ...
}

try {
    value = immuClient.get(key);
} catch (Exception e) {
    // ...
}
```

Note that `value` is a primitive byte array. You can set the value of a String using:<br/>
`"some string".getBytes(StandardCharsets.UTF_8)`

Also, `set` method is overloaded to allow receiving the `key` parameter as a `byte[]` data type.

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

	const setReq: Parameters.Set = { key: 'hello', value: 'world' }
	const setRes = await cl.set(setReq)
	console.log('success: set', setRes)

	const getReq: Parameters.Get = { key: 'hello' }
	const getRes = await cl.get(getReq)
	console.log('success: get', getRes)
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

### Get at and since a transaction

You can retrieve a key on a specific transaction with `VerifiedGetAt` and since a specific transaction with `VerifiedGetSince`.
:::: tabs

::: tab Go
```go
	ventry, err = client.VerifiedGetAt(ctx, []byte(`key`), meta.Id)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Successfully retrieved entry at %v with value %s\n", ventry.Tx, ventry.Value)

	ventry, err = client.VerifiedGetSince(ctx, []byte(`key`), 4)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Successfully retrieved entry at %v with value %s\n", ventry.Tx, ventry.Value)
```
:::

::: tab Java

```java
byte[] key = "key1".getBytes(StandardCharsets.UTF_8);
byte[] val = new byte[]{1, 2, 3, 4, 5};
TxMetadata txMd = null;

try {
    txMd = immuClient.set(key, val);
} catch (CorruptedDataException e) {
    // ...
}

// The standard (traditional) get options:

KV kv = immuClient.getAt(key, txMd.id);

kv = immuClient.getSince(key, txMd.id);

// The verified get flavours:

Entry vEntry = null;
try {
    vEntry = immuClient.verifiedGetAt(key, vEntry.txId);
} catch (VerificationException e) {
    // ...
}

try {
    vEntry = immuClient.verifiedGetSince(key, vEntry.txId);
} catch (VerificationException e) {
    // ...
}
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
	const { id } = await cl.set({ key: 'key', value: 'value' })

	const verifiedGetAtReq: Parameters.VerifiedGetAt = {
		key: 'key',
		attx: id
	}
	const verifiedGetAtRes = await cl.verifiedGetAt(verifiedGetAtReq)
	console.log('success: verifiedGetAt', verifiedGetAtRes)

	for (let i = 0; i < 4; i++) {
		await cl.set({ key: 'key', value: `value-${i}` })
	}

	const verifiedGetSinceReq: Parameters.VerifiedGetSince = {
		key: 'key',
		sincetx: 2
	}
	const verifiedGetSinceRes = await cl.verifiedGetSince(verifiedGetSinceReq)
	console.log('success: verifiedGetSince', verifiedGetSinceRes)
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

### Transaction by index

It's possible to retrieve all the keys inside a specific transaction.

:::: tabs

::: tab Go
```go
    setRequest := &schema.SetRequest{KVs: []*schema.KeyValue{
		{Key: []byte("key1"), Value: []byte("val1")},
		{Key: []byte("key2"), Value: []byte("val2")},
	}}

	meta, err := client.SetAll(ctx, setRequest)
	if err != nil {
		log.Fatal(err)
	}

	tx , err := client.TxByID(ctx, meta.Id)
	if err != nil {
		log.Fatal(err)
	}

	for _, entry := range tx.Entries {
		item, err := client.VerifiedGetAt(ctx, entry.Key, meta.Id)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("retrieved key %s and val %s\n", item.Key, item.Value)
	}
```
:::

::: tab Java

```java
TxMetadata txMd = null;
try {
    txMd = immuClient.verifiedSet(key, val);
} catch (VerificationException e) {
    // ...
}
try {
    Tx tx = immuClient.txById(txMd.id);
} catch (MaxWidthExceededException | NoSuchAlgorithmException e) {
    // ...
}
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
	const { id } = await cl.set({ key: 'key', value: 'value' })

	const txByIdReq: Parameters.TxById = { tx: id }
	const txByIdRes = await cl.txById(txByIdReq)
	console.log('success: txById', txByIdRes)
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

### Verified transaction by index

It's possible to retrieve all the keys inside a specific verified transaction.

:::: tabs

::: tab Go
```go
    setRequest := &schema.SetRequest{KVs: []*schema.KeyValue{
		{Key: []byte("key1"), Value: []byte("val1")},
		{Key: []byte("key2"), Value: []byte("val2")},
	}}

	meta, err := client.SetAll(ctx, setRequest)
	if err != nil {
		log.Fatal(err)
	}

	tx , err := client.VerifiedTxByID(ctx, meta.Id)
	if err != nil {
		log.Fatal(err)
	}

	for _, entry := range tx.Entries {
		item, err := client.VerifiedGetAt(ctx, entry.Key, meta.Id)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("retrieved key %s and val %s\n", item.Key, item.Value)
	}
```
:::

::: tab Java

```java
TxMetadata txMd = null;
try {
    txMd = immuClient.verifiedSet(key, val);
} catch (VerificationException e) {
    // ...
}
try {
    Tx tx = immuClient.verifiedTxById(txMd.id);
} catch (VerificationException e) {
    // ...
}
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
	const { id } = await cl.set({ key: 'key', value: 'value' })
	
	const verifiedTxByIdReq: Parameters.VerifiedTxById = { tx: id }
	const verifiedTxByIdRes = await cl.verifiedTxByID(verifiedTxByIdReq)
	console.log('success: verifiedTxByID', verifiedTxByIdRes)
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

## History

The fundamental property of immudb is that it's an append-only database.
This means that an _update_ does not change an existing record. Instead, it is a new insert of the **same key** with a **new value**.
It's possible to retrieve all the values for a particular key with the history command.

`History` accepts the following parameters:
* `Key`: a key of an item
* `Offset`: the starting index (excluded from the search). Optional
* `Limit`: maximum returned items. Optional
* `Desc`: items are returned in reverse order. Optional
* `SinceTx`:

:::: tabs

::: tab Go
```go
    client.Set(ctx, []byte(`hello`), []byte(`immutable world`))
	client.Set(ctx, []byte(`hello`), []byte(`immudb`))

	req := &schema.HistoryRequest{
		Key: []byte(`hello`),
	}

	entries, err := client.History(ctx, req)
	if  err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Successfully retrieved %d entries for key %s\n", len(entries), req.Key)
```
:::

::: tab Java

```java
try {
    immuClient.set("hello", value1);
    immuClient.set("hello", value2);
} catch (CorruptedDataException e) {
    // ...
}

List<KV> historyResponse1 = immuClient.history("hello", 10, 0, false, 1);
```
Note that, similar with many other methods, `history` method is overloaded to allow different kinds/set of parameters.

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
	
	const key = 'hello'

	await cl.set({ key, value: 'immutable world' })
	await cl.set({ key, value: 'immudb' })

	const historyReq: Parameters.History = {
		key
	}
	const historyRes = cl.history(historyReq)
	console.log('success: history', historyRes)
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

## Counting

Counting entries is not supported at the moment.

:::: tabs

::: tab Go
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Go sdk github project](https://github.com/codenotary/immudb/issues/new)
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

## Scan

The `scan` command is used to iterate over the collection of elements present in the currently selected database.
`Scan` accepts the following parameters:

* `Prefix`: prefix. If not provided all keys will be involved. Optional
* `SeekKey`: initial key for the first entry in the iteration. Optional
* `Desc`: DESC or ASC sorting order. Optional
* `Limit`: maximum returned items. Optional
* `SinceTx`: immudb will wait that the transaction provided by SinceTx be processed. Optional
* `NoWait`: when true scan doesn't wait that txSinceTx is processed. Optional

> Having the possibility to get data specifying a transaction id: `AtTx`, it’s the optimal way to retrieve the data, as it can be done with random access to it. And it can be made immediately after the transaction was committed or at any point in the future. When the transaction ID is unknown by the application and the query is made by key or key prefixes, it will be served through the index, depending on the insertion rate, it can be delayed or up to date with inserted data, using a big number in `SinceTx` with `NoWait` in true will mean that the query will be resolved by looking at the most recent indexed data, but if your query needs to be resolved after some transactions has been inserted, you can set `SinceTx` to specify up to which transaction the index has to be made for resolving it.

:::: tabs

::: tab Go

An ordinary `scan` command and a reversed one.

```go
    client.Set(ctx, []byte(`aaa`), []byte(`item1`))
    client.Set(ctx, []byte(`bbb`), []byte(`item2`))
    client.Set(ctx, []byte(`abc`),[]byte(`item3`))

    scanReq := &schema.ScanRequest{
        Prefix:  []byte(`a`),
    }

    list, err := client.Scan(ctx, scanReq)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%v\n", list)
    scanReq1 := &schema.ScanRequest{
        SeekKey: []byte{0xFF},
        Prefix:  []byte(`a`),
        Desc:    true,
    }

    list, err = client.Scan(ctx, scanReq1)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%v\n", list)
    // scan on all key  values on the current database, with a fresh snapshot
	scanReq2 := &schema.ScanRequest{
		SeekKey: []byte{0xFF},
		Desc:    true,
		SinceTx: math.MaxUint64,
		NoWait:  true,
	}

	list, err = client.Scan(ctx, scanReq2)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", list)
```

:::

::: tab Java

```java
byte[] value1 = {0, 1, 2, 3};
byte[] value2 = {4, 5, 6, 7};

try {
    immuClient.set("scan1", value1);
    immuClient.set("scan2", value2);
} catch (CorruptedDataException e) {
    // ...
}

// Example of using scan(prefix, sinceTxId, limit, desc).
List<KV> scanResult = immuClient.scan("scan", 1, 5, false);
// We expect two entries in the result.
```

`scan` is an overloaded method, therefore multiple flavours of it with different parameter options exist.

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
	
	await cl.set({ key: 'aaa', value: 'item1' })
	await cl.set({ key: 'bbb', value: 'item2' })
	await cl.set({ key: 'abc', value: 'item3' })

	const scanReq: Parameters.Scan = {
		prefix: 'a',
		desc: false,
		limit: 0,
		sincetx: 0
	}
	const scanRes = await cl.scan(scanReq)
	console.log('success: scan', scanRes)

	const scanReq1: Parameters.Scan = {
		prefix: 'a',
		desc: true,
		limit: 0,
		sincetx: 0
	}
	const scanRes1 = await cl.scan(scanReq1)
	console.log('success: scan', scanRes1)
})()
```

Example with an offset:

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
	
	await cl.set({ key: 'aaa', value: 'item1' })
	await cl.set({ key: 'bbb', value: 'item2' })
	await cl.set({ key: 'abc', value: 'item3' })

	const scanReq: Parameters.Scan = {
		seekkey: '',
		prefix: '',
		desc: true,
		limit: 0,
		sincetx: 0
	}
	const scanRes = await cl.scan(scanReq)
	console.log('success: scan', scanRes)

	const scanReq1: Parameters.Scan = {
		seekkey: 'bbb',
		prefix: '',
		desc: true,
		limit: 0,
		sincetx: 0
	}
	const scanRes1 = await cl.scan(scanReq1)
	console.log('success: scan', scanRes1)

	const scanReq2: Parameters.Scan = {
		seekkey: 'b',
		prefix: 'b',
		desc: true,
		limit: 0,
		sincetx: 0
	}
	const scanRes2 = await cl.scan(scanReq2)
	console.log('success: scan', scanRes2)
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

## References

`SetReference` is like a "tag" operation. It appends a reference on a key/value element.
As a consequence, when we retrieve that reference with a `Get` or `VerifiedGet` the value retrieved will be the original value associated with the original key.
Its ```VerifiedReference``` counterpart is the same except that it also produces the inclusion and consistency proofs.

### SetReference and VerifiedSetReference

:::: tabs

::: tab Go
```go
	_, err = client.Set(ctx, []byte(`firstKey`),[]byte(`firstValue`))
	if err != nil {
		log.Fatal(err)
	}
	reference, err := client.SetReference(ctx, []byte(`myTag`), []byte(`firstKey`))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%v\n", reference)
	firstItem, err := client.Get(ctx, []byte(`myTag`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", firstItem)
```

Example with verifications

```go
	_, err = client.Set(ctx, []byte(`secondKey`),[]byte(`secondValue`))
	if err != nil {
		log.Fatal(err)
	}
	reference, err = client.VerifiedSetReference(ctx, []byte(`mySecondTag`), []byte(`secondKey`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)

	secondItem, err := client.Get(ctx, []byte(`mySecondTag`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", secondItem)
```

:::

::: tab Java

```java
byte[] key = "testRef".getBytes(StandardCharsets.UTF_8);
byte[] val = "abc".getBytes(StandardCharsets.UTF_8);

TxMetadata txMd = null;
try {
    txMd = immuClient.set(key, val);
} catch (CorruptedDataException e) {
    // ...
}

byte[] ref1Key = "ref1_to_testRef".getBytes(StandardCharsets.UTF_8);
byte[] ref2Key = "ref2_to_testRef".getBytes(StandardCharsets.UTF_8);

try {
    txMd = immuClient.setReference(ref1Key, key);
} catch (CorruptedDataException e) {
    // ...
}

try {
    txMd = immuClient.verifiedSetReference(ref2Key, key);
} catch (VerificationException e) {
    // ...
}
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
	
	const setReq: Parameters.Set = {
		key: 'firstKey',
		value: 'firstValue'
	}
	await cl.set(setReq)

	const referenceReq: Parameters.SetReference = {
		key: 'myTag',
		referencedKey: 'firstKey'
	}
	const referenceRes = await cl.setReference(referenceReq)
	console.log('success: setReference', referenceRes)

	const getReq: Parameters.Get = {
		key: 'myTag'
	}
	const getRes = await cl.get(getReq)
	console.log('success: get by reference', getRes)
})()
```

Example with verifications

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
	
	const setReq: Parameters.Set = {
		key: 'firstKey',
		value: 'firstValue'
	}
	await cl.set(setReq)

	const verifiedReferenceReq: Parameters.SetReference = {
		key: 'myTag',
		referencedKey: 'firstKey'
	}
	const verifiedReferenceRes = await cl.verifiedSetReference(verifiedReferenceReq)
	console.log('success: verifiedSetReference', verifiedReferenceRes)

	const getReq: Parameters.Get = {
		key: 'myTag'
	}
	const getRes = await cl.get(getReq)
	console.log('success: get by reference', getRes)
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

### GetReference and VerifiedGetReference

When reference is resolved with get or verifiedGet in case of multiples equals references the last reference is returned.
:::: tabs

::: tab Go

```go
    _, err = client.Set(ctx, []byte(`secondKey`),[]byte(`secondValue`))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(ctx, []byte(`secondKey`),[]byte(`thirdValue`))
	if err != nil {
		log.Fatal(err)
	}
	reference, err = client.VerifiedSetReference(ctx, []byte(`myThirdTag`), []byte(`secondKey`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)

	thirdItem, err := client.Get(ctx, []byte(`myThirdTag`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", thirdItem)
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
	
	const setReq: Parameters.Set = {
		key: 'firstKey',
		value: 'firstValue'
	}
	await cl.set(setReq)
	const setReq1: Parameters.Set = {
		key: 'secondKey',
		value: 'secondValue'
	}
	await cl.set(setReq1)

	const verifiedReferenceReq: Parameters.SetReference = {
		key: 'myTag',
		referencedKey: 'firstKey'
	}
	await cl.verifiedSetReference(verifiedReferenceReq)
	const verifiedReferenceReq1: Parameters.SetReference = {
		key: 'myTag',
		referencedKey: 'secondKey'
	}
	await cl.verifiedSetReference(verifiedReferenceReq1)

	const getReq: Parameters.Get = {
		key: 'myTag'
	}
	const getSecondItemRes = await cl.get(getReq)
	console.log('success: get by second reference', getSecondItemRes)
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

### Resolving reference with transaction id

It's possible to bind a reference to a key on a specific transaction using `SetReference` and `VerifiedSetReferenceAt`

:::: tabs

::: tab Go
```go
	meta, err := client.Set(ctx, []byte(`secondKey`),[]byte(`secondValue`))
	if err != nil {
		log.Fatal(err)
	}
	_ , err = client.Set(ctx, []byte(`secondKey`),[]byte(`thirdValue`))
	if err != nil {
		log.Fatal(err)
	}
	reference, err = client.VerifiedSetReferenceAt(ctx, []byte(`myThirdTag`), []byte(`secondKey`), meta.Id )
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)

	thirdItem, err := client.Get(ctx, []byte(`myThirdTag`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", thirdItem)
```
:::

::: tab Java

```java
byte[] key = "testRef".getBytes(StandardCharsets.UTF_8);
byte[] val = "abc".getBytes(StandardCharsets.UTF_8);

byte[] refKey = "ref1_to_testRef".getBytes(StandardCharsets.UTF_8);
TxMetadata setTxMd = null;

try {
    txMd = immuClient.set(key, val);
} catch (CorruptedDataException e) {
    // ...
}

try {
    immuClient.setReferenceAt(refKey, key, txMd.id);
} catch (CorruptedDataException e) {
    // ...
}

try {
    txMd = immuClient.verifiedSetReferenceAt(refKey, key, txMd.id);
} catch (VerificationException e) {
    // ...
}
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

	const { id } = await cl.set({ key: 'firstKey', value: 'firstValue' })
	await cl.set({ key: 'firstKey', value: 'secondValue' })

	const verifiedSetReferenceAtReq: Parameters.VerifiedSetReferenceAt = {
		key: 'myFirstTag',
		referencedKey: 'firstKey',
		attx: id
	}
	const verifiedSetReferenceAtRes = await cl.verifiedSetReferenceAt(verifiedSetReferenceAtReq)
	console.log('success: verifiedSetReferenceAt', verifiedSetReferenceAtRes)

	const getSecondItemRes = await cl.get({ key: 'myFirstTag' })
	console.log('success: get second item by reference', getSecondItemRes)
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

## Secondary indexes

On top of the key value store immudb provides secondary indexes to help developers to handle complex queries.

### Sorted sets
The ```sorted set``` data type provides simplest secondary index you can create with immudb. That's a data structure that represents a set of elements ordered by the score of each element, which is a floating point number.
The score type is a float64 to accommodate the maximum number of uses cases.
64-bit floating point gives a lot of flexibility and dynamic range, at the expense of having only 53-bits of integer.

When an integer64 is cast to a float there _could_ be a loss of precision, but the insertion order is guaranteed by the internal database index that is appended to the internal index key.

`ZAdd` can reference an item by `key` or by `index`.

`ZScan` accepts following arguments:

* `Set`: the name of the collection
* `SeekKey`: initial key for the first entry in the iteration. Optional
* `SeekScore`: the min or max score for the first entry in the iteration, depending on Desc value. Optional
* `SeekAtTx`: the tx id for the first entry in the iteration. Optional
* `InclusiveSeek`: the element resulting from the combination of the `SeekKey` `SeekScore` and `SeekAtTx` is returned with the result. Optional
* `Desc`: DESC or ASC sorting order. Optional
* `SinceTx`: immudb will wait that the transaction provided by SinceTx be processed. Optional
* `NoWait`: when true scan doesn't wait that txSinceTx is processed. Optional
* `MinScore`: minimum score filter. Optional
* `MaxScore`: maximum score filter. Optional
* `Limit`: maximum number of returned items. Optional

> Having the possibility to get data specifying a transaction id: `AtTx`, it’s the optimal way to retrieve the data, as it can be done with random access to it. And it can be made immediately after the transaction was committed or at any point in the future. When the transaction ID is unknown by the application and the query is made by key or key prefixes, it will be served through the index, depending on the insertion rate, it can be delayed or up to date with inserted data, using a big number in `SinceTx` with `NoWait` in true will mean that the query will be resolved by looking at the most recent indexed data, but if your query needs to be resolved after some transactions has been inserted, you can set `SinceTx` to specify up to which transaction the index has to be made for resolving it.

:::: tabs

::: tab Go

```go
	i1, err := client.Set(ctx, []byte(`user1`), []byte(`user1@mail.com`))
	if err != nil{
		log.Fatal(err)
	}
	i2, err := client.Set(ctx, []byte(`user2`), []byte(`user2@mail.com`))
	if err != nil{
		log.Fatal(err)
	}
	i3, err := client.Set(ctx, []byte(`user3`), []byte(`user3@mail.com`))
	if err != nil{
		log.Fatal(err)
	}
	i4, err := client.Set(ctx, []byte(`user3`), []byte(`another-user3@mail.com`))
	if err != nil{
		log.Fatal(err)
	}

	if _ , err = client.ZAddAt(ctx,  []byte(`age`), 25, []byte(`user1`), i1.Id); err != nil {
		log.Fatal(err)
	}
	if _ , err = client.ZAddAt(ctx,  []byte(`age`), 36, []byte(`user2`), i2.Id); err != nil {
		log.Fatal(err)
	}
	if _ , err = client.ZAddAt(ctx,  []byte(`age`), 36, []byte(`user3`), i3.Id); err != nil {
		log.Fatal(err)
	}
	if _ , err = client.ZAddAt(ctx,  []byte(`age`), 54, []byte(`user3`), i4.Id); err != nil {
		log.Fatal(err)
	}

	zscanOpts1 := &schema.ZScanRequest{
		Set:     []byte(`age`),
		SinceTx: math.MaxUint64,
		NoWait: true,
		MinScore: &schema.Score{Score: 36},
	}

	the36YearsOldList, err := client.ZScan(ctx, zscanOpts1)
	if err != nil{
		log.Fatal(err)
	}
	s, _ := json.MarshalIndent(the36YearsOldList, "", "\t")
	fmt.Print(string(s))

	oldestReq := &schema.ZScanRequest{
		Set:           []byte(`age`),
		SeekKey:       []byte{0xFF},
		SeekScore:     math.MaxFloat64,
		SeekAtTx:      math.MaxUint64,
		Limit:         1,
		Desc:          true,
		SinceTx:       math.MaxUint64,
		NoWait:        true,
	}

	oldest, err := client.ZScan(ctx, oldestReq)
	if err != nil{
		log.Fatal(err)
	}
	s, _ = json.MarshalIndent(oldest, "", "\t")
	fmt.Print(string(s))
```

:::

::: tab Java

```java
byte[] value1 = {0, 1, 2, 3};
byte[] value2 = {4, 5, 6, 7};

try {
    immuClient.set("zadd1", value1);
    immuClient.set("zadd2", value2);
} catch (CorruptedDataException e) {
    // ...
}

TxMetadata set1TxMd = null;
try {
    immuClient.zAdd("set1", 1, "zadd1");
    set1TxMd = immuClient.zAdd("set1", 2, "zadd2");

    immuClient.zAddAt("set1", 3, "zadd3", set1TxMd.id);

    immuClient.zAdd("set2", 2, "zadd1");
    immuClient.zAdd("set2", 1, "zadd2");
} catch (CorruptedDataException e) {
    // ...
}

List<KV> zScan1 = immuClient.zScan("set1", set1TxMd.id, 5, false);
// We expect two KVs with key names "zadd1" and "zadd2".

List<KV> zScan2 = immuClient.zScan("set2", 5, false);
// Same as before, we expect two KVs with key names "zadd2" and "zadd1".
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

	const { id: id1 } = await cl.set({ key: 'user1', value: 'user1@mail.com' })
	const { id: id2 } = await cl.set({ key: 'user2', value: 'user2@mail.com' })
	const { id: id3 } = await cl.set({ key: 'user3', value: 'user3@mail.com' })
	const { id: id4 } = await cl.set({ key: 'user3', value: 'another-user3@mail.com' })

	const zAddAtReq1: Parameters.ZAddAt = {
		set: 'age',
		score: 25,
		key: 'user1',
		attx: id1
	}
	const zAddAtRes1 = await cl.zAddAt(zAddAtReq1)
	const zAddAtReq2: Parameters.ZAddAt = {
		set: 'age',
		score: 36,
		key: 'user2',
		attx: id2
	}
	const zAddAtRes2 = await cl.zAddAt(zAddAtReq2)
	const zAddAtReq3: Parameters.ZAddAt = {
		set: 'age',
		score: 36,
		key: 'user3',
		attx: id3
	}
	const zAddAtRes3 = await cl.zAddAt(zAddAtReq3)
	const zAddAtReq4: Parameters.ZAddAt = {
		set: 'age',
		score: 54,
		key: 'user4',
		attx: id4
	}
	const zAddAtRes4 = await cl.zAddAt(zAddAtReq4)

	const zScanReq: Parameters.ZScan = {
		set: 'age',
		sincetx: 0,
		nowait: true,
		minscore: {
			score: 36
		}
	}
	const zScanRes = await cl.zScan(zScanReq)
	console.log('success: zScan all 36-years-old users', zScanRes)
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

## Transactions

`GetAll`, `SetAll` and `ExecAll` are the foundation of transactions in immudb. They allow the execution of a group of commands in a single step, with two important guarantees:
* All the commands in a transaction are serialized and executed sequentially. No request issued by another client can ever interrupt the execution of a transaction. This guarantees that the commands are executed as a single isolated operation.
* Either all of the commands are processed, or none are, so the transaction is also atomic.

### GetAll

:::: tabs

::: tab Go
```go
    itList, err := db.GetAll( [][]byte{
			[]byte("key1"),
			[]byte("key2"),
			[]byte("key3"),
		})
```
:::

::: tab Java

```java
// Using getAll:
List<String> keys = Arrays.asList("key1", "key2", "key3");
List<KV> got = immuClient.getAll(keys);

// Using execAll for setting multiple KVs at once:
byte[] item1 = "execAll_key1".getBytes(StandardCharsets.UTF_8);
byte[] item2 = "execAll_key2".getBytes(StandardCharsets.UTF_8);

immuClient.execAll(
        Arrays.asList(                  // Providing just a kvList, which is a List< Pair<byte[], byte[]> >.
                Pair.of(item1, item1),
                Pair.of(item2, item2)
        ),
        null,                          // No refList provided.
        null                           // No zaddList provided.
);

// Using execAll for setting multiple references and doing zAdd(s):
immuClient.execAll(
        null,                          // No kvList provided.
        Arrays.asList(                 // The refList.
                Pair.of("ref1".getBytes(StandardCharsets.UTF_8), item1),
                Pair.of("ref2".getBytes(StandardCharsets.UTF_8), item2)
        ),
        // The zaddList.
        Collections.singletonList(Triple.of("set1", 1.0, "execAll_key1"))
);
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
	
	const getAllReq: Parameters.GetAll = {
		keysList: ['key1', 'key2', 'key3'],
		sincetx: 0
	}
	const getAllRes = await cl.getAll(getAllReq)
	console.log('success: getAll', getAllRes)
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

### SetAll

A more versatile atomic multi set operation
:::: tabs
SetBatch and GetBatch example
::: tab Go
```go
	kvList := &schema.KVList{KVs: []*schema.KeyValue{
		{Key: []byte("1,2,3"), Value: []byte("3,2,1")},
		{Key: []byte("4,5,6"), Value: []byte("6,5,4")},
	}}

	_, err = client.SetAll(ctx, kvList)
```
:::

::: tab Java

```java
List<KV> kvs = Arrays.asList(
    new KVPair("key1", "val1".getBytes(StandardCharsets.UTF_8)),
    new KVPair("key2", "val2".getBytes(StandardCharsets.UTF_8)),
);

KVList kvList = KVList.newBuilder().addAll(kvs).build();
try {
    immuClient.setAll(kvList);
} catch (CorruptedDataException e) {
    // ...
}
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
	
	const setAllReq: Parameters.SetAll = {
		kvsList: [
			{ key: '1,2,3', value: '3,2,1' },
			{ key: '4,5,6', value: '6,5,4' },
		]
	}
	const setAllRes = await cl.setAll(setAllReq)
	console.log('success: setAll', setAllRes)
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

### ExecAll

`ExecAll` allows multiple insertions at once. The difference is that it is possible to specify a list of mixes of key/value sets, references and zAdd insertions.
The argument of a ExecAll is an array of the following types:
* `Op_Kv`: ordinary key value item
* `Op_ZAdd`: [ZAdd](#sorted-sets) option element
* `Op_Ref`: [Reference](#references) option element

It's possible to persist and reference items that are already persisted on disk. In that case is mandatory to provide the index of the referenced item. This has to be done for:
* `Op_ZAdd`
* `Op_Ref`
If `zAdd` or `reference` is not yet persisted on disk it's possible to add it as a regular key value and the reference is done onFly. In that case if `BoundRef` is true the reference is bounded to the current transaction values.

:::: tabs

::: tab Go

```go
    	aOps := &schema.ExecAllRequest{
    		Operations: []*schema.Op{
    			{
    				Operation: &schema.Op_Kv{
    					Kv: &schema.KeyValue{
    						Key:   []byte(`notPersistedKey`),
    						Value: []byte(`notPersistedVal`),
    					},
    				},
    			},
    			{
    				Operation: &schema.Op_ZAdd{
    					ZAdd: &schema.ZAddRequest{
    						Set:   []byte(`mySet`),
    						Score: 0.4,
    						Key:   []byte(`notPersistedKey`)},
    				},
    			},
    			{
    				Operation: &schema.Op_ZAdd{
    					ZAdd: &schema.ZAddRequest{
    						Set:      []byte(`mySet`),
    						Score:    0.6,
    						Key:      []byte(`persistedKey`),
    						AtTx:     idx.Id,
    						BoundRef: true,
    					},
    				},
    			},
    		},
    	}

    	idx , err = client.ExecAll(ctx, aOps)
    	if err != nil {
    		log.Fatal(err)
    	}
    	zscanOpts1 := &schema.ZScanRequest{
    		Set:     []byte(`mySet`),
    		SinceTx: math.MaxUint64,
    		NoWait: true,
    	}

    	list, err := client.ZScan(ctx, zscanOpts1)
    	if err != nil{
    		log.Fatal(err)
    	}
    	s, _ := json.MarshalIndent(list, "", "\t")
    	fmt.Print(string(s))
```
:::

::: tab Java

```java
byte[] item1 = "execAll_key1".getBytes(StandardCharsets.UTF_8);
byte[] item2 = "execAll_key2".getBytes(StandardCharsets.UTF_8);

// Using execAll just for setting multiple KVs:
TxMetadata txMd = immuClient.execAll(
        Arrays.asList(                 // The kvList.
                Pair.of(item1, item1),
                Pair.of(item2, item2)
        ),
        null,                         // No refList provided.
        null                          // No zaddList provided.
);

immuClient.execAll(
        null,                         // No kvList provided.
        Arrays.asList(                // The refList.
                Pair.of("ref1".getBytes(StandardCharsets.UTF_8), item1),
                Pair.of("ref2".getBytes(StandardCharsets.UTF_8), item2)
        ),
        // The zaddList (even if it has one single entry).
        Collections.singletonList(Triple.of("set1", 1.0, "execAll_key1"))
);
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
	
	const { id } = await cl.set({ key: 'persistedKey', value: 'persistedVal' })

	const setOperation = { kv: { key: 'notPersistedKey', value: 'notPersistedVal' } }
	const zAddOperation = {
		zadd: {
			set: 'mySet',
			score: 0.6,
			key: 'notPersistedKey',
			attx: 0,
			boundref: true
		}
	}
	const zAddOperation1 = {
		zadd: {
			set: 'mySet',
			score: 0.6,
			key: 'persistedKey',
			attx: id,
			boundref: true
		}
	}
	const execAllReq: Parameters.ExecAll = {
		operationsList: [
			setOperation,
			zAddOperation,
			zAddOperation1,
		]
	}
	const execAllRes = await cl.execAll(execAllReq)
	console.log('success: execAll', execAllRes)
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

### Tx Scan

`TxScan` permits iterating over transactions.

The argument of a `TxScan` is an array of the following types:
* `InitialTx`: initial transaction id
* `Limit`: number of transactions returned
* `Desc`: order of returned transacations

:::: tabs

::: tab Go

```go
	_, err = client.Set(ctx, []byte("key1"), []byte("val1"))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(ctx, []byte("key2"), []byte("val2"))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(ctx, []byte("key3"), []byte("val3"))
	if err != nil {
		log.Fatal(err)
	}

	txRequest := &schema.TxScanRequest{
		InitialTx: 2,
		Limit:     3,
		Desc:      false,
	}

	txs , err := client.TxScan(ctx, txRequest)
	if err != nil {
		log.Fatal(err)
	}

	for _, tx := range txs.GetTxs() {
		fmt.Printf("retrieved in ASC tx %d \n", tx.Metadata.Id )
	}
	txRequest = &schema.TxScanRequest{
		InitialTx: 2,
		Limit:     3,
		Desc:      true,
	}

	txs , err = client.TxScan(ctx, txRequest)
	if err != nil {
		log.Fatal(err)
	}
```

Then it's possible to retrieve entries of every transactions:
```go
	for _, tx := range txs.GetTxs() {
		for _, entry := range tx.Entries {
			item, err := client.GetAt(ctx, entry.Key[1:], tx.Metadata.Id)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Printf("retrieved key %s and val %s\n", item.Key, item.Value)
		}
	}
```
> Remember to strip the first byte in the key (key prefix).
> Remember that a transaction could contains sorted sets keys that should not be skipped.
:::

::: tab Java

```java
String key = "txtest-t2";
byte[] val1 = "immuRocks!".getBytes(StandardCharsets.UTF_8);
byte[] val2 = "immuRocks! Again!".getBytes(StandardCharsets.UTF_8);

long initialTxId = 1;
try {
    TxMetadata txMd = immuClient.set(key, val1);
    initialTxId = txMd.id;
    txMd = immuClient.set(key, val2);
} catch (CorruptedDataException e) {
    Assert.fail("Failed at set.", e);
}
            // This is a .txScan(initialTxId, limit, desc)
List<Tx> txs = immuClient.txScan(initialTxId, 1, false);
// We expect one Tx entry in this list.

txs = immuClient.txScan(initialTxId, 2, false);
// We expect two Tx entries in this list.
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

	for (let i = 0; i < 3; i++) {
		await cl.set({ key: `key${i}`, value: `val${i}` })
	}

	const txScanReq: Parameters.TxScan = {
		initialtx: 2,
    limit: 3,
    desc: false
	}
	const txScanRes = await cl.txScan(txScanReq)
	console.log('success: txScan', txScanRes)
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

## Tamperproofing utilities

### Current State
:::: tabs
`CurrentState` returns the last state of the server.

::: tab Go
```go
    	state, err := client.CurrentState(ctx)
    	if err != nil {
    		log.Fatal(err)
    	}

    	fmt.Printf("current state is : %v", state)
```
:::

::: tab Java

```java
ImmuState currState = immuClient.currentState();

System.out.printf("The current state is " + currState.toString());
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
	
	const currentStateRes = await cl.currentState()
	console.log('success: currentState', currentStateRes)
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
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

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
To create a new database, use `CreateDatabase` method.

To write into a specific database an authenticated context is required.
Start by calling the `UseDatabase` method to obtain a `token`.
A token is used for both authorization and routing commands to a specific database.
To set up an authenticated context, it's sufficient to put a `token` inside metadata.

```go
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

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

	// creating a context to write in the new database
	resp, err := client.UseDatabase(ctx, &schema.Database{
		Databasename: "myimmutabledb",
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("auth token: %v", resp.Token)

	md = metadata.Pairs("authorization", resp.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)
	// writing in myimmutabledb
	_, err = client.Set(ctx, []byte(`key`), []byte(`val`))
	if err != nil {
		log.Fatal(err)
	}
```
:::

::: tab Java

This example shows how to create a new database using `createDatabase` method, start _using it_, and set a key value into it.

To write into a specific database an authenticated context is required.
Start by calling the `useDatabase` method to obtain a `token`.
A token is used for both authorization and routing commands to a specific database.
Handling the `token` is managed under the hood by Java SDK.

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

<br/>

## Immudb SDKs examples

Examples in multiple languages can be found at following links:

* [Immudb SDKs examples](https://github.com/codenotary/immudb-client-examples)
