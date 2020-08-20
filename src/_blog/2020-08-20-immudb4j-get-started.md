---
title: immudb4j - Get started using the Java SDK for immudb
image: /blog/java.jpg
excerpt: 
    Learn how to use the Java SDK for immudb to store your data tamperproof
date: 2020-06-05
tags: 
  - Java
  - SDK
  - immudb
  - guideline
  - tamperproof
author: Dennis
location: Switzerland
---

# First steps to use Java SDK for  immudb — the open source immutable database

**immudb** is **lightweight, high-speed immutable database** for systems and applications. immudb is open source under the [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).

With [immudb](https://github.com/codenotary/immudb) you can track changes in sensitive data in your transactional databases and then record those changes indelibly in a tamperproof database.
immudb makes sure that not just the latest data, but the complete history of, say, your debit/credit transactions is stored unchangeable.


## Setup immudb
If you haven't setup immudb yet, this is the time to do so. You only need to start immudb either as a process, a service or a docker container.

It's up to you if you want to build the Docker images yourself based on the Dockerfiles in the GitHub repository or use the prebuild ones on Dockerhub.

immudb is using the following defaults:

* Auth user: immudb
* Auth password: immudb
* Service Port: 3322 (immudb)

### immudb **Dockerhub**
    
~~~bash
docker run -it -d -p 3322:3322 -p 9497:9497 — name immudb codenotary/immudb:latest
~~~


### standalone Binaries

Each release provides all binaries for different operating systems. you can find these here: [immudb releases](https://github.com/codenotary/immudb/releases)

If you want to build the **binaries **yourself, simply [clone this repo](https://github.com/codenotary/immudb) and run one of the following commands based on your operating system.
    
~~~bash
# Linux
GOOS=linux GOARCH=amd64 make immudb-static
# macOS
GOOS=darwin GOARCH=amd64 make immudb-static
# Microsoft Windows
GOOS=windows GOARCH=amd64 make immudb-static
~~~

Then you can run immudb
    
~~~bash
# run immudb in the foreground 
./immudb
# run immudb in the background 
./immudb -d
~~~

### **install immudb as a service**

Please make sure to build or download the immudb and immuadmin component and save them in the same work directory when installing the service.
    
~~~bash
# install immudb service 
./immuadmin service immudb install
# check current immudb service status 
./immuadmin service immudb status
# stop immudb service 
./immuadmin service immudb stop
# start immudb service 
./immuadmin service immudb start
~~~

## Where to find the official Java SDK for immudb

The always up2date Java SDK for immudb can be find as [immudb4j on Github](https://github.com/codenotary/immudb4j)

## Use the Java SDK for immudb

- [First steps to use Java SDK for  immudb — the open source immutable database](#first-steps-to-use-java-sdk-for-immudb--the-open-source-immutable-database)
  - [Setup immudb](#setup-immudb)
    - [immudb **Dockerhub**](#immudb-dockerhub)
    - [standalone Binaries](#standalone-binaries)
- [Linux](#linux)
- [macOS](#macos)
- [Microsoft Windows](#microsoft-windows)
- [run immudb in the foreground](#run-immudb-in-the-foreground)
- [run immudb in the background](#run-immudb-in-the-background)
    - [**install immudb as a service**](#install-immudb-as-a-service)
- [install immudb service](#install-immudb-service)
- [check current immudb service status](#check-current-immudb-service-status)
- [stop immudb service](#stop-immudb-service)
- [start immudb service](#start-immudb-service)
  - [Where to find the official Java SDK for immudb](#where-to-find-the-official-java-sdk-for-immudb)
  - [Use the Java SDK for immudb](#use-the-java-sdk-for-immudb)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Supported Versions](#supported-versions)
  - [Quickstart](#quickstart)
  - [Step by step guide](#step-by-step-guide)
    - [Creating a Client](#creating-a-client)
    - [User sessions](#user-sessions)
    - [Creating a database](#creating-a-database)
    - [Setting the active database](#setting-the-active-database)
    - [Traditional read and write](#traditional-read-and-write)
    - [Verified or Safe read and write](#verified-or-safe-read-and-write)
    - [Closing the client](#closing-the-client)

## Introduction

immudb4j implements a [grpc] immudb client. A minimalist API is exposed for applications while cryptographic
verifications and state update protocol implementation are fully implemented by this client.
Latest validated immudb state may be keep in the local filesystem when using default `FileRootHolder`,
please read [immudb research paper] for details of how immutability is ensured by [immudb].

[grpc]: https://grpc.io/
[immudb research paper]: https://immudb.io/
[immudb]: https://immudb.io/

## Prerequisites

immudb4j assumes an already running immudb server. Running `immudb` is quite simple, please refer to the
following link for downloading and running it: https://immudb.io/docs/quickstart.html

## Installation

Just include immudb4j as a dependency in your project:

if using `Maven`:
```xml
    <dependency>
        <groupId>io.codenotary</groupId>
        <artifactId>immudb4j</artifactId>
        <version>0.1.6</version>
    </dependency> 
```

if using `Gradle`:
```groovy
    compile 'io.codenotary:immudb4j:0.1.6'
```

Note: immudb4j is currently hosted in [Github Packages].

[Github Packages]: https://docs.github.com/en/packages

Thus `immudb4j Github Package repository` needs to be included with authentication.
When using maven it means to include immudb4j Github Package in your `~/.m2/settings.xml`
file. See "Configuring Apache Maven for use with GitHub Packages" 
and "Configuring Gradle for use with GitHub Packages" at [Github Packages].

## Supported Versions

immudb4j supports the [latest immudb release].

[latest immudb release]: https://github.com/codenotary/immudb/releases/tag/v0.7.1

## Quickstart

[Hello Immutable World!] example can be found in `immudb-client-examples` repo.

[Hello Immutable World!]: https://github.com/codenotary/immudb-client-examples/tree/master/java

Follow its `README` to build and run it.

## Step by step guide

### Creating a Client

The following code snippets shows how to create a client.

Using default configuration:
```java
    ImmuClient immuClient = ImmuClient.newBuilder().build();
```

Setting `immudb` url and port:
```java
    ImmuClient immuClient = ImmuClient.newBuilder()
                                .setServerUrl("localhost")
                                .setServerPort(3322)
                                .build();
```

Customizing the `Root Holder`:
```java
    FileRootHolder rootHolder = FileRootHolder.newBuilder()
                                    .setRootsFolder("./my_immuapp_roots")
                                    .build();

    ImmuClient immuClient = ImmuClient.newBuilder()
                                      .withRootHolder(rootHolder)
                                      .build();
```

### User sessions

Use `login` and `logout` methods to initiate and terminate user sessions:

```java
    immuClient.login("usr1", "pwd1");

    // Interact with immudb using logged user

    immuClient.logout();
```

### Creating a database

Creating a new database is quite simple:

```java
    immuClient.createDatabase("db1");
```

### Setting the active database

Specify the active database with:

```java
    immuClient.useDatabase("db1");
```

### Traditional read and write

immudb provides read and write operations that behave as a traditional
key-value store i.e. no cryptographic verification is done. This operations
may be used when validations can be post-poned:

```java
    client.set("k123", new byte[]{1, 2, 3});
    
    byte[] v = client.get("k123");
```

### Verified or Safe read and write

immudb provides built-in cryptographic verification for any entry. The client
implements the mathematical validations while the application uses as a traditional
read or write operation:

```java
    try {
        client.safeSet("k123", new byte[]{1, 2, 3});
    
        byte[] v = client.safeGet("k123");

    } (catch VerificationException e) {

        //TODO: tampering detected!

    }
```

### Closing the client

To programatically close the connection with immudb server use the `shutdown` operation:
 
```java
    immuClient.shutdown();
```

Note: after shutdown, a new client needs to be created to establish a new connection.

There will be easier options in the future for non developers and also SDK driver for .net, Java, Node.js, Python aso.  
