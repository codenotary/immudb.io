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
    - [Integration](#integration)
    - [Connection and authentication](#connection-and-authentication)
    - [Tamperproof read and write](#tamperproof-read-and-write)
    - [Integration](#integration)
    - [To get going quickly](#to-get-going-quickly)
- [Conclusion](#conclusion)

## Introduction
This guide helps developers quickly get started with Codenotary's immudb database and client. It guides you from start to finish with code examples in Node.js, Java, Python, Go, and .Net. After completing the guide, you will have the basic concepts necessary to begin using immudb within your organization.

Note: If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.0/immugw/) option.

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

- For additional technical background on immudb and its performance, see the [Readme](https://github.com/codenotary/immudb/blob/master/README.md) within Codenotary's immudb GitHub Project.
- For additional information on immudb, see our [documentation](https://docs.immudb.io/0.8.0/).


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


## Creating an immudb client

### Integration

Integrate the immudb Client into your application using the official Software Development Kits (SDKs).

:::: tabs

::: tab Go

``` shell script
# Make sure your project is using Go Modules
go mod init app
# Install immudb sdk
go get -u github.com/codenotary/immudb
```

``` go
// Then import the package
import (
  "github.com/codenotary/immudb/pkg/client"
)
 ```
:::

::: tab Java
Just include immudb4j as a dependency in your project:

if using `Maven`:
```xml
    <dependency>
        <groupId>io.codenotary</groupId>
        <artifactId>immudb4j</artifactId>
        <version>0.2.0</version>
    </dependency>
```

if using `Gradle`:
```groovy
    compile 'io.codenotary:immudb4j:0.2.0'
```
[Java SDK repository](https://github.com/codenotary/immudb4j)

immudb4j is currently hosted on both [Maven Central] and [Github Packages].

[Github Packages]: https://docs.github.com/en/packages
[Maven Central]: https://search.maven.org/artifact/io.codenotary/immudb4j
:::

::: tab Python
Install the package using pip:

```shell
    pip3 install immudb-py
```

 Then import the client as follows:

```python
    from immudb import ImmudbClient
```

*Note*: immudb-py need `grpcio` module from google. On Alpine linux, you need
 these packages in order to correctly build (and install) grpcio:
 - `linux-headers`
 - `python3-dev`
 - `g++`

[Python SDK repository](https://github.com/codenotary/immudb-py)

:::

::: tab Node.js

Include the immudb-node as a dependency in your project.

```javascript
	const immudbClient = require('immudb-node')
```

[Node.js SDK repository](https://github.com/codenotary/immudb-node)

:::

::: tab .Net

Use Microsoft's [NuGet](https://www.nuget.org/packages/Immudb4DotNet/) package manager to get immudb4DotNet.


Creating a Client.

  - Using the default configuration.
	```csharp
	  var client = new Codenotary.ImmuDb.ImmuClient("localhost"))
	```

  - The immudb implements IDisposable, so you can wrap it with "using".

	```csharp
	using (var client = new Codenotary.ImmuDb.ImmuClient("localhost", 3322)){}
	```

 [.Net SDK repository](https://github.com/codenotary/immudb4dotnet)
:::

::: tab Others
If you're using another language, then read up on our [immugw](https://docs.immudb.io/0.8.0/immugw/) option.
:::

::::

### Connection and authentication

Immudb run on 3323 default port. Here we connecting a client with default options and
authenticating using default username and password.
It's possible to modify defaults on immudb server config folder inside `immudb.toml`
:::: tabs

::: tab Go

Login method return a token needed in all interactions with the server.

```go
client, err := c.NewImmuClient(client.DefaultOptions())
if err != nil {
    log.Fatal(err)
}
ctx := context.Background()
// login with default username and password and storing a token
lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))
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
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.0/immugw/) option.
:::

::::

### Tamperproof read and write


:::: tabs

You can write with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function.

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
	fmt.Printf("Database consistency verified %t\n", item.Verified)
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
If you're using another development language, please refer to the [immugw](https://docs.immudb.io/0.8.0/immugw/) option.
:::

::::



### To get going quickly:
  - Get the [immudb-client-example code](https://github.com/codenotary/immudb-client-examples).
  - Learn about the basic coding you will use to interact with your immudb client and database. This guide goes from start to finish, in creating a new client instance, writing and reading data, and then closing the client in each of the following.
	- [Go - Initiating and using Client](#go)
	- [Python - Initiating and using Client](#python)
	- [Java - Initiating and using Client](#java)
	- [Node.js - Initiating and using Client](#node-js)
	- [.Net - Initiating and using Client](#net)

## Conclusion

Congratulations for completing the development quick start guide. You've been guided through the essentials you need to know to begin using Codenotary's immudb solution.

You now have:
 - An immudb database server and are familiar with basic authentication.
 - An immudb client.
 - A new immudb database.
 - An instance of the immudb client running.
 - Gone through reading and writing data with and without cryptographic verification.

We've only scratched the surface of immudb's capabilities. Here are some additional resources you might find helpful:
- Learn more through our [documentation](https://docs.immudb.io/0.8.0/).
    - Learn more about the immudb [API](https://docs.immudb.io/0.8.0/immudb/grpc-interface.html).
    - Try out [immuadmin](https://docs.immudb.io/0.8.0/immuadmin/)
- Follow Codenotary's [blog](https://codenotary.io/blog) for more immudb articles and release announcements.
- Additional technical background on immudb and its performance, see the [Readme](https://github.com/codenotary/immudb/blob/master/README.md) within Codenotary's immudb GitHub Project.
<img align="center" src="https://codenotary.io/images/word-tree.png"/>
