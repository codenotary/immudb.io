# SDKs api

## Contents
- [Connection and authentication](#connection-and-authentication)
    - [Mutual TLS](#mutual-tls)
    - [Disable authentication](#disable-authentication)
- [Root management](#root-management)
- [Tamperproof writing and reading](#tamperproof-writing-and-reading)
    - [Safe get and set](#safe-get-and-set)
- [Writing and reading](#writing-and-reading)
    - [Get and set](#get-and-set)
    - [Get by index](#byIndex)
- [History](#history)
- [Counting (count, countAll)](#counting)
- [Scan](#scan)
- [References](#references) 
    - [Reference and safeReference](#reference-and-safeReference)
    - [Get safe get](#get-safe-get])
    - [Index Reference](#getReference)
    - [Deep scan reference resolution](#deep-scan-reference-resolution)
- [secondary indexes](#secondary-indexes)
    - [sorted sets(ZAdd,ZScan, SafeZScan)](#sorted-sets)
    - [insertion order index (insertion order scan)](#insertion-order-index)
- [Transactions](#transaction)
    - [setAll](#set-batch-set-all)
    - [execAllOps](#exec-all-ops)
- [tamperproofing utilities(root,inclusion,consistency)](#tamperproofing-utilities)
- [structured values](#structured-values)
- [user management (ChangePermission,SetActiveUser,DatabaseList)](#user-management)
- [multi databases(CreateDatabase,UseDatabase)](#multi-databases)
- [health](#health)
- [examples](#examples)

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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
:::

::::

## Writing and reading

Writing and reading data is the same both in Set and SafeSet. 
The only difference is that safeSet returns to the client proofs needed to mathematically verify that the data si really wrote correctly.
This is allowed because generating proofs slightly impact on performances, so primitives are being allowed also without proofs. 
It is still possible get the proofs for a specific item at any time, so the decision on the frequency checks it's completely up to the final users.
It's possible also to use dedicated [auditors](immuclient/#auditor) to ensure the db consistency, but the pattern in which every client is an also an auditor is the more interesting one.

### Get and set

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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
:::

::::

## History
Immudb is an append only database.
This means that an update is a new insert of the same key with a new value.
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
	reference, err := client.Reference(ctx, []byte(`myTag`), []byte(`firstKey`))
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
	reference, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`firstKey`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)
	firstItem, err := client.Get(ctx, []byte(`myTag`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", firstItem)
    referenceVerified, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`firstKey`))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", referenceVerified)
```

:::

::: tab Java
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
	reference, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`firstKey`))
    if err != nil {
    	log.Fatal(err)
    }
    reference, err := client.SafeReference(ctx, []byte(`myTag`), []byte(`secondKey`))
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
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
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
:::

::::
