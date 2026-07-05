/* ============================================
   ENGLISH MASTER – نسخه نهایی
   ============================================ */

const TOTAL_DAYS = 30;
const STORAGE = {
  LESSONS: 'em_lessons',
  NOTES: 'em_notes',
  XP: 'em_xp',
  DAY: 'em_day',
  STREAK: 'em_streak',
  COMPLETED: 'em_completed',
  VOCAB: 'em_vocab',
  CHECKLISTS: 'em_checklists'
};

const XP_REWARDS = { grammar: 20, vocabulary: 20, speaking: 20, listening: 20, homework: 20, review: 10 };

// ==================== داده دوره ====================
function getCourseData() {
  const grammarTopics = [
    { title: 'Present Simple', desc: 'حال ساده', g: 'برای عادت‌ها و حقایق\n\n+ فاعل + فعل (he/she/it + s)\n- فاعل + don\'t/doesn\'t + فعل\n? Do/Does + فاعل + فعل', gp: 'برای بیان عادت‌ها، کارهای روزمره و حقایق کلی', ex: ['I go to school.', 'She works hard.', 'They don\'t like it.', 'Does he speak?'], mis: ['He go ❌ → He goes ✅', 'She don\'t ❌ → She doesn\'t ✅'] },
    { title: 'Present Continuous', desc: 'حال استمراری', g: 'برای کارهای در حال انجام\n\n+ فاعل + am/is/are + فعل ing\n- فاعل + am/is/are + not + فعل ing\n? Am/Is/Are + فاعل + فعل ing', gp: 'برای کارهایی که همین الان در حال انجام هستند', ex: ['I am studying.', 'She is cooking.', 'Are you listening?'], mis: ['I am go ❌ → I am going ✅'] },
    { title: 'Past Simple (Regular)', desc: 'گذشته ساده با قاعده', g: 'برای کارهای تمام شده در گذشته\n\n+ فاعل + فعل + ed\n- فاعل + didn\'t + فعل\n? Did + فاعل + فعل', gp: 'برای کارهای تمام شده در گذشته - افعال باقاعده ed می‌گیرند', ex: ['I worked yesterday.', 'She played tennis.', 'Did you watch?'], mis: ['I did went ❌ → I went ✅'] },
    { title: 'Past Simple (Irregular)', desc: 'گذشته ساده بی‌قاعده', g: 'افعال بی‌قاعده شکل گذشته خاص خود را دارند\ngo→went, have→had, do→did, see→saw, eat→ate', gp: 'افعال بی‌قاعده از قانون ed پیروی نمی‌کنند', ex: ['I went home.', 'She had a cat.', 'Did you see?'], mis: ['I goed ❌ → I went ✅'] },
    { title: 'There is / There are', desc: 'وجود داشتن', g: 'There is + مفرد\nThere are + جمع\n\n? Is there...? / Are there...?', gp: 'برای بیان وجود چیزی در جایی', ex: ['There is a book.', 'There are two cats.', 'Is there a bank?'], mis: ['There is two ❌ → There are two ✅'] },
    { title: 'Countable & Uncountable', desc: 'قابل شمارش و غیرقابل شمارش', g: 'قابل شمارش: a/an, some, many\nغیرقابل شمارش: some, much\nwater, rice, money, information', gp: 'اسامی قابل شمارش را می‌توان شمرد، غیرقابل شمارش را نه', ex: ['I have an apple.', 'She has some water.', 'How many books?'], mis: ['a water ❌ → some water ✅'] },
    { title: 'Articles', desc: 'حروف تعریف a/an/the', g: 'a/an: مفرد ناشناس\nthe: مشخص و شناخته شده\nبدون حرف: جمع عمومی', gp: 'a/an برای چیزهای ناشناس، the برای چیزهای مشخص', ex: ['I saw a dog.', 'The dog was big.', 'Dogs are friendly.'], mis: ['The life is beautiful ❌ → Life is beautiful ✅'] },
    { title: 'Prepositions of Place', desc: 'حروف اضافه مکان', g: 'in, on, at, under, behind, next to, between', gp: 'in: داخل، on: روی سطح، at: در نقطه مشخص', ex: ['The book is on the table.', 'She is at the door.', 'The cat is under the bed.'], mis: ['in the table ❌ → on the table ✅'] },
    { title: 'Prepositions of Time', desc: 'حروف اضافه زمان', g: 'at: ساعت (at 5)\non: روز (on Monday)\nin: ماه/سال (in July)', gp: 'at برای زمان دقیق، on برای روز، in برای بازه بزرگتر', ex: ['I wake up at 7.', 'She was born in March.', 'See you on Friday.'], mis: ['in Monday ❌ → on Monday ✅'] },
    { title: 'Can & Can\'t', desc: 'توانستن', g: 'can + فعل: توانایی/اجازه\ncan\'t: ناتوانی/ممنوعیت', gp: 'برای بیان توانایی، اجازه و درخواست مودبانه', ex: ['I can swim.', 'Can I go out?', 'She can\'t drive.'], mis: ['I can to swim ❌ → I can swim ✅'] },
    { title: 'Must & Have to', desc: 'باید و اجبار', g: 'must: اجبار داخلی\nhave to: اجبار خارجی\nmustn\'t: ممنوعیت', gp: 'must برای قوانین شخصی، have to برای قوانین بیرونی', ex: ['I must study.', 'You have to wear a seatbelt.', 'You mustn\'t smoke here.'], mis: ['I must to go ❌ → I must go ✅'] },
    { title: 'Should', desc: 'باید (توصیه)', g: 'should + فعل: توصیه\nshouldn\'t: توصیه منفی', gp: 'برای نصیحت و پیشنهاد', ex: ['You should rest.', 'She shouldn\'t eat too much.', 'Should I call him?'], mis: ['You should to go ❌ → You should go ✅'] },
    { title: 'Future with Will', desc: 'آینده با will', g: 'will + فعل: پیش‌بینی، قول، تصمیم لحظه‌ای', gp: 'برای تصمیمات لحظه‌ای، قول‌ها و پیش‌بینی بدون شواهد', ex: ['I will help you.', 'It will rain tomorrow.', 'Will you come?'], mis: ['I will to go ❌ → I will go ✅'] },
    { title: 'Future with Going To', desc: 'آینده با going to', g: 'am/is/are + going to + فعل: برنامه/قصد', gp: 'برای برنامه‌های از قبل تعیین شده و پیش‌بینی با شواهد', ex: ['I\'m going to travel.', 'Look! It\'s going to rain.', 'Are you going to eat?'], mis: ['I going to ❌ → I\'m going to ✅'] },
    { title: 'Present Perfect (1)', desc: 'حال کامل', g: 'have/has + قسمت سوم فعل\nبرای تجربیات و کارهای ناتمام', gp: 'برای اتفاقاتی که در گذشته رخ داده اما اثرش تا حال باقیست', ex: ['I have visited Paris.', 'She has finished her work.', 'Have you ever been to London?'], mis: ['I have went ❌ → I have gone ✅'] },
    { title: 'Present Perfect (2)', desc: 'حال کامل با ever/never', g: 'ever: هیچوقت (سوالی)\nnever: هرگز (جمله مثبت)\nfor/since: مدت زمان', gp: 'ever برای پرسیدن تجربه، never برای منفی کردن', ex: ['Have you ever tried sushi?', 'I have never been to Japan.', 'She has worked here for 5 years.'], mis: ['I didn\'t never ❌ → I have never ✅'] },
    { title: 'Past Simple vs Present Perfect', desc: 'تفاوت گذشته ساده و حال کامل', g: 'گذشته ساده: زمان مشخص در گذشته\nحال کامل: ارتباط با حال', gp: 'اگر زمان دقیق دارید گذشته ساده، اگر مهم نیست کی اتفاق افتاده حال کامل', ex: ['I went there yesterday.', 'I have been there.', 'She finished it an hour ago.', 'She has just finished it.'], mis: ['I have seen him yesterday ❌ → I saw him yesterday ✅'] },
    { title: 'Comparatives', desc: 'صفت‌های مقایسه‌ای', g: 'کوتاه: صفت + er\nبلند: more + صفت\ngood→better, bad→worse', gp: 'برای مقایسه دو چیز یا دو نفر', ex: ['She is taller than me.', 'This is more interesting.', 'My car is better than yours.'], mis: ['more bigger ❌ → bigger ✅'] },
    { title: 'Superlatives', desc: 'صفت‌های عالی', g: 'کوتاه: the + صفت + est\nبلند: the most + صفت\ngood→best, bad→worst', gp: 'برای بهترین/بیشترین در یک گروه', ex: ['She is the tallest.', 'This is the most beautiful place.', 'He is the best student.'], mis: ['the most best ❌ → the best ✅'] },
    { title: 'Adverbs of Frequency', desc: 'قیدهای تکرار', g: 'always, usually, often, sometimes, rarely, never\nقبل از فعل اصلی، بعد از to be', gp: 'برای بیان تعداد دفعات انجام کار', ex: ['I always wake up early.', 'She is never late.', 'We sometimes eat out.'], mis: ['I go always ❌ → I always go ✅'] },
    { title: 'First Conditional', desc: 'شرطی نوع اول', g: 'If + حال ساده, will + فعل\nبرای شرایط واقعی و ممکن', gp: 'اگر شرط محقق شود، نتیجه اتفاق می‌افتد', ex: ['If it rains, I will stay home.', 'If you study, you will pass.', 'She will come if she has time.'], mis: ['If I will go ❌ → If I go ✅'] },
    { title: 'Second Conditional', desc: 'شرطی نوع دوم', g: 'If + گذشته ساده, would + فعل\nبرای شرایط غیرواقعی و تخیلی', gp: 'برای آرزوها و شرایط غیرممکن در زمان حال', ex: ['If I were rich, I would travel.', 'If she knew, she would tell us.', 'I would buy it if I had money.'], mis: ['If I would be ❌ → If I were ✅'] },
    { title: 'Gerunds', desc: 'اسم مصدر', g: 'فعل + ing به عنوان اسم\nبعد از enjoy, finish, mind, suggest', gp: 'وقتی فعل نقش اسم بازی می‌کند یا بعد از بعضی افعال خاص', ex: ['I enjoy swimming.', 'Reading is fun.', 'She finished working.'], mis: ['I enjoy to swim ❌ → I enjoy swimming ✅'] },
    { title: 'Infinitives', desc: 'مصدر با to', g: 'to + فعل\nبعد از want, need, hope, decide\nبرای هدف: I went to buy', gp: 'برای بیان هدف یا بعد از افعال خاص', ex: ['I want to learn.', 'She needs to sleep.', 'He went to buy food.'], mis: ['I want go ❌ → I want to go ✅'] },
    { title: 'Relative Clauses', desc: 'جمله وصفی', g: 'who: برای انسان\nwhich: برای اشیا\nthat: برای هر دو\nwhere: برای مکان', gp: 'برای اضافه کردن اطلاعات بیشتر به اسم', ex: ['The man who called is my uncle.', 'The book which I read was great.', 'The place where I grew up.'], mis: ['The man which ❌ → The man who ✅'] },
    { title: 'Passive Voice (Present)', desc: 'مجهول حال', g: 'am/is/are + قسمت سوم فعل\nفاعل مهم نیست، عمل مهم است', gp: 'وقتی کننده کار مهم نیست یا مشخص نیست', ex: ['English is spoken here.', 'The cake was made by my mom.', 'Mistakes were made.'], mis: ['The cake made ❌ → The cake was made ✅'] },
    { title: 'Used To', desc: 'عادت گذشته', g: 'used to + فعل: عادت در گذشته که دیگر ادامه ندارد', gp: 'برای کارهایی که قبلاً همیشه انجام می‌دادیم اما الان نه', ex: ['I used to smoke.', 'She used to live here.', 'Did you use to play?'], mis: ['I use to go ❌ → I used to go ✅'] },
    { title: 'Tag Questions', desc: 'سوالات ضمیمه', g: 'جمله مثبت + tag منفی\nجمله منفی + tag مثبت', gp: 'برای تایید گرفتن یا مطمئن شدن', ex: ['You like coffee, don\'t you?', 'She isn\'t here, is she?', 'They went, didn\'t they?'], mis: ['You like it, isn\'t it? ❌ → don\'t you? ✅'] },
    { title: 'Reported Speech', desc: 'نقل قول غیرمستقیم', g: 'زمان‌ها یک درجه به گذشته برمی‌گردند\nwill→would, can→could', gp: 'برای بازگو کردن حرف دیگران', ex: ['She said she was tired.', 'He told me he would come.', 'They asked if I could help.'], mis: ['She said she is ❌ → She said she was ✅'] },
    { title: 'Phrasal Verbs', desc: 'افعال دوکلمه‌ای', g: 'فعل + حرف اضافه\nget up, turn on, look after, give up', gp: 'ترکیب فعل و حرف اضافه که معنی جدید می‌سازد', ex: ['Wake up early.', 'Turn off the light.', 'Look after your sister.'], mis: ['Turn off it ❌ → Turn it off ✅'] }
  ];

  const vocabSets = [
    ['always', 'همیشه', '/ˈɔːlweɪz/', 'I always try my best.'],
    ['usually', 'معمولاً', '/ˈjuːʒuəli/', 'She usually walks to work.'],
    ['sometimes', 'گاهی', '/ˈsʌmtaɪmz/', 'We sometimes eat out.'],
    ['never', 'هرگز', '/ˈnevər/', 'He never gives up.'],
    ['every day', 'هر روز', '/ˈevri deɪ/', 'I practice every day.'],
    ['important', 'مهم', '/ɪmˈpɔːrtnt/', 'This is very important.'],
    ['different', 'متفاوت', '/ˈdɪfrənt/', 'They are quite different.'],
    ['believe', 'باور کردن', '/bɪˈliːv/', 'I believe in myself.'],
    ['remember', 'یاد آوردن', '/rɪˈmembər/', 'Do you remember me?'],
    ['practice', 'تمرین', '/ˈpræktɪs/', 'Practice makes perfect.']
  ];

  const course = [];
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const t = grammarTopics[i] || grammarTopics[grammarTopics.length - 1];
    const vIdx = i % vocabSets.length;
    const vocab = [];
    for (let j = 0; j < 10; j++) {
      const v = vocabSets[(vIdx + j) % vocabSets.length];
      vocab.push({ word: v[0], meaning: v[1], pronunciation: v[2], sentence: v[3] });
    }
    course.push({
      day: i + 1,
      title: t.title,
      description: t.desc,
      grammar: { english: t.g, persian: t.gp, examples: t.ex || ['Example'], mistakes: t.mis || ['Mistake'] },
      vocabulary: vocab,
      listening: { instruction: 'به فایل صوتی گوش دهید و پاسخ دهید.', exercise: 'Fill in the blank: She ___ to school.' },
      speaking: `۵ جمله با ${t.title} بسازید و با صدای بلند بگویید.`,
      writing: `یک پاراگراف با استفاده از ${t.title} بنویسید.`,
      friends: { episode: `S0${(i%5)+1}E0${(i%3)+1}`, scene: 'Friends scene', expressions: ['Expression 1', 'Expression 2'] },
      usefulExpressions: ['Useful 1', 'Useful 2', 'Useful 3'],
      geminiPrompt: `Teach ${t.title} with examples for Persian learners.`,
      homework: `۱۰ جمله با ${t.title} بنویسید.`
    });
  }
  return course;
}

