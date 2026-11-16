# Lovable task: make the chapel emblem the scroll-driven hero

Use the attached project as the source of truth and implement the work directly in the existing app.

## What to change

The home page currently opens with a conventional hero and places its scroll-linked emblem sequence farther down the page, after Services and Welcome. Move that existing image sequence into the opening hero so the first screen introduces the chapel through a cinematic, scroll-controlled emblem, like the product sequence in the attached Apple Watch reference video.

Keep the project’s existing React and TanStack Start setup. Do not convert it to Next.js. The 182 source frames are already bundled under `src/assets/logo/` as `ezgif-frame-001.jpg` through `ezgif-frame-182.jpg`; use the existing assets and their natural playback order instead of creating a new `/public/logo-frames/` directory or duplicating them.

## Visual and interaction goals

- Keep the current deep green-black page color visible around the emblem. The image sequence must not paint a large opaque square or polygon over the page.
- The frame backgrounds are part of the rendered JPEGs. Remove or blend that matte in a way that follows the emblem as it rotates. Do not apply one fixed shield-shaped clip to every frame: the emblem turns, so a stationary mask creates obvious clipping artifacts.
- Let the emblem occupy the right/central part of a full-bleed sticky hero stage. Keep the chapel name, short welcome copy, location, and visit action legible over a restrained dark gradient on the left. Use the existing type and gold/forest palette; keep supporting copy minimal.
- Scrub the sequence from the hero section’s own scroll progress so the emblem changes when scrolling down and reverses when scrolling up. Keep the sticky stage bounded to the hero; do not map the sequence to the entire document scroll.
- Add a small, refined scroll cue or brief story captions that track the sequence if they improve the experience. Keep the rest of the church site sections and their order intact after the hero.
- Make the layout work on phone and desktop. Keep text and controls clear of the emblem, nav, and screen edges.
- Respect `prefers-reduced-motion`: show a centered still emblem and let the page scroll normally without a long pinned sequence.

## Implementation constraints

- Keep the existing progressive frame loading, nearest-loaded-frame fallback, animation-frame scheduling, canvas resize handling, and device pixel ratio cap where practical. Do not block the hero until every frame has loaded.
- Preserve the current static emblem fallback for canvas or frame loading failures. Keep the frame sequence responsive and avoid needlessly processing frames on every scroll event.
- Follow the project’s `AGENTS.md`: keep public church facts in `src/lib/church.ts`, keep browser rendering client-only, use Lovable asset pointers for uploaded church media, and bundle native generated imagery.
- Keep accessibility intact: meaningful heading structure, reachable visit controls, and no motion-dependent text or actions.
- Avoid unrelated page redesigns, content rewrites, or changes to church facts.

## Verify before finishing

Run the project’s `npm test`, `npm run lint`, and `npm run build` commands. In a browser, inspect the hero at the start, middle, and end of its scroll range; confirm that the image changes smoothly in both directions, the page background remains visible around it, the text stays legible at desktop and mobile sizes, and no console errors or missing frames appear. Also confirm the reduced-motion view and that the next church section follows the hero normally.

Make the implementation changes, then summarize the files changed and the verification results.
