If you are running macOS, the community already added immudb to [HomeBrew](https://formulae.brew.sh/formula/immudb); therefore you can simply run

```bash
brew install immudb
```

### Run immudb as a service

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
| pid file                | /var/run/immudb.pid |
| log files               | /var/log/immudb    |

In case you want to run immudb as a service on macOS, please check the following [guideline](https://medium.com/swlh/how-to-use-launchd-to-run-services-in-macos-b972ed1e352).

### Run immugw as a service

immugw can be found in a different [repository](https://github.com/codenotary/immugw). You can find a build guideline in the Readme of the repository.

Please make sure to build or download the immugw and immuadmin component and save them in the same work directory when installing the service.

```bash
# install immugw service
./immugw service install

# check current immugw service status
./immugw service status

# stop immugw service
./immugw service stop

# start immugw service
./immugw service start
```

The linux service is using the following defaults:

| File or configuration   | location           |
| ----------------------- | ------------------ |
| all configuration files | /etc/immudb        |
| pid file                | /var/run/immugw.pid |
| log files               | /var/log/immudb    |



All services and CLI components are also available as Docker images on [dockerhub](https://hub.docker.com/).

| Component | Container image |
| --- | --- |
| immudb    | [https://hub.docker.com/r/codenotary/immudb](https://hub.docker.com/r/codenotary/immudb) |
| immugw    | [https://hub.docker.com/r/codenotary/immugw](https://hub.docker.com/r/codenotary/immugw) |
| immuadmin | [https://hub.docker.com/r/codenotary/immuadmin](https://hub.docker.com/r/codenotary/immuadmin) |
| immuclient | [https://hub.docker.com/r/codenotary/immuclient](https://hub.docker.com/r/codenotary/immuclient) 