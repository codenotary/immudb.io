# CLI tools

<WrappedSection>

## immuadmin

You may download the immuadmin binary from [the latest releases on Github](https://github.com/codenotary/immudb/releases/latest). Once you have downloaded immuadmin, rename it to `immuadmin`, make sure to mark it as executable, then run it. The following example shows how to obtain v1.2.4 for Linux amd64:

```bash
$ wget https://github.com/vchain-us/immudb/releases/download/v1.2.4/immuadmin-v1.2.4-linux-amd64
$ mv immuadmin-v1.2.4-linux-amd64 immuadmin
$ chmod +x immuadmin
```

Alternatively, you may [pull immuclient docker image from DockerHub](https://hub.docker.com/r/codenotary/immuadmin) and run it in a ready-to-use container:

```bash
$ docker run -it --rm --name immuadmin codenotary/immuadmin:latest status
```

</WrappedSection>

<WrappedSection>

### Basic operations

Immuadmin is the admin client for immudb. This is used for a variety of tasks such as creating and updating databases and users. Creating backups, restoring from backups etc.

To get started we need to login to `immuadmin` first. The `admin` user is the similar to the `root` user in MySQL etc.

```bash
$ ./immuadmin login immudb
Password: immudb
```

Once logged in we can create a new database using

```bash
$ ./immuadmin database create mydatabase
database 'mydatabase' {replica: false} successfully created
```

Switching to our newly created database. Using immuclient once you are logged in you can select the database you would like to using

```bash
$ ./immuclient use mydatabase
Now using mydatabase
```

</WrappedSection>

<WrappedSection>

## immuclient

You may download the immuclient binary from [the latest releases on Github](https://github.com/codenotary/immudb/releases/latest). Once you have downloaded immuclient, rename it to `immuclient`, make sure to mark it as executable, then run it. The following example shows how to obtain v1.2.4 for Linux amd64:

```bash
$ wget https://github.com/vchain-us/immudb/releases/download/v1.2.4/immuclient-v1.2.4-linux-amd64
$ mv immuclient-v1.2.4-linux-amd64 immuclient
$ chmod +x immuclient
```

Alternatively, you may [pull immuclient docker image from DockerHub](https://hub.docker.com/r/codenotary/immuclient) and run it in a ready-to-use container:

```bash
$ docker run -it --rm --net host --name immuclient codenotary/immuclient:latest
```

</WrappedSection>

<WrappedSection>

### Basic operations

Before any operations can be run by immuclient, it is necessary to authenticate against the running immudb server.

When immudb is first run, it is ready to use immediately with the default database and credentials:

- Database name: defaultdb
- User: immudb
- Password: immudb
- Address: 127.0.0.1
- Port: 3322

To display all available options and their description run:

```bash
$ ./immudb help
```

Running `login immudb` from within immuclient will use the default database name and port. All you need to supply is the user and password:

```bash
$ ./immuclient login immudb
Password: immudb
```

While immudb supports `set` and `get` for key-value storing and retrieving, its immutability means that we can verify the integrity of the underlying Merkle tree. To do this, we use the `safeset` and `safeget` commands. Let's try setting a value of `100` for the key `balance`:

```bash
$ ./immuclient safeset balance 100
tx:             2
key:            balance
value:          100
verified:       true
```

Then, we can immediately overwrite the key `balance` with a value of `9001` instead:

```bash
$ ./immuclient safeset balance 9001
tx:             3
key:            balance
value:          9001
verified:       true
```

If we try to retrieve the current value of key `balance`, we should get `9001`:

```bash
$ ./immuclient safeget balance
tx:             3
key:            balance
value:          9001
verified:       true 
```

Note that at each step so far, the `verified` flag is set to true. This ensures that the Merkle tree remains consistent for each transaction.

We can show the history of transactions for key `balance` using the `history` command:

```bash
$ ./immuclient history balance
tx:             2
key:            balance
value:          100

tx:             3
key:            balance
value:          9001
```

</WrappedSection>

<WrappedSection>

### SQL operations

In addition to a key-value store, immudb supports the relational model (SQL). For example, to create a table:

```bash
$ ./immuclient exec "CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);"
Updated rows: 0
```

To insert data, use `UPSERT` (insert or update), which will add an entry, or overwrite it if already exists (based on the primary key):

```bash
$ ./immuclient exec "UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 10000);"
Updated rows: 1
$ ./immuclient exec "UPSERT INTO people(id, name, salary) VALUES (2, 'Bob', 30000);"
Updated rows: 1
```

To query the data you can use the traditional `SELECT`:

```bash
$ ./immuclient query "SELECT id, name, salary FROM people;"
+------------------------+--------------------------+----------------------------+
| (MYDATABASE PEOPLE ID) | (MYDATABASE PEOPLE NAME) | (MYDATABASE PEOPLE SALARY) |
+------------------------+--------------------------+----------------------------+
|                      1 | "Joe"                    |                      10000 |
|                      2 | "Bob"                    |                      30000 |
+------------------------+--------------------------+----------------------------+
```

If we upsert again on the primary key "1", the value for "Joe" will be overwritten:

```bash
$ ./immuclient exec "UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 20000);"
Updated rows: 1

$ ./immuclient query "SELECT id, name, salary FROM people;"
+------------------------+--------------------------+----------------------------+
| (MYDATABASE PEOPLE ID) | (MYDATABASE PEOPLE NAME) | (MYDATABASE PEOPLE SALARY) |
+------------------------+--------------------------+----------------------------+
|                      1 | "Joe"                    |                      20000 |
|                      2 | "Bob"                    |                      30000 |
+------------------------+--------------------------+----------------------------+
```

</WrappedSection>

<WrappedSection>

### Time travel

immudb is a immutable database. History is always preserved. With immudb you can travel in time!

```bash
$ ./immuclient query "SELECT id, name, salary FROM people WHERE name='Joe';"
+------------------------+--------------------------+----------------------------+
| (MYDATABASE PEOPLE ID) | (MYDATABASE PEOPLE NAME) | (MYDATABASE PEOPLE SALARY) |
+------------------------+--------------------------+----------------------------+
|                      1 | "Joe"                    |                      20000 |
+------------------------+--------------------------+----------------------------+
```

We can see the current transaction id using 'current':

```bash
$ ./immuclient current
database:       mydatabase
txID:           5
hash:           2986dfeb2d15e55d8189f08c2508318addabe9e773e0b6e329cf23b654cc22e7
```

This is the transaction id we will be using for the subsequent queries.
  
Eg. before the update:

```bash
$ ./immuclient query "SELECT id, name, salary FROM people BEFORE TX 5 WHERE name='Joe';"
+------------------------+--------------------------+----------------------------+
| (MYDATABASE PEOPLE ID) | (MYDATABASE PEOPLE NAME) | (MYDATABASE PEOPLE SALARY) |
+------------------------+--------------------------+----------------------------+
|                      1 | "Joe"                    |                      10000 |
+------------------------+--------------------------+----------------------------+
```

or even before the first time insert (guess what, it is empty!):

```bash
$ ./immuclient query "SELECT id, name, salary FROM people BEFORE TX 1 WHERE name='Joe';"
+------------------------+--------------------------+----------------------------+
| (MYDATABASE PEOPLE ID) | (MYDATABASE PEOPLE NAME) | (MYDATABASE PEOPLE SALARY) |
+------------------------+--------------------------+----------------------------+
+------------------------+--------------------------+----------------------------+
```

You can even `TABLE` a table with itself in the past. Imagine you want to see how people salary changed between two points in time:

```bash
$ ./immuclient query "SELECT peoplenow.id, peoplenow.name, peoplethen.salary, peoplenow.salary FROM people BEFORE TX 5 AS peoplethen INNER JOIN people AS peoplenow ON peoplenow.id=peoplethen.id;"
+---------------------------+-----------------------------+--------------------------------+-------------------------------+
| (MYDATABASE PEOPLENOW ID) | (MYDATABASE PEOPLENOW NAME) | (MYDATABASE PEOPLETHEN SALARY) | (MYDATABASE PEOPLENOW SALARY) |
+---------------------------+-----------------------------+--------------------------------+-------------------------------+
|                         1 | "Joe"                       |                          10000 |                         20000 |
|                         2 | "Bob"                       |                          30000 |                         30000 |
+---------------------------+-----------------------------+--------------------------------+-------------------------------+
```

</WrappedSection>

<WrappedSection>

### KV Data revisions

Whenever a new value is stored under given key, immudb saves a new revision of that data.
Revision numbers start with 1 - the first value ever written to the database will have
a revision number 1, the second will have 2 and so on.

When reading a value from immudb, an explicit revision number can be specified.
If the provided number is greater than 0, a value for given revision is retrieved.
If the provided number is less than 0, the nth previous value is retrieved.

```bash
$ ./immuclient set key value1
tx:       2
rev:      1
key:      key
value:    value1

$ ./immuclient set key value2
tx:       3
rev:      2
key:      key
value:    value2

$ ./immuclient set key value3
tx:       4
rev:      3
key:      key
value:    value3

$ ./immuclient get key@1  # Get the key at the first revision
tx:       2
rev:      1
key:      key
value:    value1

$ ./immuclient get key@-1  # Get the key at the previous revision
tx:       3
rev:      2
key:      key
value:    value2
```

The immuclient tool has also the possibility to restore a previous revision for given key.

```bash
$ ./immuclient restore key@-2
tx:       5
rev:      4
key:      key
value:    value1
```

### Querying for keys containing revision separator

In some cases, the key can already contain the `@` character reserved for key separator.
In such case there are few options to read such key. The revision separator can be changed
to any other string that is not part of the key. Also because immuclient will only scan
the last occurrence of the revision separator, an explicit 0th revision can be set to read
the current value behind such key.

```bash
$ ./immuclient set some@email.address active
tx:       2
rev:      1
key:      some@email.address
value:    active

# Change the revision separator with environment variable
$ IMMUCLIENT_REVISION_SEPARATOR="###" ./immuclient get some@email.address
tx:     2
key:    some@email.address
value:  active
hash:   138033b5a89438758fdb3481ba0dc44816d550749f799223587cb30cd7eadf5a

# Disable / change the revision separator through command-line argument
$ ./immuclient get --revision-separator="" some@email.address
tx:       2
rev:      1
key:      some@email.address
value:    active

# Always use the revision number, use 0 for the current value
$ ./immuclient get some@email.address@0
tx:       2
rev:      1
key:      some@email.address
value:    active
```

</WrappedSection>