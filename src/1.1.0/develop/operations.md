# Tamper-proof operations
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

<br/>

## Tamperproof reading and writing

You can read and write records securely using a built-in cryptographic verification.


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
