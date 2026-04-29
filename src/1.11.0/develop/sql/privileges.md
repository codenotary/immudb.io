# Privileges

In addition to database level permissions, each user is associated to a subset of the following SQL privileges:

- `SELECT`
- `CREATE`
- `INSERT`
- `UPDATE`
- `DELETE`
- `DROP`
- `ALTER`

Each privilege grants the possibility to execute the corresponding SQL statement. Any attempt to run a statement without owning the corresponding privilege will be promply blocked by the `ErrAccessDenied` error.
<br/></br>

<WrappedSection>

### Show privileges

To show the SQL privileges associated to users, you can use the following statements:

```sql
SHOW GRANTS; -- show all users privileges

SHOW GRANTS FOR user; -- show the list of privileges connected to a specific user
```

</WrappedSection>

<WrappedSection>

### Alter privileges

Users with `admin` permission can grant and revoke SQL privileges to other users:

```sql
GRANT ALL PRIVILEGES TO myuser; -- grant all privileges to user

REVOKE SELECT, UPDATE ON DATABASE mydb TO USER myuser; -- revoke specific privileges to user
```

</WrappedSection>
