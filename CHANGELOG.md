# Changelog

All notable changes to this project are documented here.

## [1.10.2] - 2026-10-01

### Fixed
- The options added in 1.10.0 (max daily gust, dusk time, rain-rate label,
  wet/dry timestamp helpers) were only translated into English and
  Danish; they're now translated into every supported language.
- The "show sun position bar" option was mistranslated in German,
  Portuguese, and Italian (it read as "sun visor" / "sunshade").
- `reset_daily` now also applies to the `rain_cumulative` rain total,
  which kept using the rolling `rain_window_hours` window even with the
  option on. With both enabled, the total now counts from local midnight.
- README: the trend color note and the preview images still reflected the
  pre-1.7.0 behavior (humidity line in purple instead of the current blue
  default).

## [1.10.1] - 2026-09-30

### Fixed
- The trend chart's hover line and tooltip were drawn in the wrong spot
  when the card was scaled with CSS `zoom` (e.g. via card_mod to make it
  bigger on a wall tablet) — at `zoom: 1.5`, hovering the middle of the
  chart drew them three-quarters of the way across. They now follow the
  pointer at any zoom level.

Found while looking into card scaling (#14).

## [1.10.0] - 2026-09-28

### Added
- `max_daily_gust`: today's peak gust, shown alongside the current gust
  reading.
- `show_dusk_time`: adds civil dusk time next to the "nightfall in"
  countdown on the sun bar.
- `separate_rain_rate_label`: shows a "Rain rate" sub-label instead of
  the wet/dry status text when the rain-rate stat is showing the raw
  instantaneous value (`rain_rate_window_minutes: 0`).
- `last_wet_timestamp` / `last_dry_timestamp`: optional helper entities
  (e.g. `input_datetime`) that let the moisture reading show "Since
  HH:MM" (or the day/date, if older) instead of only the current
  wet/dry state.

All four are opt-in and off by default — existing configs are
unaffected.

Contributed by [@ohaue](https://github.com/ohaue) (#13).

## [1.9.3] - 2026-09-27

### Fixed
- Corrected 8 Danish strings that read awkwardly or didn't quite match
  what they describe (e.g. "nightfall in" was more accurately "sunset
  in" for what the sun bar actually counts down to).

Reviewed and corrected by [@ohaue](https://github.com/ohaue) (#12).

## [1.9.2] - 2026-08-31

### Fixed
- With enough optional sections turned off (e.g. `show_trend: false` and
  `show_sun_bar: false` with no wind/grid/rain fields configured), the
  last remaining visible section kept its divider line, trailing into
  empty padding at the bottom of the card. Whichever section ends up
  last in the visible sequence no longer shows its own divider.

Reported by [@uetz0815](https://github.com/uetz0815) (#11).

## [1.9.1] - 2026-08-31

### Fixed
- Russian `humidex` label was a literal "humidity index" translation that
  didn't convey what the value actually represents. Changed to "Ощущается
  как (Humidex)" ("Feels like (Humidex)"). Reported by
  [@AndreiCh74](https://github.com/AndreiCh74) (#10).

## [1.9.0] - 2026-08-31

### Added
- Danish (`da`) UI translation.
- Durations (trend chart header, high/low times, "X ago" lightning
  timestamps) now use each language's own hour/minute/day abbreviations
  instead of a hardcoded "h" — e.g. Danish shows "2t 14min", Russian
  shows "2ч 14мин".

Danish compass and weather-condition translations, plus the localized
duration-units idea, contributed by
[@ohaue](https://github.com/ohaue) (#9).

## [1.8.0] - 2026-08-31

### Added
- `reset_daily` option: resets the 24h high/low and the trend chart at
  midnight (local time) instead of a rolling window, growing from empty
  through the day like the Ecowitt console or Wunderground do. Off by
  default — the rolling window stays the default behavior.
- Russian (`ru`) UI translation.
- The wind direction's compass abbreviation (N, NNE, NE...) now follows
  the card's language instead of always being in English. Spanish,
  French, Portuguese, Italian, German, and Russian each get their own
  cardinal-point initials; Polish and Czech keep the international
  N/NNE/... form (their native initials clash with each other or with
  this scheme).

Calendar-day reset requested by
[@ssweeney85](https://github.com/ssweeney85) (#7). Russian translation
and the compass-localization idea contributed by
[@AndreiCh74](https://github.com/AndreiCh74) (#8).

## [1.7.0] - 2026-08-25

### Changed
- The trend chart's temperature line is a fixed green by default instead
  of changing color based on how hot or cold the current reading is
  (blue/green/orange/red). The humidity line is a fixed blue by default,
  same as before.
- The dynamic hot/cold temperature-line coloring is removed entirely —
  the line is always one consistent color now.

### Added
- `trend_temp_color` and `trend_humidity_color` options to set either
  line to any CSS color.

## [1.6.0] - 2026-08-25

### Added
- `pressure_decimals` option to control how many decimal places the
  pressure reading shows (0-2). Defaults to 2 when the sensor reports
  in inHg (a whole number there hides almost all the meaningful
  variation, since typical readings only span ~28-31), 0 otherwise.

Reported by [@mikey68995](https://github.com/mikey68995)
([#6](https://github.com/luisanllo/ecowitt-hud-card/issues/6)).

## [1.5.2] - 2026-08-25

### Fixed
- The cumulative rain window total could be inflated when the sensor
  briefly reported a spurious 0 and then resumed from its real,
  unbroken value — some Zigbee-connected stations do this during a
  device re-announce. The recovery back up was being counted as extra
  rain on top of the real total. It's now told apart from a genuine
  counter reset (which still adds correctly) and ignored.

## [1.5.1] - 2026-08-25

### Added
- Czech (`cs`) UI translation, contributed by Jaroslav Hýsek.

## [1.5.0] - 2026-08-25

### Added
- Solar radiation reading (`solar_radiation`) with an automatic color
  scale.
- Lightning tracking: strike count, distance to the last strike (with
  automatic "no detection" handling for sensors that report a fixed
  max-range value like 40 km when idle, instead of a real distance),
  and a relative "X ago" time since the last strike.
- `show_sun_bar` option to hide the sun position bar.

Contributed by [@tonyontheroad](https://github.com/tonyontheroad)
([#5](https://github.com/luisanllo/ecowitt-hud-card/pull/5)).

## [1.4.2] - 2026-08-24

### Fixed
- The temperature outlier filter added in 1.4.1 used a threshold generous
  enough to sometimes miss a real glitch: a "collapse to 0" jump can be
  smaller than the threshold if the surrounding real temperature is
  already on the cool side (e.g. a dawn low). The threshold is now
  smaller and scales with the unit (°C vs °F).
- The humidity trend line could render in the exact same color as the
  temperature line, since temperature's color changes with how hot or
  cold the current reading is (and one of its states shared humidity's
  fixed color) — making the two indistinguishable whenever the
  temperature happened to be on the cool side. Humidity now always uses
  its own color, distinct from every state temperature's line can be in,
  and the top value on each axis also gets a small 🌡️/💧 marker as a
  second, color-independent way to tell them apart.

## [1.4.1] - 2026-08-24

### Fixed
- A single implausible reading in temperature or humidity history (e.g.
  a decode glitch that reads as 0, then recovers on the next reading)
  no longer shows up as a spike in the trend chart or as a bogus 24h
  high/low. Only an implausible jump from the surrounding readings is
  treated as suspect and dropped — never a specific value like 0, so a
  real 0°C or a genuinely fast, sustained change are never affected.

## [1.4.0] - 2026-08-24

### Added
- `rain_rate` now shows the peak value over a short recent window (5
  minutes by default, configurable via `rain_rate_window_minutes`,
  `0` for the old instantaneous behavior). Rain-rate sensors derived
  from a tipping-bucket gauge are spiky by nature — they report a real
  value for a moment after each tip and settle back to 0 in between —
  so the instantaneous reading showed 0 far more often than not, even
  during heavy rain. The rain icon/status still reflects the live
  instantaneous state, so it stops saying "raining" as soon as it
  actually does. The peak updates the instant a new reading arrives
  (same responsiveness as the rest of the card), not just on its
  periodic refresh.

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
