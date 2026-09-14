/* Who you are at the show.

   The tour tools this was adapted from decide their variant from the hostname,
   because attendees and speakers get separate domains there. One domain here,
   four kinds of visitor — so it is a control on the page instead, and the table
   below is the only place the four differ.

   `eyebrow` is the small tracked line above the headline. Attendees do not get
   one: "attendee" is what a poster with no label already says, and printing it
   would make the other three read as corrections rather than distinctions. */

export const ROLES = [
  { id: 'attendee',  label: 'Attendee',  eyebrow: null,        slug: 'attendee' },
  { id: 'partner',   label: 'Partner',   eyebrow: 'PARTNER',   slug: 'partner' },
  { id: 'exhibitor', label: 'Exhibitor', eyebrow: 'EXHIBITOR', slug: 'exhibitor' },
  { id: 'speaker',   label: 'Speaker',   eyebrow: 'SPEAKER',   slug: 'speaker' },
];

/* Nothing is chosen to begin with. Picking who you are is the first move, the
   way picking a city is on the tour builds — everything downstream stays inert
   until it happens, so nobody fills in a name and only then discovers the
   poster was going to say something about them they had not chosen. */
export const NO_ROLE = '';
export const DEFAULT_ROLE = NO_ROLE;

export const roleById = (id) => ROLES.find((r) => r.id === id) || ROLES[0];

/* The headline set is the same for all four. The eyebrow already says which
   kind of visitor you are, and repeating it in the headline would leave the
   sentence saying it twice. */
const HEADLINES = ['I AM GOING', 'SEE YOU AT', 'MEET ME AT'];
const CHIPS = ['I am going', 'See you at', 'Meet me at'];

/* Read by main.js and the poster. Set by the picker; `?as=` seeds it so a
   link can arrive with the right one already chosen — which is how the show
   sends its exhibitor list somewhere different from its attendees. */
let current = DEFAULT_ROLE;

{
  /* `?as=`, not `?role=` — the latter is already the free-text "Role & company"
     line on the poster, and one link carrying both must not collide. */
  const q = new URLSearchParams(location.search);
  const asked = q.get('as') || q.get('variant');
  if (asked && ROLES.some((r) => r.id === asked)) current = asked;
}

export const variantName = () => current;
export const hasRole = () => current !== NO_ROLE;
export function setVariant(id) {
  current = ROLES.some((r) => r.id === id) ? id : NO_ROLE;
}

export const variant = () => {
  /* Before a choice, the poster wears the attendee's face: no label. It is the
     honest placeholder — the one role that prints nothing. */
  const r = current === NO_ROLE ? ROLES[0] : roleById(current);
  return {
    eyebrow: r.eyebrow,
    headlines: HEADLINES,
    chips: CHIPS,
    title: 'I am going | High End & Smart Home Show 2026',
    slug: r.slug,
  };
};
