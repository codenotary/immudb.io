# Querying

<WrappedSection>

### Selecting all columns

All columns from all joined tables can be queried with `SELECT *` statement.

```sql
SELECT *
FROM products;
```

</WrappedSection>

<WrappedSection>

### Selecting specific columns

```sql
SELECT id, customer_name, ip
FROM customers;
```

</WrappedSection>

<WrappedSection>

### Selecting expressions

In addition to selecting specific column values, you can also select expressions:

```sql
SELECT NOT active as disabled, SUBSTRING(customer_name, 1, 3) AS short_name, age >= 21 AS is_adult
FROM customers;
```

</WrappedSection>

<WrappedSection>

### Filtering entries

```sql
SELECT id, customer_name, email
FROM customers
WHERE country = 'SE' AND city = 'Arvika';
```

</WrappedSection>

<WrappedSection>

### Ordering by column value

```sql
SELECT id, customer_name
FROM customers
ORDER BY customer_name ASC, id DESC;
```

The order may be either ascending (`ASC` suffix, default) or descending (`DESC` suffix).

Although not required, adding an index on the columns specified in the clause can drastically reduce query times.

</WrappedSection>

<WrappedSection>

### INNER JOIN

immudb supports standard SQL `INNER JOIN` syntax.
The `INNER` join type is optional.

```sql
SELECT *
FROM orders
INNER JOIN customers ON orders.customerid = customers.id;

SELECT *
FROM orders
JOIN customers ON orders.customerid = customers.id
WHERE orders.productid = 2;

SELECT * FROM orders
JOIN customers ON customers.id = orders.customerid
JOIN products ON products.id = orders.productid;
```

</WrappedSection>

<WrappedSection>

### LIKE operator

