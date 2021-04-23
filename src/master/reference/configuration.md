
# Configuration

This page describes how to set different settings in immudb.

Some of the most important settings that ones are:

| Parameter         | Default | Description                                                                              |
|-------------------|---------|------------------------------------------------------------------------------------------|
| `dir`               | `./data`  | System and user databases are stored here                                                |
| `network`           | `tcp`     |                                                                                          |
| `adress`            | `0.0.0.0` | Listening address                                                                        |
| `port`              | `3322`    | Listing port                                                                             |
| `mtls`              | `false`   | Whether to enable [Mutual TLS](https://en.wikipedia.org/wiki/Mutual_authentication#mTLS) |
| `pkey`              |         | If specified, the server can sign the state the clients use to verify immutability       |
| `auth`              | `true`    | If enabled, immudb will require user and password from the client                        |
| `clientcas`         |         | Client certificate authority                                                             |
| `maintenance`       |         | Maintenance mode. Override the authentication flag                                       |
| `sync`              |         | Runs in sync mode. Prevents data loss but affects performance                            |
| `token-expiry-time` | `1440`    | Client token expiry time, in minutes                                                     |

Settings can be specified as command line options to immudb (see `immudb -h`), in a configuration file, or as environment variables.

## Configuration file

Settings can be specified in a [immudb.toml configuration file](https://raw.githubusercontent.com/codenotary/immudb/master/configs/immudb.toml).

Which configuration file to use is set with the `--config` option. By default, immudb looks into the `configs` subfolder in the current directory.

When running immudb as a service, `immudb service install` allows to specify the configuration file to use with the `--config` option.

## Environment variables

Settings specified via environment variables take override the configuration file. They are specified in the form of `IMMUDB_`, for example `IMMUDB_DIR` specifies the `dir` variable.

