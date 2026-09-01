package main

import (
	"context"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
	client := immudb.NewClient()
	ctx := context.Background()

	err := client.OpenSession(
		ctx,
		[]byte(`immudb`),
		[]byte(`immudb`),
		"defaultdb",
	)
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(ctx)

	res, err := client.DatabaseListV2(ctx)
	if err != nil {
		log.Fatal(err)
	}

	for _, db := range res.Databases {
		log.Printf(
			"database: %s, loaded: %v",
			db.Name,
			db.Loaded,
		)
	}
}
