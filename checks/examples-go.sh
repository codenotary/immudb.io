#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")/.."
DIR="$(pwd)"

echo "--- Checking all go examples"

find "src/code-examples/go/" -type f -name '*.go' | while read N; do
    echo "$N"
    cd "$(dirname "$DIR/$N")"
    go mod download
    go build -o /tmp/build-output .
done

cd "$DIR"

echo "--- Checking examples used in master version if compile with newest SDK"

TMP_DIR="$(mktemp -d -t examples-check-XXXXXXXXXX)"
cp -R "src/code-examples/go" "${TMP_DIR}"

grep -Eh '<<< @/src/code-examples/go' -R src/master/ \
| sort \
| uniq \
| sed 's|^<<< @/src/code-examples/||' \
| while read N; do
    echo "$N"
    cd "$(dirname "$TMP_DIR/$N")"
    go get github.com/codenotary/immudb@master &>/dev/null
    go build -o /tmp/build-output .
done

echo "--- examples validated successfully"
