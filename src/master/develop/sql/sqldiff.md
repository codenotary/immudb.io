# SQL Diff Query

<WrappedSection>

immudb 1.11 introduces the `DIFF OF` query — an immudb-only SQL extension that returns the rows that were inserted, updated, or deleted in a table between two transactions. Because every write in immudb is recorded in an immutable, cryptographically verifiable transaction log, the diff is computed directly against historical state rather than from a separate change-data-capture stream.

Typical use cases:

- Reconstructing change history for compliance / audit reporting
- Powering CDC pipelines without a separate replication stack
- Reviewing the effect of a deployment, migration, or batch job by transaction range
- Investigating incidents ("what changed in `orders` between 9:00 and 10:00?")

</WrappedSection>

<WrappedSection>

### Syntax

```sql
SELECT _diff_action, <columns>
FROM (DIFF OF <table>)
SINCE  TX <n>   UNTIL  TX <m>;
```

The query is a regular `SELECT`, so projections, predicates, joins, ordering, and `LIMIT` all work as usual. The `DIFF OF <table>` source exposes one synthetic column in addition to the table's own columns:

| Column | Type | Meaning |
|--------|------|---------|
| `_diff_action` | `VARCHAR` | `INSERT`, `UPDATE`, or `DELETE` — the action applied to that row inside the transaction range |

Each emitted row reflects the **post-image** of the change (for `UPDATE` and `INSERT`) or the **pre-image** (for `DELETE`). At most one row per primary key per range is returned: a row that was inserted and later updated within the same window collapses to a single `INSERT` whose values are the latest committed state.

</WrappedSection>

<WrappedSection>

### Period specifiers

The `SINCE` and `UNTIL` clauses define the transaction range. Both bounds are inclusive of the transaction number you specify and accept either a transaction-id form or a timestamp form.

| Form | Example | Notes |
|------|---------|-------|
| `SINCE TX <n>` | `SINCE TX 100` | Inclusive lower bound by transaction id |
| `AFTER TX <n>` | `AFTER TX 100` | Exclusive lower bound (synonym, off-by-one) |
| `UNTIL TX <m>` | `UNTIL TX 200` | Inclusive upper bound by transaction id |
| `BEFORE TX <m>` | `BEFORE TX 200` | Exclusive upper bound (synonym, off-by-one) |
| `SINCE '...'` | `SINCE '2026-04-01 00:00:00'` | Lower bound by timestamp |
| `UNTIL '...'` | `UNTIL '2026-04-29 23:59:59'` | Upper bound by timestamp |

If `SINCE` is omitted the range starts at the table's first transaction; if `UNTIL` is omitted it ends at the latest committed transaction.

</WrappedSection>

<WrappedSection>

### Examples

Show every change to `orders` between two transaction ids:

```sql
SELECT _diff_action, id, amount, title
FROM (DIFF OF orders)
SINCE TX 100 UNTIL TX 200;
```

Restrict to deletions only, and project a few columns:

```sql
SELECT _diff_action, id, amount
FROM (DIFF OF orders)
SINCE TX 100 UNTIL TX 200
WHERE _diff_action = 'DELETE';
```

Diff over a wall-clock window — useful when you know the time but not the tx range:

```sql
SELECT _diff_action, id, amount, title
FROM (DIFF OF orders)
SINCE  '2026-04-29 09:00:00'
UNTIL  '2026-04-29 10:00:00';
```

Combine with a regular table in the same query (for example, to fetch the user name behind each change):

```sql
SELECT d._diff_action, d.id, u.name, d.amount
FROM (DIFF OF orders) d
JOIN users u ON u.id = d.user_id
SINCE TX 1000 UNTIL TX 2000
ORDER BY d.id;
```

</WrappedSection>

<WrappedSection>

### Notes and limits

- `DIFF OF` only works on SQL tables. To diff key/value entries, use the `History` API.
- The diff is computed from immudb's transaction log, so it stays consistent with the table's verifiable state — you can prove a diff result with the same proofs that back any other read.
- The result is bounded by the cost of scanning the requested transaction range. For large ranges, narrow the window with `SINCE`/`UNTIL` or filter on a primary-key range in `WHERE`.
- `DIFF OF` is read-only and may be issued by any user with `READ` privilege on the underlying table.

</WrappedSection>
