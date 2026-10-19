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
const stories = [
  'Ты выбрал место у окна. Теперь придётся делать вид, что не замечаешь человека, который хочет выйти.',
  'Сосед включает видео без наушников. Поздравляем, теперь это ваш общий плейлист.',
  'Ты сел у прохода. На каждой остановке придётся вставать и пропускать людей.',
  'В автобус заходит человек с огромным рюкзаком. Рюкзак уже сидит рядом с тобой.',
  'Ты выбрал идеальное место. Но через остановку рядом садится человек с очень громким телефонным разговором.',
  'Место свободное, вид прекрасный. Правда, солнце светит прямо в глаза.',
  'Кто-то стоит над тобой и слишком внимательно смотрит в экран твоего телефона.',
  'Автобус резко тормозит. Ты внезапно знакомишься с соседом.',
  'Ты сел ближе к выходу. Теперь каждый входящий уверен, что ты должен подвинуться.',
  'Ты устроился поудобнее, но на следующей остановке заходит целая экскурсия.'
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
  [0, 'sleeping'],
  [8, 'mother'],
  [12, 'grandma'],
  [17, 'grandpa'],
  [23, 'bag'],
  [27, 'headphones']
]);

// Линейные пиктограммы в стиле присланного листа персонажей.
// Отдельный SVG для каждого пассажира, не часть фотографии автобуса.
function passengerIcon(kind) {
  const head = '<path d="M22 30 Q22 14 40 14 Q58 14 58 30 L56 45 Q51 56 40 57 Q29 56 24 45 Z"/>';
  const shoulders = '<path d="M26 55 Q14 60 13 70 Q40 76 67 70 Q66 60 54 55"/>';
  const hair = {
    sleeping: '<path d="M22 31 Q25 12 40 14 Q56 13 58 32 M28 25 Q40 15 51 27"/><path d="M19 61 Q28 52 38 60 Q46 54 55 62"/><path d="M61 12 L66 5 M67 12 L73 5"/>',
    mother: '<path d="M22 31 Q18 12 40 12 Q60 12 59 31 M24 25 Q39 16 56 25"/><path d="M20 31 Q13 46 21 56 M60 31 Q68 46 60 56"/><circle cx="61" cy="52" r="12"/><path d="M51 49 Q61 37 71 49 M53 63 Q61 58 69 63"/>',
    grandma: '<path d="M22 31 Q15 23 24 16 Q20 5 34 9 Q43 0 52 10 Q65 11 58 30"/><path d="M23 31 Q40 19 57 31"/><circle cx="32" cy="37" r="8"/><circle cx="49" cy="37" r="8"/><path d="M40 37 L41 37"/>',
    grandpa: '<path d="M22 30 Q20 14 40 13 Q60 14 58 30"/><path d="M22 31 Q29 21 40 28 Q49 21 58 31"/><circle cx="32" cy="38" r="8"/><circle cx="49" cy="38" r="8"/><path d="M40 38 L41 38 M33 51 Q40 56 47 51"/>',
    bag: '<path d="M22 30 Q22 14 40 14 Q58 14 58 30"/><path d="M22 27 L58 27"/><rect x="51" y="49" width="22" height="23" rx="3"/><path d="M57 49 L57 43 Q62 38 67 43 L67 49"/>',
    headphones: '<path d="M19 34 L19 28 Q19 7 40 7 Q61 7 61 28 L61 34"/><rect x="15" y="29" width="10" height="21" rx="4"/><rect x="55" y="29" width="10" height="21" rx="4"/>'
  };
  return '<svg viewBox="0 0 80 80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#111" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round">' + shoulders + head + (hair[kind] || '') + '</g></svg>';
}

rows.forEach(([x,y,w,h],i) => {
  const button = document.createElement('button');
  button.className = 'seat-button';
  button.type = 'button';
  button.setAttribute('aria-label', 'Выбрать сиденье ' + (i+1));
  Object.assign(button.style, {left:x+'%', top:`calc(${y}% - 1cm)`, width:w+'%', height:h+'%'});
  if (occupiedSeats.has(i)) {
    const passenger = document.createElement('span');
    passenger.className = 'occupied-passenger';
    passenger.innerHTML = passengerIcon(occupiedSeats.get(i));
    button.append(passenger);
    button.classList.add('is-occupied');
    button.disabled = true;
    button.setAttribute('aria-label', 'Место занято');
    button.title = 'Место занято';
  }
  button.addEventListener('click', () => {
    buttons.querySelectorAll('.is-selected').forEach(el => el.classList.remove('is-selected'));
    button.classList.add('is-selected');
    number.textContent = String(i+1).padStart(2,'0') + ' / ТВОЁ МЕСТО';
    typeText(stories[i % stories.length]);
  });
  buttons.append(button);
});
