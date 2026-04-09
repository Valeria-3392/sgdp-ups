// ════════════════════════════════════════════════════════════
// rat.js — Registro de Actividades de Tratamiento
// Art. 38 RLOPDP · Formulario RAT-PROCEDIMIENTO UPS
// ════════════════════════════════════════════════════════════

var RAT_MODE = 'proc';
var RAT_PAGE = 1;

function renderRAT() {
  var pg = document.getElementById('page-rat');
  pg.innerHTML = `
    <div class="ph">
      <div class="ph-row">
        <div>
          <div class="ph-title">Registro de Actividades de Tratamiento</div>
          <div class="ph-sub">Art. 38 RLOPDP · Formulario RAT-PROCEDIMIENTO UPS · Gestora PDP: Valeria Ordóñez · vordonezs@ups.edu.ec</div>
        </div>
        <button class="btn" onclick="nav('dashboard')">← Volver</button>
      </div>
    </div>

    <div id="rat-picker">
      <div class="card">
        <div class="card-title">Seleccionar procedimiento Fase 9</div>
        <div class="flex-row" style="margin-bottom:12px;">
          <button class="btn btn-primary btn-sm" id="rm-proc" onclick="setRM('proc')">Procedimiento aprobado</button>
          <button class="btn btn-sm" id="rm-libre" onclick="setRM('libre')">Actividad libre (instructivo, etc.)</button>
        </div>
        <div class="filters">
          <input type="text" id="rps" placeholder="Buscar procedimiento o código..." oninput="rpdraw()">
          <select id="rpm" onchange="rpdraw()">
            <option value="">Todos los macroprocesos</option>
          </select>
        </div>
        <div class="tbl-wrap"><table>
          <thead><tr>
            <th style="width:44%">Procedimiento</th>
            <th style="width:18%">Código</th>
            <th style="width:24%">Data Owner</th>
            <th style="width:14%"></th>
          </tr></thead>
          <tbody id="rp-tb"></tbody>
        </table></div>
        <div class="pager">
          <button onclick="rppg(-1)">‹</button>
          <span id="rppi"></span>
          <button onclick="rppg(1)">›</button>
        </div>
      </div>
    </div>

    <div id="rat-form" style="display:none;">
      <div id="rat-al" class="alert al-t" style="display:none;"></div>
      <div class="stepper" id="rat-stepper"></div>

      <div class="card">
        <div class="card-title">Sección 1 — Identificación del tratamiento</div>
        <div class="fgrid">
          <div class="field"><label>Código *</label><input type="text" id="rf-cod" class="mono"></div>
          <div class="field"><label>Nombre del procedimiento *</label><input type="text" id="rf-nom"></div>
          <div class="field"><label>Macroproceso</label><input type="text" id="rf-mac"></div>
          <div class="field"><label>Data Owner</label><input type="text" id="rf-own"></div>
          <div class="field">
            <label>Sede *</label>
            <select id="rf-sede">
              <option value="">—</option>
              <option>Cuenca</option><option>Quito</option><option>Guayaquil</option><option>Todas</option>
            </select>
          </div>
          <div class="field"><label>Nombre actividad de tratamiento *</label><input type="text" id="rf-act" placeholder="Ej: Registro de aspirantes en formulario web"></div>
          <div class="field"><label>Responsable del tratamiento</label><input type="text" id="rf-resp" value="Universidad Politécnica Salesiana — RUC: 0190155698001"></div>
          <div class="field"><label>DPD / Canal de contacto</label><input type="text" id="rf-dpd" value="dpd@ups.edu.ec · vordonezs@ups.edu.ec"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Sección 2 — Datos y base jurídica</div>
        <div class="fgrid">
          <div class="field">
            <label>Base jurídica — Art. 7 LOPDP *</label>
            <select id="rf-base" onchange="chkBase()">
              <option value="">Seleccionar...</option>
              <option>Consentimiento del titular</option>
              <option>Obligación legal</option>
              <option>Cumplimiento contractual</option>
              <option>Interés público</option>
              <option>Interés vital</option>
              <option>Interés legítimo</option>
            </select>
          </div>
          <div class="field">
            <label>¿Datos sensibles? Art. 25 LOPDP</label>
            <select id="rf-sens" onchange="chkSens()">
              <option value="">—</option><option value="no">No</option><option value="si">Sí</option>
            </select>
          </div>
          <div class="field">
            <label>Nivel de riesgo del tratamiento</label>
            <select id="rf-riesgo">
              <option value="">—</option>
              <option value="bajo">Bajo</option>
              <option value="medio">Medio</option>
              <option value="alto">Alto — requiere EIPD (Art. 44 LOPDP)</option>
            </select>
          </div>
          <div class="field"><label>Plazo de conservación</label><input type="text" id="rf-plazo" placeholder="Ej: vigencia + 7 años (LOES Art. 75)"></div>
          <div class="field"><label>Normativa que sustenta el tratamiento</label><input type="text" id="rf-norma" placeholder="Ej: LOES Art. 71 · LOPDP Art. 7 lit. b"></div>
          <div class="field"><label>Canal de ejercicio ARCO+</label><input type="text" id="rf-arco" value="dpd@ups.edu.ec · vordonezs@ups.edu.ec"></div>
        </div>
        <div id="rat-al-sens" class="alert al-r" style="display:none;margin-top:10px;">⚠ Datos sensibles detectados — base legitimadora reforzada requerida (Art. 9 LOPDP)</div>
        <div id="rat-al-il" class="alert al-a" style="display:none;margin-top:10px;">⚠ Interés legítimo — debes documentar el test de ponderación (Res. SPDP-SPD-2025-0041-R, Anexo 1)</div>
      </div>

      <div class="card">
        <div class="card-title">Sección 3 — Destinatarios y transferencias</div>
        <div class="fgrid">
          <div class="field"><label>Destinatarios internos</label><input type="text" id="rf-dest-int" placeholder="Ej: DTIC, Bienestar Universitario"></div>
          <div class="field"><label>Encargados externos (Art. 28)</label><input type="text" id="rf-encargado" placeholder="Ej: BestKloud USA, ZHM Seguros"></div>
          <div class="field">
            <label>¿Transferencia internacional?</label>
            <select id="rf-trint">
              <option value="">—</option><option value="no">No</option><option value="si">Sí — Art. 55 LOPDP</option>
            </select>
          </div>
          <div class="field"><label>País(es) destino transferencia</label><input type="text" id="rf-pais" placeholder="Ej: Estados Unidos (BestKloud / AWS)"></div>
        </div>
      </div>

      <div class="flex-row">
        <button class="btn btn-success" onclick="saveRAT()">Guardar RAT</button>
        <button class="btn btn-primary" onclick="launchEIPD()">Iniciar EIPD para este tratamiento →</button>
        <button class="btn" onclick="resetRAT()">Cancelar</button>
      </div>
    </div>
  `;

  // Poblar select de macroprocesos
  var sel = document.getElementById('rpm');
  MACROS.forEach(function(m) {
    var o = document.createElement('option'); o.value = m; o.textContent = m; sel.appendChild(o);
  });
  rpdraw();
}

