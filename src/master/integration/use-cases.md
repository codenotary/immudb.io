# Integration between immudb and other data technologies

## Use cases

immudb is designed to work with immutable data, using the relational model or the key/value model. For this reason it’s logical to use it as a primary way to persist the valuable and critical data.

Not all data is valuable or critical. Non-critical data include caches, star schemas that can always be rebuilt, and time series data that will only be preserved for one week or two. This kind of data should not be persisted in immudb: for each of them, more suitable technologies can be used.

While different data sets have different requirements and need to be stored in different technologies, sometimes they need to be used together. That’s the case, for example, when a data warehouse is built from heterogeneous sources. It is natural to move data from immudb to other relational databases to allow for further analyses.

Another case is when data cannot be persisted into immudb from the beginning. For example because an existing application writes it into another DBMS, like MariaDB or PostgreSQL. This may be reliable enough as a first solution, because all major DBMSs provide durability and support high availability solutions. Data that should be stored by an immutable technology can be periodically moved from other DBMSs to immudb, for example every night or every weekend when the production workload is lower.

This section is still work in progress, but it aims to cover all the most common data integration cases. In particular, we will cover how to move data from immudb to MariaDB and PostgreSQL, and the other way around.
