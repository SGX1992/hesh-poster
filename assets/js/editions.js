/* One show, so this is a constant rather than a list. It is still the single
   source of truth: the poster headline, the date line, the background lookup
   and the export filename all read from it.

   The tour builds this was adapted from carry an EDITIONS array and a picker.
   Here there is nothing to pick, so the picker is gone from the page entirely
   and every field is live from the first paint.

   `poster` is what the poster prints large. `bg` is looked up by `id` in
   assets/img/bg/ — a missing file falls back to a tinted gradient drawn from
   `tint`, so the tool works before its photography does.

   `logo` is an optional mark for the top of the poster, above the headline —
   white on transparent, scaled to a fixed height. */
export const THE_EVENT = {
  id: 'hesh-2026',
  city: 'Dubai',
  poster: 'HESH 2026',
  /* 24 September is the trade-only B2B day, 25–26 general admission. The poster
     announces the whole show rather than one of its days. */
  date: '24–26 SEPTEMBER 2026',
  dated: true,
  tint: '#2A2440',
  venue: 'Radisson RED Dubai Silicon Oasis',
};

/* What the poster prints large. */
export const posterName = (e) => e?.poster || e?.city || '';
