---
title: "immudb v1.9.6 Released: Enhanced Security and Performance"
date: 2025-03-31
excerpt: "The latest release of immudb introduces a host of improvements designed to enhance performance, expand SQL functionality, improve query handling, and increase compatibility with PostgreSQL. These"
tags: ["immudb", "release"]
image: "/blog/immudb-realease.png"
source: "https://immudb.io/blog/immudb-v1.9.6-released-enhanced-security-and-performance"
---
TL;DR

### What's New in immudb v1.9.6

1. Very significant performance improvement
2. SQL feature expansion
3. Query handling improvements
4. Enhanced PostgreSQL compatibility
5. Monitoring and metrics
6. Testing & maintenance

Read full [release notes](https://github.com/codenotary/immudb/releases/tag/v1.9.6)

![immudb-realease](/blog/immudb-realease.png)

## Immudb's Latest Release: Performance, Features, and Enhancements

The latest release of immudb introduces a host of improvements designed to enhance performance, expand SQL functionality, improve query handling, and increase compatibility with PostgreSQL. These changes make immudb more efficient, powerful, and user-friendly. Let's dive into the details of what's new and why it matters.

### Performance Boost

One of the most notable advancements in this release is a significant performance improvement. The optimization of the JOIN algorithm in the SQL layer ensures queries involving multiple tables execute much more efficiently. Additionally, refining the evaluation of the ORDER BY clause results in faster sorting operations.

Another major upgrade comes in the form of memory usage reduction, particularly for multi-database environments. This improvement allows users managing multiple databases within immudb to experience a much lower memory footprint, making large-scale deployments more sustainable and cost-effective.

### Expanded SQL Features

SQL functionality has been greatly expanded, providing more flexibility and expressive power to users. The latest release introduces:

- LEFT JOIN support, enabling richer query relationships across tables.
- CASE statements, allowing conditional logic directly within queries.
- SELECT FROM VALUES syntax, simplifying the creation of temporary datasets.
- Support for generic expressions in ORDER BY, giving users more control over query sorting.
- PRIMARY KEY constraints on individual columns, improving data integrity and structure enforcement.

These enhancements make immudb more aligned with traditional SQL databases, making it easier for developers to transition and implement complex queries.

### Query Handling Improvements

To ensure more accurate query execution, the latest update includes fixes to logical operator precedence, ensuring that queries execute in the expected order. Additionally, the introduction of constant selection queries enhances query performance and stability, making the database more reliable in executing straightforward selections.

### Improved PostgreSQL Compatibility

With this release, immudb takes another step forward in PostgreSQL compatibility by introducing support for core system catalog tables such as pg_class, pg_namespace, and pg_roles. This enhancement improves integration with Postgres clients and metadata management, making immudb an even more viable alternative for users already familiar with PostgreSQL.

### Better Monitoring and Metrics

Observability is crucial for maintaining a robust database system. The latest release includes new Prometheus metrics for tracking indexing performance and replication lag. These metrics empower administrators with better insights into database performance, enabling proactive monitoring and issue resolution.

### What This Means for Users

With these updates, immudb continues to evolve as a high-performance, feature-rich, and reliable immutable database. Whether you're leveraging immudb for its SQL capabilities, high efficiency, or PostgreSQL compatibility, this release brings significant improvements that enhance overall usability and scalability.

If you haven't yet, upgrade to the latest version and take advantage of these powerful new features today!
