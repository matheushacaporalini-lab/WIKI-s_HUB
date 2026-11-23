// items_search.js
// Conecta itens.html aos arquivos pendant.json, boots.json, bracelet.json e especial.json.
// Convenção do projeto: sem :root/var(), sem bibliotecas externas, busca defensiva de elementos.

(function () {
  var CATEGORIES = {
    pendant: { file: 'json/pendant.json', label: 'Pingente' },
    boots: { file: 'json/boots.json', label: 'Chuteira' },
    bracelet: { file: 'json/bracelet.json', label: 'Bracelete/Luva' },
    especial: { file: 'json/especial.json', label: 'Especial' }
  };

  // Entradas que vieram junto no scraping do pendant.json mas não são itens
  // (paginação "<< 1 >>" e os avisos de rodapé do site original). Filtradas na leitura.
  var IGNORE_VALUES = {
    '<<': true,
    '>>': true,
    '1': true,
    '*This site is based on the latest title, INAZUMA ELEVEN: Victory Road. Additional content, including newly appearing characters, will be announced and added later.': true,
    '*Some details, such as player attributes, is subject to change.': true,
    '©LEVEL5 Inc.': true
  };

  var searchInput = document.getElementById('searchInput');
  var visibleCountEl = document.getElementById('visibleCount');
  var totalCountEl = document.getElementById('totalCount');
  var tbody = document.getElementById('itemsBody');
  var catTabs = document.getElementById('catTabs');

  if (!tbody) return; // página sem a tabela — não faz sentido rodar o resto

  var allItems = [];
  var currentCat = 'all';
  var loadError = false;

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Cada entrada do JSON pode vir em dois formatos:
  //  - string simples "Nome"          -> ainda sem tradução, EN e PT ficam iguais
  //  - par ["Nome EN", "Nome PT"]      -> já traduzido (ex: boots.json)
  function normalizeEntry(raw, cat) {
    if (Array.isArray(raw)) {
      return { cat: cat, nameEn: raw[0], namePt: raw[1] || raw[0] };
    }
    return { cat: cat, nameEn: raw, namePt: raw };
  }

  function loadCategory(cat, cfg) {
    return fetch(cfg.file, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (list) {
        return list
          .filter(function (raw) {
            var key = Array.isArray(raw) ? raw[0] : raw;
            return !IGNORE_VALUES[key];
          })
          .map(function (raw) { return normalizeEntry(raw, cat); });
      });
  }

  function loadAll() {
    var jobs = [];
    for (var cat in CATEGORIES) {
      if (CATEGORIES.hasOwnProperty(cat)) {
        jobs.push(loadCategory(cat, CATEGORIES[cat]));
      }
    }
    Promise.all(jobs).then(function (results) {
      allItems = results.reduce(function (acc, arr) { return acc.concat(arr); }, []);
      if (totalCountEl) totalCountEl.textContent = allItems.length;
      render();
    }).catch(function (err) {
      loadError = true;
      console.error('Não foi possível carregar os dados dos itens. Abra a página por um servidor HTTP local, não diretamente via file://.', err);
      if (visibleCountEl) visibleCountEl.textContent = '0';
      if (totalCountEl) totalCountEl.textContent = '0';
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem; color: #94a3b8;">Não foi possível carregar os itens. Abra esta página por um servidor local (http://localhost), não diretamente pelo arquivo.</td></tr>';
    });
  }

  function render() {
    if (loadError) return;
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    var filtered = allItems.filter(function (item) {
      var matchesCat = currentCat === 'all' || item.cat === currentCat;
      var matchesQuery = !query ||
        item.namePt.toLowerCase().indexOf(query) !== -1 ||
        item.nameEn.toLowerCase().indexOf(query) !== -1;
      return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem; color: #94a3b8;">Nenhum item encontrado.</td></tr>';
    } else {
      var rows = filtered.map(function (item, i) {
        return '<tr>' +
          '<td>' + (i + 1) + '</td>' +
          '<td>' + escapeHtml(item.namePt) + '</td>' +
          '<td class="en-name">' + escapeHtml(item.nameEn) + '</td>' +
          '<td>' + CATEGORIES[item.cat].label + '</td>' +
          '</tr>';
      });
      tbody.innerHTML = rows.join('');
    }

    if (visibleCountEl) visibleCountEl.textContent = filtered.length;
  }

  if (searchInput) {
    searchInput.addEventListener('input', render);
  }

  if (catTabs) {
    catTabs.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.cat-tab') : null;
      if (!btn || !catTabs.contains(btn)) return;
      var tabs = catTabs.querySelectorAll('.cat-tab');
      for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
      btn.classList.add('active');
      currentCat = btn.getAttribute('data-cat') || 'all';
      render();
    });
  }

  loadAll();
})();