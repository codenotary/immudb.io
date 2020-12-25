---
title: Overview
---

# immudb

## Contents 0.8.0

 - [Latest binaries](#latest-binaries)
 - [Build](#build)
 - [Docker](#docker)
 - [Run immudb](#run-immudb)
 - [Configuration](#configuration)
 - [immuadmin](#immuadmin)
 - [immudb service](#immudb-service)
 - [Authentication](#authentication)
 - [Backup and Restore](#backup-and-restore)
 - [Multi-Database](#multi-database)
 - [Clients](#clients)
 - [Auditors](#auditors)
 - [Architecture](#architecture)
 - [Consistency Checker](#consistency-checker)
 - [License](#license)

## Latest binaries

[Get the latest builds](https://github.com/codenotary/immudb/releases/latest)

If you run macOS you can also use Homebrew:

`brew install immudb`

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
Make sure to point to the immudb system using the environment variable IMMUGW_IMMUDB_ADDRESS

```bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immugw:latest
```

or listen on all interfaces

```bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb -e IMMUDB_ADDRESS="0.0.0.0" codenotary/immudb
```

listen on all interfaces, persistent data

```bash
docker volume create immudb-data
docker run -it -d -p 3322:3322 -p 9497:9497 -v immudb-data:/var/lib/immudb --name immudb -e IMMUDB_ADDRESS="0.0.0.0" codenotary/immudb
```




## Run immudb

```bash
# run immudb in the foreground
./immudb

# run immudb in the background
./immudb -d
```

## Configuration

immudb can be configured using environment variables, flags or a config file.

* `immudb --help` shows you all available flags and environment variables.
* `/etc/immudb/immudb.toml` is used as a default configuration file

### Environment variables

The environment variables are the most popular way to configure Docker container:

```bash
  IMMUDB_DIR=.
  IMMUDB_NETWORK=tcp
  IMMUDB_ADDRESS=0.0.0.0
  IMMUDB_PORT=3322
  IMMUDB_DBNAME=immudb
  IMMUDB_PIDFILE=
  IMMUDB_LOGFILE=
  IMMUDB_MTLS=false
  IMMUDB_AUTH=true
  IMMUDB_DETACHED=false
  IMMUDB_CONSISTENCY_CHECK=true
  IMMUDB_PKEY=./tools/mtls/3_application/private/localhost.key.pem
  IMMUDB_CERTIFICATE=./tools/mtls/3_application/certs/localhost.cert.pem
  IMMUDB_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem
  IMMUDB_DEVMODE=true
  IMMUDB_MAINTENANCE=false
  IMMUDB_ADMIN_PASSWORD=immudb

```

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

The linux service is using the following defaults:

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| all data files          | /var/lib/immudb    |
| pid file                | /var/lib/immudb/immudb.pid |
| log files               | /var/log/immudb    |

## Authentication

immudb supports multiple user accounts that can have admin, read-only or read-write permission.
All permissions are stored in a different database and each gRPC call has an associated minimum permissions.

To enable authentication you need to change the configuration file `/etc/immudb/immudb.toml`

Example:
```toml
dir = "/var/lib/immudb"
network = "tcp"
address = "0.0.0.0"
port = 3322
dbname = "data"
pidfile = "/var/lib/immudb/immudb.pid"
logfile = "/var/log/immudb/immudb.log"
mtls = false
detached = false
auth = true
pkey = "/etc/immudb/mtls/3_application/private/localhost.key.pem"
certificate = "/etc/immudb/mtls/3_application/certs/localhost.cert.pem"
clientcas = "/etc/immudb/mtls/2_intermediate/certs/ca-chain.cert.pem"
```

The important lines to change are `auth = true` and `address = "0.0.0.0"` to enable authentication and listening on all interfaces.

Then restart/start immudb.

### Get the admin credentials

You need to run `immuadmin` locally on the same system as immudb (for security reasons) and connect to immudb:

`immuadmin login immudb`

You^ll receive the following message:

```bash
Using config file: /etc/immudb/immudb.toml
===============
This looks like the very first admin login attempt, hence the following credentials have been generated:
---
username: immudb
password: immudb
---
IMPORTANT: This is the only time they are shown, so make sure you remember them.
NOTE: You have not been automatically logged in. To login please run the command 'immuadmin login immu' with the above-mentioned password. You can change your password at any time with one of your liking using the command 'immuadmin user change-password immu'
===============
```

**Please note that the password for the immudb user is the master password**

### User management

To manage user, run `immuadmin user` after you logged in `immuadmin login immudb`

```bash
Please specify a user action.
Usage: immuadmin user list|create|change-password|set-permission|deactivate [username] [read|readwrite]
Help : immuadmin user -h
```

#### List user

To get a list of all existing user including their permissions, run `immuadmin user list`

#### Add user

Let's create a read-only user, called ro `immuadmin user create <username> read`

```bash
immuadmin user create ro read
NOTE: password must have between 8 and 32 letters, digits and special characters of which at least 1 uppercase letter, 1 digit and 1 special character.
Choose a password for ro:
Confirm password:
User ro created
```

and a read-write user, called rw `immuadmin user create rw readwrite`

#### Change user permission

To change the ro user permission from read-only to read-write, run `immuadmin user set-permission ro readwrite`
Check the change, using `immuadmin user list`

```bash
immuadmin user list
Using config file: /etc/immudb/immudb.toml
3 user(s):
-  --------  ----    -----------
#  Username  Role    Permissions
-  --------  ----    -----------
1  immu      admin   admin
2  ro        client  readwrite
3  rw        client  readwrite
-  --------  ----    -----------
```

#### Deactivate user

To deactivate an existing user, run `immuadmin user deactivate ro`

#### Reactivate user

To reactivate a deactivated user account, you can simply set user permission again. Run `immuadmin user set-permission ro readwrite`

## Backup and Restore

The simplest way to backup immudb is to use your operating system tools like tar or zip.
You can stop immudb and backup the data directory (default: `/var/lib/immudb`) and start immudb again.

The other alternative is using the `immuadmin backup` command. Please keep in mind, that `immuadmin backup` is stopping immudb as well and a manual start is required.

## Multi-Database

Starting immudb version 0.7.0 we introduced a multi-database support. By default the first database is either called defaultdb or based on the environment variable `IMMUDB_DBNAME`.

### Database management
We recommend using `immuadmin` to create additional users and databases.

```
immuadmin login immudb  # Authentication is enabled by default, default user is immudb and password immudb;
                        # first login asks for a password change and must contain upper and lower case letters, digits, punctuation mark or symbol

immuadmin database list          # show all existing databases
immuadmin database create testdb # database testdb created
```

immuclient can be used to test the setup or in scripts. Of course the API supports multi-db handling as well.

```
immuclient login immudb   # login to immudb with user immudb
immuclient use testdb     # use testdb for all following commands
immuclient safeset k0 v0  # set a key value in testdb
```

### Database user management

You can create additional user using the immuadmin and grant database permissions automatically.

`immuadmin user help` shows you all information about the command usage.

Permissions are: *read*, *readwrite* and *admin*

```
# create an user for the newly created database
immuadmin user create myuser readwrite testdb       # create user myuser (password will be requested) and grant readwrite permissions to testdb

immuadmin user permission grant myuser admin testdb # change permissions to admin for user myuser on testdb
immuadmin user permission grant myuser readwrite testdb # change permissions to readwrite for user myuser on testdb
immuadmin user permission revoke myuser readwrite testdb # revoke permissions for user myuser on testdb
```

To check all database permissions use `immuadmin user list`

### API examples

work in progress

## Clients

Starting version 0.6.0 of immudb, you can use immugw (REST API), immuclient (interactive) or GoLang as immudb database clients.
Depending on the user settings and permissions, you can have read-only and read-write clients.

[APIs and interfaces](../apis-references.md) - API reference and code examples

More driver libraries are coming soon (Java, Node.js, Python, .net aso.)

## Auditors

Auditors make sure that the data consistency is guaranteed inside immudb. They do a random key value verification and an interval-based Merkle-tree consistency check (5 minutes default). The immugw and the immuclient provide auditor functionality that runs as a daemon process. It is recommended to run immugw and immuclient on different machines than immudb, so any tampering on the immudb server is automatically detected.

The results of the auditors are provided by a Prometheus end point.

### immugw auditor

You can find immugw in the following repository: [immugw](https://github.com/codenotary/immugw)

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

### immuclient auditor

Start interactive:
`immuclient audit-mode`

Install service:
`immuclient audit-mode install`

**immuclient Port: 9477 - http://immuclient-auditor:9477/metrics **

example output:

```bash
# HELP immuclient_audit_curr_root_per_server Current root index used for the latest audit.
# TYPE immuclient_audit_curr_root_per_server gauge
immuclient_audit_curr_root_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} 2
# HELP immuclient_audit_prev_root_per_server Previous root index used for the latest audit.
# TYPE immuclient_audit_prev_root_per_server gauge
immuclient_audit_prev_root_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} -1
# HELP immuclient_audit_result_per_server Latest audit result (1 = ok, 0 = tampered).
# TYPE immuclient_audit_result_per_server gauge
immuclient_audit_result_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} -1
# HELP immuclient_audit_run_at_per_server Timestamp in unix seconds at which latest audit run.
# TYPE immuclient_audit_run_at_per_server gauge
immuclient_audit_run_at_per_server{server_address="127.0.0.1:3322",server_id="br8eugq036tfln0ct6o0"} 1.5907565337454605e+09
```


## Architecture

The different components of immudb are communicating as follows:
![immudb component overview](https://github.com/codenotary/immudb-docs/raw/master/src/immudb/component-diagram.png)

Please check How it works, to learn more about the data structure and the Merkle-tree:

[How it works](../how-it-works.md)

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
Then restart immudb and you should see the consistency check printing an error.

## License

immudb is [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).
