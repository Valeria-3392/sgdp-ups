/* ════════════════════════════════════════════════════════════
   SGDP-UPS · main.css
   Universidad Politécnica Salesiana · Procuraduría · 2026
   ════════════════════════════════════════════════════════════ */

:root {
  --cp:  #534AB7; --cpl: #EEEDFE; --cpd: #3C3489; --cpm: #AFA9EC;
  --ct:  #0F6E56; --ctl: #E1F5EE; --ctd: #085041;
  --ca:  #BA7517; --cal: #FAEEDA;
  --cr:  #A32D2D; --crl: #FCEBEB;
  --cb:  #185FA5; --cbl: #E6F1FB;
  --cg:  #F1EFE8; --cgd: #5F5E5A;
  --bg:      #F7F6F3;
  --surface: #FFFFFF;
  --border:  rgba(0,0,0,0.08);
  --border-strong: rgba(0,0,0,0.14);
  --text:  #1A1917;
  --text2: #5F5E5A;
  --text3: #9A9894;
  --radius:    10px;
  --radius-lg: 14px;
  --shadow:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-lg: 0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04);
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); font-size: 14px; line-height: 1.5; }

/* ── LAYOUT ── */
#app    { display: flex; height: 100vh; overflow: hidden; }
#main   { flex: 1; overflow-y: auto; }
.page   { display: none; padding: 28px 32px; max-width: 1200px; margin: 0 auto; }
.page.active { display: block; }

/* ── SIDEBAR ── */
#sidebar {
  width: 220px; flex-shrink: 0;
  background: var(--surface); border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
}
.sb-header { padding: 20px 18px 16px; border-bottom: 1px solid var(--border); }
.sb-logo   { display: flex; align-items: center; gap: 9px; margin-bottom: 6px; }
.sb-logo-icon {
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--cp); display: flex; align-items: center; justify-content: center;
}
.sb-logo-icon svg    { width: 18px; height: 18px; }
.sb-logo-name        { font-size: 14px; font-weight: 600; letter-spacing: -.3px; }
.sb-institution      { font-size: 10px; color: var(--text3); line-height: 1.6; }
.sb-nav              { flex: 1; overflow-y: auto; padding: 10px; }
.sb-section          { font-size: 10px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: .06em; padding: 10px 8px 4px; }
.sb-item {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 10px; border-radius: 8px; cursor: pointer;
  font-size: 13px; color: var(--text2); transition: all .15s; margin-bottom: 1px;
}
.sb-item:hover  { background: var(--bg); color: var(--text); }
.sb-item.active { background: var(--cpl); color: var(--cpd); font-weight: 500; }
.sb-item svg    { width: 16px; height: 16px; flex-shrink: 0; }
.sb-badge {
  margin-left: auto; font-size: 10px; font-weight: 600;
  background: var(--cr); color: #fff; border-radius: 10px;
  padding: 1px 6px; min-width: 18px; text-align: center;
}
.sb-badge.amber { background: var(--ca); }
.sb-badge.green { background: var(--ct); }
.sb-footer {
  padding: 12px 18px; border-top: 1px solid var(--border);
  display: flex; align-items: center; gap: 9px;
}
.sb-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--cpl); display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; color: var(--cpd); flex-shrink: 0;
}
.sb-user-name { font-size: 12px; font-weight: 500; }
.sb-user-role { font-size: 10px; color: var(--text3); }

/* ── PAGE HEADER ── */
.ph        { margin-bottom: 24px; }
.ph-title  { font-size: 22px; font-weight: 600; letter-spacing: -.4px; }
.ph-sub    { font-size: 13px; color: var(--text2); margin-top: 3px; }
.ph-row    { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 10px; }

