(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{551:function(t,a,s){"use strict";s.r(a);var e=s(10),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("blockquote",[s("p",[t._v("Note: This page requires immudb 1.0 which is not yet released. If you want to try this features, you need to build immudb from the "),s("code",[t._v("sql_support")]),t._v(" branch.")])]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#sql-operations-with-immuclient"}},[t._v("SQL operations with immuclient")])]),s("li",[s("a",{attrs:{href:"#time-travel"}},[t._v("Time travel")])]),s("li",[s("a",{attrs:{href:"#sql-reference"}},[t._v("SQL Reference")]),s("ul",[s("li",[s("a",{attrs:{href:"#creating-and-using-databases"}},[t._v("Creating and using databases")])]),s("li",[s("a",{attrs:{href:"#creating-tables"}},[t._v("Creating tables")])]),s("li",[s("a",{attrs:{href:"#indexes"}},[t._v("Indexes")])]),s("li",[s("a",{attrs:{href:"#inserting-or-updating-data"}},[t._v("Inserting or updating data")])]),s("li",[s("a",{attrs:{href:"#querying"}},[t._v("Querying")])]),s("li",[s("a",{attrs:{href:"#parameters"}},[t._v("Parameters")])]),s("li",[s("a",{attrs:{href:"#aggregations"}},[t._v("Aggregations")])]),s("li",[s("a",{attrs:{href:"#transactions"}},[t._v("Transactions")])]),s("li",[s("a",{attrs:{href:"#time-travel"}},[t._v("Time travel")])])])]),s("li",[s("a",{attrs:{href:"#sql-operations-with-the-go-sdk"}},[t._v("SQL Operations with the Go SDK")])]),s("li",[s("a",{attrs:{href:"#embedding-the-sql-engine-in-your-application"}},[t._v("Embedding the SQL engine in your application")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"sql-operations-with-immuclient"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sql-operations-with-immuclient"}},[t._v("#")]),t._v(" SQL operations with immuclient")]),t._v(" "),s("p",[t._v("In addition to a key-value store, immudb supports the relational model (SQL). For example, to a table:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('$ immuclient exec "CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);"\nsql ok, Ctxs: 1 Dtxs: 0\n')])])]),s("p",[t._v("To insert data, use "),s("code",[t._v("UPSERT")]),t._v(" (insert or update), which will add an entry, or overwrite it if already exists (based on the primary key):")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ immuclient exec \"UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 10000);\"\nsql ok, Ctxs: 0 Dtxs: 1\nimmuclient exec \"UPSERT INTO people(id, name, salary) VALUES (2, 'Bob', 30000);\"\nsql ok, Ctxs: 0 Dtxs: 1\n")])])]),s("p",[t._v("To query the data you can use the traditional "),s("code",[t._v("SELECT")]),t._v(":")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('$ immuclient query "SELECT id, name, salary FROM people;"\n+-----------------------+-------------------------+---------------------------+\n| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |\n+-----------------------+-------------------------+---------------------------+\n|                     1 | Joe                     |                     10000 |\n|                     2 | Bob                     |                     30000 |\n+-----------------------+-------------------------+---------------------------+\n')])])]),s("p",[t._v('If we upsert again on the primary key "1", the value for "Joe" will be overwriten:')]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('immuclient exec "UPSERT INTO people(id, name, salary) VALUES (1, \'Joe\', 20000);"\nsql ok, Ctxs: 0 Dtxs: 1\n\nimmuclient query "SELECT id, name, salary FROM people;"\n+-----------------------+-------------------------+---------------------------+\n| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |\n+-----------------------+-------------------------+---------------------------+\n|                     1 | Joe                     |                     20000 |\n|                     2 | Bob                     |                     30000 |\n+-----------------------+-------------------------+---------------------------+\n')])])]),s("h2",{attrs:{id:"time-travel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#time-travel"}},[t._v("#")]),t._v(" Time travel")]),t._v(" "),s("p",[t._v("immudb is a immutable database. History is always preserved. With immudb you can travel in time!")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("immuclient query \"SELECT id, name, salary FROM people WHERE name='Joe';\"\n+-----------------------+-------------------------+---------------------------+\n| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |\n+-----------------------+-------------------------+---------------------------+\n|                     1 | Joe                     |                     20000 |\n+-----------------------+-------------------------+---------------------------+\n")])])]),s("p",[t._v("Eg. before the update:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("immuclient query \"SELECT id, name, salary FROM (people BEFORE TX 3) WHERE name='Joe';\"\n+-----------------------+-------------------------+---------------------------+\n| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |\n+-----------------------+-------------------------+---------------------------+\n|                     1 | Joe                     |                     10000 |\n+-----------------------+-------------------------+---------------------------+\n")])])]),s("p",[t._v("or even before the first time insert (guess what, it is empty!):")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("immuclient query \"SELECT id, name, salary FROM (people BEFORE TX 1) WHERE name='Joe';\"\n+-----------------------+-------------------------+---------------------------+\n| (DEFAULTDB PEOPLE ID) | (DEFAULTDB PEOPLE NAME) | (DEFAULTDB PEOPLE SALARY) |\n+-----------------------+-------------------------+---------------------------+\n+-----------------------+-------------------------+---------------------------+\n")])])]),s("p",[t._v("You can even "),s("code",[t._v("TABLE")]),t._v(" a table with itself in the past. Imagine you want to see how people salary changed between two points in time:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('immuclient query "SELECT peoplenow.id, peoplenow.name, peoplethen.salary, peoplenow.salary FROM (people BEFORE TX 3 AS peoplethen) INNER JOIN (people AS peoplenow) ON peoplenow.id=peoplethen.id;"\n+--------------------------+----------------------------+-------------------------------+------------------------------+\n| (DEFAULTDB PEOPLENOW ID) | (DEFAULTDB PEOPLENOW NAME) | (DEFAULTDB PEOPLETHEN SALARY) | (DEFAULTDB PEOPLENOW SALARY) |\n+--------------------------+----------------------------+-------------------------------+------------------------------+\n|                        1 | Joe                        |                         10000 |                        20000 |\n|                        2 | Bob                        |                         30000 |                        30000 |\n+--------------------------+----------------------------+-------------------------------+------------------------------+\n')])])]),s("h2",{attrs:{id:"sql-reference"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sql-reference"}},[t._v("#")]),t._v(" SQL Reference")]),t._v(" "),s("h3",{attrs:{id:"creating-and-using-databases"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-and-using-databases"}},[t._v("#")]),t._v(" Creating and using databases")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("CREATE DATABASE db1;\nUSE DATABASE db1;\n")])])]),s("h3",{attrs:{id:"creating-tables"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-tables"}},[t._v("#")]),t._v(" Creating tables")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("CREATE TABLE table1 (id INTEGER, PRIMARY KEY id);\nCREATE TABLE table1 (id INTEGER, ts INTEGER, title VARCHAR, active BOOLEAN, payload BLOB, PRIMARY KEY id);\n")])])]),s("h3",{attrs:{id:"indexes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#indexes"}},[t._v("#")]),t._v(" Indexes")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("CREATE INDEX ON table1(name);\n")])])]),s("h3",{attrs:{id:"inserting-or-updating-data"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#inserting-or-updating-data"}},[t._v("#")]),t._v(" Inserting or updating data")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("UPSERT INTO table1 (id, title) VALUES (1, 'some title')\nUPSERT INTO table1 (id, ts, title, active, payload) VALUES (2, NOW(), 'title', true, x'a blob')\n")])])]),s("h3",{attrs:{id:"querying"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#querying"}},[t._v("#")]),t._v(" Querying")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("SELECT id, title FROM db1.table1 AS t1\nSELECT t1.id, title FROM (db1.table1 AS t1)\nSELECT id, time, name FROM table1 WHERE country = 'US' AND time <= NOW() AND name = @pname\nSELECT id, title, year FROM table1 ORDER BY title ASC, year DESC\nSELECT id, name, table2.status FROM table1 INNER JOIN table2 ON table1.id = table2.id WHERE name = 'John' ORDER BY name DESC\nSELECT country, SUM(amount) FROM table1 GROUP BY country\nSELECT id FROM table1 WHERE (id > 0 AND NOT table1.id >= 10) OR table1.title LIKE 'J.*'\n")])])]),s("h3",{attrs:{id:"parameters"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#parameters"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("SELECT t.id as d FROM (people AS t) WHERE id <= 3 AND active = @active\n")])])]),s("h3",{attrs:{id:"aggregations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aggregations"}},[t._v("#")]),t._v(" Aggregations")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("SELECT COUNT() AS c, SUM(age), MIN(age), MAX(age), AVG(age) FROM table1 AS t1\nSELECT active, COUNT() as c, MIN(age), MAX(age) FROM table1 GROUP BY active HAVING COUNT() > 0 ORDER BY active DESC\n")])])]),s("h3",{attrs:{id:"transactions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#transactions"}},[t._v("#")]),t._v(" Transactions")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("BEGIN TRANSACTION; UPSERT INTO table1 (id, label) VALUES (100, 'label1'); UPSERT INTO table2 (id) VALUES (10) COMMIT;\n")])])]),s("h3",{attrs:{id:"time-travel-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#time-travel-2"}},[t._v("#")]),t._v(" Time travel")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("USE SNAPSHOT BEFORE TX 1000\n")])])]),s("h2",{attrs:{id:"sql-operations-with-the-go-sdk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sql-operations-with-the-go-sdk"}},[t._v("#")]),t._v(" SQL Operations with the Go SDK")]),t._v(" "),s("p",[t._v("In order to use SQL from the Go SDK, you create a immudb client and login to the server like usual. First make sure you import:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('"github.com/codenotary/immudb/pkg/api/schema"\n"github.com/codenotary/immudb/pkg/client"\n"google.golang.org/grpc/metadata"\n')])])]),s("p",[t._v("Then you can create the client and login to the database:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" client"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewImmuClient")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("client"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("DefaultOptions")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tlog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\tctx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Background")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\tlr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Login")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("`immudb`")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("`immudb`")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tlog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\tmd "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" metadata"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Pairs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"authorization"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" lr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Token"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tctx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" metadata"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewOutgoingContext")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" md"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("To perform SQL statements, use the "),s("code",[t._v("SQLExec")]),t._v(" function, which takes a "),s("code",[t._v("SQLExecRequest")]),t._v(" with a SQL operation:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLExec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("schema"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SQLExecRequest"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Sql"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("`\n\t\tBEGIN TRANSACTION\n          CREATE TABLE people(id INTEGER, name VARCHAR, salary INTEGER, PRIMARY KEY id);\n          CREATE INDEX ON people(name)\n\t\tCOMMIT\n\t`")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("This is also how you perform inserts:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLExec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("schema"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SQLExecRequest"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Sql"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"UPSERT INTO people(id, name, salary) VALUES (1, 'Joe', 10000);\"")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("Once you have data in the database, you can use the "),s("code",[t._v("SQLQuery")]),t._v(" method of the client to query:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("q "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SELECT id, name, salary FROM people;"')]),t._v("\nqres"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" c"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLQuery")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("schema"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SQLQueryRequest"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Sql"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("Both "),s("code",[t._v("SQLQuery")]),t._v(" and "),s("code",[t._v("SQLExec")]),t._v(" allows named parameters. Just encode them as "),s("code",[t._v("@param")]),t._v(" and pass "),s("code",[t._v("map[string]{}interface")]),t._v(" as values. Example:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" client"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("SQLQuery")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SELECT t.id as d FROM (people AS t) WHERE id <= 3 AND active = @active"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" params"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[s("code",[t._v("qres")]),t._v(" is of the type "),s("code",[t._v("*schema.SQLQueryResult")]),t._v(". In order to iterate over the results, you iterate over "),s("code",[t._v("qres.Rows")]),t._v(". On earch iteration, the row "),s("code",[t._v("r")]),t._v(" will have a member "),s("code",[t._v("Values")]),t._v(", which you can iterate to get each column.")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" r "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("range")]),t._v(" qres"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Rows "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\t\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" v "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("range")]),t._v(" r"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Values "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tfmt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Printf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%v\\n"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" schema"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RenderValue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Operation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"embedding-the-sql-engine-in-your-application"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#embedding-the-sql-engine-in-your-application"}},[t._v("#")]),t._v(" Embedding the SQL engine in your application")]),t._v(" "),s("p",[t._v("Using the Go client SDK means you are connecting to a immudb database server. There are cases where you don't want a separate server but embed immudb directly in the same application process, as a library.")]),t._v(" "),s("p",[t._v("immudb provides you a immutable embedded SQL engine which keeps all history, is tamper-proof and can travel in time.")]),t._v(" "),s("p",[t._v("immudb already provides an embeddable key-value store in the "),s("a",{attrs:{href:"https://github.com/codenotary/immudb/tree/master/embedded",target:"_blank",rel:"noopener noreferrer"}},[t._v("embedded"),s("OutboundLink")],1),t._v(" package.")]),t._v(" "),s("p",[t._v("The SQL engine is mounted on top of the embedded key value store, and requires two stores to be initialized, one for the data, and one for the catalog (schema).")]),t._v(" "),s("p",[t._v("Make sure to import:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('"github.com/codenotary/immudb/embedded/store"\n"github.com/codenotary/immudb/pkg/sql"\n')])])]),s("p",[t._v("Create stores for the data and catalog:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("catalogStore"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" store"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Open")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"catalog"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" store"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("DefaultOptions")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\ndataStore"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" store"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Open")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sqldata"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" store"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("DefaultOptions")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("And now you can create the SQL engine, passing both stores and a key prefix:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("engine"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" sql"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewEngine")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("catalogStore"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" dataStore"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sql"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("The engine has an API to execute statements and queries. To execute an statement:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" engine"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ExecStmt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CREATE TABLE journal (id INTEGER, date STRING, creditaccount INTEGER, debitaccount INTEGER amount INTEGER, description STRING, PRIMARY KEY id)"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("Queries can be executed using "),s("code",[t._v("QueryStmt")]),t._v(":")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("r"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" engine"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("QueryStmt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SELECT id, date, creditaccount, debitaccount, amount, description FROM journal"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("To iterate over a result set "),s("code",[t._v("r")]),t._v(", just fetch rows until there are no more entries. Every row has a "),s("code",[t._v("Values")]),t._v(" member you can index to access the column:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\trow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" r"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Read")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" fmt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Sprint")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"no more entries"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tlog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// do something with row.Values")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("And that is all you need. If you need to change options like where things get stored by default, you can do that in the underlying store objects that the SQL engine is using.")])])}),[],!1,null,null,null);a.default=n.exports}}]);