# CMMF identity rules

## Position and tone

CMMF is the shared foundation; Studio and Generator are tools in the ecosystem. Keep the brand precise, open and quietly confident. Explain what a tool does in direct language. Prefer usable examples over promotional claims.

The Headless Company can be credited in a footer or colophon if useful. That credit is separate from the logo.

## Logo

Preserve the six-vertex approved silhouette, including the one valley and rising diagonal. Do not introduce tool-specific cuts. Use supplied SVGs with their native aspect ratios. Do not distort, rotate, outline or add effects.

Clear space is at least one eighth of the visible symbol height around the visible artwork of the complete lockup. Add this in the placement layout: export canvases provide padding but do not encode the entire clear-space requirement.

| Arrangement | CMMF minimum width | Studio minimum width | Generator minimum width |
| --- | --- | --- | --- |
| Horizontal | 112 px | 220 px | 260 px |
| Compact | 112 px | 144 px | 170 px |
| Stacked | 96 px | 160 px | 190 px |

The symbol can be used at 16 px; prefer at least 24 px in an interface. For print, start with a visible symbol height of at least 5 mm and proof the full signature in context.

### Expanded name for first introductions

Use the core CMMF expanded signature when introducing the concept to a new audience. The line underneath reads **Content Model Master Format**, with the supplied spelling and capitalisation. It sits underneath the CMMF wordmark and uses Source Sans 3 Medium 500 at 25.5% of the parent nominal size. It is an explanatory name, not a tool descriptor or a narrative paragraph.

Use this version on an introductory presentation slide, a first-use overview or an explanatory cover. Use the usual core signature on later slides and familiar interfaces. Keep the expansion on one line, preserve the complete SVG proportions and use at least 420 px width digitally. On a 1920 px presentation canvas, start at 880 px width so the expansion remains legible from the room. Solid, light and dark variants follow the usual background rules. Do not add the core expansion to a Studio or Generator signature.

## Colour

| Identity | Gradient start | Gradient end | Tool text on Paper | Tool text on Ink |
| --- | --- | --- | --- | --- |
| CMMF | `#BA5579` | `#D07748` | Parent text uses Ink | Parent text uses white |
| Studio | `#8362B7` | `#C1639A` | `#945D9C` | `#AD76B3` |
| Generator | `#248C9F` | `#399B77` | `#2B7D77` | `#35978E` |

Paper is `#F6F7F3`; Ink is `#192329`. The gradient runs bottom-left to top-right in sRGB, with only two colour stops. In the source symbol coordinates, its axis runs `(24,232)` to `(232,24)`. A linear CSS equivalent is `linear-gradient(45deg, start, end)`.

Tool-name solid colours are related companion shades adjusted for readability. They should not be substituted for the gradient stops. The intended light and dark tool-name combinations exceed 4.5:1 contrast. Gradient marks are graphic identity assets; do not use gradients for body text or essential status information.

Use Paper/Ink for large surfaces and body text. Other backgrounds require contrast testing; choose a solid logo if a photograph or coloured surface makes the gradient hard to read.

## Typography: three families with distinct roles

The logo parent is **Reem Kufi Bold 700**, uppercase CMMF, tracking `0.009 em`. The tool name is **Quattrocento Bold 700**, nominal font size `0.8` times the parent, initial capital only. A horizontal tool-name gap is `0.24` parent em and both names share a baseline. In the compact signature, the tool baseline sits `0.66` parent em below the parent baseline. Use the supplied outlined masters for the signatures.

**Source Sans 3 is the default body and interface font. Quattrocento is the sustained-reading font.** Choose by the reader's task and the role of the component. Do not alternate faces solely for visual variety or switch at an arbitrary word count.

