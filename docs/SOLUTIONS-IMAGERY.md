# Solutions card imagery

Art direction and asset specification for the nineteen Solutions service
cards. Each service has one dedicated photorealistic image. Until a service's
image is supplied, its card falls back to a temporary SVG diagram.

## How to install an image

1. Export the image to the exact filename below.
2. Save it to `public/images/solutions/`.
3. Add one line to `SOLUTION_IMAGES` in `components/ui/cards.tsx`:

```ts
'carbon-accounting': `${BASE_PATH}/images/solutions/carbon-accounting.webp`,
```

That card switches from its diagram to the photograph. The other cards are
untouched. When all nineteen lines are present, delete
`components/solutions/visuals/`, the `SolutionVisual` import and the
`sv-` motion block in `app/globals.css`: the fallback has no remaining purpose.

## Technical specification

| | |
| --- | --- |
| Format | WebP, quality 82 to 88 |
| Dimensions | 1600 x 720 px |
| Aspect ratio | 20:9 (2.222:1) |
| File size | under 250 KB, ideally under 180 KB |
| Colour | sRGB |

The card slot is exactly 20:9, so an image supplied at that ratio is never
cropped on any screen. Supply a different ratio and it is centre cropped to
fit, so keep the subject away from the extreme edges if you do.

Images are decorative: they render with `alt=""` and are hidden from screen
readers, because the service title and summary already carry the meaning.
Never put information in an image that is not also in the text.

## The standard

Premium corporate documentary photography. Real environments, real equipment,
real working people. Every image must pass one test: **shown without its
title, could a sustainability professional identify what kind of work it
represents?** If not, change the scene, not the colour.

### Never

Floating icons, holograms, glowing data overlays, infographic arrows, fake
dashboards, giant globes, leaf motifs, dollar signs, handshakes, disaster
photography, futuristic eco-city renders, EU flags, obviously synthetic
faces, or unreadable fake text on screens.

### Avoid repetition across the set

No person appears in more than one image. No more than one scene centred on a
laptop. No more than one boardroom. Wind turbines appear in at most one image.
Ports appear in at most two, and must read differently in each.

### Colour

Carry the CER identity through architecture, materials, wardrobe, time of day
and grade. Do **not** tint the photographs green. Deep forest green, charcoal,
warm ivory and restrained champagne should come from the scene itself.

---

## Carbon & Climate

### `carbon-accounting.webp`
**Activity data becoming a defensible number.**
Inside an operating plant: a sustainability engineer in hi-vis and hard hat at
a fuel or steam metering skid, reading an inline flow meter and capturing the
value on a ruggedised tablet. Pipework and a boiler behind, shallow depth of
field, late afternoon light from a roof vent.
*Not an office desk. Not a spreadsheet on a monitor.*

### `ghg-inventory.webp`
**Many separate sources consolidated into one inventory.**
A plant control room at dusk. Two operators at a long console; wall mimic
panels show distinct process lines (boiler, compressors, kiln, effluent). One
cross references a printed source register against the panels. Cool screen
light against a warm desk lamp.
*Indoors and multi source, so it cannot be confused with carbon accounting.*

### `scope-1-2-3.webp`
**The organisation sitting inside a chain that extends far beyond it.**
Elevated or drone view at golden hour over an industrial estate: a
manufacturing plant mid frame, a substation and transmission line entering
from one side, container trucks on the access road, a port with stacked boxes
in the far distance. Long lens compression to hold it together.
*A real place, photographed. No overlays, no arrows.*

### `iso-14064.webp`
**A documented assertion examined by an independent party.**
A verification body assessor and a company engineer at a plant side table. A
bound GHG assertion open between them; the assessor points at a calculation
annex while the engineer produces a calibration certificate. Plant visible but
soft behind glass. Formal, two party, document centred.

### `decarbonisation.webp`
**Old and new plant running side by side.**
A working factory roof and yard where the transition is physically visible:
existing gas infrastructure in the foreground, a new rooftop PV array and a
battery container mid ground, an electric yard truck on charge. Overcast and
ordinary.
*Not a utopian render. Not a lone turbine.*

### `life-cycle-assessment.webp`
**One product across its material states.**
A materials laboratory bench: a single manufactured component (an extruded
aluminium part, a moulded polymer housing) laid out between its raw feedstock
on one side and a shredded recovered sample on the other. A technician with
calipers and a sample tray. Bright, clean, technical.
*No circular arrow graphics. Product scale, not factory scale.*

---

## ESG & Sustainability

