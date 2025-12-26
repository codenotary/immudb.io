# Transactions

::: tip
Examples in multiple languages can be found at following links: [immudb SDKs examples](https://github.com/codenotary/immudb-client-examples)
:::

<WrappedSection>

immudb supports transactions both on key-value and SQL level, but interactive transactions are supported only on SQL with the exception of `execAll` method, that provides some additional properties.

Interactive transactions are a way to execute multiple SQL statements in a single transaction. This makes possible to delegate application logic to SQL statements - a very common use case is for example checking if the balance > 0 before making a purchase.
In order to create a transaction, you must call the `NewTx()` method on the client instance. The resulting object is a transaction object that can be used to execute multiple SQL statements, queries, commit or rollback.

Following methods are exposed by the transaction object:

```go
Commit() CommittedSQLTx, error
Rollback() error
SQLExec(sql, params) error
SQLQuery(sql, params) SQLQueryResult, error
```

It's possible to rollback a transaction by calling the `Rollback()` method. In this case, the transaction object is no longer valid and should not be used anymore.
To commit a transaction, you must call the `Commit()` method.

**Note**: At the moment immudb support only 1 read-write transaction at a time, so it's up the application to ensure that only one read-write transaction is open at a time, or to handle read conflict error. In such case the error code returned by sdk will be `25P02` **CodInFailedSqlTransaction**.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/code-examples/go/develop-sql-transactions/main.go
:::

::: tab Java
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab Python

Currently immudb Python sdk doesn't support interactive transactions. 

However you can still use non-interactive SQL Transactions.

```python
from immudb import ImmudbClient
from uuid import uuid4

URL = "localhost:3322"  # ImmuDB running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)

    client.sqlExec("""
        CREATE TABLE IF NOT EXISTS example (
            uniqueID VARCHAR[64], 
            value VARCHAR[32],
            created TIMESTAMP,
            PRIMARY KEY(uniqueID)
        );""")
        
    client.sqlExec("""
        CREATE TABLE IF NOT EXISTS related (
            id INTEGER AUTO_INCREMENT, 
            uniqueID VARCHAR[64], 
            relatedValue VARCHAR[32],
            PRIMARY KEY(id)
        );""")

    uid1 = str(uuid4())
    uid2 = str(uuid4())
    params = {
        "uid1": uid1,
        "uid2": uid2
    }
    
    resp = client.sqlExec("""
        BEGIN TRANSACTION;

        INSERT INTO example (uniqueID, value, created) 
            VALUES (@uid1, 'test1', NOW()), (@uid2, 'test2', NOW());
        INSERT INTO related (uniqueID, relatedValue) 
            VALUES (@uid1, 'related1'), (@uid2, 'related2');
        INSERT INTO related (uniqueID, relatedValue) 
            VALUES (@uid1, 'related3'), (@uid2, 'related4');

        COMMIT;
    """, params)
    
    transactionId = resp.txs[0].header.id

    result = client.sqlQuery("""
        SELECT 
            related.id,
            related.uniqueID, 
            example.value, 
            related.relatedValue, 
            example.created
        FROM related 
        JOIN example 
            ON example.uniqueID = related.uniqueID;
    """)
    for item in result:
        id, uid, value, relatedValue, created = item
        print("ITEM", id, uid, value, relatedValue, created.isoformat())

    
    result = client.sqlQuery(f"""
        SELECT 
            related.id,
            related.uniqueID, 
            example.value, 
            related.relatedValue, 
            example.created
        FROM related BEFORE TX {transactionId} 
        JOIN example BEFORE TX {transactionId} 
            ON example.uniqueID = related.uniqueID;
    """)
    print(result) # You can't see just added entries,
                  # my fellow time traveller


if __name__ == "__main__":
    main()
```
:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../../connecting/immugw.md) option.
:::

::::
