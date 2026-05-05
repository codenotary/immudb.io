package main

import (
	"context"
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
	ctx := context.Background()

	// create/open immudb store at specified path
	// multi-indexing must be enabled for the SQL engine
	st, err := store.Open("data", store.DefaultOptions().WithMultiIndexing(true))
	handleErr(err)
	defer st.Close()

	// initialize sql engine (specify a key-prefix to isolate generated kv entries)
	engine, err := sql.NewEngine(st, sql.DefaultOptions().WithPrefix([]byte("sql")))
	handleErr(err)

	// CREATE DATABASE / USE DATABASE statements are not used here:
	// they require a MultiDBHandler to be supplied via sql.DefaultOptions().WithMultiDBHandler(...),
	// and are typically not needed for single-database embedded usage.

	// a sql tx is created and carried over next statements
	sqltx, _, err := engine.Exec(ctx, nil, "BEGIN TRANSACTION;", nil)
	handleErr(err)

	// ensure tx is closed (it won't affect committed tx)
	defer engine.Exec(ctx, sqltx, "ROLLBACK;", nil)

	// creates a table
	_, _, err = engine.Exec(ctx, sqltx, `
		CREATE TABLE journal (
			id INTEGER,
			date TIMESTAMP,
			creditaccount INTEGER,
			debitaccount INTEGER,
			amount INTEGER,
			description VARCHAR,
			PRIMARY KEY id
		);`, nil)
	handleErr(err)

	// insert some rows
	_, _, err = engine.Exec(ctx, sqltx, `
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
		;`, nil)
	handleErr(err)

	// query data including ongoing and unconfirmed changes
	rowReader, err := engine.Query(ctx, sqltx, `
			SELECT id, date, creditaccount, debitaccount, amount, description
			FROM journal
			WHERE amount > @value;
	`, map[string]interface{}{"value": 100})
	handleErr(err)

	// ensure row reader is closed
	defer rowReader.Close()

	// selected columns can be read from the rowReader
	cols, err := rowReader.Columns(ctx)
	handleErr(err)

	for {
		// iterate over result set
		row, err := rowReader.Read(ctx)
		if err == sql.ErrNoMoreRows {
			break
		}
		handleErr(err)

		// each row contains values for the selected columns
		log.Printf("row: %v\n", row.ValuesBySelector[cols[0].Selector()].RawValue())
	}

	// close row reader
	rowReader.Close()

	// commit ongoing transaction
	_, _, err = engine.Exec(ctx, sqltx, "COMMIT;", nil)
	handleErr(err)
}
