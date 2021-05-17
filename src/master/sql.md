
>Note: This page requires immudb 1.0 which is not yet released. If you want to try this features, you need to build immudb from the `master` branch.

[[toc]]


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

