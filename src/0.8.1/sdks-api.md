# SDKs api

## Contents
- [Connection and authentication](#connection-and-authentication)
    - [Mutual TLS](#mutual-tls)
    - [Disable authentication](#disable-authentication)
- [Root management](#root-management)
- [Tamperproof writing and reading](#tamperproof-writing-and-reading)
    - [Safe get and set](#safe-get-and-set)
- [Writing and reading](#writing-and-reading)
    - [Get and Set](#get-and-set)
    - [Get by index](#byIndex)
- [History](#history)
- [Counting](#counting)
- [Scan](#scan)
- [References](#references)
    - [Reference and safeReference](#reference-and-safeReference)
    - [Get safe get](#get-safe-get])
    - [Index Reference](#getReference)
    - [Deep scan reference resolution](#deep-scan-reference-resolution)
- [secondary indexes](#secondary-indexes)
    - [sorted sets](#sorted-sets)
    - [insertion order index](#insertion-order-index)
- [Transactions](#transactions)
    - [SetBatch and GetBatch](#setbatch-and-getbatch)
    - [setAll](#setall)
    - [execAllOps](#execallops)
- [Tamperproofing utilities](#tamperproofing-utilities)
    - [Inclusion](#inclusion)
    - [Consistency](#consistency)
    - [Current Root](#currentroot)
- [Structured values](#structured-values)
- [User management (ChangePermission,SetActiveUser,DatabaseList)](#user-management)
- [Multi databases(CreateDatabase,UseDatabase)](#multi-databases)
- [Health](#health)

## Connection and authentication

Immudb run on 3323 default port. Here we connecting a client with default options and
authenticating using default username and password.
It's possible to modify defaults on immudb server config folder inside `immudb.toml`
:::: tabs

::: tab Go

Login method return a token needed in all interactions with the server.

```go
c, err := client.NewImmuClient(client.DefaultOptions())
if err != nil {
    log.Fatal(err)
}
ctx := context.Background()
// login with default username and password and storing a token
lr , err := c.Login(ctx, []byte(`immudb`), []byte(`immudb2`))
if err != nil {
    log.Fatal(err)
}
// set up an authenticated context that will be required in future operations
md := metadata.Pairs("authorization", lr.Token)
ctx = metadata.NewOutgoingContext(context.Background(), md)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### Mutual tls
To enable mutual authentication a certificate chain need to be provided both to the server and to the client.
With this they will authenticate each other at the same time
In order to generate them it's possible to use openssl tool.
[generate.sh](https://github.com/codenotary/immudb/tree/master/tools/mtls) provides a quick solution to provide them.
```bash
./generate.sh localhost mysecretpassword
```
This generates a list of folder containing certificates and private key to set up a mTLS connection
:::: tabs

::: tab Go
```go
	client, err := c.NewImmuClient(
		c.DefaultOptions().WithMTLsOptions(
			c.MTLsOptions{}.WithCertificate("{path-to-immudb-src-folder}/tools/mtls/4_client/certs/localhost.cert.pem").
				WithPkey("{path-to-immudb-src-folder}/tools/mtls/4_client/private/localhost.key.pem").
				WithClientCAs("{path-to-immudb-src-folder}/tools/mtls/2_intermediate/certs/ca-chain.cert.pem").
				WithServername("localhost"),
				).
			WithMTLs(true),
		)
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	// login with default username and password
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### Disable authentication
It's possible to run immudb with disabled authentication.
Without enabled authentication it's not possible to connect to a server that own already databases and users permissions.
If a valid token is present authentication is being enabled by default.

:::: tabs

::: tab Go
```go
    client, err := c.NewImmuClient(
		c.DefaultOptions().WithAuth(false),
	)
	if err != nil {
		log.Fatal(err)
	}
	vi, err := client.SafeSet(ctx, []byte(`immudb`), []byte(`hello world`))
	if  err != nil {
		log.Fatal(err)
	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Root management

Immudb client need to store somewhere the merkle tree root hash. In this way every safe read or write operation can be checked on a trusted root.

:::: tabs

::: tab Go
The component in charge of handling the root is the `RootService`.
To set up the `rootService` 3 interfaces need to be implemented and provided to the `RootService` constructor:
* `Cache` interface in the `cache` package. Standard cache.NewFileCache provides a file root store solution.
* `RootProvider` in the `rootservice` package. It provides a fresh root from immudb server when the client is being initialized for the first time. Standard RootProvider provides a service that retrieve immudb first root hash from a gRPC endpoint.
* `UUIDProvider` in the `rootservice` package. It provides the immudb identifier. This is needed to allow the client to safely connect to multiple immudb instances. Standard UUIDProvider provides the immudb server identifier from a gRPC endpoint.

Following an example how to obtain a client instance with a custom root service.
```go
    func MyCustomImmuClient(options *c.Options) (cli c.ImmuClient, err error) {
    	ctx := context.Background()

    	cli = c.DefaultClient()

    	options.DialOptions = cli.SetupDialOptions(options)

    	cli.WithOptions(options)

    	var clientConn *grpc.ClientConn
    	if clientConn, err = cli.Connect(ctx); err != nil {
    		return nil, err
    	}

    	cli.WithClientConn(clientConn)

    	serviceClient := schema.NewImmuServiceClient(clientConn)
    	cli.WithServiceClient(serviceClient)

    	if err = cli.WaitForHealthCheck(ctx); err != nil {
    		return nil, err
    	}

    	immudbRootProvider := rootservice.NewImmudbRootProvider(serviceClient)
    	immudbUUIDProvider := rootservice.NewImmudbUUIDProvider(serviceClient)

    	customDir := "custom_root_dir"
    	os.Mkdir(customDir, os.ModePerm)
    	rootService, err := rootservice.NewRootService(
    		cache.NewFileCache(customDir),
    		logger.NewSimpleLogger("immuclient", os.Stderr),
    		immudbRootProvider,
    		immudbUUIDProvider)
    	if err != nil {
    		return nil, err
    	}

    	dt, err := timestamp.NewDefaultTimestamp()
    	if err != nil {
    		return nil, err
    	}

    	ts := c.NewTimestampService(dt)
    	cli.WithTimestampService(ts).WithRootService(rootService)

    	return cli, nil
    }
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::


## Tamperproof writing and reading

It's possible to read and write with built-in cryptographic verification.


### Safe get and set
The client implements the mathematical validations, while your application uses a traditional read or write function.

:::: tabs

::: tab Go
```go
	vi, err := client.SafeSet(ctx, []byte(`immudb`), []byte(`hello world`))
    	if  err != nil {
    		log.Fatal(err)
    	}
    	fmt.Printf("Item inclusion verified %t\n", vi.Verified)

    	item, err := client.SafeGet(ctx, []byte(`immudb`))
    	if  err != nil {
    		log.Fatal(err)
    	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Writing and reading

Writing and reading data is the same both in Set and SafeSet.
The only difference is that safeSet returns to the client proofs needed to mathematically verify that the data si really wrote correctly.
This is allowed because generating proofs slightly impact on performances, so primitives are being allowed also without proofs.
It is still possible get the proofs for a specific item at any time, so the decision on the frequency checks it's completely up to the final users.
It's possible also to use dedicated [auditors](immuclient/#auditor) to ensure the db consistency, but the pattern in which every client is an also an auditor is the more interesting one.

### Get and Set

:::: tabs

::: tab Go
```go
    _, err = client.Set(ctx, []byte(`immudb`), []byte(`hello world`))
	if  err != nil {
		log.Fatal(err)
	}
	item, err := client.Get(ctx, []byte(`immudb`))
	if  err != nil {
		log.Fatal(err)
	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### Get by index
Following methods rely on internal immudb insertion order index. Insertion order index is a special index appended on every leaf in the merkle tree. With this we benefit of the internal merkle tree natural insertion order index. When we retrieve elements by index a first lookup is made on the leaf at the same index to discover the element key, then a second lookup is realized to retrieve the value.

:::: tabs

::: tab Go
```go
	    item, err := client.ByIndex(ctx, vi.Index)
    	if  err != nil {
    		log.Fatal(err)
    	}
    	fmt.Printf("%s\n", item.Value)

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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## History
Immudb is an append only database.
This means that an _update_ does not change an existing record. Instead, it is a new insert of the **same key** with a **new value**.
It's possible to retrieve all the values for a particular key with the history command.

`History` accepts the following parameters:
* `Key`: a key of an item
* `Offset`: the starting index (excluded from the search). Optional
* `Limit`: maximum returned items. Optional
* `Reverse`: items are returned in reverse order. Optional
:::: tabs

::: tab Go
```go
    items, err := client.History(ctx,  &schema.HistoryOptions{
        Key:                  []byte(`immudb`),
        Offset:               0,
        Limit:                0,
        Reverse:              false,
    })
    if  err != nil {
        log.Fatal(err)
    }
```
Reverse history coomand example
```go
    client.Set(ctx, []byte(`key`), []byte(`val1`))
	client.Set(ctx, []byte(`key`), []byte(`val2`))
	client.Set(ctx, []byte(`key`), []byte(`val3`))
	client.Set(ctx, []byte(`key`), []byte(`val4`))
	client.Set(ctx, []byte(`key`), []byte(`val5`))

	hOpts1 := &schema.HistoryOptions{
		Key:     []byte(`key`),
		Limit:   2,
		Reverse: true,
	}
	list1, err := client.History(ctx, hOpts1)
	if  err != nil {
		log.Fatal(err)
	}
	hOpts2 := &schema.HistoryOptions{
		Key:     []byte(`key`),
		Offset:  list1.Items[len(list1.Items)-1].Index,
		Limit:   2,
		Reverse: true,
	}
	list2, err := client.History(ctx, hOpts2)
	if  err != nil {
		log.Fatal(err)
	}
	hOpts3 := &schema.HistoryOptions{
		Key:     []byte(`key`),
		Offset:  list2.Items[len(list2.Items)-1].Index,
		Limit:   2,
		Reverse: true,
	}
	list3, err := client.History(ctx, hOpts3)
	if  err != nil {
		log.Fatal(err)
	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Counting

:::: tabs

::: tab Go
```go
	    count, err := client.Count(ctx, []byte(`myKey`))
        	if  err != nil {
        		log.Fatal(err)
        	}
        countAll, err := client.CountAll(ctx)
        if  err != nil {
            log.Fatal(err)
        }
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Scan
The `scan` command the is used in order to iterate over the collection of elements present in the currently selected database.
`Scan` accepts the following parameters:
* `Prefix`: a bytes prefix. Optional
* `Offset`: the starting offset (excluded from the search). Optional
* `Limit`: maximum returned items. Optional
* `Reverse`: items are returned in reverse order. Optional
* `Deep`: [References](#references) resolution mode. Optional
:::: tabs

::: tab Go

An ordinary `scan` command and a reversed one.

```go
    client, err := c.NewImmuClient(c.DefaultOptions())
    if err != nil {
        log.Fatal(err)
    }
    ctx := context.Background()
    lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

    md := metadata.Pairs("authorization", lr.Token)
    ctx = metadata.NewOutgoingContext(context.Background(), md)

    client.Set(ctx, []byte(`aaa`), []byte(`item1`))
    client.Set(ctx, []byte(`bbb`), []byte(`item2`))
    client.Set(ctx, []byte(`abc`),[]byte(`item3`))

    scanOptions := &schema.ScanOptions{
        Prefix:  []byte(`a`),
        Offset:  nil,
        Limit:   0,
        Reverse: false,
        Deep:    false,
    }

    list, err := client.Scan(ctx, scanOptions)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%v\n", list)
    scanOptions1 := &schema.ScanOptions{
        Prefix:  []byte(`a`),
        Offset:  nil,
        Limit:   0,
        Reverse: true,
        Deep:    false,
    }

    list, err := client.Scan(ctx, scanOptions1)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%v\n", list)
```

Example with an offset:

```go
    scanOptions = &schema.ScanOptions{
        Prefix:  []byte(``),
        Offset:  []byte(``),
        Limit:   0,
        Reverse: true,
        Deep:    false,
    }

    list, err := client.Scan(ctx, scanOptions)
    fmt.Printf("%v\n", list)
    scanOptions = &schema.ScanOptions{
        Prefix:  []byte(``),
        Offset:  []byte(`bbb`),
        Limit:   0,
        Reverse: true,
        Deep:    false,
    }

    list, err = client.Scan(ctx, scanOptions)
    fmt.Printf("%v\n", list)

    scanOptions = &schema.ScanOptions{
        Prefix:  []byte(`b`),
        Offset:  []byte(`b`),
        Limit:   0,
        Reverse: true,
        Deep:    false,
    }

    list, err = client.Scan(ctx, scanOptions)
    fmt.Printf("%v\n", list)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## References
`Reference` is like a "tag" operation, it appends a reference on a key/value element.
As a consequence when we retrieve that reference with a `Get` or `SafeGet` the value retrieved will be the original value associated to the original key.
SafeReference counterpart is the same but in addition it produces also the inclusion and consistency proofs.

### Reference and safeReference
:::: tabs

::: tab Go
```go
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	_, err = client.Set(ctx, []byte(`firstKey`),[]byte(`firstValue`))
	if err != nil {
		log.Fatal(err)
	}
	reference, err := client.Reference(ctx, []byte(`myTag`), []byte(`firstKey`), nil)
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
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	_, err = client.Set(ctx, []byte(`firstKey`),[]byte(`firstValue`))
	if err != nil {
		log.Fatal(err)
	}
	reference, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`firstKey`), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)
	firstItem, err := client.Get(ctx, []byte(`myTag`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", firstItem)
    referenceVerified, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`firstKey`), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", referenceVerified)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### Get and safeget
When reference is resolved with get or safe get in case of multiples equals references the last reference is returned.
:::: tabs

::: tab Go

```go
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	_, err = client.Set(ctx, []byte(`firstKey`),[]byte(`firstValue`))
	if err != nil {
		log.Fatal(err)
	}
    _, err = client.Set(ctx, []byte(`secondKey`),[]byte(`secondValue`))
	if err != nil {
		log.Fatal(err)
	}
	reference, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`firstKey`), nil)
    if err != nil {
    	log.Fatal(err)
    }
    reference, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`secondKey`), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)
	secondItem, err := client.Get(ctx, []byte(`myTag`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", secondItem)

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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### Index Reference
Normally when referencing an item immudb internally creates a `key` reference.
It's possible to specify also a specific index of a referenced item. In this way it's possible to resolve a specific item in time.
`getReference` came with this specific scope.
Using `get` or `safeGet` on an index reference will return the last referenced item: in this case index reference is skipped.
:::: tabs

::: tab Go

```go
    client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	idx1, err := client.Set(ctx, []byte(`aaa`), []byte(`item1`))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(ctx, []byte(`aaa`), []byte(`item2`))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Reference(ctx, []byte(`myTag1`), []byte(`aaa`), idx1)
	if err != nil {
		log.Fatal(err)
	}
	tag, err := client.GetReference(ctx, &schema.Key{Key:[]byte(`myTag1`)})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", tag)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### Deep scan reference resolution
`Scan` could resolve reference if `deep` flag is provided.
:::: tabs

::: tab Go

```go
client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	idx1, err := client.Set(ctx, []byte(`aaa`), []byte(`item1`))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(ctx, []byte(`aaa`), []byte(`item2`))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Reference(ctx, []byte(`aar`), []byte(`aaa`), idx1)
	if err != nil {
		log.Fatal(err)
	}
	tag, err := client.GetReference(ctx, &schema.Key{Key:[]byte(`aar`)})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", tag)
	list, err := client.Scan(ctx, &schema.ScanOptions{
		Prefix:               []byte(`a`),
		Offset:               nil,
		Limit:                0,
		Reverse:              false,
		Deep:                 true,
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", list)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Secondary indexes

On top of the key value store immudb provides secondary indexes to help developers to handle complex queries.

### Sorted sets
The simplest secondary index you can create with immudb is by using the sorted set data type, which is a data structure representing a set of elements ordered by a floating point number which is the score of each element.
The reason we used a float64 as a score type is to satisfy the maximum number of uses cases.
64-bit floating point gives a lot of flexibility and dynamic range, at the expense of having only 53-bits of integer.

When an integer64 is cast to a float there could be a loss of precision, but the insertion order is granted by the internal database index that is appended to the internal index key.

`ZAdd` can reference an item by `key` or by `index`.

`ZScan` accepts following arguments:
* Set: the name of the collection
* Offset:  a binary offset,
* Limit: the maximum items returned,
* Reverse: items are returned in score ascending or descending order
* Min: minimum score filter
* Max: maximum score filter

:::: tabs

::: tab Go

```go
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	setName := []byte(`set1`)
	i1, _ := client.Set(ctx, []byte(`key1`), []byte(`val1`))
	i2, _ := client.Set(ctx, []byte(`key2`), []byte(`val2`))
	i3, _ := client.Set(ctx, []byte(`key3`), []byte(`val3`))
	i4, _ := client.Set(ctx, []byte(`key4`), []byte(`val4`))
	i5, _ := client.Set(ctx, []byte(`key5`), []byte(`val5`))
	i6, _ := client.Set(ctx, []byte(`key6`), []byte(`val6`))

	_, err = client.ZAdd(ctx, setName, 1.6, []byte(`key1`), i1)
	if err != nil {
		log.Fatal(err)
	}
	_, _ = client.ZAdd(ctx, setName, 1.6, []byte(`key2`), i2)
	_, _ = client.ZAdd(ctx, setName, 2, []byte(`key3`), i3)
	_, _ = client.ZAdd(ctx, setName, 2, []byte(`key4`), i4)
	_, _ = client.ZAdd(ctx, setName, 2, []byte(`key5`), i5)
	_, _ = client.ZAdd(ctx, setName, 3, []byte(`key6`), i6)

	zScanOption1 := &schema.ZScanOptions{
		Set:     setName,
		Offset:  nil,
		Limit:   2,
		Reverse: true,
		Min:     &schema.Score{Score: 2},
		Max:     &schema.Score{Score: 3},
	}

	list1, err := client.ZScan(ctx, zScanOption1)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", list1)

	zScanOption2 := &schema.ZScanOptions{
		Set:     setName,
		Offset:  list1.Items[len(list1.Items)-1].CurrentOffset,
		Limit:   2,
		Reverse: true,
		Min:     &schema.Score{Score: 2},
		Max:     &schema.Score{Score: 3},
	}

	list2, err := client.ZScan(ctx, zScanOption2)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", list2)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### Insertion order index
Each item is being stored with an insertion order that is exposed thanks to the insertion order index
`IScan` provides a solution to iterate over all items of the database with pagination
:::: tabs

::: tab Go

```go
    client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	_, err = client.Set(ctx, []byte(`0`),[]byte(`itemZERO`))
	if err != nil {
		log.Fatal(err)
	}
	_, _ = client.Set(ctx, []byte(`aaa`),[]byte(`item1`))
	_, _ = client.Set(ctx, []byte(`bbb`),[]byte(`item2`))
	_, _ = client.Reference(ctx, []byte(`aaa`), []byte(`aab`), nil)
	_, _ = client.Reference(ctx, []byte(`bbb`), []byte(`abb`), nil)
	_, _ = client.Set(ctx, []byte(`zzz`),[]byte(`itemzzz`))
	_, _ = client.Reference(ctx, []byte(`bbb`), []byte(`abb`), nil)
	_, _ = client.Reference(ctx, []byte(`bbb`), []byte(`abb`), nil)
	_, _ = client.Reference(ctx, []byte(`bbb`), []byte(`abb`), nil)

	page1, err := client.IScan(ctx, 1, 3)
	fmt.Printf("%v\n", page1)
	if err != nil {
		log.Fatal(err)
	}
	page2, err := client.IScan(ctx, 2, 3)
	fmt.Printf("%v\n", page2)
	if err != nil {
		log.Fatal(err)
	}
	page3, err := client.IScan(ctx, 3, 3)
	fmt.Printf("%v\n", page3)
	if err != nil {
		log.Fatal(err)
	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Transactions

`SetBatch`, `GetBatch`, `SetAll` and `ExecAllOps` are the foundation of transactions in immudb. They allow the execution of a group of commands in a single step, with two important guarantees:
* All the commands in a transaction are serialized and executed sequentially. It can never happen that a request issued by another client is served in the middle of the execution of a transaction. This guarantees that the commands are executed as a single isolated operation.
* Either all of the commands or none are processed, so the transaction is also atomic.

### SetBatch and GetBatch
:::: tabs
SetBatch and GetBatch example
::: tab Go

```go
    br := c.BatchRequest{
        Keys:   []io.Reader{strings.NewReader("key1"), strings.NewReader("key2"), strings.NewReader("key3")},
        Values: []io.Reader{strings.NewReader("val1"), strings.NewReader("val2"), strings.NewReader("val3")},
    }
    ris, err := client.SetBatch(ctx, &br)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%v\n", ris)

    sil, err := client.GetBatch(ctx, [][]byte{[]byte(`key1`), []byte(`key2`)})
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%v\n", sil)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### setAll
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
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

### execAllOps
`ExecAllOps` like `SetBatch` it permits multiple insertions at once. The difference is that it is possible to specify a list of mixes of key/value sets, references and zAdd insertions.
The argument of a ExecAllOps is an array of the following types:
* `Op_KVs`: ordinary key value item
* `Op_ZOpts`: [ZAdd](#sorted-sets) option element
* `Op_ROpts`: [Reference](#references) option element

It's possible to persist and reference items that are already persisted on disk. In that case is mandatory to provide the index of the referenced item. This has to be done for:
* `Op_ZOpts`
* `Op_ROpts`
If `zAdd` or `reference` is not yet persisted on disk it's possible to add it as a regular key value and the reference is done onFly.
:::: tabs
ExecAllOps
::: tab Go

```go
client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	idx, _ := client.Set(ctx, []byte(`persistedKey`),[]byte(`persistedVal`))

	// Ops payload
	aOps := &schema.Ops{
		Operations: []*schema.Op{
			{
				Operation: &schema.Op_KVs{
					KVs: &schema.KeyValue{
						Key:   []byte(`notPersistedKey`),
						Value: []byte(`notPersistedVal`),
					},
				},
			},
			{
				Operation: &schema.Op_ZOpts{
					ZOpts: &schema.ZAddOptions{
						Set:   []byte(`mySet`),
						Score: &schema.Score{Score: 0.6},
						Key:   []byte(`notPersistedKey`)},
				},
			},
			{
				Operation: &schema.Op_ZOpts{
					ZOpts: &schema.ZAddOptions{
						Set:   []byte(`mySet`),
						Score: &schema.Score{Score: 0.6},
						Key:   []byte(`persistedKey`),
						Index: idx,
					},
				},
			},
		},
	}

	idx , err = client.ExecAllOps(ctx, aOps)

	fmt.Printf("%v\n", idx)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Tamperproofing utilities

SDK give to developers primitives in order to make additional verifications:
* current
* inclusion
* consistency

### Inclusion
:::: tabs
`Inclusion` verification returns the shortest list of additional nodes required to compute the root of the merkle tree.
With this it's possible to mathematically ensure after a write operation that an element was really written correctly
::: tab Go
```go
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	_ , err = client.RawSafeSet(ctx, []byte(`aaa`), []byte(`item1`))
	if err != nil {
		log.Fatal(err)
	}
	idx2, err := client.RawSafeSet(ctx, []byte(`bbb`), []byte(`item2`))
	if err != nil {
		log.Fatal(err)
	}
	_ , err = client.RawSafeSet(ctx, []byte(`abc`),[]byte(`item3`))
	if err != nil {
		log.Fatal(err)
	}

	// local hash calculation
	hash := api.Digest(idx2.Index, []byte(`bbb`), []byte(`item2`))

	proof, err := client.Inclusion(ctx, idx2.Index)
	if err != nil {
		log.Fatal(err)
	}
	verified := proof.Verify(idx2.Index, hash[:])

	fmt.Printf("item 2 is included in server merkle trree root: %v", verified)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::
### Consistency
:::: tabs
`Consistency` verification returns the shortest list of additional nodes required to mathematically proof that a tree rapresented by an old root is really included in the server merkle tree.
This means that every elements that is rapresented by the root that a client own on his storage are still present on immudb and immutate.
A trusted auditor can continuously check for consistency an immudb server. In this way immudb can not be silently tampered.
`RawSafeSet` is used in order to semplify following example. Usually SDK extend raw payload with [structured values](#structured-values)
::: tab Go
```go
    client, err := c.NewImmuClient(c.DefaultOptions())
    if err != nil {
        log.Fatal(err)
    }
    ctx := context.Background()
    lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

    md := metadata.Pairs("authorization", lr.Token)
    ctx = metadata.NewOutgoingContext(context.Background(), md)

    _ , err = client.RawSafeSet(ctx, []byte(`aaa`), []byte(`item1`))
    if err != nil {
        log.Fatal(err)
    }
    _ , err = client.RawSafeSet(ctx, []byte(`bbb`), []byte(`item2`))
    if err != nil {
        log.Fatal(err)
    }
    idx , err := client.RawSafeSet(ctx, []byte(`abc`),[]byte(`item3`))
    if err != nil {
        log.Fatal(err)
    }

    root, err := client.CurrentRoot(ctx)

    proof, err := client.Consistency(ctx, idx.Index)
    if err != nil {
        log.Fatal(err)
    }
    verified := proof.Verify(*root)

    fmt.Printf("the tree rapresented by root is included in server merkle tree: %v", verified)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::
### Current Root
:::: tabs
`CurrentRoot` returns the last root of the server.
This is used to initialize a client root cache.
Usually root is printed with hexadecimal notation.
::: tab Go
```go
    	client, err := c.NewImmuClient(c.DefaultOptions())
    	if err != nil {
    		log.Fatal(err)
    	}
    	ctx := context.Background()
    	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

    	md := metadata.Pairs("authorization", lr.Token)
    	ctx = metadata.NewOutgoingContext(context.Background(), md)

    	root, err := client.CurrentRoot(ctx)
    	if err != nil {
    		log.Fatal(err)
    	}

    	fmt.Printf("current root is : %X", root.GetRoot())


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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Structured values
The messages structure allows callers to use key value pairs as embedded payload. Thus, it will soon be possible to decouple and extend
the value structure. The value, currently a stream of bytes, can be augmented with some client provided metadata.
This also permits use of an on-demand serialization/deserialization strategy.

The payload includes a timestamp and a value at the moment. In the near future cryptographic signatures will be added as well. The entire payload contribute to hash generation and is inserted in
the merkle tree.
```
message StructuredKeyValue {
	bytes key = 1;
	Content value = 2;
}

message Content {
	uint64 timestamp = 1;
	bytes payload = 2;
}
```

## User management
User management is exposed with following methods:
* CreateUser
* ChangePermission
* ChangePassword

Password must have between 8 and 32 letters, digits and special characters of which at least 1 uppercase letter, 1 digit and 1 special character.

Admin permissions are:
* PermissionSysAdmin = 255
* PermissionAdmin = 254

Non-admin permissions are:
* PermissionNone = 0
* PermissionR = 1
* PermissionRW = 2

:::: tabs

::: tab Go
```go
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	err = client.CreateUser(ctx, []byte(`myNewUser1`), []byte(`myS3cretPassword!`), auth.PermissionR, "defaultdb")
	if err != nil {
		log.Fatal(err)
	}
	err = client.ChangePermission(ctx, schema.PermissionAction_GRANT, "myNewUser1", "defaultDB",  auth.PermissionRW)
	if err != nil {
		log.Fatal(err)
	}
	err = client.ChangePassword(ctx, []byte(`myNewUser1`), []byte(`myS3cretPassword!`), []byte(`myNewS3cretPassword!`))
	if err != nil {
		log.Fatal(err)
	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## Multi databases
Starting immudb version 0.7.0 we introduced a multi-database support.
By default the first database is either called `defaultdb` or based on the environment variable `IMMUDB_DBNAME`.
Handling users and database require to have rights privileges.
Users with `PermissionAdmin` can control everything. Non admin users have restricted permissions and can read or write only their databases if they have sufficient privileges.
:::: tabs
In this example is shown how to create a new database and how to write into it.
In order to create a new database is possible to use `CreateDatabase` method.
::: tab Go
In order to write into a specific database an authenticated context is required.
It's possible with `UseDatabase` method to obtain a `token`.
A token is used not only for authorization  but also to route commands to a specific database.
To set up an authenticated context is sufficient to put a `token` inside metadata.
```go
	client, err := c.NewImmuClient(c.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)

	err = client.CreateDatabase(ctx, &schema.Database{
		Databasename: "myimmutabledb",
	})
	if err != nil {
		log.Fatal(err)
	}
	dbList, err := client.DatabaseList(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("database list: %v", dbList)

	// creating a context to write in the new database
	resp, err := client.UseDatabase(ctx, &schema.Database{
		Databasename: "myimmutabledb",
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("auth token: %v", resp.Token)

	md = metadata.Pairs("authorization", resp.Token)
	ctx = metadata.NewOutgoingContext(context.Background(), md)
	// writing in myimmutabledb
	_, err = client.Set(ctx, []byte(`key`), []byte(`val`))
	if err != nil {
		log.Fatal(err)
	}
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::

## HealthCheck
HealthCheck return an error if `immudb` status is not ok.
:::: tabs
::: tab Go
```go
	client, err := c.NewImmuClient(c.DefaultOptions())
    if err != nil {
        log.Fatal(err)
    }
    ctx := context.Background()
    lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))

    md := metadata.Pairs("authorization", lr.Token)
    ctx = metadata.NewOutgoingContext(context.Background(), md)

    err = client.HealthCheck(ctx)
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
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.1/immugw/) option.
:::

::::
