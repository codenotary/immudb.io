
>Note: This page requires immudb 1.0 which is not yet released. If you want to try this features, you need to build immudb from the `master` branch.

[[toc]]




## Connecting with a pgsql compatible client or SDK

immudb can talk the [pgsql wire protocol](https://www.postgresql.org/docs/9.3/protocol.html) which makes it compatible with a widely available set of clients and drivers.

immudb needs to be started with the `pgsql-server` option enabled (`IMMUDB_PGSQL_SERVER=true`).

:::: tabs

::: tab CLI
Use the [psql client](https://www.postgresql.org/docs/13/app-psql.html) included with PostgreSQL.
:::

::: tab C

You can use a subset of the [libpq](https://www.postgresql.org/docs/9.5/libpq.html) API. You will need to include:

``` C
 #include <libpq-fe.h>
```

and compile with `gcc -o main $(pkg-config libpq --cflags --libs) main.c`.

:::

::: tab Ruby

You can use the [pg](https://rubygems.org/gems/pg) gem:

```ruby
require 'pg'
```
:::

::::

To connect to the database:

:::: tabs

::: tab CLI

```
psql "host=localhost dbname=defaultdb user=immudb password=immudb ssl mode=disable"
psql (13.2, server 0.0.0)
Type "help" for help.
```

:::

::: tab C

```C
PGconn *conn = PQconnectdb("host=localhost user=immudb password=immudb dbname=defaultdb sslmode=disable");

if (PQstatus(conn) == CONNECTION_BAD) {
  fprintf(stderr, "Connection to database failed: %s\n", PQerrorMessage(conn));
  PQfinish(conn);
  exit(1);
}
```

:::

::: tab Ruby
```ruby
conn = PG::Connection.open("sslmode=allow dbname=defaultdb user=immudb password=immudb host=127.0.0.1 port=5432")
```
:::

::::

Execute statements:

:::: tabs

::: tab CLI
```
defaultdb=> CREATE TABLE Orders(id INTEGER, amount INTEGER, title VARCHAR, PRIMARY KEY id);
SELECT 1
defaultdb=> UPSERT INTO Orders (id, amount, title) VALUES (1, 200, 'title1');
SELECT 1
```
:::

::: tab C
```C
PGresult *res = PQexec(conn, "CREATE TABLE Orders (id INTEGER, amount INTEGER, title VARCHAR, PRIMARY KEY id)");
if (PQresultStatus(res) != PGRES_COMMAND_OK) {
  do_exit(conn, res);
}
PQclear(res);

res = PQexec(conn, "UPSERT INTO Orders (id, amount, title) VALUES (1, 200, 'title 1')");
if (PQresultStatus(res) != PGRES_COMMAND_OK) {
  do_exit(conn, res);
}
PQclear(res);
```
:::

::: tab Ruby
```ruby
conn.exec( "CREATE TABLE Orders (id INTEGER, amount INTEGER, title VARCHAR, PRIMARY KEY id)" )
conn.exec( "UPSERT INTO Orders (id, amount, title) VALUES (1, 200, 'title 1')" )
conn.exec( "UPSERT INTO Orders (id, amount, title) VALUES (2, 400, 'title 2')" )
```
:::

::::

Query and iterate over results:

:::: tabs

::: tab CLI
```
defaultdb=> SELECT id, amount, title FROM Orders;
 (defaultdb.Orders.id) | (defaultdb.Orders.amount) | (defaultdb.Orders.title)
-----------------------+---------------------------+--------------------------
                     1 |                       200 | "title1"
(1 row)
```
:::

::: tab C
```C
res = PQexec(conn, "SELECT id, amount, title FROM Orders");
if (PQresultStatus(res) != PGRES_TUPLES_OK) {
  printf("No data retrieved\n");
  PQclear(res);
  do_exit(conn, res);
}

int rows = PQntuples(res);
for(int i=0; i<rows; i++) {
  printf("%s %s %s\n", PQgetvalue(res, i, 0),
  PQgetvalue(res, i, 1), PQgetvalue(res, i, 2));
}
PQclear(res);
PQfinish(conn);
```
:::

::: tab Ruby
```ruby
conn.exec( "SELECT id, amount, title FROM Orders" ) do |result|
  result.each do |row|
    puts row.inspect
  end
end
```
:::

::::

## Embedding the SQL engine in your application

Using the Go client SDK means you are connecting to a immudb database server. There are cases where you don't want a separate server but embed immudb directly in the same application process, as a library.

immudb provides you a immutable embedded SQL engine which keeps all history, is tamper-proof and can travel in time.

immudb already provides an embeddable key-value store in the [embedded](https://github.com/codenotary/immudb/tree/master/embedded) package.

The SQL engine is mounted on top of the embedded key value store, and requires two stores to be initialized, one for the data, and one for the catalog (schema).

Make sure to import:

```
"github.com/codenotary/immudb/embedded/store"
"github.com/codenotary/immudb/pkg/sql"
```

Create stores for the data and catalog:

```go
catalogStore, err := store.Open("catalog", store.DefaultOptions())
if err != nil {
	log.Fatal(err)
}

dataStore, err := store.Open("sqldata", store.DefaultOptions())
if err != nil {
	log.Fatal(err)
}
```

And now you can create the SQL engine, passing both stores and a key prefix:

```go
engine, err := sql.NewEngine(catalogStore, dataStore, []byte("sql"))
if err != nil {
	log.Fatal(err)
}
```

The engine has an API to execute statements and queries. To execute an statement:

```go
_, err = engine.ExecStmt("CREATE TABLE journal (id INTEGER, date STRING, creditaccount INTEGER, debitaccount INTEGER amount INTEGER, description STRING, PRIMARY KEY id)")
if err != nil {
	log.Fatal(err)
}
```

Queries can be executed using `QueryStmt`:

```go
r, err = engine.QueryStmt("SELECT id, date, creditaccount, debitaccount, amount, description FROM journal")
```

To iterate over a result set `r`, just fetch rows until there are no more entries. Every row has a `Values` member you can index to access the column:

```go
for {
	row, err := r.Read()
	if err != nil {
		if fmt.Sprint(err) == "no more entries" {
			break
		} else {
			log.Fatal(err)
		}
	}

	// do something with row.Values
}
```

And that is all you need. If you need to change options like where things get stored by default, you can do that in the underlying store objects that the SQL engine is using.

