# Pinned source workflow

Canonical repository: https://github.com/headless-company/content-model-master-format

Initial commit pin: `32604441aff09a6dbfe2361e97078af5263fd321`. Format version: `1.2.0`.

The pack includes complete canonical file bytes under `vendor/cmmf/`, including upstream licence and the two logo files required by its README. `cmmf-source.lock.json` records SHA-256 for every imported file. Keep the snapshot tracked so local and Cloudflare builds need no upstream fetch.

**Check the existing source without network**

```sh
node scripts/sync-cmmf.mjs --check
```

This checks the file set and every hash. It does not compile the website or semantically validate model content.

**Reconstruct the exact pin from a local canonical checkout**

```sh
node scripts/sync-cmmf.mjs --source /path/to/content-model-master-format
```

The helper reads Git objects at the pinned commit, not that checkout's potentially modified working files. With no `--source`, it fetches the pinned SHA from the recorded public repository. That remote path requires Git/network access; builds do not invoke it.

**Update deliberately**

Choose and inspect a full upstream commit SHA. Specify both that revision and its matching format version:

```sh
node scripts/sync-cmmf.mjs --source /path/to/content-model-master-format --revision FULL_40_CHARACTER_COMMIT_SHA --spec-version MATCHING_VERSION
```

Use actual values rather than the placeholders above. This stages the new snapshot, checks the schema/spec/example-manifest versions match, and updates the source lock. It refuses to overwrite locally edited snapshots. Review the source/lock diff, update route/content metadata, run example and site checks, then commit through a PR. The sync helper targets the canonical semver layout used by 1.2.0; do not use it to invent legacy formats or automatically reinterpret incompatible future schemas.

The snapshot may contain historical normative documents alongside the current schema. That does not make it a historical validation bundle. Create independently pinned historical snapshots if historical schemas are later required.

`source-provenance.json` is export-time context for brand/tool documents; it is not updated by canonical-source sync. Tool documentation and brand updates need their own reviewed provenance refresh. `SHA256SUMS` verifies the original handover; after intentional project edits, retain the source-only check for ongoing CI.

Content ingestion is an implementation task: `content-map.json` proposes destinations but does not yet rewrite links, add Starlight frontmatter or serve pages. Build those behaviours explicitly. Preserve exact raw schema/spec/example bytes for downloads and point source/edit links to their owning repo.
