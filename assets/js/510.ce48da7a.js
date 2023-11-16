(window.webpackJsonp=window.webpackJsonp||[]).push([[510],{872:function(e,t,s){"use strict";s.r(t);var a=s(2),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"indexes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#indexes"}},[e._v("#")]),e._v(" Indexes")]),e._v(" "),s("WrappedSection",[s("p",[e._v("immudb indexes can be used for a quick search of rows\nwith columns having specific values.")]),e._v(" "),s("p",[e._v("Certain operations such as ordering values with "),s("code",[e._v("ORDER BY")]),e._v(" clause\nrequire columns to be indexed.")]),e._v(" "),s("div",{staticClass:"language-sql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("CREATE")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("INDEX")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("ON")]),e._v(" customers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("customer_name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("CREATE")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("INDEX")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("ON")]),e._v(" customers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("country"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" ip"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("CREATE")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("INDEX")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("IF")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("NOT")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("EXISTS")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("ON")]),e._v(" customers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("active"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("CREATE")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("UNIQUE")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("INDEX")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("ON")]),e._v(" customers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("email"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])])]),s("p",[e._v("Index can only be added to an empty table.")]),e._v(" "),s("p",[e._v("Index do not have explicit name and is referenced by the ordered list of indexed columns.")]),e._v(" "),s("h3",{attrs:{id:"column-value-constraints"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#column-value-constraints"}},[e._v("#")]),e._v(" Column value constraints")]),e._v(" "),s("p",[e._v("Columns of "),s("code",[e._v("BLOB")]),e._v(" or "),s("code",[e._v("VARCHAR")]),e._v(" type must have a size limit set on them.\nThe maximum allowed value size for one indexed column is 256 bytes.")]),e._v(" "),s("h3",{attrs:{id:"unique-indexes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#unique-indexes"}},[e._v("#")]),e._v(" Unique indexes")]),e._v(" "),s("p",[e._v("Index can be marked as unique with extra "),s("code",[e._v("UNIQUE")]),e._v(" keyword.\nUnique index will prevent insertion of new data into the table\nthat would violate uniqueness of indexed columns within the table.")]),e._v(" "),s("h3",{attrs:{id:"multi-column-indexes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multi-column-indexes"}},[e._v("#")]),e._v(" Multi-column indexes")]),e._v(" "),s("p",[e._v("Index can be set on up to 8 columns.\nThe order of columns is important when doing range scans,\niterating over such index will first sort by the value of the first column,\nthen by the second and so on.")]),e._v(" "),s("p",[e._v("Note:\nLarge indexes will increase the storage requirement and will reduce the performance of data insertion.\nIterating using small indexes will also be faster than with the large ones.")]),e._v(" "),s("h3",{attrs:{id:"if-not-exists"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#if-not-exists"}},[e._v("#")]),e._v(" IF NOT EXISTS")]),e._v(" "),s("p",[e._v("With this clause the "),s("code",[e._v("CREATE INDEX")]),e._v(" statement will not fail if an index with same type and list of columns already exists.\nThis includes a use case where the table is not empty which can be used to simplify database schema initialization.")]),e._v(" "),s("p",[e._v("Note: If the index already exists, it is not compared against the provided index definition neither it is\nupdated to match it.")])])],1)}),[],!1,null,null,null);t.default=n.exports}}]);