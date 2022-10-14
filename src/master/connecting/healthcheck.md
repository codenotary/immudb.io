# HealthCheck

<WrappedSection>

HealthCheck return an error if `immudb` status is not ok.

</WrappedSection>

:::: tabs

::: tab Go
<<< @/src/code-examples/go/connect-healthcheck/main.go
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

::: tab .NET

The following code snippets show how to invoke the healthcheck endpoint:

``` csharp
    Immuclient immuClient = new ImmuClient("localhost", 3322);
    await immuClient.Open("immudb", "immudb", "defaultdb");

    bool result = await immuClient.HealthCheck();
    Console.WriteLine(result);
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

::: tab Others
If you're using another development language, please refer to the [immugw](immugw.md) option.
:::

::::
