// ════════════════════════════════════════════════════════════
// procedimientos.js — Listado Procedimientos Fase 9
// 226 procedimientos aprobados · Listado Ene2026
// ════════════════════════════════════════════════════════════

var P_PAGE = 1;

function renderProcedimientos() {
  var pg = document.getElementById('page-procedimientos');

  // Contar por categoría
  var cats = {};
  PROCS.forEach(function(p) { cats[p.cat] = (cats[p.cat] || 0) + 1; });

  pg.innerHTML = `
    <div class="ph">
      <div class="ph-row">
        <div>
          <div class="ph-title">Procedimientos Fase 9 — Base RAT</div>
          <div class="ph-sub">226 procedimientos aprobados y distribuidos · Listado_de_procedimientos_UPS_Ene2026.xlsx</div>
        </div>
      </div>
    </div>

    <div class="mg" style="grid-template-columns:repeat(auto-fit,minmax(100px,1fr));">
      <div class="mc"><div class="mc-label">Total</div><div class="mc-val" style="color:var(--cp)">226</div><div class="mc-sub">Fase 9</div></div>
      <div class="mc"><div class="mc-label">Estratégicos</div><div class="mc-val" style="color:var(--cp)">${cats['Estratégicos']||0}</div><div class="mc-sub">procedimientos</div></div>
      <div class="mc"><div class="mc-label">Apoyo y Soporte</div><div class="mc-val" style="color:var(--cb)">${cats['Apoyo y Soporte']||0}</div><div class="mc-sub">procedimientos</div></div>
      <div class="mc"><div class="mc-label">Clave - Misional</div><div class="mc-val" style="color:var(--ct)">${cats['Clave - Misional']||0}</div><div class="mc-sub">procedimientos</div></div>
      <div class="mc"><div class="mc-label">Serv. Comunitario</div><div class="mc-val" style="color:var(--ca)">${cats['Servicio Comunitario']||0}</div><div class="mc-sub">procedimientos</div></div>
      <div class="mc"><div class="mc-label">RAT registrados</div><div class="mc-val" style="color:var(--cr)">${STATE.rat.length}</div><div class="mc-sub">de 226</div></div>
    </div>

    <div class="filters">
      <input type="text" id="ps" placeholder="Buscar procedimiento, código o Data Owner..." oninput="drawP()">
      <select id="pm" onchange="drawP()">
        <option value="">Todos los macroprocesos</option>
      </select>
      <select id="pc" onchange="drawP()">
        <option value="">Todas las categorías</option>
        <option>Estratégicos</option>
        <option>Apoyo y Soporte</option>
        <option>Clave - Misional</option>
        <option>Servicio Comunitario</option>
      </select>
    </div>
    <div class="tbl-wrap"><table>
      <thead><tr>
        <th style="width:40%">Procedimiento</th>
        <th style="width:16%">Código</th>
        <th style="width:22%">Data Owner</th>
        <th style="width:10%">Categoría</th>
        <th style="width:12%">Estado RAT</th>
      </tr></thead>
      <tbody id="p-tb"></tbody>
    </table></div>
    <div class="pager">
      <button onclick="ppg_(-1)">‹</button>
      <span id="ppi"></span>
      <button onclick="ppg_(1)">›</button>
    </div>
  `;

  // Poblar select de macroprocesos
  var sel = document.getElementById('pm');
  MACROS.forEach(function(m) {
    var o = document.createElement('option'); o.value = m; o.textContent = m; sel.appendChild(o);
  });
  drawP();
}

function pfilt() {
  var q  = document.getElementById('ps') ? document.getElementById('ps').value.toLowerCase() : '';
  var fm = document.getElementById('pm') ? document.getElementById('pm').value : '';
  var fc = document.getElementById('pc') ? document.getElementById('pc').value : '';
  return PROCS.filter(function(p) {
    return (!q  || p.nom.toLowerCase().includes(q) || p.cod.toLowerCase().includes(q) || p.own.toLowerCase().includes(q))
        && (!fm || p.mac === fm)
        && (!fc || p.cat === fc);
  });
}

function drawP() { P_PAGE = 1; _drawP(); }
function _drawP() {
  var rows = pfilt(), tot = rows.length, pgs = Math.ceil(tot / STATE.PS) || 1;
  var sl = rows.slice((P_PAGE - 1) * STATE.PS, P_PAGE * STATE.PS);
  var h = '';
  if (!sl.length) {
    h = '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text3);">Sin resultados</td></tr>';
  } else {
    sl.forEach(function(p) {
      var catBd = p.cat === 'Estratégicos'      ? 'bd-p'
                : p.cat === 'Clave - Misional'  ? 'bd-t'
                : p.cat === 'Servicio Comunitario' ? 'bd-a' : 'bd-g';
      var done = STATE.rat.find(function(r) { return r.cod === p.cod; });
      h += '<tr class="row-click">'
        + '<td style="font-weight:500;font-size:12px;">' + p.nom + '</td>'
        + '<td class="mono" style="font-size:11px;color:var(--text2);">' + p.cod + '</td>'
        + '<td style="font-size:12px;">' + p.own + '</td>'
        + '<td><span class="badge ' + catBd + '">' + p.cat + '</span></td>'
        + '<td>'
        + (done
            ? '<span class="badge bd-t">✓ RAT</span>'
            : '<button class="btn btn-primary btn-sm" onclick="selectAndRAT(\'' + p.cod + '\')">Registrar RAT</button>')
        + '</td>'
        + '</tr>';
    });
  }
  document.getElementById('p-tb').innerHTML = h;
  document.getElementById('ppi').textContent = 'Pág.' + P_PAGE + '/' + pgs + ' (' + tot + ')';
}
function ppg_(d) {
  var rows = pfilt(), pgs = Math.ceil(rows.length / STATE.PS) || 1;
  P_PAGE = Math.max(1, Math.min(pgs, P_PAGE + d));
  _drawP();
}

function selectAndRAT(cod) {
  nav('rat');
  setTimeout(function() { selectProc(cod); }, 150);
}
