# Window Functions

<WrappedSection>

Window functions perform calculations across a set of rows related to the current row, without collapsing them into a single output like aggregate functions do.

### Basic syntax

```sql
SELECT column,
    window_function() OVER (
        PARTITION BY partition_column
        ORDER BY sort_column
    )
FROM table;
```

</WrappedSection>

<WrappedSection>

### Ranking functions

```sql
-- ROW_NUMBER: sequential number within partition
SELECT name, department,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
FROM employees;

-- RANK: rank with gaps for ties
SELECT name, RANK() OVER (ORDER BY score DESC) FROM results;

-- DENSE_RANK: rank without gaps
SELECT name, DENSE_RANK() OVER (ORDER BY score DESC) FROM results;

-- NTILE: distribute rows into N buckets
SELECT name, NTILE(4) OVER (ORDER BY salary) AS quartile FROM employees;
```

</WrappedSection>

<WrappedSection>

### Value functions

```sql
-- LAG: access previous row's value
SELECT date, amount,
    LAG(amount) OVER (ORDER BY date) AS prev_amount
FROM transactions;

-- LEAD: access next row's value
SELECT date, amount,
    LEAD(amount) OVER (ORDER BY date) AS next_amount
FROM transactions;

-- FIRST_VALUE / LAST_VALUE
SELECT name, salary,
    FIRST_VALUE(name) OVER (PARTITION BY dept ORDER BY salary DESC) AS top_earner
FROM employees;
```

</WrappedSection>

<WrappedSection>

### Window aggregates

Standard aggregate functions can also be used as window functions:

```sql
SELECT name, department, salary,
    SUM(salary) OVER (PARTITION BY department) AS dept_total,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg,
    COUNT(*) OVER (PARTITION BY department) AS dept_count
FROM employees;
```

Supported window functions: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `FIRST_VALUE`, `LAST_VALUE`, `NTILE`, `COUNT`, `SUM`, `MIN`, `MAX`, `AVG`.

</WrappedSection>
