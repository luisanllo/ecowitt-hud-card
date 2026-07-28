# Changelog

All notable changes to this project are documented here.

## [1.2.1] - 2026-07-29

### Fixed
- README images (logo, light/dark previews) now use plain Markdown
  image syntax instead of raw HTML, since HACS's own README viewer
  doesn't render raw HTML tags.
- The MIT license badge linked to a relative path instead of an
  absolute URL, the same pattern that broke image rendering elsewhere
  in HACS's README viewer.
- Switched the logo and preview images to jsDelivr's GitHub CDN instead
  of raw.githubusercontent.com — HACS's README viewer rendered
  shields.io badges fine but not raw.githubusercontent.com images, even
  as plain Markdown. No functional changes to the card itself in this
  release.

## [1.2.0] - 2026-07-27

### Added
- Hovering the trend chart now shows a floating tooltip with the time,
  temperature, and humidity (when the overlay is on) at that point,
  plus a vertical guide line, instead of the chart being a static image.

### Fixed
- The temperature side of the trend chart's min/max labels now uses the
  same dynamic color as the temperature line itself (the humidity side
  already matched its line's blue). This got dropped when the min/max
  labels moved to side columns in 1.1.1 — the color match is what tells
  the two axes apart at a glance, together with the °/% suffix already
  shown on each number.

## [1.1.1] - 2026-07-27

### Changed
- The trend chart's min/max labels moved from a flat row below the chart
  to a column on each side (max at the top, min at the bottom), matching
  where those values actually sit on the line — the old layout put the
  temperature max and min side by side at the bottom regardless of shape.
- Freeing up that space also narrows the plotted area slightly, which
  combined with the taller default height below makes the line look
  less visually flattened.

### Added
- `trend_chart_height`: the trend chart's pixel height is now
  configurable (default raised from 32px to 48px, which was too short
  and made temperature/humidity swings look artificially flat).
- `time_format`: choose `auto` (system/language default, unchanged
  behavior), `12`, or `24` to control the clock format used for
  sunrise/sunset and high/low times.

## [1.1.0] - 2026-07-26

### Added
- `rain_cumulative` + `rain_window_hours`: for rain sensors that report a
  lifetime cumulative total instead of resetting daily (e.g. a
  Zigbee2MQTT `precipitation` sensor), the card now calculates the total
  rain within a configurable rolling window (default 24h) by summing
  only positive increments across the recorder history, so a counter
  reset mid-window doesn't produce a bogus total.
- `show_humidity_trend`: optionally overlay a humidity line on the
  temperature trend chart, each on its own independent vertical scale
  (temperature range on the left, humidity range on the right) so the
  two can be compared by shape.

## [1.0.2] - 2026-07-24

### Fixed
- The hero high/low temperature now covers a rolling last-24h window
  instead of "since local midnight", which used to collapse to
  essentially the current reading right after 00:00.

## [1.0.1] - 2026-07-24

### Fixed
- Main temperature now shows the bound entity's actual unit (°C or °F)
  instead of a hardcoded °C, which previously mislabeled readings for
  anyone using a Fahrenheit sensor or a Fahrenheit-configured Home
  Assistant instance.
- The card no longer tears down and rebuilds its entire DOM (and
  re-fetches temperature history) on every single config change. This
  caused visible flicker and unnecessary history API calls while typing
  in the visual editor's live preview; now only the bound values are
  refreshed unless a trend-relevant field (temperature entity, trend
  hours, show trend) actually changed.
- The card's optional `name` is now rendered via `textContent` instead
  of being interpolated into the card's HTML, closing a potential
  HTML/script injection path if a card configuration from an untrusted
  source were ever imported.

## [1.0.0] - 2026-07-23

Initial stable release.

### Added
- Main card with temperature, feels-like, condition, and dynamic weather icon.
- Today's high and low temperature with the time each occurred.
- Temperature trend chart (sparkline) for the last few hours, configurable.
- Sun position bar (sunrise/sunset) with a real-time marker and countdown,
  with correct day/night logic throughout the full day-night cycle.
- Wind compass with speed, gust, and direction.
- Data grid: humidity, dew point, wind chill, humidex, UV index, heat stress
  risk, pressure with trend, illuminance.
- Rain block: intensity, today's total, and rain sensor status.
- Every value is tappable and opens Home Assistant's native history dialog
  (`hass-more-info`).
- Full visual editor (no YAML required).
- Automatic light/dark theme support, following Home Assistant's theme.
- English/Spanish UI, auto-detected from Home Assistant's configured language.
- Dynamic color scales (UV, heat stress) based on risk level.
- Automatic interpretation of `heat_index` as a percentage or a degree-based
  index, depending on the sensor's reported unit.
- Entity pickers filtered by device class where it's safe to do so
  (temperature, humidity, battery, wind speed, precipitation, illuminance).
- Optional fields and entire sections (wind, rain, data grid) are hidden
  automatically when their entities aren't configured.
