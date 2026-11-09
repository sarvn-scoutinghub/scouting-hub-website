
const N =
  "English|Deutsch|Français|Italiano|Español|Português|Nederlands|Polski|Čeština|Slovenčina|Magyar|Română|Български|Hrvatski|Slovenščina|Ελληνικά|Dansk|Svenska|Norsk|Suomi|Íslenska|Eesti|Latviešu|Lietuvių|Malti".split("|"),
  C =
    "en|de|fr|it|es|pt|nl|pl|cs|sk|hu|ro|bg|hr|sl|el|da|sv|no|fi|is|et|lv|lt|mt".split("|");

const IM = [
  "images/truck-driver.jpg",
  "images/welder.jpg",
  "images/cnc.jpg",
  "images/warehouse.jpg",
  "images/hotel.jpg",
  "images/apprenticeship.jpg"
];

// Images used only by the talent cards; update these without changing the hero image.
const TALENT_IMAGES = [
  "images/truck_driver.webp",
  "images/welder.webp",
  "images/cnc.webp",
  "images/warehouse_staff.webp",
  "images/hotel.jpg",
  "images/apprenticeship.jpg"
];

const CARD_CTA = "Learn more";

const hs = (c, w) => {
  w = w || c.map(() => 1);
  const t = w.reduce((a, b) => a + b);
  let y = 0;

  return c.map((k, i) => {
    const h = 20 * w[i] / t,
      r = `<rect y="${y}" width="30" height="${h}" fill="${k}"/>`;

    y += h;
    return r;
  }).join('');
};

const vs = (c, w) => {
  w = w || c.map(() => 1);
  const t = w.reduce((a, b) => a + b);
  let x = 0;

  return c.map((k, i) => {
    const v = 30 * w[i] / t,
      r = `<rect x="${x}" width="${v}" height="20" fill="${k}"/>`;

    x += v;
    return r;
  }).join('');
};

const nc = (bg, cr, i2) =>
  `<rect width="30" height="20" fill="${bg}"/><rect x="8" width="6" height="20" fill="${cr}"/><rect y="7" width="30" height="6" fill="${cr}"/>` +
  (i2
    ? `<rect x="9.5" width="3" height="20" fill="${i2}"/><rect y="8.5" width="30" height="3" fill="${i2}"/>`
    : '');

const F = {
  en: '<rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#C8102E" stroke-width="3.6"/>',

  de: hs(['#000', '#D00', '#FFCE00']),
  fr: vs(['#0055A4', '#fff', '#EF4135']),
  it: vs(['#009246', '#fff', '#CE2B37']),
  es: hs(['#AA151B', '#F1BF00', '#AA151B'], [1, 2, 1]),

  pt: vs(['#006600', '#FF0000'], [2, 3]) + '<circle cx="12" cy="10" r="3.4" fill="#FFCC00"/>',

  nl: hs(['#AE1C28', '#fff', '#21468B']),
  pl: hs(['#fff', '#DC143C']),

  cs: hs(['#fff', '#D7141A']) + '<path d="M0 0L15 10L0 20Z" fill="#11457E"/>',

  sk: hs(['#fff', '#0B4EA2', '#EE1C25']) + '<path d="M5 4h8v7q0 4-4 6-4-2-4-6z" fill="#EE1C25" stroke="#fff" stroke-width=".8"/><path d="M9 6v8M6.5 9h5" stroke="#fff" stroke-width="1.2"/>',

  hu: hs(['#CE2939', '#fff', '#477050']),
  ro: vs(['#002B7F', '#FCD116', '#CE1126']),
  bg: hs(['#fff', '#00966E', '#D62612']),

  hr: hs(['#FF0000', '#fff', '#171796']) + '<rect x="12" y="6" width="6" height="7" fill="#fff"/><path d="M12 6h2v2h-2zM16 6h2v2h-2zM14 8h2v2h-2zM12 10h2v2h-2zM16 10h2v2h-2z" fill="#f00"/>',

  sl: hs(['#fff', '#005DA4', '#ED1C24']) + '<path d="M5 4h6v6q0 3-3 4-3-1-3-4z" fill="#005DA4" stroke="#fff" stroke-width=".6"/>',

  el: [...Array(9)].map((_, i) =>
    `<rect y="${i * 20 / 9}" width="30" height="${20 / 9}" fill="${i % 2 ? '#fff' : '#0D5EAF'}"/>`
  ).join('') + '<rect width="11" height="11.1" fill="#0D5EAF"/><path d="M5.5 0V11.1M0 5.5H11" stroke="#fff" stroke-width="2.2"/>',

  da: nc('#C8102E', '#fff'),
  sv: nc('#006AA7', '#FECC00'),
  no: nc('#BA0C2F', '#fff', '#00205B'),
  fi: nc('#fff', '#003580'),
  is: nc('#02529C', '#fff', '#DC1E35'),

  et: hs(['#0072CE', '#000', '#fff']),
  lv: hs(['#9E3039', '#fff', '#9E3039'], [2, 1, 2]),
  lt: hs(['#FDB913', '#006A44', '#C1272D']),

  mt: vs(['#fff', '#CF142B']) + '<path d="M3 3h3v1h1v3H6v1H3V7H2V4h1z" fill="none" stroke="#999" stroke-width=".6"/>'
};

