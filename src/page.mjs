// Renders one language version of the site. Every value goes through esc().
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const wa = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
const icon = {
  wa: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.05c-.24.68-1.42 1.31-1.95 1.36-.5.05-.97.23-3.28-.68-2.78-1.1-4.55-3.95-4.69-4.13-.13-.18-1.12-1.49-1.12-2.85 0-1.36.71-2.02.97-2.3.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.06.62.48.23.55.78 1.91.85 2.05.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.7 1.16 1.51 1.88 1.04.93 1.91 1.21 2.18 1.35.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.6.75 1.87.89.27.14.46.2.52.32.07.11.07.66-.17 1.34Z"/></svg>',
  arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
const mark = (cls = '') => `<svg class="mark ${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="M12 88A76 76 0 0 1 70 18" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/><circle cx="86" cy="14" r="9" class="dot"/></svg>`;

export function renderPage(site, work, L, assets) {
  const p = L.lang === 'id' ? '' : '/en';
  const hello = wa(site.whatsapp, L.waHello);
  const alt = L.lang === 'id' ? { href: `${site.url}/en/`, lang: 'en' } : { href: `${site.url}/`, lang: 'id' };
  const ld = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: site.name, url: site.url + L.path, areaServed: 'Worldwide', address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'ID' }, telephone: '+' + site.whatsapp, description: L.description };
  const data = { wa: site.whatsapp, err: L.form.err, intro: L.lang === 'id' ? 'Halo Arcwise Studios, saya mau minta konsep gratis.' : 'Hi Arcwise Studios, I\u2019d like a free concept.', labels: L.lang === 'id' ? { name: 'Nama', business: 'Bisnis', link: 'Link', need: 'Kebutuhan' } : { name: 'Name', business: 'Business', link: 'Link', need: 'Need' } };

  return `<!DOCTYPE html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(L.title)}</title>
<meta name="description" content="${esc(L.description)}">
<link rel="canonical" href="${esc(site.url + L.path)}">
<link rel="alternate" hreflang="${L.lang}" href="${esc(site.url + L.path)}">
<link rel="alternate" hreflang="${alt.lang}" href="${esc(alt.href)}">
<link rel="alternate" hreflang="x-default" href="${esc(site.url)}/en/">
<meta name="theme-color" content="#0F1115">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(L.title)}">
<meta property="og:description" content="${esc(L.description)}">
<meta property="og:url" content="${esc(site.url + L.path)}">
<meta property="og:image" content="${esc(site.url)}/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/space-grotesk-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/manrope-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${esc(assets.css)}">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
<script type="application/json" id="site-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
<script src="${esc(assets.js)}" defer></script>
</head>
<body>
<a class="skip" href="#main">${L.lang === 'id' ? 'Langsung ke konten' : 'Skip to content'}</a>
<header class="nav">
  <div class="wrap nav-in">
    <a class="logo" href="${p}/" aria-label="Arcwise Studios">${mark()}<span class="logo-word">arcwise<small>studios</small></span></a>
    <nav class="links" id="site-nav" aria-label="${L.lang === 'id' ? 'Menu utama' : 'Main menu'}">
      <a href="#work">${esc(L.nav.work)}</a><a href="#services">${esc(L.nav.services)}</a><a href="#process">${esc(L.nav.process)}</a><a href="#pricing">${esc(L.nav.pricing)}</a><a href="#faq">${esc(L.nav.faq)}</a>
    </nav>
    <div class="nav-right">
      <a class="lang" href="${esc(L.other.path)}" hreflang="${alt.lang}" lang="${alt.lang}">${esc(L.other.label)}</a>
      <a class="btn btn-sm" href="#contact">${esc(L.nav.cta)}</a>
      <button class="menu" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Menu"><span></span><span></span></button>
    </div>
  </div>
</header>

<main id="main">
<section class="hero">
  <svg class="hero-arc" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true"><path d="M430 760C620 520 860 210 1160 70" fill="none"/></svg>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow"><span class="pulse" aria-hidden="true"></span>${esc(L.hero.eyebrow)}</p>
      <h1>${esc(L.hero.h1a)} <span class="hl">${esc(L.hero.h1b)}</span> ${esc(L.hero.h1c)}</h1>
      <p class="lede">${esc(L.hero.lede)}</p>
      <div class="ctas"><a class="btn" href="#contact">${esc(L.hero.cta)}${icon.arrow}</a><a class="btn btn-ghost" href="#work">${esc(L.hero.cta2)}</a></div>
      <ul class="proof">${L.hero.proof.map((x) => `<li>${icon.check}${esc(x)}</li>`).join('')}</ul>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <figure class="shot s1"><img src="/img/galaxy-d-640.webp" width="640" height="400" alt="" fetchpriority="high"></figure>
      <figure class="shot s2"><img src="/img/moosh-d-640.webp" width="640" height="400" alt=""></figure>
      <figure class="phone"><img src="/img/galaxy-m.webp" width="360" height="720" alt=""></figure>
      <span class="hero-dot"></span>
    </div>
  </div>
</section>

<section id="work" class="sec">
  <div class="wrap">
    <div class="head reveal"><p class="eyebrow">${esc(L.workH)}</p><h2>${esc(L.workT)}</h2><p class="lede">${esc(L.workL)}</p></div>
    <div class="work">
      ${work.map((w) => `<article class="case reveal">
        <a class="case-media" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(L.view)}: ${esc(w.name)}">
          <img class="cd" src="/img/${esc(w.key)}-d.webp" width="1200" height="750" alt="${esc(w.name)}, desktop" loading="lazy" decoding="async">
          <img class="cm" src="/img/${esc(w.key)}-m.webp" width="360" height="720" alt="${esc(w.name)}, mobile" loading="lazy" decoding="async">
        </a>
        <div class="case-body">
          <div class="case-top"><h3>${esc(w.name)}</h3><span class="tag ${w.type === 'client' ? 'tag-client' : ''}">${esc(w.type === 'client' ? L.client : L.concept)} · ${esc(w.place)}</span></div>
          <p>${esc(w[L.lang])}</p>
          <a class="more" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">${esc(L.view)}${icon.arrow}</a>
        </div>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec dark" id="values">
  <div class="wrap">
    <div class="head reveal"><p class="eyebrow">${esc(L.valuesH)}</p><h2>${esc(L.valuesT)}</h2></div>
    <ol class="values">${L.values.map(([h, x], i) => `<li class="reveal"><span class="num">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(x)}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec" id="services">
  <div class="wrap split">
    <div class="head reveal"><p class="eyebrow">${esc(L.servicesH)}</p><h2>${esc(L.servicesT)}</h2></div>
    <ul class="services">${L.services.map(([h, x]) => `<li class="reveal"><h3>${esc(h)}</h3><p>${esc(x)}</p></li>`).join('')}</ul>
  </div>
</section>

<section class="sec tint" id="process">
  <div class="wrap">
    <div class="head reveal"><p class="eyebrow">${esc(L.processH)}</p><h2>${esc(L.processT)}</h2></div>
    <ol class="steps">${L.process.map(([h, x], i) => `<li class="reveal"><span class="step-n">${i + 1}</span><h3>${esc(h)}</h3><p>${esc(x)}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec" id="pricing">
  <div class="wrap">
    <div class="head reveal"><p class="eyebrow">${esc(L.pricingH)}</p><h2>${esc(L.pricingT)}</h2></div>
    <div class="plans">${L.plans.map((pl) => `<article class="plan reveal${pl.featured ? ' featured' : ''}">
      <p class="plan-note">${esc(pl.note)}</p><h3>${esc(pl.name)}</h3>
      <p class="price"><small>${esc(L.from)}</small> ${esc(pl.price)}</p>
      <ul>${pl.items.map((x) => `<li>${icon.check}${esc(x)}</li>`).join('')}</ul>
      <a class="btn ${pl.featured ? '' : 'btn-line'}" href="#contact">${esc(L.nav.cta)}</a>
    </article>`).join('')}</div>
    <div class="monthly reveal">${L.monthly.map(([n, pr, d]) => `<div><b>${esc(n)}</b><span class="m-price">${esc(L.from)} ${esc(pr)}${esc(L.perMonth)}</span><span class="m-desc">${esc(d)}</span></div>`).join('')}</div>
    <p class="fine">${esc(L.priceNote)}</p>
  </div>
</section>

<section class="sec tint" id="faq">
  <div class="wrap split">
    <div class="head reveal"><p class="eyebrow">${esc(L.faqH)}</p><h2>${L.lang === 'id' ? 'Yang sering ditanyakan.' : 'Good questions.'}</h2></div>
    <div class="faq">${L.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
  </div>
</section>

<section class="sec dark contact" id="contact">
  <div class="wrap split">
    <div class="head reveal">${mark('mark-lg')}<h2>${esc(L.contactH)}</h2><p class="lede">${esc(L.contactL)}</p>
      <p class="direct"><a href="${esc(hello)}" target="_blank" rel="noopener noreferrer">${icon.wa}${esc(site.whatsappDisplay)}</a></p></div>
    <form class="form reveal" id="lead-form" novalidate>
      <div class="row"><label for="f-name">${esc(L.form.name)}</label><input id="f-name" name="name" type="text" maxlength="60" autocomplete="name" required></div>
      <div class="row"><label for="f-business">${esc(L.form.business)}</label><input id="f-business" name="business" type="text" maxlength="80" autocomplete="organization" required></div>
      <div class="row"><label for="f-link">${esc(L.form.link)}</label><input id="f-link" name="link" type="text" maxlength="160" inputmode="url" autocomplete="url"></div>
      <div class="row"><label for="f-need">${esc(L.form.need)}</label><select id="f-need" name="need">${L.form.needs.map((n) => `<option>${esc(n)}</option>`).join('')}</select></div>
      <p class="err" id="f-err" role="alert"></p>
      <button class="btn btn-full" type="submit">${icon.wa}${esc(L.form.send)}</button>
      <p class="ok" id="f-ok" hidden>${esc(L.form.ok)} <a id="f-ok-link" href="${esc(hello)}" target="_blank" rel="noopener noreferrer">${esc(L.form.okLink)}</a>.</p>
    </form>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap foot-in">
    <a class="logo" href="${p}/" aria-label="Arcwise Studios">${mark()}<span class="logo-word">arcwise<small>studios</small></span></a>
    <p>${esc(L.footer)}</p>
    <p class="foot-links"><a href="${esc(hello)}" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="${esc(L.other.path)}" hreflang="${alt.lang}">${L.lang === 'id' ? 'English' : 'Bahasa Indonesia'}</a><span>© <span id="year">2026</span> Arcwise Studios</span></p>
  </div>
</footer>
<a class="fab" href="${esc(hello)}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Arcwise Studios">${icon.wa}</a>
</body>
</html>
`;
}
