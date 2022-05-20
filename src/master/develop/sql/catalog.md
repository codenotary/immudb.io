# Catalog queries

immudb provides a set of useful built-in functions that can be used to query the catalog.

### Listing databases

The `DATABASES()` function can be used as a source of data returning the list of databases
that can be accessed by the user running the query.

```sql
SELECT * FROM DATABASES();
```

This source can also be constrained using the `WHERE` clause and the set of columns to retrieve.

```sql
SELECT name FROM DATABASES() WHERE name LIKE '.*db1.*';
```

### Listing tables

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

### Listing columns of a table

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

</WrappedSection>