Object.assign(F, {
  at: hs(['#ED2939', '#fff', '#ED2939']),
  be: vs(['#000', '#FAE042', '#ED2939']),
  lu: hs(['#ED2939', '#fff', '#00A3E0']),
  li: hs(['#002B7F', '#CE1126']) + '<circle cx="7" cy="5" r="2" fill="#FFD83D"/>',
  ch: '<rect width="30" height="20" fill="#D52B1E"/><path d="M15 4v12M9 10h12" stroke="#fff" stroke-width="4"/>'
});

const fl = c =>
  `<svg viewBox="0 0 30 20" width="24" height="16" aria-hidden="true">${F[c]}<rect width="30" height="20" fill="none" stroke="#0005" stroke-width=".8"/></svg>`;

const P = ([x, y, z]) => [(x - y) * .866, (x + y) * .5 - z],
  pt = a => a.map(q => P(q).map(v => v.toFixed(1)).join(',')).join(' ');

const bx = (x, y, z, a, b, h, c) => {
  const g = (q, f) => `<polygon points="${pt(q)}" fill="${f}"/>`;

  return (
    g([[x, y + b, z], [x + a, y + b, z], [x + a, y + b, z + h], [x, y + b, z + h]], c[1]) +
    g([[x + a, y, z], [x + a, y + b, z], [x + a, y + b, z + h], [x + a, y, z + h]], c[2]) +
    g([[x, y, z + h], [x + a, y, z + h], [x + a, y + b, z + h], [x, y + b, z + h]], c[0])
  );
};

const CR = ['#F6F1E8', '#DDD3C2', '#BFB4A0'],
  GD = ['#E9AE52', '#C68A2E', '#98671A'],
  IN = ['#4B4842', '#2C2A26', '#171614'];

const sc = s =>
  `<svg viewBox="-56 -54 112 114" aria-hidden="true"><ellipse cx="0" cy="40" rx="52" ry="19" fill="#17161420"/>${s}</svg>`;

