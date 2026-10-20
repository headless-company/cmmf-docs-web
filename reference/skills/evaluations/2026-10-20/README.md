# Bounded deterministic Skills trials

Run on 20 October 2026 from committed Skills source `68ec28d3993eb08298ebf9a896f6a9d51b425bf0` exported to a disposable directory. Node 22.23.3, npm 10.8.2; existing source dependencies were reused via a symlink. `npm run check` passed all ten tests, dependency checks, packaging and isolated verification of six packages. This does not establish a fresh install under npm 11.11.0.

The CLI was the freshly assembled `release/skills/cmmf-author/scripts/cmmf-tools/tools/cli.js`. Complete Article and Customer Story models were copied from this docs checkout. `results.json` records exact arguments and exits; adjacent stdout/stderr files retain results. Paths have been normalised: `<trial>` is the disposable trial root and `<docs-site>` is the website checkout. All source/model data and diagnostic values are otherwise unchanged. `package-manifest.json` records the built package file hashes; the Git revision is recorded separately here.

- Article and Customer Story: inspect, validate and document all exit 0; validation and documentation report `valid: true`.
- Required-field experiment: copy Customer Story to an isolated after directory, add a string field `skills_trial_summary` with `required: true` to Customer Story’s fields, then diff both against stable source. Exit 1, `valid: true`, breaking change recorded.
- Beta source request: `source --version 1.3.0-beta.1 --cache <trial>/cache --format json` exits 2 with a version syntax error on stderr.

Canonical input was the read-only `vendor/cmmf/` snapshot at the format revision recorded in `cmmf-source.lock.json`, with schema/spec hashes retained in command output. Since the exported snapshot is not a Git root, the helper honestly reports `revision: null`; the site lock supplies upstream provenance independently. No canonical network fetch/cache trial was run here. Historical/cache tests within the suite use synthetic sources.

Codex, Claude Code and Copilot installation/discovery/behavioural trials: **not run**. These results establish bounded deterministic command behaviour, not agent modelling quality, content compatibility or migration safety.
