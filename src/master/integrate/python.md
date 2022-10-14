# Python SDK

<WrappedSection>

## Introduction

The Python SDK for immudb allows you to integrate an immudb client into your Python application without having to worry about implementing the underlying gRPC communication between your application and an immudb server.

This library is a gRPC client wrapper, which has been thoughtfully designed to provide your Python application with a minimal, familiar interface for interacting with an immudb server. When you integrate the SDK in your application, you can perform read and write operations on data stored in an immudb database, all without needing to implement the gRPC protocol yourself or worry about handling the cryptographic verification of the state of the database.

### Highlights

The `immudb-py` SDK implements all of the following features:

* Managing connections to an immudb server via gRPC.
* Performing cryptographic verification of the state of the database—ensuring immutability.
* Storing the latest validated state of immudb in a local filesystem.
* Performing read and write operations on the database.

</WrappedSection>

<WrappedSection>

## Getting Started

Before you can use the `immudb-py` library in your Python application, you should make sure you have an immudb server up and running that the client can connect to. You can download and run an immudb server by following the instructions in the [Running](../running/download) section of this site.

### Getting the SDK

The latest stable version of `immudb-py` is available through pip:

```shell
pip3 install immudb-py
```

You can also install the latest version of the SDK by cloning this repository and using the `make` command to install the prerequisites and the package itself:

```shell
git clone https://github.com/codenotary/immudb-py.git && cd immudb-py
make init
make install
```

### Using the SDK

Once the SDK is installed, you can import the client library into your Python application:

```python
from immudb import ImmudbClient
```

</WrappedSection>
