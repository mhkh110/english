/* ============================================
   ENGLISH MASTER – MAIN APPLICATION SCRIPT
   Vanilla JS | Modular | LocalStorage Powered
   ============================================ */

// ---------- CONSTANTS & CONFIG ----------
const STORAGE_KEYS = {
  LESSONS: 'englishMaster_lessons',
  NOTES: 'englishMaster_notes',
  XP: 'englishMaster_xp',
  STREAK: 'englishMaster_streak',
  LAST_ACTIVE_DATE: 'englishMaster_lastActiveDate',
  COMPLETED_DAYS: 'englishMaster_completedDays',
  PROGRESS: 'englishMaster_progress'
};

const TOTAL_DAYS = 30;
const XP_PER_LESSON = 20;
const NOTES_MAX_LENGTH = 500;
const NOTES_AUTOSAVE_DELAY = 600; // ms

// ---------- DEFAULT DATA ----------
const DEFAULT_LESSON_TOPICS = [
  'Present Simple Basics', 'Present Continuous', 'Past Simple Regular Verbs',
  'Past Simple Irregular Verbs', 'Present Perfect Introduction', 'Present Perfect vs Past Simple',
  'Future Forms: Will & Going To', 'Modal Verbs: Can & Must', 'Conditionals Type 0 & 1',
  'Conditionals Type 2', 'Passive Voice Basics', 'Reported Speech Intro',
  'Articles: A, An, The', 'Prepositions of Place', 'Prepositions of Time',
  'Phrasal Verbs: Get', 'Phrasal Verbs: Take', 'Phrasal Verbs: Put',
  'Collocations with Make & Do', 'Adjective Order', 'Relative Clauses',
  'Question Formation', 'Tag Questions', 'Used To & Would',
  'Wish & If Only', 'Gerunds vs Infinitives', 'Linking Words',
  'Formal vs Informal English', 'Common Idioms', 'Review & Practice Day'
];

const GEMINI_PROMPTS = [
  'Explain the difference between Present Perfect and Past Simple with clear examples.',
  'Create a short dialogue using at least 5 phrasal verbs with "get".',
  'Give me 10 common English idioms and explain their meanings.',
  'Write 5 sentences in passive voice and explain when to use it.',
  'Explain when to use "will" vs "going to" for future plans.',
  'Describe the first conditional with 3 real-life examples.',
  'What are modal verbs? Give examples using can, must, and should.',
  'Explain the difference between "used to" and "would" for past habits.',
  'Provide a guide on adjective order in English with examples.',
  'Create 5 tag questions and explain their usage rules.',
  'Explain reported speech with examples from direct to indirect.',
  'What are relative clauses? Give examples with who, which, and that.',
  'How do I use articles (a, an, the) correctly? Give examples.',
  'Explain prepositions of time (in, on, at) with a clear guide.',
  'Give me a vocabulary list of 10 formal vs informal words.',
  'Create 5 sentences using the second conditional.',
  'Explain gerunds and infinitives with common verb patterns.',
  'Provide a mini-lesson on collocations with "make" and "do".',
  'Explain how to form questions in English with examples.',
  'Write a short story using at least 8 irregular past tense verbs.',
  'Describe how to use linking words (however, therefore, moreover).',
  'Create a vocabulary exercise with synonyms and antonyms.',
  'Explain the difference between "say" and "tell" with examples.',
  'Give examples of common mistakes English learners make.',
  'Write a guide on polite requests and offers in English.',
  'Explain countable and uncountable nouns with examples.',
  'Create a pronunciation guide for -ed endings in past tense.',
  'Provide a lesson on expressing opinions in English.',
  'Write a comprehensive review of all basic tenses.',
  'Summarize the most important grammar rules for daily conversation.'
];

// ---------- UTILITY FUNCTIONS ----------
const getTodayDateString = () => new Date().toISOString().split('T')[0];

const getCurrentDayIndex = () => {
  // Simulated: day index based on stored progress (0-based)
  const stored = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
  if (stored) {
    const completed = JSON.parse(stored);
    if (Array.isArray(completed)) {
      return Math.min(completed.length, TOTAL_DAYS - 1);
    }
  }
  return 0;
};