function setRM(m) {
  RAT_MODE = m;
  var bp = document.getElementById('rm-proc');
  var bl = document.getElementById('rm-libre');
  if (bp) { bp.className = 'btn btn-sm' + (m === 'proc' ? ' btn-primary' : ''); }
  if (bl) { bl.className = 'btn btn-sm' + (m === 'libre' ? ' btn-primary' : ''); }
  if (m === 'libre') {
    document.getElementById('rat-picker').style.display = 'none';
    document.getElementById('rat-form').style.display = '';
    var al = document.getElementById('rat-al');
    al.style.display = ''; al.className = 'alert al-a';
    al.textContent = 'Actividad libre — completa todos los campos manualmente';
    ['rf-cod','rf-nom','rf-mac','rf-own'].forEach(function(id) {
      var el = document.getElementById(id); if (el) el.value = '';
    });
    buildStepper(2);
  }
}

function rpfilt() {
  var q = (document.getElementById('rps') ? document.getElementById('rps').value : '').toLowerCase();
  var fm = document.getElementById('rpm') ? document.getElementById('rpm').value : '';
  return PROCS.filter(function(p) {
    return (!q || p.nom.toLowerCase().includes(q) || p.cod.toLowerCase().includes(q))
      && (!fm || p.mac === fm);
  });
}

