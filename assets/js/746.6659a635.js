(window.webpackJsonp=window.webpackJsonp||[]).push([[746],{1106:function(t,e,s){"use strict";s.r(e);var a=s(2),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"configuration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[t._v("#")]),t._v(" Configuration")]),t._v(" "),s("WrappedSection",[s("p",[t._v("This page describes how to set different settings in immudb.")]),t._v(" "),s("p",[t._v("Settings can be specified as command line options to immudb (see "),s("code",[t._v("immudb -h")]),t._v("), in a configuration file, or as environment variables.")])]),t._v(" "),s("WrappedSection",[s("h3",{attrs:{id:"settings"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#settings"}},[t._v("#")]),t._v(" Settings")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Parameter")]),t._v(" "),s("th",[t._v("Default")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[s("code",[t._v("address")])]),t._v(" "),s("td",[s("code",[t._v("0.0.0.0")])]),t._v(" "),s("td",[t._v("bind address")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("admin-password")])]),t._v(" "),s("td",[s("code",[t._v("immudb")])]),t._v(" "),s("td",[t._v("admin password as plain-text or base64 encoded (must be prefixed with 'enc:' if it is encoded)")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("auth")])]),t._v(" "),s("td",[s("code",[t._v("true")])]),t._v(" "),s("td",[t._v("enable auth")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("certificate")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("server certificate file path")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("clientcas")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("clients certificates list. Aka certificate authority")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("config")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("config file (default path are configs or $HOME. Default filename is immudb.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("detached")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("run immudb in background")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("devmode")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("enable dev mode: accept remote connections without auth")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("dir")])]),t._v(" "),s("td",[s("code",[t._v("./data")])]),t._v(" "),s("td",[t._v("data folder")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("force-admin-password")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("if true, reset the admin password to the one passed through admin-password option upon startup")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("log-request-metadata")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("log request information in transaction metadata")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("grpc-reflection")])]),t._v(" "),s("td",[s("code",[t._v("true")])]),t._v(" "),s("td",[t._v("GRPC reflection server enabled")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("logfile")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("log path with filename. E.g. /tmp/immudb/immudb.log")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("logformat")])]),t._v(" "),s("td",[s("code",[t._v("text")])]),t._v(" "),s("td",[t._v("log format e.g. text/json")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("maintenance")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("override the authentication flag")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("max-recv-msg-size")])]),t._v(" "),s("td",[s("code",[t._v("33554432")])]),t._v(" "),s("td",[t._v("max message size in bytes the server can receive")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("max-session-age-time")])]),t._v(" "),s("td",[t._v("infinity")]),t._v(" "),s("td",[t._v("max session age time is a duration after which session will be forcibly closed")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("max-session-inactivity-time")])]),t._v(" "),s("td",[s("code",[t._v("3m0s")])]),t._v(" "),s("td",[t._v("max session inactivity time is a duration after which an active session is declared inactive by the server. A session is kept active if server is still receiving requests from client (keep-alive or other methods)")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("max-sessions")])]),t._v(" "),s("td",[s("code",[t._v("100")])]),t._v(" "),s("td",[t._v("maximum number of simultaneously opened sessions")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("metrics-server")])]),t._v(" "),s("td",[s("code",[t._v("true")])]),t._v(" "),s("td",[t._v("enable or disable Prometheus endpoint")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("metrics-server-port")])]),t._v(" "),s("td",[s("code",[t._v("9477")])]),t._v(" "),s("td",[t._v("Prometheus endpoint port")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("mtls")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("enable mutual tls")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("no-histograms")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("disable collection of histogram metrics like query durations")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("pgsql-server")])]),t._v(" "),s("td",[s("code",[t._v("true")])]),t._v(" "),s("td",[t._v("enable or disable pgsql server")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("pgsql-server-port")])]),t._v(" "),s("td",[s("code",[t._v("5432")])]),t._v(" "),s("td",[t._v("pgsql server port")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("pidfile")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("pid path with filename. E.g. /var/run/immudb.pid")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("pkey")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("server private key path")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("port")])]),t._v(" "),s("td",[s("code",[t._v("3322")])]),t._v(" "),s("td",[t._v("port number")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("pprof")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("add pprof profiling endpoint on the metrics server")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-allow-tx-discarding")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("allow precommitted transactions to be discarded if the replica diverges from the primary")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-commit-concurrency")])]),t._v(" "),s("td",[s("code",[t._v("10")])]),t._v(" "),s("td",[t._v("number of concurrent replications")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-is-replica")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("set systemdb and defaultdb as replica")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-prefetch-tx-buffer-size")])]),t._v(" "),s("td",[s("code",[t._v("100")])]),t._v(" "),s("td",[t._v("maximum number of prefeched transactions")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-primary-host")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("primary database host (if replica=true)")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-primary-password")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("password in the primary database used for replication of systemdb and defaultdb")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-primary-port")])]),t._v(" "),s("td",[s("code",[t._v("3322")])]),t._v(" "),s("td",[t._v("primary database port (if replica=true) (default 3322)")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-primary-username")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("username in the primary database used for replication of systemdb and defaultdb")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-skip-integrity-check")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("disable integrity check when reading data during replication")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-sync-acks")])]),t._v(" "),s("td",[s("code",[t._v("0")])]),t._v(" "),s("td",[t._v("set a minimum number of replica acknowledgements required before transactions can be committed")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-sync-enabled")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("enable synchronous replication")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("replication-wait-for-indexing")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("wait for indexing to be up to date during replication")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-access-key-id")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("s3 access key id")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-bucket-name")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("s3 bucket name")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-endpoint")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("s3 endpoint")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-external-identifier")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("use the remote identifier if there is no local identifier")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-instance-metadata-url")])]),t._v(" "),s("td",[s("code",[t._v("http://169.254.169.254")])]),t._v(" "),s("td",[t._v("s3 instance metadata url")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-location")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("s3 location (region)")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-path-prefix")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("s3 path prefix (multiple immudb instances can share the same bucket if they have different prefixes)")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-role")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("role name for role-based authentication attempt for s3 storage")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-role-enabled")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("enable role-based authentication for s3 storage")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-secret-key")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v("s3 secret access key")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("s3-storage")])]),t._v(" "),s("td",[s("code",[t._v("false")])]),t._v(" "),s("td",[t._v("enable or disable s3 storage")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("session-timeout")])]),t._v(" "),s("td",[s("code",[t._v("2m0s")])]),t._v(" "),s("td",[t._v("session timeout is a duration after which an inactive session is forcibly closed by the server")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("signingKey")])]),t._v(" "),s("td",[t._v("``")]),t._v(" "),s("td",[t._v('signature private key path. If a valid one is provided, it enables the cryptographic signature of the root. E.g. "./../test/signer/ec3.key"')])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("swaggerui")])]),t._v(" "),s("td",[s("code",[t._v("true")])]),t._v(" "),s("td",[t._v("Swagger UI enabled")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("synced")])]),t._v(" "),s("td",[s("code",[t._v("true")])]),t._v(" "),s("td",[t._v("synced mode prevents data lost under unexpected crashes but affects performance")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("token-expiry-time")])]),t._v(" "),s("td",[s("code",[t._v("1440")])]),t._v(" "),s("td",[t._v("client authentication token expiration time. Minutes")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("web-server")])]),t._v(" "),s("td",[s("code",[t._v("true")])]),t._v(" "),s("td",[t._v("enable or disable web/console server")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("web-server-port")])]),t._v(" "),s("td",[s("code",[t._v("8080")])]),t._v(" "),s("td",[t._v("web/console server port")])])])])]),t._v(" "),s("WrappedSection",[s("h3",{attrs:{id:"configuration-file"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration-file"}},[t._v("#")]),t._v(" Configuration file")]),t._v(" "),s("p",[t._v("Settings can be specified in a "),s("a",{attrs:{href:"https://raw.githubusercontent.com/codenotary/immudb/master/configs/immudb.toml",target:"_blank",rel:"noopener noreferrer"}},[t._v("immudb.toml configuration file"),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("p",[t._v("Which configuration file to use is set with the "),s("code",[t._v("--config")]),t._v(" option. By default, immudb looks into the "),s("code",[t._v("configs")]),t._v(" subfolder in the current directory.")]),t._v(" "),s("p",[t._v("When running immudb as a service, "),s("code",[t._v("immudb service install")]),t._v(" allows to specify the configuration file to use with the "),s("code",[t._v("--config")]),t._v(" option.")]),t._v(" "),s("h3",{attrs:{id:"environment-variables"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#environment-variables"}},[t._v("#")]),t._v(" Environment variables")]),t._v(" "),s("p",[t._v("Settings specified via environment variables take override the configuration file. They are specified in the form of "),s("code",[t._v("IMMUDB_")]),t._v(", for example "),s("code",[t._v("IMMUDB_DIR")]),t._v(" specifies the "),s("code",[t._v("dir")]),t._v(" variable.")])]),t._v(" "),s("WrappedSection",[s("h3",{attrs:{id:"logging-levels"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#logging-levels"}},[t._v("#")]),t._v(" Logging Levels")]),t._v(" "),s("p",[t._v("The "),s("code",[t._v("LOG_LEVEL")]),t._v(" environment variable sets the log level to be emitted from immudb logs. Valid logging level settings are "),s("code",[t._v("error")]),t._v(", "),s("code",[t._v("warn")]),t._v(", "),s("code",[t._v("info")]),t._v("(default), and "),s("code",[t._v("debug")]),t._v(". Logs that are equal to, or above, the specified level will be emitted. Log level "),s("code",[t._v("error")]),t._v(" has the highest level, "),s("code",[t._v("debug")]),t._v(" being the lowest.")]),t._v(" "),s("p",[t._v("You can set the "),s("code",[t._v("LOG_LEVEL")]),t._v(" when running immudb either by setting the environment variable, or by running the command as below:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("LOG_LEVEL=error ./immudb\n")])])]),s("h4",{attrs:{id:"levels"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#levels"}},[t._v("#")]),t._v(" Levels")]),t._v(" "),s("h5",{attrs:{id:"info"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#info"}},[t._v("#")]),t._v(" info")]),t._v(" "),s("p",[t._v("The "),s("code",[t._v("info")]),t._v(" severity is used for informational messages that do not require action.")]),t._v(" "),s("h5",{attrs:{id:"warn"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#warn"}},[t._v("#")]),t._v(" warn")]),t._v(" "),s("p",[t._v("The "),s("code",[t._v("warn")]),t._v(" severity is used for messages that may require special handling, but does not affect normal operation.")]),t._v(" "),s("h5",{attrs:{id:"error"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#error"}},[t._v("#")]),t._v(" error")]),t._v(" "),s("p",[t._v("The "),s("code",[t._v("error")]),t._v(" severity is used for messages that require special handling, where a normal database operation could not proceed as expected. It does not block the database.")]),t._v(" "),s("h5",{attrs:{id:"debug"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#debug"}},[t._v("#")]),t._v(" debug")]),t._v(" "),s("p",[t._v("The "),s("code",[t._v("debug")]),t._v(" severity is used for messages that are used for debugging purpose for the database.")]),t._v(" "),s("h3",{attrs:{id:"logging-formats"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#logging-formats"}},[t._v("#")]),t._v(" Logging formats")]),t._v(" "),s("p",[t._v("Two logging format options are available: "),s("code",[t._v("text")]),t._v(" and "),s("code",[t._v("json")]),t._v(". The default logging format setting is the "),s("code",[t._v("text")]),t._v(". The "),s("code",[t._v("json")]),t._v(" format is available when specified.")]),t._v(" "),s("h4",{attrs:{id:"examples-of-log-output"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples-of-log-output"}},[t._v("#")]),t._v(" Examples of log output:")]),t._v(" "),s("h5",{attrs:{id:"normal"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#normal"}},[t._v("#")]),t._v(" Normal")]),t._v(" "),s("h6",{attrs:{id:"command"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#command"}},[t._v("#")]),t._v(" Command:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("./immudb\n")])])]),s("h6",{attrs:{id:"output"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#output"}},[t._v("#")]),t._v(" Output:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("immudb "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2022")]),t._v("/11/17 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),t._v(":30:02 INFO: Creating database "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'systemdb'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("replica "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" false"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\nimmudb "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2022")]),t._v("/11/17 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),t._v(":30:02 INFO: Binary Linking up to "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("date")]),t._v(" at "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data/systemdb'")]),t._v("\nimmudb "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2022")]),t._v("/11/17 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),t._v(":30:02 INFO: Index "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data/systemdb/index'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ts"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("discarded_snapshots")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" successfully loaded\nimmudb "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2022")]),t._v("/11/17 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),t._v(":30:02 INFO: Indexing "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" progress at "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data/systemdb'")]),t._v("\nimmudb "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2022")]),t._v("/11/17 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),t._v(":30:02 INFO: Flushing index "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data/systemdb/index'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ts"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("cleanup_percentage")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.00")]),t._v("/0.00, "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("since_cleanup")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" requested via SnapshotSince"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\nimmudb "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2022")]),t._v("/11/17 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),t._v(":30:02 INFO: Index "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data/systemdb/index'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ts"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("cleanup_percentage")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.00")]),t._v("/0.00"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" successfully flushed\n")])])]),s("h5",{attrs:{id:"json"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#json"}},[t._v("#")]),t._v(" JSON")]),t._v(" "),s("h6",{attrs:{id:"command-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#command-2"}},[t._v("#")]),t._v(" Command:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("./immudb --logformat=json\n")])])]),s("h6",{attrs:{id:"output-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#output-2"}},[t._v("#")]),t._v(" Output:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"caller"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"codenotary/immudb/pkg/database/database.go:179"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"component"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/codenotary/immudb/pkg/database.OpenDB"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"level"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"Opening database 'systemdb' {replica = false}...\"")]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"module"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"timestamp"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2022-11-17T14:32:28.890774+05:30"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"caller"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"codenotary/immudb/embedded/store/immustore.go:553"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"component"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/codenotary/immudb/embedded/store.OpenWith"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"level"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"Binary Linking up to date at 'data/systemdb'\"")]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"module"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"timestamp"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2022-11-17T14:32:28.898035+05:30"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"caller"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"codenotary/immudb/embedded/tbtree/tbtree.go:351"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"component"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/codenotary/immudb/embedded/tbtree.Open"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"level"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"Reading snapshots at 'data/systemdb/index/commit'...\"")]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"module"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"timestamp"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2022-11-17T14:32:28.898296+05:30"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"caller"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"codenotary/immudb/embedded/tbtree/tbtree.go:669"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"component"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/codenotary/immudb/embedded/tbtree.OpenWith"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"level"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"Index 'data/systemdb/index' {ts=2, discarded_snapshots=0} successfully loaded\"")]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"module"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"immudb"')]),t._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"timestamp"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2022-11-17T14:32:28.904722+05:30"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])],1)}),[],!1,null,null,null);e.default=r.exports}}]);