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
    "key": "client1",
    "value": "04202020"
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
         "key": "client2",
	     "value": "11232020"
	}
}
'	
```

##  Add reference to existing entries

```bash

curl --location --request POST 'http://localhost:3323/v1/immurestproxy/safe/reference' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "ro": {
        "reference":  "reference:client1",
         "key": "client2"
    }
}'
	
```

##  Add secondary index

```bash

```

## Read entries without verification

```bash
	
```

## Read entries with verification

```bash
	
```
## Scan entries

```bash

```
## Count  entries

```bash
curl --location --request GET 'http://192.168.0.79:3323/v1/immurestproxy/item/count/a2V5' \
--header 'Authorization: Bearer {{token}}'
	
```
## Get current root

```bash

curl --location --request GET 'http://immugw:3323/v1/immurestproxy/root' \
  --header 'Authorization: Bearer {{token}}'

```
### Add a new entry after getting current root

```bash

	
```
## Check consistency

```bash

	
```
## Check inclusion

```bash

```
