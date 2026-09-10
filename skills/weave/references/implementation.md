# Worker implementation

Read the assigned slice and spec, repository instructions, glossary and relevant ADRs. Own only assigned paths. Use the pre-agreed highest useful public seam; ask the controller about missing seams instead of choosing internal implementation details.

Use one test → observed relevant failure → minimal implementation → observed success. Do not write all tests before all implementation. Expected values come from spec/worked examples, not recomputation of the algorithm. Mock external boundaries only when appropriate; avoid testing private methods, call choreography or mirror-image assertions. Typecheck and run focused tests regularly. Skip TDD for changes where behavior tests add no value and explain the exception.

Self-review both Spec and Standards using [review guidance](review.md). Remove accidental scope creep. Commit only assigned changes on the assigned branch when given the commit slot. Report commands and real results, not “should pass”. Leave repository-wide checks and independent reviewers to the controller.
