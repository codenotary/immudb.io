
# SQL Reference

<WrappedSection>

## Data types

| Name    | Description | Length constraints |
|---------|-------------|--------------------|
| INTEGER | Signed 64-bit integer value. Usually referred to as `BIGINT` in other databases. | - |
| BOOLEAN | A boolean value, either `TRUE` or `FALSE` | - |
| VARCHAR | UTF8-encoded text | Maximum number of bytes in the UTF-8 encoded representation of the string |
| BLOB    | sequence of bytes | Maximum number of bytes in the sequence |

### Size constraints

Size constraint is specified with a `[MAX_SIZE]` suffix on the type,
e.g. `BLOB[16]` represents a sequence of up to 16 bytes.

### NULL values

`NULL` values in immudb are not unique - two `NULL` values are considered equal on comparisons.

</WrappedSection>

<WrappedSection>

## Creating tables

Common examples of `CREATE TABLE` statements are presented below.

```sql
CREATE TABLE IF NOT EXISTS customers (
    id            INTEGER,
    customer_name VARCHAR[60],
    email         VARCHAR[150],
    address       VARCHAR,
    city          VARCHAR,
    ip            VARCHAR[40],
    country       VARCHAR[15],
    age           INTEGER,
    active        BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
    id      INTEGER,
    product VARCHAR NOT NULL,
    price   VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS orders (
    id         INTEGER AUTO_INCREMENT,
    customerid INTEGER,
    productid  INTEGER,
    PRIMARY KEY id
);

CREATE TABLE customer_review(
    customerid INTEGER,
    productid  INTEGER,
    review     VARCHAR,
    PRIMARY KEY (customerid, productid)
);
```

### `IF NOT EXISTS`

With this clause the `CREATE TABLE` statement will not fail if a table with same name already exists.

Note: If the table already exists, it is not compared against the provided table definition neither it is
      updated to match it.

### `NOT NULL`

Columns marked as not null can not have a null value assigned.

### `PRIMARY KEY`

Every table in immudb must have a primary key.
Primary key can use at least 1 and up to 8 columns.

Columns used in a primary key can not have `NULL` values assigned,
even if those columns are not explicitly marked as `NOT NULL`.

Primary key creates an implicit unique index on all contained columns.

### `AUTO_INCREMENT`

A single-column `PRIMARY KEY` can be marked as `AUTO_INCREMENT`.
immudb will automatically set a unique value of this column for new rows.

When inserting data into a table with an `INSERT` statement,
the value for such primary key must be omitted.
When updating data in such table with `UPSERT` statement,
the value for such primary key is obligatory
and the `UPSERT` statement can only update existing rows.

The type of an `AUTO_INCREMENT` column must be `INTEGER`.
Internally immudb will assign sequentially increasing values for new rows
ensuring this value is unique within a single table.

### Foreign keys

Explicit support for relations to foreign tables is not currently supported in immudb.
It is possible however to create ordinary columns containing foreign key values that can be used in `JOIN` statements.
Application logic is responsible for ensuring data consistency and foreign key constraints.

```sql
SELECT * FROM orders
INNER JOIN customers ON customers.id = orders.customerid
INNER JOIN products ON products.id = orders.productid
```
</WrappedSection>

<WrappedSection>

## Indexes

immudb indexes can be used for a quick search of rows
with columns having specific values.

Certain operations such as ordering values with `ORDER BY` clause
require columns to be indexed.

```sql
CREATE INDEX ON customers(customer_name);
CREATE INDEX ON customers(country, ip);
CREATE INDEX ON customers(active);
CREATE UNIQUE INDEX ON customers(email);
```

Index can only be added to an empty table.

Index do not have explicit name and is referenced by the ordered list of indexed columns.

### Column value constraints

Columns of `BLOB` or `VARCHAR` type must have a size limit set on them.
The maximum allowed value size for one indexed column is 256 bytes.

Values for indexed columns can not be `NULL`
even if the column is not explicitly marked as `NOT NULL`.

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

</WrappedSection>

<WrappedSection>

## Inserting or updating data

### `INSERT`

immudb supports standard `INSERT` sql statement.
It can be used to add one or multiple values within the same transaction.

```sql
INSERT INTO customers (
    id, customer_name, email, address,
    city, ip, country, age, active
)
VALUES (
    1,
    'Isidro Behnen',
    'ibehnen0@mail.ru',
    'ibehnen0@chronoengine.com',
    'Arvika',
    '127.0.0.15',
    'SE',
    24,
    true
);

INSERT INTO products (id, product, price)
VALUES
    ( 1, 'Juice - V8, Tomato', '$4.04' ),
    ( 2, 'Milk', '$3.24' );

INSERT INTO orders (customerid, productid)
VALUES (1, 1), (1, 2);

INSERT INTO customer_review (customerid, productid, review)
VALUES
    (1, 1, "Nice Juice!");
```

