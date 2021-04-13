# Quickstart with immudb and immuclient

::: tip
To learn interactively and to get started with immudb from the command line and with programming languages, visit the immudb Playground at <https://play.codenotary.com>
:::

## Getting immudb running

You may download the immudb binary from [the latest releases on Github](https://github.com/codenotary/immudb/releases/latest). Once you have downloaded immudb, rename it to `immudb`, make sure to mark it as executable, then run it. The following example shows how to obtain v0.9.2 for linux amd64:

```bash
wget https://github.com/vchain-us/immudb/releases/download/v0.9.2/immudb-v0.9.2-linux-amd64
mv immudb-v0.9.2-linux-amd64 immudb
chmod +x ./immudb

# run immudb in the foreground to see all output
./immudb

# or run immudb in the background
./immudb -d
```

Alternatively, you may use Docker to run immudb in a ready-to-use container:

```bash
docker run -d --net host -it --rm --name immudb codenotary/immudb:latest
```

## Connecting with immuclient

You may download the immuclient binary from [the latest releases on Github](https://github.com/codenotary/immudb/releases/latest). Once you have downloaded immuclient, rename it to `immuclient`, make sure to mark it as executable, then run it. The following example shows how to obtain v0.9.2 for linux amd64:

```bash
wget https://github.com/vchain-us/immudb/releases/download/v0.9.2/immuclient-v0.9.2-linux-amd64
mv immuclient-v0.9.2-linux-amd64 immuclient
chmod +x ./immuclient

# start the interactive shell
./immuclient
```

Alternatively, you may use Docker to run immuclient in a ready-to-use container:

```bash
docker run -it --rm --net immudbnet --name immuclient codenotary/immuclient:latest
```