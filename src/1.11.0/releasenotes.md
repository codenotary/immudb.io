# Release Notes

<WrappedSection>

The complete release notes for every immudb version are published on GitHub:

- [immudb release notes](https://github.com/codenotary/immudb/releases)
- [immugw release notes](https://github.com/codenotary/immugw/releases)

</WrappedSection>

<WrappedSection>

## v1.11.0 — 2026-04-23

immudb 1.11.0 is a major release focused on PostgreSQL compatibility, SQL feature coverage, and operational hardening.

### Highlights

- **PostgreSQL compatibility**: deep wire-protocol and SQL coverage validated end-to-end against Rails / ActiveRecord, Gitea, Django, GORM, XORM, SQLAlchemy, golang-migrate, JDBC, and pgAdmin. Real `pg_catalog` and `information_schema` system tables replace ~1500 LOC of legacy regex handlers. See the [PostgreSQL Compatibility](./develop/sql/pg.md) page.
- **[SQL Diff Query](./develop/sql/sqldiff.md)**: new `SELECT _diff_action, ... FROM (DIFF OF table) SINCE TX n UNTIL TX m` syntax for transaction-range diffs against the immutable log.
- **[Audit Logging](./develop/sql/auditlog.md)**: structured, immutable, async audit trail for every gRPC operation, queryable via the standard Scan API and verifiable like any other immudb data.
- **AST-based SQL rewriter (beta)**: feature-flagged via `--pg-rewriter=ast`, off by default.
- **`COPY FROM stdin`**: bulk imports through `psql -f` and `pg_dump` output.

### SQL grammar additions

- `FULL OUTER JOIN`, `LATERAL`, `CROSS JOIN`, `NATURAL JOIN`, `JOIN ... USING` — see [Joins](./develop/sql/joins.md)
- `EXISTS`, `IN`, correlated and scalar subqueries
- `WITH` and `WITH RECURSIVE` CTEs — see [CTEs](./develop/sql/ctes.md)
- `EXCEPT`, `INTERSECT` set operations
- Window functions `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `FIRST_VALUE`, `LAST_VALUE`, `NTILE`, plus window aggregates — see [Window Functions](./develop/sql/windowfunctions.md)
- `CREATE`/`DROP VIEW`, `CREATE`/`DROP SEQUENCE`, `ALTER COLUMN`, `FOREIGN KEY` (parsed), `DEFAULT` values, `SAVEPOINT` / `ROLLBACK TO` / `RELEASE` — see [Views & Sequences](./develop/sql/views.md)
- `RETURNING`, `ON CONFLICT DO UPDATE` / `DO NOTHING`, `FETCH FIRST N ROWS`, `LIMIT ALL`, `NULLS FIRST` / `LAST`
- 75+ new built-in functions: `COALESCE`, `NULLIF`, `GREATEST`, `LEAST`, `EXTRACT`, `BETWEEN`, `ILIKE`, `STRING_AGG`, `RANDOM`, `GEN_RANDOM_UUID`, `TO_NUMBER`, `CONCAT_WS`, `REGEXP_REPLACE`, `LPAD`, `RPAD`, `SPLIT_PART`, `INITCAP`, `MD5`, `TRANSLATE`, `DATE_TRUNC`, `TO_CHAR`, `DATE_PART`, `AGE`, `CLOCK_TIMESTAMP`, and more
- PostgreSQL type aliases: `BIGINT`, `INT`, `INT4`, `INT8`, `SMALLINT`, `SERIAL`, `BIGSERIAL`, `DOUBLE`, `REAL`, `FLOAT4`, `FLOAT8`, `NUMERIC`, `DECIMAL`, `TIMESTAMPTZ`, `DATE`, `BYTEA`, `JSONB`

### Performance

- Per-session SQL parse cache; cached engine catalog reused via `Clone`; prefix-fingerprint read-set
- Hash-aggregate path for unindexed `GROUP BY`
- vLog fast path for `MaxIOConcurrency==1`; tbtree `nodeAt` restructure; `Mutex → RWMutex` on the hot path
- Commit buffer + cLog entry reuse; appendable cache refcounted

### Operability and security

- Path-traversal protection in archive restore
- Session invalidation on user / permission changes
- Token files written with `0600`
- Correct IPv6 handling in per-client metrics
- `MaxKeyLen` raised from 512 → 1024 (configurable via `--max-key-length`)
- gRPC bumped to `v1.79.3`

### Verification helpers (SQL)

- `immudb_state()` — current database state and transaction hash
- `immudb_verify_row(table, id)` — cryptographic row verification
- `immudb_verify_tx(tx_num)` — transaction verification with proof
- `immudb_history(key)` — full key history

### Known limitations

- Generated columns (`GENERATED ALWAYS AS`)
- Stored procedures / PL/pgSQL
- GIN / GiST indexes (B-tree only)
- `ARRAY`, `ENUM`, composite types
- Arithmetic inside aggregate functions (e.g. `SUM(a * b)`)

Full changelog: [github.com/codenotary/immudb/releases/tag/v1.11.0](https://github.com/codenotary/immudb/releases/tag/v1.11.0).

</WrappedSection>
