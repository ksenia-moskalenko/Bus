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
rows.forEach(([x,y,w,h],i) => {
  const button = document.createElement('button');
  button.className = 'seat-button';
  button.type = 'button';
  button.setAttribute('aria-label', 'Выбрать сиденье ' + (i+1));
  Object.assign(button.style, {left:x+'%', top:`calc(${y}% - 1cm)`, width:w+'%', height:h+'%'});
  button.addEventListener('click', () => {
    buttons.querySelectorAll('.is-selected').forEach(el => el.classList.remove('is-selected'));
    button.classList.add('is-selected');
    number.textContent = String(i+1).padStart(2,'0') + ' / ТВОЁ МЕСТО';
    typeText(stories[i % stories.length]);
  });
  buttons.append(button);
});
