# Dropping tables

<WrappedSection>

immudb supports table deletion. It is important to note, however, that while indexing data is physically removed, transactions from the commit log are not erased.

</WrappedSection>

<WrappedSection>

### DROP TABLE

A table is deleted along with its declared indexes. Data can no longer be queried from SQL and the transaction commit log still preserves raw transaction information, but the operation can't be undone.

```sql
DROP TABLE customers;
```

</WrappedSection>