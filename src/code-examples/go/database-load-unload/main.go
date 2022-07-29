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

	err := client.OpenSession(ctx, []byte(`immudb`), []byte(`immudb`), "defaultdb")
	if err != nil {
		log.Fatal(err)
	}
	defer client.CloseSession(ctx)

	unloadRes, err := client.UnloadDatabase(ctx, &schema.UnloadDatabaseRequest{
		Database: "mydb",
	})
	if err != nil {
		log.Fatal(err)
	}

	log.Print("Database unloaded, server response: ", unloadRes)

	// Do db maintenance - e.g. backup physical files from disk

	loadRes, err := client.LoadDatabase(ctx, &schema.LoadDatabaseRequest{
		Database: "mydb",
	})
	if err != nil {
		log.Fatal(err)
	}

	log.Print("Database loaded, server response: ", loadRes)
}
