# Reads And Writes

Most of the methods in SDKs have `Verified` equivalent, i.e. `Get` and `VerifiedGet`. The only difference is that with `Verified` methods proofs needed to mathematically verify that the data was not tampered are returned by the server and the verification is done automatically by SDKs. 
Note that generating that proof has a slight performance impact, so primitives are allowed without the proof.
It is still possible to get the proofs for a specific item at any time, so the decision about when or how frequently to do checks (with the Verify version of a method) is completely up to the user.
It's possible also to use dedicated [auditors](../operations/auditor.md) to ensure the database consistency, but the pattern in which every client is also an auditor is the more interesting one.

## Get and Set

`Get`/`VerifiedGet` and `Set`/`VerifiedSet` methods allow for basic operations on a Key Value level. In addition, `GetAll` and `SetAll` methods allow for adding and reading in a single transaction. See [transactions chapter](transactions.md) for more details.

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

	// Without verification
	tx, err := client.Set(context.TODO(), []byte(`x`), []byte(`y`))
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Set: tx: %d", tx.Id)

	entry, err := client.Get(context.TODO(), []byte(`x`))
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Get: %v", entry)

	tx, err = client.SetAll(context.TODO(), &schema.SetRequest{
		KVs: []*schema.KeyValue{
			{Key: []byte(`1`), Value: []byte(`test1`)},
			{Key: []byte(`2`), Value: []byte(`test2`)},
			{Key: []byte(`3`), Value: []byte(`test3`)},
		},
	})
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("SetAll: tx: %d", tx.Id)

	entries, err := client.GetAll(context.TODO(), [][]byte{[]byte(`1`), []byte(`2`), []byte(`3`)})
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("GetAll: %+v", entries)

	// With verification
	tx, err = client.VerifiedSet(context.TODO(), []byte(`xx`), []byte(`yy`))
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("VerifiedSet: tx: %d", tx.Id)

	entry, err = client.Get(context.TODO(), []byte(`xx`))
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("VerifiedGet: %v", entry)
}
```

:::

::: tab Python
```python
from immudb import ImmudbClient
import json

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def encode(what: str):
    return what.encode("utf-8")

def decode(what: bytes):
    return what.decode("utf-8")

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)
    
    # You have to operate on bytes
    setResult = client.set(b'x', b'y')
    print(setResult)            # immudb.datatypes.SetResponse
    print(setResult.id)         # id of transaction
    print(setResult.verified)   # in this case verified = False
                                # see Tamperproof reading and writing

    # Also you get response in bytes
    retrieved = client.get(b'x')
    print(retrieved)        # immudb.datatypes.GetResponse
    print(retrieved.key)    # Value is b'x'
    print(retrieved.value)  # Value is b'y'
    print(retrieved.tx)     # Transaction number

    print(type(retrieved.key))      # <class 'bytes'>
    print(type(retrieved.value))    # <class 'bytes'>

    # Operating with strings
    encodedHello = encode("Hello")
    encodedImmutable = encode("Immutable")
    client.set(encodedHello, encodedImmutable)
    retrieved = client.get(encodedHello)

    print(decode(retrieved.value) == "Immutable")   # Value is True

    notExisting = client.get(b'asdasd')
    print(notExisting)                              # Value is None


    # JSON example
    toSet = {"hello": "immutable"}
    encodedToSet = encode(json.dumps(toSet))
    client.set(encodedHello, encodedToSet)

    retrieved = json.loads(decode(client.get(encodedHello).value))
    print(retrieved)    # Value is {"hello": "immutable"}

    # setAll example - sets all keys to value from dictionary
    toSet = {
        b'1': b'test1',
        b'2': b'test2',
        b'3': b'test3'
    }

    client.setAll(toSet)
    retrieved = client.getAll(list(toSet.keys()))
    print(retrieved) 
    # Value is {b'1': b'test1', b'2': b'test2', b'3': b'test3'}


if __name__ == "__main__":
    main()
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

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

## Get at and since a transaction

