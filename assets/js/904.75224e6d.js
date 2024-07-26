(window.webpackJsonp=window.webpackJsonp||[]).push([[904],{1262:function(e,t,a){"use strict";a.r(t);var n=a(2),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"request-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request-metadata"}},[e._v("#")]),e._v(" Request Metadata")]),e._v(" "),a("p",[e._v("To enhance the auditing process, immudb can be configured to inject request information - such as user identifiers, IP addresses, and other relevant details - into transaction metadata.")]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"enabling-request-metadata-logging"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enabling-request-metadata-logging"}},[e._v("#")]),e._v(" Enabling request metadata logging")]),e._v(" "),a("p",[e._v("Request metadata logging can be enabled by enabling the "),a("code",[e._v("--log-request-metdata")]),e._v(" flag of the immudb command (or by setting\nthe corresponding "),a("code",[e._v("IMMUDB_LOG_REQUEST_METADATA")]),e._v(" env var to "),a("code",[e._v("TRUE")]),e._v(").")]),e._v(" "),a("p",[e._v("For example, when running the immudb docker image:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("docker")]),e._v(" run -e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("IMMUDB_LOG_REQUEST_METADATA")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("TRUE -d --net "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("host")]),e._v(" --name immudb codenotary/immudb:latest\n")])])]),a("h3",{attrs:{id:"why-should-i-enable-request-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#why-should-i-enable-request-metadata"}},[e._v("#")]),e._v(" Why should I enable request metadata?")]),e._v(" "),a("p",[e._v("When this functionality is enabled, each transaction includes comprehensive metadata that provides context for the request executed by the immudb server. This metadata allows auditors and administrators to easily retrieve detailed information about the context of each transaction (see how to retrieve transaction metadata from an "),a("RouterLink",{attrs:{to:"/master/develop/sql/querying.html#transaction-metadata"}},[e._v("SQL table")]),e._v(").")],1),e._v(" "),a("p",[e._v("Specifically, it enables the identification of who initiated the transaction, from which IP address, and any other pertinent request details. For example, if there is a need to investigate suspicious activity or trace the source of a particular change, this request metadata offers a clear and concise trail of the relevant data.")]),e._v(" "),a("p",[e._v("Note that despite the extra information can increase the storage overhead, the benefits of enhanced transparency and accountability often outweigh the extra storage cost, ensuring that all actions within the database can be thoroughly examined and verified.")])])],1)}),[],!1,null,null,null);t.default=s.exports}}]);