/*
 * Modus Create Prompt Library — app logic
 * Vanilla JS, no build step, no dependencies. Reads window.PROMPT_LIBRARY.
 */
(function () {
  'use strict';

  var LIB = globalThis.PROMPT_LIBRARY || { meta: {}, categories: [], prompts: [] };
  var PROMPTS = LIB.prompts || [];
  var CATEGORIES = LIB.categories || [];

  var catName = {};
  CATEGORIES.forEach(function (c) { catName[c.id] = c.name; });
  var promptById = {};
  PROMPTS.forEach(function (p) { promptById[p.id] = p; });

  var state = { query: '', category: 'all' };

  var els = {
    title: document.getElementById('lib-title'),
    subtitle: document.getElementById('lib-subtitle'),
    stat: document.getElementById('stat-line'),
    search: document.getElementById('search'),
    chips: document.getElementById('chips'),
    grid: document.getElementById('grid'),
    empty: document.getElementById('empty'),
    reset: document.getElementById('reset'),
    toast: document.getElementById('toast'),
    themeToggle: document.getElementById('theme-toggle'),
    copyFiltered: document.getElementById('copy-filtered'),
  };

  // ---------- helpers ----------
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, query) {
    var safe = escapeHtml(text);
    var q = query.trim();
    if (q.length < 2) return safe;
    try {
      var re = new RegExp('(' + escapeRegExp(q) + ')', 'ig');
      return safe.replace(re, '<mark>$1</mark>');
    } catch (e) {
      return safe;
    }
  }

  function haystack(p) {
    return [
      p.title,
      p.use,
      p.prompt,
      (p.tags || []).join(' '),
      (p.roles || []).join(' '),
      catName[p.category] || '',
    ].join(' ').toLowerCase();
  }

  function matches(p) {
    if (state.category !== 'all' && p.category !== state.category) return false;
    var q = state.query.trim().toLowerCase();
    if (!q) return true;
    var hay = haystack(p);
    return q.split(/\s+/).every(function (term) { return hay.indexOf(term) !== -1; });
  }

  // ---------- clipboard (works on https, localhost and file://) ----------
  function copyText(text) {
    if (navigator.clipboard && globalThis.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  var toastTimer;
  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.classList.remove('show'); }, 1700);
  }

  // ---------- rendering ----------
  function cardHTML(p) {
    var q = state.query;
    var roles = (p.roles || []).map(function (r) {
      return '<span class="badge role">' + escapeHtml(r) + '</span>';
    }).join('');
    var tags = (p.tags || []).map(function (t) {
      return '<span class="tag">' + escapeHtml(t) + '</span>';
    }).join('');

    return (
      '<article class="card" id="p-' + escapeHtml(p.id) + '">' +
        '<div class="card-head">' +
          '<div class="card-badges">' +
            '<span class="badge">' + escapeHtml(catName[p.category] || p.category) + '</span>' +
            roles +
          '</div>' +
          '<h2>' + highlight(p.title, q) + '</h2>' +
          '<p class="use">' + highlight(p.use || '', q) + '</p>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="prompt-box"><pre>' + highlight(p.prompt, q) + '</pre></div>' +
        '</div>' +
        '<div class="card-foot">' +
          '<div class="tags">' + tags + '</div>' +
          '<button class="copy-btn" type="button" data-id="' + escapeHtml(p.id) + '">' +
            '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>' +
            '<span>Copy</span>' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    var list = PROMPTS.filter(matches);
    if (list.length === 0) {
      els.grid.innerHTML = '';
      els.empty.hidden = false;
    } else {
      els.empty.hidden = true;
      els.grid.innerHTML = list.map(cardHTML).join('');
    }
    updateStat(list.length);
    updateChipPressed();
  }

  function updateStat(showing) {
    var total = PROMPTS.length;
    if (showing === total) {
      els.stat.textContent = total + ' prompts · ' + CATEGORIES.length + ' categories';
    } else {
      els.stat.textContent = 'Showing ' + showing + ' of ' + total;
    }
  }

  function buildChips() {
    var counts = {};
    PROMPTS.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });

    var html = '<button class="chip" type="button" data-cat="all" aria-pressed="true">All' +
      '<span class="chip-count">' + PROMPTS.length + '</span></button>';

    html += CATEGORIES.map(function (c) {
      var n = counts[c.id] || 0;
      if (!n) return '';
      return '<button class="chip" type="button" data-cat="' + escapeHtml(c.id) + '" aria-pressed="false">' +
        escapeHtml(c.name) + '<span class="chip-count">' + n + '</span></button>';
    }).join('');

    els.chips.innerHTML = html;
  }

  function updateChipPressed() {
    var chips = els.chips.querySelectorAll('.chip');
    chips.forEach(function (chip) {
      chip.setAttribute('aria-pressed', chip.dataset.cat === state.category ? 'true' : 'false');
    });
  }

  // ---------- export visible as Markdown ----------
  function exportVisible() {
    var list = PROMPTS.filter(matches);
    if (!list.length) { showToast('Nothing to export'); return; }
    var fence = '```';
    var lines = ['# Modus Create Prompt Library', ''];
    if (state.category !== 'all') lines.push('_Category: ' + (catName[state.category] || state.category) + '_', '');
    if (state.query.trim()) lines.push('_Search: ' + state.query.trim() + '_', '');
    list.forEach(function (p) {
      lines.push('## ' + p.title);
      lines.push('*' + (catName[p.category] || p.category) + ' · ' + (p.roles || []).join(', ') + '*');
      if (p.use) lines.push('> ' + p.use);
      lines.push('', fence, p.prompt, fence, '');
    });
    copyText(lines.join('\n')).then(function () {
      showToast('Copied ' + list.length + ' prompt' + (list.length > 1 ? 's' : '') + ' as Markdown');
    }).catch(function () { showToast('Copy failed'); });
  }

  // ---------- theme ----------
  var THEME_KEY = 'cpl-theme';
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    var prefersDark = globalThis.matchMedia && globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  }

  // ---------- events ----------
  var searchTimer;
  function onSearch() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.query = els.search.value;
      render();
    }, 110);
  }

  function onChipClick(e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    state.category = chip.dataset.cat;
    render();
    globalThis.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onGridClick(e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var p = promptById[btn.dataset.id];
    if (!p) return;
    copyText(p.prompt).then(function () {
      btn.classList.add('copied');
      var label = btn.querySelector('span');
      var prev = label.textContent;
      label.textContent = 'Copied!';
      showToast('Prompt copied to clipboard');
      setTimeout(function () {
        btn.classList.remove('copied');
        label.textContent = prev;
      }, 1400);
    }).catch(function () { showToast('Copy failed — select and copy manually'); });
  }

  function onKeydown(e) {
    if (e.key === '/' && document.activeElement !== els.search) {
      e.preventDefault();
      els.search.focus();
      els.search.select();
    } else if (e.key === 'Escape' && document.activeElement === els.search) {
      els.search.value = '';
      state.query = '';
      render();
      els.search.blur();
    }
  }

  function resetFilters() {
    state.query = '';
    state.category = 'all';
    els.search.value = '';
    render();
  }

  // ---------- init ----------
  function init() {
    if (LIB.meta && LIB.meta.title) els.title.textContent = LIB.meta.title;
    if (LIB.meta && LIB.meta.subtitle) els.subtitle.textContent = LIB.meta.subtitle;

    initTheme();
    buildChips();
    render();

    els.search.addEventListener('input', onSearch);
    els.chips.addEventListener('click', onChipClick);
    els.grid.addEventListener('click', onGridClick);
    els.reset.addEventListener('click', resetFilters);
    els.themeToggle.addEventListener('click', toggleTheme);
    els.copyFiltered.addEventListener('click', exportVisible);
    document.addEventListener('keydown', onKeydown);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
