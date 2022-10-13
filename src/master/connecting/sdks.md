
# SDKs

<WrappedSection>

::: tip
The SDK usage examples throughout our docs can be found in the [immudb examples repository](https://github.com/codenotary/immudb-client-examples).
:::

The immudb SDKs make it comfortable to talk to an immudb server from your favorite language, without needing to worry about the implementation details of the server's communication protocol.

The most common way to access an immudb database is via a client embedded in an application, which then communicates with the immudb server to perform read and write operations on the database. The immudb SDKs provide a convenient way to do this, wrapping the gRPC protocol in the familiar APIs and conventions of your preferred programming language.

For more information about the immudb SDKs, see the [SDKs](../integrate/sdks.md) page.

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
