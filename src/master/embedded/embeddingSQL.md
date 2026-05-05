# SQL Engine

<WrappedSection>

There are cases where you don't want a separate server but embed immudb directly in the same application process, as a library.

immudb provides you a immutable embedded SQL engine which keeps all history, is tamper-proof and can travel in time.
The SQL engine is mounted on top of the embedded key value store.
The following illustrative example showcase how to initialize the SQL engine, write and read data in the scope of a SQL transaction.

</WrappedSection>

<WrappedSection>

<<< @/code-examples/go/embedded-sql/main.go

If you need to change options like where things get stored by default, you can do that in the underlying store objects that the SQL engine is using.

::: tip Multi-database operations
The example above uses a single, default database — which is the typical setup for embedded usage. Statements like `CREATE DATABASE` and `USE DATABASE` are only available when the SQL engine is configured with a `MultiDBHandler` via `sql.DefaultOptions().WithMultiDBHandler(...)`. Without one, executing those statements will fail with `unspecified multidbHandler`. Note also that the underlying store must be opened with `store.DefaultOptions().WithMultiIndexing(true)` for the SQL engine to operate.
:::

</WrappedSection>
