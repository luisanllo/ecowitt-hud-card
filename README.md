# Ecowitt HUD Card

Tarjeta personalizada de Lovelace para Home Assistant, pensada para estaciones
meteorológicas Ecowitt. Muestra temperatura, sensación térmica, máxima/mínima
del día, viento con brújula, presión con tendencia, riesgo por calor y UV,
lluvia, y una barra de posición del sol (orto/ocaso) con cuenta atrás.

Cada dato es pulsable y abre el diálogo de histórico nativo de Home Assistant.

## Instalación vía HACS

1. HACS → menú de tres puntos (arriba a la derecha) → **Repositorios personalizados**
2. URL: `https://github.com/TU_USUARIO/ecowitt-hud-card`
3. Categoría: **Dashboard**
4. Buscar "Ecowitt HUD Card" en HACS → Descargar
5. Añadir el recurso si HACS no lo hace automáticamente:
   - URL: `/hacsfiles/ecowitt-hud-card/ecowitt-hud-card.js`
   - Tipo: Módulo JavaScript

## Configuración

Todos los campos apuntan a entidades de tu propia instalación — sustituye
los `entity_id` de ejemplo por los de tu estación (dependen del nombre que
le diste al dispositivo Ecowitt en Home Assistant). Solo `temperature` es
obligatorio; el resto son opcionales y la tarjeta oculta lo que no rellenes.

```yaml
type: custom:ecowitt-hud-card
name: Estación Meteorológica
temperature: sensor.mi_estacion_temperature
apparent_temperature: sensor.mi_estacion_apparent_temperature
weather_condition: sensor.mi_estacion_weather_condition
battery: sensor.mi_estacion_battery
dew_point: sensor.mi_estacion_dew_point
wind_chill: sensor.mi_estacion_wind_chill
humidex: sensor.mi_estacion_humidex
heat_index: sensor.mi_estacion_heat_stress
humidity: sensor.mi_estacion_humidity
pressure: sensor.mi_estacion_pressure
pressure_trend: sensor.mi_estacion_pressure_trend
uv_index: sensor.mi_estacion_uv_index
illuminance: sensor.mi_estacion_illuminance
wind_speed: sensor.mi_estacion_wind_speed
wind_gust: sensor.mi_estacion_gust_speed
wind_direction: sensor.mi_estacion_wind_direction
rain_rate: sensor.mi_estacion_rain_rate
rain_today: sensor.mi_estacion_precipitation
moisture: binary_sensor.mi_estacion_rain_status
```

También tiene editor visual: puedes rellenar los campos desde la UI en vez de YAML.

## Notas

- `heat_index` se interpreta automáticamente como % de riesgo o como índice
  en grados, según la unidad que reporte tu sensor.
- El gráfico de tendencia y la máxima/mínima diaria requieren que la entidad
  de temperatura tenga histórico en el recorder de Home Assistant.
- La barra de sol usa la entidad `sun.sun` de Home Assistant; no requiere
  configuración adicional.
