# Catalog queries

<WrappedSection>

immudb provides a set of useful built-in functions that can be used to query the catalog.

</WrappedSection>

<WrappedSection>

## Listing databases

The `DATABASES()` function can be used as a source of data returning the list of databases
that can be accessed by the user running the query.

```sql
SELECT * FROM DATABASES();
```

This source can also be constrained using the `WHERE` clause and the set of columns to retrieve.

```sql
SELECT name FROM DATABASES() WHERE name LIKE '.*db1.*';
```

Alternatively, the `SHOW DATABASES` statement returns the list of databases that can be accessed by the current user.

</WrappedSection>

<WrappedSection>

## Listing tables

The `TABLES()` function can be used as a source of data returning the list of tables in the
currently selected database.

```sql
SELECT * FROM TABLES();
```

This source can also be constrained using the `WHERE` clause and the set of columns to retrieve.

```sql
SELECT name FROM TABLES()
WHERE name like '.*est.*'
```

Alternatively, the `SHOW TABLES` statement returns the list of tables in the currently selected database.

</WrappedSection>

<WrappedSection>

## Listing columns of a table

The `COLUMNS()` function returns the list of columns for a table. It takes a single argument which is the name of the table.
The table will be looked up in the currently selected database.

```sql
SELECT * FROM COLUMNS('mytable');
```

This source can also be constrained with the WHERE clause and set of columns to retrieve.

Note: because colum names can use reserved identifiers such as `table`, make sure to enclose those in double-quotes.

```sql
SELECT "table", "name", "type" FROM COLUMNS('mytable');
SELECT name FROM COLUMNS('mytable') WHERE type = 'VARCHAR';
```

Alternatively, the `SHOW TABLE mytable` statement will returns the list of columns for the specified table.

</WrappedSection>

<WrappedSection>

## Listing indexes of a table

The `INDEXES()` function returns a list of indexes for a table. It takes a single argument which is the name of the table.
The table will be looked up in the currently selected database.

```sql
SELECT * FROM INDEXES('mytable');
```

This source can also be constrained with the WHERE clause and set of columns to retrieve.

Note: because colum names can use reserved identifiers such as `table`, make sure to enclose those in double-quotes.

```sql
SELECT "table", "name", "unique", "primary" FROM INDEXES('mytable');
SELECT name FROM INDEXES('mytable') WHERE "unique";
```

</WrappedSection>
