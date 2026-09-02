package main

import (
	"context"
	"fmt"
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

	res, err := client.UpdateDatabaseV2(
		ctx,
		"mydb",
		&schema.DatabaseNullableSettings{
			TxLogCacheSize: &schema.NullableUint32{Value: 1000},
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database settings updated, server response: ", res)
}
