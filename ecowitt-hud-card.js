/* Ecowitt HUD Card — custom Lovelace card for Home Assistant
 * Instrument-panel style card for Ecowitt weather stations.
 *
 * Install via HACS (recommended):
 *   HACS -> three-dot menu -> Custom repositories -> add this repository
 *   with category "Dashboard", install, then add a card with
 *   type: custom:ecowitt-hud-card
 *
 * Manual install (alternative):
 *   copy this file to config/www/, add as a Lovelace resource:
 *     url: /local/ecowitt-hud-card.js
 *     type: module
 *
 * UI language follows Home Assistant's configured language automatically
 * (English by default, Spanish if hass.language / hass.locale.language
 * starts with "es"). No other languages are supported yet.
 */

const STRINGS = {
  en: {
    editor: {
      general: "General",
      thermalAir: "Thermal / air",
      wind: "Wind",
      rain: "Rain",
      trend: "Trend",
      name: "Name (optional)",
      temperature: "Temperature",
      apparentTemperature: "Feels-like temperature",
      weatherCondition: "General condition (weather entity or text sensor)",
      battery: "Station battery (optional)",
      dewPoint: "Dew point",
      windChill: "Wind chill",
      humidex: "Humidex",
      heatIndex: "Heat stress index",
      humidity: "Relative humidity",
      pressure: "Atmospheric pressure",
      pressureTrend: "Pressure trend (optional)",
      uvIndex: "UV index",
      illuminance: "Illuminance (lux)",
      windSpeed: "Wind speed",
      windGust: "Gust speed",
      windDirection: "Wind direction (degrees)",
      rainRate: "Rain rate (mm/h)",
      rainToday: "Today's rainfall (mm)",
      moisture: "Rain / moisture sensor (optional)",
      showTrend: "Show temperature trend chart",
      trendHours: "Hours of history to display",
    },
    conditions: {
      "clear-night": "Clear (night)",
      cloudy: "Cloudy",
      fog: "Fog",
      hail: "Hail",
      lightning: "Thunderstorm",
      "lightning-rainy": "Thunderstorm with rain",
      partlycloudy: "Partly cloudy",
      pouring: "Heavy rain",
      rainy: "Rainy",
      snowy: "Snowy",
      "snowy-rainy": "Sleet",
      sunny: "Sunny",
      windy: "Windy",
      "windy-variant": "Windy and cloudy",
      exceptional: "Exceptional conditions",
    },
    risk: { low: "Low", moderate: "Moderate", high: "High", veryHigh: "Very high", dangerous: "Dangerous", extreme: "Extreme" },
    labels: {
      battery: "Station battery",
      trend: "Temperature trend",
      humidity: "Humidity",
      dewPoint: "Dew point",
      windChill: "Wind chill",
      humidex: "Humidex",
      uvIndex: "UV index",
      heatRisk: "Heat risk",
      pressure: "Pressure hPa",
      illuminance: "Illuminance lux",
      rainToday: "Today's total",
      rainSensor: "Rain sensor",
      noRain: "No rain",
      raining: "Raining",
      feelsLike: "Feels like",
      windFrom: "Wind from",
      gust: "Gust",
      nightfallIn: "Nightfall in",
      sunriseIn: "Sunrise in",
      lessThanMin: "less than 1 min",
      min: "min",
      dash: "—",
    },
  },
  es: {
    editor: {
      general: "General",
      thermalAir: "Térmico / aire",
      wind: "Viento",
      rain: "Lluvia",
      trend: "Tendencia",
      name: "Nombre (opcional)",
      temperature: "Temperatura",
      apparentTemperature: "Sensación térmica",
      weatherCondition: "Condición general (weather o sensor texto)",
      battery: "Batería estación (opcional)",
      dewPoint: "Punto de rocío",
      windChill: "Sensación de viento",
      humidex: "Humidex",
      heatIndex: "Índice de estrés por calor",
      humidity: "Humedad relativa",
      pressure: "Presión atmosférica",
      pressureTrend: "Tendencia de presión (opcional)",
      uvIndex: "Índice UV",
      illuminance: "Iluminancia (lux)",
      windSpeed: "Velocidad del viento",
      windGust: "Velocidad de racha",
      windDirection: "Dirección del viento (grados)",
      rainRate: "Intensidad de lluvia (mm/h)",
      rainToday: "Lluvia acumulada hoy (mm)",
      moisture: "Estado de lluvia / humedad sensor (opcional)",
      showTrend: "Mostrar gráfico de tendencia de temperatura",
      trendHours: "Horas de histórico a mostrar",
    },
    conditions: {
      "clear-night": "Despejado (noche)",
      cloudy: "Nublado",
      fog: "Niebla",
      hail: "Granizo",
      lightning: "Tormenta eléctrica",
      "lightning-rainy": "Tormenta con lluvia",
      partlycloudy: "Parcialmente nublado",
      pouring: "Lluvia intensa",
      rainy: "Lluvia",
      snowy: "Nieve",
      "snowy-rainy": "Aguanieve",
      sunny: "Soleado",
      windy: "Viento",
      "windy-variant": "Viento y nubes",
      exceptional: "Fenómeno excepcional",
    },
    risk: { low: "Bajo", moderate: "Moderado", high: "Alto", veryHigh: "Muy alto", dangerous: "Peligroso", extreme: "Extremo" },
    labels: {
      battery: "Batería estación",
      trend: "Tendencia temperatura",
      humidity: "Humedad",
      dewPoint: "Punto de rocío",
      windChill: "Sens. viento",
      humidex: "Humidex",
      uvIndex: "Índice UV",
      heatRisk: "Riesgo calor",
      pressure: "Presión hPa",
      illuminance: "Iluminancia lux",
      rainToday: "Acumulada hoy",
      rainSensor: "Sensor lluvia",
      noRain: "Sin lluvia",
      raining: "Lloviendo",
      feelsLike: "Sensación",
      windFrom: "Viento del",
      gust: "Racha",
      nightfallIn: "Anochece en",
      sunriseIn: "Amanece en",
      lessThanMin: "menos de 1 min",
      min: "min",
      dash: "—",
    },
  },
};

