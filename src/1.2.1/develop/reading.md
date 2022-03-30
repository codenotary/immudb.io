# Reading and inserting data

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
