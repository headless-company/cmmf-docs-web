# CMMF motion guidelines

Motion system 1.0, for identity v1.2. Use motion to introduce the identity once, then let it remain still. The character is quietly confident: a little lift, a clear order and an unhurried finish.

Open the [interactive motion studies](logo-intro.html) locally. Compare CMMF, Studio and Generator, the signature arrangements, headline and incidental sizes, and Ink/Paper backgrounds. Replay or scrub the entrance; the examples also respect the operating system's reduced-motion preference.

## The entrance

1. **Raise the unchanged symbol through a fixed window.** Start the whole mark below its final placement and translate it upward. A stationary mask at the final symbol bounds reveals it as it enters. Do not move the mask, edit vertices, scale, stretch or rotate the shape. The symbol path remains byte-for-byte identical to the master at every frame.
2. **Bring the base colour into the top-right colour.** Start the gradient translated `(-224, 224)` in the symbol’s local coordinates: the full shape samples the top-right stop colour. Move the gradient up-right along its existing 45-degree axis toward zero. The base stop enters progressively during the symbol and lettering sequence. Keep both colours and stops unchanged; settle just after the last lettering at the canonical `(24,232)` to `(232,24)` coordinates.
3. **Introduce CMMF after a breath.** Let the completed symbol rest for 120 ms at headline sizes, then fade the wordmark in with a small upward settling movement. Use a 900 ms rise and 1000 ms fade from 26 master units below, with a restrained 1.5% scale settle and no overshoot. The gradient continues drifting during the pause.
4. **Name the tool after a second breath.** Wait until CMMF has settled, then leave another 280 ms before Studio or Generator begins. Use a 850 ms rise and 950 ms fade from 22 master units below, with a 1% scale settle. The expanded core signature's full-name descriptor uses this third beat too, with a subtle 50 ms stagger between its four words.

At headline sizes, the symbol and lettering beats do not overlap. Each name has temporal room after the preceding part settles. Only the gradient connects the entire sequence. Reserve the full treatment for an intentional introduction.

## Timing and easing

Times are milliseconds from the start of the entrance. Each cell gives **delay / duration**. Lettering fades begin with the rise and continue 100–150 ms beyond it, so opacity builds throughout the motion.

| Phase | Headline | Incidental | Easing |
| --- | --- | --- | --- |
| Masked symbol rise | 0 / 1200 | 0 / 420 | `cubic-bezier(.4, 0, .2, 1)` |
| Gradient settle | 0 / 1320–3820 | 0 / 460–860 | `cubic-bezier(.35, 0, .65, 1)` |
| CMMF wordmark | 1320 / 900 rise; 1000 fade | 480 / 280 rise; 340 fade | `cubic-bezier(.35, 0, .65, 1)` |
| Tool name / full-name descriptor | 2600 / 850 rise; 950 fade | 480 / 280 rise; 340 fade | Same lettering curve |
| Lettering opacity | Through its lettering phase and settle | Through its lettering phase and settle | `cubic-bezier(.35, 0, .65, 1)` |

| Signature | Headline total | Incidental total |
| --- | --- | --- |
| Symbol only | 1320 ms | 460 ms |
| CMMF with symbol | 2440 ms | 860 ms |
| Tool signature | 3670 ms | 860 ms |
| Expanded-name signature | 3820 ms | 860 ms |

The rigid symbol rise accelerates softly and decelerates without bounce. Headline lettering and opacity use a slower, shared ease-in-out to make the upward travel visible; the gradient uses a broad ease-in-out over the entire sequence. Headline breathing intervals are 120 ms before CMMF and 280 ms before the tool; incidental lettering enters together 60 ms after the symbol. The gradient settles 120 ms after the last headline part, or 40 ms after an incidental part. A presentation cue or other entrance event starts this clock; there is no extra initial pause.

The mask remains fixed in the parent SVG coordinates. Only the whole symbol’s inner group translates. Start it one visible symbol height below its final placement, with a small safety margin; remove the temporary transform and clip when it finishes. Removing the clip preserves the master’s edge antialiasing in the final frame.

## Choose the scale by the role

**Headline:** covers, opening sequences, presentation reveals and prominent first introductions. Use the full timing above. CMMF rises 26 master units and scales from `0.985` to `1`; the tool or descriptor rises 22 and scales from `0.99` to `1`. The gradient starts translated `(-224, 224)` and settles to `(0, 0)` in the symbol's coordinate system.

