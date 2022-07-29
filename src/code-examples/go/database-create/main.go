package main

import (
	"context"
	"log"

	"github.com/codenotary/immudb/pkg/api/schema"
	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
	client := immudb.NewClient()
	ctx := context.Background()

	err := client.OpenSession(ctx,
		[]byte(`immudb`),
		[]byte(`immudb`),
		"defaultdb",
	)
	if err != nil {
		log.Fatal(err)
	}

	defer client.CloseSession(ctx)

	res, err := client.CreateDatabaseV2(
		ctx,
		"mydb",
		&schema.DatabaseNullableSettings{
			// this setting determines how many
			// transactions can be handled concurrently
			MaxConcurrency: &schema.NullableUint32{Value: 10},
		},
	)
	if err != nil {
		log.Fatal(err)
	}
	log.Print("Database created, server response: ", res)
}
