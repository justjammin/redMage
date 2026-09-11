---
name: weave
description: Use when an approved implementation plan is ready for execution with subagents and independent review.
---

# 5. Weave

Save this phase's record to `.mage/<slug>/5-weave.Md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git.

## Execution context

Read `.mage/<slug>/2-analyze.Md`, `.mage/<slug>/3-protect.Md` and the complete plan at `.mage/<slug>/4-chain.Md`. Check branch, dirty files and resume records before changes. Use an existing isolated worktree or create one on a task branch; preserve user changes. Never implement on main/master without explicit consent. Resolve gaps against the spec; return scope or consequential requirement changes to Scan/Protect. Subagents are required: if unavailable, report the blocked mode rather than silently executing inline.

Record base commit, worktree, slice status, completed commits, review evidence and verification results in the phase record. Mirror status in the project tracker if configured. Resume completed slices without rerunning them. Before dispatch, confirm dependency slices and exact interface versions. Default to sequential execution; parallelize only disjoint files with settled interfaces. Serialize Git commits in shared checkouts; use separate worktrees if parallel Git writes are needed.

## Worker contract

Pass absolute paths to the originating project's `.mage/` records; ignored files are not copied into new worktrees. Keep the controller's phase record there throughout execution.

Dispatch a fresh worker with this file and [implementation guidance](references/implementation.md), exact slice/plan/spec sections, acceptance criteria and NFRs, owned paths, consumed/produced signatures, dependency commits, test commands and agreed seams. Include: “You are not alone in this codebase. Preserve others' edits and accommodate their changes. Report necessary out-of-scope changes to the controller.”

Worker returns changed files, scoped commit, commands/results, requirement coverage and blockers. It may self-review but must not spawn duplicate reviewer chains. The controller retains integration, full-suite verification and independent review ownership.

## Review and integration

For each slice, dispatch an independent reviewer with the actual diff/base, brief, spec and repository standards. Read [review guidance](references/review.md). Keep Spec and Standards findings separate. Send demonstrated defects back to the worker; rerun covering tests and obtain scoped re-review. Cap correction loops at three rounds; unresolved acceptance failures remain blocked, not silently waived. Record remaining nonblocking findings explicitly.

Changed contracts require architecture/plan/brief updates before dependent slices start. Report concise progress after meaningful milestones: completed behavior, test evidence, next slice and required decisions. Do not repeatedly ask whether to continue authorized work.

After integrating all slices, run the applicable full suite once and required lint/build/type checks plus measurable NFR checks. After changes repeat affected checks as needed. Run a whole-change independent Spec/Standards review. Never claim production capacity or reliability from unit tests alone.

Then return to the main/controller session for [Dispel](../dispel/SKILL.md). Keep its review-only findings separate from correctness review. Do not mark required acceptance gaps complete. Complete the project branch workflow: report commits, artifacts, test evidence, residual findings and authorized push/merge state. Preserve worktrees and evidence until safely handed off; do not delete unrelated work.

