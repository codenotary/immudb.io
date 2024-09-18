(window.webpackJsonp=window.webpackJsonp||[]).push([[959],{1320:function(a,e,t){"use strict";t.r(e);var s=t(2),r=Object(s.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"replication"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#replication"}},[a._v("#")]),a._v(" Replication")]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"replication-strategy"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#replication-strategy"}},[a._v("#")]),a._v(" Replication strategy")]),a._v(" "),t("p",[a._v("immudb includes support for replication by means of a follower approach. A database can be created or configured either to be a primary or a replica of another database.")]),a._v(" "),t("div",{staticClass:"wrapped-picture"},[t("p",[t("img",{attrs:{src:"/immudb/replication-servers.jpg",alt:"replication using grpc clients"}})])]),a._v(" "),t("p",[a._v("During replication, primary databases have a passive role. The grpc endpoint "),t("code",[a._v("ExportTx")]),a._v(" is used by replicas to fetch unseen committed transactions from the primary.")]),a._v(" "),t("p",[a._v("Replicas are read only and any direct write operation will be rejected. Using replicas allow to distribute query loads.")]),a._v(" "),t("div",{staticClass:"wrapped-picture"},[t("p",[t("img",{attrs:{src:"/immudb/replication-comm.jpg",alt:"replicator fetches committed txs via grpc calls and replicate them using in-process method invocations"}})])])]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"replication-and-users"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#replication-and-users"}},[a._v("#")]),a._v(" Replication and users")]),a._v(" "),t("p",[a._v("As shown in the diagram above, the replicator fetches committed transaction from the primary via grpc calls. Internally, the replicator instantiates an immudb client (using the official golang SDK) and fetches unseen committed transactions from the primary. In order to do so, the replicator requires valid user credentials with admin permissions, otherwise the primary will reject any request.")])]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"creating-a-replica"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#creating-a-replica"}},[a._v("#")]),a._v(" Creating a replica")]),a._v(" "),t("p",[a._v("Creating a replica of an existent database using immuadmin is super easy:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("$ ./immuadmin login immudb\nPassword:\nlogged "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("in")]),a._v("\n$ ./immuadmin database create "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-is-replica "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-primary-username"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("immudb "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-primary-password"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("immudb "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-primary-database"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("defaultdb "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    replicadb\ndatabase "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'replicadb'")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("replica: true"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v(" successfully created\n")])])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("Display all database creation flags with:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("$ ./immuadmin "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("help")]),a._v(" database create \n")])])])]),a._v(" "),t("h3",{attrs:{id:"creating-a-second-immudb-instance-to-replicate-systemdb-and-defaultdb-behaves-similarly"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#creating-a-second-immudb-instance-to-replicate-systemdb-and-defaultdb-behaves-similarly"}},[a._v("#")]),a._v(" Creating a second immudb instance to replicate systemdb and defaultdb behaves similarly")]),a._v(" "),t("p",[a._v("Start immudb with enabled replication:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("$ ./immudb "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-is-replica "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-primary-username"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("immudb "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-primary-password"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("immudb "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    --replication-primary-host"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.0")]),a._v(".0.1\n")])])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("Display all replication flags:")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("$ ./immudb --help\n")])])])])]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"multiple-replicas"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#multiple-replicas"}},[a._v("#")]),a._v(" Multiple replicas")]),a._v(" "),t("p",[a._v("It's possible to create multiple replicas of a database. Each replica works independently of the others.")]),a._v(" "),t("div",{staticClass:"wrapped-picture"},[t("p",[t("img",{attrs:{src:"/immudb/replication-multiple.jpg",alt:"multiple replicas of the same primary database"}})])]),a._v(" "),t("p",[a._v("Given the primary database acts in passive mode, there are no special steps needed in order to create more replicas. Thus, by repeating the same steps to create the first replica it's possible to configure new ones.")])]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"replica-of-a-replica"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#replica-of-a-replica"}},[a._v("#")]),a._v(" Replica of a replica")]),a._v(" "),t("p",[a._v("In case many replicas are needed or the primary database is under heavy load, it's possible to delegate the creation of replicas to an existent replica. This way, the primary database is not affected by the total number of replicas being created.")]),a._v(" "),t("div",{staticClass:"wrapped-picture"},[t("p",[t("img",{attrs:{src:"/immudb/replication-chain.jpg",alt:"a replica indirectly following the primary"}})])])]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"external-replicator"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#external-replicator"}},[a._v("#")]),a._v(" External replicator")]),a._v(" "),t("p",[a._v("By creating a database as a replica but with disabled replication, no replicator is created for the database and an external process could be used to replicate committed transactions from the primary. The grpc endpoint "),t("code",[a._v("ReplicateTx")]),a._v(" may be used to externally replicate a transaction.")])]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"heterogeneous-settings"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#heterogeneous-settings"}},[a._v("#")]),a._v(" Heterogeneous settings")]),a._v(" "),t("p",[a._v("Replication is configured per database. Thus, the same immudb server may hold several primary and replica databases at the same time.")]),a._v(" "),t("div",{staticClass:"wrapped-picture"},[t("img",{attrs:{src:"/immudb/replication-server.jpg",width:"300",alt:"a single immudb server can hold multiple primary and replica databases"}})])]),a._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"replicator-tool"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#replicator-tool"}},[a._v("#")]),a._v(" Replicator tool")]),a._v(" "),t("p",[a._v("You may need to keep a copy of every database on one immudb instance on another, so that when a new database is created\non the main instance, a replicated database is created on the replica.")]),a._v(" "),t("p",[a._v("In that case you can use the "),t("a",{attrs:{href:"https://github.com/codenotary/immudb-tools/tree/main/replicator",target:"_blank",rel:"noopener noreferrer"}},[a._v("replicator tool"),t("OutboundLink")],1),a._v(", part of the\n"),t("a",{attrs:{href:"https://github.com/codenotary/immudb-tools",target:"_blank",rel:"noopener noreferrer"}},[a._v("immudb tools"),t("OutboundLink")],1),a._v(".")]),a._v(" "),t("p",[a._v("This tool connects to two immudb instances, one main instance and a replica. Periodically, scans the list of databases\npresent on the main instance and it compares that with the list of databases present on the replica. If it finds any new\ndatabases that are missing on the replicas, it will recreate it on the replica and it will configure it to start following\nits counterpart on the main.")]),a._v(" "),t("p",[a._v("If necessary (usually it is) it will also create the replication user on the main instance for the new database(s).")]),a._v(" "),t("p",[a._v("Using this tool you won't need to manually configure replicated databases on replica instance(s).")]),a._v(" "),t("p",[a._v("You can have more information about this tool on its "),t("a",{attrs:{href:"https://github.com/codenotary/immudb-tools/tree/main/replicator",target:"_blank",rel:"noopener noreferrer"}},[a._v("README page"),t("OutboundLink")],1),a._v(".")])])],1)}),[],!1,null,null,null);e.default=r.exports}}]);