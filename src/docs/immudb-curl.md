## Table of Contents
 - [Write transactions without verification](#write-transactions-without-verification)
 - [Write transactions with verification](#write-transactions-with-verification)
 - [Add reference to existing entries](#add-reference-to-existing-entries)
 - [Add secondary index](#Add-secondary-index)
 - [Read entries without verification](#read-entries-without-verification)
 - [Read entries with verification](#read-entries-with-verification)
 - [Scan entries](#scan-entries)
 - [Count entries](#count-entries)
 - [Get current root](#get-current-root)
 - [Check consistency](#check-consistency)
 - [Check inclusion](#check-inclusion)

The following code snippets explain how to work with 'immugw' (REST proxy for immudb) using 'curl':

## Write transactions without verification

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/item' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "key": "Y2xpZW50MQ==",
    "value": "MDQyMDIwMjA="
}'
```

## Write transactions with verification

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/item/safe?k1=v5' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "kv": {
         "key": "Y2xpZW50Mg==",
	     "value": "MTEyMzIwMjA="
         }
}'
```

##  Add reference to existing entries

```bash

curl --location --request POST 'http://immugw:3323/v1/immurestproxy/safe/reference' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "ro": {
        "reference":  "Y2xpZW50Mg==",
         "key": "Y2xpZW50Mg=="
    }
}'
```

##  Add secondary index

```bash

```

## Read entries without verification

```bash
curl --location --request GET 'http://immugw:3323/v1/immurestproxy/item/index/1' \
--header 'Authorization: Bearer {{token}}'
```

## Read entries with verification

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/item/safe' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "kv": {
         "key": "Y2xpZW50Mg==",
	     "value": "MTEyMzIwMjA="
         }
}'
```
## Scan entries

```bash
curl --request POST \
  --url http://localhost:3323/v1/immurestproxy/item/scan \
  --header 'content-type: application/json' \
  --data '{
  "prefix": "MDQyMDIwMjA=",
  "offset": "Y2xpZW50MmRk",
	"limit": "2",
  "reverse": true,
  "deep": true
}'
```
## Count  entries

```bash
curl --request GET \
  --url http://localhost:3323/v1/immurestproxy/item/count/Y2xpZW50Mg==
```
## Get current root

```bash

curl --location --request GET 'http://immugw:3323/v1/immurestproxy/root' \
  --header 'Authorization: Bearer {{token}}'

```
### Add a new entry after getting current root

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/item' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: text/plain' --data-raw '{
    "key": "Y2xpZW50QQ==",
    "value": "MDQyMDIwMjA="
}'
```
## Check consistency

```bash
curl --request GET \
  --url http://immuwg:3323/v1/immurestproxy/consistencyproof/33	
```
## Check inclusion

```bash
curl --request GET \
  --url http://immugw:3323/v1/immurestproxy/inclusionproof/33
```
