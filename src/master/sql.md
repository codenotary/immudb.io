
>Note: This page requires immudb 1.0 which is not yet release. If you want to try this features, you need to build immudb from the `sql_support` branch.

[[toc]]

## SQL operations with immuclient

In addition to a key-value store, immudb supports the relational model (SQL). For example, to a table:

```
$ immuclient exec "CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);"
sql ok, Ctxs: 1 Dtxs: 0
```

To insert data, use `UPSERT` (insert or update), which will add an entry, or overwrite it if already exists (based on the primary key):

```
$ immuclient exec "UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 10000);"
sql ok, Ctxs: 0 Dtxs: 1
immuclient exec "UPSERT INTO people(id, name, salary) VALUES (2, 'Bob', 30000);"
sql ok, Ctxs: 0 Dtxs: 1
```

To query the data you can use the traditional `SELECT`:

```
$ immuclient query "SELECT id, name, salary FROM people;"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     10000 |
|                     2 | Bob                     |                     30000 |
+-----------------------+-------------------------+---------------------------+
```

If we upsert again on the primary key "1", the value for "Joe" will be overwriten:

```
immuclient exec "UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 20000);"
sql ok, Ctxs: 0 Dtxs: 1

immuclient query "SELECT id, name, salary FROM people;"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     20000 |
|                     2 | Bob                     |                     30000 |
+-----------------------+-------------------------+---------------------------+
```

## Time travel

immudb is a immutable database. History is always preserved. With immudb you can travel in time!

```
immuclient query "SELECT id, name, salary FROM people WHERE name='Joe';"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     20000 |
+-----------------------+-------------------------+---------------------------+
```

Eg. before the update:

```
immuclient query "SELECT id, name, salary FROM (people BEFORE TX 3) WHERE name='Joe';"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     10000 |
+-----------------------+-------------------------+---------------------------+
```

or even before the first time insert (guess what, it is empty!):

```
immuclient query "SELECT id, name, salary FROM (people BEFORE TX 1) WHERE name='Joe';"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
+-----------------------+-------------------------+---------------------------+
```

You can even `TABLE` a table with itself in the past. Imagine you want to see how people salary changed between two points in time:

```
immuclient query "SELECT peoplenow.id, peoplenow.name, peoplethen.salary, peoplenow.salary FROM (people BEFORE TX 3 AS peoplethen) INNER JOIN (people AS peoplenow) ON peoplenow.id=peoplethen.id;"
+--------------------------+----------------------------+-------------------------------+------------------------------+
| (DEFAULTDB PEOPLENOW ID) | (DEFAULTDB PEOPLENOW NAME) | (DEFAULTDB PEOPLETHEN SALARY) | (DEFAULTDB PEOPLENOW SALARY) |
+--------------------------+----------------------------+-------------------------------+------------------------------+
|                        1 | Joe                        |                         10000 |                        20000 |
|                        2 | Bob                        |                         30000 |                        30000 |
+--------------------------+----------------------------+-------------------------------+------------------------------+
```

## SQL Reference

### Creating and using databases

```
CREATE DATABASE db1;
USE DATABASE db1;
```

### Creating tables

```
CREATE TABLE table1 (id INTEGER, PRIMARY KEY id);
CREATE TABLE table1 (id INTEGER, ts INTEGER, title VARCHAR, active BOOLEAN, payload BLOB, PRIMARY KEY id);
```

### Indexes

```
CREATE INDEX ON table1(name);
```

### Inserting or updating data

```
UPSERT INTO table1 (id, title) VALUES (1, 'some title')
UPSERT INTO table1 (id, ts, title, active, payload) VALUES (2, NOW(), 'title', true, x'a blob')
```

### Querying

```
SELECT id, title FROM db1.table1 AS t1
SELECT t1.id, title FROM (db1.table1 AS t1)
SELECT id, time, name FROM table1 WHERE country = 'US' AND time <= NOW() AND name = @pname
SELECT id, title, year FROM table1 ORDER BY title ASC, year DESC
SELECT id, name, table2.status FROM table1 INNER JOIN table2 ON table1.id = table2.id WHERE name = 'John' ORDER BY name DESC
SELECT country, SUM(amount) FROM table1 GROUP BY country
SELECT id FROM table1 WHERE (id > 0 AND NOT table1.id >= 10) OR table1.title LIKE 'J.*'
```

### Parameters

```
SELECT t.id as d FROM (people AS t) WHERE id <= 3 AND active = @active
```

### Aggregations

```
SELECT COUNT() AS c, SUM(age), MIN(age), MAX(age), AVG(age) FROM table1 AS t1
SELECT active, COUNT() as c, MIN(age), MAX(age) FROM table1 GROUP BY active HAVING COUNT() > 0 ORDER BY active DESC
```

### Transactions

```
BEGIN TRANSACTION; UPSERT INTO table1 (id, label) VALUES (100, 'label1'); UPSERT INTO table2 (id) VALUES (10) COMMIT;
```

### Time travel

```
USE SNAPSHOT BEFORE TX 1000
```

## SQL Operations with the Go SDK

In order to use SQL from the Go SDK, you create a immudb client and login to the server like usual. First make sure you import:

```
"github.com/codenotary/immudb/pkg/api/schema"
"github.com/codenotary/immudb/pkg/client"
"google.golang.org/grpc/metadata"
```

Then you can create the client and login to the database:

```go
c, err := client.NewImmuClient(client.DefaultOptions())
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()

	lr, err := c.Login(ctx, []byte(`immudb`), []byte(`immudb`))
	if err != nil {
		log.Fatal(err)
	}

	md := metadata.Pairs("authorization", lr.Token)
	ctx = metadata.NewOutgoingContext(ctx, md)
```

To perform SQL statements, use the `SQLExec` function, which takes a `SQLExecRequest` with a SQL operation:

```go
_, err = c.SQLExec(ctx, &schema.SQLExecRequest{Sql: `
		BEGIN TRANSACTION
          CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);
          CREATE INDEX ON people(name)
		COMMIT
	`})
```

This is also how you perform inserts:

```go
_, err = c.SQLExec(ctx, &schema.SQLExecRequest{Sql: "UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 10000);"})
```

Once you have data in the database, you can use the `SQLQuery` method of the client to query:

```go
q := "SELECT id, name, salary FROM people;"
qres, err := c.SQLQuery(ctx, &schema.SQLQueryRequest{Sql: q})
```

Both `SQLQuery` and `SQLExec` allows named parameters. Just encode them as `@param` and pass `map[string]{}interface` as values. Example:

```go
res, err := client.SQLQuery(ctx, "SELECT t.id as d FROM (people AS t) WHERE id <= 3 AND active = @active", params)
```

`qres` is of the type `*schema.SQLQueryResult`. In order to iterate over the results, you iterate over `qres.Rows`. On earch iteration, the row `r` will have a member `Values`, which you can iterate to get each column.

```go
for _, r := range qres.Rows {	
	for _, v := range r.Values {
		fmt.Printf("%v\n", schema.RenderValue(v.Operation))
	}
	}
```

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

