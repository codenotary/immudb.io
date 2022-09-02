(window.webpackJsonp=window.webpackJsonp||[]).push([[531],{1041:function(t,e,n){"use strict";n.r(e);var a=n(14),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"index-cleaning"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#index-cleaning"}},[t._v("#")]),t._v(" Index cleaning")]),t._v(" "),n("WrappedSection",[n("p",[t._v("Maintaining a healthy disk usage is crucial. immudb has two operations operations aiming to remove unreferenced data from the index.\nA full index clean-up is achieved by calling "),n("code",[t._v("CompactIndex")]),t._v(", which is a routine that creates a fresh index based on the current state, removing all intermediate data generated over time.\nThe index is generated asynchronously, so new transactions may take place while it is created. As a result, if the server is constantly overloaded, there will likely be blocking times when the newly compacted index replaces the current one.")]),t._v(" "),n("p",[t._v("In the case of continuous load on the server, the "),n("code",[t._v("FlushIndex")]),t._v(" operation may be used instead. It will dump the current index into disk while partly removing unreferenced data. The "),n("code",[t._v("cleanupPercentage")]),t._v(" attribute indicates how much space will be scanned for unreferenced data. Even though this operation blocks transaction processing, choosing a small percentage e.g. 0.1 may not significantly hinder normal operations while reducing used storage space.")]),t._v(" "),n("p",[t._v("Partial compaction may be triggered automatically by immudb. Database settings can be modified to set the "),n("code",[t._v("cleanupPercentage")]),t._v(" attribute to non-zero in order to accomplish this.")])]),t._v(" "),n("Tabs",{attrs:{type:"border-card"}},[n("Tab",{attrs:{label:"Go"}},[n("div",{staticClass:"language-go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" main\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"context"')]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"log"')]),t._v("\n\n\timmudb "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/codenotary/immudb/pkg/client"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" immudb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewClient")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    ctx "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Background")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        \n    err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("OpenSession")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("`immudb`")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("`immudb`")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"defaultdb"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("defer")]),t._v(" client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("CloseSession")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// partial index cleanup")]),t._v("\n    err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("FlushIndex")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("schema"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("FlushIndexRequest"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        CleanupPercentage"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        Synced"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("            "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// if true, fsync after writing data to avoid index regeneration in the case of an unexpected crash")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error handling")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// full async index cleanup")]),t._v("\n    err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("CompactIndex")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("emptypb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Empty"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error handling")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("Tab",{attrs:{label:"Java"}},[n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("io"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("codenotary"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("immudb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("helloworld")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("io"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("codenotary"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("immudb4j"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")])]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("App")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileImmuStateHolder")]),t._v(" stateHolder "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileImmuStateHolder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("newBuilder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withStatesFolder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./immudb_states"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ImmuClient")]),t._v(" client "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ImmuClient")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("newBuilder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withServerUrl")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"127.0.0.1"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withServerPort")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3322")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withStateHolder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stateHolder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("login")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// partial index cleanup")]),t._v("\n        client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("flushIndex")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// full async index cleanup")]),t._v("\n        client"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("cleanIndex")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("Tab",{attrs:{label:"Python"}},[n("p",[t._v("This feature is not yet supported or not documented.\nDo you want to make a feature request or help out? Open an issue on "),n("a",{attrs:{href:"https://github.com/codenotary/immudb-py/issues/new",target:"_blank",rel:"noopener noreferrer"}},[t._v("Python sdk github project"),n("OutboundLink")],1)])]),t._v(" "),n("Tab",{attrs:{label:"Node.js"}},[n("p",[t._v("This feature is not yet supported or not documented.\nDo you want to make a feature request or help out? Open an issue on "),n("a",{attrs:{href:"https://github.com/codenotary/immudb-node/issues/new",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js sdk github project"),n("OutboundLink")],1)])]),t._v(" "),n("Tab",{attrs:{label:".Net"}},[n("p",[t._v("This feature is not yet supported or not documented.\nDo you want to make a feature request or help out? Open an issue on "),n("a",{attrs:{href:"https://github.com/codenotary/immudb4dotnet/issues/new",target:"_blank",rel:"noopener noreferrer"}},[t._v(".Net sdk github project"),n("OutboundLink")],1)])]),t._v(" "),n("Tab",{attrs:{label:"Others"}},[n("p",[t._v("If you're using another development language, please refer to the "),n("RouterLink",{attrs:{to:"/master/connecting/immugw.html"}},[t._v("immugw")]),t._v(" option.")],1)])],1),t._v(" "),n("WrappedSection",[n("h2",{attrs:{id:"how-indexing-works"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#how-indexing-works"}},[t._v("#")]),t._v(" How indexing works")]),t._v(" "),n("p",[t._v("immudb uses a btree to index key-value entries. While the key is the same submitted by the client, the value stored in the btree is an offset to the file where the actual value as stored, its size and hash value.")]),t._v(" "),n("p",[t._v("The btree is keep in memory as new data is inserted, getting a key or even the historical values of a key can directly be made by using a mutex lock on the btree but scanning by prefix requires the tree to be stored into disk, this is referred as a snapshot.\nThe persistence is implemented in append-only mode, thus whenever a snapshot is created (btree flushed to disk), updated and new nodes are appended to the file, while new or updated nodes may be linked to unmodified nodes (already written into disk) and those unmodified nodes are not rewritten.")]),t._v(" "),n("p",[t._v("The snapshot creation does not necessarily take place upon each scan by prefix, it's possible to reuse an already created one, client can provide his requirements on how new the snapshot should be by providing a transaction ID which at least must be indexed (sinceTx).")]),t._v(" "),n("p",[t._v("After some time, several snapshots may be created (specified by flushAfter properties of the btree and the scan requests), the file backing the btree will hold several old snapshots. Thus the clean index process will dump to a different location only the latest snapshot but in this case also writing the unmodified nodes. Once that dump is done, the index folder is replaced by the new one.")]),t._v(" "),n("p",[t._v("While the clean process is made, no data is indexed and there will be an extra disk space requirement due to the new dump. Once completed, a considerable disk space will be reduced by removing the previously indexed data (older snapshots).\nThe btree and clean up process is something specific to indexing. And will not lock transaction processing as indexing is asynchronously generated.")])]),t._v(" "),n("WrappedSection",[n("h2",{attrs:{id:"compactor-tool"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#compactor-tool"}},[t._v("#")]),t._v(" compactor tool")]),t._v(" "),n("p",[t._v("To manage index compaction, you can use the "),n("a",{attrs:{href:"https://github.com/codenotary/immudb-tools/tree/main/compactor",target:"_blank",rel:"noopener noreferrer"}},[t._v("compactor"),n("OutboundLink")],1),t._v(" tool,\npart of the "),n("a",{attrs:{href:"https://github.com/codenotary/immudb-tools",target:"_blank",rel:"noopener noreferrer"}},[t._v("immudb-tools"),n("OutboundLink")],1),t._v(" repository.")]),t._v(" "),n("p",[t._v("This tool can be used to perform periodic maintenance on your database indexes, or to configure online compaction.")]),t._v(" "),n("p",[t._v("The maintenance can be performed in three different ways:")]),t._v(" "),n("ul",[n("li",[t._v("online compaction")]),t._v(" "),n("li",[t._v("percentage compaction")]),t._v(" "),n("li",[t._v("full flush")])]),t._v(" "),n("p",[t._v("In all three modes, new indexes are calculated and old one are discarded. Indexes are organized in chunk files; each time a file only contains discarded indexes, it is automatically deleted.")]),t._v(" "),n("h3",{attrs:{id:"online-compaction"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#online-compaction"}},[t._v("#")]),t._v(" Online compaction")]),t._v(" "),n("p",[t._v("This kind of compaction is performed by immudb during normal write operations: once the amount of new written data reaches the percentage threshold configured per one database, immudb cleans up specified percentage of the index data, discarding old unreferenced data.")]),t._v(" "),n("p",[t._v("For every database, users can specify a percentage of total written data to be reindexed on every write.")]),t._v(" "),n("p",[t._v("The compactor tool can be used to enable this mode, and to set the percentage threshold. Once this is done, there is no need to run compactor tool periodically: the compaction will happen automatically.")]),t._v(" "),n("h3",{attrs:{id:"flush-compaction"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#flush-compaction"}},[t._v("#")]),t._v(" Flush compaction")]),t._v(" "),n("p",[t._v("In this mode, the tool calls for immudb to immediately perform a partial compaction, reindexing the oldest data up to the specified percentage. It is similar to the previous mode, but it is performed immediately and must be periodically issued.\nThe advantage is that you have control on the time when compaction is performed, so that you can leverage periods of less intense activity (e.g.: weekends or nights).")]),t._v(" "),n("h3",{attrs:{id:"full-compaction"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#full-compaction"}},[t._v("#")]),t._v(" Full compaction")]),t._v(" "),n("p",[t._v("All indexes are rebuilt. Very resource intensive, but it gives you the most compact representation of indexes.")]),t._v(" "),n("p",[t._v("You can get more information in the "),n("a",{attrs:{href:"https://github.com/codenotary/immudb-tools/tree/main/compactor",target:"_blank",rel:"noopener noreferrer"}},[t._v("README"),n("OutboundLink")],1)])])],1)}),[],!1,null,null,null);e.default=s.exports}}]);