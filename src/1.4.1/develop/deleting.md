# Deleting

<WrappedSection>

It's possible to achieve deletion by using the `Delete` function. It provides logical deletion, it means that it is not physically deleted from db, but it's not possible to query it anymore after deletion. When immudb is used as an embedded store, it's possible to retrieve deleted entries. It's also possible to see deleted entries from the sdks using History endpoint, it will display if the entry was deleted.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-deleting/main.go
:::

::: tab Java

This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab .NET

``` csharp

var client = ImmuClient.NewBuilder().WithServerUrl(immudbServerAddress).Build();
await client.Open("immudb", "immudb", "defaultdb");

string key = "hello";

try
{
    await client.VerifiedSet(key, "immutable world!");
    await client.Delete(key);
}
catch (VerificationException e)
{
    // VerificationException means Data Tampering detected!
    // This means the history of changes has been tampered.
    Console.WriteLine(e.ToString());
}
await client.Close();
```

:::

::: tab Python
```python
from immudb import ImmudbClient
from immudb.datatypes import DeleteKeysRequest

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)
    client.set(b"immu", b"immudb-not-rulezz")
    print(client.get(b"immu"))  # b"immudb-not-rulezz"

    deleteRequest = DeleteKeysRequest(keys = [b"immu"])
    client.delete(deleteRequest)
    print(client.get(b"immu"))  # None

if __name__ == "__main__":
    main()
```
:::

::: tab Node.js
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Node.js sdk github project](https://github.com/codenotary/immudb-node/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::


