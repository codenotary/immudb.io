# immudb

## Contents
 - [Build](#build)
 - [Docker](#docker)
 - [Run immudb](#run-immudb)
 - [Configuration](#configuration)
 - [immuadmin](#immuadmin)
 - [immudb service](#immudb-service)
 - [Authentication](#authentication)
 - [Backup and Restore](#backup-and-restore)
 - [Clients](#clients)
 - [Auditors](#auditors)
 - [Architecture](#architecture)
 - [Consistency Checker](#consistency-checker)

## Build

clone the immudb repository locally

'git clone https://github.com/codenotary/immudb.git'

### Linux

```bash
GOOS=linux GOARCH=amd64 make immudb-static
```

### MacOS

```bash
GOOS=darwin GOARCH=amd64 make immudb-static
```

### Windows

```bash
GOOS=windows GOARCH=amd64 make immudb-static
```

## Docker

### build your own Docker container image
```bash
docker build -t myown/immudb:latest -f Dockerfile .
```

### run immugw in a container
Make sure to point to the immudb system using the environment variable IMMUGW_IMMUDB-ADDRESS

```bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immugw:latest
```

or listen on all interfaces

```bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb -e IMMUDB_ADDRESS="0.0.0.0" codenotary/immudb
```

## Run immudb

```bash
# run immudb in the foreground
./immudb

# run immudb in the background
./immudb -d
```

## Configuration

work in progress

## immuadmin

immuadmin can be used to install and manage the immudb service for Windows and Linux

### Linux

```bash
GOOS=linux GOARCH=amd64 make immuadmin-static 
```

### Windows (by component)

```bash
GOOS=windows GOARCH=amd64 make immuadmin-static
```

## immudb service

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
| pid file                | /var/lib/immudb/immudb.pid |
| log files               | /var/log/immudb    |

## Authentication

work in progress

## Backup and Restore

work in progress

## Clients

work in progress

## Auditors

work in progress

## Architecture

work in progress

## Consistency checker

### How do you run it?
It is part of immudb, enabled by default and runs as a thread of immudb.
The routine can be disabled as follows:
```bash
./immudb --consistency-check=false
``` 

### What does it check?
Consistency checker runs in a loop and continuously checks if the elements stored inside the immudb Merkle-tree are also physically stored correctly on the disk (the digest of the disk elements is the same digest stored in the related Merkle-tree leaf)

### How does it run its check?

**Steps:**
1. reading the last root and last index stored in immudb
2. generate a range between 0 and the length of the Merkle-tree level 0 (total number of elements stored)
3. shuffles the range to get a random scan list (to be unpredictable)
4. check if every element is correctly inserted in the Merkle-tree and if the Merkle-tree leaves correctly represent the elements stored on hard disk
5. after completing the loop, the process sleeps ten seconds and restarts from scratch with a new root and index
6. in case an element does not pass the check correctly, immudb is immediately stopped and prints out a log message

In order to produce a corrupted entry that is only on disk and not in the Merkle-tree, stop the immudb process and use the [nimmu](https://github.com/codenotary/immudb/blob/master/tools/nimmu/nimmu.go) command:
```bash
go build tools/nimmu/nimmu.go 
./nimmu rawset key1 tamper
```
Then restart immudb and should see the consistency check printing an error.