const ILL = [
  sc(
    bx(8, 2, 0, 44, 58, 5, CR) +
    bx(14, 10, 5, 28, 3, 1, GD) +
    bx(14, 18, 5, 22, 3, 1, IN) +
    bx(14, 26, 5, 26, 3, 1, IN) +
    bx(32, 38, 5, 14, 14, 16, GD)
  ),

  sc(
    bx(2, 14, 0, 58, 30, 3, IN) +
    bx(6, 22, 3, 14, 14, 18, CR) +
    bx(24, 22, 3, 14, 14, 30, CR) +
    bx(42, 22, 3, 14, 14, 44, GD)
  ),

  sc(
    bx(6, 6, 0, 42, 50, 5, CR) +
    bx(12, 10, 5, 42, 50, 5, CR) +
    bx(18, 14, 10, 42, 50, 5, CR) +
    bx(28, 26, 15, 16, 16, 14, GD)
  ),

  sc(
    bx(8, 2, 0, 40, 56, 9, IN) +
    `<g transform="translate(0,-9) matrix(.866 .5 -.866 .5 0 0)"><circle cx="28" cy="22" r="9" fill="#C68A2E"/><circle cx="28" cy="22" r="5" fill="none" stroke="#2C2A26" stroke-width="1.4"/></g>` +
    bx(22, 38, 9, 30, 14, 3, CR) +
    bx(22, 38, 12, 30, 4, 1, GD)
  ),

  sc(
    bx(2, 10, 0, 14, 40, 46, GD) +
    bx(16, 10, 0, 14, 40, 34, CR) +
    bx(30, 10, 0, 14, 40, 22, CR) +
    bx(44, 10, 0, 14, 40, 10, CR) +
    bx(6, 28, 46, 2, 2, 14, IN) +
    bx(8, 28, 54, 8, 1, 5, GD)
  )
];

const IC = [
  '<path d="M1 6h13v9H1zM14 9h4l3 3v3h-7"/><circle cx="6" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  '<path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>',
  '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
  '<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10"/>',
  '<path d="M2 18V7M2 14h20v4M22 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="6.5" cy="11" r="1.8"/>',
  '<path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>'
];

const CO = [
  ['en', 'en', 'United Kingdom', 'English'],
  ['bg', 'bg', 'Bulgaria', 'Български'],
  ['hr', 'hr', 'Croatia', 'Hrvatski'],
  ['cs', 'cs', 'Czechia', 'Čeština'],
  ['da', 'da', 'Denmark', 'Dansk'],
  ['et', 'et', 'Estonia', 'Eesti'],
  ['fi', 'fi', 'Finland', 'Suomi'],
  ['fr', 'fr', 'France', 'Français'],
  ['de', 'de', 'Germany', 'Deutsch'],
  ['el', 'el', 'Greece', 'Ελληνικά'],
  ['hu', 'hu', 'Hungary', 'Magyar'],
  ['is', 'is', 'Iceland', 'Íslenska'],
  ['it', 'it', 'Italy', 'Italiano'],
  ['lv', 'lv', 'Latvia', 'Latviešu'],
  ['li', 'de', 'Liechtenstein', 'Deutsch'],
  ['lt', 'lt', 'Lithuania', 'Lietuvių'],
  ['lu', 'fr', 'Luxembourg', 'Français'],
  ['mt', 'mt', 'Malta', 'Malti'],
  ['nl', 'nl', 'Netherlands', 'Nederlands'],
  ['no', 'no', 'Norway', 'Norsk'],
  ['pl', 'pl', 'Poland', 'Polski'],
  ['pt', 'pt', 'Portugal', 'Português'],
  ['ro', 'ro', 'Romania', 'Română'],
  ['sk', 'sk', 'Slovakia', 'Slovenčina'],
  ['sl', 'sl', 'Slovenia', 'Slovenščina'],
  ['es', 'es', 'Spain', 'Español'],
  ['sv', 'sv', 'Sweden', 'Svenska']
];

const HS = "images/handshake.jpg";

const NM = {
  employers: ["Katharina Weber", "Thomas Brandt", "Sabine Hoffmann", "Marta Kowalska", "Pieter van Dijk"],
  candidates: ["Arjun Kumar", "Suresh Babu", "Karthik Raja", "Priya Lakshmi", "Vignesh Murugan"]
};

const TE = [
  "Truck drivers",
  "Welders",
  "CNC specialists",
  "Warehouse staff",
  "Hotel & hospitality",
  "Apprenticeship support"
];

