package main

import (
	"context"
	"fmt"
	"log"
	"math"

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

	_, err = client.Set(context.TODO(), []byte(`aaa`), []byte(`item1`))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(context.TODO(), []byte(`bbb`), []byte(`item2`))
	if err != nil {
		log.Fatal(err)
	}
	_, err = client.Set(context.TODO(), []byte(`abc`), []byte(`item3`))
	if err != nil {
		log.Fatal(err)
	}

	scanReq := &schema.ScanRequest{
		Prefix: []byte(`a`),
	}

	list, err := client.Scan(context.TODO(), scanReq)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", list)
	scanReq1 := &schema.ScanRequest{
		SeekKey: []byte{0xFF},
		Prefix:  []byte(`a`),
		Desc:    true,
	}

	list, err = client.Scan(context.TODO(), scanReq1)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", list)

	// scan on all key  values on the current database, with a fresh snapshot
	scanReq2 := &schema.ScanRequest{
		SeekKey: []byte{0xFF},
		Desc:    true,
		SinceTx: math.MaxUint64,
	}

	list, err = client.Scan(context.TODO(), scanReq2)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v\n", list)
}
