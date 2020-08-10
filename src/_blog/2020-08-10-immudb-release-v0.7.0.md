---
title: immudb release v0.7.0
image: /blog/mascot.jpg
excerpt: 
    Release v0.7.0 - multi-database support, more resilience, even better performance, improved documentation
date: 2020-06-16
tags: 
  - Release
  - GitHub
  - Go
  - Dockerhub
  - Community
author: Jerónimo
location: Argentina
---

# immudb release v0.7.0

Release v0.7.0 - multi-database support, more resilience, even better performance, improved documentation

immudb is getting faster and stronger! This release brings new features, even better performance and more resilience to immudb!

Summary of the most relevant points:
- Multi-database support (you can run many databases with one immudb server to separate data or to provide multi-tenancy)
- Enhanced user management (per database)
- Automated service and data recovery in case of unexpected OS or container crashes
- Improved service management for Microsoft Windows
- 100+ times faster cryptographic proofs (we completely revised and optimized the methods for entry validation; but don't worry, the API methods didn't change)
- Improved documentation for gRPC and structured value

Thanks for the amazing community feedback and contribution!


# Changelog

<a name="v0.7.0"></a>
## [v0.7.0] - 2020-08-10
### Bug Fixes
- userlist returns wrong message when logged in as immudb with single database
- use dedicated logger for store
- fix compilation error in corruption checker test
- race condition in token eviction
- chose defaultdb on user create if not in multiple db mode
- user list showing only the superadmin user even when other user exist
- fix multiple services config uninstall
- skip loading databases from disk when in memory is requested
- if custom port is <= 0 use default port for both immudb and immugw
- fix immugw failing to start with nil pointer dereference since gRPC dial options are inherited (bug was introduced in commit a4477e2e403ab35fc9392e0a3a2d8436a5806901)
- remove os.Exit(0) from disconnect method
- fix DefaultPasswordReader initialization. fixes [#404](https://github.com/vchain-us/immudb/issues/404)
- fix travis build sleep time
- use the correct server logger and use a dedicated logger with warning level for the db store
- **cmd/immuadmin/command:** fix user list output to support multiple databases (with permissions) for the same user
- **pkg/auth:** if new auth token is found in outgoing context it replaced the old one
- **pkg/client:** use database set internally database name
- **pkg/client:** inherit dial options that came from constructor
- **pkg/fs:** don't overwrite copy error on Close malfunction. Sync seals the operation–not Close.
- **pkg/gw:** fix client option construction with missing homedirservice
- **pkg/server:** added os file separator and db root path
- **pkg/server:** avoid recursion on never ending functionality. Further improvements can be done ([#427](https://github.com/vchain-us/immudb/issues/427))
- **pkg/server/server:** change user pass , old password check
- **pkg/service:** restore correct config path
- **pkg/store:** fix count method using a proper NewKeyIterator

### Changes
- refactor immuclient test
- fix tokenService typos
- add use database gw handler
- spread token service usage
- enhance immudb server messages during start
- capitalize immudb stop log message for consistency reasons
- remove permission leftovers and useless messages in client server protocol
- log immudb user messages during start to file if a logfile is specified
- use debug instead of info for some log messages that are not relevant to the user
- versioning token filename
- add auditor single run mode
- fix conflicts while rebasing from master
- remove user commands from immuclient
- add unit tests for zip and tar
- fix test
- improve command ux and fix changepassword test. Closes [#370](https://github.com/vchain-us/immudb/issues/370)
- change insert user to use safeset instead of set
- remove useless quitToStdError and os.exit calls
- remove sleep from tests
- use 0.0.0.0 instead of 127.0.0.1 as default address for both immudb and immugw
- using cobra command std out
- move immuadmin and immuclient service managing to pkg
- add homedir service
- rewrite tests in order to use pkg/server/servertest
- add codecov windows and freebsd ignore paths
- fix typo in UninstallManPages function name
- add coveralls.io stage
- refactor immuadmin service to use immuos abstraction
- add coverall badge
- add filepath abstration, use it in immuadmin backup and enhance coverage for backup test
- add os and filepath abstraction and use it in immuadmin backup command
- fix codecov ignore paths
- remove os wrapper from codecov.yml
- fix go test cover coverall
- fix immuclient tests
- add empty clientTest constructor
- user list client return a printable string
- add unexpectedNotStructuredValue error. fixes [#402](https://github.com/vchain-us/immudb/issues/402)
- add failfast option in test command
- fix contributing.md styling
- remove tests from windows CI
- add go-acc to calculate code coverage and fix go version to 1.13
- refactor immuclient test, place duplicated code in one place
- add an explicit data source on terminal reader
- TestHealthCheckFails if grpc is no fully closed
- add options to tuning corruption checking frequency, iteration and single iteration
- **cmd:** immugw and immudb use process launcher for detach mode
- **cmd:** token is managed as a string. fixes [#453](https://github.com/vchain-us/immudb/issues/453)
- **cmd:** fix typo in command messages
- **cmd:** enhance PrintTable function to support custom table captions and use such captions in immuadmin user and database list commands
- **cmd:** restore error handling in main method
- **cmd/helper:** add doc comment for the PrintTable function
- **cmd/immuadmin:** immuadmin user sub-commands use cobra, tests
- **cmd/immuadmin/command:** remove useless auth check in print tree command
- **cmd/immuadmin/command:** fix text alignment and case
- **cmd/immuadmin/command:** move command line and his command helper method in a single file
- **cmd/immuadmin/command:** automatically login the immuadmin user after forced password change is completed
- **cmd/immuadmin/command:** remove silent errors in immuadmin
- **cmd/immuadmin/command:** move options as dependency of commandline struct
- **cmd/immuadmin/command:** user and database list use table printer
- **cmd/immuclient/command:** remove useless comment
- **cmd/immuclient/immuc:** inject homedir service as dependency
- **cmd/immugw/command:** use general viper.BindPFlags binding instead of a verbose bindFlags solution
- **cmd/immutest/command:** inject homedir service as dependency
- **pkg/client/options:** add options fields and test
- **pkg/client/timestamp:** removed unused ntp timestamp
- **pkg/fs:** utilise filepath directory walk for copy
- **pkg/fs:** traceable copy errors
- **pkg/fs:** create file copy with flags from the start, in write-only mode
- **pkg/server:** add corruption checker random indexes generator  missing dependency
- **pkg/server:** improve tests
- **pkg/server:** mtls test certificates system db as immuserver property improve tests
- **pkg/server:** make DevMode default false and cleanup call to action message shwon right after immudb start
- **pkg/server:** immudb struct implements immudbIf interface, fixes previous tests
- **pkg/server:** add corruption checker random indexes generator dependency
- **pkg/store/sysstore:** remove useless method

### Code Refactoring
- add immuadmin services interfaces and terminal helper
- remove custom errors inside useDatabase and createDatabase services. Fixes [#367](https://github.com/vchain-us/immudb/issues/367)
- handle in idiomatic way errors in changePermission grpc service. Fixes [#368](https://github.com/vchain-us/immudb/issues/368)
- decoupled client options from server gateway constructor
- refactor detach() method in a process launcher service
- decouple manpage methods in a dedicated service
- **cmd:** move database management commands from immuclient to immuadmin. Fixes [#440](https://github.com/vchain-us/immudb/issues/440)
- **cmd/immuadmin/command:** using c.PrintfColorW instead c.PrintfColor to increase cobra.cmd integration for tests
- **cmd/immuadmin/command:** move checkLoggedInAndConnect, connect, disconnect from server to login file
- **cmd/immuadmin/command:** remove useless argument in Init and improve naming conventions

### Features
- add multiple databases support
- **cmd/helper:** add table printer
- **cmd/helper:** add PrintfColorW to decouple writer capabilities
- **cmd/immutest:** allow immutest to run on remote server
- **pkg/client:** add token service

# Downloads

**Docker image**
[v0.7.0 Dockerhub](https://hub.docker.com/r/codenotary/immudb)

**Immudb Binaries**

[v0.7.0 download](https://github.com/codenotary/immudb/releases/tag/v0.7.0)
