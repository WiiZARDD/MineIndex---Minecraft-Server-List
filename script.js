const LOADS = [
  { file: 'data/featured.json', containerId: 'featured-list', isFeatured: true, useStatus: true },
  { file: 'data/servers.json',  containerId: 'server-list',   isFeatured: false, useStatus: true }
];

const PLACEHOLDER_ICON = '/uploads/placeholder.png';


function bust(url) {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}t=${Date.now()}`;
}

async function fetchJSON(url) {
  const res = await fetch(bust(url), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

function normalizeIconPath(p) {
  if (!p) return PLACEHOLDER_ICON;
  if (/^https?:\/\//i.test(p) || p.startsWith('//')) return p; 
  return p.startsWith('/') ? p : `/${p}`; 
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function getServerStatus(ip) {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${encodeURIComponent(ip)}`, { cache: 'no-store' });
    const d = await res.json();
    if (d && d.online) {
      const players = d.players?.online ?? 0;
      const version = d.version || 'Unknown';
      return `
        <p style="color:#3fcf3f;"><strong>Online</strong></p>
        <p>Players: ${players}</p>
        <p>Version: ${escapeHtml(version)}</p>
      `;
    }
    return `<p style="color:red;"><strong>Offline</strong></p>`;
  } catch {
    return `<p style="color:orange;">Status unavailable</p>`;
  }
}

function renderCard(server, { isFeatured, statusHTML }) {
  const cls = isFeatured ? 'card' : 'card2';
  const icon = normalizeIconPath(server.icon);
  const name = escapeHtml(server.name);
  const ip   = escapeHtml(server.ip);
  const desc = escapeHtml(server.description || '');
  const website = server.website ? `<p><a href="${escapeHtml(server.website)}" target="_blank" rel="noopener">Website</a></p>` : '';

  const div = document.createElement('div');
  div.className = cls;
  div.innerHTML = `
    <img src="${icon}" alt="${name}" />
    <h2>${name}</h2>
    <p><strong>IP:</strong> ${ip}</p>
    <p>${desc}</p>
    ${website}
    ${statusHTML || ''}
    <button class="copy-btn" data-ip="${ip}" aria-label="Copy IP">Copy</button>
  `;
  return div;
}

async function loadServers({ file, containerId, isFeatured, useStatus }) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container #${containerId} not found`);
    return;
  }

  let servers = [];
  try {
    servers = await fetchJSON(file);
    if (!Array.isArray(servers)) throw new Error('JSON must be an array');
  } catch (e) {
    console.error(e);
    container.innerHTML = `<p style="color:#ff6b6b;">Could not load ${escapeHtml(file)}</p>`;
    return;
  }

  for (const server of servers) {
    let statusHTML = '';
    if (useStatus && server.ip) {
      statusHTML = await getServerStatus(server.ip);
    }
    const card = renderCard(server, { isFeatured, statusHTML });
    container.appendChild(card);
  }
}

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const ip = btn.dataset.ip || '';
  try {
    await navigator.clipboard.writeText(ip);
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = 'Copy'), 1200);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = ip;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = 'Copy'), 1200);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  for (const cfg of LOADS) {
    await loadServers(cfg);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const openBtn  = document.querySelector('.nav-sandwich');
  const drawer   = document.getElementById('mobile-menu');
  const overlay  = document.getElementById('drawer-overlay');
  const closeBtn = drawer?.querySelector('.drawer-close');

  if (!openBtn || !drawer || !overlay) return;

  const open = () => {
    drawer.classList.add('open');
    overlay.classList.add('show');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('no-scroll');
  };

  const close = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('no-scroll');
  };

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
  });

  const mq = window.matchMedia('(min-width: 761px)');
  mq.addEventListener?.('change', (e) => { if (e.matches) close(); });
});

window.addEventListener('scroll', function () {

  const navbar = document.getElementById("navbar");
  if (window.scrollY >= 175) {
      navbar.style.backgroundColor = "#111111";
  } else {
      navbar.style.backgroundColor = "transparent";
  }
});

