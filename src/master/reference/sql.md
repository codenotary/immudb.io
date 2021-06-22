
# SQL Reference

### Data types

<CustomList class="no-horizontal-padding">

* INTEGER
* BOOLEAN
* VARCHAR
* BLOB
* TIMESTAMP

</CustomList>

<WrappedSection>

### Creating tables

```
CREATE TABLE table1 (id INTEGER, PRIMARY KEY id);
CREATE TABLE table1 (id INTEGER, ts INTEGER, title VARCHAR, active BOOLEAN, payload BLOB, PRIMARY KEY id);
CREATE TABLE IF NOT EXISTS table1 (id INTEGER, PRIMARY KEY id);
```

### Indexes

```
CREATE INDEX ON table1(name);
```

### Inserting or updating data

```
INSERT INTO table1 (id, title) VALUES (1, 'some title')
```

`UPSERT` will update the value if a row with the same primary key already exists:

```
UPSERT INTO table1 (id, title) VALUES (1, 'some title')
UPSERT INTO table1 (id, ts, title, active, payload) VALUES (2, NOW(), 'title', true, x'a blob')
```

### Querying

```
SELECT id, title FROM db1.table1 AS t1
SELECT t1.id, title FROM (db1.table1 AS t1)
SELECT id, time, name FROM table1 WHERE country = 'US' AND time <= NOW() AND name = @pname
SELECT id, title, year FROM table1 ORDER BY title ASC, year DESC
SELECT id, name, table2.status FROM table1 INNER JOIN table2 ON table1.id = table2.id WHERE name = 'John' ORDER BY name DESC
SELECT country, SUM(amount) FROM table1 GROUP BY country
SELECT id FROM table1 WHERE (id > 0 AND NOT table1.id >= 10) OR table1.title LIKE 'J.*'
```

### Parameters

```
SELECT t.id as d FROM (people AS t) WHERE id <= 3 AND active = @active
```

### Aggregations

<CustomList class="no-horizontal-padding" inverse size="small">

* COUNT
* SUM
* MAX
* MIN
* AVG

</CustomList>

```
SELECT COUNT() AS c, SUM(age), MIN(age), MAX(age), AVG(age) FROM table1 AS t1
SELECT active, COUNT() as c, MIN(age), MAX(age) FROM table1 GROUP BY active HAVING COUNT() > 0 ORDER BY active DESC
```

### Transactions

```
BEGIN TRANSACTION; UPSERT INTO table1 (id, label) VALUES (100, 'label1'); UPSERT INTO table2 (id) VALUES (10) COMMIT;
```

### Time travel

```
USE SNAPSHOT BEFORE TX 1000
```

</WrappedSection>
