const stage = document.querySelector('.story-stage');
const story = document.querySelector('.scroll-story');
const buttons = document.getElementById('seat-buttons');
const output = document.getElementById('result-text');
const number = document.getElementById('result-number');
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function updateScroll() {
  const maxScroll = Math.max(1, story.offsetHeight - innerHeight);
  const fraction = clamp(-story.getBoundingClientRect().top / maxScroll, 0, 1);
  // 1: автобус выезжает справа; 2: снизу поднимается блок и уходит заголовок.
  const busEnter = clamp((fraction - .10) / .34, 0, 1);
  const resultEnter = clamp((fraction - .49) / .25, 0, 1);
  const titleExit = clamp((fraction - .49) / .25, 0, 1);
  stage.style.setProperty('--transition', busEnter.toFixed(4));
  stage.style.setProperty('--bus-enter', busEnter.toFixed(4));
  stage.style.setProperty('--result-enter', resultEnter.toFixed(4));
  stage.style.setProperty('--title-exit', titleExit.toFixed(4));
  stage.classList.toggle('is-interactive', busEnter > .98 && resultEnter > .98);
}
addEventListener('scroll', updateScroll, { passive: true });
addEventListener('resize', updateScroll);
updateScroll();

// Координаты сидений в процентах относительно изображения 1920 × 800.
// Передняя часть автобуса находится справа.
const rows = [
  [11.5, 29, 5.8, 10], [11.5, 40, 5.8, 10], [11.5, 51, 5.8, 10], [11.5, 62, 5.8, 10], [11.5, 73, 5.8, 10],
  [19.5, 29, 5.8, 10], [19.5, 40, 5.8, 10], [19.5, 62, 5.8, 10], [19.5, 73, 5.8, 10],
  [26.5, 29, 5.8, 10], [26.5, 40, 5.8, 10], [26.5, 62, 5.8, 10], [26.5, 73, 5.8, 10],
  [36.5, 29, 5.8, 10], [36.5, 40, 5.8, 10], [36.5, 62, 5.8, 10], [36.5, 73, 5.8, 10],
  [43.5, 29, 5.8, 10], [43.5, 40, 5.8, 10], [43.5, 62, 5.8, 10], [43.5, 73, 5.8, 10],
  [62.5, 29, 5.8, 10], [62.5, 40, 5.8, 10], [62.5, 62, 5.8, 10], [62.5, 73, 5.8, 10],
  [72.5, 29, 5.8, 10], [72.5, 40, 5.8, 10], [72.5, 62, 5.8, 10], [72.5, 73, 5.8, 10]
];
// Истории привязаны к конкретным местам, а не повторяются по кругу.
const seatStories = [
  'Ты сел у окна. Вид прекрасный, но теперь придётся просить соседку с огромной сумкой выпустить тебя на остановке.',
  null, // девушка с сумкой
  'Ты нашёл свободное место между рядами. Главное — не привлекать внимание человека с сумкой размером с половину автобуса.',
  'Парень в наушниках рядом не слышит объявлений. Похоже, спрашивать у него, какая следующая остановка, бесполезно.',
  null, // парень в наушниках
  'Ты сел у окна. Соседка с сумкой уже заняла половину пространства для ног, хотя сидит в другом ряду.',
  'Свободное место, но впереди кто-то увлечённо рассказывает историю всему автобусу. Теперь и тебе.',
  'Ты сел у прохода. Мимо постоянно протискиваются люди, а сумка соседки делает проход ещё уже.',
  'Парень в наушниках так погружён в музыку, что ты уже трижды попросил его подвинуться. Безрезультатно.',
  'Ты занял место рядом с разговорчивым пассажиром. Кажется, через пять минут будешь знать всю его биографию.',
  null, // разговорчивый мужчина
  'Ты сел рядом со спящим мужчиной. Его голова медленно наклоняется в твою сторону. Обратный отсчёт начался.',
  null, // спящий мужчина
  'Ты сел у окна. Впереди виднеется улица, а сзади кто-то настойчиво пинает спинку твоего сиденья.',
  'Ты занял место у прохода. Каждый, кто идёт к выходу, задевает тебя сумкой. Даже когда автобус почти пустой.',
  'Ты сел у прохода. На каждой остановке приходится убирать ноги, чтобы пропустить выходящих.',
  'Ты устроился у окна. Через проход бабушка уже присматривается: не пора ли тебе уступить место кому-нибудь ещё?',
  null, // бабушка
  'Ты сел рядом с бабушкой. Она уже спросила, тепло ли ты оделся, и куда едешь. Следующий вопрос — поел ли ты.',
  'Ты выбрал место у прохода. Бабушка напротив уверена, что именно здесь раньше было удобнее.',
  'Ты сел у окна. Автобус остановился у светофора, и теперь вы с водителем соседней машины неловко смотрите друг на друга.',
  null, // мама с ребёнком
  'Ты сел рядом с мамой и ребёнком. Ребёнок уже смотрит на тебя так, будто сейчас начнётся игра в двадцать вопросов.',
  'Ты выбрал место у прохода. Ребёнок напротив машет тебе рукой уже пятую остановку подряд.',
  'Ты сел у окна. На стекле кто-то пальцем написал «помой меня». Судя по виду окна, это было давно.',
  'Ты занял место ближе к передней части автобуса. Здесь отлично слышно, как водитель комментирует каждую пробку.',
  'Ты сел у прохода. Дедушка по соседству уже приготовился рассказать, каким был этот маршрут двадцать лет назад.',
  null, // дедушка
  'Ты выбрал место у окна. Дедушка рядом смотрит на тебя с таким удивлением, будто ты занял его постоянное место.'
];
let typingTimer;
function typeText(text) {
  clearInterval(typingTimer);
  output.textContent = '';
  let i = 0;
  typingTimer = setInterval(() => {
    output.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(typingTimer);
  }, 17);
}
// Постоянные пассажиры. Индексы соответствуют массиву rows.
const occupiedSeats = new Map([
  [4, 'headphones'],
  [1, 'bag'],
  [12, 'sleeping'],
  [10, 'talking'],
  [17, 'grandma'],
  [21, 'mother'],
  [27, 'grandpa']
]);

