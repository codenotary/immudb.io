# Golang Examples

## Contents
 - [Import](#import)
 - [Start immudb](#start-immudb)
 - [Connect a new client](#connect-a-new-client)
 - [Write transactions without verification](#write-transactions-without-verification)
 - [Write transactions with verification](#write-transactions-with-verification)
 - [Structured values](#structured-values)
 - [Add reference to existing entries](#add-reference-to-existing-entries)
 - [Add secondary index](#add-secondary-index)
 - [Read entries without verification](#read-entries-without-verification)
 - [Read entries with verification](#read-entries-with-verification)
 - [Scan entries](#scan-entries)
 - [Count entries](#count-entries)
 - [Get current root](#get-current-root)
 - [Check consistency](#check-consistency)
 - [Check inclusion](#check-inclusion)
 - [Error handling and cleanup](#error-handling-and-cleanup)
 - [Hello World Example](#hello-world-example)

The following code snippets explain how to work with immudb from start to finish using Golang:

## Import

```go
package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"time"

	immuapi "github.com/codenotary/immudb/pkg/api"
	immuschema "github.com/codenotary/immudb/pkg/api/schema"
	immuclient "github.com/codenotary/immudb/pkg/client"
	immulogger "github.com/codenotary/immudb/pkg/logger"
	immuserver "github.com/codenotary/immudb/pkg/server"
	immustore "github.com/codenotary/immudb/pkg/store"
)

```

## Start immudb
```go
func main() {
	//===> 1. Start a new server
	fmt.Println("1. Start immudb server ...")

	const logfile = "immuserver.log"
	flogger, file, err :=
		immulogger.NewFileLogger("immuserver ", logfile)
	if err != nil {
		exit(err)
	}
	defer func() {
		if err = file.Close(); err != nil {
			exit(err)
		}
	}()
	serverOptions := immuserver.DefaultOptions().WithLogfile(logfile)
	server := immuserver.DefaultServer().WithOptions(serverOptions).WithLogger(flogger)
	go func() {
		if err := server.Start(); err != nil {
			exit(err)
		}
	}()
	defer func() {
		err := server.Stop()
		// NOTE: this cleanup must NOT be done in a real-world scenario!
		cleanup(server.Options.Dir, server.Options.Logfile)
		if err != nil {
			exit(err)
		}
	}()
	// wait for server to start
	time.Sleep(100 * time.Millisecond)
	
```

## Connect a new client
```go

	fmt.Println("2. Connect immudb client ...")

	client, err := immuclient.NewImmuClient(immuclient.DefaultOptions())
	if err != nil {
		exit(err)
	}

	ctx := context.Background()
```

## Write transactions without verification

```go

	//------> Set
	key1, value1 := []byte("client:Ms. Noelia Jaskolski"), []byte("Visa 1514284849020756 09/21")
	index, err := client.Set(ctx, key1, value1)
	if err != nil {
		exit(err)
	}
	fmt.Println("   Set - add entry:")
	printItem(key1, value1, index)

```

## Write transactions with verification

```go

	//------> SafeSet
	key2, value2 := []byte("client:Mr. Archibald Beatty"), []byte("Visa 6679499384784022 11/23")
	verifiedIndex, err := client.SafeSet(ctx, key2, value2)
	if err != nil {
		exit(err)
	}
	fmt.Println("   SafeSet - add and verify entry:")
	printItem(key2, value2, verifiedIndex)

	key3, value3 := []byte("client:Ms. Maci Schuppe"), []byte("MasterCard 2232703813463070 12/19")
	verifiedIndex, err = client.SafeSet(ctx, key3, value3)
	if err != nil {
		exit(err)
	}
	fmt.Println("   SafeSet - add and verify entry:")
	printItem(key3, value3, verifiedIndex)

	value3 = []byte("MasterCard 8069498678459876 10/22")
	verifiedIndex, err = client.SafeSet(ctx, key3, value3)
	if err != nil {
		exit(err)
	}
	fmt.Println("   SafeSet - update and verify entry:")
	printItem(key3, value3, verifiedIndex)

```

### Structured values

Whenever we use golang sdk to set data in immudb we adding also other extra data to the  request. Currently we store at the same level of the payload also the timestamp.
The server should not set the timestamp, to avoid relying on a not verifiable “single source of truth”. This is the reason why is the client in charge of that.
Following the related structures:
```go
message StructuredKeyValue {
	bytes key = 1;
	Content value = 2;
}
message Content {
	uint64 timestamp = 1;
	bytes payload = 2;
}
```
Though content is never unmarshal by the server, current definition are located in protobuffer schema and they can be easily extended.

In convert.go there is the logic used by the client:
```go
func (item *Item) ToSItem() (*StructuredItem, error) {
	c := Content{}
	err := proto.Unmarshal(item.Value, &c)
	if err != nil {
		return nil, err
	}

	return &StructuredItem{
		Index: item.Index,
		Key:   item.Key,
		Value: &c,
	}, nil
}
```
##  Add reference to existing entries

```go

	//------> SafeReference
	key3Ref := append([]byte("reference:"), key3...)
	verifiedIndex, err = client.SafeReference(ctx, key3Ref, key3)
	if err != nil {
		exit(err)
	}
	fmt.Println("   SafeReference - add and verify a reference key to an existing entry:")
	printItem(key3Ref, value3, verifiedIndex)

```

##  Add secondary index

```go

	//------> SafeZAdd
	fmt.Println("   SafeZAdd - add and verify scores for existing keys to a new or existing sorted set:")
	set1 := []byte("SetOfClientsThatAreWomen")
	key1Score := 1.
	verifiedIndex, err = client.SafeZAdd(ctx, set1, key1Score, key1)
	if err != nil {
		exit(err)
	}
	printSetItem(set1, key1, key1Score, verifiedIndex)
	key3Score := 3.
	verifiedIndex, err = client.SafeZAdd(ctx, set1, key3Score, key3)
	if err != nil {
		exit(err)
	}
	fmt.Println("	------")
	printSetItem(set1, key3, key3Score, verifiedIndex)

```

## Read entries without verification

```go
	fmt.Println("4. Read entries ...")

	//------> Get
	item, err := client.Get(ctx, key1)
	if err != nil {
		exit(err)
	}
	fmt.Println("   Get - fetch entry:")
	printItem(nil, nil, item)

```

## Read entries with verification

```go

	//------> SafeGet
	verifiedItem, err := client.SafeGet(ctx, key2)
	if err != nil {
		exit(err)
	}
	fmt.Println("   SafeGet - fetch and verify entry:")
	printItem(nil, nil, verifiedItem)

	verifiedItem, err = client.SafeGet(ctx, key3Ref)
	if err != nil {
		exit(err)
	}
	fmt.Println("   SafeGet - fetch and verify entry by reference key:")
	printItem(nil, nil, verifiedItem)

```
## Scan entries

```go

	// zscan             Iterate over a sorted set
	structuredItemList, err := client.ZScan(ctx, set1)
	if err != nil {
		exit(err)
	}
	fmt.Println("   ZScan - iterate over a sorted set:")
	for _, item := range structuredItemList.Items {
		printItem(nil, nil, item)
		fmt.Println("	------")
	}

	//------> Scan
	prefix := []byte("client:Mr.")
	structuredItemList, err = client.Scan(ctx, prefix)
	if err != nil {
		exit(err)
	}
	fmt.Printf("   Scan - iterate over keys having the specified prefix (e.g. \"%s\"):\n", prefix)
	for _, item := range structuredItemList.Items {
		printItem(nil, nil, item)
		fmt.Println("	------")
	}

```
## Count  entries

```go
	//------> Count
	prefix = []byte("client:Ms.")
	itemsCount, err := client.Count(ctx, prefix)
	if err != nil {
		exit(err)
	}
	fmt.Printf("   Count - count keys having the specified prefix (e.g. \"%s\"):\n", prefix)
	fmt.Printf("	count:		%d\n", itemsCount.Count)

```
## Get current root

```go

	//------> Current tree root
	fmt.Println("   Current root - return the last merkle tree root and index stored locally")
	currentRoot, err := client.CurrentRoot(ctx)
	if err != nil {
		exit(err)
	}
	if currentRoot.Root == nil {
		fmt.Println("no root found: immudb is empty")
	}
	fmt.Printf("	index:		%d\n	hash:		%x\n", currentRoot.Index, currentRoot.Root)

```
### Add a new entry after getting current root

```go

	fmt.Println("   Add a new entry after getting current root:")
	key4, value4 := []byte("client:Mr. Valentin Padurean"), []byte("MasterCard 2232703813463070 01/24")
	verifiedIndex, err = client.SafeSet(ctx, key4, value4)
	if err != nil {
		exit(err)
	}
	fmt.Println("   SafeSet - add and verify an entry after getting the current root:")
	printItem(key4, value4, verifiedIndex)

```
## Check consistency

```go

	fmt.Println("   Consistency - check consistency between the previous root and latest root:")
	proof, err := client.Consistency(ctx, currentRoot.Index)
	if err != nil {
		exit(err)
	}
	fmt.Printf("	verified:	%t\n	firstRoot:	%x at index: %d\n	secondRoot:	%x at index: %d\n",
		proof.Verify(immuschema.Root{Index: currentRoot.Index, Root: currentRoot.Root}),
		proof.FirstRoot,
		proof.First,
		proof.SecondRoot,
		proof.Second)

```
## Check inclusion

```go

	fmt.Println("   Inclusion - check if specified index is included in the current tree:")
	structuredItem, err := client.Get(ctx, key2)
	if err != nil {
		exit(err)
	}
	inclusionProof, err := client.Inclusion(ctx, structuredItem.Index)
	if err != nil {
		exit(err)
	}
	hash, err := structuredItem.Hash()
	fmt.Printf("	verified:	%t\n	hash:		%x at index: %d\n	root:		%x at index: %d\n",
		inclusionProof.Verify(structuredItem.Index, hash),
		inclusionProof.Leaf,
		inclusionProof.Index,
		inclusionProof.Root,
		inclusionProof.At)

	fmt.Println("\nDONE. ¯\\_(ツ)_/¯")
}

```
## Error handling and cleanup

```go

func exit(err error) {
	_, _ = fmt.Fprintln(os.Stderr, err)
	os.Exit(1)
}

func cleanup(dbDir string, logfile string) {
	// remove db
	os.RemoveAll(dbDir)
	// remove log file
	os.Remove(logfile)
	// remove root
	files, err := filepath.Glob("./\\.root*")
	if err == nil {
		for _, f := range files {
			os.Remove(f)
		}
	}
}

func printItem(key []byte, value []byte, message interface{}) {
	var index uint64
	ts := uint64(time.Now().Unix())
	var verified, isVerified bool
	var hash []byte
	switch m := message.(type) {
	case *immuschema.Index:
		index = m.Index
		dig := immuapi.Digest(index, key, value)
		hash = dig[:]
	case *immuclient.VerifiedIndex:
		index = m.Index
		dig := immuapi.Digest(index, key, value)
		hash = dig[:]
		verified = m.Verified
		isVerified = true
	case *immuschema.Item:
		key = m.Key
		value = m.Value
		index = m.Index
		hash = m.Hash()
	case *immuschema.StructuredItem:
		key = m.Key
		value = m.Value.Payload
		ts = m.Value.Timestamp
		index = m.Index
		hash, _ = m.Hash()
	case *immuclient.VerifiedItem:
		key = m.Key
		value = m.Value
		index = m.Index
		ts = m.Time
		verified = m.Verified
		isVerified = true
		me, _ := immuschema.Merge(value, ts)
		dig := immuapi.Digest(index, key, me)
		hash = dig[:]

	}
	if !isVerified {
		fmt.Printf("	index:		%d\n	key:		%s\n	value:		%s\n	hash:		%x\n	time:		%s\n",
			index,
			key,
			value,
			hash,
			time.Unix(int64(ts), 0))
		return
	}
	fmt.Printf("	index:		%d\n	key:		%s\n	value:		%s\n	hash:		%x\n	time:		%s\n	verified:	%t\n",
		index,
		key,
		value,
		hash,
		time.Unix(int64(ts), 0),
		verified)
}

func printSetItem(set []byte, rkey []byte, score float64, message interface{}) {
	var index uint64
	var verified, isVerified bool
	switch m := message.(type) {
	case *immuschema.Index:
		index = m.Index
	case *immuclient.VerifiedIndex:
		index = m.Index
		verified = m.Verified
		isVerified = true
	}
	key, err := immustore.SetKey(rkey, set, score)
	if err != nil {
		fmt.Print(err.Error())
	}
	if !isVerified {
		fmt.Printf("	index:		%d\n	set:		%s\n	key:		%s\n	score:		%f\n	value:		%s\n	hash:		%x\n",
			index,
			set,
			key,
			score,
			rkey,
			immuapi.Digest(index, key, rkey))
		return
	}
	fmt.Printf("	index:		%d\n	set:		%s\n	key:		%s\n	score:		%f\n	value:		%s\n	hash:		%x\n	verified:	%t\n",
		index,
		set,
		key,
		score,
		rkey,
		immuapi.Digest(index, key, rkey),
		verified)
}
```

## Hello World example

You can find a Hello World example here: [Go client example](https://github.com/codenotary/immudb-client-examples/tree/master/go)

## License

immudb is [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).
