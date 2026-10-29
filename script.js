/* =====================================================
   AI Explorers — script.js
   Edit the DATA section below to change content.
   ===================================================== */
document.documentElement.classList.add('js');

/* ---------- DATA ---------- */

// Overview cards (icon names come from https://lucide.dev/icons)
const TOPICS = [
  { id: 'goal', icon: 'target', title: 'ما الهدف من الذكاء الاصطناعي؟', accent: '#4F46E5', bg: '#E0E7FF' },
  { id: 'role', icon: 'globe', title: 'ما دور الذكاء الاصطناعي؟', accent: '#0E7490', bg: '#CFFAFE' },
  { id: 'ethics', icon: 'scale', title: 'ما أخلاقيات استخدامه؟', accent: '#BE185D', bg: '#FCE7F3' },
  { id: 'pros-cons', icon: 'git-compare', title: 'ما إيجابياته وسلبياته؟', accent: '#B45309', bg: '#FEF3C7' }
];

// Image for the square in the "goal" section. Paste a URL or a local path like 'images/goal.jpg'.
// While empty, the robot illustration is shown.
const GOAL_IMAGE = '';

// Application cards. To use a real photo, set image: 'URL' (an <img> is layered over the gradient;
// if it fails to load it is removed and the gradient + icon remain).
const APPLICATIONS = [
  { icon: 'book-open', title: 'التعليم', c1: '#4F46E5', c2: '#38BDF8', image: 'download (1).webp',
    short: 'يساعد كل طالب على التعلم بالسرعة التي تناسبه.',
    more: 'بعض المنصات التعليمية تلاحظ الأسئلة التي تخطئ فيها وتقترح تمارين إضافية عليها، كما تشرح الدرس بطرق مختلفة.',
    note: 'المعلّم يبقى هو من يوجّه الطلاب ويقيّم فهمهم.' },
  { icon: 'stethoscope', title: 'الطب', c1: '#0F766E', c2: '#2DD4BF', image: 'download (2).webp',
    short: 'يساعد الأطباء في قراءة الصور الطبية واكتشاف المشكلات مبكرًا.',
    more: 'يمكن لبعض البرامج فحص صور الأشعة وتنبيه الطبيب إلى مناطق تستحق الانتباه.',
    note: 'الطبيب هو من يتخذ قرار التشخيص والعلاج.' },
  { icon: 'sprout', title: 'الزراعة', c1: '#15803D', c2: '#86EFAC', image: 'download (3).webp',
    short: 'يساعد المزارعين على العناية بالنباتات وتوفير المياه.',
    more: 'تلتقط الطائرات المسيّرة صورًا للحقول، وتحللها البرامج لمعرفة النباتات العطشى أو المريضة.',
    note: 'خبرة المزارع تظل أساسية لفهم أرضه ومحصوله.' },
  { icon: 'car-front', title: 'المواصلات', c1: '#1D4ED8', c2: '#93C5FD', image: 'download (4).webp',
    short: 'يساعد في اختيار أفضل الطرق وتنظيم حركة المرور.',
    more: 'تعتمد تطبيقات الخرائط على بيانات الطرق لتقترح مسارًا أسرع، وتجرب بعض المركبات ميزات القيادة المساعِدة.',
    note: 'السائق يجب أن يبقى منتبهًا ومسؤولًا.' },
  { icon: 'telescope', title: 'العلوم والأبحاث', c1: '#172554', c2: '#6366F1', image: 'download (5).webp',
    short: 'يسرّع تحليل البيانات الضخمة التي يجمعها العلماء.',
    more: 'يساعد في فرز صور الفضاء، ودراسة المناخ، والبحث بين آلاف الاحتمالات لتحضير تجارب جديدة.',
    note: 'العلماء يصمّمون التجارب ويتحققون من النتائج.' },
  { icon: 'palette', title: 'الفن والإبداع', c1: '#C2410C', c2: '#FBBF24', image: 'download (6).webp',
    short: 'يمنحنا أفكارًا وأدوات جديدة للرسم والموسيقى والكتابة.',
    more: 'يمكنك أن تطلب منه اقتراحات لقصة أو ألوان لتصميم، ثم تختار منها وتضيف بصمتك الخاصة.',
    note: 'الإبداع الحقيقي يبدأ من خيالك أنت.' }
];

