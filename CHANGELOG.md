# Changelog

All notable changes to this project are documented here.

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
