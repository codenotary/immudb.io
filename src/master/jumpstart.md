
# Getting started with immudb Development

This guide provides developers with the first steps of using immudb from their application and from their favourite programming language:

* Connect to the database
* Insert and retrieve data

::: tip
To learn how to develop for immudb with Python in a guiden online environment, visit the immudb Playground at <https://play.codenotary.com>
:::

## Clients

In the most common scenario, you would perform write and read operations on the database talking to the server. In this case your application will be a client to immudb.

## SDKs

The immudb server manages the requests from the outside world to the store. In order to insert or retrieve data, you need to talk with the server.

SDKs make it comfortable to talk to the server from your favourite language, without having to deal with details about how to talk to it.

![SDK Architecture](/immudb/sdk-arch.png)

The most well-known immudb SDK is written in [Golang](https://golang.org/), but there are SDKs available for Python, NodeJS, Java and others.

For other unsupported programming languages, [immugw](https://docs.immudb.io/master/immugw/) provides a REST gateway that can be used to talk to the server via generic HTTP.

## Getting immudb running

You may download the immudb binary from [the latest releases on Github](https://github.com/codenotary/immudb/releases/latest). Once you have downloaded immudb, rename it to `immudb`, make sure to mark it as executable, then run it. The following example shows how to obtain v0.9.2 for linux amd64:

```bash
wget https://github.com/vchain-us/immudb/releases/download/v0.9.2/immudb-v0.9.2-linux-amd64
mv immudb-v0.9.2-linux-amd64 immudb
chmod +x immudb

# run immudb in the foreground to see all output
./immudb

# or run immudb in the background
./immudb -d
```

Alternatively, you may use Docker to run immudb in a ready-to-use container. In a terminal type:

```bash
docker run -ti -p 3322:3322 codenotary/immudb:latest
```

(you can add the `-d --rm --name immudb` options to send it to the background).

## Connecting from your programming language

### Importing the SDK

In order to use the SDK, you need to download and import the libraries:

:::: tabs

::: tab Go

```shell script
# Make sure your project is using Go Modules
go mod init example.com/hello
#go get github.com/codenotary/immudb/pkg/client

```go
// Then import the package
import (
	immuclient "github.com/codenotary/immudb/pkg/client"
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
        <version>0.9.0.6</version>
    </dependency>
```

if using `Gradle`:
```groovy
    compile 'io.codenotary:immudb4j:0.9.0.6'
```
[Java SDK repository](https://github.com/codenotary/immudb4j)

immudb4j is currently hosted on both [Maven Central] and [Github Packages].

[Github Packages]: https://github.com/orgs/codenotary/packages?repo_name=immudb4j
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
	  var client = new CodeNotary.ImmuDb.ImmuClient("localhost"))
	```

  - The immudb implements IDisposable, so you can wrap it with "using".

	```csharp
	using (var client = new CodeNotary.ImmuDb.ImmuClient("localhost", 3322)){}
	```

 [.Net SDK repository](https://github.com/codenotary/immudb4dotnet)
:::

::: tab Others
If you're using another language, then read up on our [immugw](https://docs.immudb.io/master/immugw/) option.
:::

::::

### Connection and authentication

The first step is to connect to the database, which listens by default in port 3322, authenticate using the default user and password (`immudb / immudb`), and get a token which can be used in subsequent requests:

>Note: You can [change the server default options](reference/configuration.md) using environment variables, flags or the `immudb.toml` configuration file.

:::: tabs

::: tab Go

>Note: the `Login` method will return a token which can be used in subsequent interactions with the server. This token is set on the context metadata.

```go
import (
	"log"
	"context"
	immuclient "github.com/codenotary/immudb/pkg/client"
	"google.golang.org/grpc/metadata"
)

client, err := immuclient.NewImmuClient(client.DefaultOptions())
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

```java
client = ImmuClient.newBuilder()
    .withServerUrl("localhost")
    .withServerPort(3322)
    .build();
client.login("immudb", "immudb");
```
:::

::: tab Python
```python
from immudb.client import ImmudbClient
ic=ImmudbClient()
ic.login("immudb","immudb")
```
:::

::: tab Node.js
```javascript
const cl = new ImmudbClient();

(async () => {
  try {
    const loginReq: Parameters.Login = { user: 'immudb', password: 'immudb' }
    const loginRes = await cl.login(loginReq)
// ...
} catch (err) {
    console.log(err)
  }
})()
```
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [java sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please read up on our [immugw](https://docs.immudb.io/master/immugw/) option.
:::

::::

### Tamperproof read and write


:::: tabs

You can write with built-in cryptographic verification. The client implements the mathematical validations, while your application uses a traditional read or write function.

::: tab Go
```go
    vtx, err := client.VerifiedSet(ctx, []byte(`hello`), []byte(`immutable world`))
	if  err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Set and verified key '%s' with value '%s' at tx %d\n", []byte(`hello`), []byte(`immutable world`), vtx.Id)

	ventry, err := client.VerifiedGet(ctx, []byte(`hello`))
	if  err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Sucessfully verified key '%s' with value '%s' at tx %d\n", ventry.Key, ventry.Value, ventry.Tx)
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
If you're using another development language, please read up on our [immugw](https://docs.immudb.io/master/immugw/) option.
:::

::::



### To get going quickly:
  - Get the [immudb-client-example code](https://github.com/codenotary/immudb-client-examples). `Note: Only Golang SDK is currently upgraded for immudb 0.9.0`
  - Learn about the basic coding you will use to interact with your immudb client and database. This guide goes from start to finish, in creating a new client instance, writing and reading data, and much more.
   Take a look at the [SDKs api](/master/sdks-api) page.


## Conclusion

Congratulations for completing the development quick start guide. You've been guided through the essentials you need to know to begin using CodeNotary's immudb solution.

You now have:
 - An immudb database server and are familiar with basic authentication.
 - An immudb client.
 - A new immudb database.
 - An instance of the immudb client running.
 - Gone through reading and writing data with and without cryptographic verification.

We've only scratched the surface of immudb's capabilities. Here are some additional resources you might find helpful:
- Learn more through our [documentation](https://docs.immudb.io/master/).
    - Learn more about the immudb [SDKs](https://docs.immudb.io/master/sdks-api.html#contents).
    - Try out [immuadmin](https://docs.immudb.io/master/immuadmin/)
- Follow CodeNotary's [blog](https://codenotary.io/blog) for more immudb articles and release announcements.
- Additional technical background on immudb and its performance, see the [Readme](https://github.com/codenotary/immudb/blob/master/README.md) within CodeNotary's immudb GitHub Project.
<img align="center" src="https://codenotary.io/images/word-tree.png"/>
