(window.webpackJsonp=window.webpackJsonp||[]).push([[749],{1108:function(e,t,a){"use strict";a.r(t);var r=a(2),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"app-samples-in-go"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#app-samples-in-go"}},[e._v("#")]),e._v(" App samples in Go")]),e._v(" "),a("WrappedSection",[a("p",[e._v("This section includes sample applications using immudb in Go.")]),e._v(" "),a("p",[e._v("Although the applications are simple, they will provide fully functional samples to demonstrate how to write an application using immudb.")])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"hello-immutable-world"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hello-immutable-world"}},[e._v("#")]),e._v(" Hello Immutable World")]),e._v(" "),a("p",[e._v("The classical "),a("code",[e._v("Hello World")]),e._v(" sample adapted to immudb.")]),e._v(" "),a("p",[e._v("This simple application is using the "),a("a",{attrs:{href:"https://github.com/codenotary/immudb/tree/master/pkg/client",target:"_blank",rel:"noopener noreferrer"}},[e._v("official immudb go sdk"),a("OutboundLink")],1),e._v(" to connect, store and retrieve key-value data from immudb server.")]),e._v(" "),a("p",[e._v("The full source code of this sample can be found at "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go/hello-immutable-world",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hello Immutable World"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("In order to run this sample, immudb server must be already running. This step is quite simple and it's described at "),a("a",{attrs:{href:"https://docs.immudb.io/master/running/download.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Running immudb"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"building-and-running-the-sample-app"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#building-and-running-the-sample-app"}},[e._v("#")]),e._v(" Building and running the sample app")]),e._v(" "),a("p",[e._v("To build and run the sample application, simply clone the "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go/hello-immutable-world",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hello Immutable World"),a("OutboundLink")],1),e._v(" and run:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("go mod tidy\ngo build\n./hello-immutable-world\n")])])]),a("p",[e._v("The sample application will run and display an output similar to")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Sucessfully set a verified entry: ('hello', 'immutable world') @ tx 1\nSucessfully got verified entry: ('hello', 'immutable world') @ tx 1\n")])])])]),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"webapp-using-sql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webapp-using-sql"}},[e._v("#")]),e._v(" WebApp using SQL")]),e._v(" "),a("p",[e._v("The purpose of this sample application is to demonstrate the use of immudb using "),a("a",{attrs:{href:"https://pkg.go.dev/database/sql",target:"_blank",rel:"noopener noreferrer"}},[e._v("Go standard APIs for SQL"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("This sample was written taking as a basis the tutorial "),a("a",{attrs:{href:"https://blog.logrocket.com/building-simple-app-go-postgresql/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Building a simple app with Go and PostgreSQL"),a("OutboundLink")],1),e._v(". We followed the same application structure even though the source code is different to show how immudb and PostgreSQL can be used in analogy.")]),e._v(" "),a("p",[e._v("The full source code of this sample can be found at "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go/todos-sample-stdlib",target:"_blank",rel:"noopener noreferrer"}},[e._v("WebApp using SQL"),a("OutboundLink")],1)]),e._v(" "),a("WrappedSection",[a("img",{attrs:{align:"center",src:"/samples/go_webapp_sql.jpg"}})]),e._v(" "),a("h3",{attrs:{id:"prerequisites-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites-2"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("In order to run this sample, immudb server must be already running. This step is quite simple and it's described at "),a("a",{attrs:{href:"https://docs.immudb.io/master/running/download.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Running immudb"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"building-and-running-the-sample-app-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#building-and-running-the-sample-app-2"}},[e._v("#")]),e._v(" Building and running the sample app")]),e._v(" "),a("p",[e._v("To build and run the sample application, simply clone the "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go/todos-sample-stdlib",target:"_blank",rel:"noopener noreferrer"}},[e._v("sample repository"),a("OutboundLink")],1),e._v(" and run:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("go mod tidy\ngo build\n./immudb-todo-webapp\n")])])]),a("p",[e._v("The sample application should be up and running now. The port 3000 is used by default unless a different one is specified using "),a("code",[e._v("PORT")]),e._v(" environment variable e.g. "),a("code",[e._v("PORT=3001 ./immudb-todo-webapp")])]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Database initialization statements might be stored in an external file as in this sample "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go/stdlib-init-script",target:"_blank",rel:"noopener noreferrer"}},[e._v("sql initialization script"),a("OutboundLink")],1),e._v(".")])])],1),e._v(" "),a("WrappedSection",[a("h2",{attrs:{id:"command-line-app-using-sql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#command-line-app-using-sql"}},[e._v("#")]),e._v(" Command line app using SQL")]),e._v(" "),a("p",[e._v("A simple reminder console app that stores all data in immudb.")]),e._v(" "),a("p",[e._v("As in the previous sample, the purpose of this sample application is to demonstrate the use of immudb using "),a("a",{attrs:{href:"https://pkg.go.dev/database/sql",target:"_blank",rel:"noopener noreferrer"}},[e._v("Go standard APIs for SQL"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("The full source code of this sample can be found at "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go/immudb-reminder-app",target:"_blank",rel:"noopener noreferrer"}},[e._v("Console sample using SQL"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"prerequisites-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites-3"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("In order to run this sample, immudb server must be already running. This step is quite simple and it's described at "),a("a",{attrs:{href:"https://docs.immudb.io/master/running/download.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Running immudb"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"building-and-running-the-sample-app-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#building-and-running-the-sample-app-3"}},[e._v("#")]),e._v(" Building and running the sample app")]),e._v(" "),a("p",[e._v("To build and run the sample application, simply clone the "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go/immudb-reminder-app",target:"_blank",rel:"noopener noreferrer"}},[e._v("Console sample using SQL"),a("OutboundLink")],1),e._v(" and run:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("go mod tidy\ngo build\n./immudb-reminder-app\n")])])]),a("p",[e._v("The sample application should be up and running now.")]),e._v(" "),a("p",[e._v("Additionally, this sample application provides a simple way to specify connection settings. run "),a("code",[e._v("./immudb-reminder-app -h")]),e._v(" to display all the available flags.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('Usage of ./immudb-reminder-app:\n  -addr string\n        IP address of immudb server (default "localhost")\n  -db string\n        Name of the database to use (default "defaultdb")\n  -pass string\n        Password for authenticating to immudb (default "immudb")\n  -port string\n        Port number of immudb server (default "3322")\n  -user string\n        Username for authenticating to immudb (default "immudb")\n')])])])]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Additional samples can be found at "),a("a",{attrs:{href:"https://github.com/codenotary/immudb-client-examples/tree/master/go",target:"_blank",rel:"noopener noreferrer"}},[e._v("immudb client samples repository"),a("OutboundLink")],1),e._v(".")])])],1)}),[],!1,null,null,null);t.default=s.exports}}]);