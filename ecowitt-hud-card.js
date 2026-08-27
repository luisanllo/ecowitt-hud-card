/* Weather Station Card — custom Lovelace card for Home Assistant
 * Instrument-panel style card built for Ecowitt weather stations; works
 * with any station whose Home Assistant integration exposes comparable
 * sensors (temperature, wind, rain, UV...).
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
 * UI language follows Home Assistant's configured language automatically.
 * Supported languages: English (en), Spanish (es), Polish (pl), Czech
 * (cs), German (de), French (fr), Portuguese (pt), Italian (it).
 * Unsupported languages fall back to English. de/fr/pt/it are
 * machine-translated and not yet reviewed by a native speaker —
 * corrections welcome.
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
      timeFormat: "Time format",
      timeFormatAuto: "Automatic (system default)",
      timeFormat12: "12-hour (AM/PM)",
      timeFormat24: "24-hour",
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
      pressureDecimals: "Pressure decimal places (0-2, default: 2 for inHg, 0 otherwise)",
      pressureTrend: "Pressure trend (optional)",
      uvIndex: "UV index",
      illuminance: "Illuminance (lux)",
      solarRadiation: "Solar radiation (W/m²)",
      windSpeed: "Wind speed",
      windGust: "Gust speed",
      windDirection: "Wind direction (degrees)",
      rainRate: "Rain rate (mm/h)",
      rainRateWindow: "Rain rate peak window (minutes, 0 = instantaneous)",
      rainToday: "Today's rainfall (mm)",
      rainCumulative: "Rain sensor is a cumulative counter (never resets)",
      rainWindowHours: "Rain window (hours)",
      moisture: "Rain / moisture sensor (optional)",
      showTrend: "Show temperature trend chart",
      trendHours: "Hours of history to display",
      showHumidityTrend: "Overlay humidity trend (needs Relative humidity above)",
      trendChartHeight: "Chart height (px)",
      trendTempColor: "Temperature line color (default: green)",
      trendHumidityColor: "Humidity line color (default: blue)",
      showSunBar: "Show sun position bar",
      lightning: "Lightning",
      lightningStrikes: "Strike count sensor",
      lightningDistance: "Strike distance sensor",
      lastLightningTime: "Last strike time sensor",
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
      pressure: "Pressure",
      illuminance: "Illuminance",
      rainToday: "Today's total",
      rainSensor: "Rain sensor",
      noRain: "No rain",
      raining: "Raining",
      rainPeak: "Peak",
      feelsLike: "Feels like",
      windFrom: "Wind from",
      gust: "Gust",
      nightfallIn: "Nightfall in",
      sunriseIn: "Sunrise in",
      noHistory: "No recorder history available yet",
      lessThanMin: "less than 1 min",
      min: "min",
      dash: "—",
      strikeCount: "Strikes",
      lightningDistance: "Distance",
      lastStrike: "Last strike",
      agoFormat: "{0} ago",
      solarRadiation: "Solar radiation",
      noDetection: "No detection",
      day: "d",
    },
  },
  pl: {
    editor: {
      general: "Ogólne",
      thermalAir: "Temperatura / powietrze",
      wind: "Wiatr",
      rain: "Opady",
      trend: "Trend",
      name: "Nazwa (opcjonalnie)",
      timeFormat: "Format czasu",
      timeFormatAuto: "Automatyczny (domyślny systemowy)",
      timeFormat12: "12-godzinny (AM/PM)",
      timeFormat24: "24-godzinny",
      temperature: "Temperatura",
      apparentTemperature: "Temperatura odczuwalna",
      weatherCondition: "Ogólne warunki (encja pogody lub czujnik tekstowy)",
      battery: "Bateria stacji (opcjonalnie)",
      dewPoint: "Punkt rosy",
      windChill: "Temperatura odczuwalna przez wiatr",
      humidex: "Humidex",
      heatIndex: "Indeks ciepła",
      humidity: "Wilgotność względna",
      pressure: "Ciśnienie atmosferyczne",
      pressureDecimals: "Liczba miejsc po przecinku dla ciśnienia (0-2, domyślnie: 2 dla inHg, 0 w pozostałych przypadkach)",
      pressureTrend: "Trend ciśnienia (opcjonalnie)",
      uvIndex: "Indeks UV",
      illuminance: "Natężenie oświetlenia (lux)",
      solarRadiation: "Promieniowanie słoneczne (W/m²)",
      windSpeed: "Prędkość wiatru",
      windGust: "Prędkość porywów",
      windDirection: "Kierunek wiatru (stopnie)",
      rainRate: "Intensywność opadów (mm/h)",
      rainRateWindow: "Okno szczytu intensywności (minuty, 0 = wartość chwilowa)",
      rainToday: "Dzisiejsze opady (mm)",
      rainCumulative: "Czujnik opadów jest licznikiem całkowitym (nigdy się nie resetuje)",
      rainWindowHours: "Okres zliczania opadów (godziny)",
      moisture: "Czujnik deszczu / wilgoci (opcjonalnie)",
      showTrend: "Pokaż wykres trendu temperatury",
      trendHours: "Liczba godzin historii do wyświetlenia",
      showHumidityTrend: "Nałóż trend wilgotności (wymaga ustawienia Wilgotności względnej powyżej)",
      trendChartHeight: "Wysokość wykresu (px)",
      trendTempColor: "Kolor linii temperatury (domyślnie: zielony)",
      trendHumidityColor: "Kolor linii wilgotności (domyślnie: niebieski)",
      showSunBar: "Wyświetl położenie paska słonecznego",
      lightning: "Wyładowania atmosferyczne",
      lightningStrikes: "Czujnik liczby wyładowań",
      lightningDistance: "Czujnik odległości wyładowania",
      lastLightningTime: "Czujnik czasu ostatniego wyładowania",
    },

    conditions: {
      "clear-night": "Bezchmurnie (noc)",
      cloudy: "Pochmurno",
      fog: "Mgła",
      hail: "Grad",
      lightning: "Burza",
      "lightning-rainy": "Burza z deszczem",
      partlycloudy: "Częściowe zachmurzenie",
      pouring: "Ulewny deszcz",
      rainy: "Deszcz",
      snowy: "Śnieg",
      "snowy-rainy": "Deszcz ze śniegiem",
      sunny: "Słonecznie",
      windy: "Wietrznie",
      "windy-variant": "Wietrznie i pochmurno",
      exceptional: "Nietypowe warunki",
    },

    risk: {
      low: "Niskie",
      moderate: "Umiarkowane",
      high: "Wysokie",
      veryHigh: "Bardzo wysokie",
      dangerous: "Niebezpieczne",
      extreme: "Ekstremalne",
    },

    labels: {
      battery: "Bateria stacji",
      trend: "Trend temperatury",
      humidity: "Wilgotność",
      dewPoint: "Punkt rosy",
      windChill: "Odczuwalna przez wiatr",
      humidex: "Humidex",
      uvIndex: "Indeks UV",
      heatRisk: "Ryzyko upału",
      pressure: "Ciśnienie",
      illuminance: "Natężenie światła",
      rainToday: "Suma dzisiaj",
      rainSensor: "Czujnik deszczu",
      noRain: "Brak opadów",
      raining: "Pada",
      rainPeak: "Szczyt",
      feelsLike: "Odczuwalna",
      windFrom: "Wiatr z kierunku",
      gust: "Porywy",
      nightfallIn: "Zmrok za",
      sunriseIn: "Wschód słońca za",
      noHistory: "Brak dostępnej historii z rejestratora",
      lessThanMin: "mniej niż 1 min",
      min: "min",
      dash: "—",
      strikeCount: "Wyładowania",
      lightningDistance: "Odległość",
      lastStrike: "Ostatnie wyładowanie",
      agoFormat: "{0} temu",
      solarRadiation: "Promieniowanie słoneczne",
      noDetection: "Brak wykrycia",
      day: "d",
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
      timeFormat: "Formato de hora",
      timeFormatAuto: "Automático (según el sistema)",
      timeFormat12: "12 horas (AM/PM)",
      timeFormat24: "24 horas",
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
      pressureDecimals: "Decimales de presión (0-2, por defecto: 2 para inHg, 0 en el resto)",
      pressureTrend: "Tendencia de presión (opcional)",
      uvIndex: "Índice UV",
      illuminance: "Iluminancia (lux)",
      solarRadiation: "Radiación solar (W/m²)",
      windSpeed: "Velocidad del viento",
      windGust: "Velocidad de racha",
      windDirection: "Dirección del viento (grados)",
      rainRate: "Intensidad de lluvia (mm/h)",
      rainRateWindow: "Ventana de pico de intensidad (minutos, 0 = instantáneo)",
      rainToday: "Lluvia acumulada hoy (mm)",
      rainCumulative: "El sensor de lluvia es un contador acumulado (no se resetea)",
      rainWindowHours: "Ventana de lluvia (horas)",
      moisture: "Estado de lluvia / humedad sensor (opcional)",
      showTrend: "Mostrar gráfico de tendencia de temperatura",
      trendHours: "Horas de histórico a mostrar",
      showHumidityTrend: "Superponer tendencia de humedad (necesita Humedad relativa arriba)",
      trendChartHeight: "Altura del gráfico (px)",
      trendTempColor: "Color de la línea de temperatura (por defecto: verde)",
      trendHumidityColor: "Color de la línea de humedad (por defecto: azul)",
      showSunBar: "Ver la posición de la barra solar",
      lightning: "Rayos",
      lightningStrikes: "Sensor de número de rayos",
      lightningDistance: "Sensor de distancia del rayo",
      lastLightningTime: "Sensor de hora del último rayo",
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
      pressure: "Presión",
      illuminance: "Iluminancia",
      rainToday: "Acumulada hoy",
      rainSensor: "Sensor lluvia",
      noRain: "Sin lluvia",
      raining: "Lloviendo",
      rainPeak: "Pico",
      feelsLike: "Sensación",
      windFrom: "Viento del",
      gust: "Racha",
      nightfallIn: "Anochece en",
      sunriseIn: "Amanece en",
      noHistory: "Aún no hay histórico disponible",
      lessThanMin: "menos de 1 min",
      min: "min",
      dash: "—",
      strikeCount: "Rayos",
      lightningDistance: "Distancia",
      lastStrike: "Último rayo",
      agoFormat: "hace {0}",
      solarRadiation: "Radiación solar",
      noDetection: "Sin detección",
      day: "d",
    },
  },
  cs: {
    editor: {
      general: "Obecné",
      thermalAir: "Teplota / vzduch",
      wind: "Vítr",
      rain: "Déšť",
      trend: "Trend",
      name: "Název (volitelné)",
      timeFormat: "Formát času",
      timeFormatAuto: "Automaticky (systémový)",
      timeFormat12: "12hodinový (AM/PM)",
      timeFormat24: "24hodinový",
      temperature: "Teplota",
      apparentTemperature: "Pocitová teplota",
      weatherCondition: "Celkový stav (entity počasí nebo textový senzor)",
      battery: "Baterie stanice (volitelné)",
      dewPoint: "Rosný bod",
      windChill: "Wind chill",
      humidex: "Humidex",
      heatIndex: "Index tepelné zátěže",
      humidity: "Relativní vlhkost",
      pressure: "Atmosférický tlak",
      pressureDecimals: "Počet desetinných míst tlaku (0-2, výchozí: 2 pro inHg, jinak 0)",
      pressureTrend: "Trend tlaku (volitelné)",
      uvIndex: "UV index",
      illuminance: "Intenzita osvětlení (lux)",
      solarRadiation: "Solární radiace (W/m²)",
      windSpeed: "Rychlost větru",
      windGust: "Rychlost nárazu větru",
      windDirection: "Směr větru (ve stupních)",
      rainRate: "Intenzita deště (mm/h)",
      rainRateWindow: "Okno špičky deště (minuty, 0 = okamžitě)",
      rainToday: "Dnešní srážky (mm)",
      rainCumulative: "Dešťový senzor je kumulativní čítač (nikdy se neresetuje)",
      rainWindowHours: "Dešťové okno (hodiny)",
      moisture: "Senzor deště / vlhkosti (volitelné)",
      showTrend: "Zobrazit graf trendu teploty",
      trendHours: "Zobrazit historii za (hodin)",
      showHumidityTrend: "Překrýt trend vlhkosti (vyžaduje Relativní vlhkost výše)",
      trendChartHeight: "Výška grafu (px)",
      trendTempColor: "Barva čáry teploty (výchozí: zelená)",
      trendHumidityColor: "Barva čáry vlhkosti (výchozí: modrá)",
      showSunBar: "Zobrazit lištu polohy slunce",
      lightning: "Blesky",
      lightningStrikes: "Senzor počtu úderů",
      lightningDistance: "Senzor vzdálenosti úderu",
      lastLightningTime: "Senzor času posledního úderu",
    },
    conditions: {
      "clear-night": "Jasno (noc)",
      cloudy: "Zataženo",
      fog: "Mlha",
      hail: "Krupobití",
      lightning: "Bouřka",
      "lightning-rainy": "Bouřka s deštěm",
      partlycloudy: "Polojasno",
      pouring: "Slevák",
      rainy: "Déšť",
      snowy: "Sněžení",
      "snowy-rainy": "Déšť se sněhem",
      sunny: "Slunečno",
      windy: "Větrno",
      "windy-variant": "Větrno a zataženo",
      exceptional: "Mimořádné podmínky",
    },
    risk: { low: "Nízký", moderate: "Střední", high: "Vysoký", veryHigh: "Velmi vysoký", dangerous: "Nebezpečný", extreme: "Extrémní" },
    labels: {
      battery: "Baterie stanice",
      trend: "Trend teploty",
      humidity: "Vlhkost",
      dewPoint: "Rosný bod",
      windChill: "Wind chill",
      humidex: "Humidex",
      uvIndex: "UV index",
      heatRisk: "Tepelné riziko",
      pressure: "Tlak",
      illuminance: "Světlo",
      rainToday: "Dnes celkem",
      rainSensor: "Dešťový senzor",
      noRain: "Neprší",
      raining: "Prší",
      rainPeak: "Špička",
      feelsLike: "Pocitová",
      windFrom: "Směr",
      gust: "Nárazy",
      nightfallIn: "Stmívání za",
      sunriseIn: "Východ slunce za",
      noHistory: "Zatím není k dispozici žádná historie recorderu",
      lessThanMin: "méně než 1 min",
      min: "min",
      dash: "—",
      strikeCount: "Údery",
      lightningDistance: "Vzdálenost",
      lastStrike: "Poslední úder",
      agoFormat: "Před {0}",
      solarRadiation: "Solární radiace",
      noDetection: "Bez detekce",
      day: "d",
    },
  },
  // The languages below (de, fr, pt, it) are machine-translated and have
  // not been reviewed by a native speaker, unlike "es" and the
  // community-contributed "pl" and "cs" — they may contain mistakes or
  // awkward phrasing. Corrections via issue/PR are very welcome.
  de: {
    editor: {
      general: "Allgemein",
      thermalAir: "Temperatur / Luft",
      wind: "Wind",
      rain: "Regen",
      trend: "Trend",
      name: "Name (optional)",
      timeFormat: "Zeitformat",
      timeFormatAuto: "Automatisch (Systemstandard)",
      timeFormat12: "12-Stunden (AM/PM)",
      timeFormat24: "24-Stunden",
      temperature: "Temperatur",
      apparentTemperature: "Gefühlte Temperatur",
      weatherCondition: "Allgemeiner Zustand (Wetter-Entität oder Textsensor)",
      battery: "Stationsbatterie (optional)",
      dewPoint: "Taupunkt",
      windChill: "Windchill",
      humidex: "Humidex",
      heatIndex: "Hitzestress-Index",
      humidity: "Relative Luftfeuchtigkeit",
      pressure: "Luftdruck",
      pressureDecimals: "Nachkommastellen für Druck (0-2, Standard: 2 für inHg, sonst 0)",
      pressureTrend: "Druck-Trend (optional)",
      uvIndex: "UV-Index",
      illuminance: "Beleuchtungsstärke (Lux)",
      solarRadiation: "Sonneneinstrahlung (W/m²)",
      windSpeed: "Windgeschwindigkeit",
      windGust: "Böengeschwindigkeit",
      windDirection: "Windrichtung (Grad)",
      rainRate: "Regenintensität (mm/h)",
      rainRateWindow: "Spitzenfenster Regenintensität (Minuten, 0 = Momentanwert)",
      rainToday: "Heutiger Niederschlag (mm)",
      rainCumulative: "Regensensor ist ein kumulativer Zähler (setzt sich nie zurück)",
      rainWindowHours: "Regenfenster (Stunden)",
      moisture: "Regen-/Feuchtigkeitssensor (optional)",
      showTrend: "Temperaturtrend-Diagramm anzeigen",
      trendHours: "Anzuzeigende Stunden des Verlaufs",
      showHumidityTrend: "Feuchtigkeitstrend überlagern (benötigt relative Luftfeuchtigkeit oben)",
      trendChartHeight: "Diagrammhöhe (px)",
      trendTempColor: "Farbe der Temperaturlinie (Standard: grün)",
      trendHumidityColor: "Farbe der Feuchtigkeitslinie (Standard: blau)",
      showSunBar: "Position der Sonnenblende anzeigen",
      lightning: "Blitze",
      lightningStrikes: "Sensor Blitzanzahl",
      lightningDistance: "Sensor Blitzentfernung",
      lastLightningTime: "Sensor Zeit des letzten Blitzes",
    },
    conditions: {
      "clear-night": "Klar (Nacht)",
      cloudy: "Bewölkt",
      fog: "Nebel",
      hail: "Hagel",
      lightning: "Gewitter",
      "lightning-rainy": "Gewitter mit Regen",
      partlycloudy: "Teilweise bewölkt",
      pouring: "Starkregen",
      rainy: "Regnerisch",
      snowy: "Schnee",
      "snowy-rainy": "Schneeregen",
      sunny: "Sonnig",
      windy: "Windig",
      "windy-variant": "Windig und bewölkt",
      exceptional: "Außergewöhnliche Bedingungen",
    },
    risk: { low: "Niedrig", moderate: "Mäßig", high: "Hoch", veryHigh: "Sehr hoch", dangerous: "Gefährlich", extreme: "Extrem" },
    labels: {
      battery: "Stationsbatterie",
      trend: "Temperaturtrend",
      humidity: "Luftfeuchtigkeit",
      dewPoint: "Taupunkt",
      windChill: "Windchill",
      humidex: "Humidex",
      uvIndex: "UV-Index",
      heatRisk: "Hitzerisiko",
      pressure: "Druck",
      illuminance: "Beleuchtungsstärke",
      rainToday: "Heutige Summe",
      rainSensor: "Regensensor",
      noRain: "Kein Regen",
      raining: "Regnet",
      rainPeak: "Spitze",
      feelsLike: "Gefühlt wie",
      windFrom: "Wind aus",
      gust: "Böe",
      nightfallIn: "Dämmerung in",
      sunriseIn: "Sonnenaufgang in",
      noHistory: "Noch kein Recorder-Verlauf verfügbar",
      lessThanMin: "weniger als 1 Min",
      min: "Min",
      dash: "—",
      strikeCount: "Blitze",
      lightningDistance: "Entfernung",
      lastStrike: "Letzter Blitz",
      agoFormat: "vor {0}",
      solarRadiation: "Sonneneinstrahlung",
      noDetection: "Keine Erkennung",
      day: "T",
    },
  },
  fr: {
    editor: {
      general: "Général",
      thermalAir: "Thermique / air",
      wind: "Vent",
      rain: "Pluie",
      trend: "Tendance",
      name: "Nom (optionnel)",
      timeFormat: "Format de l'heure",
      timeFormatAuto: "Automatique (système)",
      timeFormat12: "12 heures (AM/PM)",
      timeFormat24: "24 heures",
      temperature: "Température",
      apparentTemperature: "Température ressentie",
      weatherCondition: "Condition générale (entité météo ou capteur texte)",
      battery: "Batterie de la station (optionnel)",
      dewPoint: "Point de rosée",
      windChill: "Refroidissement éolien",
      humidex: "Humidex",
      heatIndex: "Indice de stress thermique",
      humidity: "Humidité relative",
      pressure: "Pression atmosphérique",
      pressureDecimals: "Décimales de pression (0-2, par défaut : 2 pour inHg, sinon 0)",
      pressureTrend: "Tendance de la pression (optionnel)",
      uvIndex: "Indice UV",
      illuminance: "Éclairement (lux)",
      solarRadiation: "Radiation solaire (W/m²)",
      windSpeed: "Vitesse du vent",
      windGust: "Vitesse des rafales",
      windDirection: "Direction du vent (degrés)",
      rainRate: "Intensité de la pluie (mm/h)",
      rainRateWindow: "Fenêtre de pic d'intensité (minutes, 0 = instantané)",
      rainToday: "Pluie du jour (mm)",
      rainCumulative: "Le capteur de pluie est un compteur cumulatif (ne se réinitialise jamais)",
      rainWindowHours: "Fenêtre de pluie (heures)",
      moisture: "Capteur de pluie/humidité (optionnel)",
      showTrend: "Afficher le graphique de tendance de température",
      trendHours: "Heures d'historique à afficher",
      showHumidityTrend: "Superposer la tendance d'humidité (nécessite l'humidité relative ci-dessus)",
      trendChartHeight: "Hauteur du graphique (px)",
      trendTempColor: "Couleur de la ligne de température (par défaut : vert)",
      trendHumidityColor: "Couleur de la ligne d'humidité (par défaut : bleu)",
      showSunBar: "Afficher la barre de position du soleil",
      lightning: "Foudre",
      lightningStrikes: "Capteur nombre d'éclairs",
      lightningDistance: "Capteur distance du dernier éclair",
      lastLightningTime: "Capteur horodatage dernier éclair",
    },
    conditions: {
      "clear-night": "Dégagé (nuit)",
      cloudy: "Nuageux",
      fog: "Brouillard",
      hail: "Grêle",
      lightning: "Orage",
      "lightning-rainy": "Orage avec pluie",
      partlycloudy: "Partiellement nuageux",
      pouring: "Forte pluie",
      rainy: "Pluvieux",
      snowy: "Neigeux",
      "snowy-rainy": "Neige fondue",
      sunny: "Ensoleillé",
      windy: "Venteux",
      "windy-variant": "Venteux et nuageux",
      exceptional: "Conditions exceptionnelles",
    },
    risk: { low: "Faible", moderate: "Modéré", high: "Élevé", veryHigh: "Très élevé", dangerous: "Dangereux", extreme: "Extrême" },
    labels: {
      battery: "Batterie de la station",
      trend: "Tendance de température",
      humidity: "Humidité",
      dewPoint: "Point de rosée",
      windChill: "Refroidissement éolien",
      humidex: "Humidex",
      uvIndex: "Indice UV",
      heatRisk: "Risque de chaleur",
      pressure: "Pression",
      illuminance: "Éclairement",
      rainToday: "Total du jour",
      rainSensor: "Capteur de pluie",
      noRain: "Pas de pluie",
      raining: "Il pleut",
      rainPeak: "Pic",
      feelsLike: "Ressenti",
      windFrom: "Vent de",
      gust: "Rafale",
      nightfallIn: "Nuit dans",
      sunriseIn: "Lever du soleil dans",
      noHistory: "Aucun historique disponible pour le moment",
      lessThanMin: "moins d'1 min",
      min: "min",
      dash: "—",
      strikeCount: "Éclairs",
      lightningDistance: "Distance",
      lastStrike: "Dernier éclair",
      agoFormat: "il y a {0}",
      solarRadiation: "Radiation solaire",
      noDetection: "Aucune détection",
      day: "j",
    },
  },
  pt: {
    editor: {
      general: "Geral",
      thermalAir: "Térmico / ar",
      wind: "Vento",
      rain: "Chuva",
      trend: "Tendência",
      name: "Nome (opcional)",
      timeFormat: "Formato de hora",
      timeFormatAuto: "Automático (padrão do sistema)",
      timeFormat12: "12 horas (AM/PM)",
      timeFormat24: "24 horas",
      temperature: "Temperatura",
      apparentTemperature: "Sensação térmica",
      weatherCondition: "Condição geral (entidade de clima ou sensor de texto)",
      battery: "Bateria da estação (opcional)",
      dewPoint: "Ponto de orvalho",
      windChill: "Sensação de vento",
      humidex: "Humidex",
      heatIndex: "Índice de estresse térmico",
      humidity: "Umidade relativa",
      pressure: "Pressão atmosférica",
      pressureDecimals: "Casas decimais da pressão (0-2, padrão: 2 para inHg, senão 0)",
      pressureTrend: "Tendência de pressão (opcional)",
      uvIndex: "Índice UV",
      illuminance: "Iluminância (lux)",
      solarRadiation: "Radiação solar (W/m²)",
      windSpeed: "Velocidade do vento",
      windGust: "Velocidade de rajada",
      windDirection: "Direção do vento (graus)",
      rainRate: "Intensidade da chuva (mm/h)",
      rainRateWindow: "Janela de pico de intensidade (minutos, 0 = instantâneo)",
      rainToday: "Chuva de hoje (mm)",
      rainCumulative: "O sensor de chuva é um contador cumulativo (nunca reinicia)",
      rainWindowHours: "Janela de chuva (horas)",
      moisture: "Sensor de chuva/umidade (opcional)",
      showTrend: "Mostrar gráfico de tendência de temperatura",
      trendHours: "Horas de histórico a exibir",
      showHumidityTrend: "Sobrepor tendência de umidade (requer Umidade relativa acima)",
      trendChartHeight: "Altura do gráfico (px)",
      trendTempColor: "Cor da linha de temperatura (padrão: verde)",
      trendHumidityColor: "Cor da linha de umidade (padrão: azul)",
      showSunBar: "Apresentar a posição da barra de proteção solar",
      lightning: "Raios",
      lightningStrikes: "Sensor de contagem de raios",
      lightningDistance: "Sensor de distância do raio",
      lastLightningTime: "Sensor de horário do último raio",
    },
    conditions: {
      "clear-night": "Limpo (noite)",
      cloudy: "Nublado",
      fog: "Neblina",
      hail: "Granizo",
      lightning: "Tempestade",
      "lightning-rainy": "Tempestade com chuva",
      partlycloudy: "Parcialmente nublado",
      pouring: "Chuva forte",
      rainy: "Chuvoso",
      snowy: "Neve",
      "snowy-rainy": "Chuva com neve",
      sunny: "Ensolarado",
      windy: "Ventoso",
      "windy-variant": "Ventoso e nublado",
      exceptional: "Condições excepcionais",
    },
    risk: { low: "Baixo", moderate: "Moderado", high: "Alto", veryHigh: "Muito alto", dangerous: "Perigoso", extreme: "Extremo" },
    labels: {
      battery: "Bateria da estação",
      trend: "Tendência de temperatura",
      humidity: "Umidade",
      dewPoint: "Ponto de orvalho",
      windChill: "Sensação de vento",
      humidex: "Humidex",
      uvIndex: "Índice UV",
      heatRisk: "Risco de calor",
      pressure: "Pressão",
      illuminance: "Iluminância",
      rainToday: "Total de hoje",
      rainSensor: "Sensor de chuva",
      noRain: "Sem chuva",
      raining: "Chovendo",
      rainPeak: "Pico",
      feelsLike: "Sensação",
      windFrom: "Vento de",
      gust: "Rajada",
      nightfallIn: "Anoitecer em",
      sunriseIn: "Nascer do sol em",
      noHistory: "Ainda não há histórico disponível",
      lessThanMin: "menos de 1 min",
      min: "min",
      dash: "—",
      strikeCount: "Raios",
      lightningDistance: "Distância",
      lastStrike: "Último raio",
      agoFormat: "há {0}",
      solarRadiation: "Radiação solar",
      noDetection: "Sem detecção",
      day: "d",
    },
  },
  it: {
    editor: {
      general: "Generale",
      thermalAir: "Termico / aria",
      wind: "Vento",
      rain: "Pioggia",
      trend: "Tendenza",
      name: "Nome (opzionale)",
      timeFormat: "Formato ora",
      timeFormatAuto: "Automatico (predefinito di sistema)",
      timeFormat12: "12 ore (AM/PM)",
      timeFormat24: "24 ore",
      temperature: "Temperatura",
      apparentTemperature: "Temperatura percepita",
      weatherCondition: "Condizione generale (entità meteo o sensore testo)",
      battery: "Batteria stazione (opzionale)",
      dewPoint: "Punto di rugiada",
      windChill: "Percepita dal vento",
      humidex: "Humidex",
      heatIndex: "Indice di stress da calore",
      humidity: "Umidità relativa",
      pressure: "Pressione atmosferica",
      pressureDecimals: "Decimali della pressione (0-2, predefinito: 2 per inHg, altrimenti 0)",
      pressureTrend: "Tendenza della pressione (opzionale)",
      uvIndex: "Indice UV",
      illuminance: "Illuminamento (lux)",
      solarRadiation: "Radiazione solare (W/m²)",
      windSpeed: "Velocità del vento",
      windGust: "Velocità raffica",
      windDirection: "Direzione del vento (gradi)",
      rainRate: "Intensità pioggia (mm/h)",
      rainRateWindow: "Finestra di picco intensità (minuti, 0 = istantaneo)",
      rainToday: "Pioggia di oggi (mm)",
      rainCumulative: "Il sensore di pioggia è un contatore cumulativo (non si azzera mai)",
      rainWindowHours: "Finestra pioggia (ore)",
      moisture: "Sensore pioggia/umidità (opzionale)",
      showTrend: "Mostra grafico tendenza temperatura",
      trendHours: "Ore di storico da visualizzare",
      showHumidityTrend: "Sovrapponi tendenza umidità (richiede Umidità relativa sopra)",
      trendChartHeight: "Altezza grafico (px)",
      trendTempColor: "Colore della linea di temperatura (predefinito: verde)",
      trendHumidityColor: "Colore della linea di umidità (predefinito: blu)",
      showSunBar: "Visualizza la posizione della barra parasole",
      lightning: "Fulmini",
      lightningStrikes: "Sensore conteggio fulmini",
      lightningDistance: "Sensore distanza fulmine",
      lastLightningTime: "Sensore orario ultimo fulmine",
    },
    conditions: {
      "clear-night": "Sereno (notte)",
      cloudy: "Nuvoloso",
      fog: "Nebbia",
      hail: "Grandine",
      lightning: "Temporale",
      "lightning-rainy": "Temporale con pioggia",
      partlycloudy: "Parzialmente nuvoloso",
      pouring: "Pioggia intensa",
      rainy: "Piovoso",
      snowy: "Nevoso",
      "snowy-rainy": "Nevischio",
      sunny: "Soleggiato",
      windy: "Ventoso",
      "windy-variant": "Ventoso e nuvoloso",
      exceptional: "Condizioni eccezionali",
    },
    risk: { low: "Basso", moderate: "Moderato", high: "Alto", veryHigh: "Molto alto", dangerous: "Pericoloso", extreme: "Estremo" },
    labels: {
      battery: "Batteria stazione",
      trend: "Tendenza temperatura",
      humidity: "Umidità",
      dewPoint: "Punto di rugiada",
      windChill: "Percepita dal vento",
      humidex: "Humidex",
      uvIndex: "Indice UV",
      heatRisk: "Rischio caldo",
      pressure: "Pressione",
      illuminance: "Illuminamento",
      rainToday: "Totale odierno",
      rainSensor: "Sensore pioggia",
      noRain: "Nessuna pioggia",
      raining: "Piove",
      rainPeak: "Picco",
      feelsLike: "Percepita",
      windFrom: "Vento da",
      gust: "Raffica",
      nightfallIn: "Tramonto tra",
      sunriseIn: "Alba tra",
      noHistory: "Nessuno storico disponibile ancora",
      lessThanMin: "meno di 1 min",
      min: "min",
      dash: "—",
      strikeCount: "Fulmini",
      lightningDistance: "Distanza",
      lastStrike: "Ultimo fulmine",
      agoFormat: "{0} fa",
      solarRadiation: "Radiazione solare",
      noDetection: "Nessun rilevamento",
      day: "g",
    },
  },
};

// Shared tuning constants, pulled out of the render/fetch code below so
// the intent behind each magic number is named once instead of repeated.
const CHART_WIDTH = 300;
const CHART_PADDING = 3;
const DEFAULT_CHART_HEIGHT = 48;
const DEFAULT_TREND_HOURS = 6;
const DEFAULT_MINMAX_HOURS = 24;
const DEFAULT_RAIN_WINDOW_HOURS = 24;
const DEFAULT_RAIN_RATE_WINDOW_MINUTES = 5;
// Outdoor temperature essentially never swings by this much between two
// closely-spaced recorder samples under real weather — a jump this big
// is almost always a decode glitch, not a genuine reading. °F needs a
// larger raw number for the same real-world temperature delta (10°C of
// change == 18°F of change), hence the two separate constants.
const TEMP_OUTLIER_MAX_JUMP_C = 10;
const TEMP_OUTLIER_MAX_JUMP_F = 18;
function tempOutlierMaxJump(unit) {
  return String(unit || "").includes("F") ? TEMP_OUTLIER_MAX_JUMP_F : TEMP_OUTLIER_MAX_JUMP_C;
}
// Humidity is always 0-100 regardless of unit system, so this one can be
// a flat percentage-point threshold.
const HUMIDITY_OUTLIER_MAX_JUMP = 40;
// A cumulative rain counter should only ever go up. Some Zigbee-connected
// stations occasionally report a spurious 0 for one reading (e.g. a
// zigbee2mqtt device re-announce) and then resume from the real,
// unbroken total right after — filterOutliers already tells that pattern
// apart from a genuine reset (where the following readings stay near the
// new, lower baseline instead of jumping back). This threshold is
// generous enough to survive even a very heavy rain burst between two
// closely-spaced samples without misreading it as a reset-glitch.
const RAIN_OUTLIER_MAX_JUMP = 15;
const HISTORY_REFRESH_MS = 10 * 60 * 1000;
const SUN_REFRESH_MS = 60 * 1000;
// The rain-rate peak window slides in real time, so a spike that happened
// a few minutes ago silently falls out of it. A 10-minute refresh (fine for
// the other history-based fields, which move slowly) would regularly miss
// short spikes entirely: they'd age out of the window between refreshes
// without ever being shown. Refresh this one much more often instead.
const RAIN_RATE_PEAK_REFRESH_MS = 60 * 1000;
// On a dashboard with many cards, the initial burst of simultaneous
// history/period requests can cause one to time out or come back empty.
// Rather than wait out the full 10-minute refresh, failed fetches get
// one quick retry shortly after.
const QUICK_RETRY_MS = 15 * 1000;

// Shared risk/status palette, reused across the color ladders below
// (uvRisk, heatRisk, batteryIcon, trendInfo, the trend chart's temperature
// line) so the same shade always means the same thing across the card.
const COLORS = {
  info: "#3b82c4", // cold, rain, falling trend
  low: "#2ba86a", // low risk, healthy battery
  moderate: "#c78a00", // moderate risk, rising trend
  high: "#e0722c", // high risk, warm
  danger: "#d1481c", // dangerous risk, hot, low battery
  extreme: "#8a3ffc", // extreme risk
  neutral: "#8a92a3", // steady/unknown/default
};

function detectLang(hass) {
  // Home Assistant normally exposes the selected UI language in
  // hass.locale.language. Keep hass.language and the browser locale as
  // fallbacks for compatibility with older HA versions / initial rendering.
  const raw =
    (hass && hass.locale && hass.locale.language) ||
    (hass && hass.language) ||
    (typeof navigator !== "undefined" && navigator.language) ||
    "en";

  // Normalize values such as "pl-PL" and "pl_PL" to "pl".
  const lang = String(raw)
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .split("-")[0];

  // Use a translation only when it exists; otherwise fall back to English.
  return Object.prototype.hasOwnProperty.call(STRINGS, lang) ? lang : "en";
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
  if (c.includes("pour") || c.includes("rain")) return { icon: "mdi:weather-pouring", color: COLORS.info };
  if (c.includes("snow")) return { icon: "mdi:weather-snowy", color: "#8fb3d9" };
  if (c.includes("fog") || c.includes("mist") || c.includes("haze")) return { icon: "mdi:weather-fog", color: COLORS.neutral };
  if (c.includes("wind")) return { icon: "mdi:weather-windy", color: "#5a92a8" };
  if (c.includes("partly") || c.includes("partlycloudy")) return { icon: "mdi:weather-partly-cloudy", color: "#e0a53e" };
  if (c.includes("cloud")) return { icon: "mdi:weather-cloudy", color: COLORS.neutral };
  if (c.includes("clear") || c.includes("sun")) return { icon: "mdi:weather-sunny", color: "#f5a623" };
  return { icon: "mdi:weather-cloudy", color: COLORS.neutral };
}

function batteryIcon(pct) {
  if (pct === null || pct === undefined || isNaN(pct)) return { icon: "mdi:battery-unknown", color: COLORS.neutral };
  if (pct <= 10) return { icon: "mdi:battery-alert-variant-outline", color: COLORS.danger };
  if (pct <= 30) return { icon: "mdi:battery-low", color: COLORS.moderate };
  if (pct <= 60) return { icon: "mdi:battery-medium", color: COLORS.low };
  return { icon: "mdi:battery-high", color: COLORS.low };
}

// Risk scales, tuned for metric units. Returns { label, color }.
function uvRisk(v, lang) {
  const R = STRINGS[lang].risk;
  if (v === null || isNaN(v)) return { label: STRINGS[lang].labels.dash, color: "var(--primary-text-color, #1c2128)" };
  if (v >= 11) return { label: R.extreme, color: COLORS.extreme };
  if (v >= 8) return { label: R.veryHigh, color: COLORS.danger };
  if (v >= 6) return { label: R.high, color: COLORS.high };
  if (v >= 3) return { label: R.moderate, color: COLORS.moderate };
  return { label: R.low, color: COLORS.low };
}

// heat stress risk: Ecowitt reports this as a 0-100% risk score, not a
// temperature-equivalent index, so the scale is calibrated in percent.
function heatRisk(v, unit, lang) {
  const R = STRINGS[lang].risk;
  if (v === null || isNaN(v)) return { label: STRINGS[lang].labels.dash, color: "var(--primary-text-color, #1c2128)" };
  const isPercent = unit === "%" || (v >= 0 && v <= 100 && unit !== "°C" && unit !== "°F");
  if (isPercent) {
    if (v >= 80) return { label: R.extreme, color: COLORS.extreme };
    if (v >= 60) return { label: R.dangerous, color: COLORS.danger };
    if (v >= 40) return { label: R.high, color: COLORS.high };
    if (v >= 20) return { label: R.moderate, color: COLORS.moderate };
    return { label: R.low, color: COLORS.low };
  }
  // fallback: temperature-equivalent heat index scale (°C)
  if (v >= 51) return { label: R.extreme, color: COLORS.extreme };
  if (v >= 39) return { label: R.dangerous, color: COLORS.danger };
  if (v >= 32) return { label: R.high, color: COLORS.high };
  if (v >= 27) return { label: R.moderate, color: COLORS.moderate };
  return { label: R.low, color: COLORS.low };
}

// Solar radiation color ladder (W/m²): blue while low, green in the
// comfortable/typical range, yellow approaching very strong sun, red once
// it's intense. Thresholds only, no risk label needed for this one.
function solarRadiationColor(v) {
  if (v === null || v === undefined || isNaN(v)) return "var(--primary-text-color, #1c2128)";
  if (v >= 900) return COLORS.danger;
  if (v >= 700) return COLORS.moderate;
  if (v >= 300) return COLORS.low;
  return COLORS.info;
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
  if (dir === "rising") return { icon: "mdi:trending-up", color: COLORS.moderate };
  if (dir === "falling") return { icon: "mdi:trending-down", color: COLORS.info };
  return { icon: "mdi:trending-neutral", color: COLORS.neutral };
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

// Shared parser for HA's history/period response: turns the raw
// minimal_response payload into a clean, time-sorted { t, v } list.
function historyPoints(result) {
  if (!result || !result[0]) return [];
  return result[0]
    .map((p) => {
      const rawState = p.state !== undefined && p.state !== null ? p.state : p.s;
      const rawTime = p.last_changed ? p.last_changed : p.lu * 1000;
      return { t: new Date(rawTime).getTime(), v: parseFloat(rawState) };
    })
    .filter((p) => !isNaN(p.v) && !isNaN(p.t))
    .sort((a, b) => a.t - b.t);
}

// Drops lone glitch readings from a sorted points array — a dropped or
// corrupted sensor packet occasionally decodes as 0, or some other value
// with no relation to reality, showing up as a spike that snaps right
// back on the next reading. A point that deviates from the last
// *accepted* point by more than maxJump is kept only if the point right
// after it *doesn't* snap back close to that last-accepted value — i.e.
// only if what follows suggests a real, sustained change rather than a
// glitch-then-recovery. A deviating point at the very end of the series,
// with nothing after it to vouch for it, is dropped too: that's the most
// visible spot on a chart for a stray spike to show up. Deliberately
// doesn't special-case "value is exactly 0": 0 is a completely normal
// real reading for some fields (0°C, no rain), so only an implausible
// *jump* is treated as suspect, never a specific value.
function filterOutliers(points, maxJump) {
  if (points.length < 2) return points;
  const out = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    const last = out[out.length - 1];
    if (Math.abs(p.v - last.v) <= maxJump) {
      out.push(p);
      continue;
    }
    const next = points[i + 1];
    const sustained = next && Math.abs(next.v - last.v) > maxJump;
    if (sustained) out.push(p);
    // else: isolated blip (or an unconfirmed spike at the tail) — drop it.
  }
  return out;
}

// Builds a history/period URL for a single entity starting at startMs.
// entityId is user-configured (via YAML or the visual editor), so it's
// encoded rather than trusted as a safe URL fragment.
function historyUrl(entityId, startMs) {
  const start = new Date(startMs).toISOString();
  return `history/period/${start}?filter_entity_id=${encodeURIComponent(entityId)}&minimal_response&no_attributes`;
}

// Clamps a possibly-invalid config value (hand-written YAML isn't bound by
// the visual editor's min/max) to a sane range, falling back when it's not
// a finite number at all.
function clampNumber(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Config-driven colors get interpolated directly into SVG/CSS strings, so
// restrict to characters that can't break out of an attribute or inject
// markup — this covers every legitimate CSS color syntax (#hex, rgb(),
// hsl(), named colors) while rejecting anything else.
function sanitizeColor(value, fallback) {
  const v = String(value || "").trim();
  return v && /^[a-zA-Z0-9#(),.\s%]+$/.test(v) ? v : fallback;
}

function getFieldGroups(lang) {
  const E = STRINGS[lang].editor;
  return [
    {
      title: E.general,
      schema: [
        { name: "name", selector: { text: {} }, label: E.name },
        {
          name: "time_format",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: E.timeFormatAuto },
                { value: "12", label: E.timeFormat12 },
                { value: "24", label: E.timeFormat24 },
              ],
            },
          },
          label: E.timeFormat,
        },
        { name: "temperature", selector: { entity: { domain: "sensor", device_class: "temperature" } }, label: E.temperature },
        { name: "apparent_temperature", selector: { entity: { domain: "sensor", device_class: "temperature" } }, label: E.apparentTemperature },
        { name: "weather_condition", selector: { entity: {} }, label: E.weatherCondition },
        { name: "battery", selector: { entity: { domain: "sensor", device_class: "battery" } }, label: E.battery },
        { name: "show_sun_bar", selector: { boolean: {} }, label: E.showSunBar },
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
        { name: "pressure_decimals", selector: { number: { min: 0, max: 2, mode: "box" } }, label: E.pressureDecimals },
        { name: "pressure_trend", selector: { entity: {} }, label: E.pressureTrend },
        { name: "uv_index", selector: { entity: { domain: "sensor" } }, label: E.uvIndex },
        { name: "illuminance", selector: { entity: { domain: "sensor", device_class: "illuminance" } }, label: E.illuminance },
        { name: "solar_radiation", selector: { entity: { domain: "sensor", device_class: "irradiance" } }, label: E.solarRadiation },
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
        { name: "rain_rate_window_minutes", selector: { number: { min: 0, max: 60, mode: "box" } }, label: E.rainRateWindow },
        { name: "rain_today", selector: { entity: { domain: "sensor", device_class: "precipitation" } }, label: E.rainToday },
        { name: "rain_cumulative", selector: { boolean: {} }, label: E.rainCumulative },
        { name: "rain_window_hours", selector: { number: { min: 1, max: 168, mode: "box" } }, label: E.rainWindowHours },
        { name: "moisture", selector: { entity: {} }, label: E.moisture },
      ],
    },
    {
      title: E.trend,
      schema: [
        { name: "show_trend", selector: { boolean: {} }, label: E.showTrend },
        { name: "trend_hours", selector: { number: { min: 1, max: 24, mode: "box" } }, label: E.trendHours },
        { name: "show_humidity_trend", selector: { boolean: {} }, label: E.showHumidityTrend },
        { name: "trend_chart_height", selector: { number: { min: 24, max: 120, mode: "box" } }, label: E.trendChartHeight },
        { name: "trend_temp_color", selector: { text: {} }, label: E.trendTempColor },
        { name: "trend_humidity_color", selector: { text: {} }, label: E.trendHumidityColor },
      ],
    },
    {
      title: E.lightning,
      schema: [
        { name: "lightning_strikes", selector: { entity: { domain: "sensor" } }, label: E.lightningStrikes },
        { name: "lightning_distance", selector: { entity: { domain: "sensor" } }, label: E.lightningDistance },
        { name: "last_lightning", selector: { entity: { domain: "sensor" } }, label: E.lastLightningTime },
      ],
    },
  ];
}

class EcowittHudCardEditor extends HTMLElement {
  // The card treats a missing "show_sun_bar" as true (see the `!== false`
  // checks in EcowittHudCard), but ha-form's boolean selector shows an
  // unchecked toggle for any key that's simply absent from the config.
  // Backfilling the default here keeps what the editor displays in sync
  // with what the card actually does.
  _withDefaults(config) {
    return { show_sun_bar: true, ...(config || {}) };
  }
  setConfig(config) {
    this._config = this._withDefaults(config);
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
    const sunBarRelevant = !prev || prev.show_sun_bar !== newConfig.show_sun_bar;
    if (sunBarRelevant) {
      const showSunBar = newConfig.show_sun_bar !== false;
      this._els.dayBlock.style.display = showSunBar ? "" : "none";
      if (showSunBar) {
        this._updateSunBar();
        if (!this._sunInterval) {
          this._sunInterval = setInterval(() => this._updateSunBar(), SUN_REFRESH_MS);
        }
      } else if (this._sunInterval) {
        clearInterval(this._sunInterval);
        this._sunInterval = null;
      }
    }
    const trendRelevant =
      !prev ||
      prev.temperature !== newConfig.temperature ||
      prev.trend_hours !== newConfig.trend_hours ||
      prev.show_trend !== newConfig.show_trend ||
      prev.show_humidity_trend !== newConfig.show_humidity_trend ||
      prev.humidity !== newConfig.humidity;
    if (trendRelevant) {
      this._fetchTrend();
      this._fetchMinMax();
    } else if (
      prev &&
      (prev.trend_chart_height !== newConfig.trend_chart_height ||
        prev.trend_temp_color !== newConfig.trend_temp_color ||
        prev.trend_humidity_color !== newConfig.trend_humidity_color)
    ) {
      // purely cosmetic — re-render with the already-fetched data instead
      // of hitting the history API again just to change the chart height
      // or colors
      this._renderTrend();
    }
    const rainWindowRelevant =
      !prev ||
      prev.rain_today !== newConfig.rain_today ||
      prev.rain_cumulative !== newConfig.rain_cumulative ||
      prev.rain_window_hours !== newConfig.rain_window_hours;
    if (rainWindowRelevant) {
      this._fetchRainWindow();
    }
    const rainRatePeakRelevant =
      !prev ||
      prev.rain_rate !== newConfig.rain_rate ||
      prev.rain_rate_window_minutes !== newConfig.rain_rate_window_minutes;
    if (rainRatePeakRelevant) {
      this._fetchRainRatePeak();
    }
  }
  set hass(hass) {
    const hadHass = !!this._hass;
    const previousLang = this._builtLang;

    this._hass = hass;

    const currentLang = detectLang(hass);

    // setConfig() may run before HA supplies `hass`, so the card can initially
    // be built using the browser/default language. Rebuild whenever the real
    // Home Assistant language differs. This also handles a language change
    // without requiring a Home Assistant restart.
    if (!this._els || previousLang !== currentLang) {
      this._buildStatic();
      return;
    }

    this._update();

    // The rain-rate peak window is short (minutes) enough that waiting out
    // even the fast periodic refresh can show a stale value for a
    // meaningful fraction of the window. Re-fetch immediately whenever the
    // live entity actually changes — same responsiveness as the plain
    // live fields — instead of only on a timer. (The other history-backed
    // fields use hours-long windows, where that lag is negligible, so they
    // don't need this.) The periodic refresh still runs too, since it's
    // the only thing that notices the peak needs to decay after rain
    // stops and the entity stops pushing new states entirely.
    const rrEntity = this._config && this._config.rain_rate;
    if (rrEntity && this._hass) {
      const st = this._hass.states[rrEntity];
      const marker = st ? st.last_changed || st.state : null;
      // _buildStatic() (triggered from setConfig() or a language change)
      // already does its own initial fetch and returns before reaching
      // this code, so _lastRainRateMarker can still be unset the first
      // time this actually runs. Gate on that directly, rather than on
      // hadHass, so this first evaluation always just seeds the baseline
      // instead of firing a redundant duplicate fetch.
      if (this._lastRainRateMarker !== undefined && marker !== this._lastRainRateMarker) {
        this._fetchRainRatePeak();
      }
      this._lastRainRateMarker = marker;
    }

    if (!hadHass) {
      // same lifecycle issue affects the history-based fetches below
      this._fetchTrend();
      this._fetchMinMax();
      this._fetchRainWindow();
      this._fetchRainRatePeak();
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
        .hero-minmax .arrow-up { color: ${COLORS.danger}; font-weight: 600; }
        .hero-minmax .arrow-down { color: ${COLORS.info}; font-weight: 600; }
        .hero-minmax .mm-time { color: var(--secondary-text-color, #8a92a3); margin-left: 2px; }
        .battery { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
        .battery-row { display: flex; align-items: center; gap: 5px; }
        .battery-pct { font-size: 15px; font-weight: 600; }
        .battery-label { font-size: 9px; color: var(--secondary-text-color, #70788a); }
        .trend { padding: 12px 0 14px; }
        .trend-label { font-size: 9px; letter-spacing: .08em; color: var(--secondary-text-color, #8a92a3); margin-bottom: 5px; text-transform: uppercase; }
        .trend-chart-row { display: flex; align-items: stretch; gap: 8px; }
        .trend-unavailable { font-size: 11px; color: var(--secondary-text-color, #8a92a3); padding: 4px 0; }
        .trend-svg-wrap { position: relative; flex: 1; min-width: 0; cursor: crosshair; }
        .trend-svg { width: 100%; display: block; }
        .trend-axis-col { flex: none; display: flex; flex-direction: column; justify-content: space-between; font-size: 9px; color: var(--secondary-text-color, #8a92a3); text-align: left; padding: 1px 0; }
        .trend-axis-col.right { text-align: right; color: ${COLORS.info}; }
        .trend-crosshair { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--divider-color, rgba(0,0,0,.25)); pointer-events: none; }
        .trend-tooltip { position: absolute; top: -6px; transform: translate(-50%, -100%); background: var(--card-background-color, #fff); border: 1px solid var(--divider-color, rgba(0,0,0,.12)); border-radius: 6px; padding: 4px 8px; font-size: 10.5px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,.18); pointer-events: none; z-index: 2; color: var(--primary-text-color, #1c2128); }
        .trend-tooltip .tt-time { color: var(--secondary-text-color, #8a92a3); margin-right: 5px; }
        .trend-tooltip .tt-temp { font-weight: 600; }
        .trend-tooltip .tt-hum { font-weight: 600; margin-left: 5px; }
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
        .wind-compass ha-icon { position: absolute; --mdc-icon-size: 20px; transform-origin: center center; transition: transform .35s ease; }
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
        .lightning-row { padding-bottom: 16px; }
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
          <div class="trend-unavailable" style="display:none;">${S.labels.noHistory}</div>
          <div class="trend-chart-row">
            <div class="trend-axis-col left">
              <span class="trend-max"></span>
              <span class="trend-min"></span>
            </div>
            <div class="trend-svg-wrap">
              <svg class="trend-svg" viewBox="0 0 300 32" preserveAspectRatio="none"></svg>
              <div class="trend-crosshair" style="display:none;"></div>
              <div class="trend-tooltip" style="display:none;"></div>
            </div>
            <div class="trend-axis-col right" style="display:none;">
              <span class="trend-max-h"></span>
              <span class="trend-min-h"></span>
            </div>
          </div>
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
            <ha-icon icon="mdi:navigation" class="wind-arrow" style="color:${COLORS.info};"></ha-icon>
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
          <div class="stat clickable" data-k="pressure"><div class="stat-val"><span class="v"></span><span class="stat-unit u"></span> <ha-icon class="trend-icon" style="--mdc-icon-size:14px;vertical-align:-2px;"></ha-icon></div><div class="stat-label">${S.labels.pressure}</div></div>
          <div class="stat clickable" data-k="illuminance"><div class="stat-val"><span class="v"></span><span class="stat-unit u"></span></div><div class="stat-label">${S.labels.illuminance}</div></div>
          <div class="stat clickable" data-k="solar_radiation"><div class="stat-val"><span class="v"></span><span class="stat-unit u"></span></div><div class="stat-label">${S.labels.solarRadiation}</div></div>
        </div>
        <div class="row rain">
          <div class="stat clickable" data-k="rain_rate">
            <div class="rain-val"><ha-icon class="rain-icon" style="--mdc-icon-size:18px;"></ha-icon><span class="v"></span> <span class="stat-unit u"></span></div>
            <div class="rain-sub moisture-sub"></div>
          </div>
          <div class="stat clickable" data-k="rain_today">
            <div class="rain-val"><span class="v"></span> <span class="stat-unit u"></span></div>
            <div class="rain-sub rain-today-sub">${S.labels.rainToday}</div>
          </div>
          <div class="stat clickable" data-k="moisture">
            <div class="rain-val"><span class="v"></span></div>
            <div class="rain-sub">${S.labels.rainSensor}</div>
          </div>
        </div>
        <div class="row rain lightning-row" style="display:none;">
          <div class="stat clickable" data-k="lightning_strikes">
            <div class="rain-val"><ha-icon class="lightning-icon" icon="mdi:weather-lightning" style="--mdc-icon-size:18px;color:#8a63c9;"></ha-icon><span class="v"></span></div>
            <div class="stat-label">${S.labels.strikeCount}</div>
          </div>
          <div class="stat clickable" data-k="lightning_distance">
            <div class="rain-val"><span class="v"></span> <span class="stat-unit u"></span></div>
            <div class="stat-label">${S.labels.lightningDistance}</div>
          </div>
          <div class="stat clickable" data-k="last_lightning">
            <div class="rain-val"><span class="v"></span></div>
            <div class="stat-label">${S.labels.lastStrike}</div>
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
    const trendSvgWrap = root.querySelector(".trend-svg-wrap");
    if (trendSvgWrap) {
      trendSvgWrap.addEventListener("mousemove", (ev) => this._onTrendHover(ev.clientX));
      trendSvgWrap.addEventListener("mouseleave", () => this._hideTrendTooltip());
    }

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
      rainTodaySub: root.querySelector(".rain-today-sub"),
      dayBlock: root.querySelector(".day"),
      dayFill: root.querySelector(".day-fill"),
      dayMarker: root.querySelector(".day-marker"),
      dayCaption: root.querySelector(".day-caption"),
      edgeStartIcon: root.querySelector(".edge-start-icon"),
      edgeStartLbl: root.querySelector(".edge-start-lbl"),
      edgeEndIcon: root.querySelector(".edge-end-icon"),
      edgeEndLbl: root.querySelector(".edge-end-lbl"),
      trendBlock: root.querySelector("#trend-block"),
      trendUnavailable: root.querySelector(".trend-unavailable"),
      trendChartRow: root.querySelector(".trend-chart-row"),
      trendSvg: root.querySelector(".trend-svg"),
      trendSvgWrap: root.querySelector(".trend-svg-wrap"),
      trendCrosshair: root.querySelector(".trend-crosshair"),
      trendTooltip: root.querySelector(".trend-tooltip"),
      trendMin: root.querySelector(".trend-min"),
      trendMax: root.querySelector(".trend-max"),
      trendAxisLeft: root.querySelector(".trend-axis-col.left"),
      trendAxisRight: root.querySelector(".trend-axis-col.right"),
      trendMinH: root.querySelector(".trend-min-h"),
      trendMaxH: root.querySelector(".trend-max-h"),
      trendHoursLbl: root.querySelector(".trend-hours-lbl"),
      gridBlock: root.querySelector(".grid"),
      rainBlock: root.querySelector(".row.rain"),
      lightningBlock: root.querySelector(".lightning-row"),
      stats: {},
    };
    root.querySelectorAll(".stat[data-k]").forEach((el) => {
      this._els.stats[el.dataset.k] = {
        val: el.querySelector(".v"),
        unit: el.querySelector(".u"),
        root: el,
        valEl: el.querySelector(".stat-val") || el.querySelector(".rain-val"),
      };
    });
    this._update();
    this._fetchTrend();
    this._fetchMinMax();
    this._fetchRainWindow();
    this._fetchRainRatePeak();
    if (!this._trendInterval) {
      this._trendInterval = setInterval(() => this._fetchTrend(), HISTORY_REFRESH_MS);
    }
    if (!this._sunInterval && this._config.show_sun_bar !== false) {
      this._sunInterval = setInterval(() => this._updateSunBar(), SUN_REFRESH_MS);
    }
    if (!this._minMaxInterval) {
      this._minMaxInterval = setInterval(() => this._fetchMinMax(), HISTORY_REFRESH_MS);
    }
    if (!this._rainWindowInterval) {
      this._rainWindowInterval = setInterval(() => this._fetchRainWindow(), HISTORY_REFRESH_MS);
    }
    if (!this._rainRatePeakInterval) {
      this._rainRatePeakInterval = setInterval(() => this._fetchRainRatePeak(), RAIN_RATE_PEAK_REFRESH_MS);
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
    if (this._rainWindowInterval) {
      clearInterval(this._rainWindowInterval);
      this._rainWindowInterval = null;
    }
    if (this._rainRatePeakInterval) {
      clearInterval(this._rainRatePeakInterval);
      this._rainRatePeakInterval = null;
    }
    if (this._trendRetryTimer) {
      clearTimeout(this._trendRetryTimer);
      this._trendRetryTimer = null;
    }
    if (this._minMaxRetryTimer) {
      clearTimeout(this._minMaxRetryTimer);
      this._minMaxRetryTimer = null;
    }
    if (this._rainWindowRetryTimer) {
      clearTimeout(this._rainWindowRetryTimer);
      this._rainWindowRetryTimer = null;
    }
    if (this._rainRatePeakRetryTimer) {
      clearTimeout(this._rainRatePeakRetryTimer);
      this._rainRatePeakRetryTimer = null;
    }
  }
  _timeStr(d) {
    if (!d || isNaN(d.getTime())) return "—";
    const opts = { hour: "2-digit", minute: "2-digit" };
    const fmt = this._config && this._config.time_format;
    if (fmt === "12") opts.hour12 = true;
    else if (fmt === "24") opts.hour12 = false;
    // "auto" (or unset) intentionally omits hour12 so the browser/system
    // locale's own default decides, matching the user's OS/HA settings.
    return d.toLocaleTimeString([], opts);
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
  // Wraps a duration with the language's "X ago" phrasing (word order
  // varies: English trails "ago", French/Spanish/Portuguese lead with it).
  // Below 24h this reuses _durationStr's "Xh Ym" format; beyond that it
  // switches to a day-based format ("3j 5h") since minutes stop being a
  // useful unit for something that happened days ago.
  _agoStr(ms) {
    const L = STRINGS[this._lang()].labels;
    if (ms === null || isNaN(ms)) return L.dash;
    if (ms <= 0) return (L.agoFormat || "{0}").replace("{0}", L.lessThanMin);
    const totalMin = Math.round(ms / 60000);
    if (totalMin >= 1440) {
      const days = Math.floor(totalMin / 1440);
      const remHours = Math.floor((totalMin % 1440) / 60);
      const dur = remHours > 0 ? `${days}${L.day} ${remHours}h` : `${days}${L.day}`;
      return (L.agoFormat || "{0}").replace("{0}", dur);
    }
    const dur = this._durationStr(ms);
    return (L.agoFormat || "{0}").replace("{0}", dur);
  }
  _showTrendMessage(show) {
    const els = this._els;
    if (els.trendUnavailable) els.trendUnavailable.style.display = show ? "" : "none";
    if (els.trendChartRow) els.trendChartRow.style.display = show ? "none" : "";
  }
  async _fetchTrend(isRetry) {
    if (this._trendRetryTimer) {
      clearTimeout(this._trendRetryTimer);
      this._trendRetryTimer = null;
    }
    const c = this._config;
    if (!this._hass || !this._els || !this._els.trendBlock) return;
    if (c.show_trend === false || !c.temperature) {
      this._els.trendBlock.style.display = "none";
      return;
    }
    const hours = clampNumber(c.trend_hours, 1, 24, DEFAULT_TREND_HOURS);
    const startMs = Date.now() - hours * 3600 * 1000;
    this._trendFetchToken = (this._trendFetchToken || 0) + 1;
    const token = this._trendFetchToken;

    let points = [];
    try {
      const result = await this._hass.callApi("GET", historyUrl(c.temperature, startMs));
      if (token !== this._trendFetchToken) return;
      const tempUnit = fmt(this._hass, c.temperature, 1).unit;
      points = filterOutliers(historyPoints(result), tempOutlierMaxJump(tempUnit));
    } catch (e) {
      if (token !== this._trendFetchToken) return;
      points = [];
    }

    this._els.trendBlock.style.display = "";
    this._els.trendHoursLbl.textContent = `(${hours}h)`;

    if (points.length <= 1) {
      this._showTrendMessage(true);
      // A dashboard with many cards can make the very first history
      // request fail or come back empty while things are still settling.
      // Retry once shortly instead of waiting for the 10-minute interval.
      if (!isRetry) this._trendRetryTimer = setTimeout(() => this._fetchTrend(true), QUICK_RETRY_MS);
      return;
    }
    this._showTrendMessage(false);
    this._trendData = points;
    this._trendWindowStart = startMs;

    this._humidityTrendData = null;
    if (c.show_humidity_trend && c.humidity) {
      try {
        const humResult = await this._hass.callApi("GET", historyUrl(c.humidity, startMs));
        if (token !== this._trendFetchToken) return;
        const humPoints = filterOutliers(historyPoints(humResult), HUMIDITY_OUTLIER_MAX_JUMP);
        if (humPoints.length > 1) this._humidityTrendData = humPoints;
      } catch (e) {
        // humidity history unavailable; temperature trend still renders alone
      }
    }

    this._renderTrend();
  }
  async _fetchMinMax(isRetry) {
    if (this._minMaxRetryTimer) {
      clearTimeout(this._minMaxRetryTimer);
      this._minMaxRetryTimer = null;
    }
    const c = this._config;
    if (!c.temperature || !this._hass || !this._els || !this._els.heroMinMax) return;
    const startMs = Date.now() - DEFAULT_MINMAX_HOURS * 3600 * 1000;
    this._minMaxFetchToken = (this._minMaxFetchToken || 0) + 1;
    const token = this._minMaxFetchToken;
    let ok = false;
    try {
      const result = await this._hass.callApi("GET", historyUrl(c.temperature, startMs));
      if (token !== this._minMaxFetchToken) return;
      const tempUnit = fmt(this._hass, c.temperature, 1).unit;
      const points = filterOutliers(historyPoints(result), tempOutlierMaxJump(tempUnit));

      // include the live current reading too, in case it hasn't landed
      // in the recorder yet as a distinct history point
      const current = fmt(this._hass, c.temperature, 1);
      if (current.value !== null) points.push({ t: Date.now(), v: current.value });

      if (points.length > 0) {
        ok = true;
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
    } catch (e) {
      if (token !== this._minMaxFetchToken) return;
      // history API not available; leave the line empty
    }
    if (!ok && !isRetry) this._minMaxRetryTimer = setTimeout(() => this._fetchMinMax(true), QUICK_RETRY_MS);
  }
  // For counters that never reset (e.g. a Zigbee2MQTT lifetime precipitation
  // total), the raw state is meaningless on its own — this sums only the
  // positive increments seen across the window, so a counter reset partway
  // through (station reboot, etc.) doesn't turn into a bogus negative total.
  async _fetchRainWindow(isRetry) {
    if (this._rainWindowRetryTimer) {
      clearTimeout(this._rainWindowRetryTimer);
      this._rainWindowRetryTimer = null;
    }
    const c = this._config;
    if (!c.rain_today || !c.rain_cumulative || !this._hass) {
      this._rainWindowValue = null;
      this._update();
      return;
    }
    const hours = clampNumber(c.rain_window_hours, 1, 168, DEFAULT_RAIN_WINDOW_HOURS);
    const startMs = Date.now() - hours * 3600 * 1000;
    this._rainWindowFetchToken = (this._rainWindowFetchToken || 0) + 1;
    const token = this._rainWindowFetchToken;
    try {
      const result = await this._hass.callApi("GET", historyUrl(c.rain_today, startMs));
      if (token !== this._rainWindowFetchToken) return;
      const points = filterOutliers(historyPoints(result), RAIN_OUTLIER_MAX_JUMP);
      const current = fmt(this._hass, c.rain_today, 1);
      if (current.value !== null) points.push({ t: Date.now(), v: current.value });
      let total = 0;
      for (let i = 1; i < points.length; i++) {
        const diff = points[i].v - points[i - 1].v;
        if (diff > 0) total += diff;
      }
      this._rainWindowValue = points.length > 0 ? total : null;
    } catch (e) {
      if (token !== this._rainWindowFetchToken) return;
      this._rainWindowValue = null;
    }
    this._update();
    if (this._rainWindowValue === null && !isRetry) {
      this._rainWindowRetryTimer = setTimeout(() => this._fetchRainWindow(true), QUICK_RETRY_MS);
    }
  }
  // Instantaneous rain-rate sensors derived from a tipping-bucket gauge are
  // extremely spiky — they report a real rate for a moment after each tip
  // and settle back to 0 between them, so reading the live state at a random
  // moment shows 0 far more often than not, even mid-downpour. Showing the
  // peak over a short recent window is far more representative of "is it
  // raining hard right now" than the instantaneous value.
  async _fetchRainRatePeak(isRetry) {
    if (this._rainRatePeakRetryTimer) {
      clearTimeout(this._rainRatePeakRetryTimer);
      this._rainRatePeakRetryTimer = null;
    }
    const c = this._config;
    const minutes = clampNumber(c.rain_rate_window_minutes, 0, 60, DEFAULT_RAIN_RATE_WINDOW_MINUTES);
    if (!c.rain_rate || !this._hass || minutes <= 0) {
      this._rainRatePeakValue = null;
      this._update();
      return;
    }
    const startMs = Date.now() - minutes * 60 * 1000;
    this._rainRatePeakFetchToken = (this._rainRatePeakFetchToken || 0) + 1;
    const token = this._rainRatePeakFetchToken;
    try {
      const result = await this._hass.callApi("GET", historyUrl(c.rain_rate, startMs));
      if (token !== this._rainRatePeakFetchToken) return;
      const points = historyPoints(result);
      const current = fmt(this._hass, c.rain_rate, 1);
      if (current.value !== null) points.push({ t: Date.now(), v: current.value });
      this._rainRatePeakValue = points.length > 0 ? Math.max(...points.map((p) => p.v)) : null;
    } catch (e) {
      if (token !== this._rainRatePeakFetchToken) return;
      this._rainRatePeakValue = null;
    }
    this._update();
    if (this._rainRatePeakValue === null && !isRetry) {
      this._rainRatePeakRetryTimer = setTimeout(() => this._fetchRainRatePeak(true), QUICK_RETRY_MS);
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
    const w = CHART_WIDTH, pad = CHART_PADDING;
    const h = clampNumber(this._config && this._config.trend_chart_height, 24, 120, DEFAULT_CHART_HEIGHT);
    els.trendSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    els.trendSvg.style.height = `${h}px`;
    // Shared time axis for both series, anchored to the requested window
    // (not just the observed data points), so temperature and humidity
    // line up correctly even if their last recorder updates differ.
    const t0 = this._trendWindowStart || pts[0].t;
    const t1 = Date.now();
    const tRange = t1 - t0 || 1;
    this._trendXDomain = { t0, tRange };
    const xFor = (t) => Math.max(pad, Math.min(w - pad, pad + ((t - t0) / tRange) * (w - pad * 2)));
    const yFor = (v, vmin, vrange) => h - pad - ((v - vmin) / vrange) * (h - pad * 2);

    const coords = pts.map((p) => `${xFor(p.t).toFixed(1)},${yFor(p.v, min, range).toFixed(1)}`);
    const c = this._config || {};
    const color = sanitizeColor(c.trend_temp_color, COLORS.low);
    const humColor = sanitizeColor(c.trend_humidity_color, COLORS.info);
    this._trendHumColor = humColor;
    const line = coords.join(" ");
    const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;

    let humidityLine = "";
    const hum = this._humidityTrendData;
    if (hum && hum.length > 1) {
      const hValues = hum.map((p) => p.v);
      const hMin = Math.min(...hValues);
      const hMax = Math.max(...hValues);
      const hRange = hMax - hMin || 1;
      const hCoords = hum.map((p) => `${xFor(p.t).toFixed(1)},${yFor(p.v, hMin, hRange).toFixed(1)}`);
      humidityLine = `<polyline points="${hCoords.join(" ")}" fill="none" stroke="${humColor}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"></polyline>`;
      els.trendMinH.textContent = `${hMin.toFixed(0)}%`;
      els.trendMaxH.textContent = `💧 ${hMax.toFixed(0)}%`;
      els.trendAxisRight.style.display = "";
    } else {
      els.trendAxisRight.style.display = "none";
    }

    els.trendSvg.innerHTML = `
      <polygon points="${area}" fill="${color}22"></polygon>
      <polyline points="${line}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"></polyline>
      ${humidityLine}
    `;
    els.trendMin.textContent = `${min.toFixed(1)}°`;
    // A small marker on the top value of each axis column identifies
    // which line it belongs to without relying on color alone — helpful
    // since both colors are user-configurable and could end up close to
    // each other.
    els.trendMax.textContent = `🌡️ ${max.toFixed(1)}°`;
    if (els.trendAxisLeft) els.trendAxisLeft.style.color = color;
    if (els.trendAxisRight) els.trendAxisRight.style.color = humColor;
  }
  _nearestPoint(series, targetT) {
    if (!series || series.length === 0) return null;
    let best = series[0];
    let bestDiff = Math.abs(series[0].t - targetT);
    for (const p of series) {
      const diff = Math.abs(p.t - targetT);
      if (diff < bestDiff) {
        best = p;
        bestDiff = diff;
      }
    }
    return best;
  }
  _onTrendHover(clientX) {
    const els = this._els;
    if (!els || !els.trendSvgWrap || !this._trendXDomain || !this._trendData || this._trendData.length < 2) return;
    const rect = els.trendSvgWrap.getBoundingClientRect();
    if (!rect.width) return;
    let frac = (clientX - rect.left) / rect.width;
    frac = Math.max(0, Math.min(1, frac));
    const { t0, tRange } = this._trendXDomain;
    const targetT = t0 + frac * tRange;

    const tempPoint = this._nearestPoint(this._trendData, targetT);
    if (!tempPoint) return;
    const humPoint = this._nearestPoint(this._humidityTrendData, targetT);

    const time = this._timeStr(new Date(tempPoint.t));
    let html = `<span class="tt-time">${time}</span><span class="tt-temp">${tempPoint.v.toFixed(1)}°</span>`;
    if (humPoint) html += `<span class="tt-hum" style="color:${this._trendHumColor || COLORS.info}">${humPoint.v.toFixed(0)}%</span>`;
    els.trendTooltip.innerHTML = html;
    els.trendTooltip.style.display = "";
    els.trendCrosshair.style.display = "";

    const xPx = frac * rect.width;
    els.trendCrosshair.style.left = `${xPx}px`;
    const tooltipWidth = els.trendTooltip.offsetWidth || 60;
    const clampedX = Math.max(tooltipWidth / 2, Math.min(rect.width - tooltipWidth / 2, xPx));
    els.trendTooltip.style.left = `${clampedX}px`;
  }
  _hideTrendTooltip() {
    const els = this._els;
    if (!els || !els.trendTooltip) return;
    els.trendTooltip.style.display = "none";
    if (els.trendCrosshair) els.trendCrosshair.style.display = "none";
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
    els.windArrow.style.transform = windDirVal.value !== null ? `rotate(${windDirVal.value}deg) translateY(-29px) rotate(180deg)` : "none";
    els.windDirLabel.textContent = windDirVal.value !== null ? compassLabel(windDirVal.value) : "";

    const setStat = (key, val, unit, color) => {
      const s = els.stats[key];
      if (!s) return;
      const configured = !!c[key];
      s.root.style.display = configured ? "" : "none";
      if (!configured) return;
      s.val.textContent = val;
      if (s.unit) s.unit.textContent = unit || "";
      if (s.valEl) s.valEl.style.color = color || "var(--primary-text-color, #1c2128)";
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
    // hPa is conventionally shown as a whole number, but inHg needs two
    // decimal places to be meaningful at all (its whole range of typical
    // readings spans only ~28-31) — default to whichever fits the unit,
    // but let pressure_decimals override it either way.
    const pressureDecimalsDefault = (pressure.unit || "").toLowerCase().includes("inhg") ? 2 : 0;
    const pressureDecimals = clampNumber(c.pressure_decimals, 0, 2, pressureDecimalsDefault);
    const pressureText = pressure.value !== null ? pressure.value.toFixed(pressureDecimals) : pressure.text;
    setStat("pressure", pressureText, pressure.unit || "hPa");
    const trend = trendInfo(c.pressure_trend, hass);
    if (trend) {
      els.trendIcon.style.display = "";
      els.trendIcon.setAttribute("icon", trend.icon);
      els.trendIcon.style.color = trend.color;
    } else {
      els.trendIcon.style.display = "none";
    }

    const lux = fmt(hass, c.illuminance, 0);
    setStat("illuminance", lux.value !== null && lux.value >= 1000 ? `${(lux.value / 1000).toFixed(1)}k` : lux.text, lux.unit || "lx");

    const radiation = fmt(hass, c.solar_radiation, 0);
    setStat("solar_radiation", radiation.text, radiation.unit || "W/m²", solarRadiationColor(radiation.value));

    const rainRate = fmt(hass, c.rain_rate, 1);
    // "Raining now" (icon + color) always reflects the live instantaneous
    // reading, even when the big number below shows a recent peak instead —
    // otherwise the icon would keep saying "raining" for the rest of the
    // peak window after the rain has actually stopped.
    const raining = rainRate.value !== null && rainRate.value > 0;
    els.rainIcon.setAttribute("icon", raining ? "mdi:weather-pouring" : "mdi:water-outline");
    els.rainIcon.style.color = raining ? COLORS.info : COLORS.neutral;
    const peakMinutes = clampNumber(c.rain_rate_window_minutes, 0, 60, DEFAULT_RAIN_RATE_WINDOW_MINUTES);
    if (peakMinutes > 0) {
      const peakText = this._rainRatePeakValue !== null && this._rainRatePeakValue !== undefined ? this._rainRatePeakValue.toFixed(1) : "—";
      setStat("rain_rate", peakText, rainRate.unit || "mm/h");
      els.moistureSub.textContent = `${S.labels.rainPeak} (${peakMinutes}min)`;
    } else {
      setStat("rain_rate", rainRate.text, rainRate.unit || "mm/h");
      els.moistureSub.textContent = raining ? S.labels.raining : S.labels.noRain;
    }

    const rainToday = fmt(hass, c.rain_today, 1);
    const rainTodayUnit = rainToday.unit || "mm";
    if (c.rain_cumulative) {
      const hours = clampNumber(c.rain_window_hours, 1, 168, DEFAULT_RAIN_WINDOW_HOURS);
      const windowText = this._rainWindowValue !== null && this._rainWindowValue !== undefined ? this._rainWindowValue.toFixed(1) : "—";
      setStat("rain_today", windowText, rainTodayUnit);
      els.rainTodaySub.textContent = `${S.labels.rainToday} (${hours}h)`;
    } else {
      setStat("rain_today", rainToday.text, rainTodayUnit);
      els.rainTodaySub.textContent = S.labels.rainToday;
    }

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

    // Lightning: strike count and distance follow the same generic
    // numeric-sensor pattern as the grid/rain stats above.
    const strikes = fmt(hass, c.lightning_strikes, 0);
    setStat("lightning_strikes", strikes.text, strikes.unit);

    // Ecowitt lightning sensors report a fixed 40 km when no strike has
    // been detected (it's the sensor's max range, not a real reading), so
    // treat that value as "no detection" instead of showing "40.0 km".
    const lightningDist = fmt(hass, c.lightning_distance, 1);
    if (lightningDist.value !== null && Math.abs(lightningDist.value - 40) < 0.05) {
      setStat("lightning_distance", S.labels.noDetection, "");
    } else {
      setStat("lightning_distance", lightningDist.text, lightningDist.unit || "km");
    }

    // Last strike is a timestamp sensor, not a plain number, so it's
    // rendered manually as a relative "X ago" string instead of via fmt().
    const lastLightningStat = els.stats.last_lightning;
    if (lastLightningStat) {
      const configured = !!c.last_lightning;
      lastLightningStat.root.style.display = configured ? "" : "none";
      if (configured) {
        const st = c.last_lightning && hass.states[c.last_lightning];
        let text = S.labels.dash;
        if (st && st.state && st.state !== "unknown" && st.state !== "unavailable") {
          const t = new Date(st.state).getTime();
          if (!isNaN(t)) {
            const diff = Date.now() - t;
            text = diff >= 0 ? this._agoStr(diff) : this._timeStr(new Date(t));
          } else {
            text = st.state;
          }
        }
        lastLightningStat.val.textContent = text;
      }
    }

    const gridKeys = ["humidity", "dew_point", "wind_chill", "humidex", "uv_index", "heat_index", "pressure", "illuminance", "solar_radiation"];
    els.gridBlock.style.display = gridKeys.some((k) => !!c[k]) ? "" : "none";

    const rainKeys = ["rain_rate", "rain_today", "moisture"];
    els.rainBlock.style.display = rainKeys.some((k) => !!c[k]) ? "" : "none";

    const lightningKeys = ["lightning_strikes", "lightning_distance", "last_lightning"];
    els.lightningBlock.style.display = lightningKeys.some((k) => !!c[k]) ? "" : "none";

    els.dayBlock.style.display = c.show_sun_bar !== false ? "" : "none";
    if (c.show_sun_bar !== false) {
      this._updateSunBar();
    }
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
  name: "Weather Station Card (Ecowitt & more)",
  description: "Instrument-panel weather card for Home Assistant — built for Ecowitt, works with any compatible weather station",
});
