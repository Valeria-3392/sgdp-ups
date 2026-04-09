# Contexto para Claude Code — SGDP-UPS 2026

Este documento contiene todo el contexto institucional y las instrucciones para que Claude Code expanda este proyecto.

---

## ¿Qué es este proyecto?

La **app SGDP-UPS** es el sistema web de gestión de datos personales de la **Universidad Politécnica Salesiana (UPS)**, desarrollado por la Gestora PDP **Valeria Ordóñez Segarra** en la **Procuraduría** bajo la Procuradora Ana María Reino Molina.

La app implementa el cumplimiento de la **LOPDP** (Ley Orgánica de Protección de Datos Personales de Ecuador) alineada con:
- **ISO/IEC 27701:2025** (Sistema de Gestión de la Privacidad de la Información)
- **Guía SPDP Edición 2 (2026)** de la Superintendencia de Protección de Datos Personales
- **Art. 38 RLOPDP** (Registro de Actividades de Tratamiento)
- **Art. 44 LOPDP** (Evaluación de Impacto — EIPD/DPIA)

---

## Datos institucionales clave

- **Institución:** Universidad Politécnica Salesiana
- **RUC:** 0190155698001
- **DPD correo:** dpd@ups.edu.ec (NO mostrar nombre de la DPD en campos visibles)
- **Gestora PDP:** Valeria Ordóñez Segarra · vordonezs@ups.edu.ec
- **Sedes:** Cuenca (sede principal), Quito, Guayaquil
- **Macroprocesos:** 27 macroprocesos institucionales
- **Procedimientos Fase 9:** 226 procedimientos aprobados y distribuidos
- **Data Owners:** 66 designados (49 completos, 17 pendientes de Steward)
- **Autoridad reguladora:** Superintendencia de Protección de Datos Personales (SPDP)

---

## Estado actual del código

El proyecto es una app **HTML + JavaScript puro, sin frameworks**, con los siguientes archivos:

```
index.html          ← entrada principal con sidebar y páginas vacías
data/
  procedimientos.js ← 226 procs Fase 9 (var PROCS)
  owners.js         ← 66 Data Owners (var OWNERS)
  soa.js            ← 27 controles SOA (var SOA_DATA)
src/css/main.css    ← design system completo
src/js/
  state.js          ← STATE global + localStorage
  nav.js            ← navegación entre páginas
  dashboard.js      ← renderDashboard() + drawDashCov()
  rat.js            ← renderRAT() + selectProc() + saveRAT()
  eipd.js           ← renderEIPD() + calcR() + saveRisk()
  soa.js            ← renderSOA() + drawSOA()
  owners.js         ← renderOwners() + drawO() + genOficio()
  procedimientos.js ← renderProcedimientos() + drawP()
  app.js            ← init()
```

---

## Lo que necesito que hagas (instrucciones para Claude Code)

### TAREA 1 — Verificar que el proyecto funciona
```bash
python3 -m http.server 8080
# Abrir http://localhost:8080 y verificar que:
# - El sidebar navega entre páginas
# - El dashboard muestra métricas y cobertura RAT
# - El RAT permite seleccionar procedimientos y guardar
# - Los Data Owners muestran los 66 registros con paginación
```

### TAREA 2 — Agregar persistencia real con localStorage
En `src/js/state.js`, la función `stateLoad()` ya lee de localStorage. Verificar que:
- Los RAT guardados persisten al recargar la página
- Los riesgos EIPD persisten al recargar
- Agregar un botón "Exportar RAT a CSV" en la página de procedimientos

### TAREA 3 — Módulo MTGE (Gran Escala)
Crear `src/js/mtge.js` con la calculadora de Medidas Técnicas y Organizativas de Gran Escala, fiel a la **Resolución SPDP-SPD-2026-0005-R**. Los 6 criterios con puntajes DECIMALES oficiales son:
- **C1:** Volumen de datos (1, 2, 3, 4) — UPS = Nacional (2 puntos, 3 sedes)
- **C2:** Diversidad de datos (0.5, 1, 2, 3)
- **C3:** Ubicación geográfica (0.5, 2, 3)
- **C4:** Datos de niños/adolescentes (0.5, 1, 2)
- **C5:** Datos de personas con discapacidad (0.5, 1, 2)
- **C6:** Duración del tratamiento (1, 2, 3)
- **Máximo:** 17 puntos · **Umbral:** P ≥ 6 = Gran Escala
- Agregar al sidebar como nuevo ítem en "Cumplimiento"

### TAREA 4 — Módulo Interés Legítimo
Crear `src/js/interes_legitimo.js` fiel a la **Res. SPDP-SPD-2025-0041-R, Anexo 1**:
- **E1:** Idoneidad (test de fin legítimo)
- **E2:** Necesidad (test de mínima intervención)
- **E3:** Ponderación (interés legítimo vs. derechos del titular)
- **E4:** Medidas de seguridad
- **E5:** Conclusión con regla de duda Art. 5 LOPDP
- Solo aplica al sector privado

### TAREA 5 — Exportar a Word (docx)
En el módulo `owners.js`, la función `genOficio()` actualmente muestra un alert.  
Implementarla para generar un documento Word (.docx) real con:
- Membrete UPS
- Cuerpo del oficio de designación de Steward
- Firma: Valeria Ordóñez Segarra, Gestora PDP
- Usar la librería `docx` de npm o `jsPDF` según disponibilidad

### TAREA 6 — Modo impresión / exportar a PDF
Agregar un botón "Exportar a PDF" en el dashboard que genere un reporte ejecutivo del estado del SGDP con métricas, cobertura RAT y alertas críticas.

---

## Guía de estilos del proyecto

El design system usa variables CSS definidas en `src/css/main.css`:
- **Color primario (morado):** `--cp: #534AB7` con escala `--cpl`, `--cpd`
- **Color éxito (verde):** `--ct: #0F6E56` (teal/UPS)
- **Color alerta:** `--ca: #BA7517` (amber)
- **Color peligro:** `--cr: #A32D2D` (rojo)
- **Fuente:** DM Sans (cuerpo) + DM Mono (códigos)
- **Superficies:** fondo `--bg: #F7F6F3`, blanco `--surface: #FFFFFF`

---

## Notas importantes

1. **No usar frameworks** (React, Vue, Angular) — la app debe seguir siendo HTML + JS puro para que DTIC pueda hospedarla sin instalaciones
2. **No usar Node.js en el cliente** — todo debe correr en el navegador sin build step
3. **Los datos en `/data/*.js` son los datos oficiales de UPS** — no modificar los valores, solo la estructura si es necesario
4. **El campo `dpd@ups.edu.ec` es el correo institucional del DPD** — nunca mostrar el nombre de la persona DPD en campos visibles de la app
5. **Los 226 procedimientos y 66 Data Owners son datos reales** — no agregar datos ficticios
6. **La Guía SPDP Edición 2 (2026) aplica** — todos los cálculos deben usar umbral USD 12.000 (no 60.000) y fórmula R=(P)×(I×V) para vulnerables

---

## Archivos que NO debes modificar sin confirmación

- `data/procedimientos.js` — datos oficiales UPS
- `data/owners.js` — datos oficiales UPS
- `src/css/main.css` — design system establecido

---

## Contacto del proyecto

**Valeria Ordóñez Segarra**  
Gestora de Protección de Datos Personales · Procuraduría UPS  
vordonezs@ups.edu.ec
