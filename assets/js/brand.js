/* High End & Smart Home Show brand constants, from the 2026 brand guideline. */

/* The guideline's accent red. It carries the date line here, the way the yellow
   and the green do on the other two builds. */
export const ACCENT = '#F11F32';
export const INK = '#232238';
export const WHITE = '#FFFFFF';

/* The guideline's off-white, used for supporting type so it sits a step below
   the pure white of the name. */
export const MUTED = '#A9A7C0';

/* Two faces, the pairing the client's own website uses: Questrial sets the
   display lines, Inter everything else. Both self-hosted so a canvas export can
   never race a font request — main.js waits on document.fonts before the first
   render.

   Questrial ships in a single weight, which is why it is only on the two lines
   that want size rather than weight. Everywhere a weight does the work — the
   role label, the date, the footer — Inter carries it. */
export const FONT = 'Inter,"Helvetica Neue",Helvetica,Arial,sans-serif';
export const DISPLAY_FONT = 'Questrial,Inter,"Helvetica Neue",Helvetica,Arial,sans-serif';

/* Questrial has one weight. Asking for 700 would have the browser synthesise a
   bold, which smears the geometry that makes the face worth using. */
export const DISPLAY_WEIGHT = 400;

export const TAU = Math.PI * 2;
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* measureText scales linearly with font size, and so does em-based tracking —
   so one measurement at a reference size gives the size that fits exactly. */
export function trackedWidth(ctx, text, size, weight, em, font = FONT) {
  ctx.font = `${weight} ${size}px ${font}`;
  const extra = size * em;
  let w = 0;
  for (let i = 0; i < text.length; i++) {
    w += ctx.measureText(text[i]).width;
    if (i < text.length - 1) w += extra;
  }
  return w;
}

export function fitSize(ctx, text, maxWidth, weight, em, cap = Infinity, font = FONT) {
  if (!text) return 0;
  const probe = 100;
  const w = trackedWidth(ctx, text, probe, weight, em, font);
  return Math.min(cap, w ? (probe * maxWidth) / w : cap);
}

/* Canvas has no letter-spacing in Safari, so tracking is drawn by hand.
   `align` is 'left' | 'center' | 'right' relative to `x`. */
export function drawTracked(ctx, text, x, y, size, weight, em, align = 'left', font = FONT) {
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const total = trackedWidth(ctx, text, size, weight, em, font);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  const extra = size * em;
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + extra;
  }
  return total;
}

/* Real cap height off the glyph box, not a guessed em fraction — a font swap
   shouldn't silently shift every baseline in the layout. */
export function capHeight(ctx, size, weight, font = FONT) {
  ctx.font = `${weight} ${size}px ${font}`;
  const m = ctx.measureText('H');
  return m.actualBoundingBoxAscent || size * 0.72;
}

/* Blend the two hex colours. Used to build the brand wash from whatever colour is
   neutral for the chosen blend mode, so `strength` means the same thing in each. */
export function mixHex(a, b, t) {
  const v = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [ar, ag, ab] = v(a);
  const [br, bg, bb] = v(b);
  const to = (x) => Math.round(x).toString(16).padStart(2, '0');
  return `#${to(ar + (br - ar) * t)}${to(ag + (bg - ag) * t)}${to(ab + (bb - ab) * t)}`;
}

/* Same tracked line, revealed one character at a time. Each glyph gets its own
   slice of `progress`, overlapping enough that the line reads as one gesture
   rather than a row of separate fades. */
export function drawTrackedReveal(ctx, text, x, y, size, weight, em, align, progress, from = 0, font = FONT) {
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const total = trackedWidth(ctx, text, size, weight, em, font);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  const extra = size * em;
  const chars = [...text];
  /* Only the tail from `from` animates — everything before it is already on the
     poster and must not flicker just because a later letter changed. */
  const moving = Math.max(1, chars.length - from);
  const span = 0.55;                       // how much of the window one glyph takes
  const step = moving > 1 ? (1 - span) / (moving - 1) : 0;
  const base = ctx.globalAlpha;

  chars.forEach((ch, i) => {
    let eased = 1;
    if (i >= from) {
      const p = Math.max(0, Math.min(1, (progress - (i - from) * step) / span));
      eased = 1 - Math.pow(1 - p, 3);
    }
    if (eased > 0) {
      ctx.globalAlpha = base * eased;
      ctx.fillText(ch, cx, y + (1 - eased) * size * 0.22);
    }
    cx += ctx.measureText(ch).width + extra;
  });
  ctx.globalAlpha = base;
}

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
