# Docker run

All services and CLI components are also available as Docker images on [dockerhub](https://hub.docker.com/).

| Component | Container image |
| --- | --- |
| immudb    | [https://hub.docker.com/r/codenotary/immudb](https://hub.docker.com/r/codenotary/immudb) |
| immugw    | [https://hub.docker.com/r/codenotary/immugw](https://hub.docker.com/r/codenotary/immugw) |
| immuadmin | [https://hub.docker.com/r/codenotary/immuadmin](https://hub.docker.com/r/codenotary/immuadmin) |
| immuclient | [https://hub.docker.com/r/codenotary/immuclient](https://hub.docker.com/r/codenotary/immuclient) 

### Run immudb

```bash
docker run -it -d -p 3322:3322 -p 9497:9497 --name immudb codenotary/immudb:latest
```

run it with persistent data and listening to all interfaces:
```bash
docker run -it -d -p 3322:3322 -p 9497:9497 -v immudb:/var/lib/immudb --env IMMUDB_ADDRESS=0.0.0.0 --name immudb codenotary/immudb:latest
```

### Run immugw

```bash
docker run -it -d -p 3323:3323 --name immugw --env IMMUGW_IMMUDB_ADDRESS=immudb codenotary/immugw:latest
```

### Run immuadmin

You can either find immuadmin in the immudb container (/usr/local/bin/immuadmin) or run the Docker container to connect to the local immudb.

```bash
docker run -it --rm --name immuadmin codenotary/immuadmin:latest status
```

### Run immuclient

You can either find immuclient in the immudb container (/usr/local/bin/immuclient) or run the Docker container to connect to the local or remote immudb.

```bash
docker run -it --rm --name immuclient codenotary/immuclient:latest -a <immudb-host>
```