function detectLang(hass) {
  const raw = (hass && (hass.language || (hass.locale && hass.locale.language))) || "en";
  return String(raw).toLowerCase().startsWith("es") ? "es" : "en";
}

const COMPASS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

function compassLabel(deg) {
  if (deg === null || deg === undefined || isNaN(deg)) return "—";
  const idx = Math.round(((deg % 360) / 22.5)) % 16;
  return COMPASS[(idx + 16) % 16];
}

function conditionLabel(condition, lang) {
  const S = STRINGS[lang];
  if (!condition) return S.labels.dash;
  const key = condition.toLowerCase().replace(/_/g, "-");
  return S.conditions[key] || condition;
}

function weatherIcon(condition) {
  const c = (condition || "").toLowerCase();
  if (c.includes("clear") && c.includes("night")) return { icon: "mdi:weather-night", color: "#3b5a8f" };
  if (c.includes("thunder") || c.includes("lightning")) return { icon: "mdi:weather-lightning", color: "#8a63c9" };
  if (c.includes("pour") || c.includes("rain")) return { icon: "mdi:weather-pouring", color: "#3b82c4" };
  if (c.includes("snow")) return { icon: "mdi:weather-snowy", color: "#8fb3d9" };
  if (c.includes("fog") || c.includes("mist") || c.includes("haze")) return { icon: "mdi:weather-fog", color: "#8a92a3" };
  if (c.includes("wind")) return { icon: "mdi:weather-windy", color: "#5a92a8" };
  if (c.includes("partly") || c.includes("partlycloudy")) return { icon: "mdi:weather-partly-cloudy", color: "#e0a53e" };
  if (c.includes("cloud")) return { icon: "mdi:weather-cloudy", color: "#8a92a3" };
  if (c.includes("clear") || c.includes("sun")) return { icon: "mdi:weather-sunny", color: "#f5a623" };
  return { icon: "mdi:weather-cloudy", color: "#8a92a3" };
}

function batteryIcon(pct) {
  if (pct === null || pct === undefined || isNaN(pct)) return { icon: "mdi:battery-unknown", color: "#8a92a3" };
  if (pct <= 10) return { icon: "mdi:battery-alert-variant-outline", color: "#d1481c" };
  if (pct <= 30) return { icon: "mdi:battery-low", color: "#c78a00" };
  if (pct <= 60) return { icon: "mdi:battery-medium", color: "#2ba86a" };
  return { icon: "mdi:battery-high", color: "#2ba86a" };
}

// Risk scales, tuned for metric units. Returns { label, color }.
function uvRisk(v, lang) {
  const R = STRINGS[lang].risk;
  if (v === null || isNaN(v)) return { label: STRINGS[lang].labels.dash, color: "var(--primary-text-color, #1c2128)" };
  if (v >= 11) return { label: R.extreme, color: "#8a3ffc" };
  if (v >= 8) return { label: R.veryHigh, color: "#d1481c" };
  if (v >= 6) return { label: R.high, color: "#e0722c" };
  if (v >= 3) return { label: R.moderate, color: "#c78a00" };
  return { label: R.low, color: "#2ba86a" };
}

// heat stress risk: Ecowitt reports this as a 0-100% risk score, not a
// temperature-equivalent index, so the scale is calibrated in percent.
function heatRisk(v, unit, lang) {
  const R = STRINGS[lang].risk;
  if (v === null || isNaN(v)) return { label: STRINGS[lang].labels.dash, color: "var(--primary-text-color, #1c2128)" };
  const isPercent = unit === "%" || (v >= 0 && v <= 100 && unit !== "°C" && unit !== "°F");
  if (isPercent) {
    if (v >= 80) return { label: R.extreme, color: "#8a3ffc" };
    if (v >= 60) return { label: R.dangerous, color: "#d1481c" };
    if (v >= 40) return { label: R.high, color: "#e0722c" };
    if (v >= 20) return { label: R.moderate, color: "#c78a00" };
    return { label: R.low, color: "#2ba86a" };
  }
  // fallback: temperature-equivalent heat index scale (°C)
  if (v >= 51) return { label: R.extreme, color: "#8a3ffc" };
  if (v >= 39) return { label: R.dangerous, color: "#d1481c" };
  if (v >= 32) return { label: R.high, color: "#e0722c" };
  if (v >= 27) return { label: R.moderate, color: "#c78a00" };
  return { label: R.low, color: "#2ba86a" };
}

function trendInfo(entityOrNull, hass) {
  if (!entityOrNull) return null;
  const st = hass.states[entityOrNull];
  if (!st) return null;
  const raw = st.state;
  const num = parseFloat(raw);
  let dir = "steady";
  if (!isNaN(num)) {
    if (num > 0.05) dir = "rising";
    else if (num < -0.05) dir = "falling";
  } else {
    const s = (raw || "").toLowerCase();
    if (s.includes("ris") || s.includes("sub")) dir = "rising";
    else if (s.includes("fall") || s.includes("baj")) dir = "falling";
  }
  if (dir === "rising") return { icon: "mdi:trending-up", color: "#c78a00" };
  if (dir === "falling") return { icon: "mdi:trending-down", color: "#3b82c4" };
  return { icon: "mdi:trending-neutral", color: "#8a92a3" };
}

