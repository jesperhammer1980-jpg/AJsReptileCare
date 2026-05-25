
document.addEventListener('DOMContentLoaded', () => {
  const lang = document.body?.dataset.lang || (location.pathname.startsWith('/en/') ? 'en' : 'da');
  const entries = window.AJS_SEARCH_INDEX || [];

  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      const box = img.closest('figure') || img.parentElement;
      if (box) {
        box.classList.add('image-missing');
        const notice = document.createElement('div');
        notice.className = 'image-missing-note';
        notice.textContent = lang === 'en'
          ? 'Image source unavailable — this image has been removed from the layout.'
          : 'Billedkilde utilgængelig — billedet er fjernet fra layoutet.';
        box.appendChild(notice);
      }
      img.remove();
    }, { once: true });
  });

  document.querySelectorAll('[data-global-search]').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const q = input.value.trim();
        if (q) location.href = `${lang === 'en' ? '/en' : ''}/search.html?q=${encodeURIComponent(q)}`;
      }
    });
  });

  const localInput = document.querySelector('[data-search]');
  if (localInput) {
    localInput.addEventListener('input', () => {
      const q = localInput.value.trim().toLowerCase();
      document.querySelectorAll('.species-card').forEach((c) => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('[data-filter]').forEach((btn) => btn.addEventListener('click', () => {
    const q = (btn.dataset.filter || '').toLowerCase();
    document.querySelectorAll('.species-card').forEach((c) => {
      c.style.display = !q || (c.dataset.tags || c.innerText).toLowerCase().includes(q) ? '' : 'none';
    });
  }));

  const searchBox = document.getElementById('site-search-box');
  const resultsBox = document.getElementById('search-results');
  function renderSearch(q) {
    if (!resultsBox) return;
    const query = (q || '').trim().toLowerCase();
    const pool = entries.filter(e => e.lang === lang);
    const matches = !query ? pool.slice(0, 16) : pool.filter(e => [e.title,e.latin,e.group,e.habitat,e.difficulty,e.activity,e.description,(e.keywords||[]).join(' ')].join(' ').toLowerCase().includes(query)).slice(0, 40);
    resultsBox.innerHTML = matches.length ? matches.map(e => `<a class="search-result-card" href="${e.url}"><small>${e.type} · ${e.group || e.habitat || ''}</small><strong>${e.title}</strong><em>${e.latin || ''}</em><p>${e.description || ''}</p></a>`).join('') : `<p class="no-results">${lang === 'en' ? 'No results found.' : 'Ingen resultater fundet.'}</p>`;
  }
  if (searchBox) {
    const params = new URLSearchParams(location.search);
    searchBox.value = params.get('q') || '';
    renderSearch(searchBox.value);
    searchBox.addEventListener('input', () => renderSearch(searchBox.value));
  }

  const menuBtn = document.querySelector('[data-menu]');
  if (menuBtn) menuBtn.addEventListener('click', () => document.body.classList.toggle('nav-open'));
});