### `UPSERT`

`UPSERT` is an operation with a syntax similar to `INSERT`,
the difference between those two is that `UPSERT` either creates a new or replaces an existing row.
A new row is created if an entry with the same primary key does not yet exist in the table, 
otherwise the current row is replaced with the new one.

Currently `UPSERT` can only be performed on tables without secondary indexes
(other than the one used for the primary key).
This constraint will be removed in the future.

If a table contains an `AUTO_INCREMENT` primary key,
the value for that key must be provided
and the `UPSERT` operation will only update the existing row.

```sql
UPSERT INTO products (id, product, price)
VALUES
( 2, 'Milk', '$3.17' ),
( 3, 'Grapes - Red', '$5.03' );

UPSERT INTO orders (id, customerid, productid)
VALUES (1, 1, 3);
```

</WrappedSection>

<WrappedSection>

## Querying


### Selecting all columns

All columns from all joined tables can be queried with `SELECT *` statement.

```sql
SELECT *
FROM products;
```

### Selecting specific columns

```sql
SELECT id, customer_name, ip
FROM customers;
```

### Filtering entries

```sql
SELECT id, customer_name, email
FROM customers
WHERE country = 'SE' AND city = 'Arvika';
```

### Ordering by column value

```sql
SELECT id, customer_name
FROM customers
ORDER BY customer_name ASC;
```

Currently only one column can be used in the `ORDER BY` clause.

The order may be either ascending (`ASC` suffix, default) or descending (`DESC` suffix).

Ordering rows by a value of a column requires a matching index on that column.


### `INNER JOIN`

```sql
SELECT *
FROM orders
INNER JOIN customers ON orders.customerid = customers.id;

SELECT *
FROM orders
INNER JOIN customers ON orders.customerid = customers.id
WHERE orders.productid = 2;

SELECT * FROM orders
INNER JOIN customers ON customers.id = orders.customerid
INNER JOIN products ON products.id = orders.productid
```

### `LIKE` operator

immudb supports the `LIKE` operator.
Unlike in other SQL engines though, the pattern use a regexp syntax
supported by the [regexp library in the go language](https://pkg.go.dev/regexp).

```sql
SELECT product
FROM products
WHERE product LIKE '(J.*ce|Red)';

SELECT id, product
FROM products
WHERE (id > 0 AND NOT products.id >= 10)
  AND (products.product LIKE 'J');
```

### Column and table aliasing

```sql
SELECT c.id, c.customer_name AS name, active
FROM (customers AS c)
WHERE id <= 3 AND active = true;
```

Table name aliasing is necessary when using more than one join with the same table.

### Aggregations

Available aggregation functions:

<CustomList class="no-horizontal-padding" inverse size="small">

* COUNT
* SUM
* MAX
* MIN
* AVG

</CustomList>

```sql
SELECT
    COUNT() AS c,
    SUM(age),
    MIN(age),
    MAX(age),
    AVG(age)
FROM customers;
```

### Grouping results with `GROUP BY`

Results can be grouped by a value of a single column.
That column must also be used in a matching `ORDER BY` clause.

```sql
SELECT COUNT() as customer_count, country
FROM customers
GROUP BY country
ORDER BY country;
```

### Filtering grouped results with `HAVING`

```sql
SELECT
    active,
    COUNT() as c,
    MIN(age),
    MAX(age)
FROM customers
GROUP BY active 
HAVING COUNT() > 0
ORDER BY active DESC;
```

### Sub-queries

The table in the `SELECT` statement can be replaced with a sub-query.

```sql
SELECT * FROM (
    SELECT id, customer_name
    FROM customers
    WHERE age < 30
    AS c
)
INNER JOIN (customer_review AS r) ON r.customerid = c.id
```

Note: the context of a sub-query does not propagate outside,
      e.g. it is not possible to reference a table from a sub-query
      in the `WHERE` clause outside of the sub-query.

### Basic transactions

Multiple insert and upsert statements can be issued within a single transaction.

Note: The example below won't work in the current version of the immudb webconsole.
The easiest way to tested it is with the `./immuclient exec "..."` shell command
(make sure to use an escaped `\$` value to avoid cutting out part of the price).

```sql
BEGIN TRANSACTION
    UPSERT INTO products (id, price, product)
    VALUES (4, '$5.76', 'Bread');

    INSERT INTO orders(productid, customerid)
    VALUES(4, 1);
COMMIT;
```

### Time travel

Time travel allows reading data from SQL as if it was in some previous state.
The state is indicated by transaction id.

A historical version of a table can be used in `SELECT` statements
using the `BEFORE TX` clause:

```sql
SELECT id, product, price
FROM (products BEFORE TX 13);

SELECT id, product, price
FROM (products BEFORE TX 13)
WHERE id = 2;
```

</WrappedSection>