**Incidental:** small first-use introductions in headers, compact placements and icons. Use the shorter timing. All lettering rises 3 master units together. Both remain at full scale to avoid unnecessary softness in small lettering. The gradient starts at `(-224, 224)` and settles to zero. At very small icon sizes, a static mark is usually preferable.

Travel is specified in the master SVG's coordinates, not fixed screen pixels. It scales with the placed asset. For example, the 26-unit headline rise becomes about 15 px in a 480 px-wide Studio horizontal signature. Preserve the SVG aspect ratio, final clear space and minimum sizes from the [logo rules](../guide/usage.md#logo).

Scale follows the placement's job, not a hard viewport breakpoint. A small-screen introduction may still be a headline, but the full-name signature must retain its 420 px minimum width. Use the ordinary core signature in tighter spaces. The sample disables the expanded-name arrangement in incidental mode and wherever its minimum width cannot fit.

## Signature variants

- **Symbol only:** masked rise and gradient settle; no invisible lettering delay. Use a static symbol for an already familiar interface icon.
- **Core horizontal:** symbol, then CMMF. The visible wordmark baseline and symbol size finish exactly at the master positions.
- **Tool horizontal:** symbol, CMMF, then tool name. Do not separate the tool name by a new gap, or animate individual letters.
- **Compact and stacked:** retain the same order; raise the same unchanged symbol through a fixed mask and let each text group settle in its supplied position. Stacked tool masters use three centred tiers: symbol, CMMF, then tool. Compact text fits within the symbol’s visible vertical bounds.
- **Expanded core:** symbol, CMMF, then the full-name descriptor. Preserve the descriptor on one line, with its four words starting 50 ms apart at headline sizes. Incidental text has no stagger.
- **Wordmark only or solid artwork:** use only the relevant lettering or masked-rise phase. Omit the gradient phase for solid artwork. These treatments require an appropriately grouped asset; the included runtime covers the gradient signature arrangements listed above.

## Repetition, access and restraint

Persistent headers should normally arrive already complete. Do not replay the identity on navigation, form updates, focus changes, scrolling or every slide. Never loop the entrance or pulse a resting logo. A deliberate presentation introduction or an explicit replay control can trigger it again.

For `prefers-reduced-motion: reduce`, show the final signature **immediately**, including when the preference changes during playback. No masked rise, gradient travel, translation, scaling or delayed lettering. Keep the static logo visible if JavaScript fails. Reserve its final dimensions before playback so surrounding content never shifts.

Keep essential content independent of animation. Avoid combining the signature entrance with several other moving elements. Do not animate the gradient colours, introduce extra stops, add shadows, or use elastic/spring curves. A soft pop is a very small settle, not a bounce.

## Implement and verify

The delivery kit includes [grouped SVGs](assets/), [the dependency-free runtime](motion.js) and [machine-readable motion tokens](motion-tokens.json). These assets retain the original outlined lettering and canonical symbol path. The contour never changes: only its containing group translates during the masked entrance, then returns to its original placement. Use an inline SVG, not an `<img>`, when animating its separate groups.

1. Copy the selected `motion/assets/` SVG and `motion/motion.js` into the consumer.
2. Inline the SVG in a container with reserved final dimensions. Load `motion.js` after it.
3. Mount it, then play only at the intended entry event:

```js
const svg = document.querySelector('#brand-signature svg');
const entrance = CMMFMotion.mount(svg, 'headline'); // or 'incidental'
entrance.play();
// When removing this component:
// entrance.dispose();
```

Mounting leaves the complete static signature visible. `play()` opts into the entrance; `seek(milliseconds)` supports a presentation cue or a review scrubber; `finish()` restores the canonical final state. `dispose()` cancels playback and removes the preference listener. Repeated mounts have separately namespaced IDs so their gradients and clips cannot interfere.

For video or presentation exports, reproduce the timing and easing table rather than substituting a stock entrance. End on the exact static master. For web integration, check both backgrounds, headline and small sizes, compact/stacked variants, the final frame, keyboard controls and reduced motion. Confirm there is no layout shift, flash of hidden lettering or ongoing movement after completion.
