# SDKs api

## Contents
- [Connection and authentication](#connection-and-authentication)
    - [Mutual TLS](#mutual-tls)
    - [Disable authentication](#disable-authentication)
- [Root management](#root-management)
- [Writing and reading](#writing-and-reading)
    - [get and set](#get-and-set)
    - [byIndex](#byIndex)
- [history](#history)
- [tamperproof writing and reading](#tamperproof-writing-and-reading)
    - [safe get and set](#safe-get-and-set)
    - [safe index](#safe-index)
- [counting (count, countAll)](#counting)
- [Transactions](#root-management)
    - [setAll](#set-batch-set-all)
    - [execAllOps](#exec-all-ops)
- [scan](#scan)
- [references](#references) 
    - [reference and safeReference](#reference-and-safeReference)
    - [get safe get](#get-safe-get])
    - [getReference](#getReference)
    - [deep scan reference resolution](#deep-scan-reference-resolution)
- [secondary indexes](#secondary-indexes)
    - [sorted sets(ZAdd,ZScan, SafeZScan)](#sorted-sets)
    - [insertion order index (insertion order scan)](#insertion-order-index)
- [tamperproofing utilities(root,inclusion,consistency)](#tamperproofing-utilities)
- [structured values](#structured-values)
- [user management (ChangePermission,SetActiveUser,DatabaseList)](#user-management)
- [multi databases(CreateDatabase,UseDatabase)](#multi-databases)
- [health](#health)
- [examples](#examples)

## Connection and authentication

Immudb run on 3323 default port. Here we connecting a client with default options and
authenticating using default username and password.
It's possible to modify defaults on immudb server config folder inside `immudb.toml`
:::: tabs

::: tab Go

Login method return a token needed in all interactions with the server.

```go
c, err := client.NewImmuClient(client.DefaultOptions())
if err != nil {
    log.Fatal(err)
}
ctx := context.Background()
// login with default username and password and storing a token
lr , err := c.Login(ctx, []byte(`immudb`), []byte(`immudb2`))
if err != nil {
    log.Fatal(err)
}
// set up an authenticated context that will be required in future operations
md := metadata.Pairs("authorization", lr.Token)
ctx = metadata.NewOutgoingContext(context.Background(), md)
```
:::

::: tab Java
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
:::

::::

### Mutual tls
To enable mutual authentication a certificate chain need to be provided both to the server and to the client.
With this they will authenticate each other at the same time 
In order to generate them it's possible to use openssl tool.
[generate.sh](https://github.com/codenotary/immudb/tree/master/tools/mtls) provides a quick solution to provide them.
```bash
./generate.sh localhost mysecretpassword
```
This generates a list of folder containing certificates and private key to set up a mTLS connection
:::: tabs

::: tab Go
```go
	client, err := c.NewImmuClient(
		c.DefaultOptions().WithMTLsOptions(
			c.MTLsOptions{}.WithCertificate("{path-to-immudb-src-folder}/tools/mtls/4_client/certs/localhost.cert.pem").
				WithPkey("{path-to-immudb-src-folder}/tools/mtls/4_client/private/localhost.key.pem").
				WithClientCAs("{path-to-immudb-src-folder}/tools/mtls/2_intermediate/certs/ca-chain.cert.pem").
				WithServername("localhost"),
				).
			WithMTLs(true),
		)
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	// login with default username and password
	lr , err := client.Login(ctx, []byte(`immudb`), []byte(`immudb`))
```
:::

::: tab Java
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
:::

::::

### Disable authentication
It's possible to run immudb with disabled authentication.
It's not possible to connect without enabled authentication to a server that own already databases and users permissions.
If a valid token is present authentication is being enabled by default.
:::: tabs

::: tab Go
```go
    client, err := c.NewImmuClient(
		c.DefaultOptions().WithAuth(false),
	)
	if err != nil {
		log.Fatal(err)
	}
	vi, err := client.SafeSet(ctx, []byte(`immudb`), []byte(`hello world`))
	if  err != nil {
		log.Fatal(err)
	}
```
:::

::: tab Java
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
:::

::::

### Disable authentication
It's possible to run immudb with disabled authentication.
Without enabled authentication it's not possible to connect to a server that own already databases and users permissions.
If a valid token is present authentication is being enabled by default.

:::: tabs

::: tab Go
```go
    client, err := c.NewImmuClient(
		c.DefaultOptions().WithAuth(false),
	)
	if err != nil {
		log.Fatal(err)
	}
	vi, err := client.SafeSet(ctx, []byte(`immudb`), []byte(`hello world`))
	if  err != nil {
		log.Fatal(err)
	}
```
:::

::: tab Java
__NOT_IMPLEMENTED__
:::

::: tab Python
__NOT_IMPLEMENTED__
:::

::: tab Node.js
__NOT_IMPLEMENTED__
:::

::: tab .Net
__NOT_IMPLEMENTED__
:::

::: tab Others
__NOT_IMPLEMENTED__
:::

::::

### Root management




