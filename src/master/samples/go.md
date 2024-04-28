
# App samples in Go

<WrappedSection>

This section includes sample applications using immudb in Go.

Although the applications are simple, they will provide fully functional samples to demonstrate how to write an application using immudb.

</WrappedSection>

<WrappedSection>

## Hello Immutable World

The classical `Hello World` sample adapted to immudb.

This simple application is using the [official immudb go sdk](https://pkg.go.dev/github.com/codenotary/immudb/pkg/client) to connect, store and retrieve key-value data from immudb server. 

The full source code of this sample can be found at [Hello Immutable World](https://github.com/codenotary/immudb-client-examples/tree/master/go/hello-immutable-world).

### Prerequisites

In order to run this sample, immudb server must be already running. This step is quite simple and it's described at [Running immudb](https://docs.immudb.io/master/running/download.html).

### Building and running the sample app

To build and run the sample application, simply clone the [Hello Immutable World](https://github.com/codenotary/immudb-client-examples/tree/master/go/hello-immutable-world) and run:

```
go mod tidy
go build
./hello-immutable-world
```

The sample application will run and display an output similar to

```
Sucessfully set a verified entry: ('hello', 'immutable world') @ tx 1
Sucessfully got verified entry: ('hello', 'immutable world') @ tx 1
```

</WrappedSection>

<WrappedSection>

## WebApp using SQL

The purpose of this sample application is to demonstrate the use of immudb using [Go standard APIs for SQL](https://pkg.go.dev/database/sql).

This sample was written taking as a basis the tutorial [Building a simple app with Go and PostgreSQL](https://blog.logrocket.com/building-simple-app-go-postgresql/). We followed the same application structure even though the source code is different to show how immudb and PostgreSQL can be used in analogy.

The full source code of this sample can be found at [WebApp using SQL](https://github.com/codenotary/immudb-client-examples/tree/master/go/todos-sample-stdlib)

<WrappedSection>
<img align="center" src="/samples/go_webapp_sql.jpg" />
</WrappedSection>

### Prerequisites

In order to run this sample, immudb server must be already running. This step is quite simple and it's described at [Running immudb](https://docs.immudb.io/master/running/download.html).

### Building and running the sample app

To build and run the sample application, simply clone the [sample repository](https://github.com/codenotary/immudb-client-examples/tree/master/go/todos-sample-stdlib) and run:

```
go mod tidy
go build
./immudb-todo-webapp
```

The sample application should be up and running now. The port 3000 is used by default unless a different one is specified using `PORT` environment variable e.g. `PORT=3001 ./immudb-todo-webapp`

::: tip
Database initialization statements might be stored in an external file as in this sample [sql initialization script](https://github.com/codenotary/immudb-client-examples/tree/master/go/stdlib-init-script).
:::

</WrappedSection>

<WrappedSection>

## Command line app using SQL

A simple reminder console app that stores all data in immudb.

As in the previous sample, the purpose of this sample application is to demonstrate the use of immudb using [Go standard APIs for SQL](https://pkg.go.dev/database/sql).

The full source code of this sample can be found at [Console sample using SQL](https://github.com/codenotary/immudb-client-examples/tree/master/go/immudb-reminder-app).

### Prerequisites

In order to run this sample, immudb server must be already running. This step is quite simple and it's described at [Running immudb](https://docs.immudb.io/master/running/download.html).

### Building and running the sample app

To build and run the sample application, simply clone the [Console sample using SQL](https://github.com/codenotary/immudb-client-examples/tree/master/go/immudb-reminder-app) and run:

```
go mod tidy
go build
./immudb-reminder-app
```

The sample application should be up and running now.

Additionally, this sample application provides a simple way to specify connection settings. run `./immudb-reminder-app -h` to display all the available flags.

```
Usage of ./immudb-reminder-app:
  -addr string
        IP address of immudb server (default "localhost")
  -db string
        Name of the database to use (default "defaultdb")
  -pass string
        Password for authenticating to immudb (default "immudb")
  -port string
        Port number of immudb server (default "3322")
  -user string
        Username for authenticating to immudb (default "immudb")
```

</WrappedSection>


::: tip
Additional samples can be found at [immudb client samples repository](https://github.com/codenotary/immudb-client-examples/tree/master/go).
:::

