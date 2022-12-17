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
package io.codenotary.immudb.helloworld;

import java.util.Arrays;
import java.util.List;

import io.codenotary.immudb4j.Entry;
import io.codenotary.immudb4j.FileImmuStateHolder;
import io.codenotary.immudb4j.ImmuClient;

public class App {

    public static void main(String[] args) {

        ImmuClient client = null;

        try {

            FileImmuStateHolder stateHolder = FileImmuStateHolder.newBuilder()
                    .withStatesFolder("./immudb_states")
                    .build();

            client = ImmuClient.newBuilder()
                    .withServerUrl("127.0.0.1")
                    .withServerPort(3322)
                    .withStateHolder(stateHolder)
                    .build();

            client.openSession("defaultdb", "immudb", "immudb");

            byte[] value1 = { 0, 1, 2, 3 };
            byte[] value2 = { 4, 5, 6, 7 };

            client.set("key1", value1);
            client.set("key2", value2);

            List<String> keys = Arrays.asList("key1", "key2");
            List<Entry> entries = client.getAll(keys);

            for (Entry entry : entries) {
                System.out.format("('%s', '%s')\n", new String(entry.getKey()), Arrays.toString(entry.getValue()));
            }

            client.closeSession();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (client != null) {
                try {
                    client.shutdown();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

    }

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
package io.codenotary.immudb.helloworld;

import io.codenotary.immudb4j.FileImmuStateHolder;
import io.codenotary.immudb4j.ImmuClient;
import io.codenotary.immudb4j.KVListBuilder;

public class App {

    public static void main(String[] args) {

        ImmuClient client = null;

        try {

            FileImmuStateHolder stateHolder = FileImmuStateHolder.newBuilder()
                    .withStatesFolder("./immudb_states")
                    .build();

            client = ImmuClient.newBuilder()
                    .withServerUrl("127.0.0.1")
                    .withServerPort(3322)
                    .withStateHolder(stateHolder)
                    .build();

            client.openSession("defaultdb", "immudb", "immudb");

            byte[] value1 = { 0, 1, 2, 3 };
            byte[] value2 = { 4, 5, 6, 7 };

            KVListBuilder kvListBuilder = KVListBuilder.newBuilder().
                add("key1", value1).
                add("key2", value2);

            client.setAll(kvListBuilder.entries());

            client.closeSession();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (client != null) {
                try {
                    client.shutdown();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

    }

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

<<< @/src/code-examples/go/develop-kv-txscan/main.go

> Remember to strip the first byte in the key (key prefix).
> Remember that a transaction could contain sorted sets keys that should not be skipped.
:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import java.util.List;

import io.codenotary.immudb4j.FileImmuStateHolder;
import io.codenotary.immudb4j.ImmuClient;
import io.codenotary.immudb4j.Tx;
import io.codenotary.immudb4j.TxHeader;

public class App {

    public static void main(String[] args) {

        ImmuClient client = null;

        try {

            FileImmuStateHolder stateHolder = FileImmuStateHolder.newBuilder()
                    .withStatesFolder("./immudb_states")
                    .build();

            client = ImmuClient.newBuilder()
                    .withServerUrl("127.0.0.1")
                    .withServerPort(3322)
                    .withStateHolder(stateHolder)
                    .build();

            client.openSession("defaultdb", "immudb", "immudb");

            byte[] value1 = { 0, 1, 2, 3 };
            byte[] value2 = { 4, 5, 6, 7 };

            TxHeader hdr = client.set("key1", value1);
            client.set("key2", value2);

            List<Tx> txs = client.txScanAll(hdr.getId());

            for (Tx tx : txs) {
                System.out.format("tx '%d'\n", tx.getHeader().getId());
            }

            client.closeSession();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (client != null) {
                try {
                    client.shutdown();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

    }

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
<<< @/src/code-examples/go/develop-kv-txfilter/main.go
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