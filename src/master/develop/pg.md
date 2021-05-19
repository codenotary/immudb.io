# Pgsql protocol compatibility

immudb can talk the [pgsql wire protocol](https://www.postgresql.org/docs/9.3/protocol.html) which makes it compatible with a widely available set of clients and drivers.

immudb needs to be started with the `pgsql-server` option enabled (`IMMUDB_PGSQL_SERVER=true`).

SSL is supported, if you configured immudb with a certificate.

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
psql "host=localhost dbname=defaultdb user=immudb password=immudb sslmode=disable"
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
