const CATEGORIES = [
  { id: 'feedforward',   label: 'Feedforward' },
  { id: 'convolutional', label: 'Convolutional' },
  { id: 'recurrent',     label: 'Recurrent' },
  { id: 'attention',     label: 'Attention' },
];

const nnSelect   = document.getElementById('nn-select');
const canvas     = document.getElementById('nn-canvas');

// ── Selector ────────────────────────────────────────────────────────────────

function populateSelector() {
  for (const cat of CATEGORIES) {
    const nets = NeuralNetRegistry.getByCategory(cat.id);
    if (nets.length === 0) continue;
    const group = document.createElement('optgroup');
    group.label = cat.label;
    for (const info of nets) {
      const opt   = document.createElement('option');
      opt.value   = info.id;
      opt.textContent = info.displayName;
      group.appendChild(opt);
    }
    nnSelect.appendChild(group);
  }
}

// ── Stats ────────────────────────────────────────────────────────────────────

function buildStatsHTML(info) {
  const rows = [
    ['Year',        info.year        ?? '—'],
    ['Authors',     info.authors     || '—'],
    ['Institution', info.institution || '—'],
    ['Innovation',  info.keyInnovation || '—'],
    ['Predecessor', info.predecessor || '—'],
    ['Successor',   info.successor   || '—'],
  ];

  const statsRows = rows.map(([label, value]) =>
    `<div class="stat-row">
      <span class="stat-label">${label}</span>
      <span class="stat-value">${value}</span>
    </div>`
  ).join('');

  const paper = info.paperUrl
    ? `<div class="stat-paper">
        <span class="stat-label">Paper</span>
        <a href="${info.paperUrl}" target="_blank" rel="noopener noreferrer">${info.paperTitle ?? 'View paper'} ↗</a>
       </div>`
    : '';

  const description = info.description
    ? `<div class="stat-description"><p>${info.description}</p></div>`
    : '';

  const significance = info.significance
    ? `<div class="stat-significance">
        <span class="stat-section-label">Significance</span>
        <p>${info.significance}</p>
       </div>`
    : '';

  const goodFor = (info.goodFor ?? [])
    .map(s => `<span class="stat-badge stat-badge-good">${s}</span>`)
    .join('');
  const limitations = (info.limitations ?? [])
    .map(s => `<span class="stat-badge stat-badge-bad">${s}</span>`)
    .join('');

  return [
    description,
    `<div class="stat-grid">${statsRows}</div>`,
    paper,
    significance,
    goodFor  ? `<div class="stat-section-label">Good for</div><div class="stat-badges">${goodFor}</div>`     : '',
    limitations ? `<div class="stat-section-label">Limitations</div><div class="stat-badges">${limitations}</div>` : '',
  ].join('');
}

// ── Visualizer ───────────────────────────────────────────────────────────────

function resizeCanvas() {
  canvas.width  = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

function renderCurrentNetwork() {
  const info = NeuralNetRegistry.getById(nnSelect.value);
  if (!info) return;
  resizeCanvas();
  drawNetwork(canvas, info);
  document.getElementById('stats-content').innerHTML = buildStatsHTML(info);
  document.getElementById('nn-title').textContent = info.displayName;
  document.getElementById('nn-year').textContent  = info.year ?? '';
}

// ── Tab switching ─────────────────────────────────────────────────────────────

function switchToTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  const btn   = document.querySelector(`.tab-btn[data-tab="${name}"]`);
  const panel = document.getElementById(`tab-${name}`);
  if (btn)   btn.classList.add('active');
  if (panel) panel.classList.remove('hidden');
  if (name === 'visualizer') {
    resizeCanvas();
    renderCurrentNetwork();
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────

populateSelector();
renderCurrentNetwork();

nnSelect.addEventListener('change', renderCurrentNetwork);

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchToTab(btn.dataset.tab));
});

window.addEventListener('resize', () => {
  const activePanel = document.querySelector('.tab-content:not(.hidden)');
  if (activePanel && activePanel.id === 'tab-visualizer') {
    resizeCanvas();
    renderCurrentNetwork();
  }
});
