# Streams
Immudb provides stream capabilities.
Internally it uses “delimited” messages technique, every chunk has a trailer that describe the length of the message. In this way the receiver can recompose chunk by chunk the original payload.
Stream methods accepts a `readers` as a part of input and output arguments. In this way the large value is decomposed in small chunks that are streamed over the wire.
Client don't need to allocate the entire value when sending and can read the received one progressively.
For example a client could send a large file much greater than available ram memory.
> At the moment `immudb` is not yet able to write the data without allocating the entire received object, but in the next release it will be possible a complete communication without allocations.
The maximum size of a transaction sent with streams is temporarily limited to a payload of 32M.

Supported stream method now available in the SDK are:

<CustomList class="no-horizontal-padding" size="wide">

* StreamSet
* StreamGet
* StreamVerifiedSet
* StreamVerifiedGet
* StreamScan
* StreamZScan
* StreamHistory
* StreamExecAll

</CustomList>

:::: tabs

::: tab Go
Here an example on how to send a large file and a regular key value to immudb.

It's possible to specify the chunk size of the stream with `WithStreamChunkSize()` method.

```go
    client, err := immuclient.NewImmuClient(immuclient.DefaultOptions().WithStreamChunkSize(4096))
	if err != nil {
		log.Fatal(err)
	}
    ctx := context.Background()
    _, err = client.Login(ctx, []byte(`immudb`), []byte(`immudb`))
    if err != nil {
        log.Fatal(err)
    }
    myFileName := "streams.go"
    key1 := []byte("key1")
    val1 := []byte("val1")
    f, err := os.Open(myFileName)
    if err != nil {
        log.Fatal(err)
    }
    stats, err := os.Stat(myFileName)
    if err != nil {
        log.Fatal(err)
    }

    kv1 := &stream.KeyValue{
        Key: &stream.ValueSize{
            Content: bytes.NewBuffer(key1),
            Size:    len(key1),
        },
        Value: &stream.ValueSize{
            Content: bytes.NewBuffer(val1),
            Size:    len(val1),
        },
    }
    kv2 := &stream.KeyValue{
        Key: &stream.ValueSize{
            Content: bytes.NewBuffer([]byte(myFileName)),
            Size:    len(myFileName),
        },
        Value: &stream.ValueSize{
            Content: f,
            Size:    int(stats.Size()),
        },
    }

    kvs := []*stream.KeyValue{kv1, kv2}
    _, err = client.StreamSet(ctx, kvs)
    if err != nil {
        log.Fatal(err)
    }
    entry, err := client.StreamGet(ctx, &schema.KeyRequest{ Key: []byte(myFileName)})
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("returned key %s", entry.Key)
```
:::

::: tab Java
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab Python
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Node.js
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::

### Chunked reading

It's possible to read returned value chunk by chunk if needed. This grant to the clients capabilities to handle data coming from immudb  chunk by chunk

:::: tabs

::: tab Go
To read chunk by chunk the inner gRPC protobuffer client is needed.
Then it's possible to use `kvStreamReceiver` to retrieve the key and a value reader. Such reader will fill provided byte array with received data and will return the number of read bytes or error.
If no message is present it returns 0 and io.EOF. If the message is complete it returns 0 and nil, in that case successive calls to Read will returns a new message.
> There are several receivers available (zStreamReceiver, vEntryStreamReceiver, execAllStreamReceiver) and also a primitive receiver MsgReceiver. The last one can be used to receive a simple row []byte message without additional logics.
```go
    sc := client.GetServiceClient()
	gs, err := sc.StreamGet(ctx, &schema.KeyRequest{ Key: []byte(myFileName)})
    if err != nil {
		log.Fatal(err)
	}
	kvr := stream.NewKvStreamReceiver(stream.NewMsgReceiver(gs), stream.DefaultChunkSize)

	key, vr, err := kvr.Next()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("read %s key", key)

	chunk := make([]byte, 4096)
	for {
		l, err := vr.Read(chunk)
		if err != nil && err != io.EOF {
			log.Fatal(err)
		}
		if err == io.EOF {
			break
		}
		fmt.Printf("read %d byte\n", l)
	}
```
:::

::: tab Java
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab Python
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
:::

::: tab Node.js
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
Streams is not supported yet in this language SDK.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::
