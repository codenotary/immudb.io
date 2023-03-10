
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
| `force-admin-password`          | `false`    | if true, reset the admin password to the one passed through admin-password option upon startup       |
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
| `replication-allow-tx-discarding` | `false`  | allow precommitted transactions to be discarded if the replica diverges from the primary             |
| `replication-commit-concurrency` | `10`      | number of concurrent replications                                                                    |
| `replication-is-replica`        | `false`    | set systemdb and defaultdb as replica                                                                |
| `replication-prefetch-tx-buffer-size` | `100`| maximum number of prefeched transactions                                                             |
| `replication-primary-host`      | ``         | primary database host (if replica=true)                                                              |
| `replication-primary-password`  | ``         | password in the primary database used for replication of systemdb and defaultdb                      |
| `replication-primary-port`      | `3322`     | primary database port (if replica=true) (default 3322)                                               |
| `replication-primary-username`  | ``         | username in the primary database used for replication of systemdb and defaultdb                      |
| `replication-skip-integrity-check` | `false` | disable integrity check when reading data during replication |
| `replication-sync-acks`         | `0`        | set a minimum number of replica acknowledgements required before transactions can be committed       |
| `replication-sync-enabled`      | `false`    | enable synchronous replication                                                                       |
| `replication-wait-for-indexing` | `false` | wait for indexing to be up to date during replication |
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

<WrappedSection>

### Logging Levels

The `LOG_LEVEL` environment variable sets the log level to be emitted from immudb logs. Valid logging level settings are `error`, `warn`, `info`(default), and `debug`. Logs that are equal to, or above, the specified level will be emitted. Log level `error` has the highest level, `debug` being the lowest.

You can set the `LOG_LEVEL` when running immudb either by setting the environment variable, or by running the command as below:

```
LOG_LEVEL=error ./immudb
```

#### Levels

##### info

The `info` severity is used for informational messages that do not require action.

##### warn

The `warn` severity is used for messages that may require special handling, but does not affect normal operation.

##### error

The `error` severity is used for messages that require special handling, where a normal database operation could not proceed as expected. It does not block the database.

##### debug

The `debug` severity is used for messages that are used for debugging purpose for the database.

### Logging formats

Two logging format options are available: `text` and `json`. The default logging format setting is the `text`. The `json` format is available when specified.

#### Examples of log output:

##### Normal

###### Command:

```
./immudb
```

###### Output:

```bash
immudb 2022/11/17 14:30:02 INFO: Creating database 'systemdb' {replica = false}...
immudb 2022/11/17 14:30:02 INFO: Binary Linking up to date at 'data/systemdb'
immudb 2022/11/17 14:30:02 INFO: Index 'data/systemdb/index' {ts=0, discarded_snapshots=0} successfully loaded
immudb 2022/11/17 14:30:02 INFO: Indexing in progress at 'data/systemdb'
immudb 2022/11/17 14:30:02 INFO: Flushing index 'data/systemdb/index' {ts=0, cleanup_percentage=0.00/0.00, since_cleanup=0} requested via SnapshotSince...
immudb 2022/11/17 14:30:02 INFO: Index 'data/systemdb/index' {ts=0, cleanup_percentage=0.00/0.00} successfully flushed
```

##### JSON

###### Command:

```
./immudb --logformat=json
```

###### Output:

```bash
{"caller":"codenotary/immudb/pkg/database/database.go:179","component":"github.com/codenotary/immudb/pkg/database.OpenDB","level":"info","message":"Opening database 'systemdb' {replica = false}...","module":"immudb","timestamp":"2022-11-17T14:32:28.890774+05:30"}
{"caller":"codenotary/immudb/embedded/store/immustore.go:553","component":"github.com/codenotary/immudb/embedded/store.OpenWith","level":"info","message":"Binary Linking up to date at 'data/systemdb'","module":"immudb","timestamp":"2022-11-17T14:32:28.898035+05:30"}
{"caller":"codenotary/immudb/embedded/tbtree/tbtree.go:351","component":"github.com/codenotary/immudb/embedded/tbtree.Open","level":"info","message":"Reading snapshots at 'data/systemdb/index/commit'...","module":"immudb","timestamp":"2022-11-17T14:32:28.898296+05:30"}
{"caller":"codenotary/immudb/embedded/tbtree/tbtree.go:669","component":"github.com/codenotary/immudb/embedded/tbtree.OpenWith","level":"info","message":"Index 'data/systemdb/index' {ts=2, discarded_snapshots=0} successfully loaded","module":"immudb","timestamp":"2022-11-17T14:32:28.904722+05:30"}
```


</WrappedSection>
