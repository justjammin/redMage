# Review principles — YAGNI, KISS, DRY, SOLID

Four-lens review of a change. Apply to the target repository's actual language, platform and documented standards. Examples illustrate the original PHP context; never assume that stack.

## Output contract

One line per finding, nothing else:

```
P<0-3> <file>:L<line>: <tag> <what>. <replacement>.
```

Sort by severity descending, then by path. After the last finding, two lines:

```
net: -<N> lines possible.
stop: yes|no
```

If there is nothing to cut, the entire output is `Lean already. Ship.` followed by `stop: no`.
No prose between findings. No preamble, no summary paragraph.

## Tags

| Tag | Lens | Means |
|---|---|---|
| `delete:` | YAGNI | Dead code or unused flexibility. Nothing replaces it. |
| `stdlib:` | YAGNI | Hand-rolled thing the language's standard library already ships. Name the function. |
| `native:` | YAGNI | The installed framework or platform already does this. Name the feature. |
| `yagni:` | YAGNI | Abstraction with one implementation, config nobody sets, layer with one caller. |
| `shrink:` | KISS | Same logic, fewer lines. Show the shorter form. |
| `kiss:` | KISS | Needlessly clever or indirect flow. Show the direct one. |
| `dry:` | DRY | Three or more near-identical blocks. Name the shared form. |
| `srp:` | SOLID | One class doing several unrelated jobs; it changes for several reasons. |
| `ocp:` | SOLID | Adding a case requires editing existing code that keeps growing. |
| `lsp:` | SOLID | A subtype cannot stand in for its parent without breaking callers. |
| `isp:` | SOLID | Implementers are forced to satisfy methods they do not use. |
| `dip:` | SOLID | Concrete dependency constructed inline where the abstraction should be injected. |

## Precedence

Apply the lenses to each candidate finding in order: YAGNI → KISS → DRY → SOLID.
If YAGNI says delete or inline, stop there. Do not also flag a SOLID violation on
code you are recommending be removed.

**YAGNI beats SOLID by default.** An interface, abstract class, or DI contract earns
its place only if at least one of these holds:

- (a) Two or more real implementations exist today. Grep the repo and the container
  config to confirm — do not infer it from the diff.
- (b) It is a trust boundary: container wiring, an external API adapter, a lead,
  payment, or CRM integration, or anything that must be faked to give behavior tests a seam.
- (c) The seam is explicitly agreed in the SPEC's Testing Decisions. Cite the line.

Otherwise the finding is
`yagni: interface with one implementation. Inline until a second consumer exists.`
SOLID is a shape for variation that already exists, not variation you predict.

**DRY loses to KISS until the rule of three (or a stricter repository threshold).** The first and second occurrence stay
duplicated; only the third triggers `dry:`. A shared function that needs a mode flag
or an `if ($mode === …)` branch to serve callers that have genuinely diverged is fake
DRY: `kiss: premature merge, cases diverge, revert to two functions.`

## Never flag

- Input validation at trust boundaries — `$_POST`, `$_GET`, form handlers, webhooks.
- Security: nonces, `current_user_can()`, escaping, prepared statements.
- Accessibility basics.
- One smoke or happy-path test per new class.
- Anything the SPEC or the ticket explicitly requested.

## Severity and stop conditions

This review edits nothing. References to implementer fixes below describe subsequent controller-routed work. Correctness/security findings discovered incidentally are escalated to normal review with evidence, never ignored; they may set the P0 stop signal without expanding this into a correctness audit.


1. **P0** — security hole, data loss, trust-boundary bypass, or a previously passing
   test now failing. Emit `stop: yes` and halt the loop for a human.
2. **P1** — a SOLID or DRY violation where the second implementation is already
   present, or three or more duplications inside this change. Halt only if the fix
   requires a public API or contract change touching files outside the diff.
   Otherwise the implementer fixes it and the loop continues.
3. **P2** — `yagni:`, `kiss:`, or `shrink:` fixable by a mechanical single-file
   rewrite. Implementer fixes inline. No halt.
4. **P3** — debatable or borderline. No fix, no halt. File it as a follow-up beads
   task under the epic.

## Examples

`src/Payments/PaymentGatewayInterface.php:L1: yagni: interface with one implementation (StripeGateway). Inline into StripeGateway until a second gateway exists.`

`src/Support/Str.php:L44: stdlib: hand-rolled startsWith(). str_starts_with(), 1 line.`

`src/Container/ServiceLocator.php:L12: native: custom singleton wrapper around PHP-DI. Register the class in the container and inject it.`

`src/Inventory/VehicleQueries.php:L30: dry: 3x identical WP_Query args. One buildVehicleQueryArgs() taking the differing post_type.`

`src/Pricing/Format.php:L18: kiss: formatPrice($v, $mode) branches on $mode for two unrelated callers. Premature merge, cases diverge, revert to two functions.`

`src/Leads/LeadFormHandler.php:L60: srp: handle() validates, persists, emails, and posts to CRM. Split into a validator, a repository write, and two listeners on the lead-saved event.`

`src/Inventory/PriceStack.php:L88: ocp: switch ($vehicle->type) has grown in four consecutive PRs. Strategy map bound in the container, keyed by type.`

`src/Feeds/PartialFeedExporter.php:L22: lsp: export() throws on an inherited method it cannot honour. Drop the inheritance, compose the base exporter instead.`

`src/Export/Exportable.php:L1: isp: interface declares toCsv(), toPdf(), toXml(); only CSV is implemented anywhere. Narrow to CsvExportable.`

`src/Jobs/SyncTradeValuesJob.php:L41: dip: new AccuTradeApiClient() inside a container-managed job. Constructor-inject the client — external API, so the interface earns its place.`
