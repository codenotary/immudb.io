(window.webpackJsonp=window.webpackJsonp||[]).push([[649],{1008:function(t,s,a){"use strict";a.r(s);var e=a(2),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("By default, Swagger UI is enabled and can be accessed at "),a("code",[t._v("http://localhost:8080/api/docs/")])])]),t._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"authentication"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#authentication"}},[t._v("#")]),t._v(" Authentication")]),t._v(" "),a("p",[t._v("A session must be active in order for you to be able to access collection and document endpoints.")]),t._v(" "),a("h3",{attrs:{id:"open-session"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#open-session"}},[t._v("#")]),t._v(" Open session")]),t._v(" "),a("p",[t._v("In the following script, the default credentials are used to open a session in the defaultdb database.")]),t._v(" "),a("p",[t._v("A sessionID is assigned by immudb, and this value must be included in all subsequent requests.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("sessionid")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/authorization/session/open'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "username": "immudb", \n  "password":"immudb", \n  "database":"defaultdb"\n}\'')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq -r .sessionID"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v("\n")])])]),a("h3",{attrs:{id:"close-session"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#close-session"}},[t._v("#")]),t._v(" Close session")]),t._v(" "),a("p",[t._v("Although immudb automatically closes inactive sessions, it is a good practice to explicitly close sessions when they are not needed anymore in order to free up resources immediately.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/authorization/session/close'")]),t._v(" -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v("\n")])])])]),t._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"collections"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#collections"}},[t._v("#")]),t._v(" Collections")]),t._v(" "),a("p",[t._v("Collections allow you to store and manage related documents together, making it easier to search and retrieve relevant data.")]),t._v(" "),a("h3",{attrs:{id:"create-collection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-collection"}},[t._v("#")]),t._v(" Create collection")]),t._v(" "),a("p",[t._v("Any json object can be stored in a collection, but declared fields enable indexes to be created.")]),t._v(" "),a("p",[t._v("Here is the script that creates a collection with two fields of type "),a("code",[t._v("STRING")]),t._v(" and a non-unique index over one of them.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "fields": [\n    {"name": "name", "type": "STRING"},\n    {"name": "surname", "type": "STRING"}\n  ],\n  "indexes": [\n    {"fields": ["name"], "unique": "false"}\n  ]\n}\'')]),t._v("\n")])])]),a("h3",{attrs:{id:"delete-collection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#delete-collection"}},[t._v("#")]),t._v(" Delete collection")]),t._v(" "),a("p",[t._v("It is possible to delete collections, and the physical removal of any declared index will be carried out. The raw data in the transaction commit log have not been altered, but this operation cannot be reversed.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DELETE'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v("\n")])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("If you create lots of indexes, you may want to adjust default settings to reduce your memory footprint.")]),t._v(" "),a("p",[t._v("Indexing parameters, including cache-size, flush-thresholds, and max-active-snapshots, can be lowered as needed, but take into account more IO reads and writes, which may lead to poor indexing performance.")])]),t._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"indexes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#indexes"}},[t._v("#")]),t._v(" Indexes")]),t._v(" "),a("p",[t._v("Collections allow you to store and manage related documents together, making it easier to search and retrieve relevant data.")]),t._v(" "),a("h3",{attrs:{id:"create-index"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-index"}},[t._v("#")]),t._v(" Create index")]),t._v(" "),a("p",[t._v("It is possible to create indexes over the declared fields in the collection.")]),t._v(" "),a("p",[t._v("Creating non-unique indexes is possible at any time, while creating unique ones is only possible when no documents have been stored.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection/index'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "fields": [\n    "surname"\n  ]\n}\'')]),t._v("\n")])])]),a("h3",{attrs:{id:"delete-index"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#delete-index"}},[t._v("#")]),t._v(" Delete index")]),t._v(" "),a("p",[t._v("It is possible to delete collections, and the physical removal of any declared index will be carried out. The raw data in the transaction commit log have not been altered, but this operation cannot be reversed.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DELETE'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection/index?fields=surname'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v("\n")])])])]),t._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"documents"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#documents"}},[t._v("#")]),t._v(" Documents")]),t._v(" "),a("p",[t._v("Collections allow you to store and manage related documents together, making it easier to search and retrieve relevant data.")]),t._v(" "),a("h3",{attrs:{id:"insert-document"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#insert-document"}},[t._v("#")]),t._v(" Insert document")]),t._v(" "),a("p",[t._v("Single or multiple documents can be inserted in a single request")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection/documents'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "documents": [\n    {"name":"John", "surname":"Doe"},\n    {"name":"Jane", "surname":"Smith"}\n  ]\n}\'')]),t._v("\n")])])]),a("h3",{attrs:{id:"search-documents"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#search-documents"}},[t._v("#")]),t._v(" Search documents")]),t._v(" "),a("p",[t._v("It is possible to delete collections, and the physical removal of any declared index will be carried out. The raw data in the transaction commit log have not been altered, but this operation cannot be reversed.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection/documents/search'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "query": {\n    "expressions": [\n      {\n        "fieldComparisons": [\n          {\n            "field": "name",\n            "operator": "EQ",\n            "value": "John"\n          }\n        ]\n      }\n    ]\n  },\n  "page": 1,\n  "pageSize": 10\n}\'')]),t._v("\n")])])]),a("h3",{attrs:{id:"replace-documents"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#replace-documents"}},[t._v("#")]),t._v(" Replace documents")]),t._v(" "),a("p",[t._v("A single or multiple documents can be atomically replaced.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'PUT'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection/documents/replace'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "query": {\n    "expressions": [\n      {\n        "fieldComparisons": [\n          {\n            "field": "_id",\n            "operator": "EQ",\n            "value": "6530f0fa000000000000001f86853b05"\n          }\n        ]\n      }\n    ],\n    "limit": 1\n  },\n  "document": {\n      "first_name": "John",\n      "last_name": "Doe",\n      "age": 40\n  }\n}\'')]),t._v("\n")])])]),a("h3",{attrs:{id:"delete-documents"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#delete-documents"}},[t._v("#")]),t._v(" Delete documents")]),t._v(" "),a("p",[t._v("Documents can be deleted. A document audit preserves document history and allows for retrieval of all revisions, even deleted ones.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection/documents/delete'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "query": {\n    "expressions": [\n      {\n        "fieldComparisons": [\n          {\n            "field": "first_name",\n            "operator": "EQ",\n            "value": "John"\n          },\n          {\n            "field": "last_name",\n            "operator": "EQ",\n            "value": "Doe"\n          }\n        ]\n      }\n    ],\n    "limit": 1\n  }\n}\'')]),t._v("\n")])])]),a("h3",{attrs:{id:"audit-documents"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#audit-documents"}},[t._v("#")]),t._v(" Audit documents")]),t._v(" "),a("p",[t._v("Document revisions can be retrieved through a document audit. In auditing, all revisions are tracked and retrievable, even those that have been deleted.")]),t._v(" "),a("p",[t._v("In order to audit a document, it is necessary to know its unique identifier, which can be obtained by inserting or querying the document.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/api/v2/collection/mycollection/document/6530f0fa000000000000001f86853b05/audit'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accept: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sessionID: '),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$sessionid")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n  "page": 1,\n  "pageSize": 10\n}\'')]),t._v("\n")])])])])],1)}),[],!1,null,null,null);s.default=n.exports}}]);