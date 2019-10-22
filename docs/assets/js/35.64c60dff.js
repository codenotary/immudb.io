(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{235:function(t,e,a){"use strict";a.r(e);var n=a(0),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"quick-start"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#quick-start","aria-hidden":"true"}},[t._v("#")]),t._v(" Quick start")]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview","aria-hidden":"true"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[a("code",[t._v("vcn")]),t._v(" is the "),a("em",[t._v("Command Line Interface")]),t._v(" for the CodeNotary platform. Basically, it can "),a("router-link",{attrs:{to:"/vcn/user-guide/notarization.html"}},[t._v("notarize and authenticate")]),t._v(" any of the following kind of assets:")],1),t._v(" "),a("ul",[a("li",[t._v("a "),a("strong",[t._v("file")])]),t._v(" "),a("li",[t._v("an entire "),a("strong",[t._v("directory")]),t._v(" (by prefixing the directory path with "),a("code",[t._v("dir://")]),t._v(")")]),t._v(" "),a("li",[t._v("a "),a("strong",[t._v("git commit")]),t._v(" (by prefixing the local git working directory path with "),a("code",[t._v("git://")]),t._v(")")]),t._v(" "),a("li",[t._v("a "),a("router-link",{attrs:{to:"/vcn/user-guide/schemes/docker.html"}},[a("strong",[t._v("container image")])]),t._v(" (by using "),a("code",[t._v("docker://")]),t._v(" or "),a("code",[t._v("podman://")]),t._v(" followed by the name of an image present in the local registry of docker or podman, respectively)")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("It's also possible to provide a hash value directly by using the "),a("code",[t._v("--hash")]),t._v(" flag.")])]),t._v(" "),a("h2",{attrs:{id:"install-the-cli"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-the-cli","aria-hidden":"true"}},[t._v("#")]),t._v(" Install the CLI")]),t._v(" "),a("p",[t._v("The easiest way to get "),a("code",[t._v("vcn")]),t._v(" is to download the latest version for your platform from the "),a("a",{attrs:{href:"https://github.com/vchain-us/vcn/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("release page"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("p",[t._v("Once downloaded, you can rename the binary to "),a("code",[t._v("vcn")]),t._v(" and store it in your "),a("code",[t._v("PATH")]),t._v(", then run it from anywhere.")]),t._v(" "),a("blockquote",[a("p",[t._v("For Linux and macOS you need to mark the file as executable: "),a("code",[t._v("chmod +x vcn")])])]),t._v(" "),a("h2",{attrs:{id:"authenticate-an-asset"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#authenticate-an-asset","aria-hidden":"true"}},[t._v("#")]),t._v(" Authenticate an asset")]),t._v(" "),a("p",[t._v("Authentication is always free and can be performed by anyone, anywhere, at any time. You can use "),a("code",[t._v("vcn authenticate")]),t._v(" even without a "),a("a",{attrs:{href:"https://codenotary.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("codernotary.io"),a("OutboundLink")],1),t._v(" account.")]),t._v(" "),a("p",[t._v("Examples:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vcn authenticate <file>\nvcn authenticate dir://<directory>\nvcn authenticate docker://<imageId>\nvcn authenticate podman://<imageId>\nvcn authenticate git://<path_to_git_repo>\nvcn authenticate --hash <hash>\n")])])]),a("p",[t._v("To output results in "),a("code",[t._v("json")]),t._v(" or "),a("code",[t._v("yaml")]),t._v(" formats:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vcn authenticate --output=json <asset>\nvcn authenticate --output=yaml <asset>\n")])])]),a("h2",{attrs:{id:"notarize-an-asset"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#notarize-an-asset","aria-hidden":"true"}},[t._v("#")]),t._v(" Notarize an asset")]),t._v(" "),a("p",[t._v("Register an account with "),a("a",{attrs:{href:"https://codenotary.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("codernotary.io"),a("OutboundLink")],1),t._v(" first.")]),t._v(" "),a("p",[t._v("Then start with the "),a("code",[t._v("login")]),t._v(" command. "),a("code",[t._v("vcn")]),t._v(" will walk you through login and importing up your secret upon initial use.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vcn login\n")])])]),a("p",[t._v("Once your secret is set you can notarize assets like in the following examples:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vcn notarize <file>\nvcn notarize dir://<directory>\nvcn notarize docker://<imageId>\nvcn notarize podman://<imageId>\nvcn notarize git://<path_to_git_repo>\nvcn notarize --hash <hash>\n")])])]),a("p",[t._v("By default all assets are notarized private, so not much information is disclosed about the asset. If you want to make that public and therefore, more trusted, please use the "),a("code",[t._v("--public")]),t._v(" flag.")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vcn notarize --public <asset>\n")])])]),a("p",[t._v("Change the asset's status:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vcn unsupport <asset>\nvcn untrust <asset>\n")])])]),a("p",[t._v("Finally, to fetch all assets you've notarized:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vcn list\n")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);