---
title: immudb release v0.6.1
image: /blog/mascot.jpg
excerpt: 
    Release v0.6.1 fixes some important bugs and has many improvements - we recommend updating to it 
date: 2020-06-09
tags: 
  - Release
  - GitHub
  - Go
  - Dockerhub
  - Community
author: Dennis
location: Switzerland
---

# immudb release v0.6.1

Release v0.6.1 fixes some important bugs and has many improvements - we recommend updating to it

# Changelog

<a name="v0.6.1"></a>
## [v0.6.1] - 2020-06-09
### Bug Fixes
- disallow running immuadmin backup with current directory as source
- immuadmin dump hangs indefinitely if token is invalid
- [#283](https://github.com/codenotary/immudb/issues/283), immudb crash on dump of empty db
- fix corruption checker crash during immudb shoutdown
- choose correct config for immudb, immugw installation
- update env vars in README and Docker files ([#297](https://github.com/codenotary/immudb/issues/297))
- **cmd/immuadmin:** inform user that manual server restart may be needed after interrupted backup
- **cmd/immuadmin:** validate backup dir before asking password
- **cmd/immuclient:** add version sub-command to immuclient interractive mode
- **cmd/immuclient:** nil pointer when audit-mode used with immudb running as daemon
- **cmd/immutest:** add new line at the end of output message
- **pkg/ring:** return nil on inconsistent access to buffer rings elements
- **pkg/store:** fix visualization of non frozen nodes inside print tree command
- **pkg/store/treestore:** fix overwriting on non frozen nodes

### Changes
- add license to tests ([#288](https://github.com/codenotary/immudb/issues/288))
- update statement about traditional DBs in README
- remove immugw configs from immudb config file [#302](https://github.com/codenotary/immudb/issues/302)
- **cmd/immuadmin/command:** improve visualization ui in merkle tree print command
- **cmd/immuadmin/command/service:** syntax error, build fails on windows
- **cmd/immuclient/audit:** code cleanup and renaming
- **pkg/store/treestore:** improve cache invalidation

### Code Refactoring
- handling of failed dump

### Features
- allow the password of immugw auditor to be base64 encoded in the config file ([#296](https://github.com/codenotary/immudb/issues/296))
- add auth support to immutest CLI
- add server-side logout ([#286](https://github.com/codenotary/immudb/issues/286))
- **cmd/helper:** add functionalities to print colored output
- **cmd/immuadmin:** add print tree command
- **cmd/immutest:** add env var for tokenfile
- **pkg:** add print tree functionality

# Downloads

**Docker image**
https://hub.docker.com/r/codenotary/immudb

**Immudb Binaries**

[v0.6.1. download](https://github.com/codenotary/immudb/releases/tag/v0.6.1)