const getCurrentDayOfWeek = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
};

const getCurrentDateFormatted = () => {
  return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

// ---------- STATE MANAGEMENT ----------
let appState = {
  lessons: [],
  notes: '',
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  completedDays: []
};

// ---------- LOCAL STORAGE OPERATIONS ----------
function loadState() {
  try {
    const lessonsData = localStorage.getItem(STORAGE_KEYS.LESSONS);
    appState.lessons = lessonsData ? JSON.parse(lessonsData) : [];

    const notesData = localStorage.getItem(STORAGE_KEYS.NOTES);
    appState.notes = notesData || '';

    const xpData = localStorage.getItem(STORAGE_KEYS.XP);
    appState.xp = xpData ? parseInt(xpData, 10) : 0;

    const streakData = localStorage.getItem(STORAGE_KEYS.STREAK);
    appState.streak = streakData ? parseInt(streakData, 10) : 0;

    appState.lastActiveDate = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE) || null;

    const completedData = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
    appState.completedDays = completedData ? JSON.parse(completedData) : [];
  } catch (e) {
    console.warn('Failed to load state, resetting.', e);
    resetState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(appState.lessons));
    localStorage.setItem(STORAGE_KEYS.NOTES, appState.notes);
    localStorage.setItem(STORAGE_KEYS.XP, appState.xp.toString());
    localStorage.setItem(STORAGE_KEYS.STREAK, appState.streak.toString());
    if (appState.lastActiveDate) {
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, appState.lastActiveDate);
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(appState.completedDays));
  } catch (e) {
    console.error('Failed to save state to localStorage.', e);
  }
}

function resetState() {
  appState.lessons = [];
  appState.notes = '';
  appState.xp = 0;
  appState.streak = 0;
  appState.lastActiveDate = null;
  appState.completedDays = [];
  saveState();
}

// ---------- STREAK LOGIC ----------
function updateStreak() {
  const today = getTodayDateString();
  const lastDate = appState.lastActiveDate;

  if (!lastDate) {
    // First visit ever
    appState.streak = 1;
    appState.lastActiveDate = today;
    return;
  }

  if (lastDate === today) {
    // Already active today, streak unchanged
    return;
  }

  const last = new Date(lastDate + 'T00:00:00');
  const now = new Date(today + 'T00:00:00');
  const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    appState.streak += 1;
  } else if (diffDays > 1) {
    // Streak broken
    appState.streak = 1;
  }

  appState.lastActiveDate = today;
}

// ---------- INITIALIZE LESSONS ----------
function initializeLessons() {
  if (!appState.lessons || appState.lessons.length === 0) {
    appState.lessons = Array.from({ length: TOTAL_DAYS }, (_, index) => ({
      id: index + 1,
      day: index + 1,
      topic: DEFAULT_LESSON_TOPICS[index] || `Lesson ${index + 1}`,
      completed: false,
      opened: false
    }));
    // Sync completed days with lessons
    syncCompletedDaysWithLessons();
    saveState();
  } else {
    // Ensure lessons array matches TOTAL_DAYS
    if (appState.lessons.length < TOTAL_DAYS) {
      for (let i = appState.lessons.length; i < TOTAL_DAYS; i++) {
        appState.lessons.push({
          id: i + 1,
          day: i + 1,
          topic: DEFAULT_LESSON_TOPICS[i] || `Lesson ${i + 1}`,
          completed: false,
          opened: false
        });
      }
      saveState();
    }
    syncCompletedDaysWithLessons();
  }
}

function syncCompletedDaysWithLessons() {
  // Derive completedDays array from lessons
  appState.completedDays = appState.lessons
    .filter(lesson => lesson.completed)
    .map(lesson => lesson.day);
}

// ---------- XP & PROGRESS ----------
function calculateProgress() {
  if (!appState.lessons.length) return 0;
  const completedCount = appState.lessons.filter(l => l.completed).length;
  return Math.round((completedCount / TOTAL_DAYS) * 100);
}

function addXP(amount) {
  appState.xp += amount;
  saveState();
  updateDashboardUI();
}

