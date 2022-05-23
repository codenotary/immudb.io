(window.webpackJsonp=window.webpackJsonp||[]).push([[363],{876:function(a,s,e){"use strict";e.r(s);var t=e(14),n=Object(t.a)({},(function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"immugw"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#immugw"}},[a._v("#")]),a._v(" immugw")]),a._v(" "),e("WrappedSection",[e("p",[a._v("immugw is the intelligent REST proxy that connects to immudb and provides a RESTful interface for applications. We recommend running immudb and immugw on separate machines to enhance security.")]),a._v(" "),e("p",[a._v("You may download the immug binary from "),e("a",{attrs:{href:"https://github.com/codenotary/immugw/releases/latest",target:"_blank",rel:"noopener noreferrer"}},[a._v("the latest releases on Github"),e("OutboundLink")],1),a._v(". Once you have downloaded immugw, rename it to "),e("code",[a._v("immugw")]),a._v(", make sure to mark it as executable, then run it. The following example shows how to obtain v1.1.0 for linux amd64:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" https://github.com/codenotary/immugw/releases/download/v1.1.0/immugw-v1.1.0-linux-amd64\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" immugw-v1.1.0-linux-amd64 immugw\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("chmod")]),a._v(" +x immugw\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# run help to find out about possible arguments")]),a._v("\n$ ./immugw "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("help")]),a._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# and run immugw in the background")]),a._v("\n$ ./immugw -d --immudb-address "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("immudb-server-address"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),e("p",[a._v("Alternatively, you may "),e("a",{attrs:{href:"https://hub.docker.com/r/codenotary/immudb",target:"_blank",rel:"noopener noreferrer"}},[a._v("pull immudb docker image from DockerHub"),e("OutboundLink")],1),a._v(" and run it in a ready-to-use container:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run -it -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3323")]),a._v(":3323 --name immugw --env "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("IMMUGW_IMMUDB_ADDRESS")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("immudb-server-address"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v(" codenotary/immugw:latest\n")])])])]),a._v(" "),e("WrappedSection",[e("h3",{attrs:{id:"build-from-sources"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#build-from-sources"}},[a._v("#")]),a._v(" Build from sources")]),a._v(" "),e("p",[a._v("Building binaries requires a Linux operating system.")]),a._v(" "),e("p",[a._v("To build the binaries yourself, simply clone "),e("a",{attrs:{href:"https://github.com/codenotary/immugw",target:"_blank",rel:"noopener noreferrer"}},[a._v("immugw repository"),e("OutboundLink")],1),a._v(" and run:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("make")]),a._v(" all\n")])])]),e("p",[a._v("immugw can be cross compiled for different systems and architectures by setting "),e("code",[a._v("GOOS")]),a._v(" and "),e("code",[a._v("GOARCH")]),a._v(" variables, i.e.:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("GOOS")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("windows "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("GOARCH")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("amd64 "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("make")]),a._v(" all\n")])])]),e("p",[a._v("To build immugw docker container locally:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" build -t myown/immugw:latest -f Dockerfile "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(".")]),a._v("\n")])])])]),a._v(" "),e("WrappedSection",[e("h3",{attrs:{id:"installing-with-immuadmin"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installing-with-immuadmin"}},[a._v("#")]),a._v(" Installing with immuadmin")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# install immugw service")]),a._v("\n$ ./immugw "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# check current immugw service status")]),a._v("\n$ ./immugw "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" status\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# stop immugw service")]),a._v("\n$ ./immugw "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" stop\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# start immugw service")]),a._v("\n$ ./immugw "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" start\n")])])]),e("p",[a._v("The Linux service is using the following defaults:")]),a._v(" "),e("table",[e("thead",[e("tr",[e("th",[a._v("File or configuration")]),a._v(" "),e("th",[a._v("location")])])]),a._v(" "),e("tbody",[e("tr",[e("td",[a._v("all configuration files")]),a._v(" "),e("td",[a._v("/etc/immudb")])]),a._v(" "),e("tr",[e("td",[a._v("pid file")]),a._v(" "),e("td",[a._v("/var/lib/immudb/immugw.pid")])]),a._v(" "),e("tr",[e("td",[a._v("log files")]),a._v(" "),e("td",[a._v("/var/log/immudb")])])])])]),a._v(" "),e("WrappedSection",[e("h3",{attrs:{id:"configuration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[a._v("#")]),a._v(" Configuration")]),a._v(" "),e("p",[a._v("immugw can be configured using environment variables, flags or a config file.")]),a._v(" "),e("ul",[e("li",[e("code",[a._v("immugw --help")]),a._v(" shows you all available flags and environment variables.")]),a._v(" "),e("li",[e("code",[a._v("/etc/immudb/immugw.toml")]),a._v(" is used as a default configuration file")])])]),a._v(" "),e("WrappedSection",[e("h3",{attrs:{id:"restful-api-reference"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#restful-api-reference"}},[a._v("#")]),a._v(" RESTful API reference")]),a._v(" "),e("p",[a._v("You can find the swagger schema here:")]),a._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/codenotary/immudb/blob/master/pkg/api/schema/schema.swagger.json",target:"_blank",rel:"noopener noreferrer"}},[a._v("swagger immugw"),e("OutboundLink")],1)]),a._v(" "),e("p",[a._v("If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" https://github.com/codenotary/immudb/blob/master/pkg/api/schema/schema.swagger.json\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run -d -it -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("8081")]),a._v(":8080 --name swagger-immugw -v "),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),e("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PWD")]),a._v("}")]),a._v("/schema.swagger.json:/openapi.json -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("SWAGGER_JSON")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("/openapi.json  swaggerapi/swagger-ui\n")])])])]),a._v(" "),e("WrappedSection",[e("h3",{attrs:{id:"immugw-as-auditor"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#immugw-as-auditor"}},[a._v("#")]),a._v(" immugw as auditor")]),a._v(" "),e("p",[a._v("immugw can be also run as auditor.")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("$ ./immugw --audit\n")])])]),e("p",[a._v("If you are running immugw as a service, you need to edit /etc/immudb/immugw.toml and add the following section:")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("audit "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# false is default")]),a._v("\naudit-interval "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"5m"')]),a._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v('# suffixes: "s", "m", "h", examples: 10s, 5m 1h')]),a._v("\naudit-username "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# when immudb authentication is enabled, use read-only user credentials here")]),a._v("\naudit-password "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# and the password")]),a._v("\n")])])])])],1)}),[],!1,null,null,null);s.default=n.exports}}]);