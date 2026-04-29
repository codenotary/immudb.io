# Request Metadata

To enhance the auditing process, immudb can be configured to inject request information - such as user identifiers, IP addresses, and other relevant details - into transaction metadata.

<WrappedSection>

## Enabling request metadata logging

Request metadata logging can be enabled by enabling the `--log-request-metdata` flag of the immudb command (or by setting
the corresponding `IMMUDB_LOG_REQUEST_METADATA` env var to `TRUE`).

For example, when running the immudb docker image:

```bash
$ docker run -e IMMUDB_LOG_REQUEST_METADATA=TRUE -d --net host --name immudb codenotary/immudb:latest
```

### Why should I enable request metadata?

When this functionality is enabled, each transaction includes comprehensive metadata that provides context for the request executed by the immudb server. This metadata allows auditors and administrators to easily retrieve detailed information about the context of each transaction (see how to retrieve transaction metadata from an [SQL table](../develop/sql/querying.md#transaction-metadata)).

Specifically, it enables the identification of who initiated the transaction, from which IP address, and any other pertinent request details. For example, if there is a need to investigate suspicious activity or trace the source of a particular change, this request metadata offers a clear and concise trail of the relevant data.

Note that despite the extra information can increase the storage overhead, the benefits of enhanced transparency and accountability often outweigh the extra storage cost, ensuring that all actions within the database can be thoroughly examined and verified.

</WrappedSection>
