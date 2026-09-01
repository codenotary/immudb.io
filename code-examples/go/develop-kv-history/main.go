package main

import (
	"context"
	"fmt"
	"log"

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

	_, err = client.Set(
		context.TODO(),
		[]byte(`hello`),
		[]byte(`immutable world`),
	)
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(
		context.TODO(),
		[]byte(`hello`),
		[]byte(`immudb`),
	)
	if err != nil {
		log.Fatal(err)
	}

	req := &schema.HistoryRequest{
		Key: []byte(`hello`),
	}

	ret, err := client.History(context.TODO(), req)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf(
		"Successfully retrieved %d entries for key %s\n",
		len(ret.GetEntries()),
		req.Key,
	)
}
