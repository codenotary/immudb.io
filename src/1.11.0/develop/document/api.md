# API

::: tip
By default, Swagger UI is enabled and can be accessed at `http://localhost:8080/api/docs/`
:::

<WrappedSection>

## Authentication

A session must be active in order for you to be able to access collection and document endpoints.

### Open session

In the following script, the default credentials are used to open a session in the defaultdb database.

A sessionID is assigned by immudb, and this value must be included in all subsequent requests.

```bash
sessionid=$(
curl -X 'POST' \
'http://localhost:8080/api/v2/authorization/session/open' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "username": "immudb", 
  "password":"immudb", 
  "database":"defaultdb"
}' | jq -r .sessionID)
```


### Close session

Although immudb automatically closes inactive sessions, it is a good practice to explicitly close sessions when they are not needed anymore in order to free up resources immediately.

```bash
curl -X 'POST' \
'http://localhost:8080/api/v2/authorization/session/close' -H "sessionID: $sessionid"
```

</WrappedSection>

<WrappedSection>

## Collections

Collections allow you to store and manage related documents together, making it easier to search and retrieve relevant data.

### Create collection

Any json object can be stored in a collection, but declared fields enable indexes to be created.

Here is the script that creates a collection with two fields of type `STRING` and a non-unique index over one of them.

```bash
curl -X 'POST' \
'http://localhost:8080/api/v2/collection/mycollection' \
-H "sessionID: $sessionid" \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "fields": [
    {"name": "name", "type": "STRING"},
    {"name": "surname", "type": "STRING"}
  ],
  "indexes": [
    {"fields": ["name"], "unique": "false"}
  ]
}'
```

The available types of fields are:
- STRING
- INTEGER
- BOOLEAN
- DOUBLE
- UUID

### Add field

A new field can be added to an existing collection.

```bash
curl -X 'POST' \
'http://localhost:8080/api/v2/collection/mycollection/field' \
-H "sessionID: $sessionid" \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "field": {
    "name": "active",
    "type": "BOOLEAN"
  }
}'
```

### Remove field

An existing field can be deleted. Prior to removing the field, it is necessary to remove any associated indexes.

```bash
curl -X 'DELETE' \
'http://localhost:8080/api/v2/collection/mycollection/field/active' \
-H "sessionID: $sessionid"
```

### Delete collection

It is possible to delete collections, and the physical removal of any declared index will be carried out. The raw data in the transaction commit log have not been altered, but this operation cannot be reversed.

```bash
curl -X 'DELETE' \
'http://localhost:8080/api/v2/collection/mycollection' \
-H "sessionID: $sessionid"
```

</WrappedSection>

::: tip
If you create lots of indexes, you may want to adjust default settings to reduce your memory footprint.

Indexing parameters, including cache-size, flush-thresholds, and max-active-snapshots, can be lowered as needed, but take into account more IO reads and writes, which may lead to poor indexing performance.
:::

<WrappedSection>

## Indexes

Collections allow you to store and manage related documents together, making it easier to search and retrieve relevant data.

### Create index

It is possible to create indexes over the declared fields in the collection.

Creating non-unique indexes is possible at any time, while creating unique ones is only possible when no documents have been stored.

```bash
curl -X 'POST' \
  'http://localhost:8080/api/v2/collection/mycollection/index' \
  -H 'accept: application/json' \
  -H "sessionID: $sessionid" \
  -H 'Content-Type: application/json' \
  -d '{
  "fields": [
    "surname"
  ]
}'
```

### Delete index

It is possible to delete collections, and the physical removal of any declared index will be carried out. The raw data in the transaction commit log have not been altered, but this operation cannot be reversed.

```bash
curl -X 'DELETE' \
'http://localhost:8080/api/v2/collection/mycollection/index?fields=surname' \
-H "sessionID: $sessionid"
```

</WrappedSection>

<WrappedSection>

## Documents