const FULL_COURSE = getCourseData();

// ==================== State ====================
let state = {
  lessons: [],
  notes: '',
  xp: 0,
  currentDay: 1,
  streak: 0,
  completedCount: 0,
  vocabMastered: {},
  checklists: {}
};

// ==================== Storage ====================
function loadState() {
  try {
    const d = localStorage.getItem(STORAGE.LESSONS);
    state.lessons = d ? JSON.parse(d) : [];
    state.notes = localStorage.getItem(STORAGE.NOTES) || '';
    state.xp = +localStorage.getItem(STORAGE.XP) || 0;
    state.currentDay = +localStorage.getItem(STORAGE.DAY) || 1;
    state.streak = +localStorage.getItem(STORAGE.STREAK) || 0;
    state.completedCount = +localStorage.getItem(STORAGE.COMPLETED) || 0;
    state.vocabMastered = JSON.parse(localStorage.getItem(STORAGE.VOCAB)) || {};
    state.checklists = JSON.parse(localStorage.getItem(STORAGE.CHECKLISTS)) || {};
  } catch { initFresh(); }
}

function saveState() {
  localStorage.setItem(STORAGE.LESSONS, JSON.stringify(state.lessons));
  localStorage.setItem(STORAGE.NOTES, state.notes);
  localStorage.setItem(STORAGE.XP, state.xp.toString());
  localStorage.setItem(STORAGE.DAY, state.currentDay.toString());
  localStorage.setItem(STORAGE.STREAK, state.streak.toString());
  localStorage.setItem(STORAGE.COMPLETED, state.completedCount.toString());
  localStorage.setItem(STORAGE.VOCAB, JSON.stringify(state.vocabMastered));
  localStorage.setItem(STORAGE.CHECKLISTS, JSON.stringify(state.checklists));
}

