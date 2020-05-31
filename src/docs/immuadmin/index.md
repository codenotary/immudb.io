# immuadmin

immuadmin is the admin CLI for immudb and immugw. You can install and manage the service installation for both components and get statistics as well as runtime information.

## Contents
 - [Latest binaries](#latest-binaries)
 - [Build](#build)
 - [Docker](#docker)
 - [Use immuadmin](#use-immuadmin)
 - [License](#license)

## Latest binaries

[Get the latest builds](https://github.com/codenotary/immudb/releases/latest)

## Build

clone the immudb repository locally

`git clone https://github.com/codenotary/immudb.git`

### Linux

```bash
GOOS=linux GOARCH=amd64 make immuadmin-static
```

### MacOS

```bash
GOOS=darwin GOARCH=amd64 make immuadmin-static
```

### Windows

```bash
GOOS=windows GOARCH=amd64 make immuadmin-static
```

## Docker

### build your own Docker container image
```bash
docker build -t myown/immuadmin:latest -f Dockerfile.immuadmin .
```

### run immuadmin in a container
Best is to have immuadmin running on the same machine as immudb, so it can access localhost. As immuadmin is interactive, you can simply add the immuadmin command after docker run.

```bash
docker run -it --rm ---network host -name immuadmin codenotary/immugw:latest help
```

## Use immuadmin

`immuadmin help` is a good starting point

```bash
CLI admin client for immudb - the lightweight, high-speed immutable database for systems and applications.

Environment variables:
  IMMUADMIN_IMMUDB_ADDRESS=127.0.0.1
  IMMUADMIN_IMMUDB_PORT=3322
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
  user        Perform various user-related operations: list, create, deactivate, change password, set permissions
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

You can also use the help functionality for specific commands, i. e. `immuadmin user help`

## License

immuadmin is [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).
