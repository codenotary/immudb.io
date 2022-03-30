# How it works

Download the [immudb short research paper](https://codenotary.com/technologies/immudb/) to learn about the technical foundations of immudb.

## Adding data

When adding data the merkle tree changes as well as shown in the diagram

![the merkle tree changes with every new data](https://github.com/codenotary/immudb/raw/master/img/immudb-adding-data-diagram.png)

## Checking data consistency

The following diagram explains how data is inserted, verified and consistency checked.

![How immudb data consistency works](https://github.com/codenotary/immudb/raw/master/img/immudb-consistency-diagram.png)


## Structured value

The messages structure allows callers to use key value pairs as embedded payload. Thus, it will soon be possible to decouple and extend
the value structure. The value, currently a stream of bytes, can be augmented with some client provided metadata.
This also permits use of an on-demand serialization/deserialization strategy.

The payload includes a timestamp and a value at the moment. In the near future cryptographic signatures will be added as well, but it's
possible to decouple and extend. The entire payload contribute to hash generation and is inserted in
the merkle tree.

All the complexity is hidden by the SDK.

## Root signature

Providing `immudb` with a signing key enables the cryptographic root signature.
In this way an auditor for instance or a third party client could verify the authenticity of the returned root hash / index pair after calling `currentRoot` gRPC method.
Here the gRPC message definitions:
```
message Root {
	RootIndex payload = 1;
	Signature signature = 2;
}

message RootIndex {
	uint64 index = 1;
	bytes root = 2;
}

message Signature {
	bytes signature = 1;
	bytes publicKey = 2;
}
```
It's possible to use the environment `IMMUDB_SIGNINGKEY` or `--signingKey` immudb flag.

To generate a valid key it's possible to use `openssl` tool:
```bash
openssl ecparam -name prime256v1 -genkey -noout -out my.key
```
Immuclient and [immugw](https://github.com/codenotary/immugw) are shipped with auditor capabilities.
To obtain the advantages of using the signed root in combination with the auditor it's possible to launch:
* immuclient with auditor capabilities:
```bash
immuclient audit-mode --audit-username {immudb-username} --audit-password {immudb-pw} --audit-signature validate
```
* with [immugw](https://github.com/codenotary/immugw) with auditor capabilities:
```bash
./immugw --audit --audit-username {immudb-username} --audit-password {immudb-pw} --audit-signature validate
```

## Item References

Enables the insertion of a special entry which references to another item

## Value timestamp

The server should not set the timestamp, to avoid relying on a non-verifiable “single source of truth”.
Thus, the clients must provide it. The client driver implementation can automatically do that for the user.

## Primary Index

Index enables queries and search based on the data key

## Secondary Index

Index enables queries and search based on the data value

## Cryptographic signatures

A signature (PKI) provided by the client can become part of the insertion process

## Authentication (transport)

Integrated mTLS offers the best approach for machine-to-machine authentication, also providing communications security (entryption) over the transport channel

# immugw communication
immugw can be found in its [own repository](https://github.com/codenotary/immugw)

immugw proxies REST client communication and gRPC server interface. For security purposes, immugw should not run on the same server as immudb. The following diagram shows how the communication works:

![immugw communication explained](/diagram-immugw.svg)
