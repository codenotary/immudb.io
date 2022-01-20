---
title: Running an Auditor with immuclient
---

# Use immuclient as Auditor

The Auditor is a component for checking if immudb was tampered, it's a good practice to run the auditor as a separate and independent component. immuclient can act as Auditor by running the following command:

Start interactive:

```bash
immuclient audit-mode
```

immuclient is now running on the following address:
**immuclient Port: 9477 - <http://immuclient-auditor:9477/metrics>**

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

immuclient looks for immudb at 127.0.0.1:3322 by default with the default username and password. Nevertheless a number of parameters can be defined:

```
immuclient audit-mode            -  Run a foreground auditor
immuclient audit-mode install    -  Install and runs daemon
immuclient audit-mode stop       -  Stops the daemon
immuclient audit-mode start      -  Starts initialized daemon
immuclient audit-mode restart    -  Restarts daemon
immuclient audit-mode uninstall  -  Removes daemon and its setup


Flags:
  -h, --help   help for audit-mode

Global Flags:
      --audit-databases string               Optional comma-separated list of databases (names) to be audited. Can be full name(s) or just name prefix(es).
      --audit-monitoring-host string         Host for the monitoring HTTP server when running in audit mode (serves endpoints like metrics, health and version). (default "0.0.0.0")
      --audit-monitoring-port int            Port for the monitoring HTTP server when running in audit mode (serves endpoints like metrics, health and version). (default 9477)
      --audit-notification-password string   Password used to authenticate when publishing audit result to 'audit-notification-url'.
      --audit-notification-url string        If set, auditor will send a POST request at this URL with audit result details.
      --audit-notification-username string   Username used to authenticate when publishing audit result to 'audit-notification-url'.
      --audit-password string                immudb password used to login during audit; can be plain-text or base64 encoded (must be prefixed with 'enc:' if it is encoded)
      --audit-username string                immudb username used to login during audit
      --certificate string                   server certificate file path (default "./tools/mtls/4_client/certs/localhost.cert.pem")
      --clientcas string                     clients certificates list. Aka certificate authority (default "./tools/mtls/2_intermediate/certs/ca-chain.cert.pem")
      --config string                        config file (default path are configs or $HOME. Default filename is immuclient.toml)
      --database string                      immudb database to be used
      --dir string                           Main directory for audit process tool to initialize (default "/var/folders/0z/wk6v4sjd31qbvt7l75t_z_v00000gn/T/")
  -a, --immudb-address string                immudb host address (default "127.0.0.1")
  -p, --immudb-port int                      immudb port number (default 3322)
      --max-recv-msg-size int                max message size in bytes the client can receive (default 4194304)
  -m, --mtls                                 enable mutual tls
      --password string                      immudb password used to login; can be plain-text or base64 encoded (must be prefixed with 'enc:' if it is encoded)
      --pkey string                          server private key path (default "./tools/mtls/4_client/private/localhost.key.pem")
      --roots-filepath string                Filepath for storing root hashes after every successful audit loop. Default is tempdir of every OS. (default "/tmp/")
      --server-signing-pub-key string        Path to the public key to verify signatures when presents
      --servername string                    used to verify the hostname on the returned certificates (default "localhost")
      --tokenfile string                     authentication token file (default path is $HOME or binary location; default filename is )
      --username string                      immudb username used to login
      --value-only                           returning only values for get operations
```

## Running immuclient Auditor as a service

immuclient as Auditor can be installed in the system with the following command:

Install service:

```bash
immuclient audit-mode install
```

In this case, all parameters are written into the `immuclient` configuration file:

* Linux: `/etc/immudb/immuclient.toml`
* Windows: `C:\ProgramData\ImmuClient\config\immuclient.toml`

## Running immuclient Auditor with docker

We also provide a docker image starting immuclient as Auditor:

```bash
docker pull codenotary/auditor
```

Then it's possible to run the command with:

```bash
docker run -it -e IMMUCLIENT_IMMUDB_ADDRESS="ip" -e IMMUCLIENT_AUDIT_USERNAME="immudb" -e IMMUCLIENT_AUDIT_PASSWORD="immudb" codenotary/auditor
```

## Auditor best practices

### How can I be notified if my immudb instance was tampered?

It's possible to provide an external url that will be triggered in case a tamper is detected.
By configuring `IMMUCLIENT_AUDIT_NOTIFICATION_URL`, a POST request will be sent with the following body:

```
{
  "current_state": {
    "hash": "string",
    "signature": {
      "public_key": "string",
      "signature": "string"
    },
    "tx": 0
  },
  "db": "string",
  "password": "string",
  "previous_state": {
    "hash": "string",
    "signature": {
      "public_key": "string",
      "signature": "string"
    },
    "tx": 0
  },
  "run_at": "2020-11-13T00:53:42+01:00",
  "tampered": true,
  "username": "string"
}
```

NOTE: it's not possible to know at which transaction the database was tampered. The Auditor checks every second if the data was tampered - so it's only possible to know at which time frame the tampering was detected.

### How many Auditors should I run to secure my immudb instance?

A proper setup of one immuclient instance can fit most of cases, but there are ways to increase the security on detecting tampering. A single instance can go offline for any reason: network problems, hardware failures or attacks. Therefore a good practice can be to have multiple Auditor instances running in different zones.

## License

immuclient is [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).
