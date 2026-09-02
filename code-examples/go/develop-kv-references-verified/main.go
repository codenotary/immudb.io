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
		[]byte(`secondKey`),
		[]byte(`secondValue`),
	)
	if err != nil {
		log.Fatal(err)
	}
	reference, err := client.VerifiedSetReference(
		context.TODO(),
		[]byte(`mySecondTag`),
		[]byte(`secondKey`),
	)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)

	secondItem, err := client.Get(
		context.TODO(),
		[]byte(`mySecondTag`),
	)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", secondItem)
}
