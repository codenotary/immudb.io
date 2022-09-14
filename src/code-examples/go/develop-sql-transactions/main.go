package main

import (
	"context"
	"fmt"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
	opts := immudb.DefaultOptions().
		WithAddress("localhost").
		WithPort(3322)

	client := immudb.NewClient().WithOptions(opts)
	err := client.OpenSession(
		context.TODO(),
		[]byte(`immudb`),
		[]byte(`immudb`),
		"defaultdb",
	)
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(context.TODO())

	tx1, err := client.NewTx(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	err = tx1.SQLExec(
		context.TODO(),
		`CREATE TABLE table1(id INTEGER, PRIMARY KEY id);`,
		nil,
	)
	if err != nil {
		log.Fatal(err)
	}

	err = tx1.SQLExec(
		context.TODO(),
		"INSERT INTO table1(id) VALUES (1234)",
		nil,
	)
	if err != nil {
		log.Fatal(err)
	}

	txh, err := tx1.Commit(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Successfully committed rows %d\n", txh.UpdatedRows)
}
