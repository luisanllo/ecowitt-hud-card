![Weather Station Card logo](https://cdn.jsdelivr.net/gh/luisanllo/ecowitt-hud-card@main/images/logo.svg)

# Weather Station Card (Ecowitt & more)

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/luisanllo/ecowitt-hud-card/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/luisanllo/ecowitt-hud-card)](https://github.com/luisanllo/ecowitt-hud-card/releases)

An instrument-panel Lovelace card for Home Assistant, built for Ecowitt
weather stations — and works with any station whose Home Assistant
integration exposes comparable sensors (temperature, wind, rain, UV...).
Temperature, wind, pressure, rain, and heat/UV risk indices in a single
readable panel — every value is tappable and opens Home Assistant's native
history dialog.

![Light mode preview](https://cdn.jsdelivr.net/gh/luisanllo/ecowitt-hud-card@main/images/preview-light.svg?v=4) ![Dark mode preview](https://cdn.jsdelivr.net/gh/luisanllo/ecowitt-hud-card@main/images/preview-dark.svg?v=4)

*Light and dark mode — follows your active Home Assistant theme automatically.*

## Features

- 🌡️ Current temperature, feels-like, and **last 24h high/low with the time each occurred**
- 📈 Temperature trend chart for the last few hours, with an optional humidity overlay (dual axis, customizable colors) and a hover tooltip showing time/temperature/humidity
- 🌅 Sun position bar (sunrise/sunset) with a live marker and countdown — can be hidden
- 🧭 Wind compass with speed, gust, and direction
- ☔ Rain block: peak intensity over a short recent window (avoids the "always reads 0" problem of spiky instantaneous rain-rate sensors), today's total (or a rolling window total for cumulative-counter sensors), and rain sensor status
- ⛈️ Optional lightning block: strike count, distance (with automatic "no detection" handling for sensors that report a fixed max-range value when idle), and time since the last strike
- ☀️ Optional solar radiation reading with an automatic color scale
- ⚠️ Automatic color scales for heat risk, WBGT, and UV index
- 👆 Every value opens Home Assistant's native history dialog when tapped
- 🎨 Visual editor — no YAML required
- 🌗 Follows Home Assistant's light/dark theme automatically
- 🌍 UI in English, Spanish, Polish, Czech, Russian, German, French, Portuguese, Italian, or Danish, auto-detected from your Home Assistant language

## Installation

### Via HACS (recommended)

1. HACS → **⋮** menu (top right) → **Custom repositories**
2. URL: `https://github.com/luisanllo/ecowitt-hud-card`, category **Dashboard**
3. Search for **"Weather Station Card"** (or "Ecowitt") in HACS → Download
4. Add the resource if HACS doesn't do it automatically:
   - URL: `/hacsfiles/ecowitt-hud-card/ecowitt-hud-card.js`
   - Type: JavaScript Module

### Manual

1. Download [`ecowitt-hud-card.js`](ecowitt-hud-card.js) to `config/www/`
2. Settings → Dashboards → **⋮** menu → Resources → add:
   - URL: `/local/ecowitt-hud-card.js`
   - Type: JavaScript Module

## Configuration

Add a card with `type: custom:ecowitt-hud-card`, either through the visual
editor or in YAML. Only `temperature` is required — every other field is
optional, and the card automatically hides whatever you don't fill in.

| Option | Required | Description |
|---|---|---|
| `temperature` | Yes | Current temperature sensor |
| `name` | No | Title shown on the card |
| `time_format` | No | `auto` (system default), `12`, or `24` — controls the clock format used for sunrise/sunset and high/low times (`auto` by default) |
| `apparent_temperature` | No | Feels-like temperature |
| `weather_condition` | No | Condition entity (text like `sunny`, `cloudy`...) |
| `battery` | No | Station battery level |
| `show_sun_bar` | No | Show the sun position bar (`true` by default) |
| `show_dusk_time` | No | Also show civil dusk time next to the "nightfall in" countdown (`false` by default) |
| `dew_point` | No | Dew point |
| `wind_chill` | No | Wind chill |
| `humidex` | No | Humidex |
| `heat_index` | No | Heat stress index (% or °, auto-detected) |
| `wbgt` | No | Wet bulb globe temperature (WBGT), e.g. from an Ecowitt WN38 — shown with a heat-stress risk level (experimental) |
| `humidity` | No | Relative humidity |
| `pressure` | No | Atmospheric pressure |
| `pressure_decimals` | No | Decimal places shown for pressure (0-2) — defaults to `2` when the sensor reports in inHg, `0` otherwise |
| `pressure_trend` | No | Pressure trend (rising/falling/steady) |
| `uv_index` | No | UV index |
| `illuminance` | No | Illuminance (lux) |
| `solar_radiation` | No | Solar radiation (W/m²) |
| `wind_speed` | No | Wind speed |
| `wind_gust` | No | Gust speed |
| `max_daily_gust` | No | Today's peak gust, shown alongside the current gust |
| `wind_direction` | No | Wind direction (degrees) |
| `rain_rate` | No | Rain intensity (mm/h) |
| `rain_rate_window_minutes` | No | Show the peak rain rate over the last N minutes instead of the instantaneous reading (`5` by default) — set to `0` for the raw instantaneous value |
| `separate_rain_rate_label` | No | When `rain_rate_window_minutes: 0`, show a "Rain rate" sub-label instead of the wet/dry status text (`false` by default) |
| `rain_today` | No | Today's accumulated rain (mm), or a cumulative counter if `rain_cumulative` is on |
| `rain_cumulative` | No | Set if `rain_today` is a counter that never resets (e.g. a Zigbee2MQTT lifetime `precipitation` total) — the card then shows the total rain within `rain_window_hours` instead of the raw value |
| `rain_window_hours` | No | Window size in hours used when `rain_cumulative` is on (`24` by default; ignored with `reset_daily`, which counts from midnight instead) |
| `moisture` | No | Rain/moisture sensor (binary_sensor or sensor) |
| `last_wet_timestamp` | No | Helper entity (e.g. `input_datetime`) holding when `moisture` last turned wet — shown as "Since HH:MM" under the moisture reading |
| `last_dry_timestamp` | No | Helper entity holding when `moisture` last turned dry — same as above, for the dry state |
| `show_trend` | No | Show the trend chart (`true` by default) |
| `trend_hours` | No | Hours of history in the chart (`6` by default) |
| `reset_daily` | No | Reset the 24h high/low, the trend chart, and the `rain_cumulative` rain total at midnight (local time), growing from empty through the day, instead of a rolling window (`false` by default) |
| `show_humidity_trend` | No | Overlay a humidity line on the trend chart (needs `humidity` set above) |
| `trend_chart_height` | No | Chart height in pixels (`48` by default) |
| `trend_temp_color` | No | Temperature line color — any CSS color (`green` by default) |
| `trend_humidity_color` | No | Humidity line color — any CSS color (`blue` by default) |
| `lightning_strikes` | No | Lightning strike count sensor |
| `lightning_distance` | No | Distance to the last detected strike |
| `last_lightning` | No | Timestamp sensor for the last detected strike (shown as a relative "X ago" time) |

### Example

```yaml
type: custom:ecowitt-hud-card
name: Weather Station
temperature: sensor.my_station_temperature
apparent_temperature: sensor.my_station_apparent_temperature
weather_condition: sensor.my_station_weather_condition
battery: sensor.my_station_battery
dew_point: sensor.my_station_dew_point
wind_chill: sensor.my_station_wind_chill
humidex: sensor.my_station_humidex
heat_index: sensor.my_station_heat_stress
humidity: sensor.my_station_humidity
pressure: sensor.my_station_pressure
pressure_trend: sensor.my_station_pressure_trend
uv_index: sensor.my_station_uv_index
illuminance: sensor.my_station_illuminance
wind_speed: sensor.my_station_wind_speed
wind_gust: sensor.my_station_gust_speed
wind_direction: sensor.my_station_wind_direction
rain_rate: sensor.my_station_rain_rate
rain_today: sensor.my_station_precipitation
moisture: binary_sensor.my_station_rain_status
```

## Technical notes

- The divider line below a section is hidden when nothing visible follows
  it, so turning off enough optional sections (e.g. `show_trend: false`
  and `show_sun_bar: false` with no wind/grid/rain fields configured)
  doesn't leave a trailing line with empty space under it.
- The trend chart and 24h high/low require `temperature` to have recorder
  history in Home Assistant.
- With `reset_daily` on, the 24h high/low, the trend chart, and the
  `rain_cumulative` rain total all use midnight-to-now (local time) as
  their window instead of a fixed rolling duration, so `trend_hours` and
  `rain_window_hours` are ignored. The trade-off: right after
  midnight there's very little data yet, since the window is genuinely
  starting from empty rather than always showing a full trailing window.
- A single implausible reading in the temperature or humidity history (a
  decode glitch that reads as 0, or some other garbage value, then
  recovers on the very next reading) is dropped instead of showing up as
  a spike in the trend chart or a bogus 24h high/low. Only an
  implausible *jump* is treated as suspect, never a specific value like
  0 — a real 0°C or a genuinely fast, sustained change are never
  affected. The plausible-jump threshold adapts to whether `temperature`
  reports in °C or °F.
- The temperature and humidity trend lines use fixed colors (green and
  blue by default, configurable with `trend_temp_color` /
  `trend_humidity_color`), and the top value on each axis carries a small
  🌡️/💧 marker as a second, color-independent cue.
- The sun bar uses Home Assistant's `sun.sun` entity; no extra configuration
  needed. Set `show_sun_bar: false` to hide it.
- `lightning_distance` treats a reading of exactly 40 km as "no detection"
  rather than showing "40.0 km" — some Ecowitt lightning sensors report
  that fixed value (their maximum detection range) when idle, instead of
  a real distance.
- `heat_index` is interpreted as a percentage risk score (0-100%) if the
  sensor's unit is `%` or the value falls in that range; otherwise it's
  treated as a degree-based index (°C or °F, per the sensor's unit).
- `wbgt` risk levels follow the US Army TB MED 507 heat categories
  (78 / 82 / 85 / 88 / 90 °F, converted for sensors that report in °C):
  below 78 °F is Low, then Moderate, High, Very high, Dangerous, and
  Extreme from 90 °F up. WBGT thresholds vary between standards and
  regions; this is one widely used reference, not the only one.
- To make the card bigger or smaller (e.g. on a wall tablet), use
  [card-mod](https://github.com/thomasloven/lovelace-card-mod) with
  `zoom` rather than `transform: scale()` — `zoom` scales the layout too,
  so the card grows in place instead of spilling over its neighbors:

  ```yaml
  card_mod:
    style: |
      ha-card {
        zoom: 1.5;
      }
  ```

  Values below 1 shrink it. To apply it only on touchscreen tablets, wrap
  the rule in `@media (pointer: coarse) and (min-width: 768px) { ... }`.
- `pressure` shows whole numbers by default (the usual convention for
  hPa/mbar), except when the sensor reports in inHg, where its whole
  typical range only spans ~28-31 and a whole number would hide almost
  all the meaningful variation — that case defaults to 2 decimal places
  instead. Set `pressure_decimals` to override either way.
- `rain_rate` shows the peak value seen in the last `rain_rate_window_minutes`
  (5 minutes by default), not the instantaneous state. Rain-rate sensors
  derived from a tipping-bucket gauge report a real value for a moment after
  each tip and settle back to 0 in between, so reading the live state at a
  random moment shows 0 far more often than not, even in a downpour —
  showing the recent peak is far more representative of "is it raining hard
  right now." Set `rain_rate_window_minutes: 0` to go back to the raw
  instantaneous value. This also requires `rain_rate` to have recorder
  history.
- With `rain_cumulative` on, the rain total is calculated from recorder
  history by summing only the positive increments seen within
  `rain_window_hours`, so a counter reset partway through the window
  (station reboot, etc.) doesn't produce a negative or bogus total. A
  single spurious reading that drops toward 0 and then resumes right
  where it left off — some Zigbee-connected stations do this briefly
  during a device re-announce — is told apart from a genuine reset and
  ignored, so it doesn't get double-counted as extra rain. This also
  requires `rain_today` to have recorder history.
- The humidity trend overlay uses its own independent vertical scale (shown
  on the right side of the chart) so it can be compared by shape against
  the temperature line (left side) even though the two have very
  different numeric ranges.
- The trend chart's two lines are green (temperature) and blue (humidity)
  by default — a fixed color each, not tied to the current reading.
  Earlier versions colored the temperature line by how hot or cold it
  currently was; that's gone now in favor of a color you can actually
  rely on being the same line every time. Set `trend_temp_color` /
  `trend_humidity_color` to use different colors.
- The card's language follows Home Assistant's configured UI language
  (`hass.locale.language`, with `hass.language` and the browser locale as
  fallbacks), normalized to its base subtag (e.g. `pl-PL` → `pl`).
  Currently supported: English, Spanish, Polish, Czech, Russian, German,
  French, Portuguese, Italian, and Danish. Unsupported languages fall back
  to English. A language change is picked up live, without needing to
  reload Home Assistant. German, French, Portuguese, Italian, and Danish
  are machine-translated and haven't been reviewed by a native speaker
  (unlike Spanish and the community-contributed Polish, Czech, and
  Russian translations) — corrections are very welcome via an issue or
  PR.
- Durations (trend chart header, high/low times, "X ago" lightning
  timestamps) use each language's own hour/minute/day abbreviations
  instead of a hardcoded "h".
- The wind direction's compass abbreviation (N, NNE, NE...) follows the
  card's language too, using each language's own cardinal-point initials
  where they differ from English (e.g. Spanish/French/Portuguese/Italian
  use O for Oeste/Ouest, German uses O for Ost, Danish uses Ø for Øst).
  Polish and Czech deliberately keep the international N/NNE/... form,
  since their native
  initials either clash with each other or with this scheme.

## Contributing

This is a personal project, but bug reports and suggestions are welcome —
open an [issue](https://github.com/luisanllo/ecowitt-hud-card/issues) or a
pull request.

### Credits

Contributions from [@ArekKubacki](https://github.com/ArekKubacki):

- Polish translation and a more general, extensible language-detection
  system ([#1](https://github.com/luisanllo/ecowitt-hud-card/issues/1)).
- Wind compass redesign: the direction arrow now sits near the rim,
  pointing back toward the center, instead of overlapping the center
  label ([#2](https://github.com/luisanllo/ecowitt-hud-card/issues/2)).

Contributions from [@tonyontheroad](https://github.com/tonyontheroad):

- Solar radiation reading, lightning tracking (strike count, distance,
  time since last strike), and a toggle to hide the sun position bar
  ([#5](https://github.com/luisanllo/ecowitt-hud-card/pull/5)).

Contributions from Jaroslav Hýsek:

- Czech translation.

Contributions from [@AndreiCh74](https://github.com/AndreiCh74):

- Russian translation and localized wind-compass abbreviations
  ([#8](https://github.com/luisanllo/ecowitt-hud-card/issues/8)).

Contributions from [@ohaue](https://github.com/ohaue):

- Danish compass and weather-condition translations, plus the idea for
  localized duration units ([#9](https://github.com/luisanllo/ecowitt-hud-card/issues/9)).
- Review and correction of several Danish strings
  ([#12](https://github.com/luisanllo/ecowitt-hud-card/pull/12)).
- Optional max daily gust, dusk time, separate rain-rate label, and
  persistent wet/dry timestamps via helper entities
  ([#13](https://github.com/luisanllo/ecowitt-hud-card/pull/13)).

## License

[MIT](LICENSE)
