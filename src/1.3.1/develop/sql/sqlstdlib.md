# GO SQL std library

<WrappedSection>

From immudb `v1.1.0` is possible to use go standard library sql interface to query data.

<<< @/src/code-examples/go/develop-sql-stdlib/main.go

In alternative is possible to open immudb with a connection string:

<<< @/src/code-examples/go/develop-sql-stdlib-connstring/main.go

Available SSL modes are:

* **disable**. SSL is off
* **insecure-verify**. SSL is on but client will not check the server name.
* **require**. SSL is on.

</WrappedSection>