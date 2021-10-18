# Mapping immudb data types to PostgreSQL  

In this section, we take a look at the following:  

-  For each immudb data type, which PostgreSQL is compatible?
-  Is it possible to map more than one PostgreSQL data type to types in immudb?
-  Size limits of PostgreSQL data types.

The following are PostgreSQL data types compatible with immudb data types:

## PostgreSQL numeric types

immudb supports numeric types such as INTEGER. However, in PostgreSQL, there are many numeric types. [PostgreSQL 13.4](https://www.postgresql.org/docs/13/datatype-numeric.html) numeric types include such as  `SMALLINT`, `BIGINT`, `INTEGER`, `DECIMAL`, `SERIAL`, `SMALLSERIAL`, `BIGSERIAL`, `REAL`, `DOUBLE PRECISION`, and `NUMERIC`.

It is possible for us to map the data type `INTEGER` in immudb to PostgreSQL `INTEGER` type.

immudb `INTEGER` type is compatible with PostgreSQL `INTEGER` type. It is also possible to make use of the `SMALLINT` type.   

Like other data types, the `INTEGER` type could also be used to define primary keys in the PostgreSQL table.

Check this [page](https://www.postgresql.org/docs/13/datatype-numeric.html) for detailed information on PostgreSQL numeric types.

## PostgreSQL conditional types

**BOOLEAN**: PostgreSQL `BOOLEAN` has three states: `TRUE`, `FALSE`, and `UNKNOWN`. `UNKNOWN` in this context refers to SQL null value. The storage size for the `BOOLEAN` type is 1 byte.

Both immudb and PostgreSQL support `TRUE` or `FALSE` as `BOOLEAN` values. However, immudb `BOOLEAN` type has a  third value known as `NULL` value. This `NULL` value refers to “missing” values just like PostgreSQL's `UNKNOWN` value.

You can use the `BOOLEAN` type to define an entity state such as whether a user has subscribed to a premium product or not.

Check this [page](https://www.postgresql.org/docs/current/datatype-boolean.html) for detailed information on PostgreSQL `BOOLEAN` type.

## PostgreSQL binary  types    

**BYTEA**: The `BYTEA` type is a bit different from the `BLOB` type provided by immudb. The functions and operators offered by `BYTEA` are almost the same as the `BLOB` type. The only difference is the input format. PostgreSQL uses the hex format. The output format of `BYTEA` type is hex by default. You can change the default value via the `bytea_output` parameter.  

The storage size is 1 0r 4 bytes plus the actual binary string.    

You can use the `BYTEA` type to store images, documents or other large objects..   

Check this [page](https://www.postgresql.org/docs/current/datatype-binary.html) for detailed information on PostgreSQL binary types.  

## PostgreSQL character types 

**VARCHAR**: The `VARCHAR` type is used to store strings up to a specified length. You can define the length by placing it in round brackets. If the `VARCHAR` type is used without the length specifier, it accepts strings of any size.   


**TEXT**: The `TEXT` type also stores strings of any length. Unlike the `VARCHAR` type, the `TEXT` type can store strings of any size by default. There is no need to define a length specifier.   

NB: If the `VARCHAR` type is defined as `VARCHAR(30)` it cannot accept strings with more than 30 characters. 
 
Check this [page](https://www.postgresql.org/docs/current/datatype-character.html) for detailed information on PostgreSQL character types.

At the time of documenting this page, immudb does not fully support `TIMESTAMP` type. However you can make use of an `INTEGER` type  with a `TIMESTAMP` value.









  