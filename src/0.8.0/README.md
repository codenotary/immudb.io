# Introduction 0.8.0

immudb is a **lightweight, high-speed immutable database** for systems and applications, written in Go.
With immudb you can track changes in sensitive data in your transactional databases and then record those changes permanently in a
tamperproof immudb database. This allows you to keep an indelible history of sensitive data, for example debit/credit card transactions.
<img align="right" src="https://raw.githubusercontent.com/codenotary/immudb/master/img/immudb-mascot-small.png" width="256px"/>

Traditional transaction logs are hard to scale and are mutable. So there is no way to know for sure if your data has been compromised.

As such, immudb provides **unparalleled insights** **retroactively** of changes to your sensitive data, even
if your perimeter has been compromised. immudb guarantees immutability by using a **Merkle tree structure** internally.

immudb gives you the same **cryptographic verification** of the integrity of data written with **SHA-256** as a classic blockchain without the cost and complexity associated with blockchains today.

## Why immudb?

immudb has 4 main benefits:

1. **immudb is immutable**. You can add records, but **never change or delete records**.
2. Data stored in immudb is **cryptographically coherent and verifiable**, like blockchains, just without all the complexity and at high speed.
3. Anyone can get **started with immudb in minutes**. Whether you're using node.js, Java, Python, Golang, .Net, or any other language. It's very easy to use and you can have your immutable database running in just a few minutes.
4. Finally, immudb is  **Open Source**. You can run it **on premise**, or in the **cloud**. It's completely free. immudb is governed by the Apache 2.0 License.

immudb can be ran on **Linux**, **FreeBSD**, **Windows**, and **MacOS**, along with
other systems derived from them, such as **Kubernetes** and **Docker**.

[![Tweet about
immudb!](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Tweet%20about%20immudb)](https://twitter.com/intent/tweet?text=immudb:%20lightweight,%20high-speed%20immutable%20database!&url=https://github.com/codenotary/immudb)

## Components

- **immudb** is the server binary that listens on port 3322 and provides a gRPC interface
- **immugw** is the intelligent REST proxy that connects to immudb and provides a RESTful interface for applications. We recommend to run immudb and immugw on separate machines to enhance security. immugw can be found in a different [repository](https://github.com/codenotary/immugw)
- **immuadmin** is the admin CLI for immudb and immugw. You can install and manage the service installation for both components and get statistics as well as runtime information.
- **immuclient** is the CLI client for immudb. You can read, write data into immudb from the commandline using direct or interactive mode.

![immudb component overview](https://github.com/codenotary/immudb-docs/raw/master/src/immudb/component-diagram.png)


The latest release binaries can be found [here](https://github.com/codenotary/immudb/releases )

## Further readings

1.  [How it works](how-it-works.md) - How does immudb work internally?
2.  [Quickstart](quickstart.md) - How to try it now on your systems, get a Docker container running in seconds
3.  [Command reference](command-reference.md) - Command reference of the components
4.  [APIs and interfaces](apis-references.md) - API reference and code examples

## License

immudb is [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).
