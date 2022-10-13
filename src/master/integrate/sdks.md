# Using the SDKs

<WrappedSection>

## Building immudb Clients

If you are looking to integrate an immudb client into your application, you can use one of our available SDKs to interact with the immudb server. The various immudb SDKs connect to an immudb server via gRPC, wrapping the protocol in the familiar APIs and conventions of your preferred programming language.

Generally speaking, the immudb SDKs allow your application to act as a client of an immudb server. The SDK will handle the details of authenticating the client's connection, performing read and write operations, and performing cryptographic verification of the server state—the critical operation that ensures the integrity of your data.

<div class="wrapped-picture">

![SDK Architecture](/immudb/immudb-server.svg)

</div>

If you're building an application from scratch and don't have a preference for a particular programming language, we recommend using the Go SDK to get started. Our Go SDK is the most mature and is [developed as part of the immudb project][gosdk] itself, so it is typically the best-supported option.

Besides the Go SDK, there are several other SDKs available, from both the immudb team and the community: Python, Java, Node, and Ruby. You can find more information about each of these SDKs below.

</WrappedSection>

::: tip
Examples used in this documentation can be found in our [immudb examples repo](https://github.com/codenotary/immudb-client-examples).
:::

<WrappedSection>

## Available SDKs

This table lists the available SDKs and their current status.

<br>

| Language | Docs                | Maintainer                   | Latest immudb version | link            | Notes                       |
| -------- | ------------------- | ---------------------------- | --------------------- | --------------- | --------------------------- |
| `go`     |                     | immudb team                  | 1.3.2                 | [link][gosdk]   |                             |
| `python` | [docs][pysdkdocs]   | immudb team                  | 1.3.2                 | [link][pysdk]   |                             |
| `JAVA`   |                     | immudb team                  | 1.3.2                 | [link][javasdk] |                             |
| `NODE`   | [docs][nodesdkdocs] | immudb team                  | 1.2.1                 | [link][nodesdk] | Verification is not working |
| `ruby`   |                     | Community ([Ankane][ankane]) | 1.3.2                 | [link][rubysdk] |                             |

</WrappedSection>

[gosdk]: <https://pkg.go.dev/github.com/codenotary/immudb/pkg/client>
[pysdk]: <https://github.com/codenotary/immudb-py>
[javasdk]: <https://github.com/codenotary/immudb4j>
[nodesdk]: <https://github.com/codenotary/immudb-node>
[rubysdk]: <https://github.com/ankane/immudb-ruby>
[ankane]: <https://github.com/ankane>
[pysdkdocs]: <python.md>
[nodesdkdocs]: <node.md>
