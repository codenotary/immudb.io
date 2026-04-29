# User Management

<WrappedSection>

### CREATE USER

Users can be created with the `CREATE USER` statement as follows:

```sql
CREATE USER user1 WITH PASSWORD 'user1Password!' READWRITE;
```

Possible permissions are: `READ`, `READWRITE` and `ADMIN`.

An admin user is able to fully manage the current database.

</WrappedSection>

<WrappedSection>

### ALTER USER

User password and permissions can be modified with the `ALTER USER` statement as follows:

```sql
ALTER USER user1 WITH PASSWORD 'newUser1Password!' ADMIN;
```

</WrappedSection>

<WrappedSection>

### DROP USER

An existing user can be deleted.
Deletion is logically done and the user can be reactivated by executing an `ALTER USER` statement.

```sql
DROP USER user1;
```

</WrappedSection>