/* ── METRIC GRID ── */
.mg  { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 20px; }
.mc  { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; box-shadow: var(--shadow); }
.mc-label { font-size: 11px; color: var(--text3); margin-bottom: 5px; font-weight: 500; text-transform: uppercase; letter-spacing: .04em; }
.mc-val   { font-size: 26px; font-weight: 600; letter-spacing: -.5px; }
.mc-sub   { font-size: 11px; color: var(--text3); margin-top: 2px; }

/* ── CARD ── */
.card       { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 20px; box-shadow: var(--shadow); margin-bottom: 14px; }
.card-title { font-size: 12px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: .05em; padding-bottom: 12px; border-bottom: 1px solid var(--border); margin-bottom: 14px; }

/* ── ALERTS ── */
.alert { padding: 10px 14px; border-left: 3px solid; border-radius: 0 8px 8px 0; font-size: 12px; margin-bottom: 10px; }
.al-r  { border-color: #E24B4A; background: var(--crl); color: var(--cr); }
.al-a  { border-color: var(--ca); background: var(--cal); color: var(--ca); }
.al-t  { border-color: var(--ct); background: var(--ctl); color: var(--ct); }
.al-b  { border-color: var(--cb); background: var(--cbl); color: var(--cb); }

/* ── TABLE ── */
.tbl-wrap { border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow); margin-bottom: 10px; overflow-x: auto; }
table     { width: 100%; border-collapse: collapse; table-layout: fixed; min-width: 500px; }
thead tr  { background: var(--bg); }
th  { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: .04em; padding: 9px 12px; text-align: left; border-bottom: 1px solid var(--border); }
td  { font-size: 12px; padding: 9px 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
tr:last-child td  { border-bottom: none; }
tr.row-click:hover td { background: var(--bg); cursor: pointer; }

/* ── FILTERS ── */
.filters   { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.filters input, .filters select {
  font-family: 'DM Sans', sans-serif; font-size: 12px;
  padding: 7px 11px; border: 1px solid var(--border-strong);
  border-radius: 8px; background: var(--surface); color: var(--text); outline: none;
}
.filters input:focus, .filters select:focus { border-color: var(--cp); }
.filters input { flex: 1; min-width: 160px; }

/* ── BUTTONS ── */
.btn {
  font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
  padding: 7px 14px; border: 1px solid var(--border-strong);
  border-radius: 8px; background: var(--surface); color: var(--text);
  cursor: pointer; transition: all .15s;
}
.btn:hover           { background: var(--bg); }
.btn-primary         { background: var(--cp); color: #fff; border-color: var(--cp); }
.btn-primary:hover   { background: var(--cpd); border-color: var(--cpd); }
.btn-success         { background: var(--ct); color: #fff; border-color: var(--ct); }
.btn-success:hover   { background: var(--ctd); border-color: var(--ctd); }
.btn-sm              { padding: 4px 10px; font-size: 11px; }

/* ── BADGES ── */
.badge { display: inline-block; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 20px; }
.bd-p  { background: var(--cpl); color: var(--cpd); }
.bd-t  { background: var(--ctl); color: var(--ctd); }
.bd-a  { background: var(--cal); color: var(--ca);  }
.bd-r  { background: var(--crl); color: var(--cr);  }
.bd-b  { background: var(--cbl); color: var(--cb);  }
.bd-g  { background: var(--cg);  color: var(--cgd); }

/* ── FORM ── */
.fgrid  { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.field  { display: flex; flex-direction: column; gap: 4px; }
.field label { font-size: 11px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: .04em; }
.field input, .field select, .field textarea {
  font-family: 'DM Sans', sans-serif; font-size: 13px;
  padding: 8px 11px; border: 1px solid var(--border-strong);
  border-radius: 8px; background: var(--surface); color: var(--text); outline: none;
}
.field input:focus, .field select:focus, .field textarea:focus { border-color: var(--cp); }
.field textarea   { height: 72px; resize: vertical; }
.field-hint       { font-size: 10px; color: var(--text3); margin-top: 2px; }

/* ── PROGRESS BAR ── */
.pbar      { height: 5px; background: var(--border); border-radius: 3px; overflow: hidden; }
.pbar-fill { height: 100%; border-radius: 3px; transition: width .4s; }

/* ── PAGER ── */
.pager    { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text2); margin-top: 8px; }
.pager button { font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 4px 10px; border: 1px solid var(--border-strong); border-radius: 7px; background: var(--surface); cursor: pointer; color: var(--text); }
.pager button:hover { background: var(--bg); }

/* ── TABS ── */
.tabs      { display: inline-flex; gap: 2px; background: var(--bg); border-radius: 10px; padding: 3px; border: 1px solid var(--border); margin-bottom: 16px; }
.tab       { font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 8px; cursor: pointer; color: var(--text2); transition: all .15s; }
.tab.active { background: var(--surface); color: var(--cp); font-weight: 600; box-shadow: var(--shadow); }

/* ── COVERAGE GRID ── */
.cov-grid  { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; }
.cov-item  { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; box-shadow: var(--shadow); }
.cov-name  { font-size: 12px; font-weight: 500; margin-bottom: 6px; }
.cov-stats { display: flex; justify-content: space-between; font-size: 10px; color: var(--text3); margin-top: 5px; }

/* ── SOA CARD ── */
.ctrl-card  { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; margin-bottom: 6px; box-shadow: var(--shadow); transition: border-color .15s; }
.ctrl-card:hover { border-color: var(--cpm); }
.ctrl-id    { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; color: var(--cpd); background: var(--cpl); padding: 2px 7px; border-radius: 5px; display: inline-block; margin-bottom: 5px; }
.ctrl-id.new { color: var(--ca); background: var(--cal); }
.ctrl-desc  { font-size: 13px; font-weight: 500; margin-bottom: 3px; }
.ctrl-just  { font-size: 11px; color: var(--text3); margin-bottom: 8px; }
.ctrl-footer { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

/* ── RISK CALCULATOR ── */
.dual-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.risk-panel  { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; }
.risk-panel-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 12px; }
.slider-row  { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.slider-row label { font-size: 11px; color: var(--text2); min-width: 75px; }
.slider-row input[type=range] { flex: 1; accent-color: var(--cp); }
.slider-val  { font-size: 13px; font-weight: 600; min-width: 16px; text-align: right; }
.risk-result { padding: 10px 14px; border-radius: var(--radius); margin-top: 10px; display: flex; align-items: center; gap: 10px; }
.risk-score  { font-size: 30px; font-weight: 700; letter-spacing: -1px; line-height: 1; }
.risk-label  { font-size: 14px; font-weight: 600; }
.risk-desc   { font-size: 11px; opacity: .8; margin-top: 2px; }

/* ── HEATMAP ── */
.heatmap { display: grid; grid-template-columns: 80px repeat(5, 1fr); gap: 3px; }
.hcell   { height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 11px; font-weight: 600; color: #fff; }
.hcell.head { background: var(--cpd); font-size: 10px; }

/* ── STEPPER ── */
.stepper   { display: flex; align-items: center; gap: 6px; margin-bottom: 20px; flex-wrap: wrap; }
.step-dot  { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
.step-done   { background: var(--ct); color: #fff; }
.step-active { background: var(--cp); color: #fff; }
.step-todo   { background: var(--border); color: var(--text3); }
.step-label  { font-size: 11px; color: var(--text2); }
.step-label.active { color: var(--cp); font-weight: 600; }
.step-sep  { flex: 1; height: 1px; background: var(--border); max-width: 30px; }

/* ── UTILS ── */
.mono { font-family: 'DM Mono', monospace; }
.mt-8  { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.flex-row { display: flex; gap: 8px; flex-wrap: wrap; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  #sidebar     { display: none; }
  .page        { padding: 16px; }
  .dual-grid   { grid-template-columns: 1fr; }
  .ph-row      { flex-direction: column; }
}