const $ = s => document.querySelector(s),
  $$ = s => document.querySelectorAll(s);

let cur = 'en',
  a = [],
  g = 0,
  qi = 0,
  si = 0,
  recruitingReturnPoint = null;

const fmt = s =>
  s.replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace('{e}', '<a href="mailto:info@scoutinghub.de">info@scoutinghub.de</a>');

const dots = (n, k) =>
  [...Array(n)].map((_, i) => `<i class="${i == k ? 'on' : ''}"></i>`).join('');

function R() {
  $('#cards').innerHTML = TE.map((_, i) =>
    `<a class="c" data-cursor="${CARD_CTA}" href="#recruiting"><div class="im"><img alt="${a[13 + i]}" src="${TALENT_IMAGES[i]}"></div><div class="bd"><div class="bgc"><svg class="ic" viewBox="0 0 24 24">${IC[i]}</svg></div><h3>${a[13 + i]}</h3><p>${a[37 + i]}</p><span class="q">${CARD_CTA} →</span></div></a>`
  ).join('');

  $('#steps').innerHTML = [0, 1, 2, 3, 4].map(i =>
    `<div class="row"><div class="ill">${ILL[i]}</div><div class="rn">0${i + 1}</div><h3>${a[43 + 2 * i]}</h3><p>${a[44 + 2 * i]}</p></div>`
  ).join('');

  $('#tb').innerHTML =
    `<button class="${g ? '' : 'on'}" data-g="0">${a[63]}</button><button class="${g ? 'on' : ''}" data-g="1">${a[62]}</button>`;

  const nm = g ? NM.candidates : NM.employers,
    q0 = g ? 65 : 70;

  $('#tq').innerHTML = [0, 1].map(k => {
    const j = (qi + k) % 5;
    return `<blockquote>${a[q0 + j]}<cite>${nm[j]}</cite></blockquote>`;
  }).join('');

  $('#td').innerHTML = dots(5, qi);

  $('#hd').innerHTML = TE.map((_, i) =>
    `<button data-i="${i}" aria-label="${a[13 + i]}" class="${i == si % 6 ? 'on' : ''}"></button>`
  ).join('');

  $('#cl').textContent = a[13 + si % 6];

  fm();
  pgs();
}

let fk = 'en';

function ap(c, f) {
  cur = c;
  f = f || (CO.find(o => o[1] == c) || CO[0])[0];
  fk = f;
  a = T[c].split("|");

  $$('[data-t]').forEach(e => e.innerHTML = fmt(a[e.dataset.t]));

  document.documentElement.lang = c;

  const o = CO.find(x => x[0] == f);

  $('#ddb').innerHTML = fl(f) + `<span>${o[2]}</span><span class="cv">▾</span>`;

  $$('.dl button').forEach(b =>
    b.classList.toggle('on', b.dataset.f == f)
  );

  R();
}

$('#dl').innerHTML = CO.map(o =>
  `<button role="option" data-c="${o[1]}" data-f="${o[0]}">${fl(o[0])}<span>${o[2]} <small>· ${o[3]}</small></span></button>`
).join('');

$('#ddb').onclick = e => {
  e.stopPropagation();
  $('#dd').classList.toggle('open');
};

addEventListener('click', () => $('#dd').classList.remove('open'));

addEventListener('keydown', e =>
  e.key == 'Escape' && $('#dd').classList.remove('open')
);

$('#dl').onclick = e => {
  const b = e.target.closest('button');
  if (!b) return;

  ap(b.dataset.c, b.dataset.f);

  try {
    localStorage.setItem('l', b.dataset.c);
    localStorage.setItem('f', b.dataset.f);
  } catch (x) {}

  $('#dd').classList.remove('open');
};

$('#tb').onclick = e => {
  const b = e.target.closest('button');

  if (b) {
    g = +b.dataset.g;
    qi = 0;
    R();
  }
};

