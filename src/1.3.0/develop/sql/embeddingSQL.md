# Embedding immudb in your application

Using the Go client SDK means you are connecting to a immudb database server. There are cases where you don't want a separate server but embed immudb directly in the same application process, as a library.

immudb provides you a immutable embedded SQL engine which keeps all history, is tamper-proof and can travel in time.
The SQL engine is mounted on top of the embedded key value store.
The following illustrative example showcase how to initialize the SQL engine, write and read data in the scope of a SQL transaction.

<WrappedSection>

```go
package main

import (
	"log"

	"github.com/codenotary/immudb/embedded/sql"
	"github.com/codenotary/immudb/embedded/store"
)

func handleErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	// create/open immudb store at specified path
	st, err := store.Open("data", store.DefaultOptions())
	handleErr(err)
	defer st.Close()

	// initialize sql engine (specify a key-prefix to isolate generated kv entries)
	engine, err := sql.NewEngine(st, sql.DefaultOptions().WithPrefix([]byte("sql")))
	handleErr(err)

	_, _, err = engine.Exec("CREATE DATABASE db1;", nil, nil)
	handleErr(err)

	// a sql tx is created and carried over next statements
	sqltx, _, err := engine.Exec("BEGIN TRANSACTION;", nil, nil)
	handleErr(err)

	// ensure tx is closed (it won't affect committed tx)
	defer engine.Exec("ROLLBACK;", nil, sqltx)

	// set the database to use in the context of the ongoing sql tx
	_, _, err = engine.Exec("USE DATABASE db1;", nil, sqltx)
	handleErr(err)

	// creates a table
	_, _, err = engine.Exec(`
		CREATE TABLE journal (
			id INTEGER,
			date TIMESTAMP,
			creditaccount INTEGER,
			debitaccount INTEGER,
			amount INTEGER,
			description VARCHAR,
			PRIMARY KEY id
		);`, nil, sqltx)
	handleErr(err)

	// insert some rows
	_, _, err = engine.Exec(`
		INSERT INTO journal (
			id,
			date,
			creditaccount,
			debitaccount,
			amount,
			description
		) VALUES 
			(1, NOW(), 100, 0, 4000, 'CREDIT'),
			(2, NOW(), 0, 50, 4100, 'DEBIT')
		;`, nil, sqltx)
	handleErr(err)

	// query data including ongoing and unconfirmed changes
	rowReader, err := engine.Query(`
			SELECT id, date, creditaccount, debitaccount, amount, description
			FROM journal
			WHERE amount > @value;
	`, map[string]interface{}{"value": 100}, sqltx)
	handleErr(err)

	// ensure row reader is closed
	defer rowReader.Close()

	// selected columns can be read from the rowReader
	cols, err := rowReader.Columns()
	handleErr(err)

	for {
		// iterate over result set
		row, err := rowReader.Read()
		if err == sql.ErrNoMoreRows {
			break
		}
		handleErr(err)

		// each row contains values for the selected columns
		log.Printf("row: %v\n", row.Values[cols[0].Selector()].Value())
	}

	// close row reader
	rowReader.Close()

	// commit ongoing transaction
	_, _, err = engine.Exec("COMMIT;", nil, sqltx)
	handleErr(err)
}
```

If you need to change options like where things get stored by default, you can do that in the underlying store objects that the SQL engine is using.

</WrappedSection>
