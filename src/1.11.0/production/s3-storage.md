# S3 Storage Backend

<WrappedSection>

immudb can store its data in the Amazon S3 service (or a compatible alternative). The following example shows how to run immudb with the S3 storage enabled:

```bash
export IMMUDB_S3_STORAGE=true
export IMMUDB_S3_ACCESS_KEY_ID=<S3 ACCESS KEY ID>
export IMMUDB_S3_SECRET_KEY=<SECRET KEY>
export IMMUDB_S3_BUCKET_NAME=<BUCKET NAME>
export IMMUDB_S3_LOCATION=<AWS S3 REGION>
export IMMUDB_S3_PATH_PREFIX=testing-001
export IMMUDB_S3_ENDPOINT="https://${IMMUDB_S3_BUCKET_NAME}.s3.amazonaws.com"

./immudb
```
</WrappedSection>