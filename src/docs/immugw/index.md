# immugw

work in progress

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

coming soon
