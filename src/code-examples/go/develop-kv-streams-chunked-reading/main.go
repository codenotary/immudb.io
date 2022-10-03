package main

import (
	"context"
	"fmt"
	"io"
	"log"

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

	sc := client.GetServiceClient()
	gs, err := sc.StreamGet(
		context.TODO(),
		&schema.KeyRequest{
			Key: []byte("key"),
		},
	)
	if err != nil {
		log.Fatal(err)
	}
	kvr := stream.NewKvStreamReceiver(
		stream.NewMsgReceiver(gs),
		stream.DefaultChunkSize,
	)

	key, vr, err := kvr.Next()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("read %s key", key)

	chunk := make([]byte, 4096)
	for {
		l, err := vr.Read(chunk)
		if err != nil && err != io.EOF {
			log.Fatal(err)
		}
		if err == io.EOF {
			break
		}
		fmt.Printf("read %d byte\n", l)
	}
}
