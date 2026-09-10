---
name: rdm
description: "redMage: turn a feature idea into agreed functional and non-functional requirements, a spec, justified architecture and file shapes, then implement vertical slices with subagents and finish with a main-session complexity review. Invoke with /rdm."
---

# redMage

Invoke as `/rdm <feature or problem>` (or `$rdm` in skill selectors). Own the workflow from requirements to verified implementation. A request to create or edit this skill is not a request to execute its pipeline on an unrelated repository.

## Composition contract

Read each named skill when its phase begins; follow its linked references as needed. Resolve skills through the current catalog first, then the local locations below. Plugin version paths can change: discover the current installed version rather than hardcoding a stale cache path. If a required skill is unavailable, report the missing dependency and stop that phase; do not pretend to have run it.

- `grill-with-docs`, `grilling`, `domain-modeling`, `to-spec`, `implement`: `~/.agents/skills/<name>/SKILL.md`.
- `grunt`: `~/.codex/skills/grunt/SKILL.md`.
- `superpowers:writing-plans`, `superpowers:executing-plans`, `superpowers:subagent-driven-development`, `superpowers:using-git-worktrees`, `superpowers:finishing-a-development-branch`: installed Superpowers skills.
- `ponytail:ponytail-review`: installed Ponytail skill.

These redMage adaptations govern the composition:

- Use the interview and domain-documentation discipline of grill-with-docs, bounded by the requirements below. Do not ask already answered questions or enumerate hypothetical features indefinitely.
- Use to-spec for synthesis, not a second interview. Cover agreed scope thoroughly rather than inventing stories to make a long list. Keep exact file paths and implementation code in the architecture/implementation plan, not the product spec.
- `grunt --solo` means one skeptic, not a shell command or MAGI tribunal. Solo applies to architecture review only; execution still uses subagents.
- Use writing-plans' detailed tasks and executing-plans' critical preflight and verification. Its subagent handoff routes to subagent-driven-development. Execution is already selected: do not ask the inline-versus-subagent question again.
- Every implementation worker uses implement. Its code-review is a self-review; the controller arranges the independent task review. Do not create duplicate reviewer chains.
- Follow repository tracking rules. Where beads is required, task status lives in `bd`, not competing checkbox/todo ledgers. Plans may contain numbered steps; retain review evidence and resume pointers in issue notes.
- Publish a spec only to the configured tracker within existing authorization. When publishing is unavailable or not authorized, save the complete local spec and report the pending publication. Never guess a project or label or run unrelated setup automatically.

## 0. Check dependencies before interviewing

Read [dependency setup](references/dependency-setup.md) and run the bundled dependency checker. Resolve all required skills upfront, including implement's TDD/code-review dependencies and Superpowers' review helpers. Install missing skills using the documented source-aware method within existing authorization, then rerun the check. Report availability, installed dependencies and unresolved blockers before asking product questions. Read each actual skill at its phase; a successful file lookup is not proof of compatibility.

## 1. Orient and decide requirements

Identify the target repository and existing work. Read applicable AGENTS.md, persistent project knowledge, glossary, ADRs, relevant code and tests. Prefer available ctx tools: compose first, then architecture/callgraph for exact symbols and affected boundaries. If unavailable, use direct tools and state the limitation. Create or resume tracking using the repository's workflow.

Use grill-with-docs with domain-modeling. Research repository facts yourself; delegate bounded independent fact-finding when useful. Ask only decisions whose prerequisites are settled, give a recommendation and its tradeoff, and wait for answers that dependent work requires. Capture resolved terminology immediately; create ADRs only for consequential tradeoffs.

Build a prioritized requirements table:

- `FR-N`: actor, “user/client can…” behavior, benefit, priority, observable acceptance scenarios, and scope exclusions. Include relevant authorization, invalid input, empty state, failure and retry behavior.
- `NFR-N`: quality, affected operation, measurable target, operating conditions/load, verification method, and why the target matters. Label proposed targets as unconfirmed; never silently invent numbers.
- Record constraints, dependencies, assumptions, unresolved decisions and explicit non-goals separately.

Consider latency, capacity, consistency, availability, durability, recovery, security/privacy, accessibility, compatibility, operability and cost only where relevant. Resolve tradeoffs per operation; do not treat every system as distributed or every quality as mandatory. Estimate capacity only when it changes a design choice.

Discuss entities and invariants, external interfaces, the simplest end-to-end flow, then quality-driven refinements. The interview ends when in-scope requirements, important constraints and testing seams are settled and remaining unknowns are either nonblocking documented assumptions or explicit blockers. Present the concrete summary and test seams for confirmation, honoring confirmation already given. Explain that this is the shared-understanding checkpoint inherited from grill-with-docs and the test-seam checkpoint from to-spec.

