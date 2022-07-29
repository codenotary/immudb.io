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

	_, err = client.CreateDatabaseV2(
		ctx,
		"mydb",
		&schema.DatabaseNullableSettings{
			// this setting determines how many transactions
			// can be handled concurrently
			MaxConcurrency: &schema.NullableUint32{Value: 10},
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	_, err = client.UseDatabase(ctx, &schema.Database{
		DatabaseName: "mydb",
	})
	if err != nil {
		log.Fatal(err)
	}

	// writing in mydb
	_, err = client.Set(ctx, []byte(`key`), []byte(`val`))
	if err != nil {
		log.Fatal(err)
	}
}