function initFresh() {
  state.lessons = FULL_COURSE.map(l => ({
    ...l,
    completed: false,
    unlocked: l.day === 1,
    checklist: { grammar: false, vocabulary: false, speaking: false, listening: false, friends: false, homework: false, review: false }
  }));
  state.currentDay = 1;
  state.completedCount = 0;
  state.xp = 0;
  state.streak = 0;
  saveState();
}

function initLessons() {
  if (!state.lessons.length) initFresh();
  state.lessons.forEach(l => {
    if (!l.checklist) l.checklist = { grammar: false, vocabulary: false, speaking: false, listening: false, friends: false, homework: false, review: false };
    if (l.completed === undefined) l.completed = false;
    if (l.unlocked === undefined) l.unlocked = l.day <= state.currentDay;
  });
  saveState();
}

// ==================== Helpers ====================
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

// ==================== Dashboard ====================
function updateDashboard() {
  const pct = Math.round((state.completedCount / TOTAL_DAYS) * 100);
  setText('progressPercent', pct + '%');
  setText('xpTotal', state.xp.toLocaleString());
  setText('currentDayDisplay', `روز ${state.currentDay} از ${TOTAL_DAYS}`);
  setText('statCurrentDay', state.currentDay);
  setText('statProgress', pct + '%');
  setText('statXp', state.xp.toLocaleString());
  setText('statCompletedLessons', state.completedCount);
  setText('statRemainingLessons', TOTAL_DAYS - state.completedCount);
  setText('statStreak', state.streak);
  setText('footerProgress', pct + '%');
  
  const bar = document.getElementById('progressBarFill');
  if (bar) bar.style.width = pct + '%';

  const level = document.getElementById('sidebarLevel');
  if (level) level.textContent = `سطح: ${pct < 30 ? 'A1+' : pct < 60 ? 'A2' : pct < 85 ? 'B1' : 'B2'}`;

  updateTodayCard();
}