Ground this phase in [Hello Interview's delivery framework](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery). The originally requested [course URL](https://www.hellointerview.com/learn/courses/system-design/lesson/orientation/delivery) may be unavailable; use the public framework and disclose that fallback. Adapt the prioritization and progression to real project work, not interview time limits or fixed requirement counts.

## 2. Synthesize the spec

Run to-spec against the settled conversation and repository evidence. Preserve its problem, solution, user stories, implementation decisions, testing decisions, out-of-scope and further-notes sections. Add explicit FR/NFR IDs and measurable acceptance criteria. Prefer existing high-level behavior seams; link relevant prior tests and domain decisions.

Save to the repository's spec location, default `docs/specs/<slug>.md`, and link the tracker issue when published. Record the version or commit reviewed downstream. Do not start a fresh interview here; route newly exposed substantive gaps back to phase 1.

## 3. Choose architecture and file shapes; challenge with grunt solo

Write `docs/specs/<slug>-architecture.md` unless project conventions specify another location. Describe the simplest design satisfying the spec before adding patterns. Include:

- Entities, state transitions/invariants, interfaces, storage and request/data flow as applicable.
- Proposed file tree with create/modify/existing markers and one responsibility per touched file. Follow existing conventions; group cohesive features and avoid unrelated restructuring.
- File shapes: public symbols/signatures, input/output/error types, dependency direction, ownership of state and side effects, and test seams. Use concrete typed skeletons when they clarify contracts; no speculative framework scaffolding.
- Requirement-to-design table: FR/NFR ID → implementing component/files → mechanism or pattern → acceptance/verification evidence.
- Pattern decisions: observed pressure, simplest alternative, Apply/Reject/Investigate, tradeoff, supporting evidence, and what would change the verdict. “No named pattern; direct function/module” is a valid choice.

Read the local [OOP design guide](references/oop-design.md) first for selection tables, tradeoffs and original examples. Use it to shortlist candidates, not to mandate patterns. Consult [Refactoring.Guru's catalog](https://refactoring.guru/design-patterns/catalog) and open the specific pattern pages relevant to actual pressures. Cite those pages beside decisions. Distinguish object-design patterns from architectural/operational mechanisms; queues, replication and deployment topology need appropriate primary sources and grunt catalogs. Never force one pattern per requirement or treat a catalog as evidence that a pattern is necessary.

Run grunt in REVIEW mode with solo judging against the saved spec and architecture fixed point. Use SELECT when comparing undecided candidates, then REVIEW the authored choice. Read the relevant grunt catalogs and judge protocol. Grunt reports findings without editing its review target; the controller applies justified revisions. Unresolved blockers prevent dependent planning. Keep unsupported choices as Investigate with an evidence-gathering action, not as approved architecture. Reconcile requirement changes with the spec and user decisions before continuing.

## 4. Plan vertical slices

Use superpowers:writing-plans. Save to its normal dated plan path unless the repository specifies another. Carry the spec, architecture and global constraints into the plan header. Map every accepted FR/NFR to at least one slice and a verification step.

A slice delivers independently testable behavior across the necessary layers. Fold scaffolding, migration and documentation into the behavior that needs them; do not split work into disconnected database/backend/UI chores. Each slice names:

- Slice ID, tracker ID, requirement IDs and complete acceptance criteria.
- Exact owned create/modify/test paths and bounded responsibility.
- Prerequisite slices and exact consumed/produced interfaces.
- Concrete implementation steps, code, test cases, commands and expected results following writing-plans; pre-agreed TDD seams and justified exceptions.
- Relevant glossary/ADR/pattern decisions and global NFR constraints.
- Integration order and failure/rollback considerations where applicable.

Self-review coverage, signature consistency and missing details. Resolve shared-file ownership before dispatch. Do not ask for another execution-mode choice; proceed once the plan is actionable and within the settled scope.

## 5. Execute with implementation subagents

Load executing-plans for preflight, then subagent-driven-development for orchestration. Create or verify an isolated worktree using its worktree skill. Read the spec and plan critically before edits. Record the base commit and existing changes. If subagents are unavailable, report that the requested execution mode is blocked; do not silently substitute inline execution.

Dispatch a fresh implementation subagent for each ready slice, with minimal context rather than inherited conversation history. Default to sequential slices. Parallelize only independent slices with disjoint files and settled interfaces; serialize commits in a shared checkout, or integrate separate worktrees in dependency order.

Each dispatch must contain the following concrete brief, with all fields resolved:

> Use the installed implement skill to implement slice [ID/title]. Read [skill path], [spec path and relevant sections], [architecture sections], and [exact plan task]. Your acceptance criteria are [full criteria including relevant NFRs]. Own only [paths/responsibility]. Consume [exact interfaces]; produce [exact interfaces]. Dependencies [IDs] are complete at [commits]. Use [agreed test seams, commands and expected results]. You are not alone in this codebase: preserve others' edits and accommodate their changes. Report needed out-of-scope edits to the controller. Run focused tests and typechecking regularly, self-review using code-review, then commit only your files on the assigned branch when the controller grants the commit slot. Return changed files, commit, test evidence, requirement coverage and unresolved issues. Do not run the repository-wide suite or spawn extra reviewers; the controller owns integrated verification and independent review.

Arrange independent spec-compliance and quality review per slice using subagent-driven-development. Fix demonstrated defects and verify those fixes before dependent work proceeds. Persist completed slice IDs, commits, findings and next ready slice in the project tracker so continuation never repeats finished work. A changed contract requires updating the architecture, plan and affected briefs first.

After integration, run the full applicable suite once, plus required build/lint/type checks and NFR verification. Repeat affected checks only after relevant changes. Do not report unmeasured production properties as proven by unit tests.

## 6. Finish in the main session

Perform the broad correctness review required by subagent-driven-development. Then, in the main/controller window, personally load and run ponytail:ponytail-review over the entire task diff from the recorded base to the final state, including any remaining uncommitted task changes. Do not delegate this final complexity review.

Preserve Ponytail's one-line findings and net-lines metric, or its “Lean already. Ship.” result. It is review-only: record findings, do not silently apply deletions. If fixes are subsequently authorized, implement and verify them, then refresh the review against the new diff. Complexity review cannot replace correctness or acceptance verification.

Complete the branch-finishing workflow within existing authorization. Report delivered requirements, verification results, remaining gaps, artifact paths and branch/commit state. Do not call the feature complete when required acceptance criteria or verification remain unresolved.
