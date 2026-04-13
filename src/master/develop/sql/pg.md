# Pgsql protocol compatibility

<WrappedSection>

immudb implements the [PostgreSQL wire protocol](https://www.postgresql.org/docs/14/protocol.html), providing broad compatibility with PostgreSQL clients, ORMs, and tools. Connect with `psql`, pgAdmin, DBeaver, JDBC, SQLAlchemy, Django, GORM, ActiveRecord, and more.

immudb reports itself as **PostgreSQL 14.0** and supports:

- **COPY FROM stdin** for bulk data import via `psql -f dump.sql`
- **pg_catalog** query interception for tool compatibility (pgAdmin, DBeaver)
- **PostgreSQL type aliases**: BIGINT, SERIAL, NUMERIC, DECIMAL, BYTEA, JSONB, TIMESTAMPTZ, TEXT, etc.
- **LIKE with standard SQL wildcards** (`%` and `_`, not regex)
- **75+ built-in functions** compatible with PostgreSQL
- **Automatic type translation** from PostgreSQL DDL to immudb types

Start immudb with the `pgsql-server` option enabled:

```bash
./immudb --pgsql-server --pgsql-server-port 5433
```

Or via environment variable: `IMMUDB_PGSQL_SERVER=true`.

SSL is supported if you configure immudb with a certificate. Without SSL, clients that send an SSL probe will gracefully fall back to plaintext.

### Importing PostgreSQL databases

You can import standard `pg_dump` output directly:

```bash
PGPASSWORD=immudb psql -h localhost -p 5433 -U immudb -d defaultdb -f mydatabase.sql
```

immudb automatically translates PostgreSQL types, handles `COPY FROM stdin` data, and silently skips unsupported DDL (CREATE FUNCTION, CREATE TRIGGER, GRANT, etc.).

</WrappedSection>

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

::: tab Java

Download the official [JDBC driver](https://jdbc.postgresql.org/) jar artifact for PostgreSQL.

You can then compile your program:

```
$ javac -cp .:./postgresql-42.2.20.jar MyProgram.java
```

:::

::: tab PHP

Please refer to the [PHP pgsql module](https://www.php.net/manual/en/book.pgsql.php) documentation for instructions on how to enable it in your server.

:::

::::

### To connect to the database:

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

::: tab Java

It is important to pass the `preferQueryMode=simple` option, as immudb pgsql server only support simple query mode.

```java
Connection conn = 
  DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/defaultdb?sslmode=allow&preferQueryMode=simple",
    "immudb", "immudb");
System.out.println("Opened database successfully");
```
:::


::: tab PHP
```php
<?php
$dbconn = pg_connect("host=localhost port=5432 sslmode=require user=immudb dbname=defaultdb password=immudb");
//...
pg_close($dbconn);
?>
```
:::

::::

### Execute statements:

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

::: tab Java

```java
Statement stmt = conn.createStatement();

stmt.executeUpdate("CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);");

stmt.executeUpdate("INSERT INTO people(id, name, salary) VALUES (1, 'Joe', 20000);");
stmt.executeUpdate("INSERT INTO people(id, name, salary) VALUES (2, 'Bob', 30000);");
```
:::

::: tab PHP

```php
$stmt = 'CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);';
$result = pg_query($stmt) or die('Error message: ' . pg_last_error());
$stmt = 'INSERT INTO people(id, name, salary) VALUES (1, 'Joe', 20000);';
$result = pg_query($stmt) or die('Error message: ' . pg_last_error());
$stmt = 'INSERT INTO people(id, name, salary) VALUES (2, 'Bob', 30000);';
```
:::

::::


### Query and iterate over results:

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

::: tab Java

```java
ResultSet rs = stmt.executeQuery("SELECT * FROM people");

while(rs.next()){
    System.out.print("ID: " + rs.getInt("(defaultdb.people.id)"));
    System.out.print(", Name: " + rs.getString("(defaultdb.people.name)"));
    System.out.print(", Salary: " + rs.getInt("(defaultdb.people.salary)"));
    System.out.println();
}
```
:::

::: tab PHP
```php
$query = 'SELECT * FROM people';
$result = pg_query($query) or die('Error message: ' . pg_last_error());
while ($row = pg_fetch_row($result)) {
  var_dump($row);  
}
```
:::

::::
