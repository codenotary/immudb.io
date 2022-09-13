package main

import (
	"context"
	"log"

	"github.com/codenotary/immudb/pkg/api/schema"
	immudb "github.com/codenotary/immudb/pkg/client"
	immuerrors "github.com/codenotary/immudb/pkg/client/errors"
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

	_, err = client.Set(context.TODO(), []byte("key"), []byte("value"))
	if err != nil {
		log.Fatal(err)
	}

	// ensure modification is done atomically when there are concurrent writers

	entry, err := client.Get(context.TODO(), []byte("key"))
	if err != nil {
		log.Fatal(err)
	}

	_, err = client.SetAll(context.TODO(), &schema.SetRequest{
		KVs: []*schema.KeyValue{{
			Key:   []byte("key"),
			Value: []byte("value2"),
		}},
		Preconditions: []*schema.Precondition{
			schema.PreconditionKeyNotModifiedAfterTX(
				[]byte("key"),
				entry.Tx,
			),
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	// allow setting the key only once

	_, err = client.SetAll(context.TODO(), &schema.SetRequest{
		KVs: []*schema.KeyValue{
			{Key: []byte("key-once"), Value: []byte("val")},
		},
		Preconditions: []*schema.Precondition{
			schema.PreconditionKeyMustNotExist([]byte("key-once")),
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	// set only one key in a group of keys

	_, err = client.SetAll(context.TODO(), &schema.SetRequest{
		KVs: []*schema.KeyValue{
			{Key: []byte("key-group-1"), Value: []byte("val1")},
		},
		Preconditions: []*schema.Precondition{
			schema.PreconditionKeyMustNotExist([]byte("key-group-2")),
			schema.PreconditionKeyMustNotExist([]byte("key-group-3")),
			schema.PreconditionKeyMustNotExist([]byte("key-group-4")),
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	// check if returned error indicates precondition failure

	_, err = client.SetAll(context.TODO(), &schema.SetRequest{
		KVs: []*schema.KeyValue{
			{Key: []byte("key-missing"), Value: []byte("val")},
		},
		Preconditions: []*schema.Precondition{
			schema.PreconditionKeyMustExist([]byte("key-missing")),
		},
	})
	immuErr := immuerrors.FromError(err)
	if immuErr != nil && immuErr.Code() == immuerrors.CodIntegrityConstraintViolation {
		log.Println("Constraint validation failed")
	}

}