immudb supports the `LIKE` operator.
Unlike in other SQL engines though, the pattern use a regexp syntax
supported by the [regexp library in the go language](https://pkg.go.dev/regexp).

A `NOT` prefix negates the value of the `LIKE` operator.

```sql
SELECT product
FROM products
WHERE product LIKE '(J.*ce|Red)';

SELECT product
FROM products
WHERE product NOT LIKE '(J.*ce|Red)';

SELECT id, product
FROM products
WHERE (id > 0 AND NOT products.id >= 10)
  AND (products.product LIKE 'J');
```

</WrappedSection>

<WrappedSection>

### IN operator

immudb has a basic supports for the `IN` operator.

A `NOT` prefix negates the value of the `IN` operator.

Note: Currently the list for the `IN` operator can not be
calculated using a sub-query.

```sql
SELECT product
FROM products
WHERE product IN ('Milk', 'Grapes - Red');

SELECT product
FROM products
WHERE product NOT IN ('Milk', 'Grapes - Red');

SELECT id, product
FROM products
WHERE (id > 0 AND NOT products.id >= 10)
  AND (product IN ('Milk', 'Grapes - Red'));
```

</WrappedSection>

<WrappedSection>

### Column and table aliasing

```sql
SELECT c.id, c.customer_name AS name, active
FROM customers AS c
WHERE c.id <= 3 AND c.active = true;

SELECT c.id, c.customer_name AS name, active
FROM customers c
WHERE c.id <= 3 AND c.active = true;
```

Table name aliasing is necessary when using more than one join with the same table.

</WrappedSection>

<WrappedSection>

### Aggregations

Available aggregation functions:

<CustomList class="no-horizontal-padding" inverse size="small">

- COUNT
- SUM
- MAX
- MIN
- AVG

</CustomList>

```sql
SELECT
    COUNT(*) AS c,
    SUM(age),
    MIN(age),
    MAX(age),
    AVG(age)
FROM customers;
```

</WrappedSection>

<WrappedSection>

### Grouping results with GROUP BY

Results can be grouped by the value of one or more columns.

```sql
SELECT COUNT(*) as customer_count, country
FROM customers
GROUP BY country
ORDER BY country;
```

</WrappedSection>

<WrappedSection>

### Filtering grouped results with HAVING

```sql
SELECT
    active,
    COUNT(*) as c,
    MIN(age),
    MAX(age)
FROM customers
GROUP BY active
HAVING COUNT(*) > 0
ORDER BY active DESC;
```

</WrappedSection>

<WrappedSection>

### Sub-queries

The table in the `SELECT` or `JOIN` clauses can be replaced with a sub-query.

```sql
SELECT * FROM (
    SELECT id, customer_name
    FROM customers
    WHERE age < 30
)
INNER JOIN customer_review
    ON customer_review.customerid = customers.id;

SELECT * FROM (
    SELECT id, customer_name
    FROM customers
    WHERE age < 30
) AS c
INNER JOIN (
    SELECT * FROM customer_review
) AS r
    ON r.customerid = c.id;
```

Note: the context of a sub-query does not propagate outside,
e.g. it is not possible to reference a table from a sub-query
in the `WHERE` clause outside of the sub-query.

</WrappedSection>

<WrappedSection>

### Combining query results with UNION

It is possible to combine multiple query results with the `UNION` operator.

Subqueries must select the same number and type of columns.
The final return will assign the same naming as in the first subquery, even if names differ.

```sql
SELECT customer_name as name
FROM customers
WHERE age < 30
UNION
SELECT seller_name
FROM sellers
WHERE age < 30
```

Subqueries are not constrained in any way, they can contain aggregations or joins.

Duplicate rows are excluded by default. Using `UNION ALL` will leave duplicate rows in place.

```sql
SELECT AVG(age) FROM customers
UNION ALL
SELECT AVG(age) FROM sellers
```

</WrappedSection>

<WrappedSection>

### Transactions

The ACID (Atomicity, Consistency, Isolation, and Durability) compliance is complete.

Handling read-write conflicts may be necessary when dealing with concurrent transactions. Getting the error `ErrTxReadConflict` ("tx read conflict") means there was another transaction committed before the current one, and the data it read may have been invalidated.
[MVCC](https://en.wikipedia.org/wiki/Multiversion_concurrency_control) validations have not yet been implemented, therefore there may be false positives generated. In case of conflict, a new attempt may be required.

```sql
BEGIN TRANSACTION;
    UPSERT INTO products (id, price, product)
    VALUES (4, '$5.76', 'Bread');

    INSERT INTO orders(productid, customerid)
    VALUES(4, 1);
COMMIT;
```

</WrappedSection>

<WrappedSection>

### Time travel

Time travel allows you to read data from SQL as if it were in a previous state or from a specific time range.
Initial and final points are optional and can be specified using either a transaction ID or a timestamp.

The temporal range can be used to filter out rows from the specified (physical) table, but it is not supported in subqueries.

The initial point can be inclusive (`SINCE`) or exclusive (`AFTER`).
The final point can be inclusive (`UNTIL`) or exclusive (`BEFORE`).

```sql
SELECT id, product, price
FROM products BEFORE TX 13
WHERE id = 2;
```

```sql
SELECT * FROM sales SINCE '2022-01-06 11:38' UNTIL '2022-01-06 12:00'
```

Temporal ranges can be specified using functions and parameters

```sql
SELECT * FROM mytable SINCE TX @initialTx BEFORE now()
```

</WrappedSection>

<WrappedSection>

### Row History

Historical queries over physical tables (row revisions) is also supported.
Result sets over `history of <table>` will include the additional `_rev` column, denoting the row revision number,

Historical queries can use the additional `_rev` column as usual:

```sql
SELECT _rev, price
FROM (HISTORY OF products)
WHERE id = 2;
```

```sql
SELECT * FROM (HISTORY OF mytable) WHERE _rev = @rev
```

</WrappedSection>

<WrappedSection>

### Transaction metadata

immudb can be configured to inject request information (**user**, **ip address**, etc...) to transaction metadata (see [Request Metadata](../../production/request-metadata.md)). When this functionality is enabled,
such information can be retrieved by querying the special `_tx_metadata` column, whose type is `JSON` (refer to [Querying JSON columns](#querying-json-columns) section).

```sql
SELECT _tx_metadata->'ip' as ip_addr FROM customers
WHERE _tx_metadata->'usr' = 'username';
```

</WrappedSection>

<WrappedSection>

### Skipping entries with OFFSET clause

Using `OFFSET` clause in SQL queries can be used to skip an initial list of entries from the result set.
Internally offsets are implemented by skipping entries from the result on the server side thus it may come with performance penalty when the value of such offset is large.

```sql
SELECT *
FROM products;
LIMIT 10 OFFSET 30
```

```sql
SELECT id, customer_name, email
FROM customers
WHERE country = 'SE' AND city = 'Arvika';
ORDER BY customer_name
LIMIT 50 OFFSET 100
```

</WrappedSection>

<WrappedSection>

## Querying JSON columns

immudb supports a `JSON` data type designed to store data in the `JavaScript Object Notation` format. It allows for flexible and efficient storage and querying of JSON objects, which can be particularly useful in applications that require a combination of structured and semi-structured data.

```sql
CREATE TABLE items (
  id INTEGER AUTO_INCREMENT,
  details JSON,

  PRIMARY KEY id
);
```

Internally, JSON data are represented in their textual format. Columns can be then populated by any valid JSON string:

```sql
INSERT INTO items(id, details)
  VALUES
    (1, '{"name": "Alice", "age": 25}'),
    (2, '{"name": "Bob", "address": {"city": "Los Angeles", "state": "CA"}}'),
    (3, '["apple", "banana", "cherry"]'),
    (4, '[{"product": "book", "price": 12.99}, {"product": "pen", "price": 1.49}]'),
    (5, '"N/A"')
```

The `ARROW (->)` operator, used to access nested fields, is crucial when working with the JSON type. The following shows valid examples of queries over a JSON field:

```sql
SELECT * FROM items
WHERE details->'name' IS NOT NULL
ORDER BY details->'name';

SELECT * FROM items
WHERE json_typeof(details->'1') != 'OBJECT' AND details->'1' = 'banana';

SELECT details->'1'->'price' as price FROM items;
```

</WrappedSection>
