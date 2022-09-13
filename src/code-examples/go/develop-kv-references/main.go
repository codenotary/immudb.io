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

	_, err = client.Set(
		context.TODO(),
		[]byte(`firstKey`),
		[]byte(`firstValue`),
	)
	if err != nil {
		log.Fatal(err)
	}
	reference, err := client.SetReference(
		context.TODO(),
		[]byte(`myTag`),
		[]byte(`firstKey`),
	)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%v\n", reference)
	firstItem, err := client.Get(
		context.TODO(),
		[]byte(`myTag`),
	)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", firstItem)
}
