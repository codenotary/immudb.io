# Inserting or updating data

<WrappedSection>

### INSERT

immudb supports standard `INSERT` sql statement.
It can be used to add one or multiple values within the same transaction.

```sql
INSERT INTO customers (
    id, customer_name, email, address,
    city, ip, country, age, active, created_at
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
    true,
    NOW()
);

INSERT INTO products (id, product, price, created_at)
VALUES
    ( 1, 'Juice - V8, Tomato', '$4.04', NOW() ),
    ( 2, 'Milk', '$3.24', NOW() );

INSERT INTO orders (customerid, productid, created_at)
VALUES (1, 1, NOW()), (1, 2, NOW());

INSERT INTO customer_review (customerid, productid, review, created_at)
VALUES
    (1, 1, 'Nice Juice!', NOW());
```

</WrappedSection>

<WrappedSection>

### UPSERT

`UPSERT` is an operation with a syntax similar to `INSERT`,
the difference between those two is that `UPSERT` either creates a new or replaces an existing row.
A new row is created if an entry with the same primary key does not yet exist in the table,
otherwise the current row is replaced with the new one.

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

### ON CONFLICT

The optional `ON CONFLICT` clause specifies an alternative action to raising a unique violation or constraint error.
`ON CONFLICT DO NOTHING` simply avoids inserting a row as its alternative action. In this case the primary key of the row is returned.

</WrappedSection>

<WrappedSection>

### Timestamp, NOW() and CAST() built-in function

The built-in `NOW()` function returns the current timestamp value as seen on the server.

The `CAST` function can be used to convert a string or an integer to a timestamp value.

The integer value is interpreted as a Unix timestamp (number of seconds since the epoch time).

The string value passed to the `CAST` function must be in one of the following formats:
`2021-12-08`,  `2021-12-08 17:21`, `2021-12-08 17:21:59`, `2021-12-08 17:21:59.342516`.
Time components not specified in the string are set to 0.

```sql
UPSERT INTO products (id, product, price, created_at)
VALUES
( 3, 'Bread', '$1.50', NOW() ),
( 4, 'Spinach', '$0.99', CAST('2021-02-01' AS TIMESTAMP) )
```

```sql
SELECT * FROM products WHERE created_at < NOW()
```

</WrappedSection>