
# SDKs

<WrappedSection>

::: tip
Examples used in this documentation can be found in [immudb examples repository](https://github.com/codenotary/immudb-client-examples).
:::

</WrappedSection>

<WrappedSection>

In the most common scenario, you would perform write and read operations on the database talking to the server. In this case your application will be a client to immudb.

SDKs make it comfortable to talk to the server from your favorite language, without having to deal with details about how to talk to it.

The most well-known and recommended immudb SDK is written in [Golang](https://golang.org/), but there are other SDKs available, both maintained by the internal team and by the community.


| Language         | Maintainer | Immdb version | link | Notes                                                                              |
|-------------------|---------|------------------|-------------|-----------------------------------------------------------|
| `go`               | immudb team  | 1.3.0       |     [link](https://pkg.go.dev/github.com/codenotary/immudb/pkg/client)  |                                   |
| `python`               | immudb team  | 1.2.4       |  [link](https://github.com/codenotary/immudb-py) |                                     |
| `JAVA`               | immudb team  | 1.2.1       |   [link](https://github.com/codenotary/immudb4j)  | Verification is not working                                      |
| `NODE`               | immudb team | 1.2.1       |   [link](https://github.com/codenotary/immudb-node) | Verification is not working                 |
| `JS`               | immudb team | 1.2.1       |   [link](https://github.com/codenotary/immu-js) | Verification is not working                 |
| `ruby`               | Community ([Ankane](https://github.com/ankane))  | 1.2.1       |   [link](https://github.com/ankane/immudb-ruby) |Verification is not working                 |


The immudb server manages the requests from the outside world to the store. In order to insert or retrieve data, you need to talk with the server.

<div class="wrapped-picture">

![SDK Architecture](/immudb/immudb-server.svg)

</div>

</WrappedSection>

<WrappedSection>

### immugw communication

For other unsupported programming languages, [immugw](../develop/immugw.md) provides a REST gateway that can be used to talk to the server via generic HTTP.

immugw can be found in its [own repository](https://github.com/codenotary/immugw)

immugw proxies REST client communication and gRPC server interface. For security reasons, immugw should not run on the same server as immudb. The following diagram shows how the communication works:

![immugw communication explained](/diagram-immugw.svg)

</WrappedSection>