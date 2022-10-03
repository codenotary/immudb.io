package main

import (
	"context"
	"fmt"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
	"github.com/codenotary/immudb/pkg/stdlib"
)

func main() {
	opts := immudb.DefaultOptions()
	opts.Username = "immudb"
	opts.Password = "immudb"
	opts.Database = "defaultdb"

	db := stdlib.OpenDB(opts)
	defer db.Close()

	_, err := db.ExecContext(
		context.TODO(),
		"CREATE TABLE myTable(id INTEGER, name VARCHAR, PRIMARY KEY id)",
	)
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.ExecContext(
		context.TODO(),
		"INSERT INTO myTable (id, name) VALUES (1, 'immudb1')",
	)
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.QueryContext(
		context.TODO(),
		"SELECT * FROM myTable",
	)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	if !rows.Next() {
		log.Fatal("Did not fetch the row")
	}

	var id uint64
	var name string
	err = rows.Scan(&id, &name)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("id: %d\n", id)
	fmt.Printf("name: %s\n", name)
}