// ---------- LESSON COMPLETION ----------
function completeLesson(dayNumber) {
  const lesson = appState.lessons.find(l => l.day === dayNumber);
  if (!lesson) return false;

  if (!lesson.completed) {
    lesson.completed = true;
    appState.completedDays.push(dayNumber);
    // Remove duplicates just in case
    appState.completedDays = [...new Set(appState.completedDays)];
    addXP(XP_PER_LESSON);
    updateStreak();
    saveState();
    updateDashboardUI();
    renderPlanner(); // re-render to reflect checkbox
    return true;
  }
  return false;
}

function uncompleteLesson(dayNumber) {
  const lesson = appState.lessons.find(l => l.day === dayNumber);
  if (!lesson) return false;

  if (lesson.completed) {
    lesson.completed = false;
    appState.completedDays = appState.completedDays.filter(d => d !== dayNumber);
    appState.xp = Math.max(0, appState.xp - XP_PER_LESSON);
    saveState();
    updateDashboardUI();
    renderPlanner();
    return true;
  }
  return false;
}

function toggleLessonCompletion(dayNumber, isChecked) {
  if (isChecked) {
    completeLesson(dayNumber);
  } else {
    uncompleteLesson(dayNumber);
  }
}

// ---------- UI RENDERING ----------
function updateDashboardUI() {
  // Header
  const progressPercent = calculateProgress();
  const progressEl = document.getElementById('progressPercent');
  const xpEl = document.getElementById('xpTotal');
  if (progressEl) progressEl.textContent = `${progressPercent}%`;
  if (xpEl) xpEl.textContent = appState.xp.toLocaleString();

  // Current day display
  const dayDisplay = document.getElementById('currentDayDisplay');
  if (dayDisplay) {
    dayDisplay.textContent = `${getCurrentDayOfWeek()}, ${getCurrentDateFormatted()}`;
  }

  // Stats cards
  const statProgress = document.getElementById('statProgress');
  const statCompleted = document.getElementById('statCompletedDays');
  const statRemaining = document.getElementById('statRemainingDays');
  const statStreak = document.getElementById('statStreak');

  if (statProgress) statProgress.textContent = `${progressPercent}%`;
  if (statCompleted) statCompleted.textContent = appState.completedDays.length;
  if (statRemaining) statRemaining.textContent = TOTAL_DAYS - appState.completedDays.length;
  if (statStreak) statStreak.textContent = `${appState.streak} day${appState.streak !== 1 ? 's' : ''}`;

  // Progress bar in header
  const headerProgressBar = document.getElementById('headerProgressBar');
  if (headerProgressBar) {
    headerProgressBar.style.width = `${progressPercent}%`;
  }

  // Footer
  const footerDayRef = document.getElementById('footerDayRef');
  if (footerDayRef) {
    footerDayRef.textContent = `Day ${appState.completedDays.length} of ${TOTAL_DAYS}`;
  }

  // Current Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function renderPlanner() {
  const grid = document.getElementById('plannerGrid');
  if (!grid) return;

  if (!appState.lessons.length) {
    initializeLessons();
  }

  grid.innerHTML = '';

  appState.lessons.forEach((lesson) => {
    const card = document.createElement('div');
    card.className = 'planner-card';
    card.setAttribute('data-day', lesson.day);

    // Highlight current lesson
    const currentDayIndex = getCurrentDayIndex() + 1; // 1-based
    if (lesson.day === currentDayIndex && !lesson.completed) {
      card.classList.add('current-lesson');
      card.style.borderColor = 'var(--accent-blue)';
      card.style.boxShadow = 'var(--shadow-md), 0 0 16px rgba(88,166,255,0.35)';
    }

    const daySpan = document.createElement('span');
    daySpan.className = 'planner-day';
    daySpan.textContent = `Day ${lesson.day}`;

    const topicP = document.createElement('p');
    topicP.className = 'planner-topic';
    topicP.textContent = lesson.topic;

    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'checkbox-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-checkbox';
    checkbox.id = `lesson-check-${lesson.day}`;
    checkbox.checked = lesson.completed;
    checkbox.addEventListener('change', (e) => {
      toggleLessonCompletion(lesson.day, e.target.checked);
    });

    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'checkbox-label';
    checkboxLabel.setAttribute('for', `lesson-check-${lesson.day}`);
    checkboxLabel.textContent = lesson.completed ? 'Done' : 'Mark done';

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkboxLabel);

    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.className = 'open-lesson-btn';
    openBtn.textContent = 'Open Lesson';
    openBtn.addEventListener('click', () => {
      lesson.opened = true;
      saveState();
      // Visual feedback only; could trigger modal etc.
      alert(`Opening "${lesson.topic}" (Day ${lesson.day})`);
    });

    card.appendChild(daySpan);
    card.appendChild(topicP);
    card.appendChild(checkboxWrapper);
    card.appendChild(openBtn);
    grid.appendChild(card);
  });
}

