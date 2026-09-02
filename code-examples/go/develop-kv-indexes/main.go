package main

import (
	"context"
	"encoding/json"
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

	i1, err := client.Set(

		context.TODO(),
		[]byte(`user1`),
		[]byte(`user1@mail.com`),
	)
	if err != nil {
		log.Fatal(err)
	}
	i2, err := client.Set(
		context.TODO(),
		[]byte(`user2`),
		[]byte(`user2@mail.com`),
	)
	if err != nil {
		log.Fatal(err)
	}
	i3, err := client.Set(
		context.TODO(),
		[]byte(`user3`),
		[]byte(`user3@mail.com`),
	)
	if err != nil {
		log.Fatal(err)
	}
	i4, err := client.Set(
		context.TODO(),
		[]byte(`user3`),
		[]byte(`another-user3@mail.com`),
	)
	if err != nil {
		log.Fatal(err)
	}

	if _, err = client.ZAddAt(
		context.TODO(),
		[]byte(`age`), 25, []byte(`user1`), i1.Id,
	); err != nil {
		log.Fatal(err)
	}
	if _, err = client.ZAddAt(
		context.TODO(),
		[]byte(`age`), 36, []byte(`user2`), i2.Id,
	); err != nil {
		log.Fatal(err)
	}
	if _, err = client.ZAddAt(
		context.TODO(),
		[]byte(`age`), 36, []byte(`user3`), i3.Id,
	); err != nil {
		log.Fatal(err)
	}
	if _, err = client.ZAddAt(
		context.TODO(),
		[]byte(`age`), 54, []byte(`user3`), i4.Id,
	); err != nil {
		log.Fatal(err)
	}

	zscanOpts1 := &schema.ZScanRequest{
		Set:      []byte(`age`),
		SinceTx:  math.MaxUint64,
		NoWait:   true,
		MinScore: &schema.Score{Score: 36},
	}

	the36YearsOldList, err := client.ZScan(context.TODO(), zscanOpts1)
	if err != nil {
		log.Fatal(err)
	}
	s, _ := json.MarshalIndent(the36YearsOldList, "", "\t")
	fmt.Print(string(s))

	oldestReq := &schema.ZScanRequest{
		Set:       []byte(`age`),
		SeekKey:   []byte{0xFF},
		SeekScore: math.MaxFloat64,
		SeekAtTx:  math.MaxUint64,
		Limit:     1,
		Desc:      true,
		SinceTx:   math.MaxUint64,
		NoWait:    true,
	}

	oldest, err := client.ZScan(context.TODO(), oldestReq)
	if err != nil {
		log.Fatal(err)
	}
	s, _ = json.MarshalIndent(oldest, "", "\t")
	fmt.Print(string(s))
}
