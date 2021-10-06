# Integration between immudb and other data technologies

## Use cases

immudb is designed to work with immutable data, using the relational model or the key/value model. For this reason it’s logical to use it as a primary way to persist the valuable and critical data.

Not all data is valuable or critical. Non-critical data include caches, star schemas that can always be rebuilt, and time series data that will only be preserved for one week or two. This kind of data should not be persisted in immudb: for each of them, more suitable technologies can be used.

While different data sets have different requirements and need to be stored in different technologies, sometimes they need to be used together. That’s the case, for example, when a data warehouse or a data lake are built from heterogeneous sources. Data will need to be copied from immudb to the data warehouse or data lake.

Another case is when data cannot be persisted into immudb from the beginning. For example because an existing application writes it into another DBMS, like MariaDB or PostgreSQL. This may be reliable enough as a first solution, because all major DBMSs provide durability and support high availability solutions. Data that should be stored by an immutable technology can be periodically moved from other DBMSs to immudb, for example every night or every weekend when the production workload is lower.

Note that immudb provides cryptographic proof that rows were inserted by a certain client and never altered. But this requires that the an [auditor](https://docs.immudb.io/0.9.0/immuclient/#auditor) is used. The auditor pattern is only available with certain methods:
* immugw supports safe reads and writes, so it is the safest way to import data into immudb tables.
* Currently the SQL layer provide safe [SELECT satements](https://docs.immudb.io/master/reference/sql.html#querying), but not safe [writes](https://docs.immudb.io/master/reference/sql.html#inserting-or-updating-data) (INSERT, UPSERT). If a row was altered, the inconsistencies will be noted when we read it, but not when we modify or replace it.
* The ODBC and [PostgreSQL](https://docs.immudb.io/master/develop/pg.html) protocols don't support safe reads or writes.
* The safeSet method verifies the old version of a value before replacing it, and safeGet verifies the value before returning it. set and get methods don't verify values.

For more information about immudb tamperproof, see [Tamperproof operations](https://docs.immudb.io/master/develop/operations.html#state-management).

This section is still work in progress, but it aims to cover all the most common data integration cases. In particular, we will cover how to move data from immudb to MariaDB and PostgreSQL, and the other way around.
