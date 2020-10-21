# Developer Jumpstart for immudb 
[![Slack](https://img.shields.io/badge/join%20slack-%23immutability-brightgreen.svg)](https://slack.vchain.us/) [![Discuss at immudb@googlegroups.com](https://img.shields.io/badge/discuss-immudb%40googlegroups.com-blue.svg)](https://groups.google.com/group/immudb) [![License](https://img.shields.io/github/license/codenotary/immudb4j)](https://github.com/codenotary/immudb/blob/master/LICENSE)
 
## Contents

- [Introduction](#introduction)
	- [What is immudb](#what-is-immudb)
	- [Why use immudb](#why-use-immudb)
- [Installing the immudb database server](#installing-the-immudb-database-server)
	- [Get the Docker Image](#get-the-docker-image)
	- [Download the installer for the latest release](#download-the-installer-for-the-latest-release)
- [Creating an immudb client instance in your chosen programming language](#creating-an-immudb-client-instance-in-your-chosen-programming-language)
	- [Go](#go)
	- [Python](#python)
	- [Java](#java)
	- [Node.js](#node-js)
	- [.Net](#net)
- [Conclusion](#conclusion)

## Introduction
This guide helps developers quickly start with CodeNotary's immudb database and client. It guides you from start to finish with code samples in Node.js, Java, Python, Go, and .Net. After completing the guide, you will have the basic concepts necessary to begin using immudb within your organization. 

Note: If you're using another development language, please read up on our [immugw](https://docs.immudb.io/immugw/) option.  

<img  src="https://github.com/codenotary/immudb-docs/raw/master/src/immudb/component-diagram.png" />

### What is immudb?
A lightweight, high-speed, immutable database solution capable of processing millions of transactions a second. It provides cryptographic verification of your data integrity without the cost and complexity associated with classic blockchain. You have the flexibility to host immudb on-premise or in the cloud.  
	
<table border="0" >		
	<tr>
		<td width="33%" valign="top" align="center" >
			<h3>Immutable</h3>
			Data is never overwritten. See the history of data updates.
		</td>
		<td width="33%" valign="top" align="center" >
			<h3>Auditable</h3>
			Tamper-evident history system ensures data authenticity.
		</td>
		<td width="33%" valign="top" align="center" >
			<h3>Secure</h3>
			Data ownership is verifiable by clients and auditors.
		</td>
	</tr>		
	<tr >
		<td align="center" ><img src="https://codenotary.io/images/jumpstart/immutable.svg" width="80px"/></td>
		<td align="center" ><img src="https://codenotary.io/images/jumpstart/auditable.svg" width="80px"/></td>
		<td align="center" ><img src="https://codenotary.io/images/jumpstart/secure.svg" width="80px"/></td>
	</tr>
	
</table>

The immudb is a non-relational, NoSQL database. Data is a collection of key-values with time stamps. You can add records, but deletion or modification isn’t allowed making your data immutable. When a record's value changes over time (such as a bank balance), you can get multiple instances with different time stamps to give you the complete change history of that record. Store a variety of common data types, verification checksums, or JSONs.

Depending on your use case, immudb might function as your application's primary or as a secondary database. As a secondary, complimentary database, use immudb to cross-check the data integrity of your important data (by verifying checksums or comparing stored data values). A secondary database enables you to quickly use immudb without completely re-engineering your existing application. 

- For additional technical background on immudb and its performance, see the [Readme](https://github.com/codenotary/immudb/blob/master/README.md) within CodeNotary's immudb GitHub Project.
- For additional information on immudb, see our [documentation](https://docs.immudb.io/).


### Why use immudb?
<img align="right" src="https://codenotary.io/images/immudb/mascot.png" width="240px"/>It ensures the integrity of your organization's data. While Cyber Security is an important part of your organization’s business plan, immudb provides another layer of security to ensure data integrity even in the event your perimeter is breached during an attack.  Data cannot be deleted or modified once stored into immudb. Additions of new data are logged and auditable, enabling you to view any suspect additions made during the intrusion.  

Use cases:
  - Integration with your DevOps ensures code security throughout the development and deployment process. Embed immudb into your [Azure DevOps](https://codenotary.io/blog/securing-your-azure-devops-ecosystem-jenkins-and-kubernetes-aks/) with Jenkins and Kubernetes. Use just [Jenkins](https://codenotary.io/blog/jenkins-build-deployment-pipeline-a-how-to-for-ensuring-integrity/). Alternatively, integrate with [Git Lab](https://codenotary.io/blog/fully-trusted-gitlab-pipeline/) or [GitHub](https://codenotary.io/blog/use-github-actions-for-validated-builds/).

  - Guarantee [File Integrity](https://codenotary.io/blog/file-integrity-monitoring-change-management/) of your critical data. Examples include storing your organization's sensitive financial, credit card transactional, invoices, contracts, educational transcripts, and other important data. 

  - Ensure integrity of your legal [Documents and Invoices](https://codenotary.io/blog/immutably-store-or-guarantee-the-immutability-of-documents-and-invoices-for-compliance-reasons/), contracts, forms, and your downloads and emails.
  
  - Save your Internet of Things (IoT) sensor data as a failsafe plan for loss of data.
  
  - Keep your investment guidelines or stock market data tamperproof for your investment bank or client financial portfolios.
  
  - Store important log files to keep them tamperproof to meet regulations like PCI compliance.
  
  - Protect medical data, test results, or recipes from alteration.


## Installing the immudb database server

In this section, you will install the immudb database server. You have the following options for running immudb database server:

  - For those using Docker, get and launch our image from Docker Hub.  

  - Download our latest immudb release from GitHub. 

  - For the sake of brevity, this Quick Start leaves out getting and compiling the immudb source (refer to the Readme [here](https://github.com/codenotary/immudb) to use this method). 



### Get the Docker Image

1. Pull the immudb Docker Image from [Docker Hub](https://hub.docker.com/r/codenotary/immudb). Below are the commands when using a Linux shell.

	```bash
	docker pull codenotary/immudb:latest
	```

2. You can run immudb in a container using the code that follows.

	```bash
	docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immudb:latest
	```

3. Your immudb should now be up and running. Check your container logs to verify this.

	```bash
	docker logs immudb
	```
4. Skip down to the section about [Creating an immudb client instance in your chosen programming language](#creating-an-immudb-client-instance-in-your-chosen-programming-language).


### Download the installer for the latest release

1. Download the latest release from our [GitHub](https://github.com/codenotary/immudb/releases). 

2. Run immudb. Linux shell commands are shown below.

	```bash	
	./immudb       # Runs immudb in the foreground	
	./immudb -d    # Runs immudb in the background
	```
	- immudb also runs as a service which is explained in this [Readme](https://github.com/codenotary/immudb) to use this method). 
    
3. To stop immudb, find the process `ps -ax | grep immudb` and then `kill -15 <pid>`. Alternatively, the Windows PowerShell commands are `Get-Process immudb* | Stop-Process`.

4. Continue with the section that follows.


## Creating an immudb client instance in your chosen programming language

1. Integrate the immudb Client into your application using the official Software Development Kits (SDKs). Get your SDK using the links that follow:
  - [Go SDK documentation](https://docs.immudb.io/immudb/golang.html)
  - [Python SDK repository](https://github.com/codenotary/immudb-py)
  - [Java SDK repository](https://github.com/codenotary/immudb4j)
  - [Node.js SDK repository](https://github.com/codenotary/immudb-node)
  - [.Net SDK repository](https://github.com/codenotary/immudb4dotnet)	
  - If you're using another language, then read up on our [immugw](https://docs.immudb.io/immugw/) option.

2. To get going quickly: 
  - Get the [immudb-client-example code](https://github.com/codenotary/immudb-client-examples). 	
  - Learn about the basic coding you will use to interact with your immudb client and database. This guide goes from start to finish, in creating a new client instance, writing and reading data, and then closing the client in each of the following.
	- [Go - Initiating and using Client](#go)
	- [Python - Initiating and using Client](#python)
	- [Java - Initiating and using Client](#java)
	- [Node.js - Initiating and using Client](#node-js)
	- [.Net - Initiating and using Client](#net)

## Go
<img align="right" src="https://codenotary.io/images/jumpstart/go-logo.png" width="150px"/>This section provides you with Go code snippets and explains how to work with immudb from start to finish. You will import the immudb dependencies into your Go project, create a new instance of the immudb client and a database. You will go through basic authentication process, and read and write to your new database. 

### Importing immudb dependencies
Import the necessary immudb dependencies into your Go project.
```Go
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

### Creating an immudb client instance through Go

This section will walk you through creating the client, database, and user accounts through Go. Afterwards, you'll executing some basic reads and writes to the database. 

1. Start the immudb client.

```Go
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
    
2. Connect to a new client.
```Go
	fmt.Println("2. Connect immudb client ...")
	client, err := immuclient.NewImmuClient(immuclient.DefaultOptions())
	if err != nil {
		exit(err)
	}
	ctx := context.Background()
```

3. Write key-value transactions with and without verification.

  - You can write key-values while bypassing the cryptographic verification when it can be postponed.

```Go
	//------> Set
	key1, value1 := []byte("client:Ms. Noelia Jaskolski"), []byte("Visa 1514284849020756 09/21")
	index, err := client.Set(ctx, key1, value1)
	if err != nil {
		exit(err)
	}
	fmt.Println("Set - add entry:")
	printItem(key1, value1, index)
``` 


  - You can write with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function.

```Go
	//------> SafeSet
	key2, value2 := []byte("client:Mr. Archibald Beatty"), []byte("Visa 6679499384784022 11/23")
	verifiedIndex, err := client.SafeSet(ctx, key2, value2)
	if err != nil {
		exit(err)
	}
	fmt.Println("SafeSet - add and verify entry:")
	printItem(key2, value2, verifiedIndex)
	key3, value3 := []byte("client:Ms. Maci Schuppe"), []byte("MasterCard 2232703813463070 12/19")
	verifiedIndex, err = client.SafeSet(ctx, key3, value3)
	if err != nil {
		exit(err)
	}
	fmt.Println("SafeSet - add and verify entry:")
	printItem(key3, value3, verifiedIndex)
	value3 = []byte("MasterCard 8069498678459876 10/22")
	verifiedIndex, err = client.SafeSet(ctx, key3, value3)
	if err != nil {
		exit(err)
	}
	fmt.Println("SafeSet - update and verify entry:")
	printItem(key3, value3, verifiedIndex)
``` 

4. About Structured values.

  - Whenever the Go SDK sets data in immudb, it also adds a timestamp. The server should not set the timestamp, the client is in charge of adding the time stamp to prevent different values being used for time stamping.

```Go
	message StructuredKeyValue {
		bytes key = 1;
		Content value = 2;
	}
	message Content {
		uint64 timestamp = 1;
		bytes payload = 2;
	}
```


  - Though content is never unmarshalled by the server, our current definitions are in the protobuffer schema (you can extend this schema).

  - In convert.go, here is the Structured Item logic:

```Go
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

5. Adding references to existing entries.

```Go
	//------> SafeReference
	key3Ref := append([]byte("reference:"), key3...)
	verifiedIndex, err = client.SafeReference(ctx, key3Ref, key3)
	if err != nil {
		exit(err)
	}
	fmt.Println("SafeReference - add and verify a reference key to an existing entry:")
	printItem(key3Ref, value3, verifiedIndex)
``` 

6. Add a secondary index.

```Go
	//------> SafeZAdd
	fmt.Println("SafeZAdd - add and verify scores for existing keys to a new or existing sorted set:")
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

7. Read entries.
  - You can read key-values while bypassing the cryptographic verification.

```Go
	fmt.Println("4. Read entries ...")
	//------> Get
	item, err := client.Get(ctx, key1)
	if err != nil {
		exit(err)
	}
	fmt.Println("Get  - fetch entry:")
	printItem(nil, nil, item)
``` 

  - You can read with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function.


```Go
	//------> SafeGet
	verifiedItem, err := client.SafeGet(ctx, key2)
	if err != nil {
		exit(err)
	}
	fmt.Println("SafeGet - fetch and verify entry:")
	printItem(nil, nil, verifiedItem)
	verifiedItem, err = client.SafeGet(ctx, key3Ref)
	if err != nil {
		exit(err)
	}
	fmt.Println("SafeGet - fetch and verify entry by reference key:")
	printItem(nil, nil, verifiedItem)
``` 

8. Scan your data entries.

```Go
	// zscan             Iterate over a sorted set
	structuredItemList, err := client.ZScan(ctx, set1)
	if err != nil {
		exit(err)
	}
	fmt.Println("ZScan - iterate over a sorted set:")
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
	fmt.Printf("Scan - iterate over keys having the specified prefix (e.g. \"%s\"):\n", prefix)
	for _, item := range structuredItemList.Items {
		printItem(nil, nil, item)
		fmt.Println("	------")
	}
``` 

9. Counting your data entries.

```Go
	//------> Count
	prefix = []byte("client:Ms.")
	itemsCount, err := client.Count(ctx, prefix)
	if err != nil {
		exit(err)
	}
	fmt.Printf("Count - count keys having the specified prefix (e.g. \"%s\"):\n", prefix)
	fmt.Printf("count: %d\n", itemsCount.Count)
``` 

10. Getting the current root.

```Go
	//------> Current tree root
	fmt.Println("Current root - return the last merkle tree root and index stored locally")
	currentRoot, err := client.CurrentRoot(ctx)
	if err != nil {
		exit(err)
	}
	if currentRoot.Root == nil {
		fmt.Println("no root found: immudb is empty")
	}
	fmt.Printf("index: %d\n hash:  %x\n", currentRoot.Index, currentRoot.Root)
``` 

11. Adding a new entry, after getting the current root.

```Go
	fmt.Println("Add a new entry after getting current root:")
	key4, value4 := []byte("client:Mr. Valentin Padurean"), []byte("MasterCard 2232703813463070 01/24")
	verifiedIndex, err = client.SafeSet(ctx, key4, value4)
	if err != nil {
		exit(err)
	}
	fmt.Println("SafeSet - add and verify an entry after getting the current root:")
	printItem(key4, value4, verifiedIndex)
``` 

12. Checking root consistency.

```Go 
	fmt.Println("Consistency - check consistency between the previous root and latest root:")
	proof, err := client.Consistency(ctx, currentRoot.Index)
	if err != nil {
		exit(err)
	}
	fmt.Printf("Verified: %t\n firstRoot: %x at index: %d\n  secondRoot: %x at index: %d\n",
		proof.Verify(immuschema.Root{Index: currentRoot.Index, Root: currentRoot.Root}),
		proof.FirstRoot,
		proof.First,
		proof.SecondRoot,
		proof.Second)
``` 

13. Checking inclusion. This verifies that the specified index is included in the current tree.

```Go
	fmt.Println("Inclusion - check if specified index is included in the current tree:")
	structuredItem, err := client.Get(ctx, key2)
	if err != nil {
		exit(err)
	}
	inclusionProof, err := client.Inclusion(ctx, structuredItem.Index)
	if err != nil {
		exit(err)
	}
	hash, err := structuredItem.Hash()
	fmt.Printf("verified: %t\n hash: %x at index: %d\n root: %x at index: %d\n",
		inclusionProof.Verify(structuredItem.Index, hash),
		inclusionProof.Leaf,
		inclusionProof.Index,
		inclusionProof.Root,
		inclusionProof.At)
	fmt.Println("\nDONE. ¯\\_(ツ)_/¯")
``` 

14. Basic error handling and cleanup for your client. 

```Go
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
			fmt.Printf("index: %d\n key: %s\n value: %s\n hash: %x\n time: %s\n",
				index,
				key,
				value,
				hash,
				time.Unix(int64(ts), 0))
			return
		}
		fmt.Printf("index: %d\n key: %s\n value: %s\n hash: %x\n time: %s\n verified: %t\n",
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
			fmt.Printf("index: %d\n set: %s\n key: %s\n score: %f\n value: %s\n hash: %x\n",
				index,
				set,
				key,
				score,
				rkey,
				immuapi.Digest(index, key, rkey))
			return
		}
		fmt.Printf("index: %d\n set: %s\n key: %s\n score: %f\n value: %s\n hash: %x\n verified: %t\n",
			index,
			set,
			key,
			score,
			rkey,
			immuapi.Digest(index, key, rkey),
			verified)
	}
``` 
	
15. Additional code samples are available:
  - [helloworld.go](https://github.com/codenotary/immudb-client-examples/blob/master/go/helloworld.go)
  - [safehelloworld.go](https://github.com/codenotary/immudb-client-examples/blob/master/go/safehelloworld.go)
  
16. You should now have all the basics you need to begin using immudb in your organization within a Go development environment. You have an immudb database server, created a database, and have an instance of the immudb client running. You've gone through basic authentication and reading and writing to your new database. You can expand on this by reviewing the code samples from the above step. 


## Python
<img align="right" src="https://codenotary.io/images/jumpstart/python-logo.png" width="240px"/>This section provides you with Python code snippets and explains how to work with immudb from start to finish.  You will import the immudb dependencies into your Python project, create a new instance of the immudb client and a database. You will go through basic authentication process, and read and write to your new database. 

### Importing immudb dependencies

1. Install the immudb-py package using [pip](https://pip.pypa.io/) the Python Package Installer.

	```bash
	    pip install git+https://github.com/codenotary/immu-py.git
	```

2. Import the client.

	```python
	    from immudb.client import immudbClient
	```

Note: Immu-py is currently hosted in [GitHub Packages](https://github.com/features/packages).


### Creating an immudb client instance through Python

This section will walk you through creating the immudb client, database, and user accounts through Python. Afterwards, you'll executing some basic reads and writes to the database. 


1. Creating an immudb Client. 

  - Using the default configuration:

	```python
	    client = immudbClient()
	```

  - Setting the `immudb` url and port.

	```python
	    client = immudbClient("mycustomurl:someport")
	    client = immudbClient("10.105.20.32:8899")
	```

2. Managing user sessions in the immudb Client.

  - Use `login` and `logout` functions to start and stop user sessions.

	```python
	    client.login("usr1", "pwd1");
	    // Interact with immudb using logged user
	    client.logout();
	```
3. Encoding requirements.

Please note that, to provide maximum flexibility, all functions accept byte arrays as parameters. Therefore, Unicode strings must be properly encoded. It is possible to store structured objects, but they must be serialized (e.g., with [Pickle](https://docs.python.org/3/library/pickle.html) or [JSON](https://www.json.org/)).

4. Creating your immudb database.

	```python
	    client.createDatabase(b"db1");
	```

5. Specifying the active database for this session.

	```python
	    client.useDatabase(b"db1");
	```
Note: If not specified, the default databased used is *defaultdb*.

6. Reading and writing key-values.

  - You can read and write key-values while bypassing the cryptographic verification when it can be postponed.

	```python
	    client.set(b"k123", b"value123");
	    result = client.get(b"k123");
	```

  - You can read and write with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function.

	```python
	    try:
		client.safeSet(b"k123", new byte[]{1, 2, 3});
		results = client.safeGet(b"k123");
	    Except VerificationException as e:
		# Do something
	```

  - Multi-key reading and writing of key-values.

  - Transactional multi-key read and write functions are available. Atomic multi-key write (all entries are persisted or none).

	```python
	    normal_dictionary = {b"key1": b"value1", b"key2": b"value2"}
	    client.setAll(normal_dictionary);
	```

  - Atomic multi-key read (all entries are retrieved or none).

	```python
	    normal_dictionary = {b"key1": b"value1", b"key2": b"value2"}
	    results_dictionary = client.getAll(normal_dictionary.keys())
	    # Or manually
	    client.get([b"key1", b"key2"])
	```
7. Managing users and access to the immudb database. 
You can add users and grant access to databases.

  - Adding a user.
 The 'createUser' functions creates a new user and grants the specified permission to your database.
 
	```python	
	user='newuser'
	password='Pw1:pasdfoiu'
	permission=immudb.constants.PERMISSION_RW
	database='defaultdb'
	client.createUser(user, password, permission, database)	
	```
	

Notes: You must create the database before creating the user. The password must be between 8 and 32 characters in length, must have at least one upper case letter, a symbol, and a number.

  - Permission are defined in immudb.constants and are:

  	- `PERMISSION_SYS_ADMIN`
  	- `PERMISSION_ADMIN`
  	- `PERMISSION_NONE`
  	- `PERMISSION_R`
  	- `PERMISSION_RW`

  - Changing passwords. 
Provide both the user's new and old password.
	```python
	newPassword="pW1:a0s98d7gfy"
	resp=client.changePassword(user, newPassword, oldPassword)
	```

  - Displaying a list of users.

	```python
	resp=client.listUsers()
	print(users.userlist.users)
	```

8. Closing the client.

  - To close the connection with immudb server use the `shutdown` function.

	```python
	    client.shutdown();
	```

Note: After shutdown, a new client must be created to establish a new connection.

9. Additional code samples are available:
  - [hello_world.py](https://github.com/codenotary/immudb-client-examples/blob/master/python/hello_world.py)
  - [massive_operations.py](https://github.com/codenotary/immudb-client-examples/blob/master/python/massive_operations.py)
  - [parallel_massive_operations.py](https://github.com/codenotary/immudb-client-examples/blob/master/python/parallel_massive_operations.py)
  - [safe_operations.py](https://github.com/codenotary/immudb-client-examples/blob/master/python/safe_operations.py)
  - [very_massive_operations.py](https://github.com/codenotary/immudb-client-examples/blob/master/python/very_massive_operations.py)
  
10. You should now have all the basics you need to begin using immudb in your organization within a Python development environment. You have an immudb database server, created a database, and have an instance of the immudb client running. You've gone through basic authentication and reading and writing to your new database. You can expand on this by reviewing the code samples from the above step. 
 
 
## Java

<img align="right" src="https://codenotary.io/images/jumpstart/java-logo.png" height="100px"/>This section provides you with Java code snippets and explains how to work with immudb from start to finish.  You will import the immudb dependencies into your Java project, create a new instance of the immudb client and a database. You will go through basic authentication process, and read and write to your new database. 


### Importing immudb dependencies

Include immudb4j as a dependency in your project.

  - Using the [Maven](https://maven.apache.org/) build tool:
	```xml
	    <dependency>
		<groupId>io.codenotary</groupId>
		<artifactId>immudb4j</artifactId>
		<version>0.1.8</version>
	    </dependency> 
	```

  - Using the [Gradle](https://gradle.org/) build tool:
	```groovy
	    compile 'io.codenotary:immudb4j:0.1.8'
	```

### Creating an immudb client instance through Java

This section will walk you through creating the immudb client, database, and user accounts through Java. Afterwards, you'll executing some basic reads and writes to the database. 

1. Creating an immudb Client.

  - Using the default configuration:
	```java
	    ImmuClient immuClient = ImmuClient.newBuilder().build();
	```

  - Setting an URL and port.
	```java
	    ImmuClient immuClient = ImmuClient.newBuilder()
					.setServerUrl("localhost")
					.setServerPort(3322)
					.build();
	```

  - Customizing the `Root Holder`.
	```java
	    FileRootHolder rootHolder = FileRootHolder.newBuilder()
					    .setRootsFolder("./my_immuapp_roots")
					    .build();
	    ImmuClient immuClient = ImmuClient.newBuilder()
					    .withRootHolder(rootHolder)
					    .build();
	```

2. Managing user sessions. 

  - Use the `login` and `logout` functions to open and close user sessions.

	```java
	    immuClient.login("usr1", "pwd1");
	    // Interact with immudb using logged user
	    immuClient.logout();
	```

3. Creating an immudb database. 

	```java
	    immuClient.createDatabase("db1");
	```

4. Setting the active immudb database. 

	```java
	    immuClient.useDatabase("db1");
	```

5. Reading and writing key-values to your immudb database. 

  - You can read and write key-values while bypassing the cryptographic verification when it can be postponed.

	```java
	    client.set("k123", new byte[]{1, 2, 3});
	    byte[] v = client.get("k123");
	```

  - You can read and write with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function.

	```java
	    try {
		client.safeSet("k123", new byte[]{1, 2, 3});
		byte[] v = client.safeGet("k123");
	    } (catch VerificationException e) {
		//Tampering detected!
	    }
	```

  - Atomic multi-key write (all entries are persisted or none) follows.

	```java
	    KVList.KVListBuilder builder = KVList.newBuilder();
	    builder.add("k123", new byte[]{1, 2, 3});
	    builder.add("k321", new byte[]{3, 2, 1});
	    KVList kvList = builder.build();
	    client.setAll(kvList);
	```

  - Atomic multi-key read (all entries are retrieved or none) follows.

	```java
	    List<String> keyList = new ArrayList<String>();
	    keyList.add("k123");
	    keyList.add("k321");
	    List<KV> result = client.getAll(keyList);
	    for (KV kv : result) {
		byte[] key = kv.getKey();
		byte[] value = kv.getValue();		...
	    }
	```

6. Closing the immudb client and server connection.

  - To close the connection with your immudb server, use the `shutdown` function.
 
	```java
	    immuClient.shutdown();
	```

Note: After shutdown, you must create a new client for a new connection.

7. Additional code sample is available:

  - [App.java](https://github.com/codenotary/immudb-client-examples/blob/master/java/simple-mvn-app/src/io/codenotary/immudb/helloworld/App.java) includes single and multiple reads and writes.
  
  8. You should now have all the basics you need to begin using immudb in your organization within a Java development environment. You have an immudb database server, created a database, and have an instance of the immudb client running. You've gone through basic authentication and reading and writing to your new database. You can expand on this by reviewing the code samples from the above step. 


## Node.js

<img align="right" src="https://codenotary.io/images/jumpstart/nodejs-logo.svg" width="150px"/>This section provides you with Node.js code snippets and explains how to work with immudb from start to finish.  You will import the immudb dependencies into your Node.js project, create a new instance of the immudb client and a database. You will go through basic authentication process, and read and write to your new database. 


### Including immudb dependencies 

Include the immudb-node as a dependency in your project.

```javascript
	const immudbClient = require('immudb-node')
```

### Creating an immudb client instance through Node.js

This section will walk you through creating the immudb client, database, and users with Node.js. Afterwards, you'll executing some basic reads and writes to the database. 

1. Creating an immudb Client using the default configuration.
	```javascript
	const config = {
	  address: '127.0.0.1:3322',
	  rootPath: '.',
	}
	immudbClient(config, (err, cl) => {
	  if (err) {
	    return console.log(err)
	  }
	  // Interact with the client.
	})
	```
2. Managing user sessions.

  - Use the `login` and `logout` functions to open and close user sessions.

	```javascript 
	try {
	  await cl.login({ username: 'usr1', password: 'pwd1' })
	  // Interact with immudb using logged user.
	  await cl.logout()
	} catch (err) {
	  console.log(err)
	}
	```

  - Using callbacks for user sessions.
	```javascript 
	cl.login({ username: 'usr1', password: 'pwd1' }, (err, res) => {
	  if (err) {
	    return console.log(err)
	  }
	  // Interact with immudb using logged user.
	  cl.logout(null, (err, res) => {
	    if (err) {
	      return console.log(err)
	    })
	    // Logged out.
	})
	```

3. Creating an immudb database.

	```javascript 
	cl.createDatabase('db1')
	```

4. Setting the active immudb database.

	```javascript 
	cl.useDatabase('db1')
	```

5. Reading and writing key values with and without cryptographic verification. 

  - You can read and write key-values while bypassing the cryptographic verification when it can be postponed.

	```javascript 
	let res = await cl.set({ key: 'key1', value: 'value1' })
	console.log(res.index)
	res = await cl.get({ key: 'key1' })
	console.log(res.key, res.value, res.index)
	```

  - You can read and write with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function:


	```javascript 
	try {
	  let res = await cl.safeSet({ key: 'key1', value: 'value1' })
	  console.log(res.index)
	  res = await cl.safeGet({ key: 'key1' })
	  console.log(res.key, res.value, res.index)
	} catch (err) {
	  if (err.clientErr == cl.proofErr) {
	    // Proof does not verify.
	  }
	  console.log(err)
	}
	```

  - Transactional multi-key read and write functions are available. Atomic multi-key write (all entries are persisted or none) is shown below.

	```javascript 
	  req = {
	    skvList: [{
	      key: 'key1',
	      payload: 'value1',
	      timestamp: Math.floor(Date.now()/100),
	    },{
	      key: 'key2',
	      payload: 'value2',
	      timestamp: Math.floor(Date.now()/100),
	    }]
	  }
	  res = await cl.setBatchSV(req)
	```
  - Atomic multi-key read (all entries are retrieved or none) is shown below.
	```javascript 
	    req = {
	      keys: [{
		key: 'key1',
	      },{
		key: 'key2',
	      }],
	    }
	    res = await cl.getBatchSV(req)
	```
6. Closing the immudb client and closing the server connection.

  - Use the `shutdown` function to close the connection with your immudb server.
 
	 ```javascript 
	 cl.shutdown()
	 ```

Note: After shutting down, you must create a new client to establish a new connection.

7. Additional code samples are available:
  - [auth-management.js](https://github.com/codenotary/immudb-node/blob/master/examples/auth-management.js)
  - [database-management.js](https://github.com/codenotary/immudb-node/blob/master/examples/database-management.js)
  - [database-ops-structured.js](https://github.com/codenotary/immudb-node/blob/master/examples/database-ops-structured.js)
  - [database-ops-unstructured.js](https://github.com/codenotary/immudb-node/blob/master/examples/database-ops-unstructured.js)
  - [set-batch.js](https://github.com/codenotary/immudb-node/blob/master/examples/set-batch.js)
  - [user-management.js](https://github.com/codenotary/immudb-node/blob/master/examples/user-management.js)
  
8. You should now have all the basics you need to begin using immudb in your organization within a Node.js development environment. You have an immudb database server, created a database, and have an instance of the immudb client running. You've gone through basic authentication and reading and writing to your new database. You can expand on this by reviewing the code samples from the above step. 

## .Net

<img align="right" src="https://codenotary.io/images/jumpstart/net-logo.png" width="110px"/>This section provides you with csharp code snippets for the Microsoft .Net and explains how to work with immudb from start to finish.  The immudb4DotNet is developed for .Net Core offering broader platform support than the older .Net Framework.  You will import the immudb dependencies into your .Net project, create a new instance of the immudb client and a database. You will go through basic authentication process, and read and write to your new database. 


### Including immudb dependencies

Use Microsoft's [NuGet](https://www.nuget.org/packages/Immudb4DotNet/) package manager to get immudb4DotNet.

### Creating an immudb client instance through .Net

This section will walk you through creating the client, database, and user accounts. Afterwards, you'll executing some basic reads and writes to the database. 

1. Creating a Client.

  - Using the default configuration.
	```csharp 
	  var client = new CodeNotary.ImmuDb.ImmuClient("localhost"))
	```

  - The immudb implements IDisposable, so you can wrap it with "using".

	```csharp 
	using (var client = new CodeNotary.ImmuDb.ImmuClient("localhost", 3322)){}
	```

2. Managing user sessions.

  - Use `LoginAsync` and `LogoutAsync` functions to open and close user sessions. You can specify an optional database name. If the database does not exist then it will be created.

	```csharp
	    await immuClient.LoginAsync("user", "password", "database");
	    // Interact with immudb using logged user
	    await immuClient.LogoutAsync();
	```

  - Alternatively, you can call the Close() function to end your connection. After Logout() you can reuse the same client. However, after Close() you have to create a new client. The Close() function automatically disposes of your client.

3. Creating an immudb database.

	```csharp
	    immuClient.CreateDatabaseAsync("database");
	```

4. Setting the active immudb database.

	```csharp
	    immuClient.UseDatabaseAsync("database", false);
	```

  - The second, optional parameter indicates whether to create the database if doesn't exist. Default is true.

5. Reading and writing key-values without verification.

  - You can read and write key-values while bypassing the cryptographic verification when it can be postponed.

	```csharp
	    await client.SetAsync("Key", "Value");
	    var result = await client.GetAsync("Key");
	```

  - You can use generic functions that takes the class as a value. It will be serialized as JSON and written to immudb, and de-serialized when retrieved.

	```csharp
	await client.SetAsync("key", new MyClass() { Property = "Value" });
	var result = await client.GetAsync<MyClass>("key");
	```

  - TryGet functions are also available. Although, they will not throw exceptions if the specified key is missing from your database.

	```csharp
	 if (await client.TryGet("key", out var value)){
	  // use value
	 }
	```

6. Reading and writing key-values with verification.

  - You can read and write with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function.


	```csharp
	    try{
		await client.SafeSetAsync("key", "value");
		var result = await client.SafeGetAsync("key");
	    } 
	    catch (VerificationException e){
	       //Tampering detected!
	    }
	```

7. Closing the immudb client.

- To close the connection with your immudb server use the `shutdown` function.
 
   ```csharp
	immuClient.Close();
   ```

Note: After shutdown, you must create a new client to establish a new connection.

8. Downloadable .Net cde samples are not yet available. 

9. You should now have all the basics you need to begin using immudb in your organization within a .Net development environment. You have an immudb database server, created a database, and have an instance of the immudb client running. You've gone through basic authentication and reading and writing to your new database.
  
## Conclusion
  
Congratulations for completing the development quick start guide. You've been guided through the essentials you need to know to begin using CodeNotary's immudb solution. 

You now have:
 - An immudb database server and are familiar with basic authentication. 
 - An immudb client.
 - A new immudb database. 
 - An instance of the immudb client running. 
 - Gone through reading and writing data with and without cryptographic verification.   

We've only scratched the surface of immudb's capabilities. Here are some additional resources you might find helpful: 
- Learn more through our [documentation](https://docs.immudb.io/).
    - Learn more about the immudb [API](https://docs.immudb.io/immudb/grpc-interface.html).
    - Try out [immuadmin](https://docs.immudb.io/immuadmin/)       
- Follow CodeNotary's [blog](https://codenotary.io/blog) for more immudb articles and release announcements.
- Additional technical background on immudb and its performance, see the [Readme](https://github.com/codenotary/immudb/blob/master/README.md) within CodeNotary's immudb GitHub Project.
<img align="center" src="https://codenotary.io/images/word-tree.png"/>