You can retrieve a key on a specific transaction with `GetAt`/`VerifiedGetAt`. If you need to check the last value of a key after given transaction (which represent state of the indexer), you can use `GetSince`/`VerifiedGetSince`.
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
	opts := immudb.DefaultOptions().WithAddress("localhost").WithPort(3322)
	client := immudb.NewClient().WithOptions(opts)
	err := client.OpenSession(context.TODO(), []byte(`immudb`), []byte(`immudb`), "defaultdb")
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(context.TODO())

	key := []byte(`123123`)
	var txIDs []uint64
	for _, v := range [][]byte{[]byte(`111`), []byte(`222`), []byte(`333`)} {
		txID, err := client.Set(context.TODO(), key, v)
		if err != nil {
			log.Fatal(err)
		}
		txIDs = append(txIDs, txID.Id)
	}

	otherTxID, err := client.Set(context.TODO(), []byte(`other`), []byte(`other`))
	if err != nil {
		log.Fatal(err)
	}

	// Without verification
	entry, err := client.GetSince(context.TODO(), key, txIDs[0])
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("GetSince first: %+v", entry)

	// With verification
	entry, err = client.VerifiedGetSince(context.TODO(), key, txIDs[0]+1)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("VerifiedGetSince second: %+v", entry)

	// GetAt txID after inserting other data
	_, err = client.GetAt(context.TODO(), key, otherTxID.Id)
	if err == nil {
		log.Fatalf("This should not happen, %+v", entry)
	}

	// Without verification
	entry, err = client.GetAt(context.TODO(), key, txIDs[1])
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("GetAt second: %+v", entry)

	// With verification
	entry, err = client.VerifiedGetAt(context.TODO(), key, txIDs[2])
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("VerifiedGetAt third: %+v", entry)

	// VerifiedGetAt txID after inserting other data
	entry, err = client.VerifiedGetAt(context.TODO(), key, otherTxID.Id)
	if err == nil {
		log.Fatalf("This should not happen, %+v", entry)
	}
}
```

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
    client.login(LOGIN, PASSWORD, database = DB)
    first = client.set(b'justfirsttransaction', b'justfirsttransaction')

    key = b'123123'

    first = client.set(key, b'111')
    firstTransaction = first.id

    second = client.set(key, b'222')
    secondTransaction = second.id

    third = client.set(key, b'333')
    thirdTransaction = third.id

    print(client.verifiedGetSince(key, firstTransaction))   # b"111"
    print(client.verifiedGetSince(key, firstTransaction + 1))   # b"222"

    try:
        # This key wasn't set on this transaction
        print(client.verifiedGetAt(key, firstTransaction - 1))
    except RpcError as exception:
        print(exception.debug_error_string())
        print(exception.details())

    verifiedFirst = client.verifiedGetAt(key, firstTransaction) 
                                    # immudb.datatypes.SafeGetResponse
    print(verifiedFirst.id)         # id of transaction
    print(verifiedFirst.key)        # Key that was modified
    print(verifiedFirst.value)      # Value after this transaction
    print(verifiedFirst.refkey)     # Reference key
									# (Queries And History -> setReference)
    print(verifiedFirst.verified)   # Response is verified or not
    print(verifiedFirst.timestamp)  # Time of this transaction

    print(client.verifiedGetAt(key, secondTransaction))
    print(client.verifiedGetAt(key, thirdTransaction))

    try:
        # Transaction doesn't exists yet
        print(client.verifiedGetAt(key, thirdTransaction + 1))
    except RpcError as exception:
        print(exception.debug_error_string())
        print(exception.details())

if __name__ == "__main__":
    main()

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

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

## Get at revision

Each historical value for a single key is attached a revision number.
Revision numbers start with 1 and each overwrite of the same key results in
a new sequential revision number assignment.

A negative revision number can also be specified which means the nth historical value,
e.g. -1 is the previous value, -2 is the one before and so on.

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
	opts := immudb.DefaultOptions().WithAddress("localhost").WithPort(3322)
	client := immudb.NewClient().WithOptions(opts)
	err := client.OpenSession(context.TODO(), []byte(`immudb`), []byte(`immudb`), "defaultdb")
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(context.TODO())

	// Use dedicated API call
	entry, err := client.GetAtRevision(context.TODO(), []byte("key"), -1)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Retrieved entry at revision %d: %s", entry.Revision, string(entry.Value))

	// Use additional get option
	entry, err = client.Get(context.TODO(), []byte("key"), immudb.AtRevision(-2))
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Retrieved entry at revision %d: %s", entry.Revision, string(entry.Value))
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
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

## Get at TXID

It's possible to retrieve all the keys inside a specific transaction.

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

	setTxFirst, err := client.SetAll(context.TODO(),
		&schema.SetRequest{KVs: []*schema.KeyValue{
			{Key: []byte("key1"), Value: []byte("val1")},
			{Key: []byte("key2"), Value: []byte("val2")},
		}})
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("First txID: %d", setTxFirst.Id)

	// Set keys in another transaction
	setTxSecond, err := client.SetAll(context.TODO(),
		&schema.SetRequest{KVs: []*schema.KeyValue{
			{Key: []byte("key1"), Value: []byte("val11")},
			{Key: []byte("key2"), Value: []byte("val22")},
		}})
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Second txID: %d", setTxSecond.Id)

	// Without verification
	tx, err := client.TxByID(context.TODO(), setTxFirst.Id)
	if err != nil {
		log.Fatal(err)
	}

	for _, entry := range tx.Entries {
		item, err := client.GetAt(context.TODO(), entry.Key, setTxFirst.Id)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("retrieved: %+v", item)
	}

	// With verification
	tx, err = client.VerifiedTxByID(context.TODO(), setTxSecond.Id)
	if err != nil {
		log.Fatal(err)
	}

	for _, entry := range tx.Entries {
		item, err := client.VerifiedGetAt(context.TODO(), entry.Key, setTxSecond.Id)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("retrieved: %+v", item)
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

    keyFirst = b'333'
    keySecond = b'555'

    first = client.set(keyFirst, b'111')
    firstTransaction = first.id

    second = client.set(keySecond, b'222')
    secondTransaction = second.id

    toSet = {
        b'1': b'test1',
        b'2': b'test2',
        b'3': b'test3'
    }

    third = client.setAll(toSet)
    thirdTransaction = third.id

    keysAtFirst = client.txById(firstTransaction)
    keysAtSecond = client.txById(secondTransaction)
    keysAtThird = client.txById(thirdTransaction)

    print(keysAtFirst)  # [b'333']
    print(keysAtSecond) # [b'555']
    print(keysAtThird)  # [b'1', b'2', b'3']


if __name__ == "__main__":
    main()
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

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::

## Conditional writes

immudb can check additional preconditions before the write operation is made.
Precondition is checked atomically with the write operation.
It can be then used to ensure consistent state of data inside the database.

Following preconditions are supported:

* MustExist - precondition checks if given key exists in the database,
  this precondition takes into consideration logical deletion and data expiration,
  if the entry was logically deleted or has expired, MustExist precondition for
  such entry will fail
* MustNotExist - precondition checks if given key does not exist in the database,
  this precondition also takes into consideration logical deletion and data expiration,
  if the entry was logically deleted or has expired, MustNotExist precondition for
  such entry will succeed
* NotModifiedAfterTX - precondition checks if given key was not modified after given transaction id,
  local deletion and setting entry with expiration data is also considered modification of the
  entry

In many cases, keys used for constraints will be the same as keys for written entries.
A good example here is a situation when a value is set only if that key does not exist.
This is not strictly required - keys used in constraints do not have to be the same
or even overlap with keys for modified entries. An example would be if only one of
two keys should exist in the database. In such case, the first key will be modified
and the second key will be used for MustNotExist constraint.

A write operation using precondition can not be done in an asynchronous way.
Preconditions are checked twice when processing such requests - first check is done
against the current state of internal index, the second check is done just before
persisting the write and requires up-to-date index.

Preconditions are available on `SetAll`, `Reference` and `ExecAll` operations.

:::: tabs

::: tab Go

In go sdk, the `schema` package contains convenient wrappers for creating constraint objects,
such as `schema.PreconditionKeyMustNotExist`.

#### Example - ensure modification is done atomically when there are concurrent writers

```go
entry, err := c.Get(ctx, []byte("key"))
if err != nil {
    log.Fatal(err)
}

