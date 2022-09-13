# Transactions

<WrappedSection>

`GetAll`, `SetAll` and `ExecAll` are the foundation of transactions at key value level in immudb. They allow the execution of a group of commands in a single step, with two important guarantees:

* All the commands in a transaction are serialized and executed sequentially. No request issued by another client can ever interrupt the execution of a transaction. This guarantees that the commands are executed as a single isolated operation.
* Either all of the commands are processed, or none are, so the transaction is also atomic.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-getall/main.go
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

    client.set(b'key1', b'value1')
    client.set(b'key2', b'value2')
    client.set(b'key3', b'value3')
    
    response = client.getAll([b'key1', b'key2', b'key3'])
    print(response) # The same as dictToSetGet, retrieved in one step

if __name__ == "__main__":
    main()
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

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

## SetAll

A more versatile atomic multi set operation

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-setall/main.go
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
    dictToSetGet = {
        b'key1': b'value1',
        b'key2': b'value2',
        b'key3': b'value3'
    }
    response = client.setAll(dictToSetGet)
    print(response.id) # All in one transaction

    response = client.getAll([b'key1', b'key2', b'key3'])
    print(response) # The same as dictToSetGet, retrieved in one step

if __name__ == "__main__":
    main()
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

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

## ExecAll

`ExecAll` allows multiple insertions at once. The difference is that it is possible to specify a list of mixes of key/value sets, references and `zAdd` insertions.
The argument of a `ExecAll` is an array of the following types:

* `Op_Kv`: ordinary key value item
* `Op_ZAdd`: [ZAdd](indexes.md#sorted-sets) option element
* `Op_Ref`: [Reference](queries-history.md#references) option element

It's possible to persist and reference items that are already persisted on disk. In that case is mandatory to provide the index of the referenced item. This has to be done for:

* `Op_ZAdd`
* `Op_Ref`
  If `zAdd` or `reference` is not yet persisted on disk it's possible to add it as a regular key value and the reference is done only. In that case if `BoundRef` is true the reference is bounded to the current transaction values.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-execall/main.go
:::

::: tab Python
```python
from immudb import ImmudbClient
from immudb.datatypes import KeyValue, ZAddRequest, ReferenceRequest

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)

    toExecute = [
        KeyValue(b'key', b'value'), 
        ZAddRequest(b'testscore', 100, b'key'),
        KeyValue(b'key2', b'value2'), 
        ZAddRequest(b'testscore', 150, b'key2'),
        ReferenceRequest(b'reference1', b'key')
    ]
    info = client.execAll(toExecute)
    print(info.id) # All in one transaction

    print(client.zScan(b'testscore', b'', 0, 0, True, 10, True, 0, 200)) # Shows these entries
    print(client.get(b'reference1'))

if __name__ == "__main__":
    main()
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

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

## TxScan

`TxScan` permits iterating over transactions.

The argument of a `TxScan` is an array of the following types:

* `InitialTx`: initial transaction id
* `Limit`: number of transactions returned
* `Desc`: order of returned transacations

</WrappedSection>

:::: tabs

::: tab Go

```go
package main

import (
	"context"
	"log"

	"github.com/codenotary/immudb/pkg/api/schema"
	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
	opts := immudb.DefaultOptions().WithAddress("localhost").WithPort(3322)
	client := immudb.NewClient().WithOptions(opts)
	err := client.OpenSession(context.TODO(), []byte(`immudb`), []byte(`immudb`), "defaultdb")
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(context.TODO())

	tx, err := client.Set(context.TODO(), []byte("key1"), []byte("val1"))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(context.TODO(), []byte("key2"), []byte("val2"))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(context.TODO(), []byte("key3"), []byte("val3"))
	if err != nil {
		log.Fatal(err)
	}

	txs, err := client.TxScan(context.TODO(), &schema.TxScanRequest{
		InitialTx: tx.Id,
		Limit:     3,
		Desc:      true,
	})
	if err != nil {
		log.Fatal(err)
	}

	// Then it's possible to retrieve entries of every transactions:
	for _, tx := range txs.GetTxs() {
		for _, entry := range tx.Entries {
			item, err := client.GetAt(context.TODO(), entry.Key[1:], tx.Header.Id)
			if err != nil {
				item, err = client.GetAt(context.TODO(), entry.Key, tx.Header.Id)
				if err != nil {
					log.Fatal(err)
				}
			}
			log.Printf("retrieved key %s and val %s\n", item.Key, item.Value)
		}
	}
}
```

> Remember to strip the first byte in the key (key prefix).
> Remember that a transaction could contain sorted sets keys that should not be skipped.
:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
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

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

## Filter Transactions

The transaction entries are generated by writing key-value pairs, referencing keys, associating scores to key-value pairs (with `ZAdd` operation), and by mapping SQL data model into key-value model.

With `TxScan` or `TxByIDWithSpec` operations it's possible to retrieve entries of certain types, either retrieving the digest of the value assigned to the key (`EntryTypeAction_ONLY_DIGEST`), the raw value (`EntryTypeAction_RAW_VALUE`) or the structured value (`EntryTypeAction_RESOLVE`).

</WrappedSection>

:::: tabs

::: tab Go

```go
package main

import (
	"context"
	"log"

	"github.com/codenotary/immudb/pkg/api/schema"
	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
	opts := immudb.DefaultOptions().WithAddress("localhost").WithPort(3322)
	client := immudb.NewClient().WithOptions(opts)
	err := client.OpenSession(context.TODO(), []byte(`immudb`), []byte(`immudb`), "defaultdb")
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(context.TODO())

	hdr, err := client.ExecAll(context.TODO(), &schema.ExecAllRequest{
		Operations: []*schema.Op{
			{
				Operation: &schema.Op_Kv{
					Kv: &schema.KeyValue{
						Key:   []byte("key1"),
						Value: []byte("value1"),
					},
				},
			},
			{
				Operation: &schema.Op_Ref{
					Ref: &schema.ReferenceRequest{
						Key:           []byte("ref1"),
						ReferencedKey: []byte("key1"),
					},
				},
			},
			{
				Operation: &schema.Op_ZAdd{
					ZAdd: &schema.ZAddRequest{
						Set:   []byte("set1"),
						Score: 10,
						Key:   []byte("key1"),
					},
				},
			},
		},
	})

	// fetch kv and sorted-set entries as structured values while skipping sql-related entries
	tx, err := client.TxByIDWithSpec(context.TODO(), &schema.TxRequest{
		Tx: hdr.Id,
		EntriesSpec: &schema.EntriesSpec{
			KvEntriesSpec: &schema.EntryTypeSpec{
				Action: schema.EntryTypeAction_RESOLVE,
			},
			ZEntriesSpec: &schema.EntryTypeSpec{
				Action: schema.EntryTypeAction_RESOLVE,
			},
			// explicit exclusion is optional
			SqlEntriesSpec: &schema.EntryTypeSpec{
				// resolution of sql entries is not supported
				Action: schema.EntryTypeAction_EXCLUDE,
			},
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	for _, entry := range tx.KvEntries {
		log.Printf("retrieved key %s and val %s", entry.Key, entry.Value)
	}

	for _, entry := range tx.ZEntries {
		log.Printf("retrieved set %s key %s and score %v", entry.Set, entry.Key, entry.Score)
	}

	// scan over unresolved entries
	// either EntryTypeAction_ONLY_DIGEST or EntryTypeAction_RAW_VALUE options
	for _, entry := range tx.Entries {
		log.Printf("retrieved key %s and digest %v", entry.Key, entry.HValue)
	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::