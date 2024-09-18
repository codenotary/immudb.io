(window.webpackJsonp=window.webpackJsonp||[]).push([[932],{1294:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"inserting-or-updating-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#inserting-or-updating-data"}},[t._v("#")]),t._v(" Inserting or updating data")]),t._v(" "),a("WrappedSection",[a("h3",{attrs:{id:"insert"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#insert"}},[t._v("#")]),t._v(" INSERT")]),t._v(" "),a("p",[t._v("immudb supports standard "),a("code",[t._v("INSERT")]),t._v(" sql statement.\nIt can be used to add one or multiple values within the same transaction.")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INSERT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" customers "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" customer_name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" email"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" address"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    city"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ip"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" country"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" active"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created_at\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Isidro Behnen'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ibehnen0@mail.ru'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ibehnen0@chronoengine.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Arvika'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'127.0.0.15'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SE'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("24")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NOW")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INSERT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" products "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" price"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created_at"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Juice - V8, Tomato'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$4.04'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NOW")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Milk'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$3.24'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NOW")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INSERT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" orders "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customerid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" productid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created_at"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NOW")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NOW")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INSERT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" customer_review "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customerid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" productid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" review"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created_at"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Nice Juice!'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NOW")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),a("WrappedSection",[a("h3",{attrs:{id:"upsert"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#upsert"}},[t._v("#")]),t._v(" UPSERT")]),t._v(" "),a("p",[a("code",[t._v("UPSERT")]),t._v(" is an operation with a syntax similar to "),a("code",[t._v("INSERT")]),t._v(",\nthe difference between those two is that "),a("code",[t._v("UPSERT")]),t._v(" either creates a new or replaces an existing row.\nA new row is created if an entry with the same primary key does not yet exist in the table,\notherwise the current row is replaced with the new one.")]),t._v(" "),a("p",[t._v("If a table contains an "),a("code",[t._v("AUTO_INCREMENT")]),t._v(" primary key,\nthe value for that key must be provided\nand the "),a("code",[t._v("UPSERT")]),t._v(" operation will only update the existing row.")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[t._v("UPSERT "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" products "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" price"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Milk'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$3.17'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Grapes - Red'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$5.03'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nUPSERT "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" orders "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" customerid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" productid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),a("WrappedSection",[a("h3",{attrs:{id:"on-conflict"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#on-conflict"}},[t._v("#")]),t._v(" ON CONFLICT")]),t._v(" "),a("p",[t._v("The optional "),a("code",[t._v("ON CONFLICT")]),t._v(" clause specifies an alternative action to raising a unique violation or constraint error.\n"),a("code",[t._v("ON CONFLICT DO NOTHING")]),t._v(" simply avoids inserting a row as its alternative action. In this case the primary key of the row is returned.")])]),t._v(" "),a("WrappedSection",[a("h3",{attrs:{id:"built-in-functions-now-random-uuid-and-cast"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#built-in-functions-now-random-uuid-and-cast"}},[t._v("#")]),t._v(" Built-in functions: now(), random_uuid() and cast()")]),t._v(" "),a("p",[t._v("The built-in "),a("code",[t._v("now()")]),t._v(" function returns the transaction creation time as seen on the server.\nIn the scope of a single transaction, it always returns the same result time.")]),t._v(" "),a("p",[t._v("The built-in "),a("code",[t._v("random_uuid()")]),t._v(" function returns the new UUID value each time.")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("cast")]),t._v(" function can be used to convert a string or an integer to a timestamp value.\nThe casting expression can be shortened by using "),a("code",[t._v("::")]),t._v("\ne.g. the expression "),a("code",[t._v("100")]),t._v("::INTEGER converts the string "),a("code",[t._v("100")]),t._v(" into an integer value.")]),t._v(" "),a("p",[t._v("The integer value is interpreted as a Unix timestamp (number of seconds since the epoch time).")]),t._v(" "),a("p",[t._v("The string value passed to the "),a("code",[t._v("cast")]),t._v(" function must be in one of the following formats:\n"),a("code",[t._v("2021-12-08")]),t._v(",  "),a("code",[t._v("2021-12-08 17:21")]),t._v(", "),a("code",[t._v("2021-12-08 17:21:59")]),t._v(", "),a("code",[t._v("2021-12-08 17:21:59.342516")]),t._v(".\nTime components not specified in the string are set to 0.")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[t._v("UPSERT "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" products "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" price"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created_at"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" random_uuid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Bread'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$1.50'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'c698d13a-68cd-11ee-8c99-0242ac120002'")]),t._v("::UUID"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Spinach'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$0.99'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cast"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2021-02-01'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TIMESTAMP")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" products "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" created_at "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NOW")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])],1)}),[],!1,null,null,null);s.default=e.exports}}]);