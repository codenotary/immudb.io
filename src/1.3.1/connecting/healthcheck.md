# HealthCheck

<WrappedSection>

HealthCheck return an error if `immudb` status is not ok.

</WrappedSection>

:::: tabs
::: tab Go
```go
package main

import (
	"context"
	"log"

	immudb "github.com/codenotary/immudb/pkg/client"
)

func main() {
    client, err := immudb.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    ctx := context.Background()

    err = client.OpenSession(ctx, []byte(`immudb`), []byte(`immudb`), "defaultdb")
    if err != nil {
        log.Fatal(err)
    }

    defer client.CloseSession(ctx)

    err = client.HealthCheck(ctx)
    // error handling
}
```
:::

::: tab Java

```java
package io.codenotary.immudb.helloworld;

import io.codenotary.immudb4j.*;

public class App {

    public static void main(String[] args) {
        FileImmuStateHolder stateHolder = FileImmuStateHolder.newBuilder()
                    .withStatesFolder("./immudb_states")
                    .build();

        ImmuClient client = ImmuClient.newBuilder()
                    .withServerUrl("127.0.0.1")
                    .withServerPort(3322)
                    .withStateHolder(stateHolder)
                    .build();

        client.login("immudb", "immudb");

        boolean isHealthy = immuClient.healthCheck();
    }

}
```

:::

::: tab Python
```python
from immudb import ImmudbClient

URL = "localhost:3322"  # immudb running on your machine
LOGIN = "immudb"        # Default username
PASSWORD = "immudb"     # Default password
DB = b"defaultdb"       # Default database name (must be in bytes)

def main():
    client = ImmudbClient(URL)
    client.login(LOGIN, PASSWORD, database = DB)
    check = client.healthCheck()    # Returns bool
    print(check)                    # True

if __name__ == "__main__":
    main()
```
:::

::: tab Node.js
```ts
import ImmudbClient from 'immudb-node'

const IMMUDB_HOST = '127.0.0.1'
const IMMUDB_PORT = '3322'
const IMMUDB_USER = 'immudb'
const IMMUDB_PWD = 'immudb'

const cl = new ImmudbClient({ host: IMMUDB_HOST, port: IMMUDB_PORT });

(async () => {
	await cl.login({ user: IMMUDB_USER, password: IMMUDB_PWD })

	await cl.health()
})()
```
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::
