(window.webpackJsonp=window.webpackJsonp||[]).push([[800],{1159:function(e,s,t){"use strict";t.r(s);var a=t(2),n=Object(a.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"running-as-a-service"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#running-as-a-service"}},[e._v("#")]),e._v(" Running as a service")]),e._v(" "),t("WrappedSection",[t("p",[e._v("Every operating system has different ways of running services. immudb provides a facility called "),t("code",[e._v("immudb service")]),e._v(" to hide this complexity.")]),e._v(" "),t("p",[e._v("To install the service run as root:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("$ ./immudb "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v("\n")])])]),t("p",[e._v("This will for example, on Linux, install "),t("code",[e._v("/etc/systemd/system/immudb.service")]),e._v(" and create the appropriate user to run the service. On other operating systems, the native method would be used.")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("immudb service")]),e._v(" command also allows to control the lifecycle of the service:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("$ ./immudb "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" start\n$ ./immudb "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" stop\n$ ./immudb "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" status\n")])])]),t("p",[e._v("On Linux, "),t("code",[e._v("immudb service status")]),e._v(" is equivalent to "),t("code",[e._v("systemctl status immudb.service")]),e._v(", and is what it does under the hoods.")])]),e._v(" "),t("WrappedSection",[t("h3",{attrs:{id:"macos-specific"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#macos-specific"}},[e._v("#")]),e._v(" macOS specific")]),e._v(" "),t("p",[e._v("In case you want to run immudb as a service, please check the following "),t("a",{attrs:{href:"https://medium.com/swlh/how-to-use-launchd-to-run-services-in-macos-b972ed1e352",target:"_blank",rel:"noopener noreferrer"}},[e._v("guideline"),t("OutboundLink")],1),e._v(".")])])],1)}),[],!1,null,null,null);s.default=n.exports}}]);