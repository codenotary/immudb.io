# Data types

| Name      | Description | Length constraints |
|-----------|-------------|--------------------|
| INTEGER   | Signed 64-bit integer value. Usually referred to as `BIGINT` in other databases. | - |
| BOOLEAN   | A boolean value, either `TRUE` or `FALSE` | - |
| VARCHAR   | UTF8-encoded text | Maximum number of bytes in the UTF-8 encoded representation of the string |
| BLOB      | sequence of bytes | Maximum number of bytes in the sequence |
| TIMESTAMP | datetime value with microsecond precision | - |

<br/><br/>

### Size constraints

Size constraint is specified with a `[MAX_SIZE]` suffix on the type,
e.g. `BLOB[16]` represents a sequence of up to 16 bytes.

### NULL values

`NULL` values in immudb are not unique - two `NULL` values are considered equal on comparisons.

### Timestamp values

Timestamp values are internally stored as a 64-bit signed integer being a number of microseconds since the epoch time.
Those values are not associated with any timezone, whenever a conversion is needed, it is considered to be in UTC.
