# immugw

<WrappedSection>

immugw is a REST proxy that connects to immudb and provides a RESTful interface for applications. We recommend running immudb and immugw on separate machines to enhance security. 

You may download the immugw binary from [the latest releases on Github](https://github.com/codenotary/immugw/releases/latest). Once you have downloaded immugw, rename it to `immugw`, make sure to mark it as executable, then run it. The following example shows how to obtain v1.1.0 for linux amd64:

```bash
$ wget https://github.com/codenotary/immugw/releases/download/v1.1.0/immugw-v1.1.0-linux-amd64
$ mv immugw-v1.1.0-linux-amd64 immugw
$ chmod +x immugw

# run help to find out about possible arguments
$ ./immugw help

# and run immugw in the background
$ ./immugw -d --immudb-address {immudb-server-address}
```

Alternatively, you may [pull immudb docker image from DockerHub](https://hub.docker.com/r/codenotary/immudb) and run it in a ready-to-use container:

```bash
$ docker run -it -d -p 3323:3323 --name immugw --env IMMUGW_IMMUDB_ADDRESS={immudb-server-address} codenotary/immugw:latest
```

</WrappedSection>

<WrappedSection>

### Build from sources

Building binaries requires a Linux operating system.

To build the binaries yourself, simply clone [immugw repository](https://github.com/codenotary/immugw) and run:

```bash
$ make all
```

immugw can be cross compiled for different systems and architectures by setting `GOOS` and `GOARCH` variables, i.e.:

```bash
GOOS=windows GOARCH=amd64 make all
```

To build immugw docker container locally:

```bash
docker build -t myown/immugw:latest -f Dockerfile .
```

</WrappedSection>

<WrappedSection>

### Installing with immuadmin

```bash
# install immugw service
$ ./immugw service install

# check current immugw service status
$ ./immugw service status

# stop immugw service
$ ./immugw service stop

# start immugw service
$ ./immugw service start
```

The Linux service is using the following defaults:

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| pid file                | /var/lib/immudb/immugw.pid |
| log files               | /var/log/immudb    |

</WrappedSection>

<WrappedSection>

### Configuration

immugw can be configured using environment variables, flags or a config file.

* `immugw --help` shows you all available flags and environment variables.
* `/etc/immudb/immugw.toml` is used as a default configuration file

</WrappedSection>

<WrappedSection>
### RESTful API reference

You can find the swagger schema here:

[swagger immugw](https://github.com/codenotary/immudb/blob/master/pkg/api/schema/schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
$ wget https://github.com/codenotary/immudb/blob/master/pkg/api/schema/schema.swagger.json
$ docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```

</WrappedSection>

<WrappedSection>
### immugw as auditor
immugw can be also run as auditor. 

```bash
$ ./immugw --audit
```

If you are running immugw as a service, you need to edit /etc/immudb/immugw.toml and add the following section:

```bash
audit = true # false is default
audit-interval = "5m" # suffixes: "s", "m", "h", examples: 10s, 5m 1h
audit-username = "" # when immudb authentication is enabled, use read-only user credentials here
audit-password = "" # and the password
```

</WrappedSection>