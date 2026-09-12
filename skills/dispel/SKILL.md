---
name: dispel
description: Use when reviewing a diff or directory for over-engineering, unnecessary abstractions, duplication or YAGNI, KISS, DRY and SOLID violations.
---

# 6. Dispel

Save this phase's record to `.mage/<slug>/REVIEW.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git. To resume legacy numbered records, require manual renaming and internal-link updates first; do not fall back, migrate automatically, or create duplicates.

Read [the principles reference](references/principles.md) once before starting if you
haven't already this run. It is the canonical source for tags, lens precedence, the
never-flag list, severity levels, ordering and stop conditions. The compact schema
and examples below illustrate that contract.

## Input

`$ARGUMENTS` selects the target:

- **empty** — the uncommitted working tree: `git diff`, `git diff --cached`, plus
  untracked files listed by `git status --porcelain` (read those whole).
- **a git ref or range** (`main..HEAD`, `abc123`) — `git diff <ref>`.
- **`--paths <dir> [<dir>…]`** — audit mode: scan whole files under those
  directories, not a diff. Used at epic end on the directories the epic touched.

## Method

1. Read the principles reference.
2. Collect the diff or file set for the mode above. Nothing resolves → say so and
   stop; never guess a ref.
3. For each hunk (audit mode: each file) walk the lenses in precedence order
   YAGNI → KISS → DRY → SOLID. Stop at the first lens that says delete or inline —
   do not stack a SOLID finding on code you want removed.
4. Before flagging any SOLID finding that would ADD an abstraction, grep the repo
   and container config to confirm the abstraction-earns-its-place criteria in
   principles.md. Unconfirmed → it is a `yagni:` finding instead.
5. Drop anything on the never-flag list.
6. Assign severity per principles.md.
7. Save the report to the phase record and emit the same report.

## Output

Emit only the report defined in principles.md: one line per finding, then the net estimate and stop signal.

```
P<0-3> <file>:L<line>: <tag> <what>. <replacement>.
net: -<N> lines possible.
stop: yes|no
```

Use the canonical ordering and stop rules for the selected mode. Save `REVIEW.md`, emit the report and stop; `stop: no` is not authorization to apply fixes or invoke another skill.

### Examples

```
P2 src/Payments/PaymentGatewayInterface.php:L1: yagni: interface with one implementation (StripeGateway). Inline into StripeGateway until a second gateway exists.
P2 src/Support/Str.php:L44: stdlib: hand-rolled startsWith(). str_starts_with(), 1 line.
P3 src/Inventory/VehicleQueries.php:L30: dry: 3x identical WP_Query args. One buildVehicleQueryArgs() taking the differing post_type.
net: -38 lines possible.
stop: no
```

```
Lean already. Ship.
stop: no
```

## Boundaries

- Correctness bugs, security holes, performance: out of scope — normal code review.
- One smoke test on a new class is never bloat.
- This writes only the phase report and its Git ignore entry if missing. It never edits reviewed source files or applies findings.
- This is the required complexity checkpoint for a fully reviewed change, not proof of correctness, security or implementation completion. Unresolved required findings still block completion.
