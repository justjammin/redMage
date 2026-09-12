---
name: chain
description: Use when a settled specification and architecture need an actionable implementation plan.
---

# 4. Chain

Save this phase's record to `.mage/<slug>/PLAN.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git. To resume legacy numbered records, require manual renaming and internal-link updates first; do not fall back, migrate automatically, or create duplicates.

Read `.mage/<slug>/SPEC.md` and `.mage/<slug>/DESIGN.md`. If either is missing or has unresolved blocking decisions, report the prerequisite and stop; do not use legacy numbered records or invoke another skill. Use the local planning contract below. The phase record is the implementation plan. Carry the spec, architecture and global constraints into the plan header. Map every accepted FR/NFR to at least one slice and a verification step.

A slice delivers independently testable behavior across the necessary layers. Fold scaffolding, migration and documentation into the behavior that needs them; do not split work into disconnected database/backend/UI chores. Each slice names:

- Slice ID, requirement IDs and complete acceptance criteria. Include a tracker ID only when an existing tracker supplies one.
- Exact owned create/modify/test paths and bounded responsibility.
- Prerequisite slices and exact consumed/produced interfaces.
- Concrete implementation steps, code, test cases, commands and expected results following the planning contract; pre-agreed TDD seams and justified exceptions.
- Relevant glossary/ADR/pattern decisions and global NFR constraints.
- Integration order and failure/rollback considerations where applicable.

## Planning contract

Header: Goal, Architecture, Tech Stack, Spec path/revision, Architecture path/revision and Global Constraints copied exactly. Identify [Weave](../weave/SKILL.md) as the executor for a separate invocation. Number tasks and steps starting at 1; one slice is one implementation task.

Before tasks, show the file map and responsibilities. Each task must be a behavior a reviewer can independently accept or reject; include its necessary scaffolding and docs. Give complete consumed/produced signatures, code for code steps, actual test cases, commands, expected outcomes and scoped commit instructions. Never write “TBD”, “add appropriate validation”, “similar to above”, or undefined interfaces. Do not require tests for trivial reversible prose edits.

At agreed seams, order steps: one failing behavior test, run and confirm relevant failure, minimal implementation, run and confirm success, then scoped commit. Make expected values independent of implementation. Keep each action small and concrete.

## Agent DAG and assignments

Include an embedded Mermaid DAG and assignment table in `PLAN.md`; use [the format and example](references/AGENT-DAG.md). Show each slice's worker and independent reviewer, controller-owned integration/verification, and an independent whole-change reviewer. Stable node IDs identify roles and slice IDs. The table records responsibility, owned paths or read-only review scope, prerequisites and required completion evidence. Distinguish the existing controller from spawned agents; state worker/reviewer assignment counts and planned peak subagent concurrency without inventing model assignments.

Edges mean successful prerequisite completion, including review acceptance before a dependent slice starts. Default to sequential execution. Show parallel branches only with disjoint owned files, settled interfaces and satisfied dependencies; serialize shared-file work and Git writes in shared checkouts. Host concurrency limits may serialize otherwise independent work without relaxing dependency gates.

Keep correction loops out of the DAG: initial review, then at most two correction/re-review rounds per slice. Each round includes covering tests and scoped independent re-review; stop early on acceptance. Required failures after round two remain blocked, with no automatic third round. Mark the stop after Weave and identify a separate, required Dispel invocation outside the DAG. Planning never dispatches execution agents.

## Completion check

Self-review every requirement's task/test coverage, placeholder gaps and cross-task signatures. Resolve shared-file ownership. Check node/table agreement, acyclicity, prerequisite review gates, reviewer independence, assignment counts and peak concurrency against the planned schedule. Ask about unresolved decisions and pause dependent work. Record slice status in the phase record; mirror it to a tracker only when explicitly configured. Link `PLAN.md`, report readiness or blockers, then stop. Do not start Weave or offer to auto-advance.
