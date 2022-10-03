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
		WithServerSigningPubKey("public.key").
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

	_, err = client.Login(
		context.TODO(),
		[]byte(`immudb`),
		[]byte(`immudb`),
	)
	if err != nil {
		log.Fatal(err)
	}

	_, err = client.Set(
		context.TODO(),
		[]byte(`immudb`),
		[]byte(`hello world`),
	)
	if err != nil {
		log.Fatal(err)
	}

	state, err := client.CurrentState(context.TODO())
	if err != nil {
		// if signature is not verified here is trigger an appropriate error
		log.Fatal(err)
	}

	fmt.Print(state)
}
