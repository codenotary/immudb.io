# Consistency checker
## How you run it?
It’s built as part of immudb and is enabled by default. It runs as a thread within immudb. 
It's possible disable the routine with following options:
```
./immudb --consistency-check=false
``` 
## What does it check?
Consistency checker runs a loop in which it continuously checks if the elements stored inside immudb merkle tree are physically stored correctly on the disk (the digest of the disk element's is the same digest stored in the related merkle tree leaf)

## How does it run its check?
### Steps:
* It starts taking last root and last index stored in immudb.
* It generates a range between 0 and the length of the merkle tree level 0(total number of elements stored)
* In order to be unpredictable it shuffles the range to get a random scan list
* It start to checks if every element is correctly inserted in the tree and if the merkle tree leaves correctly represents the elements stored on hard disk.
* When it completes the loop it sleep ten seconds and restart from the beginning with a new root and index.
* When it found an element that doesn’t pass correctly the corruption check it immediately stop immudb with a log a message.

In order to reproduce a corruption and modify an entry only on disk and not in merkle tree stop immudb and use [nimmu](https://github.com/codenotary/immudb/blob/master/tools/nimmu/nimmu.go) 
```bash
go build tools/nimmu/nimmu.go 
./nimmu rawset key1 tamper
```
At the end restart immudb and should see the consistency check error.
