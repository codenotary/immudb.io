---
title: Overview
---

# immugw

immugw is the intelligent REST proxy that connects to immudb and provides a RESTful interface for applications. We recommend running immudb and immugw on separate machines to enhance security
immugw can be found in a different [repository](https://github.com/codenotary/immugw)

## Contents
 - [Latest binaries](#latest-binaries)
 - [Build](#build)
 - [Docker](#docker)
 - [Run immugw](#run-immugw)
 - [Configuration](#configuration)
 - [immuadmin](#immuadmin)
 - [immugw service](#immugw-service)
 - [Use immugw](#use-immugw)
 - [API](#api)
 - [Auditor](#auditor)
 - [License](#license)

## Latest binaries

[Get the latest builds](https://github.com/codenotary/immugw/releases/latest)

## Build

clone the immugw repository locally

'git clone https://github.com/codenotary/immugw.git'

### Linux

```bash
GOOS=linux GOARCH=amd64 make immugw-static
```

### MacOS

```bash
GOOS=darwin GOARCH=amd64 make immugw-static
```

### Windows

```bash
GOOS=windows GOARCH=amd64 make immugw-static
```

## Docker

### build your own Docker container image
```bash
docker build -t myown/immugw:latest -f Dockerfile .
```

### run immugw in a container
Make sure to point to the immudb system using the environment variable IMMUGW_IMMUDB_ADDRESS

```
docker run -it -d -p 3323:3323 --name immugw --env IMMUGW_IMMUDB_ADDRESS=immudb codenotary/immugw:latest
```

## Run immugw

Simply run ```./immugw -d``` to start immugw on the same machine as immudb (test or dev environment) or pointing to the remote immudb system ```./immugw --immudb-address "immudb-server"```.

If you want to stop immugw în that case you need to find the process `ps -ax | grep immugw` and then `kill -15 <pid>`. Windows PowerShell would be `Get-Process immugw* | Stop-Process`.

## Configuration

immugw can be configured using environment variables, flags or a config file.

* `immugw --help` shows you all available flags and environment variables.
* `/etc/immudb/immugw.toml` is used as a default configuration file

### Environment variables

The environment variables are the most popular way to configure Docker container:

```bash
  IMMUGW_ADDRESS=0.0.0.0
  IMMUGW_PORT=3323
  IMMUGW_IMMUDB_ADDRESS=127.0.0.1
  IMMUGW_IMMUDB_PORT=3322
  IMMUGW_DIR=.
  IMMUGW_PIDFILE=
  IMMUGW_LOGFILE=
  IMMUGW_DETACHED=false
  IMMUGW_MTLS=false
  IMMUGW_SERVERNAME=localhost
  IMMUGW_AUDIT=false
  IMMUGW_AUDIT_INTERVAL=5m
  IMMUGW_AUDIT_USERNAME=immugwauditor
  IMMUGW_AUDIT_PASSWORD=
  IMMUGW_PKEY=./tools/mtls/4_client/private/localhost.key.pem
  IMMUGW_CERTIFICATE=./tools/mtls/4_client/certs/localhost.cert.pem
  IMMUGW_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem
```


## immuadmin

immuadmin can be used to install and manage the immugw service for Windows and Linux. immuadmin is part of the immugw repository.
'git clone https://github.com/codenotary/immudb.git'

### Linux

```bash
GOOS=linux GOARCH=amd64 make immuadmin-static 
```

### Windows (by component)

```bash
GOOS=windows GOARCH=amd64 make immuadmin-static
```

## immugw service

```
# install immugw service
./immugw service install

# check current immugw service status
./immugw service status

# stop immugw service
./immugw service stop

# start immugw service
./immugw service start
```

The linux service is using the following defaults:

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| pid file                | /var/lib/immudb/immugw.pid |
| log files               | /var/log/immudb    |

## Use immugw

`immugw help` is a good starting point

```bash
immu gateway: a smart REST proxy for immudb - the lightweight, high-speed immutable database for systems and applications.
It exposes all gRPC methods with a REST interface while wrapping all SAFE endpoints with a verification service.

Environment variables:
  IMMUGW_ADDRESS=127.0.0.1
  IMMUGW_PORT=3323
  IMMUGW_IMMUDB_ADDRESS=127.0.0.1
  IMMUGW_IMMUDB_PORT=3322
  IMMUGW_DIR=.
  IMMUGW_PIDFILE=
  IMMUGW_LOGFILE=
  IMMUGW_DETACHED=false
  IMMUGW_MTLS=false
  IMMUGW_SERVERNAME=localhost
  IMMUGW_PKEY=./tools/mtls/4_client/private/localhost.key.pem
  IMMUGW_CERTIFICATE=./tools/mtls/4_client/certs/localhost.cert.pem
  IMMUGW_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem
  IMMUGW_AUDIT="false"
  IMMUGW_AUDIT_INTERVAL = "5m"
  IMMUGW_AUDIT_USERNAME=""
  IMMUGW_AUDIT_PASSWORD=""

Usage:
  immugw [flags]
  immugw [command]

Available Commands:
  help        Help about any command
  version     Show the immugw version

Flags:
  -a, --address string            immugw host address (default "127.0.0.1")
      --audit                     enable audit mode (continuously fetches latest root from server, checks consistency against a local root and saves the latest root locally)
      --audit-interval duration   interval at which audit should run (default 5m0s)
      --audit-password string     immudb password used to login during audit
      --audit-username string     immudb username used to login during audit (default "immugwauditor")
      --certificate string        server certificate file path (default "./tools/mtls/4_client/certs/localhost.cert.pem")
      --clientcas string          clients certificates list. Aka certificate authority (default "./tools/mtls/2_intermediate/certs/ca-chain.cert.pem")
      --config string             config file (default path are configs or $HOME. Default filename is immugw.toml)
  -d, --detached                  run immudb in background
      --dir string                program files folder (default ".")
  -h, --help                      help for immugw
  -k, --immudb-address string     immudb host address (default "127.0.0.1")
  -j, --immudb-port int           immudb port number (default 3322)
      --logfile string            log path with filename. E.g. /tmp/immugw/immugw.log
  -m, --mtls                      enable mutual tls
      --pidfile string            pid path with filename. E.g. /var/run/immugw.pid
      --pkey string               server private key path (default "./tools/mtls/4_client/private/localhost.key.pem")
  -p, --port int                  immugw port number (default 3323)
      --servername string         used to verify the hostname on the returned certificates (default "localhost")

Use "immugw [command] --help" for more information about a command.
```

## API

### immugw RESTful API reference

You can find the swagger schema here:

[swagger immugw](https://github.com/codenotary/immugw/blob/master/pkg/api/gw.schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```
### Curl examples

[Curl code snippets](curl.md)

## Auditor

Auditors make sure that the data consistency is guaranteed inside immudb. They do a random key value verification and an interval-based Merkle-tree consistency check (5 minutes default). The immugw and the immuclient provide auditor functionality that runs as a daemon process. It is recommended to run immugw and immuclient on different machines than immudb, so any tampering on the immudb server is automatically detected.

The results of the auditors are provided by a Prometheus end point.

### immugw auditor

Start interactive:
`immugw --audit`

Service configuration:
To enable auditor, you need to edit /etc/immudb/immugw.toml and add the following section:

```bash
audit = true # false is default
audit-interval = "5m" # suffixes: "s", "m", "h", examples: 10s, 5m 1h
audit-username = "" # when immudb authentication is enabled, use read-only user credentials here
audit-password = "" # and the password
```
Restart the immugw service afterwards - `immuadmin service immugw restart`

**immugw Port: 9476 - http://immugw-auditor:9476/metrics**

example output: 

```bash
# HELP immugw_audit_curr_root_per_server Current root index used for the latest audit.
# TYPE immugw_audit_curr_root_per_server gauge
immugw_audit_curr_root_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} 2
# HELP immugw_audit_prev_root_per_server Previous root index used for the latest audit.
# TYPE immugw_audit_prev_root_per_server gauge
immugw_audit_prev_root_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} 2
# HELP immugw_audit_result_per_server Latest audit result (1 = ok, 0 = tampered).
# TYPE immugw_audit_result_per_server gauge
immugw_audit_result_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} 1
# HELP immugw_audit_run_at_per_server Timestamp in unix seconds at which latest audit run.
# TYPE immugw_audit_run_at_per_server gauge
immugw_audit_run_at_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} 1.590757033502689e+09
```

## License

immugw is [Apache v2.0 License](https://github.com/codenotary/immugw/blob/master/LICENSE).
