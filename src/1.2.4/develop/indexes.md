# KV Secondary indexes

On top of the key value store immudb provides secondary indexes to help developers to handle complex queries.

## Sorted sets

The `sorted set` data type provides a simple secondary index that can be created with immudb.
This data structure contains a set of references to other key-value entries.
Elements of this set are ordered using a floating-point `score` specified for each element upon insertion.
Entries having equal score will have the order in which they were inserted into the set.

> Note: The score type is a 64-bit floating point number to support a large number of uses cases.
> 64-bit floating point gives a lot of flexibility and dynamic range, at the expense of having only 53-bits of integer.
> When a 64-bit integer is cast to a float value there _could_ be a loss of precision,
> in which case the order of entries having same float64 score value will be determined by the insertion order.

The KV entry referenced in the set can be bound to a specific transaction id - such entry is called a `bound` reference.
A `bound` reference will always get the value for the key at a specific transaction instead of the most recent value,
including a case where one set contains multiple values for the same key but for different transactions.
That way, sets allow optimal access to historical data using a single immudb read operation.

> Note: If a compound operation is executed with the `ExecAll` call,
> a bound entry added to the set can reference a key created/updated in the same `ExecAll` call.
> To make such an operation, set the `BoundRef` value to `true` and the `AtTx` value to `0`.

Inserting entries into sets can be done using the following operations:
`ZAdd`, `VerifiedZAdd`, `ZAddAt`, `VerifiedZAddAt`, `ExecAll`.
Those operations accept the following parameters:

* `Set`: the name of the collection
* `Score`: entry score used to order items within the set
* `Key`: the key of entry to be added to the set
* `AtTx`: for bound references, a transaction id at which the value will be read,
  if set to `0` for `ExecAll` operation, current transaction id will be used. Optional
* `BoundRef`: if set to true, this will be a reference bound to a specific transaction. Optional
* `NoWait`: if set to true, don't wait for indexing to be finished after adding this entry

Reading data from the set can be done using the following operations:
`ZScan`, `StreamZScan`. Those operations accept the following parameters:

* `Set`: the name of the collection
* `SeekKey`: initial key for the first entry in the iteration. Optional
* `SeekScore`: the min or max score for the first entry in the iteration, depending on Desc value. Optional
* `SeekAtTx`: the tx id for the first entry in the iteration. Optional
* `InclusiveSeek`: the element resulting from the combination of the `SeekKey` `SeekScore` and `SeekAtTx`
  is returned with the result. Optional
* `Desc`: If set to true, entries will be returned in an descending (reversed) order. Optional
* `SinceTx`: immudb will wait that the transaction provided by SinceTx be processed. Optional
* `NoWait`: when true scan doesn't wait that txSinceTx is processed. Optional
* `MinScore`: minimum score filter. Optional
* `MaxScore`: maximum score filter. Optional
* `Limit`: maximum number of returned items. Optional

> Note: issuing a `ZScan` or `StreamZScan` operation will by default wait for the index to be up-to-date.
> To avoid waiting for the index (and  thus to allow reading the data from some older state),
> set the `SinceTx` to a very high value exceeding the most recent transaction id
> (e.g. maximum int value) and set `NoWait` to `true`.

:::: tabs

::: tab Go

```go
i1, err := client.Set(ctx,
    []byte(`user1`),
    []byte(`user1@mail.com`),
)
if err != nil{
    log.Fatal(err)
}
i2, err := client.Set(ctx,
    []byte(`user2`),
    []byte(`user2@mail.com`),
)
if err != nil{
    log.Fatal(err)
}
i3, err := client.Set(ctx,
    []byte(`user3`),
    []byte(`user3@mail.com`),
)
if err != nil{
    log.Fatal(err)
}
i4, err := client.Set(ctx,
    []byte(`user3`),
    []byte(`another-user3@mail.com`),
)
if err != nil{
    log.Fatal(err)
}

if _ , err = client.ZAddAt(ctx,
    []byte(`age`), 25, []byte(`user1`), i1.Id,
); err != nil {
    log.Fatal(err)
}
if _ , err = client.ZAddAt(ctx,
    []byte(`age`), 36, []byte(`user2`), i2.Id,
); err != nil {
    log.Fatal(err)
}
if _ , err = client.ZAddAt(ctx,
    []byte(`age`), 36, []byte(`user3`), i3.Id,
); err != nil {
    log.Fatal(err)
}
if _ , err = client.ZAddAt(ctx,
    []byte(`age`), 54, []byte(`user3`), i4.Id,
); err != nil {
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
```python
from immudb import ImmudbClient

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)
    client.set(b"user1", b"user1@mail.com")
    client.set(b"user2", b"user2@mail.com")
    client.set(b"user3", b"user3@mail.com")
    client.set(b"user4", b"user3@mail.com")

    client.zAdd(b"age", 100, b"user1")
    client.zAdd(b"age", 101, b"user2")
    client.zAdd(b"age", 99, b"user3")
    client.zAdd(b"age", 100, b"user4")

    scanResult = client.zScan(b"age", b"", 0, 0, True, 50, False, 100, 101)
    print(scanResult)   # Shows records with 'age' 100 <= score < 101
                        # with descending order and limit = 50


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
