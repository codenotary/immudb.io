# Views and Sequences

<WrappedSection>

### Views

Views are named queries stored in the database. They act as virtual tables.

```sql
-- Create a view
CREATE VIEW active_users AS
SELECT id, name, email FROM users WHERE active = true;

-- Query the view like a table
SELECT * FROM active_users;

-- Create only if it doesn't exist
CREATE VIEW IF NOT EXISTS expensive_products AS
SELECT * FROM products WHERE price > 100;

-- Remove a view
DROP VIEW active_users;
DROP VIEW IF EXISTS expensive_products;
```

Views are persisted and survive server restarts.

</WrappedSection>

<WrappedSection>

### Sequences

Sequences generate auto-incrementing numeric values.

```sql
-- Create a sequence
CREATE SEQUENCE order_seq;

-- Get next value
SELECT NEXTVAL('order_seq');  -- returns 1, 2, 3, ...

-- Get current value (after NEXTVAL has been called)
SELECT CURRVAL('order_seq');

-- Use in INSERT
INSERT INTO orders (id, product) VALUES (NEXTVAL('order_seq'), 'Widget');

-- Remove a sequence
DROP SEQUENCE order_seq;
```

Sequences are persisted and maintain their state across restarts.

</WrappedSection>
