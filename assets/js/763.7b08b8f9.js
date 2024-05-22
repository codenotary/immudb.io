(window.webpackJsonp=window.webpackJsonp||[]).push([[763],{1122:function(e,t,a){"use strict";a.r(t);var s=a(2),v=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"data-types"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-types"}},[e._v("#")]),e._v(" Data types")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Name")]),e._v(" "),a("th",[e._v("Description")]),e._v(" "),a("th",[e._v("Length constraints")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("INTEGER")]),e._v(" "),a("td",[e._v("Signed 64-bit integer value. Usually referred to as "),a("code",[e._v("BIGINT")]),e._v(" in other databases.")]),e._v(" "),a("td",[e._v("-")])]),e._v(" "),a("tr",[a("td",[e._v("BOOLEAN")]),e._v(" "),a("td",[e._v("A boolean value, either "),a("code",[e._v("TRUE")]),e._v(" or "),a("code",[e._v("FALSE")])]),e._v(" "),a("td",[e._v("-")])]),e._v(" "),a("tr",[a("td",[e._v("VARCHAR")]),e._v(" "),a("td",[e._v("UTF8-encoded text")]),e._v(" "),a("td",[e._v("Maximum number of bytes in the UTF-8 encoded representation of the string")])]),e._v(" "),a("tr",[a("td",[e._v("BLOB")]),e._v(" "),a("td",[e._v("sequence of bytes")]),e._v(" "),a("td",[e._v("Maximum number of bytes in the sequence")])]),e._v(" "),a("tr",[a("td",[e._v("TIMESTAMP")]),e._v(" "),a("td",[e._v("datetime value with microsecond precision")]),e._v(" "),a("td",[e._v("-")])]),e._v(" "),a("tr",[a("td",[e._v("FLOAT")]),e._v(" "),a("td",[e._v("IEEE-754 64-bit floating-point number")]),e._v(" "),a("td",[e._v("-")])]),e._v(" "),a("tr",[a("td",[e._v("UUID")]),e._v(" "),a("td",[e._v("Universally Unique Identifier (UUID), 128-bit value")]),e._v(" "),a("td",[e._v("-")])])])]),e._v(" "),a("p",[a("br"),a("br")]),e._v(" "),a("WrappedSection",[a("h3",{attrs:{id:"size-constraints"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#size-constraints"}},[e._v("#")]),e._v(" Size constraints")]),e._v(" "),a("p",[e._v("Size constraint is specified with a "),a("code",[e._v("[MAX_SIZE]")]),e._v(" suffix on the type,\ne.g. "),a("code",[e._v("BLOB[16]")]),e._v(" represents a sequence of up to 16 bytes.")])]),e._v(" "),a("WrappedSection",[a("h3",{attrs:{id:"null-values"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#null-values"}},[e._v("#")]),e._v(" NULL values")]),e._v(" "),a("p",[a("code",[e._v("NULL")]),e._v(" values in immudb are not unique - two "),a("code",[e._v("NULL")]),e._v(" values are considered equal on comparisons.")])]),e._v(" "),a("WrappedSection",[a("h3",{attrs:{id:"timestamp-values"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#timestamp-values"}},[e._v("#")]),e._v(" Timestamp values")]),e._v(" "),a("p",[e._v("Timestamp values are internally stored as a 64-bit signed integer being a number of microseconds since the epoch time.\nThose values are not associated with any timezone, whenever a conversion is needed, it is considered to be in UTC.")])])],1)}),[],!1,null,null,null);t.default=v.exports}}]);