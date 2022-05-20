# Altering tables

immudb supports limited table altering.
The supported operations are lightweight.
They do not require any changes to already written row data
and there is no performance penalty on read/write operations
in such altered tables.

<WrappedSection>

### ADD COLUMN

A new column can be added to an existing table.
Such column must be nullable.
For rows that already existed in the table before the alter operation,
the value of the newly added column will be read as `NULL`.
New column can not be set as `AUTO_INCREMENT` which is only allowed for the primary key.

```sql
ALTER TABLE customers
ADD COLUMN created_time TIMESTAMP;

SELECT customer_name, created_time
FROM customers;
```

</WrappedSection>

<WrappedSection>

### RENAME COLUMN

An existing column can be renamed.
The column with the new name must not exist in the table
when performing the alter operation.
If the column was previously part of an index,
such index will continue working with the new column name.
Renaming a column does not change column's type.

```sql
ALTER TABLE customers
RENAME COLUMN created_time TO created_at;

SELECT customer_name, created_at
FROM customers;
```

</WrappedSection>