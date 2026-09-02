---
title: "immudb — the open-source immutable database"
description: "immudb is a ledger database with built-in cryptographic proof and verification. Store data that can be added but never changed or deleted, at millions of transactions per second."
# The whole page is data, so the copy can be edited without touching
# layouts/index.html. Wording follows the live immudb.io; the assets are the
# ones already in static/, so nothing is fetched from the old CMS.
hero:
  pill: "Open source · Apache 2.0"
  headline: "The open-source"
  headline_accent: "immutable database."
  lede: "immudb is a database with built-in cryptographic proof and verification. It tracks changes to sensitive data, and the integrity of that history is verified by the clients — without having to trust the server."
  primary: { text: "Get started", url: "/docs/running/download/" }
  secondary: { text: "Read the docs", url: "/docs/" }

why:
  heading: "Why immudb?"
  lede: "immudb is a ledger database built for performance, scalability and versatility. Store records, text, images or JSON — a practical alternative to a blockchain or a hosted ledger service."
  items:
    - title: "Performance"
      body: "Lightweight and fast enough to keep up with billions of transactions a day, and millions of transactions per second on high-end hardware."
    - title: "Tamper protection"
      body: "Data can only be added, never changed or deleted, and every read can be answered with a cryptographic proof."
    - title: "Resilience"
      body: "Built to stay up for months at a time, with synchronous or asynchronous replication for high availability."
    - title: "Flexibility"
      body: "Insert with SQL or key/value. Connect over JDBC, ODBC, the PostgreSQL wire protocol, or an SDK for your language."
    - title: "Multi-platform"
      body: "Run it in the cloud or on-premises, embedded or standalone — Linux, macOS, Windows, FreeBSD and z/OS."

features:
  heading: "What it does"
  items:
    - icon: "immutable2.svg"
      title: "Immutable by construction"
      body: "History is preserved. You can add new versions of a record, but nothing rewrites or removes what came before, so a silent change is not possible."
      link: { text: "How immutability is ensured", url: "/docs/immudb/" }
    - icon: "auditable3.svg"
      title: "Consistency checking built in"
      body: "The server continuously checks disk and memory consistency, the gateway checks integrity, and the client verifies proofs of ownership on its own."
      link: { text: "Auditor", url: "/docs/production/auditor/" }
    - icon: "secure2.svg"
      title: "Verification without the cost"
      body: "Cryptographically coherent and verifiable, at a price that still allows millions of transactions per second — as a service or embedded as a library."
      link: { text: "Performance guide", url: "/docs/production/performance-guide/" }

usecases:
  heading: "What people build with it"
  items:
    - "Store every change to sensitive fields — bank balances, card transactions — beside an existing application database"
    - "Keep tamper-proof audit logs and log streams"
    - "Record CI/CD build and deployment provenance"
    - "Guarantee the integrity of invoices, contracts and other documents"
    - "Store public certificates and checksums"
    - "Keep IoT sensor readings as a failsafe against loss or alteration"

sdks:
  heading: "Connect from your language"
  lede: "Official SDKs, plus the PostgreSQL wire protocol and a REST gateway."
  items: ["Go", "Java", "Python", ".NET", "Node.js", "PostgreSQL wire", "REST"]
  link: { text: "All SDKs", url: "/docs/connecting/sdks/" }

usedby:
  heading: "Used by"
  logos:
    - { file: "codenotary.png", alt: "Codenotary" }
    - { file: "opvizor.png", alt: "Opvizor" }
    - { file: "tacapital.png", alt: "TA Capital" }
    - { file: "esoftthings.png", alt: "eSoftThings" }
    - { file: "greentube.svg", alt: "Greentube" }
    - { file: "tinaba.png", alt: "Tinaba" }
    - { file: "logo_naveum.svg", alt: "Naveum" }
    - { file: "logo_truecore.svg", alt: "Truecore" }
    - { file: "rs-logo.svg", alt: "RS" }
---
