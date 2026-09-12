---
name: weave
description: Use when an approved implementation plan is ready for execution with subagents and independent review.
---

# 5. Weave

Save this phase's record to `.mage/<slug>/RESULTS.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git. To resume legacy numbered records, require manual renaming and internal-link updates first; do not fall back, migrate automatically, or create duplicates.

## Execution context

Read `.mage/<slug>/SPEC.md`, `.mage/<slug>/DESIGN.md` and the complete plan at `.mage/<slug>/PLAN.md`, including its agent DAG and assignments. If prerequisites are missing or blocked, report them and stop; do not use legacy numbered records or invoke another skill. Check branch, dirty files and resume records before changes. Use an existing isolated worktree or create one on a task branch; preserve user changes. Never implement on main/master without explicit consent. Resolve gaps against the spec; ask about scope or consequential requirement changes and pause dependent work rather than restarting Scan/Protect. Subagents are required: if unavailable, report the blocked mode rather than silently executing inline.

Record base commit, worktree, slice status, completed commits, review attempts, unresolved findings and verification results in the phase record. Record actual agents against DAG node IDs and explain deviations from the planned schedule. Mirror status in the project tracker if configured. Resume completed slices without rerunning them. Before dispatch, confirm dependency slices, their review acceptance and exact interface versions. Follow the DAG; default to sequential execution and parallelize only disjoint files with settled interfaces. Host limits may reduce concurrency but never bypass dependencies. Serialize Git commits in shared checkouts; use separate worktrees if parallel Git writes are needed.

## Worker contract

Pass absolute paths to the originating project's `.mage/` records; ignored files are not copied into new worktrees. Keep the controller's phase record there throughout execution.

Dispatch a fresh worker with this file and [implementation guidance](references/implementation.md), exact slice/plan/spec sections, acceptance criteria and NFRs, owned paths, consumed/produced signatures, dependency commits, test commands and agreed seams. Include: “You are not alone in this codebase. Preserve others' edits and accommodate their changes. Report necessary out-of-scope changes to the controller.”

Worker returns changed files, scoped commit, commands/results, requirement coverage and blockers. It may self-review but must not spawn duplicate reviewer chains. The controller retains integration, full-suite verification and independent review ownership.

## Review and integration

For each slice, dispatch an independent reviewer with the actual diff/base, brief, spec and repository standards. Read [review guidance](references/review.md). Keep Spec and Standards findings separate. After initial review, allow at most two correction/re-review rounds per slice: send demonstrated defects back to the worker, rerun covering tests and obtain scoped independent re-review. Initial acceptance or acceptance after either round releases the gate. Required findings after round two remain blocked; do not start a third round automatically or dispatch dependent slices. Preserve the round count when resuming the same slice; a new invocation alone does not reset it. Record remaining nonblocking findings explicitly.

Changed contracts require architecture/plan/brief updates, including DAG dependencies and ownership, before dependent slices start. These updates do not authorize new scope or another skill invocation. Report concise progress after meaningful milestones: completed behavior, test evidence, next slice and required decisions. Do not repeatedly ask whether to continue authorized work within Weave.

After integrating all slices, run the applicable full suite once and required lint/build/type checks plus measurable NFR checks. After changes repeat affected checks as needed. Run a whole-change independent Spec/Standards review. Never claim production capacity or reliability from unit tests alone.

Save `RESULTS.md` with commits, artifacts, test evidence, residual findings and authorized branch/push/merge state, then stop. Report implementation complete only when its required checks and reviews pass; report complexity review pending. A separately requested [Dispel](../dispel/SKILL.md) review of the resulting change remains required before calling the whole change fully reviewed; do not invoke it automatically. Keep complexity findings separate from correctness review and do not mark required acceptance gaps complete. Preserve worktrees and evidence until safely handed off; do not delete unrelated work.