function fmt(hass, entityId, decimals) {
  if (!entityId) return { text: "—", unit: "", value: null, exists: false };
  const st = hass.states[entityId];
  if (!st || st.state === "unknown" || st.state === "unavailable") return { text: "—", unit: "", value: null, exists: !!st };
  const num = parseFloat(st.state);
  const unit = st.attributes.unit_of_measurement || "";
  if (isNaN(num)) return { text: st.state, unit: "", value: null, exists: true };
  return { text: num.toFixed(decimals === undefined ? 1 : decimals), unit, value: num, exists: true };
}

function getFieldGroups(lang) {
  const E = STRINGS[lang].editor;
  return [
    {
      title: E.general,
      schema: [
        { name: "name", selector: { text: {} }, label: E.name },
        { name: "temperature", selector: { entity: { domain: "sensor", device_class: "temperature" } }, label: E.temperature },
        { name: "apparent_temperature", selector: { entity: { domain: "sensor", device_class: "temperature" } }, label: E.apparentTemperature },
        { name: "weather_condition", selector: { entity: {} }, label: E.weatherCondition },
        { name: "battery", selector: { entity: { domain: "sensor", device_class: "battery" } }, label: E.battery },
      ],
    },
    {
      title: E.thermalAir,
      schema: [
        { name: "dew_point", selector: { entity: { domain: "sensor", device_class: "temperature" } }, label: E.dewPoint },
        { name: "wind_chill", selector: { entity: { domain: "sensor", device_class: "temperature" } }, label: E.windChill },
        { name: "humidex", selector: { entity: { domain: "sensor" } }, label: E.humidex },
        { name: "heat_index", selector: { entity: { domain: "sensor" } }, label: E.heatIndex },
        { name: "humidity", selector: { entity: { domain: "sensor", device_class: "humidity" } }, label: E.humidity },
        { name: "pressure", selector: { entity: { domain: "sensor" } }, label: E.pressure },
        { name: "pressure_trend", selector: { entity: {} }, label: E.pressureTrend },
        { name: "uv_index", selector: { entity: { domain: "sensor" } }, label: E.uvIndex },
        { name: "illuminance", selector: { entity: { domain: "sensor", device_class: "illuminance" } }, label: E.illuminance },
      ],
    },
    {
      title: E.wind,
      schema: [
        { name: "wind_speed", selector: { entity: { domain: "sensor", device_class: "wind_speed" } }, label: E.windSpeed },
        { name: "wind_gust", selector: { entity: { domain: "sensor", device_class: "wind_speed" } }, label: E.windGust },
        { name: "wind_direction", selector: { entity: { domain: "sensor" } }, label: E.windDirection },
      ],
    },
    {
      title: E.rain,
      schema: [
        { name: "rain_rate", selector: { entity: { domain: "sensor", device_class: "precipitation_intensity" } }, label: E.rainRate },
        { name: "rain_today", selector: { entity: { domain: "sensor", device_class: "precipitation" } }, label: E.rainToday },
        { name: "moisture", selector: { entity: {} }, label: E.moisture },
      ],
    },
    {
      title: E.trend,
      schema: [
        { name: "show_trend", selector: { boolean: {} }, label: E.showTrend },
        { name: "trend_hours", selector: { number: { min: 1, max: 24, mode: "box" } }, label: E.trendHours },
      ],
    },
  ];
}

class EcowittHudCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config || {};
    if (this._form) {
      // Typing in the form fires value-changed -> config-changed, and HA
      // round-trips that straight back into setConfig(). Just refresh the
      // data on the existing form instead of tearing it down each time,
      // or every keystroke would collapse open sections and lose focus.
      this._form.data = this._config;
      return;
    }
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    const lang = detectLang(hass);
    if (this._form && this._builtLang === lang) {
      // cheap update: keeps the existing DOM (open sections, focus, scroll)
      // intact instead of rebuilding the whole form on every state change.
      this._form.hass = hass;
      return;
    }
    this._render();
  }
  connectedCallback() {
    if (!this._form) this._render();
  }
  _render() {
    if (!this._hass || !this._config) return;
    this._builtLang = detectLang(this._hass);
    const groups = getFieldGroups(this._builtLang).map((g) => ({
      name: g.title,
      type: "expandable",
      title: g.title,
      flatten: true,
      schema: g.schema,
    }));
    this.innerHTML = "";
    const form = document.createElement("ha-form");
    form.hass = this._hass;
    form.data = this._config;
    form.schema = groups;
    form.computeLabel = (s) => s.label || s.title || s.name;
    form.addEventListener("value-changed", (ev) => {
      this._config = ev.detail.value;
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
    });
    this._form = form;
    this.appendChild(form);
  }
}
customElements.define("ecowitt-hud-card-editor", EcowittHudCardEditor);

class EcowittHudCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ecowitt-hud-card-editor");
  }
  static getStubConfig() {
    return {};
  }
  setConfig(config) {
    const newConfig = config || {};
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    const prev = this._config;
    this._config = newConfig;
    // The dashboard editor's live preview calls setConfig() on every
    // keystroke. Once the DOM exists, just refresh the bound values
    // instead of tearing down and rebuilding the whole card each time
    // (which flickered and re-hit the history API needlessly).
    if (!this._els) {
      this._buildStatic();
      return;
    }
    this._update();
    const trendRelevant =
      !prev ||
      prev.temperature !== newConfig.temperature ||
      prev.trend_hours !== newConfig.trend_hours ||
      prev.show_trend !== newConfig.show_trend;
    if (trendRelevant) {
      this._fetchTrend();
      this._fetchMinMax();
    }
  }
  set hass(hass) {
    const hadHass = !!this._hass;
    this._hass = hass;
    // Language can only be known once hass is available. setConfig() runs
    // before the first hass push, so _buildStatic() had to guess (English)
    // the first time around. If the real language differs, rebuild once
    // now that we actually know it.
    if (!hadHass && this._builtLang !== detectLang(hass)) {
      this._buildStatic();
      return;
    }
    this._update();
    if (!hadHass) {
      // same lifecycle issue affects the history-based fetches below
      this._fetchTrend();
      this._fetchMinMax();
    }
  }
  getCardSize() {
    return 6;
  }
  _lang() {
    return this._builtLang || detectLang(this._hass);
  }
  _openMoreInfo(entityId) {
    if (!entityId) return;
    const st = this._hass && this._hass.states[entityId];
    if (!st) return;
    const ev = new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true });
    this.dispatchEvent(ev);
  }
  _buildStatic() {
    const lang = detectLang(this._hass);
    this._builtLang = lang;
    const S = STRINGS[lang];
    const root = this.shadowRoot;
    root.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { display: block; padding: 22px 24px; background: var(--ha-card-background, var(--card-background-color, #fff)); color: var(--primary-text-color, #1c2128); font-family: -apple-system, "Segoe UI", Roboto, sans-serif; overflow: hidden; border-radius: var(--ha-card-border-radius, 12px); box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.12)); border: 1px solid var(--divider-color, rgba(0,0,0,.06)); }
        .clickable { cursor: pointer; border-radius: 6px; transition: background .15s ease; }
        .clickable:hover { background: rgba(127,127,127,.12); }
        .clickable:active { background: rgba(127,127,127,.18); }
        .title { font-size: 13px; font-weight: 600; color: var(--secondary-text-color, #70788a); margin: 0 0 14px; letter-spacing: .02em; }
        .row { display: flex; }
        .divider { border-bottom: 1px solid var(--divider-color, rgba(0,0,0,.08)); }
        .hero { align-items: center; gap: 16px; padding-bottom: 16px; }
        .hero-temp { font-size: 40px; font-weight: 600; line-height: 1; }
        .hero-unit { font-size: 17px; color: #e08a1e; }
        .hero-sub { font-size: 12px; color: var(--secondary-text-color, #70788a); margin-top: 4px; }
        .hero-minmax { font-size: 11px; color: var(--secondary-text-color, #70788a); margin-top: 4px; display: flex; gap: 14px; }
        .hero-minmax .arrow-up { color: #d1481c; font-weight: 600; }
        .hero-minmax .arrow-down { color: #3b82c4; font-weight: 600; }
        .hero-minmax .mm-time { color: var(--secondary-text-color, #8a92a3); margin-left: 2px; }
        .battery { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
        .battery-row { display: flex; align-items: center; gap: 5px; }
        .battery-pct { font-size: 15px; font-weight: 600; }
        .battery-label { font-size: 9px; color: var(--secondary-text-color, #70788a); }
        .trend { padding: 12px 0 14px; }
        .trend-label { font-size: 9px; letter-spacing: .08em; color: var(--secondary-text-color, #8a92a3); margin-bottom: 5px; text-transform: uppercase; }
        .trend-svg { width: 100%; height: 32px; display: block; }
        .trend-range { display: flex; justify-content: space-between; font-size: 9px; color: var(--secondary-text-color, #8a92a3); margin-top: 2px; }
        .day { padding: 14px 0 16px; }
        .day-top { display: flex; align-items: center; gap: 8px; }
        .day-edge { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--secondary-text-color, #70788a); white-space: nowrap; }
        .day-edge ha-icon { --mdc-icon-size: 15px; }
        .day-track { flex: 1; height: 4px; border-radius: 2px; background: var(--divider-color, rgba(0,0,0,.07)); position: relative; }
        .day-fill { position: absolute; top: 0; left: 0; height: 100%; border-radius: 2px; }
        .day-marker { position: absolute; top: 50%; width: 11px; height: 11px; border-radius: 50%; background: #f5a623; box-shadow: 0 0 8px rgba(245,166,35,.5); transform: translate(-50%, -50%); }
        .day-caption { font-size: 9.5px; color: var(--secondary-text-color, #8a92a3); text-align: center; margin-top: 7px; }
        .wind { gap: 20px; padding: 16px 0; align-items: center; }
        .wind-compass { width: 64px; height: 64px; flex: none; border-radius: 50%; border: 1px solid var(--divider-color, rgba(0,0,0,.1)); position: relative; display: flex; align-items: center; justify-content: center; }
        .wind-compass ha-icon { position: absolute; --mdc-icon-size: 26px; }
        .wind-compass span { font-size: 8px; color: var(--secondary-text-color, #70788a); }
        .wind-info { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
        .wind-speed { font-size: 22px; font-weight: 600; }
        .wind-speed-unit { font-size: 11px; color: var(--secondary-text-color, #70788a); font-weight: 400; }
        .wind-dir { font-size: 11px; color: var(--secondary-text-color, #70788a); }
        .wind-gust { font-size: 11.5px; color: var(--secondary-text-color, #8a92a3); }
        .grid { display: flex; flex-wrap: wrap; gap: 22px 28px; padding: 16px 0; }
        .stat-val { font-size: 16px; font-weight: 600; }
        .stat-unit { font-size: 12px; color: var(--secondary-text-color, #70788a); }
        .stat-label { font-size: 9.5px; color: var(--secondary-text-color, #70788a); margin-top: 2px; }
        .rain { gap: 28px; padding-top: 16px; }
        .rain-val { font-size: 20px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .rain-sub { font-size: 9.5px; color: var(--secondary-text-color, #8a92a3); margin-top: 2px; }
      </style>
      <ha-card>
        <div class="title" style="display:none;"></div>
        <div class="row hero divider">
          <ha-icon class="hero-icon clickable" style="--mdc-icon-size:48px;flex:none;"></ha-icon>
          <div style="flex:1">
            <div class="row" style="align-items:baseline;gap:10px;">
              <div class="hero-temp clickable"><span class="hero-temp-val">—</span><span class="hero-unit"></span></div>
              <div class="hero-sub clickable"></div>
            </div>
            <div class="hero-minmax"></div>
          </div>
          <div class="battery clickable">
            <div class="battery-row">
              <ha-icon class="battery-icon" style="--mdc-icon-size:16px;"></ha-icon>
              <span class="battery-pct">—</span>
            </div>
            <div class="battery-label">${S.labels.battery}</div>
          </div>
        </div>
        <div class="trend divider" id="trend-block" style="display:none;">
          <div class="trend-label">${S.labels.trend} <span class="trend-hours-lbl"></span></div>
          <svg class="trend-svg" viewBox="0 0 300 32" preserveAspectRatio="none"></svg>
          <div class="trend-range"><span class="trend-min"></span><span class="trend-max"></span></div>
        </div>
        <div class="day divider">
          <div class="day-top">
            <span class="day-edge"><ha-icon class="edge-start-icon" icon="mdi:weather-sunset-up"></ha-icon><span class="edge-start-lbl"></span></span>
            <div class="day-track"><div class="day-fill"></div><div class="day-marker"></div></div>
            <span class="day-edge"><span class="edge-end-lbl"></span><ha-icon class="edge-end-icon" icon="mdi:weather-sunset-down"></ha-icon></span>
          </div>
          <div class="day-caption"></div>
        </div>
        <div class="row wind divider">
          <div class="wind-compass">
            <ha-icon icon="mdi:navigation" class="wind-arrow" style="color:#3b82c4;"></ha-icon>
            <span class="wind-dir-label"></span>
          </div>
          <div class="wind-info">
            <div class="row" style="align-items:baseline;gap:8px;">
              <span class="wind-speed clickable"><span class="wind-speed-val">—</span> <span class="wind-speed-unit"></span></span>
              <span class="wind-dir clickable"></span>
            </div>
            <div class="wind-gust clickable"></div>
          </div>
        </div>
        <div class="grid divider">
          <div class="stat clickable" data-k="humidity"><div class="stat-val"><span class="v"></span><span class="stat-unit u"></span></div><div class="stat-label">${S.labels.humidity}</div></div>
          <div class="stat clickable" data-k="dew_point"><div class="stat-val"><span class="v"></span><span class="stat-unit u"></span></div><div class="stat-label">${S.labels.dewPoint}</div></div>
          <div class="stat clickable" data-k="wind_chill"><div class="stat-val"><span class="v"></span><span class="stat-unit u"></span></div><div class="stat-label">${S.labels.windChill}</div></div>
          <div class="stat clickable" data-k="humidex"><div class="stat-val"><span class="v"></span><span class="stat-unit u"></span></div><div class="stat-label">${S.labels.humidex}</div></div>
          <div class="stat clickable" data-k="uv_index"><div class="stat-val"><span class="v"></span></div><div class="stat-label">${S.labels.uvIndex}</div></div>
          <div class="stat clickable" data-k="heat_index"><div class="stat-val"><span class="v"></span></div><div class="stat-label">${S.labels.heatRisk}</div></div>
          <div class="stat clickable" data-k="pressure"><div class="stat-val"><span class="v"></span> <ha-icon class="trend-icon" style="--mdc-icon-size:14px;vertical-align:-2px;"></ha-icon></div><div class="stat-label">${S.labels.pressure}</div></div>
          <div class="stat clickable" data-k="illuminance"><div class="stat-val"><span class="v"></span></div><div class="stat-label">${S.labels.illuminance}</div></div>
        </div>
        <div class="row rain">
          <div class="stat clickable" data-k="rain_rate">
            <div class="rain-val"><ha-icon class="rain-icon" style="--mdc-icon-size:18px;"></ha-icon><span class="v"></span> <span class="stat-unit">mm/h</span></div>
            <div class="rain-sub moisture-sub"></div>
          </div>
          <div class="stat clickable" data-k="rain_today">
            <div class="rain-val"><span class="v"></span> <span class="stat-unit">mm</span></div>
            <div class="rain-sub">${S.labels.rainToday}</div>
          </div>
          <div class="stat clickable" data-k="moisture">
            <div class="rain-val"><span class="v"></span></div>
            <div class="rain-sub">${S.labels.rainSensor}</div>
          </div>
        </div>
      </ha-card>
    `;

    // wire click handlers once
    const bind = (sel, key) => {
      const el = root.querySelector(sel);
      if (el) el.addEventListener("click", () => this._openMoreInfo(this._config[key]));
    };
    bind(".hero-icon", "weather_condition");
    bind(".hero-temp", "temperature");
    bind(".hero-sub", "apparent_temperature");
    bind(".battery", "battery");
    bind(".wind-speed", "wind_speed");
    bind(".wind-dir", "wind_direction");
    bind(".wind-gust", "wind_gust");
    root.querySelectorAll(".stat[data-k]").forEach((el) => {
      el.addEventListener("click", () => this._openMoreInfo(this._config[el.dataset.k]));
    });

    this._els = {
      title: root.querySelector(".title"),
      heroIcon: root.querySelector(".hero-icon"),
      heroTempVal: root.querySelector(".hero-temp-val"),
      heroUnit: root.querySelector(".hero-unit"),
      heroSub: root.querySelector(".hero-sub"),
      heroMinMax: root.querySelector(".hero-minmax"),
      batteryIcon: root.querySelector(".battery-icon"),
      batteryPct: root.querySelector(".battery-pct"),
      batteryBlock: root.querySelector(".battery"),
      windBlock: root.querySelector(".row.wind"),
      windArrow: root.querySelector(".wind-arrow"),
      windDirLabel: root.querySelector(".wind-dir-label"),
      windSpeedVal: root.querySelector(".wind-speed-val"),
      windSpeedUnit: root.querySelector(".wind-speed-unit"),
      windDir: root.querySelector(".wind-dir"),
      windGust: root.querySelector(".wind-gust"),
      trendIcon: root.querySelector(".trend-icon"),
      rainIcon: root.querySelector(".rain-icon"),
      moistureSub: root.querySelector(".moisture-sub"),
      dayFill: root.querySelector(".day-fill"),
      dayMarker: root.querySelector(".day-marker"),
      dayCaption: root.querySelector(".day-caption"),
      edgeStartIcon: root.querySelector(".edge-start-icon"),
      edgeStartLbl: root.querySelector(".edge-start-lbl"),
      edgeEndIcon: root.querySelector(".edge-end-icon"),
      edgeEndLbl: root.querySelector(".edge-end-lbl"),
      trendBlock: root.querySelector("#trend-block"),
      trendSvg: root.querySelector(".trend-svg"),
      trendMin: root.querySelector(".trend-min"),
      trendMax: root.querySelector(".trend-max"),
      trendHoursLbl: root.querySelector(".trend-hours-lbl"),
      gridBlock: root.querySelector(".grid"),
      rainBlock: root.querySelector(".row.rain"),
      stats: {},
    };
    root.querySelectorAll(".stat[data-k]").forEach((el) => {
      this._els.stats[el.dataset.k] = { val: el.querySelector(".v"), unit: el.querySelector(".u"), root: el };
    });
    this._update();
    this._fetchTrend();
    this._fetchMinMax();
    if (!this._trendInterval) {
      this._trendInterval = setInterval(() => this._fetchTrend(), 10 * 60 * 1000);
    }
    if (!this._sunInterval) {
      this._sunInterval = setInterval(() => this._updateSunBar(), 60 * 1000);
    }
    if (!this._minMaxInterval) {
      this._minMaxInterval = setInterval(() => this._fetchMinMax(), 10 * 60 * 1000);
    }
  }
  disconnectedCallback() {
    if (this._trendInterval) {
      clearInterval(this._trendInterval);
      this._trendInterval = null;
    }
    if (this._sunInterval) {
      clearInterval(this._sunInterval);
      this._sunInterval = null;
    }
    if (this._minMaxInterval) {
      clearInterval(this._minMaxInterval);
      this._minMaxInterval = null;
    }
  }
  _timeStr(d) {
    if (!d || isNaN(d.getTime())) return "—";
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  _durationStr(ms) {
    const L = STRINGS[this._lang()].labels;
    if (ms === null || isNaN(ms)) return L.dash;
    if (ms <= 0) return L.lessThanMin;
    const totalMin = Math.round(ms / 60000);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    if (h <= 0) return `${m} ${L.min}`;
    return `${h}h ${m}${L.min}`;
  }
  async _fetchTrend() {
    const c = this._config;
    if (c.show_trend === false || !c.temperature || !this._hass || !this._els || !this._els.trendBlock) return;
    const hours = c.trend_hours || 6;
    const start = new Date(Date.now() - hours * 3600 * 1000).toISOString();
    try {
      const result = await this._hass.callApi(
        "GET",
        `history/period/${start}?filter_entity_id=${c.temperature}&minimal_response&no_attributes`
      );
      if (result && result[0] && result[0].length > 1) {
        const points = result[0]
          .map((p) => {
            const rawState = p.state !== undefined && p.state !== null ? p.state : p.s;
            const rawTime = p.last_changed ? p.last_changed : p.lu * 1000;
            return { t: new Date(rawTime).getTime(), v: parseFloat(rawState) };
          })
          .filter((p) => !isNaN(p.v) && !isNaN(p.t));
        if (points.length > 1) {
          this._trendData = points;
          this._els.trendHoursLbl.textContent = `(${hours}h)`;
          this._els.trendBlock.style.display = "";
          this._renderTrend();
        }
      }
    } catch (e) {
      // history API not available or entity has no recorder history; leave hidden
    }
  }
  async _fetchMinMax() {
    const c = this._config;
    if (!c.temperature || !this._hass || !this._els || !this._els.heroMinMax) return;
    const start = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    try {
      const result = await this._hass.callApi(
        "GET",
        `history/period/${start}?filter_entity_id=${c.temperature}&minimal_response&no_attributes`
      );
      if (result && result[0] && result[0].length > 0) {
        const points = result[0]
          .map((p) => {
            const rawState = p.state !== undefined && p.state !== null ? p.state : p.s;
            const rawTime = p.last_changed ? p.last_changed : p.lu * 1000;
            return { t: new Date(rawTime).getTime(), v: parseFloat(rawState) };
          })
          .filter((p) => !isNaN(p.v) && !isNaN(p.t));

        // include the live current reading too, in case it hasn't landed
        // in the recorder yet as a distinct history point
        const current = fmt(this._hass, c.temperature, 1);
        if (current.value !== null) points.push({ t: Date.now(), v: current.value });

        if (points.length > 0) {
          let maxP = points[0], minP = points[0];
          for (const p of points) {
            if (p.v > maxP.v) maxP = p;
            if (p.v < minP.v) minP = p;
          }
          const maxTime = this._timeStr(new Date(maxP.t));
          const minTime = this._timeStr(new Date(minP.t));
          this._els.heroMinMax.innerHTML =
            `<span><span class="arrow-up">↑</span> ${maxP.v.toFixed(1)}°<span class="mm-time">${maxTime}</span></span>` +
            `<span><span class="arrow-down">↓</span> ${minP.v.toFixed(1)}°<span class="mm-time">${minTime}</span></span>`;
        }
      }
    } catch (e) {
      // history API not available; leave the line empty
    }
  }
  _renderTrend() {
    const els = this._els;
    if (!els.trendSvg || !this._trendData || this._trendData.length < 2) return;
    const pts = this._trendData;
    const values = pts.map((p) => p.v);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const w = 300, h = 32, pad = 3;
    const t0 = pts[0].t, t1 = pts[pts.length - 1].t;
    const tRange = t1 - t0 || 1;
    const coords = pts.map((p) => {
      const x = pad + ((p.t - t0) / tRange) * (w - pad * 2);
      const y = h - pad - ((p.v - min) / range) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const last = values[values.length - 1];
    let color = "#3b82c4";
    if (last >= 32) color = "#d1481c";
    else if (last >= 25) color = "#e0722c";
    else if (last >= 15) color = "#2ba86a";
    const line = coords.join(" ");
    const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;
    els.trendSvg.innerHTML = `
      <polygon points="${area}" fill="${color}22"></polygon>
      <polyline points="${line}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"></polyline>
    `;
    els.trendMin.textContent = `${min.toFixed(1)}°`;
    els.trendMax.textContent = `${max.toFixed(1)}°`;
  }
  _update() {
    if (!this._els || !this._hass) return;
    const hass = this._hass;
    const c = this._config;
    const els = this._els;
    const lang = this._lang();
    const S = STRINGS[lang];

    els.title.textContent = c.name || "";
    els.title.style.display = c.name ? "" : "none";

    const temp = fmt(hass, c.temperature, 1);
    const apparent = fmt(hass, c.apparent_temperature, 1);
    const condState = c.weather_condition && hass.states[c.weather_condition];
    const condition = condState ? condState.state : "";
    if (c.weather_condition) {
      const wIcon = weatherIcon(condition);
      els.heroIcon.style.display = "";
      els.heroIcon.setAttribute("icon", wIcon.icon);
      els.heroIcon.style.color = wIcon.color;
    } else {
      els.heroIcon.style.display = "none";
    }
    els.heroTempVal.textContent = temp.text;
    els.heroUnit.textContent = temp.unit || "°C";
    const subParts = [];
    if (c.apparent_temperature) subParts.push(`${S.labels.feelsLike} ${apparent.text}°`);
    if (c.weather_condition) subParts.push(conditionLabel(condition, lang));
    els.heroSub.textContent = subParts.join(" · ");
    els.heroSub.style.display = subParts.length ? "" : "none";

    const batt = fmt(hass, c.battery, 0);
    if (c.battery) {
      els.batteryBlock.style.display = "";
      const bIcon = batteryIcon(batt.value);
      els.batteryIcon.setAttribute("icon", bIcon.icon);
      els.batteryIcon.style.color = bIcon.color;
      els.batteryPct.textContent = batt.value !== null ? `${batt.text}%` : S.labels.dash;
    } else {
      els.batteryBlock.style.display = "none";
    }

    const windSpeed = fmt(hass, c.wind_speed, 1);
    const windGust = fmt(hass, c.wind_gust, 1);
    const windDirVal = fmt(hass, c.wind_direction, 0);
    els.windBlock.style.display = c.wind_speed ? "" : "none";
    els.windSpeedVal.textContent = windSpeed.text;
    els.windSpeedUnit.textContent = windSpeed.unit || "km/h";
    els.windDir.textContent = windDirVal.value !== null ? `${S.labels.windFrom} ${compassLabel(windDirVal.value)} (${windDirVal.text}°)` : S.labels.dash;
    els.windGust.textContent = windGust.value !== null ? `${S.labels.gust} ${windGust.text} ${windGust.unit || "km/h"}` : "";
    els.windArrow.style.transform = windDirVal.value !== null ? `rotate(${windDirVal.value}deg)` : "none";
    els.windDirLabel.textContent = windDirVal.value !== null ? compassLabel(windDirVal.value) : "";

    const setStat = (key, val, unit, color) => {
      const s = els.stats[key];
      if (!s) return;
      const configured = !!c[key];
      s.root.style.display = configured ? "" : "none";
      if (!configured) return;
      s.val.textContent = val;
      if (s.unit) s.unit.textContent = unit || "";
      const valEl = s.root.querySelector(".stat-val") || s.root.querySelector(".rain-val");
      if (valEl) valEl.style.color = color || "var(--primary-text-color, #1c2128)";
    };

    const humidity = fmt(hass, c.humidity, 0);
    setStat("humidity", humidity.text, "%");
    const dew = fmt(hass, c.dew_point, 1);
    setStat("dew_point", dew.text, "°");
    const chill = fmt(hass, c.wind_chill, 1);
    setStat("wind_chill", chill.text, "°");
    const humidex = fmt(hass, c.humidex, 1);
    setStat("humidex", humidex.text, "°");

    const uv = fmt(hass, c.uv_index, 0);
    const uvR = uvRisk(uv.value, lang);
    setStat("uv_index", uv.text, "", uvR.color);

    const heat = fmt(hass, c.heat_index, 0);
    const heatR = heatRisk(heat.value, heat.unit, lang);
    setStat("heat_index", heat.value !== null ? `${heatR.label} (${heat.text}${heat.unit || "%"})` : S.labels.dash, "", heatR.color);

    const pressure = fmt(hass, c.pressure, 0);
    setStat("pressure", pressure.text, "");
    const trend = trendInfo(c.pressure_trend, hass);
    if (trend) {
      els.trendIcon.style.display = "";
      els.trendIcon.setAttribute("icon", trend.icon);
      els.trendIcon.style.color = trend.color;
    } else {
      els.trendIcon.style.display = "none";
    }

    const lux = fmt(hass, c.illuminance, 0);
    setStat("illuminance", lux.value !== null && lux.value >= 1000 ? `${(lux.value / 1000).toFixed(1)}k` : lux.text, "");

    const rainRate = fmt(hass, c.rain_rate, 1);
    const raining = rainRate.value !== null && rainRate.value > 0;
    setStat("rain_rate", rainRate.text);
    els.rainIcon.setAttribute("icon", raining ? "mdi:weather-pouring" : "mdi:water-outline");
    els.rainIcon.style.color = raining ? "#3b82c4" : "#8a92a3";
    els.moistureSub.textContent = raining ? S.labels.raining : S.labels.noRain;

    const rainToday = fmt(hass, c.rain_today, 1);
    setStat("rain_today", rainToday.text);

    const moistState = c.moisture && hass.states[c.moisture];
    let moistTxt = S.labels.dash;
    if (moistState && moistState.state !== undefined && moistState.state !== null) {
      const raw = String(moistState.state).trim();
      const s = raw.toLowerCase();
      if (s === "wet" || s === "on" || s === "true" || s === "yes" || s === "leak" || s === "moist" || s === "humedo" || s === "húmedo") {
        moistTxt = S.labels.raining;
      } else if (s === "dry" || s === "off" || s === "false" || s === "no" || s === "seco") {
        moistTxt = S.labels.noRain;
      } else if (s === "unknown" || s === "unavailable" || s === "") {
        moistTxt = S.labels.dash;
      } else {
        moistTxt = raw.charAt(0).toUpperCase() + raw.slice(1);
      }
    }
    setStat("moisture", moistTxt);

    const gridKeys = ["humidity", "dew_point", "wind_chill", "humidex", "uv_index", "heat_index", "pressure", "illuminance"];
    els.gridBlock.style.display = gridKeys.some((k) => !!c[k]) ? "" : "none";

    const rainKeys = ["rain_rate", "rain_today", "moisture"];
    els.rainBlock.style.display = rainKeys.some((k) => !!c[k]) ? "" : "none";

    this._updateSunBar();
  }

  _updateSunBar() {
    if (!this._els || !this._hass) return;
    const els = this._els;
    const hass = this._hass;
    const S = STRINGS[this._lang()];
    const sunEnt = hass.states["sun.sun"];
    if (sunEnt && sunEnt.attributes.next_rising && sunEnt.attributes.next_setting) {
      const nextRising = new Date(sunEnt.attributes.next_rising);
      const nextSetting = new Date(sunEnt.attributes.next_setting);
      const isDay = sunEnt.state === "above_horizon";
      const now = new Date();
      const DAY_MS = 24 * 3600 * 1000;

      // next_rising / next_setting always point to the NEXT occurrence of each
      // event, so during the day "today's sunrise" is next_rising minus ~24h,
      // and at night "the last sunset" is next_setting minus ~24h. next_rising
      // is always the upcoming sunrise regardless of which half of the night
      // we're in, so this works for both night segments without branching.
      let segStart, segEnd;
      if (isDay) {
        segStart = new Date(nextRising.getTime() - DAY_MS);
        segEnd = nextSetting;
      } else {
        segStart = new Date(nextSetting.getTime() - DAY_MS);
        segEnd = nextRising;
      }

      const total = segEnd.getTime() - segStart.getTime();
      let frac = total > 0 ? (now.getTime() - segStart.getTime()) / total : 0;
      frac = Math.max(0, Math.min(1, frac));

      const accent = isDay ? "#f5a623" : "#3b5a8f";
      els.edgeStartIcon.setAttribute("icon", isDay ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down");
      els.edgeStartIcon.style.color = accent;
      els.edgeStartLbl.textContent = this._timeStr(segStart);
      els.edgeEndIcon.setAttribute("icon", isDay ? "mdi:weather-sunset-down" : "mdi:weather-sunset-up");
      els.edgeEndIcon.style.color = accent;
      els.edgeEndLbl.textContent = this._timeStr(segEnd);

      els.dayFill.style.width = `${frac * 100}%`;
      els.dayFill.style.background = isDay
        ? "linear-gradient(90deg,#f5a623,#ffd27a)"
        : "linear-gradient(90deg,#2c3e63,#5a7ab8)";
      els.dayMarker.style.left = `${frac * 100}%`;
      els.dayMarker.style.background = accent;
      els.dayMarker.style.boxShadow = `0 0 8px ${accent}88`;
      els.dayMarker.style.display = "";

      const remainMs = segEnd.getTime() - now.getTime();
      els.dayCaption.textContent = isDay
        ? `${S.labels.nightfallIn} ${this._durationStr(remainMs)}`
        : `${S.labels.sunriseIn} ${this._durationStr(remainMs)}`;
    } else {
      els.dayMarker.style.display = "none";
      els.dayCaption.textContent = "";
    }
  }
}
customElements.define("ecowitt-hud-card", EcowittHudCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ecowitt-hud-card",
  name: "Ecowitt HUD Card",
  description: "Instrument-panel card for Ecowitt weather stations",
});