// Ethics scenario ("ماذا ستفعل؟")
const SCENARIO = {
  question: 'طلب منك أحد تطبيقات الذكاء الاصطناعي إدخال كلمة المرور الخاصة بك. ما التصرف الصحيح؟',
  options: [
    { text: 'أكتب كلمة المرور لأن التطبيق ذكي.', correct: false, feedback: 'ليس صحيحًا. كلمة المرور سرّ خاص بك، ولا تُعطى لأي تطبيق دون سبب موثوق.' },
    { text: 'لا أدخلها، وأسأل والديّ أو معلمي أولًا.', correct: true, feedback: 'أحسنت! حماية بياناتنا الشخصية تأتي أولًا، والاستشارة قبل المشاركة تصرف ذكي.' },
    { text: 'أشاركها مع صديقي ليجرب التطبيق.', correct: false, feedback: 'ليس صحيحًا. مشاركة كلمة المرور مع أي شخص تعرّض حسابك للخطر.' }
  ]
};

// One video under each section. Paste a verified YouTube video ID (the part after v= in the link)
// into `id`. While `id` is empty, a clearly labelled placeholder is shown. Nothing autoplays.
const VIDEOS = {
  'goal': { id: 'ZYkADYcGN5w', title: 'ما هو الذكاء الاصطناعي؟', text: 'مقدمة مبسطة تشرح فكرة الذكاء الاصطناعي وهدفه.' },
  'role': { id: 'm5lQnqTRb0U', title: 'الذكاء الاصطناعي في حياتنا', text: 'أمثلة على استخدامه في التعليم والطب والزراعة وغيرها.' },
};



/* ---------- HELPERS ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const refreshIcons = () => { if (window.lucide) window.lucide.createIcons(); };

/** Creates an element with optional class and text. */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/** Adds an <img> over a gradient media box; removes it if loading fails. */
function addImage(box, src, alt) {
  if (!src) return;
  const img = el('img');
  img.src = src; img.alt = alt; img.loading = 'lazy';
  img.addEventListener('error', () => img.remove());
  box.appendChild(img);
}

/* ---------- NAVIGATION ---------- */
const navToggle = $('#navToggle');
const navLinks = $('#navLinks');

/** Opens/closes the mobile menu and keeps aria-expanded in sync. */
function setMenu(open) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/** Highlights the nav link of the section currently in view. */
const spySections = [...document.querySelectorAll('#navLinks a')]
  .map(a => ({ link: a, section: $(a.getAttribute('href')) })).filter(x => x.section);
function updateActiveLink() {
  const y = window.scrollY + 120;
  let current = spySections[0];
  spySections.forEach(item => { if (item.section.offsetTop <= y) current = item; });
  spySections.forEach(item => {
    const active = item === current;
    item.link.classList.toggle('active', active);
    active ? item.link.setAttribute('aria-current', 'true') : item.link.removeAttribute('aria-current');
  });
}



/* ---------- ROLE CARDS + MODAL ---------- */
const modal = $('#modal');
let lastTrigger = null;

/** Opens the details modal for an application and moves focus into it. */
function openModal(app, trigger) {
  lastTrigger = trigger;
  $('#modalTitle').textContent = app.title;
  $('#modalText').textContent = app.more;
  $('#modalNote').textContent = app.note;
  const media = $('#modalMedia');
  media.innerHTML = `<i data-lucide="${app.icon}"></i>`;
  media.style.setProperty('--c1', app.c1); media.style.setProperty('--c2', app.c2);
  addImage(media, app.image, app.title);
  refreshIcons();
  modal.hidden = false;
  $('#modalClose').focus();
}
function closeModal() {
  modal.hidden = true;
  if (lastTrigger) lastTrigger.focus();
}
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

