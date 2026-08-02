# Media Carousel

**Script:** [Media Carousel (script)](../carousel.js) ·
**Flow:** [diagram](../__flow/carousel.md)

## Purpose

Drag/swipe/wheel interaction for the on-site installation-photo carousel:
mouse-drag, touch-drag, and mouse-wheel all translate the track horizontally,
with momentum on release and clamping so it cannot be dragged past either
end.

## Connections

### Uses

- `.carousel` / `.carousel-track` / `.carousel-item` — markup from
  [Carousel](../../../html/__about/carousel.md)

### Used by

- [Init](../../__about/init.md) — `carousel(version)` imports this module
  (self-registering; nothing is awaited or called on it)

## Exported Behavior

Nothing is exported — the module registers `mousedown`/`mousemove`/
`mouseup`/`mouseleave`, `touchstart`/`touchmove`/`touchend`, and `wheel`
listeners on `window`/`load`, entirely self-contained.

See [Media Carousel (flow)](../__flow/carousel.md) for the drag/momentum
state machine.
