#!/bin/sh

rm -fr node_modules package-lock.json && npm cache clean -f && npm i -f && git add --all && git commit -m "chore: regenerated package-lock.json"