function updateTodayCard() {
  const lesson = state.lessons.find(l => l.day === state.currentDay);
  if (!lesson) return;
  setText('todayDayBadge', `روز ${state.currentDay}`);
  setText('todayLessonTitle', lesson.title);
  setText('todayLessonDesc', lesson.description);
  document.getElementById('quickOpenLessonBtn')?.setAttribute('data-lesson-day', state.currentDay);
}

// ==================== Planner ====================
function renderPlanner() {
  const grid = document.getElementById('plannerGrid');
  if (!grid) return;
  grid.innerHTML = '';
  state.lessons.forEach(l => {
    const cp = l.checklist ? Math.round((Object.values(l.checklist).filter(Boolean).length / 7) * 100) : 0;
    const card = document.createElement('div');
    card.className = `planner-card${l.completed ? ' completed' : ''}${l.day === state.currentDay ? ' current' : ''}`;
    card.innerHTML = `
      <div class="planner-head">
        <span class="planner-day">روز ${l.day}</span>
        <span class="planner-status">${l.completed ? '✅' : l.day === state.currentDay ? '📖' : '🔒'}</span>
      </div>
      <h3 class="planner-title">${l.title}</h3>
      <p class="planner-desc">${l.description}</p>
      <div class="planner-fill"><div class="planner-fill-inner" style="width:${cp}%"></div></div>
      <button class="planner-btn" data-day="${l.day}">📖 باز کردن</button>
    `;
    grid.appendChild(card);
  });
}

