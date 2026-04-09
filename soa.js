// ════════════════════════════════════════════════════════════
// state.js — Estado global de la aplicación SGDP-UPS
// Gestiona RAT registrados, riesgos y persistencia localStorage
// ════════════════════════════════════════════════════════════

var STATE = {
  rat:   [],   // RAT registrados en esta sesión
  risks: [],   // Riesgos EIPD registrados en esta sesión
  PS:    10    // Page size para tablas
};

// ── PERSISTENCIA localStorage ─────────────────────────────
var LS_RAT   = 'sgdp_ups_rat_2026';
var LS_RISKS = 'sgdp_ups_risks_2026';

function stateLoad() {
  try {
    var r = localStorage.getItem(LS_RAT);
    if (r) STATE.rat = JSON.parse(r);
    var ri = localStorage.getItem(LS_RISKS);
    if (ri) STATE.risks = JSON.parse(ri);
  } catch(e) {
    console.warn('No se pudo cargar estado desde localStorage:', e);
  }
}

function stateSaveRAT() {
  try { localStorage.setItem(LS_RAT, JSON.stringify(STATE.rat)); } catch(e) {}
}

function stateSaveRisks() {
  try { localStorage.setItem(LS_RISKS, JSON.stringify(STATE.risks)); } catch(e) {}
}

function stateAddRAT(entry) {
  STATE.rat.push(entry);
  stateSaveRAT();
}

function stateAddRisk(entry) {
  STATE.risks.push(entry);
  stateSaveRisks();
}

// ── MACROS derivados de PROCS ─────────────────────────────
var MACROS = [];
(function() {
  var seen = {};
  PROCS.forEach(function(p) {
    if (!seen[p.mac]) { seen[p.mac] = true; MACROS.push(p.mac); }
  });
  MACROS.sort();
})();

// Cargar estado al arrancar
stateLoad();
