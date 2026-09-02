---
title: "Joins"
weight: 460
aliases: ["/master/develop/sql/joins/", "/develop/sql/joins/"]
---
immudb supports all standard SQL join types for combining rows from multiple tables.

### INNER JOIN

Returns rows that have matching values in both tables.

```sql
SELECT c.name, o.amount
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;
```

### LEFT JOIN

Returns all rows from the left table, with NULLs for unmatched right rows.

```sql
SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
```

### RIGHT JOIN

Returns all rows from the right table, with NULLs for unmatched left rows.

```sql
SELECT c.name, o.amount
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id;
```

### FULL OUTER JOIN

Returns all rows from both tables, with NULLs where there is no match.

```sql
SELECT c.name, o.amount
FROM customers c
FULL OUTER JOIN orders o ON c.id = o.customer_id;
```

### CROSS JOIN

Returns the Cartesian product (every combination of rows).

```sql
SELECT c.name, p.name
FROM colors c
CROSS JOIN sizes p;
```

### NATURAL JOIN

Automatically joins on columns with matching names.

```sql
SELECT * FROM orders NATURAL JOIN customers;
```

### JOIN ... USING

Join on a specific shared column name.

```sql
SELECT * FROM orders JOIN customers USING (customer_id);
```

### LATERAL JOIN

Correlated subqueries in the FROM clause. The subquery can reference columns from preceding tables.

```sql
SELECT e.name, t.order_count
FROM employees e,
    LATERAL (
        SELECT COUNT(*) AS order_count
        FROM orders o
        WHERE o.employee_id = e.id
    ) t;
```