// ==================== Modal ====================
let currentModalDay = null;

function openModal(day) {
  const lesson = state.lessons.find(l => l.day === day);
  if (!lesson) return;
  currentModalDay = day;
  populateModal(lesson);
  document.getElementById('lessonModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('lessonModalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  currentModalDay = null;
}

function populateModal(l) {
  setText('modalLessonTitle', `درس روز ${l.day}`);
  setText('modalLessonName', l.title);
  setText('modalLessonDesc', l.description);
  setText('modalGrammarEnglish', l.grammar.english);
  setText('modalGrammarPersian', l.grammar.persian);

  const examplesList = document.getElementById('modalExamplesList');
  if (examplesList) examplesList.innerHTML = l.grammar.examples.map(e => `<li>${e}</li>`).join('');

  const mistakesList = document.getElementById('modalMistakesList');
  if (mistakesList) mistakesList.innerHTML = l.grammar.mistakes.map(m => `<li>${m}</li>`).join('');

  const vocabBody = document.getElementById('modalVocabBody');
  if (vocabBody) {
    vocabBody.innerHTML = l.vocabulary.map((v, i) => {
      const key = `${l.day}_${i}`;
      const checked = state.vocabMastered[key] ? 'checked' : '';
      return `<tr>
        <td>${v.word}</td><td>${v.meaning}</td><td>${v.pronunciation}</td><td>${v.sentence}</td>
        <td><input type="checkbox" class="vocab-check" data-key="${key}" ${checked}></td>
      </tr>`;
    }).join('');
  }

  setText('modalListeningInstruction', l.listening.instruction);
  setText('modalListeningExercise', l.listening.exercise);
  setText('modalSpeakingPrompt', l.speaking);
  setText('modalWritingPrompt', l.writing);
  setText('modalFriendsEpisode', l.friends.episode);
  setText('modalFriendsScene', l.friends.scene);
  
  const exprList = document.getElementById('modalExpressionsList');
  if (exprList) exprList.innerHTML = l.usefulExpressions.map(e => `<li>${e}</li>`).join('');

  setText('modalGeminiPrompt', l.geminiPrompt);
  setText('modalHomeworkContent', l.homework);

  // Checklist
  document.querySelectorAll('#modalChecklistItems input').forEach(cb => {
    const key = cb.dataset.checklist;
    cb.checked = l.checklist ? l.checklist[key] || false : false;
  });

  // Notes
  const notesArea = document.getElementById('modalNotesTextarea');
  if (notesArea) notesArea.value = l.notes || '';

  // Vocab events
  document.querySelectorAll('.vocab-check').forEach(cb => {
    cb.onchange = () => {
      state.vocabMastered[cb.dataset.key] = cb.checked;
      saveState();
    };
  });
}

// ==================== Complete Lesson ====================
function completeLesson() {
  if (!currentModalDay) return;
  const l = state.lessons.find(les => les.day === currentModalDay);
  if (!l) return;

  // Save checklist
  let xpGain = 0;
  document.querySelectorAll('#modalChecklistItems input').forEach(cb => {
    const key = cb.dataset.checklist;
    l.checklist[key] = cb.checked;
    if (cb.checked && XP_REWARDS[key]) xpGain += XP_REWARDS[key];
  });

  // Save notes
  const notesArea = document.getElementById('modalNotesTextarea');
  if (notesArea) l.notes = notesArea.value;

  if (!l.completed) {
    l.completed = true;
    state.completedCount++;
    state.streak++;
    state.xp += xpGain;

    const next = state.lessons.find(les => les.day === currentModalDay + 1);
    if (next) {
      next.unlocked = true;
      if (state.currentDay < next.day) state.currentDay = next.day;
    }
  }

  saveState();
  updateDashboard();
  renderPlanner();
  closeModal();
}

// ==================== Notes ====================
let noteTimer;
function setupNotes() {
  const ta = document.getElementById('dailyNotes');
  if (!ta) return;
  ta.value = state.notes;
  updateCharCount();
  ta.oninput = () => {
    if (ta.value.length > 1000) ta.value = ta.value.slice(0, 1000);
    updateCharCount();
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => { state.notes = ta.value; saveState(); }, 500);
  };
}

