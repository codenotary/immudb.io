(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{639:function(t,e,a){"use strict";a.r(e);var s=a(19),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"how-it-works"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-it-works"}},[t._v("#")]),t._v(" How it works")]),t._v(" "),a("p",[t._v("Download "),a("a",{attrs:{href:"https://codenotary.com/technologies/immudb/",target:"_blank",rel:"noopener noreferrer"}},[t._v("immudb short research paper"),a("OutboundLink")],1),t._v(" to have a conceptual understanding of the technical foundations of immudb.")]),t._v(" "),a("h2",{attrs:{id:"adding-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-data"}},[t._v("#")]),t._v(" Adding data")]),t._v(" "),a("p",[t._v("When adding data the merkle tree changes as well as shown in the diagram")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://github.com/codenotary/immudb/raw/master/img/immudb-adding-data-diagram.png",alt:"the merkle tree changes with every new data"}})]),t._v(" "),a("h2",{attrs:{id:"checking-data-consistency"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#checking-data-consistency"}},[t._v("#")]),t._v(" Checking data consistency")]),t._v(" "),a("p",[t._v("The following diagram explains how data is inserted, verified and consistency checked.")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://github.com/codenotary/immudb/raw/master/img/immudb-consistency-diagram.png",alt:"How immudb data consistency works"}})]),t._v(" "),a("h2",{attrs:{id:"structured-value"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#structured-value"}},[t._v("#")]),t._v(" Structured value")]),t._v(" "),a("p",[t._v("The messages structure allows callers to use key value pairs as embedded payload. Thus, it will soon be possible to decouple and extend\nthe value structure. The value, currently a stream of bytes, can be augmented with some client provided metadata.\nThis also permits use of an on-demand serialization/deserialization strategy.")]),t._v(" "),a("p",[t._v("The payload includes a timestamp and a value at the moment. In the near future cryptographic signatures will be added as well, but it's\npossible to decouple and extend. The entire payload contribute to hash generation and is inserted in\nthe merkle tree.")]),t._v(" "),a("p",[t._v("All the complexity is hidden by the SDK.")]),t._v(" "),a("h2",{attrs:{id:"root-signature"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#root-signature"}},[t._v("#")]),t._v(" Root signature")]),t._v(" "),a("p",[t._v("Providing "),a("code",[t._v("immudb")]),t._v(" with a signing key enables the cryptographic root signature.\nIn this way an auditor for instance or a third party client could verify the authenticity of the returned root hash / index pair after calling "),a("code",[t._v("currentRoot")]),t._v(" gRPC method.\nHere the gRPC message definitions:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("message Root {\n\tRootIndex payload = 1;\n\tSignature signature = 2;\n}\n\nmessage RootIndex {\n\tuint64 index = 1;\n\tbytes root = 2;\n}\n\nmessage Signature {\n\tbytes signature = 1;\n\tbytes publicKey = 2;\n}\n")])])]),a("p",[t._v("It's possible to use the environment "),a("code",[t._v("IMMUDB_SIGNINGKEY")]),t._v(" or "),a("code",[t._v("--signingKey")]),t._v(" immudb flag.")]),t._v(" "),a("p",[t._v("To generate a valid key it's possible to use "),a("code",[t._v("openssl")]),t._v(" tool:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("openssl ecparam -name prime256v1 -genkey -noout -out my.key\n")])])]),a("p",[t._v("Immuclient and "),a("a",{attrs:{href:"https://github.com/codenotary/immugw",target:"_blank",rel:"noopener noreferrer"}},[t._v("immugw"),a("OutboundLink")],1),t._v(" are shipped with auditor capabilities.\nTo obtain the advantages of using the signed root in combination with the auditor it's possible to launch:")]),t._v(" "),a("ul",[a("li",[t._v("immuclient with auditor capabilities:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("immuclient audit-mode --audit-username "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("immudb-username"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" --audit-password "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("immudb-pw"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" --audit-signature validate\n")])])]),a("ul",[a("li",[t._v("with "),a("a",{attrs:{href:"https://github.com/codenotary/immugw",target:"_blank",rel:"noopener noreferrer"}},[t._v("immugw"),a("OutboundLink")],1),t._v(" with auditor capabilities:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("./immugw --audit --audit-username "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("immudb-username"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" --audit-password "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("immudb-pw"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" --audit-signature validate\n")])])]),a("h2",{attrs:{id:"item-references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#item-references"}},[t._v("#")]),t._v(" Item References")]),t._v(" "),a("p",[t._v("Enables the insertion of a special entry which references to another item")]),t._v(" "),a("h2",{attrs:{id:"value-timestamp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#value-timestamp"}},[t._v("#")]),t._v(" Value timestamp")]),t._v(" "),a("p",[t._v("The server should not set the timestamp, to avoid relying on a non-verifiable “single source of truth”.\nThus, the clients must provide it. The client driver implementation can automatically do that for the user.")]),t._v(" "),a("h2",{attrs:{id:"primary-index"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#primary-index"}},[t._v("#")]),t._v(" Primary Index")]),t._v(" "),a("p",[t._v("Index enables queries and search based on the data key")]),t._v(" "),a("h2",{attrs:{id:"secondary-index"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#secondary-index"}},[t._v("#")]),t._v(" Secondary Index")]),t._v(" "),a("p",[t._v("Index enables queries and search based on the data value")]),t._v(" "),a("h2",{attrs:{id:"cryptographic-signatures"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cryptographic-signatures"}},[t._v("#")]),t._v(" Cryptographic signatures")]),t._v(" "),a("p",[t._v("A signature (PKI) provided by the client can be became part of the insertion process")]),t._v(" "),a("h2",{attrs:{id:"authentication-transport"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#authentication-transport"}},[t._v("#")]),t._v(" Authentication (transport)")]),t._v(" "),a("p",[t._v("Integrated mTLS offers the best approach for machine-to-machine authentication, also providing communications security (entryption) over the transport channel")]),t._v(" "),a("h1",{attrs:{id:"immugw-communication"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#immugw-communication"}},[t._v("#")]),t._v(" immugw communication")]),t._v(" "),a("p",[t._v("immugw can be found in its "),a("a",{attrs:{href:"https://github.com/codenotary/immugw",target:"_blank",rel:"noopener noreferrer"}},[t._v("own repository"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("immugw proxies REST client communication and gRPC server interface. For security purposes, immugw should not run on the same server as immudb. The following diagram shows how the communication works:")]),t._v(" "),a("p",[a("img",{attrs:{src:"/diagram-immugw.svg",alt:"immugw communication explained"}})])])}),[],!1,null,null,null);e.default=n.exports}}]);