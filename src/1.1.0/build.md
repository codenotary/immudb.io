# Building from source

<WrappedSection>

## Build the binaries

To build the binaries yourself, simply clone this repo and run

```bash
make all
```

### Linux (by component)

```bash
GOOS=linux GOARCH=amd64 make immuclient-static immuadmin-static immudb-static
```

### MacOS (by component)

```bash
GOOS=darwin GOARCH=amd64 make immuclient-static immuadmin-static immudb-static
```

### Windows (by component)

```bash
GOOS=windows GOARCH=amd64 make immuclient-static immuadmin-static immudb-static
```

</WrappedSection>

<WrappedSection>

## Build the Docker images

If you want to build the container images yourself, simply clone this repo and run:

```bash
docker build -t myown/immudb:latest -f Dockerfile .
docker build -t myown/immuadmin:latest -f Dockerfile.immuadmin .
docker build -t myown/immuclient:latest -f Dockerfile.immuclient .
```

</WrappedSection>