function updateCharCount() {
  const ta = document.getElementById('dailyNotes');
  const cc = document.getElementById('charCurrent');
  if (ta && cc) cc.textContent = ta.value.length;
}

// ==================== Gemini ====================
function setupGemini() {
  const updatePrompt = () => {
    const l = state.lessons.find(les => les.day === state.currentDay);
    if (l) setText('geminiPromptText', l.geminiPrompt);
  };

  document.getElementById('copyPromptButton')?.addEventListener('click', async () => {
    const text = document.getElementById('geminiPromptText')?.textContent || '';
    await navigator.clipboard.writeText(text).catch(() => {});
    const btn = document.getElementById('copyPromptButton');
    btn.textContent = '✅ کپی شد!';
    setTimeout(() => { btn.textContent = '📋 کپی پرامپت'; }, 2000);
  });

  document.getElementById('modalCopyGeminiBtn')?.addEventListener('click', async () => {
    const text = document.getElementById('modalGeminiPrompt')?.textContent || '';
    await navigator.clipboard.writeText(text).catch(() => {});
    const btn = document.getElementById('modalCopyGeminiBtn');
    btn.textContent = '✅ کپی شد!';
    setTimeout(() => { btn.textContent = '📋 کپی'; }, 2000);
  });

  updatePrompt();
}

