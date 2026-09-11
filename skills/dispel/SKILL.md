---
name: dispel
description: Use when reviewing a diff or directory for over-engineering, unnecessary abstractions, duplication or YAGNI, KISS, DRY and SOLID violations.
---

# 6. Dispel

Save this phase's record to `.mage/dispel/<slug>.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git.

Read [the principles reference](references/principles.md) once before starting if you
haven't already this run. It is the canonical source for tags, lens precedence, the
never-flag list, severity levels, and stop conditions. Do not restate it — apply it.

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

Exactly the contract in principles.md. One line per finding:

```
P<0-3> <file>:L<line>: <tag> <what>. <replacement>.
```

Sorted by severity descending, then by path. Then two lines:

```
net: -<N> lines possible.
stop: yes|no
```

`stop: yes` iff any P0, or any P1 whose fix crosses files outside the diff.
Nothing to cut → `Lean already. Ship.` then `stop: no`. No prose between findings,
no preamble, no summary paragraph.

Audit mode uses the identical line format; it differs only in ranking — biggest cut first, then severity, then path.

### Examples

```
P2 src/Support/Str.php:L44: stdlib: hand-rolled startsWith(). str_starts_with(), 1 line.
P2 src/Payments/PaymentGatewayInterface.php:L1: yagni: interface with one implementation (StripeGateway). Inline into StripeGateway until a second gateway exists.
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
