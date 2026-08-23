# Changelog

All notable changes to this project are documented here.

## [1.3.4] - 2026-08-23

### Fixed
- Pressure, rain rate, and today's rainfall now show the sensor's actual
  unit (e.g. `inHg`, `in/h`, `in` for US-imperial Ecowitt setups) instead
  of always assuming metric (`hPa`, `mm/h`, `mm`). Illuminance had the
  same issue and is fixed too. Temperature and wind speed were already
  unaffected, since they already read the unit from the entity. Reported
  by [@ssweeney85](https://github.com/ssweeney85)
  ([#3](https://github.com/luisanllo/ecowitt-hud-card/issues/3)).

## [1.3.3] - 2026-08-20

### Fixed
- Rain window ("today's total" in cumulative-counter mode) could get stuck
  showing no value indefinitely if `hass` wasn't available yet the first
  time the card built itself (a normal, common ordering in Home
  Assistant's card lifecycle). Every other history-based reading
  (trend chart, 24h high/low) already retried once `hass` arrived; the
  rain window now does too.

### Changed
- The trend chart, 24h high/low, and rain window each retry once, 15
  seconds later, if their first history fetch fails or comes back
  empty — instead of waiting for the full 10-minute refresh. This
  helps on dashboards with many cards, where a burst of simultaneous
  history requests at load time can make one of them time out.

## [1.3.2] - 2026-08-17

### Changed
- Wind compass: the direction arrow now sits near the rim of the
  compass, pointing back toward the center, instead of sitting in the
  middle where it could overlap the direction label. Contributed by
  [@ArekKubacki](https://github.com/ArekKubacki)
  ([#2](https://github.com/luisanllo/ecowitt-hud-card/issues/2)).

## [1.3.1] - 2026-08-15

### Added
- German (`de`), French (`fr`), Portuguese (`pt`), and Italian (`it`) UI
  translations. Unlike Spanish and the community-contributed Polish
  translation, these four are machine-translated and have not been
  reviewed by a native speaker — corrections are welcome via an issue
  or PR.

## [1.3.0] - 2026-08-15

### Added
- Polish (`pl`) UI translation, contributed by
  [@ArekKubacki](https://github.com/ArekKubacki)
  ([#1](https://github.com/luisanllo/ecowitt-hud-card/issues/1)).

### Changed
- `detectLang()` now extracts the base language subtag from
  `hass.locale.language` (falling back to `hass.language`, then the
  browser locale) — e.g. `pl-PL` or `pl_PL` both normalize to `pl` — and
  looks it up against the available translations, instead of a hardcoded
  check for Spanish. Adding a future language no longer requires
  touching this function.
- The card now also picks up a Home Assistant language change live
  (previously only the initial language was ever applied; changing it
  required reloading Home Assistant).

## [1.2.5] - 2026-07-29

### Added
- CI workflow (`.github/workflows/validate.yaml`) running the official
  `hacs/action` validation on every push/PR and daily, required before
  submitting the repository to the HACS default store.

## [1.2.4] - 2026-07-29

### Changed
- Renamed the card's display name (in HACS and Home Assistant's "Add
  card" picker) to "Weather Station Card (Ecowitt & more)", to reflect that
  it now works with any weather station whose Home Assistant integration
  exposes comparable sensors, not just Ecowitt — while keeping "Ecowitt"
  in the name so existing users can still find it.
- This is a display-name-only change: the custom element tag
  (`custom:ecowitt-hud-card`), the repository name, and the JS filename
  are all unchanged, so no existing YAML or installation breaks.

## [1.2.3] - 2026-07-29

Internal hardening pass following a third-party security review. No new
config fields; existing YAML keeps working unchanged.

### Fixed
- Entity IDs are now percent-encoded when built into `history/period`
  request URLs, so a value containing `&`/`=` (from hand-written YAML)
  can no longer inject extra query parameters.
- Overlapping history requests (e.g. rapidly changing the temperature
  entity in the editor) could previously let a slow, stale request
  overwrite a newer one's data once it resolved. Each history fetch is
  now tagged with a request token so only the latest one is applied.
- `trend_hours`, `rain_window_hours`, and `trend_chart_height` are now
  clamped to the same bounds the visual editor already enforces, so a
  hand-written YAML value outside that range can't produce a broken
  chart.

### Added
- The trend chart now shows "No recorder history available yet" instead
  of just disappearing when the configured entity has no history data.

### Changed
- Consolidated repeated magic numbers (chart dimensions, refresh
  intervals, default hours) and repeated color hex codes into named
  constants, for maintainability. No visual or behavioral change.

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