(function buildApplications() {
  const grid = $('#roleGrid');
  APPLICATIONS.forEach(app => {
    const card = el('button', 'card app-card reveal');
    card.type = 'button';
    card.setAttribute('aria-haspopup', 'dialog');
    const media = el('div', 'app-media');
    media.style.setProperty('--c1', app.c1); media.style.setProperty('--c2', app.c2);
    media.innerHTML = `<i data-lucide="${app.icon}"></i>`;
    addImage(media, app.image, app.title);
    const body = el('div', 'app-body');
    body.append(el('h3', '', app.title), el('p', '', app.short));
    const more = el('span', 'more', 'اعرف المزيد');
    body.appendChild(more);
    card.append(media, body);
    card.addEventListener('click', () => openModal(app, card));
    grid.appendChild(card);
  });
})();

/* ---------- ETHICS SCENARIO ---------- */
(function buildScenario() {
  $('#scenarioQ').textContent = SCENARIO.question;
  const box = $('#scenarioOptions');
  const fb = $('#scenarioFeedback');
  SCENARIO.options.forEach(opt => {
    const b = el('button', 'option');
    b.type = 'button';
    b.append(el('span', 'text', opt.text));
    b.addEventListener('click', () => {
      // Lock all answers, mark right/wrong with an icon AND color, then explain.
      [...box.children].forEach((btn, i) => {
        btn.disabled = true;
        const ok = SCENARIO.options[i].correct;
        if (btn === b || ok) {
          btn.classList.add(ok ? 'correct' : 'wrong');
          btn.prepend(Object.assign(el('span', 'mark', ok ? '✓' : '✕'), { ariaHidden: 'true' }));
        }
      });
      fb.textContent = opt.feedback;
      fb.className = 'feedback ' + (opt.correct ? 'good' : 'bad');
      if (!opt.correct) addRetry(box, fb);
    });
    box.appendChild(b);
  });

  /** Lets the student try the scenario again after a wrong answer. */
  function addRetry(container, feedbackEl) {
    const retry = el('button', 'btn btn-outline', 'جرّب مرة أخرى');
    retry.type = 'button';
    retry.addEventListener('click', () => {
      container.innerHTML = ''; feedbackEl.textContent = ''; feedbackEl.className = 'feedback';
      buildScenario();
    });
    feedbackEl.after(retry);
    retry.addEventListener('click', () => retry.remove());
  }
})();

/* ---------- VIDEOS ---------- */
/** Fills every [data-video] slot in the page with that section's video (or a placeholder). */
(function buildVideos() {
  document.querySelectorAll('[data-video]').forEach(slot => {
    const v = VIDEOS[slot.dataset.video];
    if (!v) return;
    const card = el('article', 'video-card reveal');
    const head = el('div', 'video-head');
    head.innerHTML = '<i data-lucide="circle-play"></i>';
    head.append(el('span', '', 'شاهد وتعلّم: ' + v.title));
    const frame = el('div', 'video-frame');
    if (v.id) {
      const iframe = el('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id); // no autoplay
      iframe.title = v.title; iframe.loading = 'lazy'; iframe.allowFullscreen = true;
      iframe.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';
      frame.appendChild(iframe);
    } else {
      const ph = el('div', 'video-placeholder');
      ph.innerHTML = 'مكان مخصص للفيديو (لم يُضف رابط بعد).<br>ضع معرّف فيديو يوتيوب في <code>VIDEOS[\'' + slot.dataset.video + '\'].id</code> داخل script.js';
      frame.appendChild(ph);
    }
    card.append(head, frame, el('p', 'video-text', v.text));
    slot.appendChild(card);
  });
})();


/* ---------- SCROLL REVEAL ---------- */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = 'IntersectionObserver' in window && !reducedMotion
  ? new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); revealObserver.unobserve(en.target); }
    }), { threshold: 0.12 })
  : null;
document.querySelectorAll('.reveal').forEach(node => revealObserver ? revealObserver.observe(node) : node.classList.add('visible'));

/* ---------- BACK TO TOP ---------- */
const floatTop = $('#floatTop');
const goTop = () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
floatTop.addEventListener('click', goTop);
$('#toTopBtn').addEventListener('click', goTop);
window.addEventListener('scroll', () => {
  floatTop.classList.toggle('show', window.scrollY > 700);
  updateActiveLink();
}, { passive: true });

/* ---------- INIT ---------- */
addImage($('#goalImage'), GOAL_IMAGE, 'صورة تعبّر عن هدف الذكاء الاصطناعي');

updateActiveLink();
refreshIcons();
