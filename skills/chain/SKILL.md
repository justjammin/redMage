---
name: chain
description: Use when a settled specification and architecture need an actionable implementation plan.
---

# 4. Chain

Save this phase's record to `.mage/chain/<slug>.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git.

Use the local planning contract below. The phase record is the implementation plan. Carry the spec, architecture and global constraints into the plan header. Map every accepted FR/NFR to at least one slice and a verification step.

A slice delivers independently testable behavior across the necessary layers. Fold scaffolding, migration and documentation into the behavior that needs them; do not split work into disconnected database/backend/UI chores. Each slice names:

- Slice ID, tracker ID, requirement IDs and complete acceptance criteria.
- Exact owned create/modify/test paths and bounded responsibility.
- Prerequisite slices and exact consumed/produced interfaces.
- Concrete implementation steps, code, test cases, commands and expected results following the planning contract; pre-agreed TDD seams and justified exceptions.
- Relevant glossary/ADR/pattern decisions and global NFR constraints.
- Integration order and failure/rollback considerations where applicable.

Self-review coverage, signature consistency and missing details. Resolve shared-file ownership before dispatch. Do not ask for another execution-mode choice; proceed once the plan is actionable and within the settled scope.

## Planning contract

Header: Goal, Architecture, Tech Stack, Spec path/revision, Architecture path/revision and Global Constraints copied exactly. Direct workers to [Weave](../weave/SKILL.md). Number tasks and steps starting at 1.

Before tasks, show the file map and responsibilities. Each task must be a behavior a reviewer can independently accept or reject; include its necessary scaffolding and docs. Give complete consumed/produced signatures, code for code steps, actual test cases, commands, expected outcomes and scoped commit instructions. Never write “TBD”, “add appropriate validation”, “similar to above”, or undefined interfaces. Do not require tests for trivial reversible prose edits.

At agreed seams, order steps: one failing behavior test, run and confirm relevant failure, minimal implementation, run and confirm success, then scoped commit. Make expected values independent of implementation. Keep each action small and concrete.

Self-review every requirement's task/test coverage, placeholder gaps and cross-task signatures. Track status in the configured repository tracker; without one, record slice status in the phase record. Link the completed plan and proceed to Weave when within confirmed scope. Execution mode is already selected.

