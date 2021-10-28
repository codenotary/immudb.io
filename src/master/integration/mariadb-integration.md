# MariaDB / immudb integration

MariaDB is one of the major relational database systems, produced by the MariaDB Company. It is open source software released under the terms of the GNU GPLv2 license, and the MariaDB Foundation guarantees that its codebase will always remain open source. MariaDB is partly compatible with MySQL.

## Scenarios

MariaDB is supported by many applications and tools. When immudb is adopted by an organisation, there may be many reasons to import data into immudb from MariaDB. It is possible to export a whole database or a part of it. Data can be exported completely, or incrementally - for example, it is possible to export every night the data generated in the last day. Choosing a way to import data into immudb can be crucial, as various methods may not take advantage of immudb tamperproof capabilities, and some methods may be more complex and fragile than others.

Exporting data from immudb to MariaDB is also possible. Data can be written into immudb because of its tamperproof capabilities, and exported to MariaDB to take advantage of its more advanced SQL and its performance; or to make data available to applications that don’t support immudb.

## Importing data from MariaDB

We will discuss the following methods to import data from MariaDB to immudb:

| Method       | Tamperproof? | Notes |
| ------------ | ------------ | ------------ |
| MariaDB dump | Yes          |       |
| immugw       | Yes          | Using MariaDB CONNECT engine, with JSON table type |
| ODBC         | No           | Using MariaDB CONNECT engine, with ODBC table type |

NOTE: Some of the above methods may not be working yet, or may require some extra actions by the user. Specific documentation is in progress.

All the above methods allow to generate partial backups and incremental backups, though the logic needs to be implemented by the user.

## Exporting data into MariaDB

We will also discuss the following methods to export data from immudb to MariaDB:

| Method       | Notes        |
| ------------ | ------------ |
| immudb  dump |              |
| ODBC         | Using MariaDB CONNECT engine, with ODBC table type |

NOTE: Some of the above methods may not be working yet, or may require some extra actions by the user. Specific documentation is in progress.