$('#pv').onclick = () => {
  qi = (qi + 4) % 5;
  R();
};

$('#nx').onclick = () => {
  qi = (qi + 1) % 5;
  R();
};

let ft = 0;
const FV = {},
  LB = {
    fn: 'Name',
    fc: 'Company',
    fe: 'Email',
    fp: 'Phone',
    ftr: 'Trade',
    fw: 'Workers needed',
    fd: 'Available from / start date',
    fpl: 'Place of residence',
    fl: 'German level',
    fx: 'Experience (years)',
    fo: 'Organisation',
    fg: 'Message'
  };

const FD = [
  [
    ['fn', 106, 'text', 1],
    ['fc', 107, 'text', 1],
    ['fe', 77, 'email', 1],
    ['fp', 76, 'tel', 1],
    ['ftr', 109, 'trade', 1],
    ['fw', 114, 'number', 0],
    ['fd', 113, 'date', 0]
  ],
  [
    ['fn', 106, 'text', 1],
    ['fe', 77, 'email', 1],
    ['fp', 76, 'tel', 1],
    ['fpl', 108, 'text', 1],
    ['ftr', 109, 'trade', 1],
    ['fl', 110, 'lang', 1],
    ['fx', 112, 'exp', 0],
    ['fd', 113, 'date', 0]
  ]
];

const TI = [
  '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 20a6 6 0 0 0-3-5"/>',
  '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
  '<path d="M2 12l5-5 4 3 4-3 5 5-9 8z"/>'
];

function fm() {
  const ids = [22, 23];

  $('#tbs').innerHTML = ids.map((k, i) =>
    `<button type="button" data-i="${i}" class="${i == ft ? 'on' : ''}"><svg class="ic" viewBox="0 0 24 24" style="width:20px;height:20px">${TI[i]}</svg>${a[k]}</button>`
  ).join('');

  const opt = (arr, ph) =>
    `<option value="">${ph}</option>` +
    arr.map(x => `<option value="${x[0]}">${x[1]}</option>`).join('');

  const fld = d => {
    const [id, k, ty, rq] = d,
      v = FV[id] || '',
      lab = `<label for="${id}">${a[k]}${rq ? ' <i>*</i>' : ''}</label>`;

    let c;

    if (ty == 'trade') {
      c = `<select id="${id}" ${rq ? 'required' : ''}>${opt(TE.map((t, i) => [t, a[13 + i]]), a[94])}</select>`;
    } else if (ty == 'lang') {
      c = `<select id="${id}" ${rq ? 'required' : ''}>${opt([[a[111], a[111]], ['A1', 'A1'], ['A2', 'A2'], ['B1', 'B1'], ['B2', 'B2'], ['C1', 'C1'], ['C2', 'C2']], a[94])}</select>`;
    } else if (ty == 'exp') {
      c = `<select id="${id}">${opt(['0–1', '2–5', '6–10', '10+'].map(x => [x, x]), a[94])}</select>`;
    } else {
      c = `<input id="${id}" type="${ty}" ${ty == 'number' ? 'min="1"' : ''} ${rq ? 'required' : ''} value="${v.replace(/"/g, '&quot;')}">`;
    }

    return `<div>${lab}${c}</div>`;
  };

  $('#ff').innerHTML =
    FD[ft].map(fld).join('') +
    `<div class="sp2"><label for="fg">${a[91]}</label><textarea id="fg">${FV.fg || ''}</textarea></div><div class="sbm"><button type="submit">${a[116]}</button><small>${a[117]}</small></div>`;

  FD[ft].forEach(d => {
    const e = $('#' + d[0]);

    if (e && FV[d[0]] && e.tagName == 'SELECT') {
      e.value = FV[d[0]];
    }
  });
}

$('#tbs').onclick = e => {
  const b = e.target.closest('button');

  if (b) {
    ft = +b.dataset.i;
    fm();
  }
};

