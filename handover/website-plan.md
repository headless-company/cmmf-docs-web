> Exported handover context. For the current repository and implementation state, use [implementation-plan.md](implementation-plan.md) and [page-inventory.md](page-inventory.md).

# CMMF website plan

Prepared 14 October 2026. Updated for the separate-site-repository handover. Implementation and deployment have not started.

**1. Outcome and agreed direction**

Build the public home for CMMF at `https://cmmf.dev`: an explanation of the format and its purpose, a practical learning path, authoritative reference material, and a route into the wider tooling ecosystem. Host the existing Studio separately at `https://studio.cmmf.dev`.

The agreed audience is balanced, with a plain-language entry point. Content designers and architects should understand the modelling problem and see a concrete example before meeting formal syntax. Developers should be able to reach the specification, schema, examples, and tooling instructions directly.

The agreed operating model is Markdown and Git, deployed to Cloudflare Pages. Use British English in authored prose and preserve exact identifiers in examples.

Suggested opening description: “A portable format for content models and the intent behind them.” The central explanation is workshop intent → CMMF model → platform-specific implementation. Explain translation as an explicit interpretation process, including compromises and decisions.

**2. Recommended technical system**

| Area | Recommendation | Purpose |
| --- | --- | --- |
| Site framework | Astro with Starlight; static output | A content-focused site with established documentation navigation and room for a bespoke homepage. |
| Content | Markdown by default; MDX for selected interactive or composed pages | Most articles remain straightforward to edit and review in Git. |
| Presentation | Custom CSS variables, a small set of component overrides, local brand assets | Apply the CMMF identity to the whole experience. |
| Search | Starlight's Pagefind integration | Search the built site without operating a search service. |
| Code examples | Starlight's Expressive Code integration | Highlight YAML/JSON and provide useful copying and file labels. |
| Diagrams | Mermaid source rendered to SVG during the build, with textual descriptions | Keep diagrams editable in Git and usable without loading a diagram engine on every visit. |
| Hosting | Cloudflare Pages, connected to GitHub | Production deployments from the default branch and branch/PR previews. |
| Quality checks | GitHub Actions plus the same content/build checks in the Pages build | Reject broken links, invalid complete examples, and failed builds before production publication. |
| Studio | A separate Pages project using its existing React/Vite build | Independent deployments for documentation and the editor. |

