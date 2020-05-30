# immuclient

work in progress

## Contents
 - [Latest binaries](#latest-binaries)
 - [Build](#build)
 - [Docker](#docker)
 - [Use immuclient](#run-immugw)
 - [Examples](#examples)
 - [Auditor](#auditor)
 - [License](#license)

## Latest binaries

[Get the latest builds](https://github.com/codenotary/immudb/releases/latest)

## Build

clone the immudb repository locally

`git clone https://github.com/codenotary/immudb.git`

### Linux

```bash
GOOS=linux GOARCH=amd64 make immuclient-static
```

### MacOS

```bash
GOOS=darwin GOARCH=amd64 make immuclient-static
```

### Windows

```bash
GOOS=windows GOARCH=amd64 make immuclient-static
```

## Docker

### build your own Docker container image
```bash
docker build -t myown/immuclient:latest -f Dockerfile.immuclient .
```

### run immuclient in a container
As immuclient has a direct command and interactive, you can simply add the immuclient command after docker run.

```bash
docker run -it --rm -name immuclient codenotary/immuclient:latest -a <immudb host>
```

You can now use the interactive mode of immuclient and type commands until you type exit. Use help to get a command reference.

## Use immuclient
 
## Examples

## Auditor

## License

immuclient is [Apache v2.0 License](LICENSE).
