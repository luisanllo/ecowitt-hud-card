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

![Light mode preview](https://cdn.jsdelivr.net/gh/luisanllo/ecowitt-hud-card@main/images/preview-light.svg) ![Dark mode preview](https://cdn.jsdelivr.net/gh/luisanllo/ecowitt-hud-card@main/images/preview-dark.svg)

*Light and dark mode — follows your active Home Assistant theme automatically.*

## Features

- 🌡️ Current temperature, feels-like, and **last 24h high/low with the time each occurred**
- 📈 Temperature trend chart for the last few hours, with an optional humidity overlay (dual axis) and a hover tooltip showing time/temperature/humidity
- 🌅 Sun position bar (sunrise/sunset) with a live marker and countdown
- 🧭 Wind compass with speed, gust, and direction
- ☔ Rain block: intensity, today's total (or a rolling window total for cumulative-counter sensors), and rain sensor status
- ⚠️ Automatic color scales for heat risk and UV index
- 👆 Every value opens Home Assistant's native history dialog when tapped
- 🎨 Visual editor — no YAML required
- 🌗 Follows Home Assistant's light/dark theme automatically
- 🌍 UI in English, Spanish, or Polish, auto-detected from your Home Assistant language

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
| `dew_point` | No | Dew point |
| `wind_chill` | No | Wind chill |
| `humidex` | No | Humidex |
| `heat_index` | No | Heat stress index (% or °, auto-detected) |
| `humidity` | No | Relative humidity |
| `pressure` | No | Atmospheric pressure |
| `pressure_trend` | No | Pressure trend (rising/falling/steady) |
| `uv_index` | No | UV index |
| `illuminance` | No | Illuminance (lux) |
| `wind_speed` | No | Wind speed |
| `wind_gust` | No | Gust speed |
| `wind_direction` | No | Wind direction (degrees) |
| `rain_rate` | No | Rain intensity (mm/h) |
| `rain_today` | No | Today's accumulated rain (mm), or a cumulative counter if `rain_cumulative` is on |
| `rain_cumulative` | No | Set if `rain_today` is a counter that never resets (e.g. a Zigbee2MQTT lifetime `precipitation` total) — the card then shows the total rain within `rain_window_hours` instead of the raw value |
| `rain_window_hours` | No | Window size in hours used when `rain_cumulative` is on (`24` by default) |
| `moisture` | No | Rain/moisture sensor (binary_sensor or sensor) |
| `show_trend` | No | Show the trend chart (`true` by default) |
| `trend_hours` | No | Hours of history in the chart (`6` by default) |
| `show_humidity_trend` | No | Overlay a humidity line on the trend chart (needs `humidity` set above) |
| `trend_chart_height` | No | Chart height in pixels (`48` by default) |

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

- The trend chart and 24h high/low require `temperature` to have recorder
  history in Home Assistant.
- The sun bar uses Home Assistant's `sun.sun` entity; no extra configuration
  needed.
- `heat_index` is interpreted as a percentage risk score (0-100%) if the
  sensor's unit is `%` or the value falls in that range; otherwise it's
  treated as a degree-based index.
- With `rain_cumulative` on, the rain total is calculated from recorder
  history by summing only the positive increments seen within
  `rain_window_hours`, so a counter reset partway through the window
  (station reboot, etc.) doesn't produce a negative or bogus total. This
  also requires `rain_today` to have recorder history.
- The humidity trend overlay uses its own independent vertical scale (shown
  on the right side of the chart, in blue) so it can be compared by shape
  against the temperature line (left side) even though the two have very
  different numeric ranges.
- The card's language follows Home Assistant's configured UI language
  (`hass.locale.language`, with `hass.language` and the browser locale as
  fallbacks), normalized to its base subtag (e.g. `pl-PL` → `pl`).
  Currently supported: English, Spanish, and Polish. Unsupported languages
  fall back to English. A language change is picked up live, without
  needing to reload Home Assistant.

## Contributing

This is a personal project, but bug reports and suggestions are welcome —
open an [issue](https://github.com/luisanllo/ecowitt-hud-card/issues) or a
pull request.

### Credits

- Polish translation and a more general, extensible language-detection
  system, contributed by [@ArekKubacki](https://github.com/ArekKubacki)
  ([#1](https://github.com/luisanllo/ecowitt-hud-card/issues/1)).

## License

[MIT](LICENSE)
