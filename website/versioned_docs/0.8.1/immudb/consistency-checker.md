# Consistency checker
## How do you run it?
It is part of immudb, enabled by default and runs as a thread of immudb.
The routine can be disabled as follows:
```bash
./immudb --consistency-check=false
```

## What does it check?
Consistency checker runs in a loop and continuously checks if the elements stored inside the immudb Merkle-tree are also physically stored correctly on the disk (the digest of the disk elements is the same digest stored in the related Merkle-tree leaf)

## How does it run its check?
### Steps:
1. reading the last root and last index stored in immudb
2. generate a range between 0 and the length of the Merkle-tree level 0 (total number of elements stored)
3. shuffles the range to get a random scan list (to be unpredictable)
4. check if every element is correctly inserted in the Merkle-tree and if the Merkle-tree leaves correctly represent the elements stored on hard disk
5. after completing the loop, the process sleeps ten seconds and restarts from scratch with a new root and index
6. in case an element does not pass the check correctly, immudb is immediately stopped and prints out a log message

In order to produce a corrupted entry that is only on disk and not in the Merkle-tree, stop the immudb process and use the [nimmu](https://github.com/codenotary/immudb/blob/master/tools/nimmu/nimmu.go) command:
```bash
go build tools/nimmu/nimmu.go
./nimmu rawset key1 tamper
```
Then restart immudb and should see the consistency check printing an error.