| Content role | Typeface and weight | Starting digital setting |
| --- | --- | --- |
| Navigation, buttons, forms, table values, application body copy | Source Sans 3 Regular 400 / Semibold 600 for emphasis | 16/24 px |
| Metadata, form labels, captions and short help | Source Sans 3 Regular 400 / Semibold 600 | 14/20 px |
| Functional heading | Source Sans 3 Semibold 600 | 22-28 px |
| Documentation article, editorial introduction, dedicated field-intent explanation | Quattrocento Regular 400 | 20/32 px, roughly 55-70 characters per line |
| Editorial section heading or prose emphasis | Quattrocento Bold 700 | 25-28 px for section headings |
| Selected large brand/opening heading | Reem Kufi Semibold 600 | 32-48 px and above |

These are starting settings; adapt to density, reading distance and responsive width. Keep text zoomable. A one-sentence hint below an input stays Source Sans 3. A dedicated panel explaining the content's purpose can use Quattrocento. Editing a purpose textarea remains an input task, so its font is Source Sans 3; a separately presented reading view of that explanation can use Quattrocento.

Use Ink/Paper for paragraph text. The tool-name companion shade marks identity and selected interactive states; it is not the body-text colour. Quattrocento has actual Regular and Bold, without a native italic in the supplied family. Use Bold or explicit language for editorial emphasis; never synthesise an italic. Source Sans 3 has native italics, including the supplied Regular Italic, when required by operational text.

Reem Kufi is not a body font. Keep it in signatures and selected large brand headings. Code and identifiers may use a conventional monospace utility font for exact structure; this does not introduce another narrative brand voice.

### Presentations, including CMSconf

Keep the same role distinction, but enlarge text for the room:

- Reem Kufi Semibold: short opening and section headings, 48-72 pt.
- Source Sans 3: teaching bullets, diagrams, data, captions and operational explanations. Start at 28-36 pt for body and 22-24 pt for essential supporting labels.
- Quattrocento: a short narrative statement, quotation or editorial opening at 32-44 pt. Move sustained prose into speaker notes or a handout rather than projecting a documentation paragraph.

Use the core CMMF signature when discussing the ecosystem and Studio when demonstrating the editor. Keep screenshots large enough to read, crop deliberately and simplify slide annotations. Use Ink/Paper for essential contrast; a warm gradient can provide one clear accent. Preserve an existing event/company frame where appropriate, with the CMMF signature placed independently. See `presentation-handoff.md` for practical slide and export rules.

## Supporting system

Use an 8 px spacing base, restrained 4-8 px panel radii and aligned columns. Give the rising diagonal one clear role at the composition edge. Keep it away from body copy. Avoid patterning an entire surface with repeated logos.

The supporting filled icons use a 24 px viewBox and `currentColor`. Use them at 24 or 48 px. They describe functions and never replace tool identity. Status also needs text or shape; colour alone is insufficient.

Motion introduces the identity once, then rests. Raise the unchanged symbol upward through a fixed masking window, then allow a breath before CMMF and another before the tool name. Headline lettering fades throughout its upward settle; expanded-name words start 50 ms apart. Incidental lettering enters together. The gradient starts down-left along its axis, entirely in the top-right colour, then moves up-right so the base colour enters. Headline entrances complete in 1320–3820 ms; incidental entrances in 460–860 ms. The symbol path never changes. No bounce, colour cycling or loop. Reduced motion shows the complete static signature immediately. See the [motion guidelines](motion.md) for timing, easing, variants and integration, and the [interactive studies](../motion/logo-intro.html) for examples.

## Extending the ecosystem

A new tool retains the exact contour, parent typography, serif name treatment and lockup rules. Choose a restrained two-stop pair that is distinct from the existing family. Derive companion solid colours and verify at least 4.5:1 contrast on Paper and Ink. Check the new name in both horizontal and compact arrangements; create a larger minimum width when its length requires it.

Stacked tool signatures place the symbol, CMMF and tool name in three centred tiers, aligned by visible ink bounds. Compact signatures use two left-aligned text lines beside the symbol, with the complete text block inside its visible vertical bounds.
