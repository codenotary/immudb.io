package main

import (
	"context"
	"log"
	"strings"
	"time"

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

	_, err = client.ExpirableSet(
		context.TODO(),
		[]byte("expirableKey"),
		[]byte("expirableValue"),
		time.Now(),
	)
	if err != nil {
		log.Fatal(err)
	}

	// the following will raise an error with key not found
	_, err = client.Get(
		context.TODO(),
		[]byte("expirableKey"),
	)
	if err == nil || !strings.Contains(err.Error(), "key not found") {
		log.Fatalf("expecting key not found error: %v", err)
	}
}