// Фотографии лежат в отдельном слое, чтобы перемещение кнопок мест не двигало пассажиров.
const passengerLayer = document.createElement('div');
passengerLayer.className = 'passenger-layer';
buttons.parentElement.append(passengerLayer);

rows.forEach(([x,y,w,h],i) => {
  const button = document.createElement('button');
  button.className = 'seat-button';
  button.type = 'button';
  button.setAttribute('aria-label', 'Выбрать сиденье ' + (i+1));
  Object.assign(button.style, {left:x+'%', top:y+'%', width:w+'%', height:h+'%'});
  if (occupiedSeats.has(i)) {
    const passenger = document.createElement('span');
    passenger.className = 'occupied-passenger';
    const kind = occupiedSeats.get(i);
    passenger.classList.add('passenger-' + kind);
    passenger.setAttribute('aria-hidden', 'true');
    const avatar = document.createElement('img');
    avatar.className = 'occupied-passenger__image';
    const avatarFile = {
      sleeping: 'sleapyMan.png',
      mother: 'momBoy.png',
      grandma: 'babylya.png',
      grandpa: 'dedushka.png',
      bag: 'bigBag.png',
      talking: 'talkingMan.png',
      headphones: 'boyHeadphones.png'
    }[kind];
    avatar.src = 'images/' + avatarFile;
    avatar.alt = '';
    avatar.draggable = false;
    passenger.append(avatar);
    Object.assign(passenger.style, {left:x+'%', top:y+'%', width:w+'%', height:h+'%'});
    passengerLayer.append(passenger);
    button.classList.add('is-occupied');
    button.disabled = true;
    button.setAttribute('aria-label', 'Место занято');
    button.title = 'Место занято';
  }
  button.addEventListener('click', () => {
    buttons.querySelectorAll('.is-selected').forEach(el => el.classList.remove('is-selected'));
    button.classList.add('is-selected');
    number.textContent = String(i+1).padStart(2,'0') + ' / ТВОЁ МЕСТО';
    typeText(seatStories[i] || 'Место занято. Попробуй выбрать свободное.');
  });
  buttons.append(button);
});

