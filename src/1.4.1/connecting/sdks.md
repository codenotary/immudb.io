
# SDKs

::: tip
Examples used in this documentation can be found in [immudb examples repository](https://github.com/codenotary/immudb-client-examples).
:::

<WrappedSection>

In the most common scenario, you would perform write and read operations on the database talking to the server. In this case your application will be a client to immudb.

SDKs make it comfortable to talk to the server from your favorite language, without having to deal with details about how to talk to it.

The most well-known and recommended immudb SDK is written in [Golang](https://golang.org/), but there are other SDKs available, both maintained by the internal team and by the community.

| Language | Maintainer           | Latest version | link                | Notes                        |
|----------|----------------------|----------------|---------------------|------------------------------|
| `go`     | immudb team          | 1.4.0          | [link][sdk-go]      |                              |
| `python` | immudb team          | 1.4.0          | [link][sdk-python]  |                              |
| `JAVA`   | immudb team          | 0.9.10.12      | [link][sdk-java]    |                              |
| `.NET`   | immudb team          | 1.0.5          | [link][sdk-dotnet]  |                              |
| `NODE`   | immudb team          | 1.0.4          | [link][sdk-node]    | Verification is not working  |
| `ruby`   | Community ([Ankane]) | 0.1.1          | [link][sdk-ruby]    |                              |

[sdk-go]: https://pkg.go.dev/github.com/codenotary/immudb/pkg/client
[sdk-python]: https://github.com/codenotary/immudb-py
[sdk-java]: https://github.com/codenotary/immudb4j
[sdk-dotnet]: https://github.com/codenotary/immudb4net
[sdk-node]: https://github.com/codenotary/immudb-node
[sdk-ruby]: https://github.com/ankane/immudb-ruby
[Ankane]: https://github.com/ankane

The immudb server manages the requests from the outside world to the store. In order to insert or retrieve data, you need to talk with the server.

<div class="wrapped-picture">

![SDK Architecture](/immudb/immudb-server.svg)

</div>

</WrappedSection>

<WrappedSection>

### immugw communication

For other unsupported programming languages, [immugw](immugw.md) provides a REST gateway that can be used to talk to the server via generic HTTP.

immugw can be found in its [own repository](https://github.com/codenotary/immugw)

immugw proxies REST client communication and gRPC server interface. For security reasons, immugw should not run on the same server as immudb. The following diagram shows how the communication works:

![immugw communication explained](/diagram-immugw.svg)

</WrappedSection>