Collections allow you to store and manage related documents together, making it easier to search and retrieve relevant data.

### Insert document

Single or multiple documents can be inserted in a single request

```bash
curl -X 'POST' \
'http://localhost:8080/api/v2/collection/mycollection/documents' \
-H "sessionID: $sessionid" \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "documents": [
    {"name":"John", "surname":"Doe"},
    {"name":"Jane", "surname":"Smith"}
  ]
}'
```

### Search documents

It is possible to delete collections, and the physical removal of any declared index will be carried out. The raw data in the transaction commit log have not been altered, but this operation cannot be reversed.

```bash
curl -X 'POST' \
'http://localhost:8080/api/v2/collection/mycollection/documents/search' \
-H "sessionID: $sessionid" \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "query": {
    "expressions": [
      {
        "fieldComparisons": [
          {
            "field": "name",
            "operator": "EQ",
            "value": "John"
          }
        ]
      }
    ]
  },
  "page": 1,
  "pageSize": 10
}'
```

The supported operators are:

- EQ: equals to
- NE: not equals to
- LT: less than
- LE: less than or equal to
- GT: greater than
- GE: greater than or equal to
- LIKE: search using regular expressions, for example "value":"(doc)|(flick)" would allow searching for either values containing "doc" or "flick". The syntax of golang regexp is described in [this GitHub repo](https://github.com/google/re2/wiki/Syntax).


### Replace documents

A single or multiple documents can be atomically replaced.

```bash
curl -X 'PUT' \
  'http://localhost:8080/api/v2/collection/mycollection/documents/replace' \
  -H 'accept: application/json' \
  -H "sessionID: $sessionid" \
  -H 'Content-Type: application/json' \
  -d '{
  "query": {
    "expressions": [
      {
        "fieldComparisons": [
          {
            "field": "_id",
            "operator": "EQ",
            "value": "6530f0fa000000000000001f86853b05"
          }
        ]
      }
    ],
    "limit": 1
  },
  "document": {
      "first_name": "John",
      "last_name": "Doe",
      "age": 40
  }
}'
```

### Delete documents

Documents can be deleted. A document audit preserves document history and allows for retrieval of all revisions, even deleted ones.

```bash
curl -X 'POST' \
  'http://localhost:8080/api/v2/collection/mycollection/documents/delete' \
  -H 'accept: application/json' \
  -H "sessionID: $sessionid" \
  -H 'Content-Type: application/json' \
  -d '{
  "query": {
    "expressions": [
      {
        "fieldComparisons": [
          {
            "field": "first_name",
            "operator": "EQ",
            "value": "John"
          },
          {
            "field": "last_name",
            "operator": "EQ",
            "value": "Doe"
          }
        ]
      }
    ],
    "limit": 1
  }
}'
```

### Count documents

It is possible to retrieve the number of documents meeting a given criteria by using the document count endpoint.

```bash
curl -X 'POST' \
  'http://localhost:8080/api/v2/collection/mycollection/documents/count' \
  -H 'accept: application/json' \
  -H "sessionID: $sessionid" \
  -H 'Content-Type: application/json' \
  -d '{
  "query": {
    "expressions": [
      {
        "fieldComparisons": [
          {
            "field": "first_name",
            "operator": "EQ",
            "value": "Jane"
          }
        ]
      }
    ]
  }
}'
```

### Audit documents

Document revisions can be retrieved through a document audit. In auditing, all revisions are tracked and retrievable, even those that have been deleted.

In order to audit a document, it is necessary to know its unique identifier, which can be obtained by inserting or querying the document.

```bash
curl -X 'POST' \
  'http://localhost:8080/api/v2/collection/mycollection/document/6530f0fa000000000000001f86853b05/audit' \
  -H 'accept: application/json' \
  -H "sessionID: $sessionid" \
  -H 'Content-Type: application/json' \
  -d '{
  "page": 1,
  "pageSize": 10
}'
```

</WrappedSection>