(window.webpackJsonp=window.webpackJsonp||[]).push([[487],{1e3:function(e,t,a){"use strict";a.r(t);var n=a(14),i=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"performance-guide"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#performance-guide"}},[e._v("#")]),e._v(" Performance guide")]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"dependency-on-the-b-tree-index"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dependency-on-the-b-tree-index"}},[e._v("#")]),e._v(" Dependency on the B-Tree index")]),e._v(" "),a("p",[e._v("Immudb is built in a layered approach.\nThe most low-level layer in immudb is an immutable log of changes.\nAn atomic entry in this log level corresponds to a single transaction.\nEach transaction has an ID assigned - those IDs are increasing monotonically\nthus it is easy to reference a specific transaction ID.")]),e._v(" "),a("p",[e._v("Each transaction contains a list of Key-Metadata-Value entries which correspond to\nchanges to the database made within such transaction.")]),e._v(" "),a("p",[e._v("Transactions ending up in immudb are protected from tampering attacks\nby the parallel Merkle tree structure built from the transaction data.")]),e._v(" "),a("p",[e._v("By default immudb builds an additional index based on a B-tree structure for fast key lookup.\nThis B-Tree is built in an asynchronous routine in parallel to the write operations.\nThis asynchronous nature of indexing can be used to gain significant performance gains\nby avoiding strict dependency on the indexing.")]),e._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("+------------------+\n|        SQL       |\n+---------+--------+\n          |\n          v\n+------------------+\n|   KV (Indexed)   |\n+---------+--------+\n          |\n          v\n+------------------+\n|        Log       |\n+---------+--------+\n")])])]),a("h3",{attrs:{id:"using-immudb-as-an-immutable-ledger"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-immudb-as-an-immutable-ledger"}},[e._v("#")]),e._v(" Using immudb as an immutable ledger")]),e._v(" "),a("p",[e._v("To achieve the best performance immudb can be used as an immutable ledger only.\nIn such case the index can be completely ignored to avoid performance and time penalty due to indexing.\nBelow is the list of operations that do not rely on the index at all.")]),e._v(" "),a("ul",[a("li",[e._v("Data should be inserted into the database in asynchronous mode\nthat is enabled by setting the "),a("code",[e._v("noWait")]),e._v(" GRPC argument to "),a("code",[e._v("true")]),e._v(".\nTo avoid dependency on the index one should also avoid using\nconditional writes and "),a("RouterLink",{attrs:{to:"/master/develop/transactions.html#execall"}},[e._v("ExecAll")]),e._v(" operations.")],1),e._v(" "),a("li",[e._v("To read the data from the database, use one of the following operations:\n"),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/master/develop/reading.html#get-at-and-since-a-transaction"}},[e._v("GetAt")]),e._v(" to get value of a key set at given tx ID,")],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/master/develop/reading.html#get-at-txid"}},[e._v("GetAtTxID")]),e._v(" to get all entries from given transaction,")],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/master/develop/transactions.html#txscan"}},[e._v("TxScan")]),e._v(" to perform an enhanced scan of entries within one transaction.\nStandard retrieval of the most recent value for given key should not be used.\nIn most cases this means that the transaction ID must be stored in some external persistent storage.")],1)])])]),e._v(" "),a("p",[e._v("The SQL layer heavily depends on the B-tree index thus it can not be used when immudb is\ntreated as an immutable ledger only.")]),e._v(" "),a("h3",{attrs:{id:"indexed-kv-layer-asynchronous"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#indexed-kv-layer-asynchronous"}},[e._v("#")]),e._v(" Indexed KV layer - asynchronous")]),e._v(" "),a("p",[e._v("Working with Key-Value entries is hard without the ability to quickly get the value behind some key\nwhich require the B-Tree index structure.")]),e._v(" "),a("p",[e._v("The B-Tree index is built in an asynchronous mode - once data is inserted into the transaction log,\na separate routine periodically updates it.\nBy default all immudb operations wait for the index to be up to date\nto ensure that the most recent writes are already fully processed.\nIn some use cases such waiting for the indexer is not necessary and can be skipped\nor reduced that leads to a much greater performance of the application.\nBelow is the list of operations that adjust the index processing requirements.")]),e._v(" "),a("ul",[a("li",[e._v("Data can be inserted into the database in asynchronous mode\nthat is enabled by setting the "),a("code",[e._v("noWait")]),e._v(" GRPC argument to "),a("code",[e._v("true")]),e._v(".\nBy doing so, the data is inserted as quickly as possible into the\ntransaction log and right after that, the response is sent to the caller\nwithout waiting for the index at all.\nTo avoid dependency on the btree one must also avoid using\n"),a("RouterLink",{attrs:{to:"/master/develop/reading.html#conditional-writes"}},[e._v("conditional writes")]),e._v(" and "),a("RouterLink",{attrs:{to:"/master/develop/transactions.html#execall"}},[e._v("ExecAll")]),e._v(" operations that implicitly require\nup-to-date index.")],1),e._v(" "),a("li",[e._v("Reading the data from the database should be done by using one of the following operations:\n"),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/master/develop/reading.html#get-at-and-since-a-transaction"}},[e._v("GetAt")]),e._v(" to get value of a key set at given tx ID,")],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/master/develop/reading.html#get-at-txid"}},[e._v("GetAtTxID")]),e._v(" to get all entries from given transaction,")],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/master/develop/reading.html#get-at-and-since-a-transaction"}},[e._v("GetSince")]),e._v(" where the indexer is only required to process up to given transaction ID,")],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/master/develop/transactions.html#txscan"}},[e._v("TxScan")]),e._v(" to perform an enhanced scan of entries within one transaction.")],1)])])]),e._v(" "),a("p",[e._v("The SQL layer heavily depends on the B-tree index thus it can not be used when relaxed indexing requirements are used.")]),e._v(" "),a("h3",{attrs:{id:"indexed-kv-layer-synchronous"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#indexed-kv-layer-synchronous"}},[e._v("#")]),e._v(" Indexed KV layer - synchronous")]),e._v(" "),a("p",[e._v("This mode of operation is very similar to the asynchronous one but with the requirement\nthat the B-tree index must be up-to-date. This is the default mode that immudb operates in.")]),e._v(" "),a("p",[e._v("When using immudb in synchronous mode, all functionalities of immudb's KV interface can be used.\nCertain operations such as "),a("RouterLink",{attrs:{to:"/master/develop/transactions.html#execall"}},[e._v("ExecAll")]),e._v(" or "),a("RouterLink",{attrs:{to:"/master/develop/reading.html#conditional-writes"}},[e._v("conditional writes")]),e._v(" require up-to-date index\nand should only be used when there's a guarantee that those will meet the performance\nrequirements of the application.")],1),e._v(" "),a("h3",{attrs:{id:"sql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sql"}},[e._v("#")]),e._v(" SQL")]),e._v(" "),a("p",[e._v("When immudb is used as an SQL database, all operations require an up to date index.\nThis means that optimizations that relax B-tree indexing requirements can not be used.")]),e._v(" "),a("p",[e._v("The SQL layer in immudb is built on top of the KV layer.\nFor each row in SQL table one entry is generated for the primary key.\nThat entry contains the whole row data.")]),e._v(" "),a("p",[e._v("In addition to that, for every index on that table, one additional KV entry\nis added that keeps the reference to the original entry created for the primary key.")])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"data-modelling"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-modelling"}},[e._v("#")]),e._v(" Data modelling")]),e._v(" "),a("p",[e._v("Applications can structure their data in many different ways.\nThe chosen data model will affect the performance of the immudb.\nBelow are some tips that can help optimizing and selecting the correct model for the data.")]),e._v(" "),a("h3",{attrs:{id:"kv-layer-key-length"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kv-layer-key-length"}},[e._v("#")]),e._v(" KV layer - key length")]),e._v(" "),a("p",[e._v("Short keys should be preferred over long ones. Long keys naturally increase the disk space usage\nincreasing the overall IO pressure but also affect the shape of the B-Tree. The longer keys are used,\nthe deeper B-tree will become and thus a longer B-tree traversal needs to be performed to find specific\nkey entry. Larger B-tree will also mean that the internal B-tree cache will perform much worse reducing\nhit/miss ratio.")]),e._v(" "),a("h3",{attrs:{id:"kv-layer-sequential-keys"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kv-layer-sequential-keys"}},[e._v("#")]),e._v(" KV layer - sequential keys")]),e._v(" "),a("p",[e._v("Sequentially built keys (like those based on monotonically increasing numbers)\nshould be preferred over randomly generated ones.\nThis directly relates to hit/miss ration of the the B-tree cache.\nSequential keys tend to use similar parts of the B-tree thus there is a much higher\nprobability that B-tree traversal will use cached nodes.")]),e._v(" "),a("p",[e._v("This is especially important when immudb is used with an S3 remote storage.\nAny B-tree cache miss will result in a heavy read operation for the S3 server.")]),e._v(" "),a("h3",{attrs:{id:"sql-layer-indexes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sql-layer-indexes"}},[e._v("#")]),e._v(" SQL layer - indexes")]),e._v(" "),a("p",[e._v("All SQL operations in immudb are lowered to operations on the KV layer.\nTo optimize the performance of the SQL engine it is thus important to\nunderstand how immudb generates keys for the KV layer from SQL data.")]),e._v(" "),a("p",[e._v("Low-level keys generated by the SQL layer are directly related to\nSQL indexes. Each index consists of serialized values of columns\nthat are part of the index. This means that the more columns are in\nthe index, the longer keys will be produced. Same happens with\ncolumn types. Small types such as INTEGER will result in short\nlow-level key where larger ones (such as VARCHAR with large limit)\nwill produce very long keys.")]),e._v(" "),a("p",[e._v("Each table can have multiple indexes where each new index will\ngenerate new entries inserted into the KV layer. It is thus important\nto avoid creating unnecessary indexes.")])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"immudb-replicas"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#immudb-replicas"}},[e._v("#")]),e._v(" immudb replicas")]),e._v(" "),a("p",[e._v("immudb offers "),a("RouterLink",{attrs:{to:"/master/production/replication.html"}},[e._v("replication")]),e._v(" mechanism where replicas follow the leader\nnode cloning its data.")],1),e._v(" "),a("p",[e._v("Such replica nodes can be used to handle read operations reducing the\nload in the leader node. In such scenario it is important to ensure\nthat the replica is following the leader in asynchronous mode\nresulting in an eventual consistency guarantees.")]),e._v(" "),a("p",[e._v("Replication can be configured in various ways including tree-like topology\nand multiple replication levels (like "),a("RouterLink",{attrs:{to:"/master/production/replication.html#replica-of-a-replica"}},[e._v("replicas of replicas")]),e._v(").\nWith such feature, the immudb cluster can be scaled to a very large topology with the ability\nto handle huge read workloads.")],1)]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"embedded-immudb-vs-standalone-service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#embedded-immudb-vs-standalone-service"}},[e._v("#")]),e._v(" embedded immudb vs standalone service")]),e._v(" "),a("p",[e._v("immudb can be easily "),a("RouterLink",{attrs:{to:"/master/embedded/embedding.html"}},[e._v("embedded")]),e._v(" into other golang applications.\nBy doing so, the application does access immudb data directly without additional TCP connection.\nThat way the additional cost of handling TCP connectivity, GRPC serialization etc. are removed.")],1),e._v(" "),a("p",[e._v("It is important to note however that the embedded immudb interface is much simpler\nthan the GRPC API - e.g. it has no direct support for references or sorted sets.\nIn addition to that, any networking-related features such as replication or backups\nmust be handled by the application itself.")])])],1)}),[],!1,null,null,null);t.default=i.exports}}]);