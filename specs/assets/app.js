/* Rendu des pages specs à partir de window.TONGO (backlog.js) */
(function () {
  const T = window.TONGO;
  const STATUS = { todo: "À faire", doing: "En cours", done: "Fait" };
  const PRIO = { M: "Must", S: "Should", C: "Could", W: "Won't" };
  const epic = id => T.epics.find(e => e.id === id) || { id, name: id };
  const persona = id => T.personas.find(p => p.id === id);
  const page = s => (s.type === "US" ? "user-stories.html" : "technical-stories.html") + "#" + s.id;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const sum = (arr, f) => arr.reduce((a, x) => a + f(x), 0);

  const badges = s => `
    <span class="badge ${s.status}">${STATUS[s.status]}</span>
    <span class="badge ${s.priority}" title="${PRIO[s.priority]}">${PRIO[s.priority]}</span>
    <span class="badge pts">${s.points} pt${s.points > 1 ? "s" : ""}</span>
    <span class="badge epic" title="${esc(epic(s.epic).desc || "")}">${s.epic} · ${esc(epic(s.epic).name)}</span>`;

  function progressBar(list) {
    const total = sum(list, s => s.points) || 1;
    const d = sum(list.filter(s => s.status === "done"), s => s.points);
    const g = sum(list.filter(s => s.status === "doing"), s => s.points);
    return `<div class="bar" role="img" aria-label="${Math.round(d / total * 100)} % fait"><i class="done" style="width:${d / total * 100}%"></i><i class="doing" style="width:${g / total * 100}%"></i></div>`;
  }

  /* Tableau de bord : chiffres clés */
  function renderStats(el) {
    const all = T.stories;
    const pts = sum(all, s => s.points);
    const done = sum(all.filter(s => s.status === "done"), s => s.points);
    const card = (label, val, sub) => `<div class="card"><div class="meta">${label}</div><div class="stat">${val} <small>${sub}</small></div></div>`;
    el.innerHTML = `<div class="grid">
      ${card("User Stories", all.filter(s => s.type === "US").length, "fonctionnelles")}
      ${card("Technical Stories", all.filter(s => s.type === "TS").length, "techniques")}
      ${card("Charge totale", pts, "points")}
      ${card("Avancement", Math.round(done / (pts || 1) * 100) + " %", `${done} / ${pts} pts faits`)}
    </div>`;
  }

  /* Avancement par Epic */
  function renderEpics(el) {
    el.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Epic</th><th>US</th><th>TS</th><th>Points</th><th style="min-width:160px">Avancement</th></tr></thead><tbody>
      ${T.epics.map(e => {
        const l = T.stories.filter(s => s.epic === e.id);
        const d = sum(l.filter(s => s.status === "done"), s => s.points), t = sum(l, s => s.points);
        return `<tr><td><b>${e.id}</b> ${esc(e.name)}<div class="meta">${esc(e.desc)}</div></td>
          <td>${l.filter(s => s.type === "US").length}</td><td>${l.filter(s => s.type === "TS").length}</td>
          <td>${d} / ${t}</td><td>${progressBar(l)}</td></tr>`;
      }).join("")}
    </tbody></table></div>`;
  }

  /* Kanban */
  function renderKanban(el) {
    const order = { M: 0, S: 1, C: 2, W: 3 };
    el.innerHTML = `<div class="kanban">${Object.keys(STATUS).map(st => {
      const l = T.stories.filter(s => s.status === st).sort((a, b) => order[a.priority] - order[b.priority] || a.id.localeCompare(b.id));
      return `<section class="col ${st}"><h3><span class="t">${STATUS[st]}</span><span class="badge ${st}">${l.length} · ${sum(l, s => s.points)} pts</span></h3>
        ${l.length ? l.map(s => `<a class="ticket ${s.type}" href="${page(s)}"><span class="id">${s.id}</span><span class="ttl">${esc(s.title)}</span>
          <span class="badges"><span class="badge ${s.priority}">${PRIO[s.priority]}</span><span class="badge pts">${s.points} pts</span><span class="badge epic">${s.epic}</span></span></a>`).join("")
          : `<div class="empty">Aucune story</div>`}
      </section>`;
    }).join("")}</div>`;
  }

  /* Liste détaillée des stories, avec filtres */
  function renderStories(el, type) {
    const list = T.stories.filter(s => s.type === type);
    const opts = (pairs) => pairs.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join("");
    const usedEpics = T.epics.filter(e => list.some(s => s.epic === e.id));
    el.innerHTML = `
      <div class="filters" role="search">
        <select data-f="epic" aria-label="Epic"><option value="">Toutes les epics</option>${opts(usedEpics.map(e => [e.id, e.id + " · " + e.name]))}</select>
        <select data-f="priority" aria-label="Priorité"><option value="">Toutes priorités</option>${opts(Object.entries(PRIO))}</select>
        <select data-f="status" aria-label="Statut"><option value="">Tous statuts</option>${opts(Object.entries(STATUS))}</select>
        ${type === "US" ? `<select data-f="persona" aria-label="Persona"><option value="">Tous personas</option>${opts(T.personas.map(p => [p.id, p.name + " · " + p.short]))}</select>` : ""}
        <input type="search" data-f="q" placeholder="Rechercher…" aria-label="Rechercher">
        <span class="count"></span>
      </div>
      <div class="items">${list.map(s => storyHTML(s)).join("")}</div>`;

    const apply = () => {
      const f = {};
      el.querySelectorAll("[data-f]").forEach(i => (f[i.dataset.f] = i.value.trim().toLowerCase()));
      let n = 0;
      list.forEach(s => {
        const node = el.querySelector("#" + s.id);
        const text = [s.id, s.title, s.as, s.want, s.so].join(" ").toLowerCase();
        const ok = (!f.epic || s.epic.toLowerCase() === f.epic) && (!f.priority || s.priority.toLowerCase() === f.priority)
          && (!f.status || s.status === f.status) && (!f.persona || (s.persona || "").toLowerCase() === f.persona)
          && (!f.q || text.includes(f.q));
        node.hidden = !ok; if (ok) n++;
      });
      el.querySelector(".count").textContent = `${n} / ${list.length} stories · ${sum(list.filter(s => !el.querySelector("#" + s.id).hidden), s => s.points)} pts`;
    };
    el.querySelectorAll("[data-f]").forEach(i => i.addEventListener("input", apply));
    apply();
    if (location.hash) { const t = document.querySelector(location.hash); if (t) t.scrollIntoView(); }
  }

  function storyHTML(s) {
    const p = s.persona && persona(s.persona);
    const ac = s.criteria.map(([g, w, t]) => `<li>
      ${g ? `<span class="k">Étant donné</span> ${esc(g)}<br>` : ""}
      ${w ? `<span class="k">Quand</span> ${esc(w)}<br>` : ""}
      <span class="k">Alors</span> ${esc(t)}</li>`).join("");
    const subject = s.type === "US" ? "En tant que" : "En tant qu'";
    return `<article class="story ${s.type}" id="${s.id}">
      <header><span class="id">${s.id}</span><h3>${esc(s.title)}</h3></header>
      <div class="badges">${badges(s)}${p ? `<a class="badge" href="personas.html#${p.id}" style="color:var(--accent);text-decoration:none">${p.id} · ${esc(p.name)}</a>` : ""}</div>
      <p class="narrative"><b>${subject}</b>${s.type === "US" ? " " : ""}${esc(s.as)}, <b>je veux</b> ${esc(s.want)} <b>afin de</b> ${esc(s.so)}.</p>
      <h4 class="meta" style="margin:12px 0 0">Critères d'acceptation</h4>
      <ol class="gwt">${ac}</ol>
    </article>`;
  }

  window.TongoSpecs = { renderStats, renderEpics, renderKanban, renderStories };
  document.querySelectorAll("[data-updated]").forEach(n => (n.textContent = T.updated));
})();