### `esg-strategy.webp`
**Senior people deciding what the organisation will and will not do.**
A strategy room rather than a boardroom: three senior figures standing at a
long wall of pinned priority sheets and an operations map, one writing a
decision directly onto a sheet. Daylight, architectural, deliberate.
*No oval table. No open laptops.*

### `sustainability-reporting.webp`
**Source records becoming a published document.**
A reporting desk mid cycle: a sustainability manager marking up a printed
draft disclosure in pen, surrounded by labelled source folders (energy
invoices, HR records, meter logs), one screen showing a reconciliation.
Evening office, close focus.
*The artefact is a draft being checked against its sources.*

### `materiality-assessment.webp`
**Issues being ranked by people, against evidence.**
A facilitated workshop: eight participants around a large wall grid of movable
cards; one physically moves an issue card into a higher priority band while
someone from a different stakeholder group speaks. Natural room light, real
discussion.
*No digital dashboard. No two axis chart on a screen.*

### `esg-risk-management.webp`
**Climate exposure taking its place among all other enterprise risks.**
A risk function at work: a risk officer at an enterprise risk register showing
a heat grid covering every risk type, not only climate, annotating where a
climate exposure now ranks. Corporate, serious, slightly austere.
*Internal and office based. No physical hazards, no assets, nothing financial.*

### `esg-data-kpis.webp`
**Definition, ownership and traceability of a number.**
A data analyst at a two screen workstation, a printed metric definition beside
the keyboard, tracing one figure from a source system into a reporting
template. Over the shoulder, shallow focus. Screens read as structure, never
as legible invented data.
*Ordinary competent work. No glowing big data visuals.*

### `sustainable-procurement.webp`
**Requirements applied at the supplier, not written in a policy.**
A procurement lead on a supplier's factory floor beside the supplier's
manager, reviewing a materials specification against a pallet of incoming
components, assessment checklist in hand, racking and goods in behind.
*Not a warehouse alone. Not trucks alone.*

---

## Compliance & Standards

### `iso-advisory.webp`
**A management system checked against documented requirements, in place.**
An internal auditor walking a production line with a folder of controlled
procedures, checking a machine's calibration label against the work
instruction posted at the station. Factory floor, working light.
*Shop floor system audit, so it reads differently from the ISO 14064 card.*

### `cbam-readiness.webp`
**Carbon intensive production heading to export.**
An Asian steel or aluminium works with finished product, coils or billets,
being loaded into containers, and a container terminal with gantry cranes
beyond. Early morning haze, long lens so plant and port occupy one frame.
*Production and export together. No EU flag. No cargo ship on its own.*

### `assurance-readiness.webp`
**A reported figure traced back to its evidence.**
An assurance review table: a reviewer pulling a source document from an
evidence file and laying it beside a reported figure on a printed schedule,
sample selection sheet visible, tick marks in the margin. Tight, documentary,
faintly clinical.
*Desk based evidence sampling. No plant in shot.*

### `governance-controls.webp`
**Accountability and approval structures.**
A company secretary and a committee chair reviewing a board pack and a signed
delegation of authority schedule ahead of a meeting, the committee room
visible and still empty behind them. Formal, restrained.
*No handshake. No meeting in session.*

---

## Sustainable & Green Finance

### `green-finance.webp`
**Capital tied to a specific physical asset.**
Two finance professionals in a project finance discussion at the site of the
thing they are funding: a solar farm or grid scale battery visible through the
site office window, financing documents and a project drawing on the table.
*No dollar signs. No abstract money imagery.*

### `climate-risk.webp`
**Physical exposure of a real asset, being priced.**
Coastal or port infrastructure under a heavy sky with visible flood defences.
In the near foreground two professionals, one holding a tablet showing hazard
mapping, assessing the asset. The exposure and the people assessing it in one
frame.
*Not disaster photography. Outdoors and financial, so it cannot be confused
with ESG risk management.*

### `financed-emissions.webp`
**The link between a lending book and physical emissions.**
A portfolio analyst's desk inside a bank, a printed portfolio schedule listing
asset classes on the desk, and through the window behind it the real city:
commercial towers, a power station stack, moving traffic. The portfolio and
the assets it finances in a single shot.
*No trading floor cliché. On site project finance belongs to the green finance
card, not this one.*

---

## Later: motion

The card media slot is a fixed ratio box that its contents fill and crop to, so
a muted WebM loop can replace a still without the card changing shape. When
that point comes, each video needs a poster frame, lazy loading, pausing
outside the viewport, and must not play at all under
`prefers-reduced-motion: reduce`. Add motion only to the cards where it earns
its place.
