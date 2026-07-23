# Changelog

All notable changes to this project are documented here.

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
