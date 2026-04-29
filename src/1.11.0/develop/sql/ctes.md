# Common Table Expressions (CTEs)

<WrappedSection>

CTEs provide named temporary result sets that exist within the scope of a single query. They improve readability and allow recursive queries.

### Basic CTE

```sql
WITH active_customers AS (
    SELECT id, name FROM customers WHERE active = true
)
SELECT * FROM active_customers ORDER BY name;
```

</WrappedSection>

<WrappedSection>

### Multiple CTEs

```sql
WITH
    dept_stats AS (
        SELECT department, COUNT(*) AS cnt FROM employees GROUP BY department
    ),
    large_depts AS (
        SELECT department FROM dept_stats WHERE cnt > 10
    )
SELECT e.name, e.department
FROM employees e
INNER JOIN large_depts d ON e.department = d.department;
```

</WrappedSection>

<WrappedSection>

### Recursive CTEs

Recursive CTEs are used for hierarchical data traversal (org charts, category trees, etc.):

```sql
WITH RECURSIVE tree(id, name, parent_id, depth) AS (
    -- Base case: root nodes
    SELECT id, name, parent_id, 0
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    -- Recursive case: children
    SELECT c.id, c.name, c.parent_id, t.depth + 1
    FROM categories c
    INNER JOIN tree t ON c.parent_id = t.id
)
SELECT id, name, depth FROM tree ORDER BY depth, name;
```

</WrappedSection>
