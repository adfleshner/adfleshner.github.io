# Design brief

Written before the redesign, following the workflow in
[LookLikeAiNoMore](https://github.com/adfleshner/LookLikeAiNoMore) (platform: website; industry: portfolio /
personal; style: editorial + minimal).

## References

Pulled from the catalog with `search.py --platform website --occupation portfolio --style editorial,minimal`:
Siteinspire, Minimal Gallery, Semplice Showcase (editorial portfolios), Typewolf / Fonts In Use (type pairing).
The moves borrowed are the common patterns of editorial portfolios, not any one site's layout: left-aligned text
on an asymmetric grid, work shown as a numbered list instead of a card grid, small mono labels for metadata,
real photography as the only image.

## Decisions

| | |
|---|---|
| Type | **Newsreader** (display serif, optical sizes) for headlines, **IBM Plex Sans** for text, **IBM Plex Mono** for labels, dates and data. No Inter. |
| Colour | Warm paper `#f6f5f1` / ink `#292524` in light, warm charcoal `#161513` in dark. One accent, pool blue `#0369a1` (dark: `#6cb8e0`). No gradients. |
| Layout | 12-column grid, content left-aligned, sections of different shapes. Hairline rules instead of cards. |
| Signature detail | Large serif headlines over small mono metadata, and real photos of Aaron in place of stock art (a portrait on the home page; the diving photos stay on About). |
| Motion | One idea: the hero photo is revealed with a slow top-down clip. Everything else is a gentle hover lift. Turned off under `prefers-reduced-motion`. |
| Copy | Specific facts from `src/data/*` (employers, apps, places). No "unlock", "seamless", "on your terms". |

## AI tells removed from the previous version

Navy-and-glow background canvas, gradient headline text and gradient buttons, glassmorphism cards, three-up
identical card grids, rows of pill badges, centred section headers with flanked eyebrows, the rotating
"focus" widget, vague taglines.

All design tokens live at the top of `src/assets/main.css`.
