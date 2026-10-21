// Arcwise Studios: menu, lead form to WhatsApp, reveal on scroll. No inline scripts (strict CSP).
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const data = JSON.parse(document.getElementById('site-data').textContent);
  const $ = (s) => document.querySelector(s);
  const clean = (s, n) => String(s || '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);

  // year
  const y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());

  // mobile menu
  const btn = $('.menu'), nav = $('#site-nav');
  const setMenu = (open) => { btn.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); };
  btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 901px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

  // lead form -> WhatsApp or email (the button pressed decides)
  const form = $('#lead-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const via = (e.submitter && e.submitter.value) || 'wa';
    const f = new FormData(form);
    const name = clean(f.get('name'), 60), business = clean(f.get('business'), 80), country = clean(f.get('country'), 60), link = clean(f.get('link'), 160), need = clean(f.get('need'), 80);
    const err = $('#f-err');
    if (!name || !business) { err.textContent = data.err; (name ? $('#f-business') : $('#f-name')).focus(); return; }
    err.textContent = '';
    const M = data.msg;
    const body = [M.intro, '', `${M.name}: ${name}`, `${M.business}: ${business}`, country ? `${M.country}: ${country}` : null, link ? `${M.link}: ${link}` : null, `${M.need}: ${need}`].filter((x) => x !== null).join('\n');
    $('#f-ok').hidden = false;
    if (via === 'email') { location.href = 'mailto:' + data.email + '?subject=' + encodeURIComponent(M.subject + ': ' + business) + '&body=' + encodeURIComponent(body); return; }
    const url = 'https://wa.me/' + data.wa + '?text=' + encodeURIComponent(body);
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) location.href = url;
  });

  // reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { items.forEach((n) => n.classList.add('in')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach((n) => io.observe(n));
})();
