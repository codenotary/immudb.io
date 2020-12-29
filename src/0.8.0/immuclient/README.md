---
title: Overview
---

# immuclient

work in progress

## Contents
 - [Latest binaries](#latest-binaries)
 - [Build](#build)
 - [Docker](#docker)
 - [Use immuclient](#use-immuclient)
 - [Examples](#examples)
 - [Auditor](#auditor)
 - [License](#license)

## Latest binaries

[Get the latest builds](https://github.com/codenotary/immudb/releases/latest)

## Build

clone the immudb repository locally

`git clone https://github.com/codenotary/immudb.git`

### Linux

```bash
GOOS=linux GOARCH=amd64 make immuclient-static
```

### MacOS

```bash
GOOS=darwin GOARCH=amd64 make immuclient-static
```

### Windows

```bash
GOOS=windows GOARCH=amd64 make immuclient-static
```

## Docker

### build your own Docker container image
```bash
docker build -t myown/immuclient:latest -f Dockerfile.immuclient .
```

### run immuclient in a container
As immuclient has a direct command and interactive, you can simply add the immuclient command after docker run.

```bash
docker run -it --rm -name immuclient codenotary/immuclient:latest -a <immudb host>
```

You can now use the interactive mode of immuclient and type commands until you type exit. Use help to get a command reference.

## Use immuclient

`immuclient help` is a good starting point

```bash
CLI client for immudb - the lightweight, high-speed immutable database for systems and applications.
Environment variables:
  IMMUCLIENT_IMMUDB_ADDRESS=127.0.0.1
  IMMUCLIENT_IMMUDB_PORT=3322
  IMMUCLIENT_AUTH=false
  IMMUCLIENT_MTLS=false
  IMMUCLIENT_SERVERNAME=localhost
  IMMUCLIENT_PKEY=./tools/mtls/4_client/private/localhost.key.pem
  IMMUCLIENT_CERTIFICATE=./tools/mtls/4_client/certs/localhost.cert.pem
  IMMUCLIENT_CLIENTCAS=./tools/mtls/2_intermediate/certs/ca-chain.cert.pem

Usage:
  immuclient [command]

Available Commands:
  audit-mode        Starts immuclient as daemon in auditor mode. Run 'immuclient audit-mode help' for details
  check-consistency Check consistency for the specified index and hash
  count             Count keys having the specified prefix
  current           Return the last merkle tree root and index stored locally
  get               Get item having the specified key
  getByIndex        Return an element by index
  getRawBySafeIndex Return an element by index
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
      --audit-password string    immudb password used to login during audit
      --audit-username string    immudb username used to login during audit
      --certificate string       server certificate file path (default "./tools/mtls/4_client/certs/localhost.cert.pem")
      --clientcas string         clients certificates list. Aka certificate authority (default "./tools/mtls/2_intermediate/certs/ca-chain.cert.pem")
      --config string            config file (default path are configs or $HOME. Default filename is immuclient.toml)
      --dir string               Main directory for audit process tool to initialize (default "/tmp")
  -h, --help                     help for immuclient
  -a, --immudb-address string    immudb host address (default "127.0.0.1")
  -p, --immudb-port int          immudb port number (default 3322)
  -m, --mtls                     enable mutual tls
      --pkey string              server private key path (default "./tools/mtls/4_client/private/localhost.key.pem")
      --prometheus-host string   Launch host of the Prometheus server. (default "127.0.0.1")
      --prometheus-port string   Launch port of the Prometheus server. (default "9477")
      --roots-filepath string    Filepath for storing root hashes after every successful audit loop. Default is tempdir of every OS. (default "/tmp/")
      --servername string        used to verify the hostname on the returned certificates (default "localhost")
      --tokenfile string         authentication token file (default path is $HOME or binary location; default filename is token) (default "token")
      --value-only               returning only values for get operations

Use "immuclient [command] --help" for more information about a command.
```

## Examples

## Auditor

Start interactive:
`immuclient audit-mode`

Install service:
`immuclient audit-mode install`

When installing audit-mode as a service, all parameters are written into the `immuclient` configuration file:
* Linux: `/etc/immudb/immuclient.toml`
* Windows: `C:\ProgramData\ImmuClient\config\immuclient.toml`

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

## License

immuclient is [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).
