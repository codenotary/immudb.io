# Introduction

immudb is a **lightweight, high-speed immutable database** for systems and applications. Written in Go.
With immudb you can track changes in sensitive data in your transactional databases and then record those changes permanently in a
tamperproof immudb database. This allows you to keep an indelible history of sensitive data, for example debit/credit card transactions.
<img align="right" src="https://raw.githubusercontent.com/codenotary/immudb/master/img/immudb-mascot-small.png" width="256px"/>

Traditional transaction logs are hard to scale and are mutable. So there is no way to know for sure if your data has been compromised.

As such, immudb provides **unparalleled insights** **retroactively** of changes to your sensitive data, even
if your perimeter has been compromised. immudb guarantees immutability by using a **Merkle tree structure** internally.

immudb gives you the same **cryptographic verification** of the integrity of data written with **SHA-256** like a classic blockchain without the cost and complexity associated with blockchains today.

immudb has 4 main benefits:

1. **immudb is immutable**. You can add records, but **never change or delete records**.
2. Data stored in immudb is **cryptographically coherent and verifiable**, like blockchains, just without all the complexity and at high speed.
3. Anyone can get **started with immudb in minutes**. Whether you're using node.js, Java, Python, Golang, .Net, or any other language. It's very easy to use and you can have your immutable database running in just a few minutes.
4. Finally, immudb is  **Open Source**. You can run it **on premise**, or in the **cloud**. It's completely free. immudb is governed by the Apache 2.0 License.

immudb can be ran on **Linux**, **FreeBSD**, **Windows**, and **MacOS**, along with
other systems derived from them, such as **Kubernetes** and **Docker**.

