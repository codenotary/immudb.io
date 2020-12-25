# Curl Examples 0.8.1

 - [Write transactions without verification](#write-transactions-without-verification)
 - [Write transactions with verification](#write-transactions-with-verification)
 - [Add reference to existing entries](#add-reference-to-existing-entries)
 - [Add secondary index](#add-secondary-index)
 - [Read entries without verification](#read-entries-without-verification)
 - [Read entries with verification](#read-entries-with-verification)
 - [Scan entries](#scan-entries)
 - [Count entries](#count-entries)
 - [Get current root](#get-current-root)
 - [Check consistency](#check-consistency)
 - [Check inclusion](#check-inclusion)

The following code snippets explain how to work with 'immugw' (REST proxy for immudb) using 'curl'.
immugw HTTP API key/value are base64 encoded.

**important: all get and safeget functions return base64-encoded keys and values, while all set and get functions expect base64-encoded inputs** 

## Login: you can either create another user with immuadmin or user the built-in immudb user (default pw: immudb)

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": "'$(echo -n immudb | base64)'",
    "password": "'$(echo -n TWdn4TK0ACq8amSeYBW!9E9h3S0am?G! | base64)'"
    }
}'
```

## Write transactions without verification

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/item' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
    "key": "'$(echo -n client:Ms. Noelia Jaskolski | base64)'",
    "value": "'$(echo -n Visa 1514284849020756 09/21 | base64)'"
    }
}'
```

## Write transactions with verification

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/item/safe' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
    "kv": {
         "key": "'$(echo -n client:Ms. Maci Schuppe | base64)'",
    "value": "'$(echo -n MasterCard 2232703813463070 12/19 | base64)'"
         }
}'
```

##  Add reference to existing entries

```bash

curl --location --request POST 'http://immugw:3323/v1/immurestproxy/safe/reference' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
    "ro": {
        "reference":  "'$(echo -n reference:Ms. Maci Schuppe | base64)'",
         "key": "'$(echo -n client:Ms. Maci Schuppe | base64)'"
    }
}'
```

##  Add secondary index

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/safe/zadd' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
    "zopts": {
        "set":  "'$(echo -n SetOfClientsThatAreWomen | base64)'",
        "score": 1.0,
        "key": "'$(echo -n client:Ms. Noelia Jaskolski | base64)'"
    }
}'
```

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/safe/zadd' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
    "zopts": {
        "set":  "'$(echo -n SetOfClientsThatAreWomen | base64)'",
        "score": 3.0,
        "key": "'$(echo -n client:Ms. Maci Schuppe | base64)'"
    }
}'
```

## Read entries without verification

```bash
curl --location --request GET 'http://immugw:3323/v1/immurestproxy/item/index/1' \
--header 'Authorization: Bearer {{token}}'
```

## Read entries with verification

```bash
curl --location --request POST 'http://immugw:3323/v1/immurestproxy/item/safe/get' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
         "key": "'$(echo -n client:Ms. Noelia Jaskolski | base64)'"
}'
```
## Scan entries

```bash
curl --request POST \
  --url http://immugw:3323/v1/immurestproxy/item/scan \
  --header 'content-type: application/json' \
  --data '{
  "prefix": "'$(echo -n client:Ms. Noelia Jaskolski | base64)'",
  "offset": "'$(echo -n client:Ms. Maci Schuppe | base64)'",
  "limit": "2",
  "reverse": true,
  "deep": true
}'
```
## Count  entries

```bash
curl --request GET \
  --url http://immugw:3323/v1/immurestproxy/item/count/Y2xpZW50Mg==
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
--data-raw '{
    "key": "'$(echo -n client:Mr. Valentin Padurean | base64)'",
    "value": "'$(echo -n MasterCard 2232703813463070 01/24 | base64)'",
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

## License

immugw is [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE).
