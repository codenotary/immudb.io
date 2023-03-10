.#!/bin/bash

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

cd "$DIR/src"

TMP_DIR="$(mktemp -d -t examples-check-XXXXXXXXXX)"
cp -R "code-examples/go" "${TMP_DIR}"

ls -1 | grep -E '^([0-9.]+)$' | while read N; do

    VER="$N"
    if [[ "$VER" != "master" ]]; then
        VER="v${VER}"
    fi

    echo "--- Checking examples used in $N"

    (grep -Eh '<<< @/src/code-examples/go' -R "$DIR/src/$N/" || true) \
    | sort \
    | uniq \
    | sed 's|^<<< @/src/code-examples/||g' \
    | while read F; do
        echo "$F"
        cd "$(dirname "$TMP_DIR/$F")"
        go get "github.com/codenotary/immudb@${VER}" &> /dev/null
        go build -o /tmp/build-output .
    done

done

echo "--- examples validated successfully"
