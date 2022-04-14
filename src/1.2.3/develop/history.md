# Queries and history

The fundamental property of immudb is that it's an append-only database.
This means that an _update_ does not change an existing record. Instead, it is a new insert of the **same key** with a **new value**.
It's possible to retrieve all the values for a particular key with the history command.

`History` accepts the following parameters:
* `Key`: a key of an item
* `Offset`: the starting index (excluded from the search). Optional
* `Limit`: maximum returned items. Optional
* `Desc`: items are returned in reverse order. Optional
* `SinceTx`: immudb will wait that the transaction specified by SinceTx is processed. Optional

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

<br/>

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

<br/>

## Scan

The `scan` command is used to iterate over the collection of elements present in the currently selected database.
`Scan` accepts the following parameters:

* `Prefix`: prefix. If not provided all keys will be involved. Optional
* `SeekKey`: initial key for the first entry in the iteration. Optional
* `Desc`: DESC or ASC sorting order. Optional
* `Limit`: maximum returned items. Optional
* `SinceTx`: immudb will wait that the transaction provided by SinceTx be processed. Optional
* `NoWait`: Default false. When true scan doesn't wait for the index to be fully  generated and returns the last indexed value. Optional

>  To gain speed it's possible to specify `noWait=true`. The control will be returned to the caller immediately, without waiting for the indexing to complete. When `noWait` is used, keep in mind that the returned data may not be yet up to date with the inserted data, as the indexing might not have completed.

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

<br/>

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

It's possible to bind a reference to a key on a specific transaction using `SetReferenceAt` and `VerifiedSetReferenceAt`

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
