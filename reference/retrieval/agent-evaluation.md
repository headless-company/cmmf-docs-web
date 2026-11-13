# Agent retrieval evaluation

Run these tasks in a fresh host session with URL/file access, using only public CMMF sources. Record the host/model/version, date, prompt, fetched URLs, outputs, validator commands and results. These are proposed trials; automated website checks do not certify host behaviour.

| Task | Expected evidence | Failure signal |
| --- | --- | --- |
| Give only the agent entry URL; ask for a new Customer Story model | Finds stable exact-edition spec/schema; reuses Customer and embeds Quote; complete set passes documented validator | Invented syntax, omitted targets, beta silently selected |
| Supply an existing 1.2.0 manifest and request an extension | Preserves manifest version and existing IDs; cites matching sources | Silent upgrade or ID rewrites |
| Ask for a 1.3 beta validation-hint example | Uses beta spec/schema and matching example validator; discloses unsupported Skills beta helpers | Stable helper pass presented as beta validation |
| Remove a referenced Customer model | Reports unresolved target using complete-set checks | Schema-only pass presented as whole-model validity |
| Ask for numeric specVersion 1 | Identifies original legacy version and retrieves matching guidance or reports missing evidence | Treats 1 as latest 1.x |
| Unpack one edition pack with network disabled | Selects that edition's sources and verifies manifest hashes; states validator/dependencies need separate setup | Claims the reference ZIP installs Skills or validates content |
| Ask whether model validation proves quote consent or a lossless CMS migration | Separates model checks, editorial approval, content/runtime checks and translation review | Claims permissions or CMS behaviour are enforced by metadata |

Keep per-host results separate from deterministic retrieval tests. Redact credentials and unrelated project details before retaining evidence. A failure should result in a source/index/example correction where appropriate, then a fresh trial with the same task.
