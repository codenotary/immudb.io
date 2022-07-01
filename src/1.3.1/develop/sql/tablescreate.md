# Creating tables

<WrappedSection>

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
    id          INTEGER,
    product     VARCHAR NOT NULL,
    price       VARCHAR NOT NULL,
    created_at  TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS orders (
    id          INTEGER AUTO_INCREMENT,
    customerid  INTEGER,
    productid   INTEGER,
    created_at  TIMESTAMP,
    PRIMARY KEY id
);

CREATE TABLE customer_review(
    customerid  INTEGER,
    productid   INTEGER,
    review      VARCHAR,
    created_at  TIMESTAMP,
    PRIMARY KEY (customerid, productid)
);
```

</WrappedSection>

<WrappedSection>

### IF NOT EXISTS

With this clause the `CREATE TABLE` statement will not fail if a table with same name already exists.

Note: If the table already exists, it is not compared against the provided table definition neither it is
      updated to match it.

</WrappedSection>

<WrappedSection>

### NOT NULL

Columns marked as not null can not have a null value assigned.

</WrappedSection>

<WrappedSection>

### PRIMARY KEY

Every table in immudb must have a primary key.
Primary key can use at least 1 and up to 8 columns.

Columns used in a primary key can not have `NULL` values assigned,
even if those columns are not explicitly marked as `NOT NULL`.

Primary key creates an implicit unique index on all contained columns.

</WrappedSection>

<WrappedSection>

### AUTO_INCREMENT

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

</WrappedSection>

<WrappedSection>

### Foreign keys

Explicit support for relations to foreign tables is not currently supported in immudb.
It is possible however to create ordinary columns containing foreign key values that can be used in `JOIN` statements.
Application logic is responsible for ensuring data consistency and foreign key constraints.

```sql
SELECT * FROM orders
INNER JOIN customers ON customers.id = orders.customerid
INNER JOIN products ON products.id = orders.productid;
```

</WrappedSection>