function rpdraw() { RAT_PAGE = 1; _rpdraw(); }
function _rpdraw() {
  var rows = rpfilt(), tot = rows.length, pgs = Math.ceil(tot / STATE.PS) || 1;
  var sl = rows.slice((RAT_PAGE - 1) * STATE.PS, RAT_PAGE * STATE.PS);
  var h = '';
  sl.forEach(function(p) {
    var catBd = p.cat === 'Estratégicos' ? 'bd-p' : p.cat === 'Clave - Misional' ? 'bd-t' : p.cat === 'Servicio Comunitario' ? 'bd-a' : 'bd-g';
    var done = STATE.rat.find(function(r) { return r.cod === p.cod; });
    h += '<tr class="row-click">'
      + '<td><span style="font-weight:500;">' + p.nom + '</span><br>'
      + '<span class="badge ' + catBd + '">' + p.cat + '</span>'
      + (done ? ' <span class="badge bd-t">✓ RAT</span>' : '') + '</td>'
      + '<td class="mono" style="font-size:11px;color:var(--text2);">' + p.cod + '</td>'
      + '<td style="font-size:12px;color:var(--text2);">' + p.own + '</td>'
      + '<td><button class="btn btn-primary btn-sm" onclick="selectProc(\'' + p.cod + '\')">Iniciar RAT</button></td>'
      + '</tr>';
  });
  if (!sl.length) h = '<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text3);">Sin resultados</td></tr>';
  document.getElementById('rp-tb').innerHTML = h;
  document.getElementById('rppi').textContent = 'Pág.' + RAT_PAGE + '/' + pgs + ' (' + tot + ')';
}
function rppg(d) {
  var rows = rpfilt(), pgs = Math.ceil(rows.length / STATE.PS) || 1;
  RAT_PAGE = Math.max(1, Math.min(pgs, RAT_PAGE + d));
  _rpdraw();
}

function selectProc(cod) {
  var p = PROCS.find(function(x) { return x.cod === cod; });
  if (!p) return;
  document.getElementById('rat-picker').style.display = 'none';
  document.getElementById('rat-form').style.display = '';
  document.getElementById('rf-cod').value = p.cod;
  document.getElementById('rf-nom').value = p.nom;
  document.getElementById('rf-mac').value = p.mac;
  document.getElementById('rf-own').value = p.own;
  var al = document.getElementById('rat-al');
  al.style.display = ''; al.className = 'alert al-t';
  al.textContent = 'Datos precargados: ' + p.cod + ' — ' + p.nom + ' · Data Owner: ' + p.own;
  buildStepper(2);
}

function buildStepper(active) {
  var steps = ['Seleccionar', 'Identificación', 'Datos y base', 'Guardar'];
  var h = '';
  steps.forEach(function(l, i) {
    var n = i + 1;
    if (i > 0) h += '<div class="step-sep"></div>';
    var cls = n < active ? 'step-done' : n === active ? 'step-active' : 'step-todo';
    h += '<div style="display:flex;align-items:center;gap:5px;">'
      + '<div class="step-dot ' + cls + '">' + (n < active ? '✓' : n) + '</div>'
      + '<span class="step-label' + (n === active ? ' active' : '') + '">' + l + '</span></div>';
  });
  var el = document.getElementById('rat-stepper');
  if (el) el.innerHTML = h;
}

function chkSens() {
  var el = document.getElementById('rat-al-sens');
  if (el) el.style.display = document.getElementById('rf-sens').value === 'si' ? '' : 'none';
}
function chkBase() {
  var el = document.getElementById('rat-al-il');
  if (el) el.style.display = document.getElementById('rf-base').value === 'Interés legítimo' ? '' : 'none';
}

function saveRAT() {
  var cod = document.getElementById('rf-cod') ? document.getElementById('rf-cod').value.trim() : '';
  var nom = document.getElementById('rf-nom') ? document.getElementById('rf-nom').value.trim() : '';
  var mac = document.getElementById('rf-mac') ? document.getElementById('rf-mac').value.trim() : '';
  if (!cod) { alert('Ingresa el código del procedimiento'); return; }
  if (!nom) { alert('Ingresa el nombre de la actividad de tratamiento'); return; }
  if (STATE.rat.find(function(r) { return r.cod === cod; })) {
    alert('Este procedimiento ya fue registrado en el RAT de esta sesión.'); return;
  }
  stateAddRAT({
    cod: cod, nom: nom, mac: mac,
    own: document.getElementById('rf-own').value,
    sede: document.getElementById('rf-sede').value,
    base: document.getElementById('rf-base').value,
    sens: document.getElementById('rf-sens').value,
    riesgo: document.getElementById('rf-riesgo').value,
    plazo: document.getElementById('rf-plazo').value,
    fecha: new Date().toLocaleDateString('es-EC')
  });
  updMetrics();
  buildStepper(4);
  setTimeout(function() { alert('✓ RAT guardado: ' + nom); resetRAT(); }, 200);
}

function resetRAT() {
  var picker = document.getElementById('rat-picker');
  var form   = document.getElementById('rat-form');
  if (picker) picker.style.display = '';
  if (form) form.style.display = 'none';
  var al = document.getElementById('rat-al');
  if (al) al.style.display = 'none';
}

function launchEIPD() {
  var nom = document.getElementById('rf-nom') ? document.getElementById('rf-nom').value : 'este tratamiento';
  nav('eipd');
  setTimeout(function() {
    var el = document.getElementById('er-activo');
    if (el) el.value = nom;
  }, 150);
}
