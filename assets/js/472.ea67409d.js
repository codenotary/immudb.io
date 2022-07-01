(window.webpackJsonp=window.webpackJsonp||[]).push([[472],{982:function(t,s,n){"use strict";n.r(s);var a=n(14),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"transactions"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#transactions"}},[t._v("#")]),t._v(" Transactions")]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),n("p",[t._v("Examples in multiple languages can be found at following links: "),n("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples",target:"_blank",rel:"noopener noreferrer"}},[t._v("immudb SDKs examples"),n("OutboundLink")],1)])]),t._v(" "),n("WrappedSection",[n("p",[t._v("immudb supports transactions both on key-value and SQL level, but interactive transactions are supported only on SQL with the exception of "),n("code",[t._v("execAll")]),t._v(" method, that provides some additional properties.")]),t._v(" "),n("p",[t._v("Interactive transactions are a way to execute multiple SQL statements in a single transaction. This makes possible to delegate application logic to SQL statements - a very common use case is for example checking if the balance > 0 before making a purchase.\nIn order to create a transaction, you must call the "),n("code",[t._v("NewTx()")]),t._v(" method on the client instance. The resulting object is a transaction object that can be used to execute multiple SQL statements, queries, commit or rollback.")]),t._v(" "),n("p",[t._v("Following methods are exposed by the transaction object:")]),t._v(" "),n("div",{staticClass:"language-go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Commit")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" CommittedSQLTx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Rollback")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLExec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sql"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" params"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLQuery")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sql"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" params"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" SQLQueryResult"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n")])])]),n("p",[t._v("It's possible to rollback a transaction by calling the "),n("code",[t._v("Rollback()")]),t._v(" method. In this case, the transaction object is no longer valid and should not be used anymore.\nTo commit a transaction, you must call the "),n("code",[t._v("Commit()")]),t._v(" method.")]),t._v(" "),n("p",[n("strong",[t._v("Note")]),t._v(": At the moment immudb support only 1 read-write transaction at a time, so it's up the application to ensure that only one read-write transaction is open at a time, or to handle read conflict error. In such case the error code returned by sdk will be "),n("code",[t._v("25P02")]),t._v(" "),n("strong",[t._v("CodInFailedSqlTransaction")]),t._v(".")])]),t._v(" "),n("Tabs",{attrs:{type:"border-card"}},[n("Tab",{attrs:{label:"Go"}},[n("div",{staticClass:"language-go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[t._v("  cli "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" immudb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewClient")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" cli"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("OpenSession")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("TODO")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("`immudb`")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("`immudb`")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"defaultdb"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  tx1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" cli"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewTx")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("TODO")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tx1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLExec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("TODO")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("`CREATE TABLE table1(id INTEGER,PRIMARY KEY id);`")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  rand"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Seed")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Now")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("UnixNano")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tx1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLExec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("TODO")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fmt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Sprintf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"INSERT INTO table1(id) VALUES (%d)"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rand"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Int")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  txh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" tx1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Commit")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("TODO")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  fmt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Printf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Successfully committed rows %d\\n"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" txh"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UpdatedRows"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cli"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("CloseSession")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("TODO")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("Tab",{attrs:{label:"Java"}},[n("p",[t._v("This feature is not yet supported or not documented.\nDo you want to make a feature request or help out? Open an issue on "),n("a",{attrs:{href:"https://github.com/codenotary/immudb4j/issues/new",target:"_blank",rel:"noopener noreferrer"}},[t._v("Java sdk github project"),n("OutboundLink")],1)])]),t._v(" "),n("Tab",{attrs:{label:"Python"}},[n("p",[t._v("Currently immudb Python sdk doesn't support interactive transactions.")]),t._v(" "),n("p",[t._v("However you can still use non-interactive SQL Transactions.")]),t._v(" "),n("div",{staticClass:"language-python extra-class"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" immudb "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ImmudbClient\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" uuid "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" uuid4\n\nURL "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"localhost:3322"')]),t._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# ImmuDB running on your machine")]),t._v("\nLOGIN "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),t._v("        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Default username")]),t._v("\nPASSWORD "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),t._v("     "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Default password")]),t._v("\nDB "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('b"defaultdb"')]),t._v("       "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Default database name (must be in bytes)")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    client "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ImmudbClient"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("URL"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("login"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("LOGIN"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" PASSWORD"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" database "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DB"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sqlExec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n        CREATE TABLE IF NOT EXISTS example (\n            uniqueID VARCHAR[64], \n            value VARCHAR[32],\n            created TIMESTAMP,\n            PRIMARY KEY(uniqueID)\n        );"""')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        \n    client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sqlExec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n        CREATE TABLE IF NOT EXISTS related (\n            id INTEGER AUTO_INCREMENT, \n            uniqueID VARCHAR[64], \n            relatedValue VARCHAR[32],\n            PRIMARY KEY(id)\n        );"""')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    uid1 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("uuid4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    uid2 "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("uuid4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    params "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uid1"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" uid1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uid2"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" uid2\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    \n    resp "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sqlExec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v("\"\"\"\n        BEGIN TRANSACTION;\n\n        INSERT INTO example (uniqueID, value, created) \n            VALUES (@uid1, 'test1', NOW()), (@uid2, 'test2', NOW());\n        INSERT INTO related (uniqueID, relatedValue) \n            VALUES (@uid1, 'related1'), (@uid2, 'related2');\n        INSERT INTO related (uniqueID, relatedValue) \n            VALUES (@uid1, 'related3'), (@uid2, 'related4');\n\n        COMMIT;\n    \"\"\"")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" params"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    \n    transactionId "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" resp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("txs"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("header"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),t._v("\n\n    result "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sqlQuery"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v('"""\n        SELECT \n            related.id,\n            related.uniqueID, \n            example.value, \n            related.relatedValue, \n            example.created\n        FROM related \n        JOIN example \n            ON example.uniqueID = related.uniqueID;\n    """')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" item "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" result"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" uid"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" relatedValue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" item\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ITEM"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" uid"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" relatedValue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isoformat"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    \n    result "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sqlQuery"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string-interpolation"}},[n("span",{pre:!0,attrs:{class:"token string"}},[t._v('f"""\n        SELECT \n            related.id,\n            related.uniqueID, \n            example.value, \n            related.relatedValue, \n            example.created\n        FROM related BEFORE TX ')]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("transactionId"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v(" \n        JOIN example BEFORE TX ")]),n("span",{pre:!0,attrs:{class:"token interpolation"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("transactionId"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v(' \n            ON example.uniqueID = related.uniqueID;\n    """')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("result"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# You can't see just added entries,")]),t._v("\n                  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# my fellow time traveller")]),t._v("\n\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" __name__ "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"__main__"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    main"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])]),t._v(" "),n("Tab",{attrs:{label:"Node.js"}},[n("p",[t._v("This feature is not yet supported or not documented.\nDo you want to make a feature request or help out? Open an issue on "),n("a",{attrs:{href:"https://github.com/codenotary/immudb-node/issues/new",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js sdk github project"),n("OutboundLink")],1)])]),t._v(" "),n("Tab",{attrs:{label:".Net"}},[n("p",[t._v("This feature is not yet supported or not documented.\nDo you want to make a feature request or help out? Open an issue on "),n("a",{attrs:{href:"https://github.com/codenotary/immudb4dotnet/issues/new",target:"_blank",rel:"noopener noreferrer"}},[t._v(".Net sdk github project"),n("OutboundLink")],1)])]),t._v(" "),n("Tab",{attrs:{label:"Others"}},[n("p",[t._v("If you're using another development language, please refer to the "),n("RouterLink",{attrs:{to:"/master/connecting/immugw.html"}},[t._v("immugw")]),t._v(" option.")],1)])],1)],1)}),[],!1,null,null,null);s.default=e.exports}}]);