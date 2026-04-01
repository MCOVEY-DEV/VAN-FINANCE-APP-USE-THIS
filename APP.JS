
const state = {
  interest: 4000,
  taxRate: 20,
  term: 60,
  vsc: 0,
  gap: 0,
  club: 0,
  maintenance: 0,
  paint: 0,
  closeMode: false,
};

const termOptions = [60, 63, 66, 72, 75];

function money(value){
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function money2(value){
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

function setupTermButtons(){
  const wrap = document.getElementById('termButtons');
  wrap.innerHTML = '';
  termOptions.forEach(term => {
    const btn = document.createElement('button');
    btn.className = 'term-btn' + (state.term === term ? ' active' : '');
    btn.textContent = term + ' mo';
    btn.addEventListener('click', () => {
      state.term = term;
      render();
    });
    wrap.appendChild(btn);
  });
}

function bindSlider(id, key){
  const el = document.getElementById(id);
  el.addEventListener('input', e => {
    state[key] = Number(e.target.value);
    render();
  });
}

function render(){
  document.getElementById('app').classList.toggle('close-mode', state.closeMode);

  document.getElementById('interest').value = state.interest;
  document.getElementById('taxRate').value = state.taxRate;
  document.getElementById('vsc').value = state.vsc;
  document.getElementById('gap').value = state.gap;
  document.getElementById('club').value = state.club;
  document.getElementById('maintenance').value = state.maintenance;
  document.getElementById('paint').value = state.paint;

  document.getElementById('interestValue').textContent = money(state.interest);
  document.getElementById('taxRateValue').textContent = state.taxRate + '%';
  document.getElementById('termValue').textContent = state.term + ' months';
  document.getElementById('vscValue').textContent = money(state.vsc);
  document.getElementById('gapValue').textContent = money(state.gap);
  document.getElementById('clubValue').textContent = money(state.club);
  document.getElementById('maintenanceValue').textContent = money(state.maintenance);
  document.getElementById('paintValue').textContent = money(state.paint);

  const productsTotal = state.vsc + state.gap + state.club + state.maintenance + state.paint;
  const fullTotal = state.interest + productsTotal;
  const baseTax = state.interest * (state.taxRate / 100);
  const baseNet = state.interest - baseTax;
  const fullTax = fullTotal * (state.taxRate / 100);
  const fullNet = fullTotal - fullTax;
  const monthlyImpact = fullNet / state.term;

  document.getElementById('baseTotal').textContent = money(state.interest);
  document.getElementById('baseTax').textContent = money(baseTax);
  document.getElementById('baseNet').textContent = money(baseNet);

  document.getElementById('fullTotal').textContent = money(fullTotal);
  document.getElementById('fullTax').textContent = money(fullTax);
  document.getElementById('fullNet').textContent = money(fullNet);

  document.getElementById('monthlyImpact').textContent = money2(monthlyImpact) + ' / mo';
  document.getElementById('monthlyTerm').textContent = 'Over ' + state.term + ' months';

  setupTermButtons();
}

document.getElementById('closeModeBtn').addEventListener('click', () => {
  state.closeMode = !state.closeMode;
  document.getElementById('closeModeBtn').textContent = state.closeMode ? 'Exit Close Mode' : 'Close Mode';
  render();
});

bindSlider('interest', 'interest');
bindSlider('taxRate', 'taxRate');
bindSlider('vsc', 'vsc');
bindSlider('gap', 'gap');
bindSlider('club', 'club');
bindSlider('maintenance', 'maintenance');
bindSlider('paint', 'paint');

render();
