# Data Expiration

<WrappedSection>

It's possible to achieve data expiration by using the `ExpirableSet` function. It provides logical deletion, it means that it is not phisically deleted from db, but it's not possible to query it anymore after deletion.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/develop-kv-expiration/main.go
:::

::: tab Java

This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab .NET

``` csharp

var client = new ImmuClient();
await client.Open("immudb", "immudb", "defaultdb");

await client.ExpirableSet("key1", "value1", DateTime.Now.AddDays(1));

Entry entry = await client.VerifiedGet("key1");
Console.WriteLine(entry.ToString());
await client.Close();

```

This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab Python
```python
from immudb import ImmudbClient
from datetime import datetime, timedelta
import time

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)
    client.expireableSet(b"TEST", b"test", datetime.now() + timedelta(seconds=3))
    print(client.get(b"TEST")) # b"test"
    time.sleep(4)
    try:
        print(client.get(b"TEST"))
    except:
        pass # Key not found, because it expires, raises Exception

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
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4net/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](../connecting/immugw.md) option.
:::

::::


