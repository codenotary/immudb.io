(window.webpackJsonp=window.webpackJsonp||[]).push([[822],{1183:function(t,e,v){"use strict";v.r(e);var a=v(2),_=Object(a.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"data-types"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#data-types"}},[t._v("#")]),t._v(" Data types")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("Name")]),t._v(" "),v("th",[t._v("Description")]),t._v(" "),v("th",[t._v("Length constraints")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("INTEGER")]),t._v(" "),v("td",[t._v("Signed 64-bit integer value. Usually referred to as "),v("code",[t._v("BIGINT")]),t._v(" in other databases.")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("BOOLEAN")]),t._v(" "),v("td",[t._v("A boolean value, either "),v("code",[t._v("TRUE")]),t._v(" or "),v("code",[t._v("FALSE")])]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("VARCHAR")]),t._v(" "),v("td",[t._v("UTF8-encoded text")]),t._v(" "),v("td",[t._v("Maximum number of bytes in the UTF-8 encoded representation of the string")])]),t._v(" "),v("tr",[v("td",[t._v("BLOB")]),t._v(" "),v("td",[t._v("Sequence of bytes")]),t._v(" "),v("td",[t._v("Maximum number of bytes in the sequence")])]),t._v(" "),v("tr",[v("td",[t._v("TIMESTAMP")]),t._v(" "),v("td",[t._v("Datetime value with microsecond precision")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("FLOAT")]),t._v(" "),v("td",[t._v("IEEE-754 64-bit floating-point number")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("UUID")]),t._v(" "),v("td",[t._v("Universally Unique Identifier (UUID), 128-bit value")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("JSON")]),t._v(" "),v("td",[t._v("RFC 8259 textual JSON data")]),t._v(" "),v("td",[t._v("Maximum number of bytes in the textual representation of the data")])])])]),t._v(" "),v("p",[v("br"),v("br")]),t._v(" "),v("WrappedSection",[v("h3",{attrs:{id:"size-constraints"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#size-constraints"}},[t._v("#")]),t._v(" Size constraints")]),t._v(" "),v("p",[t._v("Size constraint is specified with a "),v("code",[t._v("[MAX_SIZE]")]),t._v(" suffix on the type,\ne.g. "),v("code",[t._v("BLOB[16]")]),t._v(" represents a sequence of up to 16 bytes.")])]),t._v(" "),v("WrappedSection",[v("h3",{attrs:{id:"null-values"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#null-values"}},[t._v("#")]),t._v(" NULL values")]),t._v(" "),v("p",[v("code",[t._v("NULL")]),t._v(" values in immudb are not unique - two "),v("code",[t._v("NULL")]),t._v(" values are considered equal on comparisons.")])]),t._v(" "),v("WrappedSection",[v("h3",{attrs:{id:"timestamp-values"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#timestamp-values"}},[t._v("#")]),t._v(" Timestamp values")]),t._v(" "),v("p",[t._v("Timestamp values are internally stored as a 64-bit signed integer being a number of microseconds since the epoch time.\nThose values are not associated with any timezone, whenever a conversion is needed, it is considered to be in UTC.")])]),t._v(" "),v("WrappedSection",[v("h3",{attrs:{id:"json-primitive-types-and-internal-sql-types"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#json-primitive-types-and-internal-sql-types"}},[t._v("#")]),t._v(" JSON primitive types and internal SQL types")]),t._v(" "),v("p",[t._v("Except for "),v("code",[t._v("lists")]),t._v(" and "),v("code",[t._v("objects")]),t._v(", each JSON type is backed by a specific immudb internal SQL type. The mapping between JSON primitive types and SQL internal types is reported in the following table:")]),t._v(" "),v("br"),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("JSON primitive type")]),t._v(" "),v("th",[t._v("Internal SQL type")]),t._v(" "),v("th",[t._v("Description")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("STRING")]),t._v(" "),v("td",[t._v("VARCHAR")]),t._v(" "),v("td",[t._v("control characters, quotation marks and backslashes must be escaped")])]),t._v(" "),v("tr",[v("td",[t._v("NUMBER")]),t._v(" "),v("td",[t._v("FLOAT")]),t._v(" "),v("td",[v("code",[t._v("NaN")]),t._v(", "),v("code",[t._v("Infinity")]),t._v(" and "),v("code",[t._v("-Infinity")]),t._v(" are not supported")])]),t._v(" "),v("tr",[v("td",[t._v("BOOLEAN")]),t._v(" "),v("td",[t._v("BOOLEAN")]),t._v(" "),v("td",[t._v("only lowercase "),v("code",[t._v("true")]),t._v(" and "),v("code",[t._v("false")]),t._v(" are valid")])]),t._v(" "),v("tr",[v("td",[t._v("NULL")]),t._v(" "),v("td",[t._v("NULL")]),t._v(" "),v("td",[t._v("-")])])])])])],1)}),[],!1,null,null,null);e.default=_.exports}}]);