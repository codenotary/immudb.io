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

	meta, err := client.Set(
		context.TODO(),
		[]byte(`secondKey`),
		[]byte(`secondValue`),
	)
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(
		context.TODO(),
		[]byte(`secondKey`),
		[]byte(`thirdValue`),
	)
	if err != nil {
		log.Fatal(err)
	}
	reference, err := client.VerifiedSetReferenceAt(
		context.TODO(),
		[]byte(`myThirdTag`),
		[]byte(`secondKey`),
		meta.Id,
	)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", reference)

	thirdItem, err := client.Get(
		context.TODO(),
		[]byte(`myThirdTag`),
	)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", thirdItem)
}
