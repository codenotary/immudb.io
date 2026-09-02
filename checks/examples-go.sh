#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")/.."
DIR="$(pwd)"

echo "--- Checking all go examples"

find "code-examples/go/" -type f -name '*.go' | while read -r N; do
    echo "$N"
    cd "$(dirname "$DIR/$N")"
    go mod download
    go build -o /tmp/build-output .
    cd "$DIR"
done

echo "--- Checking the examples the docs actually include"

TMP_DIR="$(mktemp -d -t examples-check-XXXXXXXXXX)"
cp -R "code-examples/go" "${TMP_DIR}"

# The docs now carry one version, so every snippet builds against master. The
# paths come out of the shortcode the migration replaced `<<< @` with.
grep -Eho '\{\{< snippet "/code-examples/go/[^"]+"' -R content/ \
| sed -E 's|^.*"/code-examples/||; s|"$||' \
| sort -u \
| while read -r F; do
    # An example whose directory pins a version documents that version's API, and
    # is checked against its own go.mod in the pass above, not against master.
    if [[ "$(dirname "$F")" =~ -v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "$F (pinned, skipped)"
        continue
    fi
    echo "$F"
    test -f "$DIR/code-examples/$F" || {
        echo "referenced example does not exist: code-examples/$F" >&2
        exit 1
    }
    cd "$(dirname "$TMP_DIR/$F")"
    # `go get` alone moves the requirement without recording the new module's
    # transitive dependencies, and the build then fails on missing go.sum entries.
    go get "github.com/codenotary/immudb@master" &> /dev/null
    go mod tidy &> /dev/null
    go build -o /tmp/build-output .
    cd "$DIR"
done

echo "--- examples validated successfully"