function renderVocabList() {
  // Vocabulary currently static in HTML; dynamic word list could be added later.
  // Kept for future expansion.
}

// ---------- NOTES MANAGEMENT ----------
let notesAutosaveTimer = null;

function setupNotes() {
  const textarea = document.getElementById('dailyNotes');
  const charCurrent = document.getElementById('charCurrent');
  const charMax = document.getElementById('charMax');

  if (!textarea) return;

  // Restore notes
  textarea.value = appState.notes;
  updateCharCounter();

  if (charMax) charMax.textContent = NOTES_MAX_LENGTH;

  textarea.addEventListener('input', () => {
    // Enforce max length
    if (textarea.value.length > NOTES_MAX_LENGTH) {
      textarea.value = textarea.value.slice(0, NOTES_MAX_LENGTH);
    }
    updateCharCounter();

    // Autosave with debounce
    clearTimeout(notesAutosaveTimer);
    notesAutosaveTimer = setTimeout(() => {
      appState.notes = textarea.value;
      saveState();
    }, NOTES_AUTOSAVE_DELAY);
  });

  function updateCharCounter() {
    if (charCurrent) {
      charCurrent.textContent = textarea.value.length;
    }
  }
}

// ---------- GEMINI PROMPT ----------
function setupGeminiPrompt() {
  const promptBox = document.getElementById('promptBox');
  const promptText = document.getElementById('geminiPromptText');
  const copyBtn = document.getElementById('copyPromptButton');

  if (!promptText || !copyBtn) return;

  // Generate daily prompt based on current day
  const dayIndex = getCurrentDayIndex();
  const dailyPrompt = GEMINI_PROMPTS[dayIndex] || GEMINI_PROMPTS[0];
  promptText.textContent = dailyPrompt;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(dailyPrompt);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✅ Copied!';
      copyBtn.style.background = 'var(--accent-green)';
      copyBtn.style.borderColor = 'var(--accent-green)';
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
      }, 1800);
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = dailyPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = '📋 Copied (fallback)';
      setTimeout(() => {
        copyBtn.textContent = '📋 Copy prompt';
      }, 1500);
    }
  });
}

// ---------- RESET PROGRESS ----------
function setupResetButton() {
  const resetBtn = document.getElementById('resetProgressButton');
  if (!resetBtn) return;

  resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset ALL progress? This action cannot be undone.')) {
      resetState();
      initializeLessons();
      updateStreak();
      saveState();
      updateDashboardUI();
      renderPlanner();

      // Reset notes textarea
      const textarea = document.getElementById('dailyNotes');
      if (textarea) {
        textarea.value = '';
        appState.notes = '';
        const charCurrent = document.getElementById('charCurrent');
        if (charCurrent) charCurrent.textContent = '0';
      }
    }
  });
}

// ---------- INITIALIZATION ----------
function initializeApp() {
  loadState();
  updateStreak(); // handle streak before render
  initializeLessons();
  saveState(); // persist updated streak & lessons

  updateDashboardUI();
  renderPlanner();
  renderVocabList();
  setupNotes();
  setupGeminiPrompt();
  setupResetButton();

  // Mark today as active
  appState.lastActiveDate = getTodayDateString();
  saveState();

  console.log('English Master initialized successfully.');
}

// ---------- START APP ----------
document.addEventListener('DOMContentLoaded', initializeApp);
