
## SQL operations with immuclient

In addition to a key-value store, immudb supports the relational model (SQL). For example, to a table:

```
immuclient exec "CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);"
sql ok, Ctxs: 1 Dtxs: 0
```

To insert data, use `UPSERT` (insert or update), which will add an entry, or overwrite it if already exists (based on the primary key):

```
immuclient exec "UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 10000);"
sql ok, Ctxs: 0 Dtxs: 1
immuclient exec "UPSERT INTO people(id, name, salary) VALUES (2, 'Bob', 30000);"
sql ok, Ctxs: 0 Dtxs: 1
```

To query the data you can use the traditional `SELECT`:

```
immuclient query "SELECT id, name, salary FROM people;"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     10000 |
|                     2 | Bob                     |                     30000 |
+-----------------------+-------------------------+---------------------------+
```

If we upsert again on the primary key "1", the value for "Joe" will be overwriten:

```
immuclient exec "UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 20000);"
sql ok, Ctxs: 0 Dtxs: 1

immuclient query "SELECT id, name, salary FROM people;"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     20000 |
|                     2 | Bob                     |                     30000 |
+-----------------------+-------------------------+---------------------------+
```

### Time travel

Now, remember immudb is a immutable database. History is always preserved. With immudb you can travel in time!

```
immuclient query "SELECT id, name, salary FROM people WHERE name='Joe';"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     20000 |
+-----------------------+-------------------------+---------------------------+
```

Eg. before the update:

```
immuclient query "SELECT id, name, salary FROM (people BEFORE TX 3) WHERE name='Joe';"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
|                     1 | Joe                     |                     10000 |
+-----------------------+-------------------------+---------------------------+
```

or even before the first time insert (guess what, it is empty!):

```
immuclient query "SELECT id, name, salary FROM (people BEFORE TX 1) WHERE name='Joe';"
+-----------------------+-------------------------+---------------------------+
| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |
+-----------------------+-------------------------+---------------------------+
+-----------------------+-------------------------+---------------------------+
```

You can even `TABLE` a table with itself in the past. Imagine you want to see how people salary changed between two points in time:

```
immuclient query "SELECT peoplenow.id, peoplenow.name, peoplethen.salary, peoplenow.salary FROM (people BEFORE TX 3 AS peoplethen) INNER JOIN (people AS peoplenow) ON peoplenow.id=peoplethen.id;"
+--------------------------+----------------------------+-------------------------------+------------------------------+
| (DEFAULTDB PEOPLENOW ID) | (DEFAULTDB PEOPLENOW NAME) | (DEFAULTDB PEOPLETHEN SALARY) | (DEFAULTDB PEOPLENOW SALARY) |
+--------------------------+----------------------------+-------------------------------+------------------------------+
|                        1 | Joe                        |                         10000 |                        20000 |
|                        2 | Bob                        |                         30000 |                        30000 |
+--------------------------+----------------------------+-------------------------------+------------------------------+
```