newValue := modifyValue(entry.Value)

_, err = c.SetAll(ctx, &schema.SetRequest{
    KVs: []*schema.KeyValue{{
        Key:   []byte("key"),
        Value: newValue,
    }},
    Preconditions: []*schema.Precondition{
        schema.PreconditionKeyNotModifiedAfterTX(
            []byte("key"),
            entry.Tx,
        ),
    },
})
if err != nil {
    log.Fatal(err)
}
```

#### Example - allow setting the key only once

```go
tx, err := client.SetAll(ctx, &schema.SetRequest{
    KVs: []*schema.KeyValue{
        {Key: []byte("key"), Value: []byte("val")},
    },
    Preconditions: []*schema.Precondition{
        schema.PreconditionKeyMustNotExist([]byte("key")),
    },
})
if err != nil {
    log.Fatal(err)
}
```

#### Example - set only one key in a group of keys

```go
tx, err := client.SetAll(ctx, &schema.SetRequest{
    KVs: []*schema.KeyValue{
        {Key: []byte("key1"), Value: []byte("val1")},
    },
    Preconditions: []*schema.Precondition{
        schema.PreconditionKeyMustNotExist([]byte("key2")),
        schema.PreconditionKeyMustNotExist([]byte("key3")),
        schema.PreconditionKeyMustNotExist([]byte("key4")),
    },
})
if err != nil {
    log.Fatal(err)
}
```

#### Example - check if returned error indicates precondition failure

```go
import (
    immuerrors "github.com/codenotary/immudb/pkg/client/errors"
)

...

tx, err := client.SetAll(ctx, &schema.SetRequest{
    KVs: []*schema.KeyValue{
        {Key: []byte("key"), Value: []byte("val")},
    },
    Preconditions: []*schema.Precondition{
        schema.PreconditionKeyMustExist([]byte("key")),
    },
})
immuErr := immuerrors.FromError(err)
if immuErr != nil && immuErr.Code() == immuerrors.CodIntegrityConstraintViolation {
    log.Println("Constraint validation failed")
}
```

:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Java
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j)
:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::
