# Tamperproofing utilities

### Current State

:::: tabs
`CurrentState` returns the last state of the server.

::: tab Go
```go
    	state, err := client.CurrentState(ctx)
    	if err != nil {
    		log.Fatal(err)
    	}

    	fmt.Printf("current state is : %v", state)
```
:::

::: tab Java

```java
ImmuState currState = immuClient.currentState();

System.out.printf("The current state is " + currState.toString());
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

    state = client.currentState()   # immudb.rootService.State
    print(state.db)         # Current selected DB
    print(state.txId)       # Current transaction ID
    print(state.txHash)     # Current transaction hash
    print(state.signature)  # Current signature

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
	
	const currentStateRes = await cl.currentState()
	console.log('success: currentState', currentStateRes)
})()
```
:::

::: tab .Net
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [.Net sdk github project](https://github.com/codenotary/immudb4dotnet/issues/new)
:::

::: tab Others
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::
