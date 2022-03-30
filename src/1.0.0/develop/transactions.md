# Transactions

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