// ==================== Settings ====================
function setupSettings() {
  document.getElementById('resetProgressButton')?.addEventListener('click', () => {
    if (confirm('مطمئنی؟ تمام پیشرفت پاک می‌شود.')) {
      localStorage.clear();
      initFresh();
      updateDashboard();
      renderPlanner();
      const ta = document.getElementById('dailyNotes');
      if (ta) { ta.value = ''; updateCharCount(); }
    }
  });

  document.getElementById('resetNotesButton')?.addEventListener('click', () => {
    if (confirm('یادداشت‌ها پاک شود؟')) {
      state.notes = '';
      saveState();
      const ta = document.getElementById('dailyNotes');
      if (ta) { ta.value = ''; updateCharCount(); }
    }
  });
}

// ==================== Navigation ====================
function setupNavigation() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburgerBtn');
  const closeBtn = document.getElementById('sidebarCloseBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  function showSection(id) {
    $$('.content-section').forEach(s => s.classList.remove('active-section'));
    document.getElementById(id)?.classList.add('active-section');
    $$('.nav-link, .bottom-nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-section="${id}"]`)?.classList.add('active');
    document.querySelector(`.bottom-nav-item[data-section="${id}"]`)?.classList.add('active');
    closeSidebar();
  }

  $$('.nav-link, .bottom-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sec = item.dataset.section;
      if (sec) showSection(sec);
    });
  });
}

// ==================== Events ====================
function setupEvents() {
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('lessonModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('modalCompleteBtn')?.addEventListener('click', completeLesson);

  document.getElementById('quickOpenLessonBtn')?.addEventListener('click', () => {
    const day = +document.getElementById('quickOpenLessonBtn').dataset.lessonDay;
    if (day) openModal(day);
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('planner-btn')) {
      const day = +e.target.dataset.day;
      if (day) openModal(day);
    }
  });

  document.getElementById('modalChecklistItems')?.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT' && currentModalDay) {
      const l = state.lessons.find(les => les.day === currentModalDay);
      if (l?.checklist) {
        l.checklist[e.target.dataset.checklist] = e.target.checked;
        saveState();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Vocab filters
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderVocab(btn.dataset.filter);
    });
  });
}

// ==================== Render Vocab ====================
function renderVocab(filter = 'all') {
  const list = document.getElementById('vocabList');
  if (!list) return;
  let allWords = [];
  state.lessons.forEach(l => {
    l.vocabulary.forEach((v, i) => {
      const key = `${l.day}_${i}`;
      allWords.push({ ...v, key, mastered: !!state.vocabMastered[key] });
    });
  });

  if (filter === 'mastered') allWords = allWords.filter(w => w.mastered);
  if (filter === 'unmastered') allWords = allWords.filter(w => !w.mastered);

  list.innerHTML = allWords.map(w => `
    <div class="vocab-item">
      <div>
        <span class="vocab-word">${w.word}</span>
        <span class="vocab-meaning"> - ${w.meaning}</span>
      </div>
      <input type="checkbox" class="vocab-check" data-key="${w.key}" ${w.mastered ? 'checked' : ''}>
    </div>
  `).join('');

  document.querySelectorAll('#vocabList .vocab-check').forEach(cb => {
    cb.onchange = () => {
      state.vocabMastered[cb.dataset.key] = cb.checked;
      saveState();
    };
  });
}

// ==================== Init ====================
function init() {
  loadState();
  initLessons();
  updateDashboard();
  renderPlanner();
  renderVocab();
  setupNotes();
  setupGemini();
  setupSettings();
  setupNavigation();
  setupEvents();
  console.log('✅ English Master ready');
}

document.addEventListener('DOMContentLoaded', init);
