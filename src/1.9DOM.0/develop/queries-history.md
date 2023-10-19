# Queries and history

<WrappedSection>

The fundamental property of immudb is that it's an append-only database.
This means that an _update_ does not change an existing record. Instead, it is a new insert of the **same key** with a **new value**.
It's possible to retrieve all the values for a particular key with the history command.

`History` accepts the following parameters:

* `Key`: a key of an item
* `Offset`: the starting index (excluded from the search). Optional
* `Limit`: maximum returned items. Optional
* `Desc`: items are returned in reverse order. Optional
* `SinceTx`: immudb will wait that the transaction specified by SinceTx is processed. Optional

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-history/main.go
:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Iterator;

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

            byte[] key1 = "myKey1".getBytes(StandardCharsets.UTF_8);
            byte[] value1 = new byte[] { 1, 2, 3 };
            byte[] value2 = new byte[] { 4, 5, 6 };

            client.set(key1, value1);
            client.set(key1, value2);

            Iterator<Entry> it = client.history(key1, false, 0, 0);

            while (it.hasNext()) {
                Entry entry = it.next();

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
Note that, similar with many other methods, `history` method is overloaded to allow different kinds/set of parameters.

:::

::: tab .NET

```csharp

var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

try
{
    await client.Set("history1", value1);
    await client.Set("history1", value2);
    await client.Set("history2", value1);
    await client.Set("history2", value2);
    await client.Set("history2", value3);
}
catch (CorruptedDataException e)
{
   Console.WriteLine("Failed at set.", e);
}

List<Entry> historyResponse1 = await client.History("history1", 10, 0, false);

await client.Close();
```
Note that, similar with many other methods, `history` method is overloaded to allow different kinds/set of parameters.

:::

::: tab Python

Python immudb sdk currently doesn't support `SinceTx` parameter

```python
from immudb import ImmudbClient

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)
    
    client.set(b'test', b'1')
    client.set(b'test', b'2')
    client.set(b'test', b'3')

    history = client.history(b'test', 0, 100, True) # List[immudb.datatypes.historyResponseItem]
    responseItemFirst = history[0]
    print(responseItemFirst.key)    # Entry key (b'test')
    print(responseItemFirst.value)  # Entry value (b'3')
    print(responseItemFirst.tx)     # Transaction id
    
    responseItemThird = history[2]
    print(responseItemThird.key)    # Entry key (b'test')
    print(responseItemThird.value)  # Entry value (b'1')
    print(responseItemThird.tx)     # Transaction id

if __name__ == "__main__":
    main()
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

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<br/>

<WrappedSection>

## Counting

Counting entries is not supported at the moment.

</WrappedSection>

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

::: tab .NET
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4net/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<br/>

<WrappedSection>

## Scan

The `scan` command is used to iterate over the collection of elements present in the currently selected database.
`Scan` accepts the following parameters:

* `Prefix`: prefix. If not provided all keys will be involved. Optional
* `SeekKey`: initial key for the first entry in the iteration. Optional
* `Desc`: DESC or ASC sorting order. Optional
* `Limit`: maximum returned items. Optional
* `SinceTx`: immudb will wait that the transaction provided by SinceTx be processed. Optional
* `NoWait`: Default false. When true scan doesn't wait for the index to be fully  generated and returns the last indexed value. Optional

To gain speed it's possible to specify `noWait=true`. The control will be returned to the caller immediately, without waiting for the indexing to complete. When `noWait` is used, keep in mind that the returned data may not be yet up to date with the inserted data, as the indexing might not have completed.

</WrappedSection>

:::: tabs

::: tab Go

An ordinary `scan` command and a reversed one.

<<< @/src/code-examples/go/develop-kv-scan/main.go
:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Iterator;

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

            byte[] key1 = "myKey1".getBytes(StandardCharsets.UTF_8);
            byte[] value1 = new byte[] { 1, 2, 3 };

            byte[] key2 = "myKey2".getBytes(StandardCharsets.UTF_8);
            byte[] value2 = new byte[] { 4, 5, 6 };

            client.set(key1, value1);
            client.set(key2, value2);

            Iterator<Entry> it = client.scan("myKey");

            while (it.hasNext()) {
                Entry entry = it.next();

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

`scan` is an overloaded method, therefore multiple flavours of it with different parameter options exist.

:::

::: tab .NET

```csharp
var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

byte[] value1 = { 0, 1, 2, 3 };
byte[] value2 = { 4, 5, 6, 7 };

try
{
    await client.Set("scan1", value1);
    await client.Set("scan2", value2);
}
catch (CorruptedDataException e)
{
    Assert.Fail("Failed at set.", e);
}

List<Entry> scanResult = await client.Scan("scan", 5, false);
Console.WriteLine(scanResult.Count);

await client.Close();
```

`scan` is an overloaded method, therefore multiple flavours of it with different parameter options exist.

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
    toSet = {
        b"aaa": b'1',
        b'bbb': b'2',
        b'ccc': b'3',
        b'acc': b'1',
        b'aac': b'2',
        b'aac:test1': b'3',
        b'aac:test2': b'1',
        b'aac:xxx:test': b'2'
    }
    client.setAll(toSet)
    
    result = client.scan(b'', b'', True, 100) # All entries
    print(result)
    result = client.scan(b'', b'aac', True, 100) # All entries with prefix 'aac' including 'aac'
    print(result)

    # Seek key example (allows retrieve entries in proper chunks):
    result = client.scan(b'', b'', False, 3)
    while result:
        for item, value in result.items():
            print("SEEK", item, value)
        lastKey = list(result.keys())[-1]
        result = client.scan(lastKey, b'', False, 3)

if __name__ == "__main__":
    main()
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

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<br/>

<WrappedSection>

## References

`SetReference` is like a "tag" operation. It appends a reference on a key/value element.
As a consequence, when we retrieve that reference with a `Get` or `VerifiedGet` the value retrieved will be the original value associated with the original key.
Its ```VerifiedReference``` counterpart is the same except that it also produces the inclusion and consistency proofs.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-references/main.go

Example with verifications

<<< @/src/code-examples/go/develop-kv-references-verified/main.go
:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

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

            byte[] key = "myKey".getBytes(StandardCharsets.UTF_8);
            byte[] value = new byte[] { 1, 2, 3 };

            byte[] myRef = "myRef".getBytes(StandardCharsets.UTF_8);
            
            client.set(key, value);

            client.setReference(myRef, key);

            Entry entry = client.get(myRef);

            System.out.format("('%s', '%s')\n", new String(entry.getKey()), Arrays.toString(entry.getValue()));
            
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

::: tab .NET

```csharp
var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

byte[] key = Encoding.UTF8.GetBytes("testRef");
byte[] val = Encoding.UTF8.GetBytes("abc");

TxHeader? setTxHdr = null;
try
{
    setTxHdr = await client.Set(key, val);
}
catch (CorruptedDataException e)
{
    Console.WriteLine("Failed at set.", e);
    return;
}

byte[] ref1Key = Encoding.UTF8.GetBytes("ref1_to_testRef");
byte[] ref2Key = Encoding.UTF8.GetBytes("ref2_to_testRef");

TxHeader? ref1TxHdr = null;
try
{
    ref1TxHdr = await client.SetReference(ref1Key, key);
}
catch (CorruptedDataException e)
{
    Console.WriteLine("Failed at setReference", e);
    return;
}

TxHeader? ref2TxHdr = null;
try
{
    ref2TxHdr = await client.SetReference(ref2Key, key, setTxHdr.Id);
}
catch (CorruptedDataException e)
{
    Console.WriteLine("Failed at setReferenceAt.", e);
}

await client.Close();
```

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
    client.verifiedSet(b'x', b'1') 
    client.verifiedSet(b'y', b'1') 
    retrieved = client.verifiedGet(b'x') 
    print(retrieved.refkey)     # Entry reference key (None)

    client.verifiedSetReference(b'x', b'reference1')
    client.setReference(b'x', b'reference2')
    client.setReference(b'y', b'reference2')
    client.verifiedSet(b'y', b'2') 

    retrieved = client.verifiedGet(b'reference1')
    print(retrieved.key)        # Entry key (b'x')
    print(retrieved.refkey)     # Entry reference key (b'reference1')
    print(retrieved.verified)   # Entry verification status (True)

    retrieved = client.verifiedGet(b'reference2')
    print(retrieved.key)        # Entry key (b'y')
    print(retrieved.refkey)     # Entry reference key (b'reference2')
    print(retrieved.verified)   # Entry verification status (True)
    print(retrieved.value)      # Entry value (b'3')

    retrieved = client.verifiedGet(b'x')
    print(retrieved.key)        # Entry key (b'x')
    print(retrieved.refkey)     # Entry reference key (None)
    print(retrieved.verified)   # Entry verification status (True)

    retrieved = client.get(b'reference2')
    print(retrieved.key)        # Entry key (b'y')

if __name__ == "__main__":
    main()
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


::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

### GetReference and VerifiedGetReference

When reference is resolved with get or verifiedGet in case of multiples equals references the last reference is returned.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-references-get/main.go
:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

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

            byte[] key = "myKey".getBytes(StandardCharsets.UTF_8);
            byte[] value1 = new byte[] { 1, 2, 3 };
            byte[] value2 = new byte[] { 4, 5, 6 };

            client.set(key, value1);

            byte[] myRef = "myRef".getBytes(StandardCharsets.UTF_8);
            client.setReference(myRef, key);

            client.set(key, value2);

            Entry entry = client.get(myRef);

            System.out.format("('%s', '%s')\n", new String(entry.getKey()), Arrays.toString(entry.getValue()));
            
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
    client.verifiedSet(b'x', b'1') 
    client.verifiedSet(b'y', b'1') 
    retrieved = client.verifiedGet(b'x') 
    print(retrieved.refkey)     # Entry reference key (None)

    client.verifiedSetReference(b'x', b'reference1')
    client.setReference(b'x', b'reference2')
    client.setReference(b'y', b'reference2')
    client.verifiedSet(b'y', b'2') 

    retrieved = client.verifiedGet(b'reference1')
    print(retrieved.key)        # Entry key (b'x')
    print(retrieved.refkey)     # Entry reference key (b'reference1')
    print(retrieved.verified)   # Entry verification status (True)

    retrieved = client.verifiedGet(b'reference2')
    print(retrieved.key)        # Entry key (b'y')
    print(retrieved.refkey)     # Entry reference key (b'reference2')
    print(retrieved.verified)   # Entry verification status (True)
    print(retrieved.value)      # Entry value (b'3')

    retrieved = client.verifiedGet(b'x')
    print(retrieved.key)        # Entry key (b'x')
    print(retrieved.refkey)     # Entry reference key (None)
    print(retrieved.verified)   # Entry verification status (True)

    retrieved = client.get(b'reference2')
    print(retrieved.key)        # Entry key (b'y')

if __name__ == "__main__":
    main()
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


::: tab .NET

```csharp

using ImmuDB;
using ImmuDB.Exceptions;
using ImmuDB.SQL;

namespace simple_app;

class Program
{
    public static async Task Main(string[] args)
    {
      var client = new ImmuClient();

      await client.Open("immudb", "immudb","defaultdb");
      await client.VerifiedSet("mykey", "myvalue");
      await client.VerifiedSetReference("myreference", "mykey");
      Entry result = await client.Get("myreference");

      System.Console.WriteLine(result.ToString());
    }
}

```

:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::

<WrappedSection>

### Resolving reference with transaction id

It's possible to bind a reference to a key on a specific transaction using `SetReferenceAt` and `VerifiedSetReferenceAt`

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-references-txid/main.go
:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import io.codenotary.immudb4j.Entry;
import io.codenotary.immudb4j.FileImmuStateHolder;
import io.codenotary.immudb4j.ImmuClient;
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

            byte[] key = "myKey".getBytes(StandardCharsets.UTF_8);
            byte[] value1 = new byte[] { 1, 2, 3 };
            byte[] value2 = new byte[] { 4, 5, 6 };

            TxHeader hdr1 = client.set(key, value1);

            byte[] myRef = "myRef".getBytes(StandardCharsets.UTF_8);
            client.setReference(myRef, key, hdr1.getId());

            client.set(key, value2);

            Entry entry = client.get(myRef);

            System.out.format("('%s', '%s')\n", new String(entry.getKey()), Arrays.toString(entry.getValue()));
            
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

::: tab .NET

```csharp

var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

byte[] key = Encoding.UTF8.GetBytes("testRef");
byte[] val = Encoding.UTF8.GetBytes("abc");

TxHeader? setTxHdr = null;
try
{
    setTxHdr = await client.Set(key, val);
}
catch (CorruptedDataException e)
{
    Console.WriteLine("Failed at set.", e);
    return;
}

byte[] ref1Key = Encoding.UTF8.GetBytes("ref1_to_testRef");
byte[] ref2Key = Encoding.UTF8.GetBytes("ref2_to_testRef");

TxHeader? ref1TxHdr = null;
try
{
    ref1TxHdr = await client.SetReference(ref1Key, key);
}
catch (CorruptedDataException e)
{
    Console.WriteLine("Failed at SetReference", e);
    return;
}

TxHeader? ref2TxHdr = null;
try
{
    ref2TxHdr = await client.SetReference(ref2Key, key, setTxHdr.Id);
}
catch (CorruptedDataException e)
{
    Console.WriteLine("Failed at SetReference.", e);
}

await client.Close();
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

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::
