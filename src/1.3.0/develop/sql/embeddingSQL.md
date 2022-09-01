# Embedding immudb in your application

Using the Go client SDK means you are connecting to a immudb database server. There are cases where you don't want a separate server but embed immudb directly in the same application process, as a library.

immudb provides you a immutable embedded SQL engine which keeps all history, is tamper-proof and can travel in time.
The SQL engine is mounted on top of the embedded key value store.
The following illustrative example showcase how to initialize the SQL engine, write and read data in the scope of a SQL transaction.

<WrappedSection>

<<< @/src/code-examples/go/embedded-sql/main.go

If you need to change options like where things get stored by default, you can do that in the underlying store objects that the SQL engine is using.

</WrappedSection>
