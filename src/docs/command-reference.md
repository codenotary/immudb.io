# Command reference

## immudb

Simply run ```./immudb -d``` to start immudb locally in the background.

If you want to stop immudb în that case you need to find the process `ps -ax | grep immudb` and then `kill -15 <pid>`. Windows PowerShell would be `Get-Process immudb* | Stop-Process`.

immudb is launched by default with a security routine called [consistency checker](immudb/consistency-checker.md) . This solution provides a continuous corruption check on data stored on server storage. 

```bash
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
  IMMUDB_CONSISTENCY_CHECK=true
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

## immugw

Simply run `./immugw -d` to start immugw on the same machine as immudb (test or dev environment) or point to the remote immudb system `./immugw --immudbaddress "immudb-server"`.

If you want to stop immugw în that case you need to find the process `ps -ax | grep immugw` and then `kill -15 <pid>`. Windows PowerShell would be `Get-Process immugw* | Stop-Process`.

```bash
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

## immuadmin

For security reasons we recommend using immuadmin only on the same system as immudb. User management is restricted to localhost usage. Simply run ```./immuadmin``` on the same machine.

```bash
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

## immuclient

Simply run `./immuclient` on the same machine or connect to a remote immudb `./immuclient -a <immudb-host>`

```bash
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
