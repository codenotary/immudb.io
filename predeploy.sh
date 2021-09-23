#!/bin/sh

rm -fr node_modules package-lock.json && npm cache clear && npm i -f && npm add --all && npm commit -m "chore: regenerated package-lock.json"