# Secondary indexes

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
