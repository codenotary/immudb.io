# Indexes

<WrappedSection>

immudb indexes can be used for a quick search of rows
with columns having specific values.

Certain operations such as ordering values with `ORDER BY` clause
require columns to be indexed.

```sql
CREATE INDEX ON customers(customer_name);
CREATE INDEX ON customers(country, ip);
CREATE INDEX IF NOT EXISTS ON customers(active);
CREATE UNIQUE INDEX ON customers(email);
```

Index can only be added to an empty table.

Index do not have explicit name and is referenced by the ordered list of indexed columns.

### Column value constraints

Columns of `BLOB` or `VARCHAR` type must have a size limit set on them.
The maximum allowed value size for one indexed column is 256 bytes.

### Unique indexes

Index can be marked as unique with extra `UNIQUE` keyword.
Unique index will prevent insertion of new data into the table
that would violate uniqueness of indexed columns within the table.

### Multi-column indexes

Index can be set on up to 8 columns.
The order of columns is important when doing range scans,
iterating over such index will first sort by the value of the first column,
then by the second and so on.

Note:
Large indexes will increase the storage requirement and will reduce the performance of data insertion.
Iterating using small indexes will also be faster than with the large ones.

### IF NOT EXISTS

With this clause the `CREATE INDEX` statement will not fail if an index with same type and list of columns already exists.
This includes a use case where the table is not empty which can be used to simplify database schema initialization.

Note: If the index already exists, it is not compared against the provided index definition neither it is
      updated to match it.

</WrappedSection>

<WrappedSection>

### DROP INDEX

An index can be physically deleted. Table data is not deleted and can be queried using either the primary index or any other declared index. Non-unique indexes can be created at any time.

```sql
DROP INDEX ON customers(surname);
```

</WrappedSection>