# Data Expiration

It's possible to achieve data expiration by using the `ExpirableSet` function. It provides logical deletion, it means that it is not phisically deleted from db, but it's not possible to query it anymore after deletion.


:::: tabs

::: tab Go
```go

    _, err = client.ExpirableSet(ctx, []byte("expirableKey"), []byte("expirableValue"), time.Now())
    if  err != nil {
		log.Fatal(err)
    }
    
	//the following will raise an error with key not found
    _, err = client.Get(ctx, []byte("expirableKey"))
	if err == nil || !strings.Contains(err.Error(), "key not found") {
		log.Fatalf("expecting key not found error: %v", err)
	}

```
:::

::: tab Java

This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Java sdk github project](https://github.com/codenotary/immudb4j/issues/new)
:::

::: tab Python
This feature is not yet supported or not documented.
Do you want to make a feature request or help out? Open an issue on [Python sdk github project](https://github.com/codenotary/immudb-py/issues/new)
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
If you're using another development language, please refer to the [immugw](/master/immugw/) option.
:::

::::


