---
title: "Build"
weight: 50
aliases: ["/master/running/build/"]
---
### Build the binaries

Building binaries requires a Linux operating system.

To build the binaries yourself, simply clone [immudb repository](https://github.com/codenotary/immudb) and run:

```bash
make all
```

immudb can be cross compiled for different systems and architectures by setting `GOOS` and `GOARCH` variables, i.e.:

```bash
GOOS=windows GOARCH=amd64 make all
```

### macOS specific

The community already added immudb to [HomeBrew](https://formulae.brew.sh/formula/immudb), therefore you can simply run
```bash
brew install immudb
```

### Build the Docker images

If you want to build the container images yourself, simply clone [immudb repository](https://github.com/codenotary/immudb) and run:

```bash
docker build -t myown/immudb:latest -f Dockerfile .
docker build -t myown/immuadmin:latest -f Dockerfile.immuadmin .
docker build -t myown/immuclient:latest -f Dockerfile.immuclient .
```
