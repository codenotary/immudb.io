# Running immudb

::: tip
To learn interactively and to get started with immudb from the command line and with programming languages, visit the immudb Playground at <https://play.codenotary.com>
:::

<WrappedSection>

You may download the immudb binary from [the latest releases on Github](https://github.com/codenotary/immudb/releases/latest). Once you have downloaded immudb, rename it to `immudb`, make sure to mark it as executable, then run it. The following example shows how to obtain v1.2.4 for linux amd64:

```bash
$ wget https://github.com/vchain-us/immudb/releases/download/v1.2.4/immudb-v1.2.4-linux-amd64
$ mv immudb-v1.2.4-linux-amd64 immudb
$ chmod +x immudb

# run immudb in the foreground to see all output
$ ./immudb

# or run immudb in the background
$ ./immudb -d
```

Alternatively, you may [pull immudb docker image from DockerHub](https://hub.docker.com/r/codenotary/immudb) and run it in a ready-to-use container:

```bash
$ docker run -d --net host -it --rm --name immudb codenotary/immudb:latest
```

</WrappedSection>