[![Tweet about
immudb!](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Tweet%20about%20immudb)](https://twitter.com/intent/tweet?text=immudb:%20lightweight,%20high-speed%20immutable%20database!&url=https://github.com/codenotary/immudb)

## Contents

1.  [Quickstart](#quickstart) - How to try it now on your systems, get a Docker container running in seconds
2.  [Components](#components) - immudb component overview
3.  [Build the binaries](#build-the-binaries) - How to build the different component binaries
4.  [immudb first start](#immudb-first-start) - Start immudb
5.  [Command reference](#command-reference) - Command reference of the components
6.  [Docker](#docker) - Use docker container to run immudb
7.  [How immudb works](#how-immudb-works) - How does immudb work internally
8.  [APIs and interfaces](#apis-and-interfaces) - API reference and code examples


## Quickstart

### Components

- **immudb** is the server binary that listens on port 3322 on localhost and provides a gRPC interface
- **immugw** is the intelligent REST proxy that connects to immudb and provides a RESTful interface for applications. We recommend to run immudb and immugw on separate machines to enhance security
- **immuadmin** is the admin CLI for immudb and immugw. You can install and manage the service installation for both components and get statistics as well as runtime information.
- **immuclient** is the CLI client for immudb. You can read, write data into immudb from the commandline using direct or interactive mode.

The latest release binaries can be found [here](https://github.com/codenotary/immudb/releases )

### Build the binaries

To build the binaries yourself, simply clone this repo and run

```
make all
```


#### Linux (by component)

```bash
GOOS=linux GOARCH=amd64 make immuclient-static immuadmin-static immudb-static immugw-static
```

#### MacOS (by component)

```bash
GOOS=darwin GOARCH=amd64 make immuclient-static immuadmin-static immudb-static immugw-static
```

#### Windows (by component)

```bash
GOOS=windows GOARCH=amd64 make immuclient-static immuadmin-static immudb-static immugw-static
```

### immudb first start

#### Run immudb binary

```bash
# run immudb in the foreground
./immudb

# run immudb in the background
./immudb -d
```

#### Run immudb as a service (using immuadmin)

Please make sure to build or download the immudb and immuadmin component and save them in the same work directory when installing the service.

```
# install immudb service
./immuadmin service immudb install

# check current immudb service status
./immuadmin service immudb status

# stop immudb service
./immuadmin service immudb stop

# start immudb service
./immuadmin service immudb start
```

The linux service is using the following defaults:

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| all data files          | /var/lib/immudb    |
| pid file                | /var/run/immdb.pid |
| log files               | /var/log/immudb    |



#### Run immugw as a service (using immuadmin)

Please make sure to build or download the immugw and immuadmin component and save them in the same work directory when installing the service.

```
# install immugw service
./immuadmin service immugw install

# check current immugw service status
./immuadmin service immugw status

# stop immugw service
./immuadmin service immugw stop

# start immugw service
./immuadmin service immugw start
```

The linux service is using the following defaults:

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| pid file                | /var/run/immgw.pid |
| log files               | /var/log/immudb    |



### Command reference

#### immudb

Simply run ```./immudb -d``` to start immudb locally in the background.

If you want to stop immudb în that case you need to find the process `ps -ax | grep immudb` and then `kill -15 <pid>`. Windows PowerShell would be `Get-Process immudb* | Stop-Process`.

Immudb is launched by default with a security routine called [consistency checker](immudb/consistency-checker.md) . This solution provides a continuosly corruption check on data stored on server storage. 

```
immudb - the lightweight, high-speed immutable database for systems and applications.

Environment variables:
  IMMUDB_DIR=.
  IMMUDB_NETWORK=tcp
  IMMUDB_ADDRESS=127.0.0.1
  IMMUDB_PORT=3322
  IMMUDB_DBNAME=immudb
  IMMUDB_PIDFILE=
  IMMUDB_LOGFILE=
  IMMUDB_MTLS=false
  IMMUDB_AUTH=false
  IMMUDB_DETACHED=false
  IMMUDB_CONSISTENCY-CHECK=true
  IMMUDB_PKEY=./tools/mtls/3_application/private/localhost.key.pem
  IMMUDB_CERTIFICATE=./tools/mtls/3_application/certs/localhost.cert.pem
  IMMUDB_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem

Usage:
  immudb [flags]
  immudb [command]

Available Commands:
  help        Help about any command
  version     Show the immudb version

Flags:
  -a, --address string       bind address (default "127.0.0.1")
  -s, --auth                 enable auth
      --certificate string   server certificate file path (default "./tools/mtls/3_application/certs/localhost.cert.pem")
      --clientcas string     clients certificates list. Aka certificate authority (default "./tools/mtls/2_intermediate/certs/ca-chain.cert.pem")
      --config string        config file (default path are configs or $HOME. Default filename is immudb.ini)
      --consistency-check    enable consistency check monitor routine. To disable: --consistency-check=false (default true)
  -n, --dbname string        db name (default "immudb")
  -d, --detached             run immudb in background
      --dir string           data folder (default "./db")
  -h, --help                 help for immudb
      --logfile string       log path with filename. E.g. /tmp/immudb/immudb.log
  -m, --mtls                 enable mutual tls
      --no-histograms        disable collection of histogram metrics like query durations
      --pidfile string       pid path with filename. E.g. /var/run/immudb.pid
      --pkey string          server private key path (default "./tools/mtls/3_application/private/localhost.key.pem")
  -p, --port int             port number (default 3322)

Use "immudb [command] --help" for more information about a command.

```

#### immugw

Simply run ```./immugw -d``` to start immugw on the same machine as immudb (test or dev environment) or pointing to the remote immudb system ```./immugw --immudbaddress "immudb-server"```.

If you want to stop immugw în that case you need to find the process `ps -ax | grep immugw` and then `kill -15 <pid>`. Windows PowerShell would be `Get-Process immugw* | Stop-Process`.

```
immu gateway: a smart REST proxy for immudb - the lightweight, high-speed immutable database for systems and applications.
It exposes all gRPC methods with a REST interface while wrapping all SAFE endpoints with a verification service.

Environment variables:
  IMMUGW_ADDRESS=127.0.0.1
  IMMUGW_PORT=3323
  IMMUGW_IMMUDB-ADDRESS=127.0.0.1
  IMMUGW_IMMUDB-PORT=3322
  IMMUGW_DIR=.
  IMMUGW_PIDFILE=
  IMMUGW_LOGFILE=
  IMMUGW_DETACHED=false
  IMMUGW_MTLS=false
  IMMUGW_SERVERNAME=localhost
  IMMUGW_PKEY=./tools/mtls/4_client/private/localhost.key.pem
  IMMUGW_CERTIFICATE=./tools/mtls/4_client/certs/localhost.cert.pem
  IMMUGW_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem

Usage:
  immugw [flags]
  immugw [command]

Available Commands:
  help        Help about any command
  version     Show the immugw version

Flags:
  -a, --address string          immugw host address (default "127.0.0.1")
      --certificate string      server certificate file path (default "./tools/mtls/4_client/certs/localhost.cert.pem")
      --clientcas string        clients certificates list. Aka certificate authority (default "./tools/mtls/2_intermediate/certs/ca-chain.cert.pem")
      --config string           config file (default path are configs or $HOME. Default filename is immugw.toml)
  -d, --detached                run immudb in background
      --dir string              program files folder (default ".")
  -h, --help                    help for immugw
  -k, --immudb-address string   immudb host address (default "127.0.0.1")
  -j, --immudb-port int         immudb port number (default 3322)
      --logfile string          log path with filename. E.g. /tmp/immugw/immugw.log
  -m, --mtls                    enable mutual tls
      --pidfile string          pid path with filename. E.g. /var/run/immugw.pid
      --pkey string             server private key path (default "./tools/mtls/4_client/private/localhost.key.pem")
  -p, --port int                immugw port number (default 3323)
      --servername string       used to verify the hostname on the returned certificates (default "localhost")

Use "immugw [command] --help" for more information about a command.


```

#### immuadmin

For security reasons we recommend using immuadmin only on the same system as immudb. User management is restricted to localhost usage. Simply run ```./immuadmin``` on the same machine.

```
CLI admin client for immudb - the lightweight, high-speed immutable database for systems and applications.

Environment variables:
  IMMUADMIN_IMMUDB-ADDRESS=127.0.0.1
  IMMUADMIN_IMMUDB-PORT=3322
  IMMUADMIN_MTLS=true
  IMMUADMIN_SERVERNAME=localhost
  IMMUADMIN_PKEY=./tools/mtls/4_client/private/localhost.key.pem
  IMMUADMIN_CERTIFICATE=./tools/mtls/4_client/certs/localhost.cert.pem
  IMMUADMIN_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem

Usage:
  immuadmin [command]

Available Commands:
  backup      Make a copy of the database files and folders
  dump        Dump database content to a file
  help        Help about any command
  login       Login using the specified username and password (admin username is immu)
  logout
  restore     Restore the database from a snapshot archive or folder
  service     Manage immu services
  set         Update server config items: auth (none|password|cryptosig), mtls (true|false)
  stats       Show statistics as text or visually with the '-v' option. Run 'immuadmin stats -h' for details.
  status      Show heartbeat status
  user        Perform various user-related operations: list, create, delete, change password
  version     Show the immuadmin version

Flags:
      --certificate string      server certificate file path (default "./tools/mtls/4_client/certs/localhost.cert.pem")
      --clientcas string        clients certificates list. Aka certificate authority (default "./tools/mtls/2_intermediate/certs/ca-chain.cert.pem")
      --config string           config file (default path is configs or $HOME; default filename is immuadmin.toml)
  -h, --help                    help for immuadmin
  -a, --immudb-address string   immudb host address (default "127.0.0.1")
  -p, --immudb-port int         immudb port number (default 3322)
  -m, --mtls                    enable mutual tls
      --pkey string             server private key path (default "./tools/mtls/4_client/private/localhost.key.pem")
      --servername string       used to verify the hostname on the returned certificates (default "localhost")
      --tokenfile string        authentication token file (default path is $HOME or binary location; the supplied value will be automatically suffixed with _admin; default filename is token_admin) (default "token")

Use "immuadmin [command] --help" for more information about a command.

```

#### immuclient

Simply run ```./immuclient``` on the same machine or ```./immuclient -a <immudb-host>```

```
CLI client for immudb - the lightweight, high-speed immutable database for systems and applications.
Environment variables:
  IMMUCLIENT_IMMUDB-ADDRESS=127.0.0.1
  IMMUCLIENT_IMMUDB-PORT=3322
  IMMUCLIENT_AUTH=false
  IMMUCLIENT_MTLS=false
  IMMUCLIENT_SERVERNAME=localhost
  IMMUCLIENT_PKEY=./tools/mtls/4_client/private/localhost.key.pem
  IMMUCLIENT_CERTIFICATE=./tools/mtls/4_client/certs/localhost.cert.pem
  IMMUCLIENT_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem

Usage:
  immuclient [command]

Available Commands:
  check-consistency Check consistency for the specified index and hash
  count             Count keys having the specified prefix
  current           Return the last merkle tree root and index stored locally
  get               Get item having the specified key
  getByIndex        Return an element by index
  help              Help about any command
  history           Fetch history for the item having the specified key
  inclusion         Check if specified index is included in the current tree
  iscan             Iterate over all elements by insertion order
  login             Login using the specified username and password
  logout
  rawsafeget        Get item having the specified key, without parsing structured values
  rawsafeset        Set a value for the item having the specified key, without setup structured values
  reference         Add new reference to an existing key
  safeget           Get and verify item having the specified key
  safereference     Add and verify new reference to an existing key
  safeset           Add and verify new item having the specified key and value
  safezadd          Add and verify new key with score to a new or existing sorted set
  scan              Iterate over keys having the specified prefix
  set               Add new item having the specified key and value
  status            Ping to check if server connection is alive
  version           Show the immuclient version
  zadd              Add new key with score to a new or existing sorted set
  zscan             Iterate over a sorted set

Flags:
      --certificate string      server certificate file path (default "./tools/mtls/4_client/certs/localhost.cert.pem")
      --clientcas string        clients certificates list. Aka certificate authority (default "./tools/mtls/2_intermediate/certs/ca-chain.cert.pem")
      --config string           config file (default path are configs or $HOME. Default filename is immuclient.toml)
  -h, --help                    help for immuclient
  -a, --immudb-address string   immudb host address (default "127.0.0.1")
  -p, --immudb-port int         immudb port number (default 3322)
  -m, --mtls                    enable mutual tls
      --pkey string             server private key path (default "./tools/mtls/4_client/private/localhost.key.pem")
      --servername string       used to verify the hostname on the returned certificates (default "localhost")
      --tokenfile string        authentication token file (default path is $HOME or binary location; default filename is token) (default "token")
      --value-only              returning only values for get operations

Use "immuclient [command] --help" for more information about a command.

```


### Docker

All services and cli components are also available as docker images on dockerhub.com.

| Component | Container image                               |
| --------- | --------------------------------------------- |
| immudb    | https://hub.docker.com/r/codenotary/immudb    |
| immugw    | https://hub.docker.com/r/codenotary/immugw    |
| immuadmin | https://hub.docker.com/r/codenotary/immuadmin |
| immuclient | https://hub.docker.com/r/codenotary/immuclient |

#### Run immudb

```bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immudb:latest
```

#### Run immugw

```
docker run -it -d -p 3323:3323 --name immugw --env IMMUGW_IMMUDB-ADDRESS=immudb codenotary/immugw:latest
```

#### Run immuadmin

You can either find immuadmin in the immudb container (/usr/local/bin/immuadmin) or run the docker container to connect to the local immudb.

```
docker run -it --rm --name immuadmin codenotary/immuadmin:latest status
```

#### Run immuclient

You can either find immuclient in the immudb container (/usr/local/bin/immuclient) or run the docker container to connect to the local or remote immudb.

```
docker run -it --rm --name immuclient codenotary/immuclient:latest -a <immudb-host>
```

#### Build the container images yourself

If you want to build the container images yourself, simply clone this repo and run

```
docker build -t myown/immudb:latest -f Dockerfile .
docker build -t myown/immugw:latest -f Dockerfile.immugw .
docker build -t myown/immuadmin:latest -f Dockerfile.immuadmin .
docker build -t myown/immuclient:latest -f Dockerfile.immuclient .
```

## How immudb works

### adding data

When adding data the merkle tree changes as well as shown in the diagram

![the merkle tree changes with every new data](https://raw.githubusercontent.com/codenotary/immudb/master/img/immudb-adding-data-diagram.png)

### checking data consistency

The following diagram explains how data is inserted, verified and consistency checked.

![How immudb data consistency works](https://raw.githubusercontent.com/codenotary/immudb/master/img/immudb-consistency-diagram.png)



### immugw communication

immugw proxies REST client communication and gRPC server interface. For security purposes immugw should not run on the same server as immudb. The following diagram shows how the communication works:

![immugw communication explained](https://github.com/codenotary/immudb/blob/master/img/immugw-diagram.png)


## APIs and interfaces

### Golang
[Golang code snippets](immudb-golang.md)


### immudb RESTful API reference

You can find the swagger schema here:

https://github.com/codenotary/immudb/blob/master/pkg/api/schema/schema.swagger.json

If you want to run the Swagger UI, simply run the following docker command after you cloned this repo:

```
docker run -d -it -p 8080:8080 --name swagger-immudb -v ${PWD}/pkg/api/schema/schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```

### immudb gRPC API reference

coming soon

### immugw RESTful API reference

You can find the swagger schema here:

https://github.com/codenotary/immudb/blob/master/pkg/api/schema/gw.schema.swagger.json

If you want to run the Swagger UI, simply run the following docker command after you cloned this repo:

```
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/schema/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```


## License

immudb is [Apache v2.0 License](LICENSE).
