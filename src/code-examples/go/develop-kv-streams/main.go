package main

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/codenotary/immudb/pkg/api/schema"
	immudb "github.com/codenotary/immudb/pkg/client"
	"github.com/codenotary/immudb/pkg/stream"
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

	myFileName := "main.go"
	key1 := []byte("key1")
	val1 := []byte("val1")
	f, err := os.Open(myFileName)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	stats, err := os.Stat(myFileName)
	if err != nil {
		log.Fatal(err)
	}

	kv1 := &stream.KeyValue{
		Key: &stream.ValueSize{
			Content: bytes.NewBuffer(key1),
			Size:    len(key1),
		},
		Value: &stream.ValueSize{
			Content: bytes.NewBuffer(val1),
			Size:    len(val1),
		},
	}
	kv2 := &stream.KeyValue{
		Key: &stream.ValueSize{
			Content: bytes.NewBuffer([]byte(myFileName)),
			Size:    len(myFileName),
		},
		Value: &stream.ValueSize{
			Content: f,
			Size:    int(stats.Size()),
		},
	}

	kvs := []*stream.KeyValue{kv1, kv2}
	_, err = client.StreamSet(context.TODO(), kvs)
	if err != nil {
		log.Fatal(err)
	}
	entry, err := client.StreamGet(context.TODO(), &schema.KeyRequest{Key: []byte(myFileName)})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("returned key %s", entry.Key)
}
