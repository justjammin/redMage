# Correctness and standards review

Review a fixed base-to-result diff including relevant uncommitted changes. Read the referenced spec and repository standards first. Missing spec is a review limitation, not automatic success.

Report two independent axes:

- Spec: missing/partial requirements, wrong behavior, failure paths and unrequested scope. Cite the requirement and actual code evidence.
- Standards: concrete breaches of documented repository rules, correctness/security risks and maintainability issues grounded in the diff. Distinguish mandatory standards from reviewer judgment; skip findings already enforced by passing tools.

Every finding names severity, location, evidence, impact and smallest fix. Do not invent issues or allow one passing axis to hide another failing axis. Controller-arranged independent review follows worker self-review. Four-lens complexity review remains a separate Dispel pass.