Starlight supports Markdown/MDX content, Pagefind search, custom styles, component overrides, theme-aware logos, and documentation layouts. These are a base for a branded site rather than a requirement to retain its default visual treatment. [Starlight configuration](https://starlight.astro.build/reference/configuration/), [customisation](https://starlight.astro.build/guides/customization/).

Cloudflare documents Astro deployment and Git-based production/preview builds. Use static output; the proposed site does not require server rendering. The Pages Free plan currently allows 500 builds per month; this is a reasonable starting point for the proposed workflow. Review actual usage if the project grows. [Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

Expected initial ongoing website hosting cost: £0 within the free-plan limits, plus the domain renewal already purchased. Frameworks and local search add no subscription cost. Optional analytics or future services can be considered separately when there is a concrete need.

**3. Repository and content ownership**

Create a separate website repository, provisionally `cmmf-site`. Keep this repository focused on the format, schemas, translation contracts and reference examples. The website owns presentation, new learning content, navigation and deployment. Its proposed layout is:

```text
src/                  Astro layouts, components, styles and website-authored content
vendor/cmmf/          Read-only snapshot of canonical format material
brand/                Supplied SVGs, fonts, licences, tokens and guidelines
cmmf-source.lock.json  Exact upstream revision and file hashes
content-map.json      Source-to-route mapping and website metadata
handover/             Plan, decisions, audit and initial implementation brief
scripts/              Explicit source refresh and verification helpers
```

Include the current docs, spec, schema and examples as a pinned snapshot in the handover so the new project starts offline. Normal builds consume that snapshot and do not fetch a moving upstream branch. Explicit updates pin a new revision, verify its files, and arrive through a reviewable PR. The implementation spike will choose the smallest reliable Starlight content-loading approach. A build preparation step can add metadata and resolve website routes without putting website-specific frontmatter into normative specification files. Generated page inputs are ignored build products.

Each page has one authored source. New tutorials, expanded explanations and site-specific guides belong to the website. Initially render existing upstream docs from the snapshot, with source links to their pinned upstream revision. When an article is substantially adapted, make the website version its clear editorial owner and remove the duplicate imported route. Later, consider replacing superseded upstream learning docs with links to the site; do not remove them during this handover. Rewrite relative links for web routes at build time. Edit-page links target the website for site-authored pages and the upstream repository for normative/imported material. Read code examples from canonical files or named excerpts.

Copy the approved brand assets and record their source revision and exact working-tree hashes where the latest changes are uncommitted. The site must build without access to adjacent repositories. Future brand updates are explicit asset/token updates.

Tool documentation belongs with its tool's code. Initially, publish concise, reviewed Studio and Skills guides in this site, cite their source revisions, and link to the respective repositories for full development instructions. Do not maintain a second copy of each tool's entire README. Automated ingestion from pinned tool releases can follow when releases are established.

**4. Site structure and visitor journeys**

Header navigation: Learn, Documentation, Examples, Tools, GitHub, and a clearly visible Open Studio link. Search is available throughout the documentation. Formal specification links remain directly accessible.

| Area | Proposed routes | Content and visitor goal |
| --- | --- | --- |
| Home | `/` | Explain CMMF, show one progressing example, introduce the ecosystem, and offer Start learning / Open Studio / Read the spec. |
| Learn | `/learn/…` | What CMMF is, why it exists, where it fits, who uses it, and the boundary between a model and a CMS implementation. |
| Get started | `/docs/get-started/…` | Build a small model set, understand its manifest, validate it, and take it into Studio. Provide a visual route and a file-based route. |
| Concepts | `/docs/concepts/…` | Kinds, fields, embedding versus linking, lists and ownership, editorial intent, localisation, governance, and translation. |
| Guides | `/docs/guides/…` | Practical modelling decisions, rich text, validation errors, evolution, migration, and implementation handoff. |
| Reference | `/docs/reference/…` | Manifest/model/field properties, canonical types, relationship options, validations, and metadata. Separate structural rules from explanatory advice. |
| Examples | `/examples/…` | Annotated model sets with rationale, relationship diagrams, downloadable files, and relevant guides. |
| Tools | `/tools/…` | Studio, CMMF Skills, validation/documentation helpers, capabilities, installation/use, and release status. |
| Specification | `/spec/1.2.0/`, `/spec/1.1.0/` | Render the existing normative documents, with matching translation contracts, explicit versions, and raw downloads. |
| Project | `/changelog/`, `/contributing/` | Changes, compatibility, contribution guidance, licence information, and ways to report documentation problems. |

The first teaching example should be a Customer Story with a reusable Customer and an embedded structure, continuing the established CMMF teaching narrative. Explain the human content need, then the diagram, then selected YAML, then implementation considerations. Use the existing Article/Person/SEO examples as a second complete example set. Publish only example sets whose full files and references validate together.

The homepage should include:

1. A concise explanation with the full name introduced.
2. The recurring problem: modelling intent becomes entangled with a particular CMS.
3. A concrete model, shown visually and in a small amount of YAML.
4. What CMMF preserves: structure, relationships, editorial intent, and constraints.
5. Where translation decisions enter the process.
6. Clear routes into learning, documentation, Studio, and the skills/tools.

AI-assisted authoring is one useful route through the ecosystem. Introduce it after the format's purpose and modelling value are clear.

**5. Existing content audit and required additions**

This checkout has eight core explanatory articles plus an index, specifications and translation contracts for 1.1.0 and 1.2.0, a current 1.2.0 model schema, and a manifest with four example models. There is no website application or build system here yet.

Reuse the current material, with these changes:

| Material | Work required |
| --- | --- |
| Why CMMF | Adapt for a wider audience with a concrete before/after workflow and a concise explanation of intended use. |
| Repository structure | Add a user-project setup tutorial. Distinguish a user's model repository from this specification repository. |
| Kinds, canonical types and relationships | Retain the detail; add decision examples, diagrams, and cross-links to exact reference properties. |
| Validations | Explain format/schema validation, graph/semantic validation, and validation of actual content as different concerns. |
| Translation concepts and contracts | Give a worked decisions-log example. Identify implemented integrations separately from illustrative mappings. |
| Visualisation | Update language that describes the editor as future work; explain current Studio alongside generated diagrams. Board exports remain prospective where no implementation exists. |
| Specification and changelog | Publish explicit version routes and practical migration guides, including canonical `list` versus legacy `relation.cardinality`. |
| Examples | Provide download bundles and annotations; create and verify the shared Customer Story tutorial set. |

Priority new material for launch:

- A first-model tutorial with matching visual and YAML steps.
- A plain-language glossary: model, entry, component, object, reference, taxonomy, settings, manifest, translator, and intent.
- Choosing embedded objects versus references, with reuse and lifecycle tradeoffs.
- Rich-text capabilities, localisation/defaults, and editorial/governance metadata guides.
- An error guide with real invalid inputs and fixes.
- Studio basics: import, create/edit/connect models, validation, workspace saving, and CMMF export.
- Studio data behaviour: local browser storage, workspace JSON versus model YAML, and current import/export boundaries.
- CMMF Skills overview and development-release installation/use guidance.
- A migration guide and contribution guidance.

The skills repository currently describes a development release with host behavioural evaluation pending. Preserve that status and its evidence; website publication must not turn installation instructions into a claim of verified support in every host. Current Studio is a local single-user editor; describe its implemented capabilities accurately.

**6. Brand implementation**

Use identity v1.2 from the current branding workspace, especially its [usage rules](../brand/guide/usage.md), [tokens](../brand/tokens/cmmf.tokens.json), and [motion guidance](../brand/guide/motion.md).

- Paper `#F6F7F3` and Ink `#192329` form the surfaces and reading contrast.
- The CMMF rose/orange gradient `#BA5579` → `#D07748` supplies the parent identity. Studio purple/rose appears where Studio is being identified.
- Quattrocento Regular/Bold carries documentation prose and editorial explanation, initially around 20/32 px with a 55–70 character reading measure.
- Source Sans 3 carries navigation, search, labels, tables, short help, and operational headings.
- Reem Kufi is reserved for selected large introductory headings and the supplied logo artwork. Code uses a conventional monospace utility face.
- Self-host the required font files and licences. Use actual supplied weights; Quattrocento has no native italic, so avoid synthetic italic styling in reading articles.
- Use the approved light/dark outlined SVGs, preserving aspect ratio, clear space, and minimum size. The expanded signature needs 420 px minimum width: use a normal signature plus separately written full-name text on narrow screens.
- Use the 8 px spacing base, restrained panel corners, aligned columns, and occasional diagonal composition details away from reading text.
- Headers remain static. Any deliberate homepage identity entrance follows the supplied motion guidance and immediately resolves to a static signature for reduced motion.

The first visual review should show an actual homepage, a prose article, and a dense reference page in both themes and on mobile. These three templates reveal whether the brand works for explanation, sustained reading, and precise lookup.

**7. Launch features and later improvements**

Launch with:

- Responsive navigation and readable article layouts.
- Search, per-page contents, stable heading links, and previous/next links for tutorials.
- System-aware light/dark themes with a persistent choice.
- Copyable, labelled YAML/JSON examples and accessible relationship diagrams.
- Complete example downloads, schema downloads, and raw specification access.
- Visible format version/status, historical-spec notices, and a changelog.
- Edit-page/report-issue links that lead to the right source.
- Page descriptions, canonical URLs, sitemap, social previews, and a useful 404 page.
- A small `llms.txt` index and raw Markdown routes for agent retrieval; explicit versioned assets are the important compatibility contract.

After launch, consider:

1. Opening an example directly in Studio. This requires a deliberate import handoff in Studio; avoid inventing a link format before the editor supports it.
2. A small local validation playground using the canonical schema and identified semantic checks. Clearly label its validation scope.
3. Authored CMS mapping guides and an evidence-based integration matrix.
4. Expanded modelling recipes and additional full example sets.
5. Search/usefulness analytics if there are specific questions to answer.

**8. Versioning, releases and publishing**

Current tutorials and reference target 1.2.0. Mark that visibly. Historical specification pages are available through a version switch and carry a clear archived-version notice; they should not dominate default search results. A full historical copy of all learning content is unnecessary for the initial site because the checkout only contains current explanatory docs.

Serve the current schema at `/schemas/1.2.0/model.schema.json`, with an identified source revision. Publish a matching historical schema only after retrieving and verifying that version's source snapshot. Never label the current schema as 1.1.0 merely because a 1.1.0 spec exists. The same rule applies to downloadable examples and future versioned documentation bundles.

Workflow: edit source → open a PR → run checks and create a preview → review content/design → merge → run the production build checks → deploy. GitHub branch checks and the Pages build command must agree so a successful framework build cannot publish invalid example content.

Create two Pages projects: the new website repository's `dist/` output for `cmmf.dev`, and the Studio repository's `dist/` for `studio.cmmf.dev`. Configure `www.cmmf.dev` to redirect to the canonical apex. Preserve existing DNS records when establishing the Cloudflare zone. Cloudflare Pages requires Cloudflare nameservers for its apex custom domain. [Custom-domain requirements](https://developers.cloudflare.com/pages/configuration/custom-domains/).

**9. Delivery milestones and completion gates**

| Milestone | Concrete deliverable | Completion gate |
| --- | --- | --- |
| 1. Content and route foundation | Page inventory, route/source map, tutorial outline, initial version policy | All existing authoritative material has a destination; the teaching journey is coherent. |
| 2. Brand prototype | Running homepage, article and reference templates with real content | Review actual desktop/mobile layouts in both themes, including fonts, logo geometry and reading measure. |
| 3. Documentation system | Imported canonical docs/spec, search, examples, raw/versioned assets, previews and CI | Source mapping is correct; internal links and complete examples pass checks; edit links reach original files. |
| 4. Complete launch content | New tutorials, glossary, tool guides, migration/error guidance and current capability statements | A new reader can understand CMMF, make a model, validate it, and find the next tool without unanswered procedural steps. |
| 5. Production launch | Domain-bound site, separate Studio deployment where ready, deployment/contribution runbook | Verify HTTPS, redirects, production search, downloadable assets, mobile layouts, keyboard navigation, and main journeys on the real domains. |

Before launch, run a production build, internal-link/anchor checks, example-set validation, and targeted browser checks for search, menus, theme changes and downloads. Visually inspect homepage/article/reference templates across small and wide screens. Check keyboard focus, zoom, contrast and reduced motion. Verify diagrams also have understandable text and that snippets are distinguished from complete model files.

Content work is likely to be the largest part of delivery. The prototype should establish the writing and visual treatment early, before producing the full documentation set.

**10. Information still needed**

These are decisions for implementation or launch, not blockers to preparing the first local prototype:

- Is there a target launch date, particularly a deadline connected to the CMSConf talk?
- Which Cloudflare account should own the projects, and is `cmmf.dev` already using Cloudflare DNS? Confirm the registrar and any existing records before domain setup.
- Should the existing GitHub organisation own both deployments? This repository currently points to `headless-company/content-model-master-format`.
- Is Customer Story the preferred teaching example, or is another real scenario more useful? The plan assumes Customer Story plus the existing Article examples.
- Should the footer include a small “A Headless Company project” attribution? The brand allows a separate optional credit.
- Are there priority CMS targets for a later mapping guide? The plan assumes the core launch explains translation without claiming completed adapters.
- Who reviews modelling recommendations and examples before publication? The default is the user as the initial editorial reviewer.

Recommended next implementation step: milestones 1 and 2, ending with a working local prototype and a concrete page inventory for review.
