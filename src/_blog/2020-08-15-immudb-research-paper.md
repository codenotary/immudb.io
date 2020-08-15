---
title: immudb research paper
image: /blog/research.jpg
excerpt: 
    Research paper on immudb, the lightweight, high-speed immutable database
date: 2020-08-15
tags: 
  - compliance
  - tamperproof
  - immutability
  - research
  - proof
author: Dennis
location: Switzerland
---

# Research paper on immudb, the lightweight, high-speed immutable database

We received many requests from customers, the community and consultants how immudb works and what makes it immutable and safe to use. Of course we took these requests very serious and started to write a research paper on immudb that clarifies and explains the architecture and the internals. 

**Abstract:**

immudb  is  a  lightweight  yet  highly  scalable  immutable database. Providing low-latency and high-throughput comparable to a raw key-value store but ensuring any tampering is not only properly identified but scoped. A well-defined update protocol between clients and server provides an on-demand tampering detection while built-incorruption and consistency checkers give rise to the first-ever proactive tampering awareness database. This document includes immudb architecture, a brief description of main components, an explanation of the protocol for ensuring immutability and future work.

You'll also learn about how immudb used the merkle tree to provide cryptographic proof.

![immudb cryptographic proof](/blog/proof.png)



## Where to download the document?

You can simply request the research paper as a pdf by email using the link on the front-page of immudb.io or directly here: https://immudb.io/?research-paper