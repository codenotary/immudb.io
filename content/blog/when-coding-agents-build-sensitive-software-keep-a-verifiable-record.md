---
title: "When Coding Agents Build Sensitive Software, Keep a Verifiable Record"
date: 2026-10-20
description: "A code diff shows what changed, not the instructions, tool results and approvals that led to it. For software handling money or health data, capture the agent's execution trail and commit it to immudb as verifiable evidence."
excerpt: "A code diff shows what changed. It rarely shows every instruction, tool result, and approval that led to the change. For software that handles money or health data, that missing history matters."
tags: ["immudb", "coding-agents", "audit-log", "immutability", "compliance"]
keywords: ["coding agents", "AI agent audit trail", "immudb", "immutable database", "tamper-proof audit log", "verifiable evidence", "agent harness", "software supply chain"]
image: "/blog/agent-audit-trail-feature.png"
---
*A code diff shows what changed. It rarely shows every instruction, tool result, and approval that led to the change. For software that handles money or health data, that missing history matters.*

![Editorial illustration of agent actions becoming a verified record, without human or robot figures](/blog/agent-audit-trail-feature.png)

Imagine a payment service that begins routing a small class of transactions incorrectly. The deployed code can show the faulty rule. A Git commit can show when it appeared. But if a coding agent made the change, an investigator may also need to know what the agent was asked to do, which files and systems it touched, what its tools returned, and whether anyone approved the release.

Those details often live in the agent's execution log, outside the repository. If that log can be edited or discarded, it is a weak foundation for an investigation.

## The part Git does not record

Coding agents can do more than propose a patch. Depending on the permissions they receive, they can run shell commands, call services, change database records, and start deployments. Their execution environment—often called the *agent harness*—observes these steps and can record them as events.

That record should connect each consequential action to its context: the run and agent identity, the instruction or request, the tool invoked, the target, the result, and any required approval. Link the events to the resulting commit, build, and deployment IDs. An investigator can then follow a change from request to release rather than piecing together unrelated systems after the fact.

Preserve observable actions and the information available at the time. Those are the details an investigator can inspect and corroborate.

## Turn the execution trail into evidence

[immudb](https://immudb.io/) provides an append-only database with cryptographic verification. New records can be added, while earlier committed history remains available for verification. Its [verified read methods](https://immudb.io/docs/develop/reading/) return proofs that clients can check, and an [independent auditor](https://immudb.io/docs/production/auditor/) can check database consistency over time.

In an agent workflow, capture an event when an action occurs, commit it to immudb, then verify the stored history during routine checks or an investigation. The event can contain the relevant metadata and a digest of a larger artifact, with the artifact retained separately under appropriate controls. A digest is useful only if the original artifact is also preserved.

![Three-stage diagram showing capture of agent actions, commitment to immudb, and independent verification](/blog/agent-evidence-pipeline.png)

*A verifiable record begins at capture. immudb can help detect changes to stored history; it cannot supply an event that was never recorded.*

Suppose the payment incident is discovered six months later. A team can compare the deployed build with the recorded commit, inspect the agent's commands and tool results around the change, and check the approval event. It can then verify that the stored sequence has not been silently altered since it was committed. That is a much firmer basis for assigning cause and correcting the process.

## Preserve the whole chain

Cryptographic integrity has a clear boundary. It establishes confidence that a stored record has remained intact. It cannot establish whether capture was complete or whether a logged statement was true. To make the trail useful, organizations also need to:

- Collect events outside the agent's control, with authenticated identities and stable run IDs.
- Detect collection failures and gaps instead of quietly dropping events.
- Record approvals and deployment decisions as structured events.
- Limit access to sensitive prompts, outputs, and artifacts; apply retention rules before collecting unnecessary personal data.
- Verify the database state independently and retain the artifacts needed to interpret logged digests.

This is especially relevant to software used for banking, patient records, medical devices, and other systems where the history of a change can matter as much as the change itself.

As coding agents take on longer and more capable assignments, teams will need to answer a plain question months or years after a release: *What happened during this run, and can we trust the record?* With reliable capture and [verifiable history in immudb](https://immudb.io/docs/immudb/), they have a way to answer it.
