# Retention

<WrappedSection>

## Data Retention

Data retention refers to the practice of keeping data for a specific period of time before deleting it. This practice is commonly used in various industries and organizations to comply with legal and regulatory requirements, as well as to manage storage space and maintain data integrity.

One of the primary benefits of data retention is its ability to help maintain disk space. By setting a retention period, organizations can automatically delete data that is no longer needed, freeing up disk space for new data. This can be particularly useful for organizations that deal with large amounts of data, such as those in the financial or healthcare industries, where storing vast amounts of data can be costly.

In addition to helping maintain disk space, data retention also helps organizations manage their data more efficiently. By setting specific retention policies, organizations can ensure that data is only stored for as long as necessary and is deleted once it is no longer needed. This can help prevent data from being accidentally or maliciously retained beyond its usefulness, reducing the risk of data breaches and other security incidents.

</WrappedSection>


<WrappedSection>

## Data Retention in immudb

In immudb, the data retention feature only deletes data that is stored in the value log, leaving the proofs and schema configuration data intact. This is an important aspect of the retention feature because it ensures that the immudb database remains functional and that the proofs and schema configuration data required for immudb to operate correctly are not deleted.

The value log is where the actual values are stored in immudb. By only deleting data in the value log, the retention feature can remove old data from the immudb database while leaving the proofs and schema configuration data intact, hence freeing up disk space.

For example, suppose an organization has set a retention period of six months for their immudb database. After six months, any data that is older than six months will be automatically deleted from the value log.

</WrappedSection>

<WrappedSection>

## Settings

Data retention is enabled per database. You can truncate data from the database in two ways:

#### 1) While creating a database
```bash
Usage:
    immuadmin database create {database_name} --retention-period={retention_period} --truncation-frequency={truncation_frequency}
Flags:
      --retention-period duration                    duration of time to retain data in storage
      --truncation-frequency duration                set the truncation frequency for the database (default 24h0m0s)
```
A background process is setup on creation of the database which runs every `truncation-frequency` seconds, and then truncates the data beyond the `retention-period`

Please note that the default value of the `truncation-frequency` is set to 24 hours, and it does not need to be set explicitly when creating/updating a database.

#### 2) Manually truncating data through immuadmin

The following flags in the `immuadmin` tool will help in truncating data up to data retention period for your database.
```bash
Usage:
  immuadmin database truncate [flags]

Examples:
truncate --yes-i-know-what-i-am-doing {database_name} --retention-period {retention_period}

Flags:
  -h, --help                         help for truncate
      --retention-period duration    duration of time to retain data in storage
      --yes-i-know-what-i-am-doing   safety flag to confirm database truncation
```

</WrappedSection>

<WrappedSection>

## Setup

This setup guides you through a simple demonstration of how data retention works in immudb.

#### Before you begin

Make sure you already have [immudb installed](../running/download.md).

> Since you're running a local cluster, all nodes use the same hostname (`localhost`).

#### Step 1. Start the cluster

1. Run the immudb server:

   ```bash
   $ immudb --dir test_data
   ```

2. In a new terminal, use the [`immuadmin`](../connecting/clitools.md) command to create a database on the immudb server:

   Login to immudb

   ```shell
   $ immuadmin login immudb
   ```

   Create a database `db` that sets up the retention period to 1 day.

   > Note that the default value of the `truncation-frequency` is set to 24 hours, and it does not need to be set explicitly when creating/updating a database.

   ```shell
   $ immuadmin database create testdb \
      --retention-period=24h
   ```

   At this point, the `testdb` has been created on the server, and when every 24 hours, the data greater than the `retention-period` will be deleted from the value-log.

3. Alternatively, you can use the [`immuadmin`](../connecting/clitools.md) command to truncate an existing database which has not been setup with retention period:

   Login to immudb

   ```shell
   $ immuadmin login immudb -p 3324
   ```

   ```shell
   $ immuadmin database truncate --yes-i-know-what-i-am-doing=true testdb \
      --retention-period=24h
   ```

   At this point, the data beyond the retention period will be deleted in`testdb`.

</WrappedSection>
