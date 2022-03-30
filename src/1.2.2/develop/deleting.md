# Deleting

It's possible to achieve deletion by using the `Delete` function. It provides logical deletion, it means that it is not phisically deleted from db, but it's not possible to query it anymore after deletion. When immudb is used as an embedded store, it's possible to retrieve deleted entries. It's also possible to see deleted entries from the sdks using History endpoint, it will display if the entry was deleted.

:::: tabs

::: tab Go

```go
    tx, err = client.Set(ctx, []byte("1,2,3"), []byte("3,2,1"))
 if  err != nil {
  log.Fatal(err)
 }

 fmt.Printf("Successfully committed tx %d\n", tx.Id)

 entry, err := client.Get(ctx, []byte("1,2,3"))
 if  err != nil {
  log.Fatal(err)
 }

 fmt.Printf("Successfully retrieved entry: %v\n", entry)

 _, err = client.Delete(ctx, []byte("1,2,3"))
 if  err != nil {
  log.Fatal(err)
 }

 //the following will raise an error with key not found
 _, err = client.Get(ctx, []byte("1,2,3"))
 if  err != nil {
  log.Fatal(err)
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
