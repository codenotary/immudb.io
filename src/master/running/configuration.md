
# Configuration

<WrappedSection>

This page describes how to set different settings in immudb.

Settings can be specified as command line options to immudb (see `immudb -h`), in a configuration file, or as environment variables.

</WrappedSection>

<WrappedSection>

### Settings

| Parameter                       | Default    | Description                                                                                          |
|---------------------------------|------------|------------------------------------------------------------------------------------------------------|
| `address`                       | `0.0.0.0`  | bind address                                                                                         |
| `admin-password`                | `immudb`   | admin password as plain-text or base64 encoded (must be prefixed with 'enc:' if it is encoded)       |
| `auth`                          | `true`     | enable auth                                                                                          |
| `certificate`                   | ``         | server certificate file path                                                                         |
| `clientcas`                     | ``         | clients certificates list. Aka certificate authority                                                 |
| `config`                        | ``         | config file (default path are configs or $HOME. Default filename is immudb.                          |
| `detached`                      | `false`    | run immudb in background                                                                             |
| `devmode`                       | `false`    | enable dev mode: accept remote connections without auth                                              |
| `dir`                           | `./data`   | data folder                                                                                          |
| `logfile`                       | ``         | log path with filename. E.g. /tmp/immudb/immudb.log                                                  |
| `logformat`                     | `text`     | log format e.g. text/json                                                                            |
| `maintenance`                   | `false`    | override the authentication flag                                                                     |
| `max-recv-msg-size`             | `33554432` | max message size in bytes the server can receive                                                     |
| `max-session-age-time`          | infinity   | max session age time is a duration after which session will be forcibly closed                       |
| `max-session-inactivity-time`   | `3m0s` | max session inactivity time is a duration after which an active session is declared inactive by the server. A session is kept active if server is still receiving requests from client (keep-alive or other methods) |
| `max-sessions`                  | `100`      | maximum number of simultaneously opened sessions                                                     |
| `metrics-server`                | `true`     | enable or disable Prometheus endpoint                                                                |
| `metrics-server-port`           | `9477`     | Prometheus endpoint port                                                                             |
| `mtls`                          | `false`    | enable mutual tls                                                                                    |
| `no-histograms`                 | `false`    | disable collection of histogram metrics like query durations                                         |
| `pgsql-server`                  | `true`     | enable or disable pgsql server                                                                       |
| `pgsql-server-port`             | `5432`     | pgsql server port                                                                                    |
| `pidfile`                       | ``         | pid path with filename. E.g. /var/run/immudb.pid                                                     |
| `pkey`                          | ``         | server private key path                                                                              |
| `port`                          | `3322`     | port number                                                                                          |
| `pprof`                         | `false`    | add pprof profiling endpoint on the metrics server                                                   |
| `replication-allow-tx-discarding` | `false`     | allow precommitted transactions to be discarded if the follower diverges from the master |
| `replication-commit-concurrency`  | `10` | number of concurrent replications |
| `replication-follower-password` | ``         | password used for replication of systemdb and defaultdb                                              |
| `replication-follower-username` | ``         | username used for replication of systemdb and defaultdb                                              |
| `replication-is-replica`      | `false` | set systemdb and defaultdb as replica  |
| `replication-master-address`    | ``         | master address (if replica=true)                                                                     |
| `replication-master-port`       | `3322`     | master port (if replica=true)                                                                        |
| `replication-prefetch-tx-buffer-size` | `100`     | maximum number of prefeched transactions  |
| `replication-sync-enabled` | `false` | enable synchronous replication  |
| `replication-sync-followers` | `0`   | set a minimum number of followers for ack replication before transactions can be committed  |
| `s3-access-key-id`              | ``         | s3 access key id                                                                                     |
| `s3-bucket-name`                | ``         | s3 bucket name                                                                                       |
| `s3-endpoint`                   | ``         | s3 endpoint                                                                                          |
| `s3-location`                   | ``         | s3 location (region)                                                                                 |
| `s3-path-prefix`                | ``         | s3 path prefix (multiple immudb instances can share the same bucket if they have different prefixes) |
| `s3-secret-key`                 | ``         | s3 secret access key                                                                                 |
| `s3-storage`                    | `false`    | enable or disable s3 storage                                                                         |
| `session-timeout`               | `2m0s`     | session timeout is a duration after which an inactive session is forcibly closed by the server       |
| `signingKey`                    | ``         | signature private key path. If a valid one is provided, it enables the cryptographic signature of the root. E.g. "./../test/signer/ec3.key" |
| `synced`                        | `true`     | synced mode prevents data lost under unexpected crashes but affects performance                      |
| `token-expiry-time`             | `1440`     | client authentication token expiration time. Minutes                                                 |
| `web-server`                    | `true`     | enable or disable web/console server                                                                 |
| `web-server-port`               | `8080`     | web/console server port   |

</WrappedSection>

<WrappedSection>

### Configuration file

Settings can be specified in a [immudb.toml configuration file](https://raw.githubusercontent.com/codenotary/immudb/master/configs/immudb.toml).

Which configuration file to use is set with the `--config` option. By default, immudb looks into the `configs` subfolder in the current directory.

When running immudb as a service, `immudb service install` allows to specify the configuration file to use with the `--config` option.

### Environment variables

Settings specified via environment variables take override the configuration file. They are specified in the form of `IMMUDB_`, for example `IMMUDB_DIR` specifies the `dir` variable.

</WrappedSection>
