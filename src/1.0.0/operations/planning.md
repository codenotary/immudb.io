# Planning

<WrappedSection>

Before running a database in production, it is important to plan:

- Computing resources
- Disk space
- Configuration
- Backups
- Health Monitoring

### Disk space and data location

immudb is an immutable database, this means all history is preserved and therefore disk usage is higher than a normal database.

Data is stored in the directory specified by the `dir` option.

</WrappedSection>
