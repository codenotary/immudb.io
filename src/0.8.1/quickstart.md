# Quickstart

<WrappedSection>
## Getting immudb running

To get started extremely quick using Docker:

```bash
docker network create immudbnet
docker run -d --net immudbnet -it --rm --name immudb -p 3322:3322 codenotary/immudb:latest
docker run -it --rm --net immudbnet --name immuclient codenotary/immuclient:latest -a immudb
```

</WrappedSection>

<WrappedSection>

## Download the binaries

### General

[Get the latest builds](https://github.com/codenotary/immudb/releases/latest)

### macOS specific

The community already added immudb to [HomeBrew](https://formulae.brew.sh/formula/immudb), therefore you can simply run
```bash
brew install immudb
```

In case you want to run immudb as a service, please check the following [guideline](https://medium.com/swlh/how-to-use-launchd-to-run-services-in-macos-b972ed1e352).

</WrappedSection>

<WrappedSection>

## Build the binaries

To build the binaries yourself, simply clone this repo and run

```bash
make all
```


### Linux (by component)

```bash
GOOS=linux GOARCH=amd64 make immuclient-static immuadmin-static immudb-static
```

### MacOS (by component)

```bash
GOOS=darwin GOARCH=amd64 make immuclient-static immuadmin-static immudb-static
```

### Windows (by component)

```bash
GOOS=windows GOARCH=amd64 make immuclient-static immuadmin-static immudb-static
```

</WrappedSection>

<WrappedSection>

## First start

### Run immudb binary

```bash
# run immudb in the foreground
./immudb

# run immudb in the background
./immudb -d
```

### Run immudb as a service

```bash
# install immudb service
./immudb service install

# check current immudb service status
./immudb service status

# stop immudb service
./immudb service stop

# start immudb service
./immudb service start
```

<br/>

The linux service is using the following defaults:

<br/>

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| all data files          | /var/lib/immudb    |
| pid file                | /var/run/immudb.pid |
| log files               | /var/log/immudb    |



### Run immugw as a service

immugw can be found in a different [repository](https://github.com/codenotary/immugw). You can find a build guideline in the Readme of the repository.

Please make sure to build or download the immugw and immuadmin component and save them in the same work directory when installing the service.

```bash
# install immugw service
./immugw service install

# check current immugw service status
./immugw service status

# stop immugw service
./immugw service stop

# start immugw service
./immugw service start
```

<br/>

The linux service is using the following defaults:

<br/>

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| pid file                | /var/run/immugw.pid |
| log files               | /var/log/immudb    |

</WrappedSection>

<WrappedSection>

## Docker
If you just want to run immudb and connect using `immuclient`:

```bash
docker network create immudbnet
docker run -d --net immudbnet -it --rm --name immudb -p 3322:3322 codenotary/immudb:latest
docker run -it --rm --net immudbnet --name immuclient codenotary/immuclient:latest -a immudb
```

<br/>

All services and CLI components are also available as Docker images on [dockerhub](https://hub.docker.com/).

<br/>

| Component | Container image                               |
| --------- | --------------------------------------------- |
| immudb    | [https://hub.docker.com/r/codenotary/immudb](https://hub.docker.com/r/codenotary/immudb) |
| immugw    | [https://hub.docker.com/r/codenotary/immugw](https://hub.docker.com/r/codenotary/immugw) |
| immuadmin | [https://hub.docker.com/r/codenotary/immuadmin](https://hub.docker.com/r/codenotary/immuadmin) |
| immuclient | [https://hub.docker.com/r/codenotary/immuclient](https://hub.docker.com/r/codenotary/immuclient) |

### Run immudb

```bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immudb:latest
```

run it with persistent data and listening to all interfaces:
```bash
docker run -it -d -p 3322:3322 -p 9497:9497 -v immudb:/var/lib/immudb --env IMMUDB_ADDRESS=0.0.0.0 --name immudb codenotary/immudb:latest
```

### Run immugw

```bash
docker run -it -d -p 3323:3323 --name immugw --env IMMUGW_IMMUDB_ADDRESS=immudb codenotary/immugw:latest
```

### Run immuadmin

You can either find immuadmin in the immudb container (/usr/local/bin/immuadmin) or run the Docker container to connect to the local immudb.

```bash
docker run -it --rm --name immuadmin codenotary/immuadmin:latest status
```

### Run immuclient

You can either find immuclient in the immudb container (/usr/local/bin/immuclient) or run the Docker container to connect to the local or remote immudb.

```bash
docker run -it --rm --name immuclient codenotary/immuclient:latest -a <immudb-host>
```

### Build the container images yourself

If you want to build the container images yourself, simply clone this repo and run:

```bash
docker build -t myown/immudb:latest -f Dockerfile .
docker build -t myown/immuadmin:latest -f Dockerfile.immuadmin .
docker build -t myown/immuclient:latest -f Dockerfile.immuclient .
```

</WrappedSection>
