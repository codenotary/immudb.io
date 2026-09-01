package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/codenotary/immudb/pkg/api/schema"
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

	tx, err := client.Set(
		context.TODO(),
		[]byte("1,2,3"),
		[]byte("3,2,1"),
	)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Successfully committed tx %d\n", tx.Id)

	entry, err := client.Get(
		context.TODO(),
		[]byte("1,2,3"),
	)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Successfully retrieved entry: %v\n", entry)

	_, err = client.Delete(context.TODO(), &schema.DeleteKeysRequest{
		Keys: [][]byte{
			[]byte("1,2,3"),
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	// the following will raise an error with key not found
	_, err = client.Get(
		context.TODO(),
		[]byte("1,2,3"),
	)
	if err == nil || !strings.Contains(err.Error(), "key not found") {
		log.Fatalf("expecting key not found error: %v", err)
	}
}