$('#ff').addEventListener('input', e => {
  if (e.target.id) FV[e.target.id] = e.target.value;
});

$('#ff').addEventListener('change', e => {
  if (e.target.id) FV[e.target.id] = e.target.value;
});

$('#fm').onsubmit = e => {
  e.preventDefault();

  const who = ['Employer', 'Candidate', 'Partner'][ft],
    rows = FD[ft].map(d => `${LB[d[0]]}: ${FV[d[0]] || '-'}`).join('\n'),
    m = `Hello Scouting Hub,\n\nEnquiry type: ${who}\n${rows}\n\nMessage:\n${FV.fg || '-'}`;

  const l = document.createElement('a');

  l.href = `mailto:info@scoutinghub.de?subject=${encodeURIComponent('Enquiry – ' + who)}&body=${encodeURIComponent(m)}`;
  l.click();
};

const VW = ['home', 'services', 'about', 'contact', 'recruiting'];

function cardH(img, ic, t, d, l = CARD_CTA) {
  return `<a class="c" data-cursor="${l}" href="#recruiting"><div class="im"><img alt="${t}" src="${img}"></div><div class="bd"><div class="bgc"><svg class="ic" viewBox="0 0 24 24">${ic}</svg></div><h3>${t}</h3><p>${d}</p><span class="q">${l} →</span></div></a>`;
}

function pgs() {
  const SI = [
    '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/>',
    '<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7"/>',
    '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 10h6M12 7v6M8 17h8"/>',
    '<path d="M2 12l4-4 5 1 3 2 3-2 5 4-4 5-3-2-3 3-2-2-2 2zM6 8l2-2a3 3 0 0 1 4 0l2 2M10 11l4 4a2 2 0 0 0 3-3M13 9l3 3a2 2 0 0 0 3-3"/>'
  ],
  SM = [
    ["images/interview.webp", 45],
    ["images/doc&lang.webp", 47],
    ["images/europe-travel.jpg", 49],
    [HS, 51]
  ];

  const sv = SM.map((m, i) =>
    cardH(m[0], SI[i], a[m[1]], a[m[1] + 1])
  ).join('');

  $('#sv1').innerHTML = sv;
  $('#sv2').innerHTML = sv;
  $('#cards2').innerHTML = $('#cards').innerHTML;

  $('#chk').innerHTML = [133, 134, 135, 136]
    .map(k => `<li>${a[k]}</li>`).join('');

  const o = [
    ['Employer enquiry', 22],
    ['Candidate application', 23],
    ['Apprenticeship (Ausbildung)', 18]
  ],
    s = $('#cs'),
    v = s.value;

  s.innerHTML =
    `<option value="">${a[94]}</option>` +
    o.map(x => `<option value="${x[0]}">${a[x[1]]}</option>`).join('');

  s.value = v;
}

const SK = () => {
  let r = 7;

  const rn = () => (r = (r * 9301 + 49297) % 233280) / 233280;

  let s = '<svg viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2f5a"/><stop offset=".45" stop-color="#b5546b"/><stop offset=".72" stop-color="#f0a04a"/><stop offset="1" stop-color="#f7d08a"/></linearGradient></defs><rect width="800" height="480" fill="url(#sg)"/><circle cx="560" cy="320" r="48" fill="#ffe6a8" opacity=".9"/>';

  [
    ['#6b4466', .55, 70, 150],
    ['#2a2230', 1, 50, 190]
  ].forEach(L => {
    let x = -10;

    while (x < 820) {
      const w = 26 + rn() * 40,
        h = L[2] + rn() * (L[3] - L[2]);

      s += `<rect x="${x}" y="${390 - h}" width="${w}" height="${h + 20}" fill="${L[0]}" opacity="${L[1]}"/>`;

      if (L[1] == 1) {
        for (let k = 0; k < 6; k++) {
          if (rn() > .45) {
            s += `<rect x="${x + 5 + rn() * (w - 12)}" y="${390 - h + 8 + k * 22}" width="4" height="6" fill="#f7c76b"/>`;
          }
        }
      }

      x += w + 3;
    }
  });

  s += '<rect y="390" width="800" height="90" fill="#171a26"/>';

  for (let k = 0; k < 9; k++) {
    s += `<rect x="${430 + rn() * 300}" y="${400 + k * 9}" width="${30 + rn() * 80}" height="2" fill="#f0a04a" opacity=".6"/>`;
  }

  return s + '<path d="M70 190Q400 10 730 120" fill="none" stroke="#f7d08a" stroke-width="2.5" stroke-dasharray="3 9" stroke-linecap="round"/><path d="M742 114l-26-4 8 12z" fill="#f7d08a"/></svg>';
};