/* Навигация по лонгриду и подсветка текущего раздела. */
const navLinks = [...document.querySelectorAll('.section-nav__link')];
const navSections = navLinks.map(link => document.getElementById(link.dataset.section));
function updateSectionNav() {
  const focusLine = window.scrollY + window.innerHeight * .42;
  let active = 0;
  navSections.forEach((section, index) => {
    if (section && section.offsetTop <= focusLine) active = index;
  });
  navLinks.forEach((link, index) => {
    const selected = index === active;
    link.classList.toggle('is-active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
navLinks.forEach((link, index) => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const section = navSections[index];
    if (!section) return;
    const destination = index === 0
      ? story.offsetTop + Math.max(0, story.offsetHeight - window.innerHeight) * .75
      : section.offsetTop;
    window.scrollTo({ top: destination, behavior: 'smooth' });
    history.replaceState(null, '', '#' + link.dataset.section);
  });
});
addEventListener('scroll', updateSectionNav, { passive: true });
addEventListener('resize', updateSectionNav);
updateSectionNav();


/* Эксперимент по проксемике: перетаскиваем пассажира в границах схемы. */
(() => {
  const svg = document.getElementById('distance-map');
  if (!svg) return;
  const dot = document.getElementById('distance-dot');
  const inner = document.getElementById('distance-inner');
  const outer = document.getElementById('distance-outer');
  const stem = document.getElementById('distance-stem');
  const direction = document.getElementById('distance-direction');
  const message = document.getElementById('distance-message');
  const detail = document.getElementById('distance-detail');
  const factors = [
    { name: 'БАГАЖ', x: 275, y: 175, message: 'Багаж занимает твою зону.', detail: 'Чужие вещи на соседнем сиденье заставляют держаться дальше.' },
    { name: 'ДРУГИЕ ЛЮДИ', x: 525, y: 175, message: 'Чужие границы становятся ближе.', detail: 'Когда рядом незнакомцы, хочется оставить себе хотя бы немного пространства.' },
    { name: 'ОКНО', x: 275, y: 330, message: 'У окна спокойнее.', detail: 'С одной стороны никто не сядет: личное пространство кажется защищённее.' },
    { name: 'ВЫХОД', x: 525, y: 330, message: 'Выход даёт контроль.', detail: 'Близость к двери помогает быстрее выйти, но рядом чаще проходят люди.' },
    { name: 'МЕСТО', x: 400, y: 395, message: 'Место становится твоим.', detail: 'Даже одно сиденье задаёт временную границу между тобой и остальными.' }
  ];
  let position = { x: 400, y: 255 };
  let dragging = false;
  const clampMap = (value, min, max) => Math.max(min, Math.min(max, value));
  function render(x, y) {
    const dx = x - 400, dy = y - 255;
    const length = Math.hypot(dx, dy);
    const scale = length > 55 ? 55 / length : 1;
    position = { x: 400 + dx * scale, y: 255 + dy * scale };
    const px = position.x, py = position.y;
    dot.setAttribute('cx', px); dot.setAttribute('cy', py);
    stem.setAttribute('x1', px); stem.setAttribute('y1', py);
    stem.setAttribute('x2', px); stem.setAttribute('y2', py + 44);
    // Оба контура следуют за точкой, но с разной скоростью;
    // внешняя зона сужается ближе к людям и багажу.
    inner.setAttribute('cx', 400 + (px - 400) * .55);
    inner.setAttribute('cy', 255 + (py - 255) * .55);
    outer.setAttribute('cx', 400 + (px - 400) * .28);
    outer.setAttribute('cy', 255 + (py - 255) * .28);
    const nearPeople = Math.max(0, (px - 400) / 115);
    const nearBag = Math.max(0, (400 - px) / 115);
    inner.setAttribute('r', (91 - 17 * nearPeople - 8 * nearBag + 8 * Math.max(0, (py - 255) / 115)).toFixed(1));
    outer.setAttribute('r', (135 - 24 * nearPeople - 13 * nearBag).toFixed(1));
    if (length < 18) {
      direction.textContent = 'ЦЕНТР';
      message.textContent = 'Пока всё в равновесии.';
      detail.textContent = 'Сдвинь точку к одному из факторов, чтобы увидеть, как он влияет на ощущение пространства.';
      dot.setAttribute('aria-valuetext', 'В центре');
      return;
    }
    let nearest = factors[0], best = Infinity;
    factors.forEach(factor => {
      const distance = Math.hypot(px - factor.x, py - factor.y);
      if (distance < best) { best = distance; nearest = factor; }
    });
    direction.textContent = nearest.name;
    message.textContent = nearest.message;
    detail.textContent = nearest.detail;
    dot.setAttribute('aria-valuetext', nearest.name.toLowerCase());
  }
  function pointFromEvent(event) {
    const p = svg.createSVGPoint();
    p.x = event.clientX; p.y = event.clientY;
    const matrix = svg.getScreenCTM();
    return matrix ? p.matrixTransform(matrix.inverse()) : position;
  }
  dot.addEventListener('pointerdown', event => {
    dragging = true;
    dot.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  dot.addEventListener('pointermove', event => {
    if (!dragging) return;
    const p = pointFromEvent(event);
    render(p.x, p.y);
  });
  const finish = () => { dragging = false; };
  dot.addEventListener('pointerup', finish);
  dot.addEventListener('pointercancel', finish);
  dot.addEventListener('lostpointercapture', finish);
  dot.addEventListener('keydown', event => {
    const moves = { ArrowLeft: [-10,0], ArrowRight: [10,0], ArrowUp: [0,-10], ArrowDown: [0,10] };
    if (!moves[event.key]) return;
    event.preventDefault();
    render(position.x + moves[event.key][0], position.y + moves[event.key][1]);
  });
  render(400, 255);
})();


/* Рейтинг соседей: сначала впечатление, затем неприятный сюрприз. */
(() => {
  const cards = [...document.querySelectorAll('.neighbor-card')];
  const panel = document.getElementById('neighbor-reveal');
  if (!cards.length || !panel) return;
  const scenarios = {
    headphones: { title: 'В НАУШНИКАХ. НО ТЫ ТОЖЕ СЛЫШИШЬ', text: 'Басы пробиваются наружу, и к третьей остановке ты уже знаешь припев Музыкальное сопровождение поездки выбрали за тебя', score: 'ТИШИНА 10 / 100 · КОМФОРТ 38 / 100', percent: 38 },
    bag: { title: 'СУМКА ЗАНЯЛА ПОЛОВИНУ ТВОЕГО МЕСТА', text: 'Сначала багаж стоит в проходе Через минуту он уже на твоей стороне сиденья Личное пространство сокращается', score: 'ПРОСТРАНСТВО 20 / 100 · КОМФОРТ 46 / 100', percent: 46 },
    talker: { title: 'ТЕПЕРЬ ТЫ ЗНАЕШЬ ВСЮ ЕГО ЖИЗНЬ', text: 'Один вопрос о конечной остановке превращается в разговор на двадцать минут Ты просто хотела посмотреть в окно', score: 'ТИШИНА 0 / 100 · КОМФОРТ 24 / 100', percent: 24 },
    sleeper: { title: 'ТВОЁ ПЛЕЧО ТЕПЕРЬ ПОДУШКА', text: 'Он засыпает почти сразу и постепенно заваливается на тебя До своей остановки придётся сидеть очень аккуратно', score: 'СВОБОДА ДВИЖЕНИЯ 30 / 100 · КОМФОРТ 55 / 100', percent: 55 }
  };
  const opened = new Set();
  const title = document.getElementById('neighbor-reveal-title');
  const description = document.getElementById('neighbor-reveal-text');
  const percent = document.getElementById('neighbor-reveal-percent');
  const fill = document.getElementById('neighbor-reveal-fill');
  const caption = panel.querySelector('.neighbor-reveal__caption');
  const typeText = (text, node, token) => {
    let index = 0;
    const write = () => {
      if (token !== activeToken) return;
      index = Math.min(index + 2, text.length);
      node.textContent = text.slice(0, index);
      if (index < text.length) typingTimer = setTimeout(write, 22);
    };
    write();
  };
  let activeToken = 0;
  let typingTimer = null;
  const resetPanel = () => {
    activeToken++;
    clearTimeout(typingTimer);
    cards.forEach(card => { card.classList.remove('is-selected'); card.setAttribute('aria-expanded', 'false'); });
    caption.textContent = 'РЕЙТИНГ КОМФОРТАБЕЛЬНОСТИ';
    title.textContent = 'КТО СЯДЕТ РЯДОМ?';
    description.textContent = 'Выбери пассажира сверху — здесь появится история твоей поездки.';
    percent.textContent = '0%';
    fill.style.width = '0%';
  };
  cards.forEach((card, index) => card.addEventListener('click', () => {
    const item = scenarios[card.dataset.neighbor];
    if (!item) return;
    activeToken++;
    clearTimeout(typingTimer);
    const token = activeToken;
    opened.add(card.dataset.neighbor);
    cards.forEach(other => {
      const selected = other === card;
      other.classList.toggle('is-selected', selected);
      other.setAttribute('aria-expanded', String(selected));
    });
    caption.textContent = 'РЕЙТИНГ КОМФОРТАБЕЛЬНОСТИ ПОЕЗДКИ';
    percent.textContent = item.percent + '%';
    fill.style.width = '0%';
    requestAnimationFrame(() => { if (token === activeToken) fill.style.width = item.percent + '%'; });
    title.textContent = item.title;
    description.textContent = '';

    typeText(item.text, description, token);
    if (window.matchMedia('(max-width: 950px)').matches) panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }));
  resetPanel();
})();

// Fit the full title exactly inside the right column on any viewport/font load.
(function fitHeroTitle() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  const frame = title.parentElement;
  function fit() {
    title.style.setProperty('--hero-scale-x', '1');
    const available = frame.clientWidth;
    const measured = title.offsetWidth;
    if (available > 0 && measured > 0) {
      title.style.setProperty('--hero-scale-x', (available / measured).toFixed(5));
    }
  }
  window.addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(fit);
  fit();
})();


/* Scroll-controlled personal distance: stranger approaches, you retreat, they keep following. */
(() => {
 const section=document.getElementById('closeness-section');
 const scene=document.getElementById('closeness-scene');
 const status=document.getElementById('closeness-status');
 const description=document.getElementById('closeness-description');
 if(!section||!scene||!status||!description)return;
 const clamp=(n)=>Math.max(0,Math.min(1,n));
 let lastStage=-1;
 let ticking=false;
 function render(){
  ticking=false;
  const rect=section.getBoundingClientRect();
  const distance=Math.max(1,rect.height-window.innerHeight);
  const progress=clamp(-rect.top/distance);
  // First the stranger moves alone. After 45%, you move away,
  // but the stranger keeps approaching and closes the gap.
  const retreat=clamp((progress-.45)/.55);
  const approach=clamp(progress);
  scene.style.setProperty('--stranger-approach',approach.toFixed(4));
  scene.style.setProperty('--you-retreat',retreat.toFixed(4));
  section.style.setProperty('--scroll-progress',progress.toFixed(4));
  const stage=progress<.18?0:progress<.45?1:progress<.72?2:3;
  if(stage===lastStage)return;
  lastStage=stage;
  const messages=[
   ['Пока комфортно','Между вами достаточно пространства. Присутствие другого человека почти не ощущается.'],
   ['Он приближается','Незнакомец сокращает расстояние. Ты начинаешь замечать его присутствие.'],
   ['Ты отодвигаешься','Ты пытаешься сохранить личное пространство, но незнакомец продолжает подходить ближе.'],
   ['Отойти не получается','Ты отдаляешься, а он всё равно приближается. В автобусе личные границы не всегда зависят только от тебя.']
  ];
  status.textContent=messages[stage][0];
  description.textContent=messages[stage][1];
 }
 function requestRender(){if(!ticking){ticking=true;requestAnimationFrame(render);}}
 window.addEventListener('scroll',requestRender,{passive:true});
 window.addEventListener('resize',requestRender);
 render();
})();


/* Inverted dot cursor, following pointer without interfering with controls. */
(() => {
 const dot=document.getElementById('invert-cursor');
 if(!dot || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
 const interactive='a,button,input,select,textarea,[role="button"],.seat-button';
 document.addEventListener('pointermove', e => {
   if(e.pointerType && e.pointerType!=='mouse' && e.pointerType!=='pen') return;
   dot.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
   dot.classList.add('is-visible');
   dot.classList.toggle('is-hovering',Boolean(e.target.closest(interactive)));
 },{passive:true});
 document.addEventListener('pointerout',e => { if(!e.relatedTarget) dot.classList.remove('is-visible'); });
 window.addEventListener('blur',()=>dot.classList.remove('is-visible'));
})();


/* Reveal section navigation only after scrolling away from the first screen. */
(() => {
 const update=()=>document.body.classList.toggle('has-scrolled', Boolean(document.querySelector('.story-stage')?.classList.contains('is-interactive')) || window.scrollY >= (document.querySelector('.scroll-story')?.offsetHeight || Infinity) - window.innerHeight);
 window.addEventListener('scroll',update,{passive:true});
 update();
})();
