# Audit Logging

<WrappedSection>

immudb supports immutable, structured audit logging of all server operations. Every gRPC operation is recorded as a JSON audit event stored in immudb's tamper-proof KV store.

### Enabling audit logging

Start immudb with the `--audit-log` flag:

```bash
./immudb --audit-log
```

Or set the environment variable:

```bash
IMMUDB_AUDIT_LOG=true ./immudb
```

</WrappedSection>

<WrappedSection>

### Event types

Events are classified into five types:

| Type | Operations |
|------|-----------|
| **AUTH** | Login, Logout, OpenSession, CloseSession |
| **ADMIN** | CreateUser, ChangePassword, CreateDatabase, UpdateDatabase |
| **WRITE** | Set, Delete, SQLExec, InsertDocuments |
| **READ** | Get, SQLQuery, Scan, VerifiableGet |
| **SYSTEM** | TruncateDatabase, FlushIndex, ExportTx |

</WrappedSection>

<WrappedSection>

### Filtering events

Control which events are logged with `--audit-log-events`:

```bash
# Log everything (default)
./immudb --audit-log --audit-log-events=all

# Only write, admin, and auth events
./immudb --audit-log --audit-log-events=write

# Only admin and auth events
./immudb --audit-log --audit-log-events=admin
```

</WrappedSection>

<WrappedSection>

### Event format

Each event is stored as a JSON object:

```json
{
  "ts": 1712345678000000000,
  "user": "immudb",
  "ip": "10.0.0.5",
  "db": "defaultdb",
  "method": "/immudb.schema.ImmuService/Set",
  "type": "WRITE",
  "ok": true,
  "dur_ms": 2,
  "sid": "session-id-here"
}
```

Events are stored with the `audit:` key prefix and can be queried using the standard Scan API. They are cryptographically verifiable like all immudb data.

</WrappedSection>

<WrappedSection>

### Compliance features

- Events are **immutable** and tamper-evident, suitable for SOC 2, HIPAA, and GDPR compliance
- The logger **blocks for up to 5 seconds** when the internal buffer is full, rather than silently dropping events
- Write failures are **retried 3 times** with exponential backoff
- Dropped events (after timeout) are logged at **ERROR level** for monitoring

</WrappedSection>
