package main

import (
	"context"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
	"google.golang.org/protobuf/types/known/emptypb"
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

	// partial index cleanup
	_, err = client.FlushIndex(
		context.TODO(),
		0.1,   // Cleanup percentage, this % of index nodes data will be scanned for unreferenced data
		false, // if true, fsync after writing data to avoid index regeneration in the case of an unexpected crash
	)
	if err != nil {
		log.Fatal(err)
	}

	// full async index cleanup
	err = client.CompactIndex(context.TODO(), &emptypb.Empty{})
	if err != nil {
		log.Fatal(err)
	}
}
