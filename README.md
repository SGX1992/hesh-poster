# High End & Smart Home Show — poster tool

Makes the "I am going" post people share before HESH 2026: drop in a photo, type
a name, download a 1080 × 1350 PNG.

Live at **hesh.fastforward.global** — a neutral domain, so the client does not
have to touch DNS on highendshow.ae for it.

## One show, no picker

The tour tools this was adapted from (DDX, Footprint Intelligence) list several
events and lock every field until one is chosen. There is one show here, so
`assets/js/editions.js` exports a single `THE_EVENT` constant, the picker is
gone from the page, and every field is live from the first paint.

Change the date, the name on the poster or the tint in that one file and
nothing else needs touching.

## Running it

```bash
node serve.mjs      # http://localhost:8793
```

No build step, no dependencies. Static files and ES modules; the server exists
only because ES modules will not load over `file://`.

## Publishing

```bash
./deploy.sh
```

Force-pushes the mirror, creates the repository and the Pages site on first run,
turns on **Enforce HTTPS**, and stamps every module import with the commit so a
change is never half-cached in someone's browser.

## Brand

From the 2026 brand guideline:

| | |
|---|---|
| Ink | `#232238` |
| Accent | `#F11F32` |
| Off-white | `#F5F5F5` |
| Type | **Questrial** (display) + **Inter** (everything else) |

Questrial and Inter, self-hosted — the pairing the client's own website uses:
Questrial for headings, Inter for body. The brand guideline specifies **TT Firs
Neue** instead, and the client chose the website over the guideline. Its files
are still in `assets/fonts`; putting it back is the `@font-face` block in
`style.css` plus the two stacks in `brand.js`.

Questrial ships in one weight, which is why it only sets the two lines that want
size rather than weight — the headline and the name. Everywhere a weight does
the work, Inter carries it.

## Changing the pictures

Drop a portrait file into `assets/img/bg/` and name it in `manifest.json`.
Shoot or crop **1080 × 1350 or larger**; the poster darkens the lower half
heavily for the type, so the subject should sit in the top two thirds.

**Three of the current four are below that.** They were supplied at web size and
had to be scaled up to fill the canvas:

| file | source | upscale |
|---|---|---|
| `silicon-oasis.jpg` | 900 × 941 | 1.44× |
| `vinyl-market.jpg` | 600 × 900 | 1.80× |
| `silicon-oasis-2.jpg` | 1600 × 720 | 1.88× |

They hold up better than the numbers suggest, because the poster darkens and
tints everything heavily — but originals from the client's photographer would be
a visible improvement, and are a straight file swap.

Without any photograph the poster still works — it draws a tinted gradient with
a faint waveform across it, using the event's `tint`.

## Known gaps

- **The motion backgrounds are generic**, carried over from the other two
  tools: abstract light, particles and depth, none of them Dubai and none of
  them branded. Real footage from the show is a file drop plus a manifest line.
- **Not indexed**, by `robots.txt` and a `noindex` meta, so it does not compete
  with highendshow.ae in search.
- **One audience.** `assets/js/variant.js` still has the shape for more — an
  exhibitor or speaker build is a row there plus a second domain.
