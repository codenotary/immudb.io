# immuclient

work in progress

## Contents
 - [Latest binaries](#latest-binaries)
 - [Build](#build)
 - [Docker](#docker)
 - [Use immuclient](#run-immugw)
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
 
## Examples

## Auditor

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

## License

immuclient is [Apache v2.0 License](LICENSE).
