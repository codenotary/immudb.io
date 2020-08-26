# How it works

## Adding data

When adding data, the Merkle tree changes as well, as shown in the diagram.

![the merkle tree changes with every new data](https://raw.githubusercontent.com/codenotary/immudb/master/img/immudb-adding-data-diagram.png)

## Checking data consistency

The following diagram explains how data is inserted, verified and consistency checked.

![How immudb data consistency works](https://raw.githubusercontent.com/codenotary/immudb/master/img/immudb-consistency-diagram.png)



## immugw communication

immugw proxies REST client communication and gRPC server interface. For security purposes, immugw should not run on the same server as immudb. The following diagram shows how the communication works:

![immugw communication explained](https://raw.githubusercontent.com/codenotary/immudb/master/img/immugw-diagram.png)
