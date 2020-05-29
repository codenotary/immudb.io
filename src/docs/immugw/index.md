# immugw

immugw is the intelligent REST proxy that connects to immudb and provides a RESTful interface for applications. We recommend to run immudb and immugw on separate machines to enhance security

## Contents
 - [Latest binaries](#latest-binaries)
 - [Build](#build)
 - [Docker](#docker)
 - [Run immugw](#run-immugw)
 - [Configuration](#configuration)
 - [immuadmin](#immuadmin)
 - [immugw service](#immugw-service)
 - [API](#api)
 - [Authentication](#authentication)
 - [Auditor](#auditor)

## Latest binaries

[Get the latest builds](https://github.com/codenotary/immudb/releases/latest)

## Build

clone the immudb repository locally

'git clone https://github.com/codenotary/immudb.git'

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
docker build -t myown/immugw:latest -f Dockerfile.immugw .
```

### run immugw in a container
Make sure to point to the immudb system using the environment variable IMMUGW_IMMUDB-ADDRESS

```
docker run -it -d -p 3323:3323 --name immugw --env IMMUGW_IMMUDB-ADDRESS=immudb codenotary/immugw:latest
```

## Run immugw

Simply run ```./immugw -d``` to start immugw on the same machine as immudb (test or dev environment) or pointing to the remote immudb system ```./immugw --immudb-address "immudb-server"```.

If you want to stop immugw în that case you need to find the process `ps -ax | grep immugw` and then `kill -15 <pid>`. Windows PowerShell would be `Get-Process immugw* | Stop-Process`.

## Configuration

## immuadmin

immuadmin can be used to install and manage the immugw service for Windows and Linux

### Linux

```bash
GOOS=linux GOARCH=amd64 make immuadmin-static 
```

### Windows (by component)

```bash
GOOS=windows GOARCH=amd64 make immuadmin-static
```

## immugw service

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
| pid file                | /var/lib/immudb/immugw.pid |
| log files               | /var/log/immudb    |

## API

## immugw RESTful API reference

You can find the swagger schema here:

[swagger immudb](https://github.com/codenotary/immudb/blob/master/pkg/api/schema/gw.schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/schema/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```
## Curl examples

[Curl code snippets](curl.md)

## Auditor

Auditors make sure that the data consistency is guaranteed inside immudb. They do a random key value verification and a interval-based Merkle-tree consistency check (5 minutes default). The immugw and the immuclient provide auditor functionality that runs as a daemon process. It is recommended to run immugw and immuclient on different machines than immudb, so any tampering on the immudb server is automatically detected.

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
