#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

FLAGLIST_DOCKER="$(
    docker run --pull=always -t codenotary/immudb:dev --help 2>/dev/null \
    | sed -E 's/^(\s+)-., /\1/g' \
    | grep -E '^\s+--' \
    | awk '{print $1}' \
    | grep -v 'help' \
    | sed 's/^--//g' \
)"

echo "Flags detected from the most recent docker dev image:"
echo "$FLAGLIST_DOCKER" | sed 's/^/  /g'
echo

FLAGLIST_DOC="$(
    cat ../src/master/running/configuration.md \
    | grep -E '^\| `' \
    | awk '{ print $2 }' \
    | tr -d '`' \
)"

echo "Flags found in the documentation:"
echo "$FLAGLIST_DOC" | sed 's/^/  /g'
echo

FLAGLIST_DOCKER="$(echo "$FLAGLIST_DOCKER" | sort)"
FLAGLIST_DOC="$(echo "$FLAGLIST_DOC" | sort)"

if [[ "$FLAGLIST_DOCKER" != "$FLAGLIST_DOC" ]]; then
    echo "Flags do not match!!"
    echo "Diff (left - parsed from immudb --help, right - parsed from documentation):"
    echo

    diff <( echo "$FLAGLIST_DOCKER" ) <( echo "$FLAGLIST_DOC" )
    exit 1
fi

echo "Flag list match correctly!!"
exit 0
