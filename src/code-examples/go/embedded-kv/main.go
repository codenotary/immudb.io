package main

import (
	"fmt"
	"log"

	"github.com/codenotary/immudb/embedded/store"
)

func handleErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	// create/open immudb store at specified path
	st, err := store.Open("data", store.DefaultOptions())
	handleErr(err)

	// close the store to free resources
	defer st.Close()

	// create a transaction
	tx, err := st.NewTx()
	handleErr(err)

	// ensure tx is closed (it won't affect committed tx)
	defer tx.Cancel()

	// write key-value pair into the tx context, no change will be applied yet
	err = tx.Set([]byte("hello"), nil, []byte("immutable-world!"))
	handleErr(err)

	// transaction is committed and changes are applied
	hdr, err := tx.Commit()
	handleErr(err)

	fmt.Printf("tx %d successfully committed\n", hdr.ID)

	// fetch the latest entry of a key
	// dsue to performance considerations, only metadata, hash, and size are returned at first
	valRef, err := st.Get([]byte("hello"))
	handleErr(err)

	// read the actual value
	val, err := valRef.Resolve()
	handleErr(err)

	fmt.Printf("key '%s' = '%s' found at tx %d (%d key-updates)\n", []byte("hello"), val, valRef.Tx(), valRef.HC())
}
