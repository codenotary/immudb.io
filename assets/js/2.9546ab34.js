(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{311:function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"i",(function(){return s})),n.d(e,"f",(function(){return l})),n.d(e,"g",(function(){return c})),n.d(e,"h",(function(){return u})),n.d(e,"b",(function(){return p})),n.d(e,"e",(function(){return h})),n.d(e,"k",(function(){return f})),n.d(e,"l",(function(){return d})),n.d(e,"c",(function(){return m})),n.d(e,"j",(function(){return v}));n(22),n(72),n(172),n(98),n(179),n(47),n(46),n(319),n(68),n(339),n(73);var i=/#.*$/,a=/\.(md|html)$/,r=/\/$/,s=/^[a-z]+:/i;function o(t){return decodeURI(t).replace(i,"").replace(a,"")}function l(t){return s.test(t)}function c(t){return/^mailto:/.test(t)}function u(t){return/^tel:/.test(t)}function p(t){if(l(t))return t;var e=t.match(i),n=e?e[0]:"",a=o(t);return r.test(a)?t:a+".html"+n}function h(t,e){var n=decodeURIComponent(t.hash),a=function(t){var e=t.match(i);if(e)return e[0]}(e);return(!a||n===a)&&o(t.path)===o(e)}function f(t,e,n){if(l(e))return{type:"external",path:e};n&&(e=function(t,e,n){var i=t.charAt(0);if("/"===i)return t;if("?"===i||"#"===i)return e+t;var a=e.split("/");n&&a[a.length-1]||a.pop();for(var r=t.replace(/^\//,"").split("/"),s=0;s<r.length;s++){var o=r[s];".."===o?a.pop():"."!==o&&a.push(o)}""!==a[0]&&a.unshift("");return a.join("/")}(e,n));for(var i=o(e),a=0;a<t.length;a++)if(o(t[a].regularPath)===i)return Object.assign({},t[a],{type:"page",path:p(t[a].path)});return console.error('[vuepress] No matching page found for sidebar item "'.concat(e,'"')),{}}function d(t,e,n,i){var a=n.pages,r=n.themeConfig,s=i&&r.locales&&r.locales[i]||r;if("auto"===(t.frontmatter.sidebar||s.sidebar||r.sidebar))return function(t){var e=m(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:e.map((function(e){return{type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}}))}]}(t);var o=s.sidebar||r.sidebar;if(o){var l=function(t,e){if(Array.isArray(e))return{base:"/",config:e};for(var n in e)if(0===(i=t,/(\.html|\/)$/.test(i)?i:i+"/").indexOf(encodeURI(n)))return{base:n,config:e[n]};var i;return{}}(e,o),c=l.base,u=l.config;return u?u.map((function(t){return function t(e,n,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if("string"==typeof e)return f(n,e,i);if(Array.isArray(e))return Object.assign(f(n,e[0],i),{title:e[1]});var r=e.children||[];return 0===r.length&&e.path?Object.assign(f(n,e.path,i),{title:e.title}):{type:"group",path:e.path,title:e.title,sidebarDepth:e.sidebarDepth,children:r.map((function(e){return t(e,n,i,a+1)})),collapsable:!1!==e.collapsable}}(t,a,c)})):[]}return[]}function m(t){var e;return(t=t.map((function(t){return Object.assign({},t)}))).forEach((function(t){2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)})),t.filter((function(t){return 2===t.level}))}function v(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})}},312:function(t,e,n){"use strict";n(46),n(68);var i=n(351),a=n.n(i),r=n(311),s={name:"PageEdit",computed:{lastUpdated:function(){return this.$page.lastUpdated},lastUpdatedText:function(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink:function(){var t=a()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,e=this.$site.themeConfig,n=e.repo,i=e.docsDir,r=void 0===i?"":i,s=e.docsBranch,o=void 0===s?"master":s,l=e.docsRepo,c=void 0===l?n:l;return t&&c&&this.$page.relativePath?this.createEditLink(n,c,r,o,this.$page.relativePath):null},editLinkText:function(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink:function(t,e,n,i,a){return/bitbucket.org/.test(t)?(r.i.test(e)?e:t).replace(r.a,"")+"/src"+"/".concat(i,"/")+(n?n.replace(r.a,"")+"/":"")+a+"?mode=edit&spa=0&at=".concat(i,"&fileviewer=file-view-default"):(r.i.test(e)?e:"https://github.com/".concat(e)).replace(r.a,"")+"/edit"+"/".concat(i,"/")+(n?n.replace(r.a,"")+"/":"")+a}}},o=(n(393),n(45)),l=Object(o.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"page-edit"},[t.editLink?n("div",{staticClass:"edit-link"},[n("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),n("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?n("div",{staticClass:"last-updated"},[n("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),n("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null).exports,c=n(394),u=n.n(c),p={name:"PageNav",props:["sidebarItems"],computed:{prev:function(){return f(h.PREV,this)},next:function(){return f(h.NEXT,this)}}};var h={NEXT:{resolveLink:function(t,e){return d(t,e,1)},getThemeLinkConfig:function(t){return t.nextLinks},getPageLinkConfig:function(t){return t.frontmatter.next}},PREV:{resolveLink:function(t,e){return d(t,e,-1)},getThemeLinkConfig:function(t){return t.prevLinks},getPageLinkConfig:function(t){return t.frontmatter.prev}}};function f(t,e){var n=e.$themeConfig,i=e.$page,s=e.$route,o=e.$site,l=e.sidebarItems,c=t.resolveLink,p=t.getThemeLinkConfig,h=t.getPageLinkConfig,f=p(n),d=h(i),m=a()(d)?f:d;return!1===m?void 0:u()(m)?Object(r.k)(o.pages,m,s.path):c(i,l)}function d(t,e,n){var i=[];!function t(e,n){for(var i=0,a=e.length;i<a;i++)"group"===e[i].type?t(e[i].children||[],n):n.push(e[i])}(e,i);for(var a=0;a<i.length;a++){var r=i[a];if("page"===r.type&&r.path===decodeURIComponent(t.path))return i[a+n]}}var m=p,v=(n(395),{components:{PageEdit:l,PageNav:Object(o.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.prev||t.next?n("div",{staticClass:"page-nav"},[n("p",{staticClass:"inner"},[t.prev?n("span",{staticClass:"prev"},[t._v("\n      ←\n      "),"external"===t.prev.type?n("a",{staticClass:"prev",attrs:{href:t.prev.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n\n        "),n("OutboundLink")],1):n("RouterLink",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n      ")])],1):t._e(),t._v(" "),t.next?n("span",{staticClass:"next"},["external"===t.next.type?n("a",{attrs:{href:t.next.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n\n        "),n("OutboundLink")],1):n("RouterLink",{attrs:{to:t.next.path}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n      ")]),t._v("\n      →\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null).exports},props:["sidebarItems"]}),g=(n(396),Object(o.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"page"},[t._t("top"),t._v(" "),n("Content",{staticClass:"theme-default-content"}),t._v(" "),n("PageEdit"),t._v(" "),n("PageNav",t._b({},"PageNav",{sidebarItems:t.sidebarItems},!1)),t._v(" "),t._t("bottom")],2)}),[],!1,null,null,null));e.a=g.exports},313:function(t,e,n){"use strict";n(174),n(69),n(175);var i=n(318),a=n(316),r=n(359),s=(n(361),n(105),n(64)),o="https://api.codenotary.io/immudb-beta",l=n(362),c=n.n(l),u={components:{VueRecaptcha:n(379).a},props:{value:{type:Boolean,default:!1}},data:function(){return{verified:!1,sending:!1,error:!1,sent:!1,sitekey:"6LeHGL4ZAAAAALlN7PGMzqnNBM6GVwhlJ-ZeiCV8",form:this.$inkline.form({contactEmail:{validators:[{rule:"required"},{rule:"email"}]}})}},methods:{onVisibilityChange:function(t){this.$emit("input",t)},onSubmit:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.verified){e.next=2;break}return e.abrupt("return");case 2:return t.sending=!0,n=t.form.contactEmail.value,i={email:n},e.prev=5,e.next=8,c.a.post("".concat(o,"/research-paper"),i,{withCredentials:!0});case 8:t.sent=!0,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(5),t.error=!0;case 14:return e.prev=14,t.sending=!1,t.verified=!1,setTimeout((function(){t.sent=!1,t.error=!1,t.$emit("input",!1)}),4e3),e.finish(14);case 19:case"end":return e.stop()}}),e,null,[[5,11,14,19]])})))()},onVerify:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t&&(e.verified=!0);case 1:case"end":return n.stop()}}),n)})))()}}},p=(n(380),n(45)),h={name:"Home",components:{ResearchPaper:Object(p.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("i-modal",{staticClass:"subscribe-modal",attrs:{size:"lg",value:t.value},on:{input:t.onVisibilityChange}},[n("template",{slot:"header"},[t._v("\n        Download Research Paper\n    ")]),t._v(" "),t.sent?n("i-alert",{staticClass:"_margin-bottom-1",attrs:{variant:"success"}},[n("template",{slot:"icon"},[n("font-awesome-icon",{attrs:{icon:"check-circle"}})],1),t._v(" "),n("p",[t._v("Email sent successfully!")])],2):t._e(),t._v(" "),t.error?n("i-alert",{staticClass:"_margin-bottom-1",attrs:{variant:"danger"}},[n("template",{slot:"icon"},[n("font-awesome-icon",{attrs:{icon:"times-circle"}})],1),t._v(" "),n("p",[t._v("Something went wrong. Please try again later!")])],2):t._e(),t._v(" "),n("p",{staticClass:"_margin-top-0"},[t._v("\n        We'll send you the research paper via email.\n    ")]),t._v(" "),n("i-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}},model:{value:t.form,callback:function(e){t.form=e},expression:"form"}},[n("i-form-group",[n("i-input",{attrs:{schema:t.form.contactEmail,placeholder:"Enter your email"}})],1),t._v(" "),n("i-form-group",[n("vue-recaptcha",{ref:"recaptcha",attrs:{loadRecaptchaScript:!0,sitekey:t.sitekey},on:{verify:t.onVerify}})],1),t._v(" "),n("i-form-group",[n("i-button",{attrs:{type:"submit",variant:"primary",disabled:!t.verified||t.sending,block:""}},[t._v("\n                "+t._s(t.sending?"Sending..":"Send me the document")+"\n            ")])],1)],1)],2)}),[],!1,null,null,null).exports,NavLink:i.a,GithubButton:r.a,Footer:a.a},data:function(){return{researchPaperModalVisible:!1,beta:Object.keys(this.$route.query).includes("beta")}},computed:{data:function(){return this.$page.frontmatter},actionLink:function(){return{link:this.data.actionLink,text:this.data.actionText}}}},f=(n(381),Object(p.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{attrs:{id:"homepage"}},[n("research-paper",{model:{value:t.researchPaperModalVisible,callback:function(e){t.researchPaperModalVisible=e},expression:"researchPaperModalVisible"}}),t._v(" "),n("header",{staticClass:"hero"},[n("div",{staticClass:"hero-content"},[t.data.heroImage?n("img",{attrs:{src:t.$withBase(t.data.heroImage),alt:t.data.heroAlt||"hero"}}):t._e(),t._v(" "),null!==t.data.heroText?n("h1",{attrs:{id:"main-title"}},[t._v("\n                "+t._s(t.data.heroText||t.$title||"Hello")+"\n            ")]):t._e(),t._v(" "),null!==t.data.tagline?n("p",{staticClass:"description"},[t._v("\n                "+t._s(t.data.tagline||t.$description||"Welcome to your VuePress site")+"\n            ")]):t._e(),t._v(" "),t.data.actionText&&t.data.actionLink?n("p",{staticClass:"action"},[n("i-button",{attrs:{size:"lg",variant:"primary",to:t.data.actionLink}},[t._v(t._s(t.data.actionText))])],1):t._e(),t._v(" "),n("p",[n("i-button",{attrs:{link:"",variant:"primary"},on:{click:function(e){t.researchPaperModalVisible=!0}}},[n("i-badge",{staticClass:"_margin-right-1-2",attrs:{size:"sm",variant:"primary"}},[t._v("New")]),t._v(" Download Research Paper\n                ")],1)],1),t._v(" "),n("div",{attrs:{id:"github-button"}},[n("github-button",{attrs:{href:"https://github.com/codenotary/immudb","data-icon":"octicon-star","data-size":"large","data-show-count":"true","aria-label":"Star codenotary/immudb on GitHub"}},[t._v("\n                    Star\n                ")])],1)])]),t._v(" "),n("Content"),t._v(" "),n("Footer")],1)}),[],!1,null,null,null));e.a=f.exports},314:function(t,e,n){"use strict";n(382);var i=n(406),a=(n(388),n(45));function r(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var s={name:"Navbar",components:{SidebarButton:Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar-button",on:{click:function(e){return t.$emit("toggle-sidebar")}}},[n("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"}},[n("path",{attrs:{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"}})])])}),[],!1,null,null,null).exports,NavLinks:n(353).a,SearchBox:i.a,AlgoliaSearchBox:{}},data:function(){return{linksWrapMaxWidth:null}},computed:{algolia:function(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch:function(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}},mounted:function(){var t=this,e=parseInt(r(this.$el,"paddingLeft"))+parseInt(r(this.$el,"paddingRight")),n=function(){document.documentElement.clientWidth<719?t.linksWrapMaxWidth=null:t.linksWrapMaxWidth=t.$el.offsetWidth-e-(t.$refs.siteName&&t.$refs.siteName.offsetWidth||0)};n(),window.addEventListener("resize",n,!1)}},o=(n(392),Object(a.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"navbar"},[n("SidebarButton",{on:{"toggle-sidebar":function(e){return t.$emit("toggle-sidebar")}}}),t._v(" "),n("RouterLink",{staticClass:"home-link",attrs:{to:t.$localePath}},[t.$site.themeConfig.logo?n("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e(),t._v(" "),t.$siteTitle?n("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.logo}},[t._v(t._s(t.$siteTitle))]):t._e()]),t._v(" "),n("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[t.isAlgoliaSearch?n("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search&&!1!==t.$page.frontmatter.search?n("SearchBox"):t._e(),t._v(" "),n("NavLinks",{staticClass:"can-hide"})],1)],1)}),[],!1,null,null,null));e.a=o.exports},316:function(t,e,n){"use strict";n(70);var i={components:{NavLink:n(318).a},data:function(){return{year:(new Date).getFullYear()}}},a=(n(358),n(45)),r=Object(a.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer"},[n("i-container",[n("i-row",[n("i-column",[n("span",{staticClass:"copyright"},[t._v("Copyright © vChain "+t._s(t.year))]),t._v(" "),n("i-nav",{staticClass:"list -inline _font-size-sm"},[n("i-nav-item",{attrs:{to:"/blog"}},[t._v("Blog")]),t._v(" "),n("i-nav-item",{attrs:{to:"/docs"}},[t._v("Documentation")]),t._v(" "),n("i-nav-item",{attrs:{to:"/careers"}},[t._v("Careers")]),t._v(" "),n("i-nav-item",{attrs:{href:"https://github.com/codenotary/immudb",target:"_blank"}},[t._v("GitHub")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.a=r.exports},317:function(t,e,n){"use strict";var i=n(352),a=n(353),r={name:"Sidebar",components:{SidebarLinks:i.default,NavLinks:a.a},props:["items"]},s=(n(400),n(45)),o=Object(s.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("aside",{staticClass:"sidebar"},[e("NavLinks"),this._v(" "),this._t("top"),this._v(" "),e("SidebarLinks",{attrs:{depth:0,items:this.items}}),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null);e.a=o.exports},318:function(t,e,n){"use strict";n(171),n(69),n(355);var i=n(311),a={name:"NavLink",props:{item:{required:!0}},computed:{link:function(){return Object(i.b)(this.item.link)},exact:function(){var t=this;return this.$site.locales?Object.keys(this.$site.locales).some((function(e){return e===t.link})):"/"===this.link},isNonHttpURI:function(){return Object(i.g)(this.link)||Object(i.h)(this.link)},isBlankTarget:function(){return"_blank"===this.target},isInternal:function(){return!Object(i.f)(this.link)&&!this.isBlankTarget},target:function(){return this.isNonHttpURI?null:this.item.target?this.item.target:Object(i.f)(this.link)?"_blank":""},rel:function(){return this.isNonHttpURI?null:this.item.rel?this.item.rel:this.isBlankTarget?"noopener noreferrer":""}},methods:{focusoutAction:function(){this.$emit("focusout")}}},r=n(45),s=Object(r.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isInternal?n("RouterLink",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact},nativeOn:{focusout:function(e){return t.focusoutAction(e)}}},[t._v("\n  "+t._s(t.item.text)+"\n")]):n("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.target,rel:t.rel},on:{focusout:t.focusoutAction}},[t._v("\n  "+t._s(t.item.text)+"\n  "),t.isBlankTarget?n("OutboundLink"):t._e()],1)}),[],!1,null,null,null);e.a=s.exports},320:function(t,e,n){},321:function(t,e,n){},322:function(t,e,n){},325:function(t,e,n){},326:function(t,e,n){},327:function(t,e,n){},328:function(t,e,n){},329:function(t,e,n){},330:function(t,e,n){},331:function(t,e,n){},332:function(t,e,n){},333:function(t,e,n){},334:function(t,e,n){},335:function(t,e,n){},352:function(t,e,n){"use strict";n.r(e);n(171);var i=n(311),a={name:"SidebarGroup",components:{DropdownTransition:n(354).a},props:["item","open","collapsable","depth"],beforeCreate:function(){this.$options.components.SidebarLinks=n(352).default},methods:{isActive:i.e}},r=(n(397),n(45)),s=Object(r.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"sidebar-group",class:[{collapsable:t.collapsable,"is-sub-group":0!==t.depth},"depth-"+t.depth]},[t.item.path?n("RouterLink",{staticClass:"sidebar-heading clickable",class:{open:t.open,active:t.isActive(t.$route,t.item.path)},attrs:{to:t.item.path},nativeOn:{click:function(e){return t.$emit("toggle")}}},[n("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?n("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]):n("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[n("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?n("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),n("DropdownTransition",[t.open||!t.collapsable?n("SidebarLinks",{staticClass:"sidebar-group-items",attrs:{items:t.item.children,"sidebar-depth":t.item.sidebarDepth,depth:t.depth+1}}):t._e()],1)],1)}),[],!1,null,null,null).exports;n(398),n(47);function o(t,e,n,i,a){var r={props:{to:e,activeClass:"",exactActiveClass:""},class:{active:i,"sidebar-link":!0}};return a>2&&(r.style={"padding-left":a+"rem"}),t("RouterLink",r,n)}function l(t,e,n,a,r){var s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;return!e||s>r?null:t("ul",{class:"sidebar-sub-headers"},e.map((function(e){var c=Object(i.e)(a,n+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[o(t,n+"#"+e.slug,e.title,c,e.level-1),l(t,e.children,n,a,r,s+1)])})))}var c={functional:!0,props:["item","sidebarDepth"],render:function(t,e){var n=e.parent,a=n.$page,r=(n.$site,n.$route),s=n.$themeConfig,c=n.$themeLocaleConfig,u=e.props,p=u.item,h=u.sidebarDepth,f=Object(i.e)(r,p.path),d="auto"===p.type?f||p.children.some((function(t){return Object(i.e)(r,p.basePath+"#"+t.slug)})):f,m="external"===p.type?function(t,e,n){return t("a",{attrs:{href:e,target:"_blank",rel:"noopener noreferrer"},class:{"sidebar-link":!0}},[n,t("OutboundLink")])}(t,p.path,p.title||p.path):o(t,p.path,p.title||p.path,d),v=[a.frontmatter.sidebarDepth,h,c.sidebarDepth,s.sidebarDepth,1].find((function(t){return void 0!==t})),g=c.displayAllHeaders||s.displayAllHeaders;return"auto"===p.type?[m,l(t,p.children,p.basePath,r,v)]:(d||g)&&p.headers&&!i.d.test(p.path)?[m,l(t,Object(i.c)(p.headers),p.path,r,v)]:m}};n(399);function u(t,e){return"group"===e.type&&e.children.some((function(e){return"group"===e.type?u(t,e):"page"===e.type&&Object(i.e)(t,e.path)}))}var p={name:"SidebarLinks",components:{SidebarGroup:s,SidebarLink:Object(r.a)(c,void 0,void 0,!1,null,null,null).exports},props:["items","depth","sidebarDepth"],data:function(){return{openGroupIndex:0}},watch:{$route:function(){this.refreshIndex()}},created:function(){this.refreshIndex()},methods:{refreshIndex:function(){var t=function(t,e){for(var n=0;n<e.length;n++){var i=e[n];if(u(t,i))return n}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup:function(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive:function(t){return Object(i.e)(this.$route,t.regularPath)}}},h=Object(r.a)(p,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.items.length?n("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(e,i){return n("li",{key:i},["group"===e.type?n("SidebarGroup",{attrs:{item:e,open:i===t.openGroupIndex,collapsable:e.collapsable||e.collapsible,depth:t.depth},on:{toggle:function(e){return t.toggleGroup(i)}}}):n("SidebarLink",{attrs:{"sidebar-depth":t.sidebarDepth,item:e}})],1)})),0):t._e()}),[],!1,null,null,null);e.default=h.exports},353:function(t,e,n){"use strict";n(182),n(47),n(171),n(69),n(350),n(46),n(99),n(319),n(68);var i=n(43),a=n(318),r=n(354),s=n(184),o=n.n(s),l={name:"DropdownLink",components:{NavLink:a.a,DropdownTransition:r.a},props:{item:{required:!0}},data:function(){return{open:!1}},computed:{dropdownAriaLabel:function(){return this.item.ariaLabel||this.item.text}},watch:{$route:function(){this.open=!1}},methods:{setOpen:function(t){this.open=t},isLastItemOfArray:function(t,e){return o()(e)===t}}},c=(n(390),n(45)),u=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-wrapper",class:{open:t.open}},[n("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":t.dropdownAriaLabel},on:{click:function(e){return t.setOpen(!t.open)}}},[n("span",{staticClass:"title"},[t._v(t._s(t.item.text))]),t._v(" "),n("span",{staticClass:"arrow",class:t.open?"down":"right"})]),t._v(" "),n("DropdownTransition",[n("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"nav-dropdown"},t._l(t.item.items,(function(e,i){return n("li",{key:e.link||i,staticClass:"dropdown-item"},["links"===e.type?n("h4",[t._v("\n          "+t._s(e.text)+"\n        ")]):t._e(),t._v(" "),"links"===e.type?n("ul",{staticClass:"dropdown-subitem-wrapper"},t._l(e.items,(function(i){return n("li",{key:i.link,staticClass:"dropdown-subitem"},[n("NavLink",{attrs:{item:i},on:{focusout:function(n){t.isLastItemOfArray(i,e.items)&&t.isLastItemOfArray(e,t.item.items)&&t.setOpen(!1)}}})],1)})),0):n("NavLink",{attrs:{item:e},on:{focusout:function(n){t.isLastItemOfArray(e,t.item.items)&&t.setOpen(!1)}}})],1)})),0)])],1)}),[],!1,null,null,null).exports,p=n(311),h={name:"NavLinks",components:{NavLink:a.a,DropdownLink:u},computed:{userNav:function(){return this.$themeLocaleConfig.nav||this.$site.themeConfig.nav||[]},nav:function(){var t=this,e=this.$site.locales;if(e&&Object.keys(e).length>1){var n=this.$page.path,a=this.$router.options.routes,r=this.$site.themeConfig.locales||{},s={text:this.$themeLocaleConfig.selectText||"Languages",ariaLabel:this.$themeLocaleConfig.ariaLabel||"Select language",items:Object.keys(e).map((function(i){var s,o=e[i],l=r[i]&&r[i].label||o.lang;return o.lang===t.$lang?s=n:(s=n.replace(t.$localeConfig.path,i),a.some((function(t){return t.path===s}))||(s=i)),{text:l,link:s}}))};return[].concat(Object(i.a)(this.userNav),[s])}return this.userNav},userLinks:function(){return(this.nav||[]).map((function(t){return Object.assign(Object(p.j)(t),{items:(t.items||[]).map(p.j)})}))},repoLink:function(){var t=this.$site.themeConfig.repo;return t?/^https?:/.test(t)?t:"https://github.com/".concat(t):null},repoLabel:function(){if(this.repoLink){if(this.$site.themeConfig.repoLabel)return this.$site.themeConfig.repoLabel;for(var t=this.repoLink.match(/^https?:\/\/[^/]+/)[0],e=["GitHub","GitLab","Bitbucket"],n=0;n<e.length;n++){var i=e[n];if(new RegExp(i,"i").test(t))return i}return"Source"}}}},f=(n(391),Object(c.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.userLinks.length||t.repoLink?n("nav",{staticClass:"nav-links"},[t._l(t.userLinks,(function(t){return n("div",{key:t.link,staticClass:"nav-item"},["links"===t.type?n("DropdownLink",{attrs:{item:t}}):n("NavLink",{attrs:{item:t}})],1)})),t._v(" "),t.repoLink?n("a",{staticClass:"repo-link",attrs:{href:t.repoLink,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n    "+t._s(t.repoLabel)+"\n    "),n("OutboundLink")],1):t._e()],2):t._e()}),[],!1,null,null,null));e.a=f.exports},354:function(t,e,n){"use strict";var i={name:"DropdownTransition",methods:{setHeight:function(t){t.style.height=t.scrollHeight+"px"},unsetHeight:function(t){t.style.height=""}}},a=(n(389),n(45)),r=Object(a.a)(i,(function(){var t=this.$createElement;return(this._self._c||t)("transition",{attrs:{name:"dropdown"},on:{enter:this.setHeight,"after-enter":this.unsetHeight,"before-leave":this.setHeight}},[this._t("default")],2)}),[],!1,null,null,null);e.a=r.exports},358:function(t,e,n){"use strict";var i=n(320);n.n(i).a},380:function(t,e,n){"use strict";var i=n(321);n.n(i).a},381:function(t,e,n){"use strict";var i=n(322);n.n(i).a},388:function(t,e,n){"use strict";var i=n(325);n.n(i).a},389:function(t,e,n){"use strict";var i=n(326);n.n(i).a},390:function(t,e,n){"use strict";var i=n(327);n.n(i).a},391:function(t,e,n){"use strict";var i=n(328);n.n(i).a},392:function(t,e,n){"use strict";var i=n(329);n.n(i).a},393:function(t,e,n){"use strict";var i=n(330);n.n(i).a},395:function(t,e,n){"use strict";var i=n(331);n.n(i).a},396:function(t,e,n){"use strict";var i=n(332);n.n(i).a},397:function(t,e,n){"use strict";var i=n(333);n.n(i).a},399:function(t,e,n){"use strict";var i=n(334);n.n(i).a},400:function(t,e,n){"use strict";var i=n(335);n.n(i).a}}]);