package main

import (
	"context"
	"log"

	"github.com/codenotary/immudb/pkg/api/schema"
	"github.com/codenotary/immudb/pkg/auth"
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

	err = client.CreateUser(
		context.TODO(),
		[]byte(`myNewUser1`),
		[]byte(`myS3cretPassword!`),
		auth.PermissionR,
		"defaultdb",
	)
	if err != nil {
		log.Fatal(err)
	}

	err = client.ChangePermission(
		context.TODO(),
		schema.PermissionAction_GRANT,
		"myNewUser1",
		"defaultDB",
		auth.PermissionRW,
	)
	if err != nil {
		log.Fatal(err)
	}

	err = client.ChangePassword(
		context.TODO(),
		[]byte(`myNewUser1`),
		[]byte(`myS3cretPassword!`),
		[]byte(`myNewS3cretPassword!`),
	)
	if err != nil {
		log.Fatal(err)
	}
}