const ISO = () => {
  let s = '<svg viewBox="-125 -105 250 215" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="ig" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6F1E8"/><stop offset="1" stop-color="#E5D8BF"/></linearGradient></defs><rect x="-125" y="-105" width="250" height="215" fill="url(#ig)"/>';

  const H = [
    [26, CR], [44, GD], [30, CR], [18, IN],
    [52, CR], [70, GD], [34, CR], [24, CR],
    [40, IN], [20, CR], [58, CR], [30, GD]
  ],
    cells = [];

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 4; i++) {
      cells.push([i, j, H[j * 4 + i]]);
    }
  }

  cells.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]));

  cells.forEach(c => {
    s += bx(c[0] * 36 - 50, c[1] * 36 - 50, 0, 28, 28, c[2][0], c[2][1]);
  });

  return s + '</svg>';
};

function route() {
  const h = decodeURIComponent(location.hash.slice(1));

  let v = 'home',
    el = null;

  if (VW.includes(h)) {
    v = h;
  } else if (h) {
    el = document.getElementById(h);

    const p = el && el.closest('.pg');

    if (p) v = p.id.slice(2);
  }

  $$('.pg').forEach(p =>
    p.classList.toggle('on', p.id == 'v-' + v)
  );

  const activeView = v == 'recruiting' ? 'services' : v;

  $$('nav.dn a,.fnav a').forEach(x =>
    x.classList.toggle('cur', x.getAttribute('href') == '#' + activeView)
  );

  if (el) {
    setTimeout(() => el.scrollIntoView(), 40);
  } else {
    scrollTo(0, 0);
  }
}

document.addEventListener('click', e => {
  const back = e.target.closest('.recruit-back');

  if (back) {
    e.preventDefault();

    if (recruitingReturnPoint) {
      const point = recruitingReturnPoint;
      recruitingReturnPoint = null;
      location.hash = point.hash;
      setTimeout(() => {
        const scrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        scrollTo(0, point.scrollY);
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }, 90);
    } else {
      location.hash = '#services';
    }

    return;
  }

  if (e.target.closest('a[href="#recruiting"]')) {
    recruitingReturnPoint = {
      hash: location.hash || '#home',
      scrollY: window.scrollY
    };
  }

  const t = e.target.closest('[data-tab]');

  if (t) {
    ft = +t.dataset.tab;
    fm();
  }
});

$('#cf').onsubmit = e => {
  e.preventDefault();

  const m = `Hello Scouting Hub,\n\n${$('#cm').value}\n\nName: ${$('#cn').value}\nEmail: ${$('#ce').value}\nPhone: ${$('#cp').value || '-'}`;

  const l = document.createElement('a');

  l.href = `mailto:info@scoutinghub.de?subject=${encodeURIComponent($('#cs').value || 'Enquiry')}&body=${encodeURIComponent(m)}`;
  l.click();
};

$('#art1').innerHTML = '<img src="images/berlin-night.jpg" alt="Berlin’s Brandenburg Gate illuminated at night" loading="lazy"><small class="photo-credit"><a href="https://commons.wikimedia.org/wiki/File:Brandenburg_Gate_at_night,_May_8,_2025.jpg" target="_blank" rel="noopener">Photo: Nurtenge</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a> · cropped</small>';
$('#art2').innerHTML = '';
$('#art3').innerHTML = '';

