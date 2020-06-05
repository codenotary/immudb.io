---
title: Step by Step Guide to immudb
image: /blog/mascot.jpg
excerpt: 
    Learn how to use immudb and store your first entries tamperproof
date: 2020-06-05
tags: 
  - Bash
  - Go
  - immudb
  - guideline
author: Dennis
location: Switzerland
---

# A Step by Step Guide to immudb — the open source immutable database

**immudb** is **lightweight, high-speed immutable database** for systems and applications.

With [immudb](https://github.com/codenotary/immudb) you can track changes in sensitive data in your transactional databases and then record those changes indelibly in a the tamperproof immudb database.

This allows you to keep an indelible history of, say, your debit/credit transactions.

immudb is open source under the [Apache v2.0 License](https://github.com/codenotary/immudb/blob/master/LICENSE), and can be found here (there is also a more comprehensive documentation):

Traditional transaction logs are hard to scale, and are not immutable. So there is no way to know for sure if your data has been compromised.

You can find an example video here:

## How it works

As such immudb provides **unparalleled insights** **retro-actively**, of what happened to your sensitive data, even if your perimiter was compromised. immudb provides the guarantatee of immutability by using internally a **Merkle tree structure**.

immudb gives you the same **cyrptographic verification** of the integrity of data written with **SHA-256** like classic blockchain without the cost and complexity associated with blockchains today.

immudb has 4 main benefits:

* **immudb is immutable**. You can only add records, but **never change or delete records**.
* data stored in immudb is **cryptographically coherent and verifiable**, like blockchains, just without all the complexity and at high speed.
* Anyone can get **started with immudb in minutes**. Wether in node.js, Java, Python, Golang, .Net, or any other language. It's very easy to use and you can have your immutable database running in just a few minutes.
* Finally, immudb is **Open Source**. You can run it **on premise**, or in the **cloud** and it's completely free. immudb is governed by the Apache 2.0 License.

immudb is currently runs on **Linux**, **FreeBSD**, **Windows**, and **MacOS**, along with other systems derived from them, such as **Kubernetes** and **Docker**.

## **immudb High-level**

## The components

* **immudb** is the server binary that listens on port 3322 on localhost and provides a gRPC interface
* **immugw** is the intelligent REST proxy that connects to immudb and provides a RESTful interface for applications. We recommend to run immudb and immugw on separate machines to enhance security
* **immuadmin** is the admin CLI for immudb and immugw. You can install and manage the service installation for both components and get statistics as well as runtime information.

## **Getting started**

You can either build Docker images based on the Dockerfiles in the GitHub repository for the most common architectures or use the prebuild ones on Dockerhub for Linux.

## Build it yourself
    
~~~bash
docker build -t myown/immudb:latest -f Dockerfile .
docker build -t myown/immugw:latest -f Dockerfile.immugw .
docker build -t myown/immuadmin:latest -f Dockerfile.immuadmin .
~~~

## immudb **Dockerhub**
    
~~~bash
docker run -it -d -p 3322:3322 -p 9497:9497 — name immudb codenotary/immudb:latest
~~~

## **immugw Dockerhub**
    
~~~bash
docker run -it -d -p 3323:3323 --name immugw --env IMMUGW_IMMUDB-ADDRESS=immudb codenotary/immugw:latest
~~~

## standalone Binaries

If you want to build the **binaries **yourself, simply [clone this repo](https://github.com/codenotary/immudb) and run one of the following commands based on your operating system.
    
~~~bash
# Linux
GOOS=linux GOARCH=amd64 make immuadmin-static immudb-static immugw-static
# macOS
GOOS=darwin GOARCH=amd64 make immuadmin-static immudb-static immugw-static
# Microsoft Windows
GOOS=windows GOARCH=amd64 make immuadmin-static immudb-static immugw-static
~~~

Then you can run immudb the immudb server
    
~~~bash
# run immudb in the foreground 
./immudb
# run immudb in the background 
./immudb -d
~~~

## **install immudb as a service**

Please make sure to build or download the immudb and immuadmin component and save them in the same work directory when installing the service.
    
~~~bash
# install immudb service 
./immuadmin service immudb install
# check current immudb service status 
./immuadmin service immudb status
# stop immudb service 
./immuadmin service immudb stop
# start immudb service 
./immuadmin service immudb start
~~~

The immud linux service is using the following defaults:

* user: immu
* group: immu
* configuration: /etc/immudb
* data: /var/lib/immudb
* logs: /var/log/immudb
* Service Port: 3322 (immudb), 3323 (immugw)
* Prometheus Port: 9497

You can do the same with the immugw API Gateway that should be installed on a separate system for security reasons.

Please make sure to build or download the immugw and immuadmin component and save them in the same work directory when installing the service.
    
~~~bash
# install immugw service 
./immuadmin service immugw install
# check current immugw service status 
./immuadmin service immugw status
# stop immugw service 
./immuadmin service immugw stop
# start immugw service 
./immuadmin service immugw start
~~~

As immudb is often compared to Amazon QLDB, we did a performance benchmark using a simple demo application to write data (without using any unfair optimization).

Test setup:

* 4 CPU cores
* Intel(R) Xeon(R) CPU E3–1275 v6 @ 3.80GHz
* 64 GB memory
* SSD

![immudb throughput read Benchmark](https://github.com/codenotary/immudb/raw/master/img/throughput_read.png "Throughput read (higher is better)")

![immudb Throughput write Benchmark](https://github.com/codenotary/immudb/raw/master/img/throughput_write.png "Throughput write (higher is better)")



## immudb statistics

To check the statistics at any time, please use `immuadmin stats`:

```bash
./immuadmin stats -t
Database path              :    db/immudb
Uptime                     :    1m38.64s
Number of entries          :    12
LSM size                   :    701 B
VLog size                  :    1.1 kB
Total size                 :    1.8 kB
Number of clients          :    1
Queries per client         :
   127.0.0.1               :    26
      Last query           :    749.641765ms ago
Avg. duration (nb calls)   :    µs
   ByIndex (0)             :    0
   ByIndexSV (0)           :    0
   ChangePassword (0)      :    0
   Consistency (0)         :    0
   Count (0)               :    0
   CreateUser (0)          :    0
   CurrentRoot (0)         :    0
   DeactivateUser (0)      :    0
   Dump (0)                :    0
   Get (5)                 :    20
   GetBatch (0)            :    0
   GetBatchSV (0)          :    0
   GetSV (0)               :    0
   Health (16)             :    33
   History (0)             :    0
   HistorySV (0)           :    0
   IScan (0)               :    0
   IScanSV (0)             :    0
   Inclusion (0)           :    0
   Login (0)               :    0
   Reference (0)           :    0
   SafeGet (0)             :    0
   SafeGetSV (0)           :    0
   SafeReference (0)       :    0
   SafeSet (0)             :    0
   SafeSetSV (0)           :    0
   SafeZAdd (0)            :    0
   Scan (0)                :    0
   ScanSV (0)              :    0
   Set (5)                 :    76
   SetBatch (0)            :    0
   SetBatchSV (0)          :    0
   SetSV (0)               :    0
   ZAdd (0)                :    0
   ZScan (0)               :    0
   ZScanSV (0)             :    0

```

or visual (default)

![immuadmin stats](https://github.com/codenotary/immudb/raw/master/img/stats-v.png)


## Prometheus and Grafana monitoring

immudb has a built-in prometheus exporter that publishes all metrics at port 9497 (:9497/metrics) by default. When running a Prometheus instance, you can configure the target like in this example:
    
~~~yml
- job_name: 'immudbmetrics'
    scrape_interval: 60s
    static_configs:
         - targets: ['my-immudb-server:9497']
~~~

![Grafana Dashboard](https://github.com/codenotary/immudb/raw/master/img/grafana-dashboard.png)

You can find the Grafana dashboard here: [https://grafana.com/grafana/dashboards/12026](https://grafana.com/grafana/dashboards/12026)


## Common Use Cases

We already learned about the following use cases from users:

* use immudb to immutably store every update to sensitive database fields (credit card or bank account data) of an existing application database
* store CI/CD recipes in immudb to protect build and deployment pipelines
* store public certificates in immudb
* use immudb as an additional hash storage for digital objects checksums
* store log streams (i. e. audit logs) tamperproof

[Opvizor](https://www.opvizor.com) — immutable log (syslog) solution for VMware vSphere

## API Documentation and how to use it

You can find the swagger schema for immudb here:

If you want to run the Swagger UI, simply run the following docker command after you cloned this repo:
    
~~~bash
docker run -d -it -p 8080:8080 --name swagger-immudb -v ${PWD}/pkg/api/schema/schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json swaggerapi/swagger-ui
~~~

or immugw:

some procedure, different schema:
    
~~~bash    
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/schema/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json swaggerapi/swagger-ui
~~~ 

## No programmer?

Actually in case you're not a programmer but still want to use immudb just to play around or within scripts, you can use immuclient.
    
~~~bash
# Linux
GOOS=linux GOARCH=amd64 make immuclient-static
# Microsoft Windows
GOOS=windows GOARCH=amd64 make immuclient-static
~~~

In case you have no idea how to build it, you can use the following Docker command and procedurel:
    
~~~bash
# Linux
docker run -it --rm -v $(pwd):/src golang:1.13-stretch sh -c 'cd /src && GOOS=linux GOARCH=amd64 make immuclient-static'
# Microsoft Windows
docker run -it --rm -v $(pwd):/src golang:1.13-stretch sh -c 'cd /src && GOOS=windows GOARCH=amd64 make immuclient-static'
~~~

Now you'll find the immuclient binary in the repository folder and ready to be used. 
    
~~~bash
./immuclient --help
~~~

 gives you details how to use it.

## Add a record to immudb
    
~~~bash    
# same system where immudb server is running
./immuclient safeset mykey myvalue
# immudb server runs on a remote system
./immuclient -a  safeset mykey myvalue
~~~

You'll receive something similar to:
    
~~~bash    
./immuclient safeset k1 v1
index: 307
key: k1
value: v1
hash: 4a6a18172eba5a3ea49a3caf147ac405c874ed4c922cc7dafe0dce5ff85f35aa
time: 2020–05–13 04:01:30 -0400 EDT
verified: true
~~~

## Get the record from immudb
    
~~~bash
# same system where immudb server is running
./immuclient safeget mykey
# get the value history
./immuclient history mykey
# immudb server runs on a remote system
./immuclient -a  safeget mykey
~~~

The 
    
    
    safeGet 

and 
    
    
    safeSet 

commands do a consistency check for the values as well.

Now you could store any kind of data, like the content of a sensitive database field, public certificate or a even a configuration file.

Let's try with a local Dockerfile and make sure there are not new lines or special characters in our value.
    
~~~bash
./immuclient safeset Dockerfile1 $(echo -n "$(cat Dockerfile)" | base64 -w 0)
~~~

To get the data back, you need to make sure to convert it again.

As the output of safeget contains more than just the value, as seen here:
    
~~~bash
./immuclient safeget Dockerfile1
index:          309
key:            Dockerfile1
value:          RlJPTSBnb2xhbmc6MS4xMy1zdHJldGNoIGFzIGJ1aWxkCldPUktESVIgL3NyYwpDT1BZIC4gLgpSVU4gR09PUz1saW51eCBHT0FSQ0g9YW1kNjQgbWFrZSBpbW11YWRtaW4tc3RhdGljCkZST00gdWJ1bnR1OjE4LjA0Ck1BSU5UQUlORVIgdkNoYWluLCBJbmMuICA8aW5mb0B2Y2hhaW4udXM+CgpDT1BZIC0tZnJvbT1idWlsZCAvc3JjL2ltbXVhZG1pbiAvdXNyL2xvY2FsL2Jpbi9pbW11YWRtaW4KCkFSRyBJTU1VX1VJRD0iMzMyMiIKQVJHIElNTVVfR0lEPSIzMzIyIgoKRU5WIElNTVVBRE1JTl9JTU1VREItQUREUkVTUz0iMTI3LjAuMC4xIiBcCiAgICBJTU1VQURNSU5fSU1NVURCLVBPUlQ9IjMzMjIiIFwKICAgIElNTVVEQl9NVExTPSJmYWxzZSIgCgpSVU4gYWRkZ3JvdXAgLS1zeXN0ZW0gLS1naWQgJElNTVVfR0lEIGltbXUgJiYgXAogICAgYWRkdXNlciAtLXN5c3RlbSAtLXVpZCAkSU1NVV9VSUQgLS1uby1jcmVhdGUtaG9tZSAtLWluZ3JvdXAgaW1tdSBpbW11ICYmIFwKICAgIGNobW9kICt4IC91c3IvbG9jYWwvYmluL2ltbXVhZG1pbgoKVVNFUiBpbW11CkVOVFJZUE9JTlQgWyIvdXNyL2xvY2FsL2Jpbi9pbW11YWRtaW4iXQ==
hash:           dfca217e2d87dccb8fd3fe8c1b49e620cc4ece8dc9c9fc2384cb6f6c9617eddb
time:           2020-05-13 05:19:19 -0400 EDT
verified:       true
~~~

the command is a bit more complex
    
~~~bash
./immuclient safeget Dockerfile1 | grep "^value" | cut -d":" -f2 | xargs echo -n | base64 -di
~~~

There will be easier options in the future for non developers and also SDK driver for .net, Java, Node.js, Python aso.  
