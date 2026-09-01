#!/bin/bash

###############################################################################
# Runs the same steps as .github/workflows/deploy.yml, locally, so a change can
# be checked before it is pushed.
###############################################################################

set -euo pipefail
cd "$(dirname "$0")/.."

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

passed=0
failed=0

check() {
    local name="$1"
    shift
    printf 'Checking: %-46s' "$name"
    if "$@" > /tmp/workflow-check.log 2>&1; then
        printf "${GREEN}ok${NC}\n"
        passed=$((passed + 1))
    else
        printf "${RED}FAILED${NC}\n"
        sed 's/^/    /' /tmp/workflow-check.log | tail -20
        failed=$((failed + 1))
    fi
}

# Hugo must be the extended build: the stylesheet goes through Hugo Pipes' PostCSS.
extended() { hugo version | grep -q '+extended'; }

# The three strings the VitePress build leaked onto hundreds of pages. If any of
# them is back, a container stopped being converted and the page ships raw markup.
no_leaked_markup() {
    local hits=0
    for pattern in '<p>:::' '&lt;&lt;&lt; @' 'WrappedSection'; do
        local n
        n=$(grep -rl "$pattern" public --include='*.html' | wc -l)
        if [ "$n" -ne 0 ]; then
            echo "$n page(s) contain '$pattern'"
            hits=1
        fi
    done
    return $hits
}

# The same gate as the workflow's "Check no page carries injected script" step.
# `unsafe = true` lets raw HTML through from content/*.md; this is what stops a
# <script>, a javascript: URL or an inline handler riding in that way. It also
# covers what the link render hook cannot -- a raw `<a href="javascript:...">`
# is never parsed as a markdown link, so the hook never sees it.
no_injected_script() {
    local hits=0 n
    while IFS= read -r f; do
        n=$({ grep -o '<script' "$f" || true; } | wc -l)
        if [ "$n" -gt 3 ]; then
            echo "$f has $n <script> tags, expected at most 3"
            hits=1
        fi
    done < <(find public -name '*.html' -not -path '*/pagefind/*')
    local found
    for pattern in 'javascript:' ' on[a-z]+='; do
        found=$({ grep -rlE "$pattern" public --include='*.html' || true; })
        if [ -n "$found" ]; then
            echo "pages contain '$pattern':"
            echo "$found" | sed 's/^/    /'
            hits=1
        fi
    done
    return $hits
}

echo "Building the site the way CI does"
echo

check "hugo is the extended build" extended
check "npm dependencies install" npm ci
check "hugo builds" hugo --minify --gc
check "pagefind indexes the build" npx pagefind --site public
check "no leaked container markup" no_leaked_markup
check "no injected script in the output" no_injected_script
check "CNAME survives the build" test -f public/CNAME
check "robots.txt survives the build" test -f public/robots.txt
check "sitemap points at docs.immudb.io" grep -q 'docs.immudb.io' public/sitemap.xml
check "old /master URLs still resolve" test -f public/master/develop/reading/index.html

echo
echo "$passed passed, $failed failed"
exit $((failed > 0))