$('#ah').src = HS;
$('#chi').src = "images/team-contact1.webp";
$('#sh').style.backgroundImage = `url(${HS})`;
$('#ia').src = "images/career.webp";

let sv = 'en',
  sf = '';

try {
  sv = localStorage.getItem('l') || 'en';
  sf = localStorage.getItem('f') || '';
} catch (e) {}

ap(T[sv] ? sv : 'en', sf);


const tr = $('#tr');

const PO = [
  '0% 30%',
  '0% 40%',
  '0% 30%',
  '18% 40%',
  '62% 30%',
  '50% 30%'
];

// Stack the slides and fade between them; modulo navigation keeps every loop
// on the original set of images without relying on a cloned end slide.
tr.innerHTML = IM.map((s, i) =>
  `<div class="sl${i === 0 ? ' on' : ''}" style="background-image:url('${s}');background-position:${PO[i]}"></div>`
).join('');

let tm;

const go = n => {
  si = ((n % IM.length) + IM.length) % IM.length;

  $$('.sl').forEach((slide, i) =>
    slide.classList.toggle('on', i === si)
  );

  $$('#hd button').forEach((b, i) =>
    b.classList.toggle('on', i === si % IM.length)
  );

  $('#cl').textContent = a[13 + si % IM.length];
};

// Automatic image loop
const startSlider = () => {
  clearInterval(tm);
  tm = setInterval(() => {
    go(si + 1);
  }, 4000);
};

// Manual image navigation
$('#hd').onclick = e => {
  const b = e.target.closest('button');

  if (!b) return;

  go(Number(b.dataset.i));
  startSlider();
};

startSlider();


(() => {
  const ld = $('#ld'),
    br = $('#lbar'),
    nm = $('#lnum');

  document.body.style.overflow = 'hidden';

  const d = matchMedia('(prefers-reduced-motion:reduce)').matches ? 300 : 2000,
    t0 = performance.now();

  (function f(n) {
    const p = Math.min(1, (n - t0) / d),
      e = 1 - Math.pow(1 - p, 2.2);

    br.style.width = e * 100 + '%';
    nm.textContent = Math.round(e * 100);

    if (p < 1) {
      requestAnimationFrame(f);
    } else {
      ld.classList.add('out');
      document.body.style.overflow = '';
      setTimeout(() => ld.remove(), 800);
    }
  })(t0);
})();

addEventListener('hashchange', route);

const io = new IntersectionObserver(
  es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')),
  { threshold: .1 }
);

$$('.rv').forEach(e => io.observe(e));

if (
  matchMedia('(hover:hover) and (pointer:fine)').matches &&
  !matchMedia('(prefers-reduced-motion:reduce)').matches
) {
  document.body.classList.add('cur');

  const rg = $('#rg'),
    dt = $('#dt'),
    pg = $('#pg'),
    lb = $('#lbl');

  rg.style.display = dt.style.display = 'block';

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;

    dt.style.transform = `translate(${mx}px,${my}px)`;

    const t = e.target.closest('[data-cursor]'),
      b = e.target.closest('a,button'),
      d = !!e.target.closest('.hd,footer,.bn,#ld');

    lb.textContent = t ? t.dataset.cursor : '';
    rg.classList.toggle('big', !!(t || b));
    rg.classList.toggle('lt', d);
  });

  (function f() {
    rx += (mx - rx) * .38;
    ry += (my - ry) * .38;

    rg.style.transform = `translate(${rx}px,${ry}px)`;

    requestAnimationFrame(f);
  })();

  addEventListener('scroll', () => {
    const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);

    pg.style.strokeDashoffset = 131.9 * (1 - p);
  }, { passive: true });
}

route();
