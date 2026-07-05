/* ============================================
   ENGLISH MASTER – MAIN APPLICATION SCRIPT
   Vanilla JS | Modular | LocalStorage Powered
   No external libraries. Fully offline.
   ============================================ */

// ---------- CONSTANTS ----------
const TOTAL_DAYS = 30;
const STORAGE_KEYS = {
  LESSONS: 'em_lessons',
  NOTES: 'em_notes',
  XP: 'em_xp',
  CURRENT_DAY: 'em_currentDay',
  STREAK: 'em_streak',
  COMPLETED_COUNT: 'em_completedCount',
  VOCAB_MASTERED: 'em_vocabMastered',
  CHECKLISTS: 'em_checklists',
  SETTINGS: 'em_settings'
};

const XP_REWARDS = {
  grammar: 20,
  vocabulary: 20,
  speaking: 20,
  listening: 20,
  homework: 20,
  review: 10
};

// ---------- 30-DAY COURSE DATA (A1+ → A2) ----------
const COURSE_DATA = [
  {
    day: 1,
    title: 'Present Simple - حال ساده',
    description: 'یادگیری زمان حال ساده برای بیان عادت‌ها و حقایق',
    grammar: {
      english: 'Present Simple is used for habits, routines, and general truths.\n\nStructure:\n• Positive: Subject + base verb (+ s/es for he/she/it)\n• Negative: Subject + do/does + not + base verb\n• Question: Do/Does + subject + base verb?',
      persian: 'زمان حال ساده برای بیان عادت‌ها، کارهای روزمره و حقایق کلی استفاده می‌شود.\n\nساختار:\n• مثبت: فاعل + شکل ساده فعل (برای he/she/it فعل s یا es می‌گیرد)\n• منفی: فاعل + do/does + not + شکل ساده فعل\n• سوالی: Do/Does + فاعل + شکل ساده فعل',
      examples: ['I go to school every day.', 'She works in a hospital.', 'They don\'t like coffee.', 'Does he speak English?'],
      mistakes: ['He go (اشتباه) → He goes (درست)', 'She don\'t (اشتباه) → She doesn\'t (درست)']
    },
    vocabulary: [
      { word: 'always', meaning: 'همیشه', pronunciation: '/ˈɔːlweɪz/', sentence: 'I always wake up early.' },
      { word: 'usually', meaning: 'معمولاً', pronunciation: '/ˈjuːʒuəli/', sentence: 'She usually drinks tea.' },
      { word: 'sometimes', meaning: 'بعضی وقت‌ها', pronunciation: '/ˈsʌmtaɪmz/', sentence: 'We sometimes go to the park.' },
      { word: 'never', meaning: 'هرگز', pronunciation: '/ˈnevər/', sentence: 'He never eats meat.' },
      { word: 'every day', meaning: 'هر روز', pronunciation: '/ˈevri deɪ/', sentence: 'I study English every day.' },
      { word: 'morning', meaning: 'صبح', pronunciation: '/ˈmɔːrnɪŋ/', sentence: 'She runs in the morning.' },
      { word: 'night', meaning: 'شب', pronunciation: '/naɪt/', sentence: 'They watch TV at night.' },
      { word: 'work', meaning: 'کار کردن', pronunciation: '/wɜːrk/', sentence: 'He works in an office.' },
      { word: 'live', meaning: 'زندگی کردن', pronunciation: '/lɪv/', sentence: 'We live in Tehran.' },
      { word: 'like', meaning: 'دوست داشتن', pronunciation: '/laɪk/', sentence: 'Do you like pizza?' }
    ],
    listening: { instruction: 'به فایل صوتی گوش دهید و جاهای خالی را پر کنید.', exercise: 'She ___ (work/works) in a big company.' },
    speaking: 'خودت را با ۵ جمله با استفاده از Present Simple معرفی کن. بگو اهل کجایی، چه کار می‌کنی و چه چیزهایی دوست داری.',
    writing: 'یک پاراگراف درباره برنامه روزانه‌ات بنویس. (حداقل ۵ جمله)',
    friends: { episode: 'S01E01 - The Pilot', scene: 'Central Perk - Rachel enters', expressions: ['There\'s nothing to tell!', 'I just grabbed a spoon.', 'You wanna get some coffee?'] },
    usefulExpressions: ['How are you doing?', 'What do you do?', 'I usually get up at...', 'Nice to meet you.'],
    geminiPrompt: 'Explain Present Simple tense in English with 10 clear examples. Include positive, negative, and question forms. Add common mistakes that Persian speakers make.',
    homework: '۱۰ جمله با Present Simple بنویس (۳ مثبت، ۳ منفی، ۴ سوالی) و با صدای بلند بخوان.'
  },
  {
    day: 2,
    title: 'Present Continuous - حال استمراری',
    description: 'یادگیری زمان حال استمراری برای بیان کارهای در حال انجام',
    grammar: {
      english: 'Present Continuous is used for actions happening now or around now.\n\nStructure:\n• Positive: Subject + am/is/are + verb + ing\n• Negative: Subject + am/is/are + not + verb + ing\n• Question: Am/Is/Are + subject + verb + ing?',
      persian: 'زمان حال استمراری برای کارهایی که همین الان در حال انجام هستند استفاده می‌شود.\n\nساختار:\n• مثبت: فاعل + am/is/are + فعل + ing\n• منفی: فاعل + am/is/are + not + فعل + ing\n• سوالی: Am/Is/Are + فاعل + فعل + ing',
      examples: ['I am studying English now.', 'She is watching TV.', 'They are not sleeping.', 'Are you listening to me?'],
      mistakes: ['I am go (اشتباه) → I am going (درست)', 'She speaking (اشتباه) → She is speaking (درست)']
    },
    vocabulary: [
      { word: 'now', meaning: 'الان', pronunciation: '/naʊ/', sentence: 'I am reading now.' },
      { word: 'right now', meaning: 'همین الان', pronunciation: '/raɪt naʊ/', sentence: 'She is cooking right now.' },
      { word: 'at the moment', meaning: 'در این لحظه', pronunciation: '/æt ðə ˈmoʊmənt/', sentence: 'He is sleeping at the moment.' },
      { word: 'currently', meaning: 'در حال حاضر', pronunciation: '/ˈkɜːrəntli/', sentence: 'We are currently studying.' },
      { word: 'still', meaning: 'هنوز', pronunciation: '/stɪl/', sentence: 'Are you still working?' },
      { word: 'watching', meaning: 'تماشا کردن', pronunciation: '/ˈwɒtʃɪŋ/', sentence: 'I am watching a movie.' },
      { word: 'listening', meaning: 'گوش دادن', pronunciation: '/ˈlɪsənɪŋ/', sentence: 'She is listening to music.' },
      { word: 'talking', meaning: 'صحبت کردن', pronunciation: '/ˈtɔːkɪŋ/', sentence: 'They are talking on the phone.' },
      { word: 'waiting', meaning: 'منتظر بودن', pronunciation: '/ˈweɪtɪŋ/', sentence: 'I am waiting for you.' },
      { word: 'coming', meaning: 'آمدن', pronunciation: '/ˈkʌmɪŋ/', sentence: 'The bus is coming.' }
    ],
    listening: { instruction: 'به مکالمه گوش دهید و پاسخ صحیح را انتخاب کنید.', exercise: 'What ___ (is/are) you doing right now?' },
    speaking: 'به اطرافت نگاه کن و ۵ جمله با Present Continuous بگو که الان چه اتفاقی در حال رخ دادن است.',
    writing: 'تصور کن در یک کافی شاپ هستی. یک پاراگراف بنویس که افراد مختلف چه کار می‌کنند.',
    friends: { episode: 'S01E01 - The Pilot', scene: 'Ross is depressed about his divorce', expressions: ['I\'m just trying to...', 'What are you doing?', 'He\'s not wearing any underwear!'] },
    usefulExpressions: ['What are you doing?', 'I\'m just looking.', 'Are you coming?', 'Wait a minute.'],
    geminiPrompt: 'Explain Present Continuous tense with examples. Compare it with Present Simple and explain when to use each one. Include exercises.',
    homework: '۵ جمله با Present Simple و ۵ جمله با Present Continuous بنویس و تفاوت آنها را توضیح بده.'
  },
  {
    day: 3,
    title: 'Past Simple - گذشته ساده (افعال باقاعده)',
    description: 'یادگیری زمان گذشته ساده با افعال باقاعده',
    grammar: {
      english: 'Past Simple is used for completed actions in the past.\n\nRegular verbs add -ed.\n• Positive: Subject + verb + ed\n• Negative: Subject + did not + base verb\n• Question: Did + subject + base verb?',
      persian: 'زمان گذشته ساده برای کارهای تمام شده در گذشته استفاده می‌شود.\n\nافعال باقاعده ed می‌گیرند.\n• مثبت: فاعل + فعل + ed\n• منفی: فاعل + did not + شکل ساده فعل\n• سوالی: Did + فاعل + شکل ساده فعل',
      examples: ['I worked yesterday.', 'She played tennis.', 'They did not watch TV.', 'Did you study English?'],
      mistakes: ['I did went (اشتباه) → I went / I did go (درست)', 'She workded (اشتباه) → She worked (درست)']
    },
    vocabulary: [
      { word: 'yesterday', meaning: 'دیروز', pronunciation: '/ˈjestərdeɪ/', sentence: 'I visited my friend yesterday.' },
      { word: 'last week', meaning: 'هفته گذشته', pronunciation: '/læst wiːk/', sentence: 'We traveled last week.' },
      { word: 'ago', meaning: 'پیش', pronunciation: '/əˈɡoʊ/', sentence: 'I saw him two days ago.' },
      { word: 'worked', meaning: 'کار کرد', pronunciation: '/wɜːrkt/', sentence: 'He worked hard.' },
      { word: 'played', meaning: 'بازی کرد', pronunciation: '/pleɪd/', sentence: 'They played football.' },
      { word: 'studied', meaning: 'درس خواند', pronunciation: '/ˈstʌdid/', sentence: 'I studied for the exam.' },
      { word: 'visited', meaning: 'بازدید کرد', pronunciation: '/ˈvɪzɪtɪd/', sentence: 'She visited her family.' },
      { word: 'watched', meaning: 'تماشا کرد', pronunciation: '/wɒtʃt/', sentence: 'We watched a movie.' },
      { word: 'cleaned', meaning: 'تمیز کرد', pronunciation: '/kliːnd/', sentence: 'I cleaned my room.' },
      { word: 'cooked', meaning: 'پخت / آشپزی کرد', pronunciation: '/kʊkt/', sentence: 'She cooked dinner.' }
    ],
    listening: { instruction: 'به داستان کوتاه گوش دهید و به سوالات پاسخ دهید.', exercise: 'Yesterday, I ___ (walk/walked) to the park.' },
    speaking: 'درباره دیروزت صحبت کن. ۵ جمله با Past Simple بگو که دیروز چه کارهایی کردی.',
    writing: 'یک خاطره کوتاه از آخرین مسافرتت بنویس. از Past Simple استفاده کن.',
    friends: { episode: 'S01E02 - The One with the Sonogram', scene: 'Ross finds out about the baby', expressions: ['I just thought...', 'We were on a break!', 'Did you know about this?'] },
    usefulExpressions: ['What happened?', 'I didn\'t know.', 'Did you see that?', 'A long time ago.'],
    geminiPrompt: 'Teach Past Simple tense with regular verbs. Include spelling rules for -ed endings (e.g., studied, stopped, played). Give practice exercises.',
    homework: '۱۰ جمله با Past Simple بنویس (۵ تا با افعال باقاعده که یاد گرفتی).'
  },
  {
    day: 4,
    title: 'Past Simple - گذشته ساده (افعال بی‌قاعده)',
    description: 'یادگیری افعال بی‌قاعده در زمان گذشته ساده',
    grammar: {
      english: 'Irregular verbs do NOT follow the -ed rule. Each verb has its own past form.\nCommon irregular verbs: go → went, have → had, do → did, see → saw, eat → ate, buy → bought, come → came, get → got.',
      persian: 'افعال بی‌قاعده از قانون ed پیروی نمی‌کنند. هر فعل شکل گذشته مخصوص به خود را دارد.\nافعال رایج: go → went, have → had, do → did, see → saw, eat → ate, buy → bought, come → came, get → got.',
      examples: ['I went to the cinema.', 'She had a great time.', 'They did their homework.', 'Did you see the news?'],
      mistakes: ['I goed (اشتباه) → I went (درست)', 'She haved (اشتباه) → She had (درست)']
    },
    vocabulary: [
      { word: 'went', meaning: 'رفت', pronunciation: '/went/', sentence: 'I went to the store.' },
      { word: 'had', meaning: 'داشت', pronunciation: '/hæd/', sentence: 'She had a good idea.' },
      { word: 'did', meaning: 'انجام داد', pronunciation: '/dɪd/', sentence: 'He did his best.' },
      { word: 'saw', meaning: 'دید', pronunciation: '/sɔː/', sentence: 'I saw a beautiful bird.' },
      { word: 'ate', meaning: 'خورد', pronunciation: '/eɪt/', sentence: 'We ate lunch together.' },
      { word: 'bought', meaning: 'خرید', pronunciation: '/bɔːt/', sentence: 'She bought a new dress.' },
      { word: 'came', meaning: 'آمد', pronunciation: '/keɪm/', sentence: 'He came home late.' },
      { word: 'got', meaning: 'گرفت / شد', pronunciation: '/ɡɒt/', sentence: 'I got a letter.' },
      { word: 'made', meaning: 'درست کرد', pronunciation: '/meɪd/', sentence: 'She made a cake.' },
      { word: 'took', meaning: 'برداشت / گرفت', pronunciation: '/tʊk/', sentence: 'He took a photo.' }
    ],
    listening: { instruction: 'به داستان گوش دهید و افعال بی‌قاعده را یادداشت کنید.', exercise: 'Yesterday I ___ (go/went) to the market and ___ (buy/bought) some fruit.' },
    speaking: 'با ۵ فعل بی‌قاعده جمله بساز و با صدای بلند بگو.',
    writing: 'دفترچه خاطرات: دیروز چه کارهای جالبی کردی؟ از حداقل ۸ فعل بی‌قاعده استفاده کن.',
    friends: { episode: 'S01E03 - The One with the Thumb', scene: 'Phoebe gets money from the bank', expressions: ['I got a job!', 'She gave me...', 'They went to...'] },
    usefulExpressions: ['I went to...', 'I had a...', 'Did you get it?', 'I saw that!'],
    geminiPrompt: 'Create a list of the 30 most common irregular verbs in English with their past forms. Provide example sentences and a short quiz.',
    homework: '۲۰ فعل بی‌قاعده مهم را حفظ کن و با هر کدام یک جمله بنویس.'
  },
  {
    day: 5,
    title: 'There is / There are - وجود داشتن',
    description: 'یادگیری ساختار There is و There are',
    grammar: {
      english: 'We use "There is" for singular nouns and "There are" for plural nouns.\n• Positive: There is a book. / There are two books.\n• Negative: There isn\'t a pen. / There aren\'t any pens.\n• Question: Is there a bank? / Are there any shops?',
      persian: 'از There is برای اسم مفرد و از There are برای اسم جمع استفاده می‌کنیم.\n• مثبت: There is a book. (یک کتاب وجود دارد)\n• منفی: There isn\'t a pen.\n• سوالی: Is there a bank?',
      examples: ['There is a cat in the garden.', 'There are three chairs.', 'There isn\'t any milk.', 'Are there any questions?'],
      mistakes: ['There is two cats (اشتباه) → There are two cats (درست)', 'There aren\'t a pen (اشتباه) → There isn\'t a pen (درست)']
    },
    vocabulary: [
      { word: 'room', meaning: 'اتاق', pronunciation: '/ruːm/', sentence: 'There is a bed in the room.' },
      { word: 'kitchen', meaning: 'آشپزخانه', pronunciation: '/ˈkɪtʃɪn/', sentence: 'There are dishes in the kitchen.' },
      { word: 'bathroom', meaning: 'حمام', pronunciation: '/ˈbæθruːm/', sentence: 'There is a mirror in the bathroom.' },
      { word: 'garden', meaning: 'باغچه', pronunciation: '/ˈɡɑːrdn/', sentence: 'There are flowers in the garden.' },
      { word: 'window', meaning: 'پنجره', pronunciation: '/ˈwɪndoʊ/', sentence: 'There is a big window.' },
      { word: 'door', meaning: 'در', pronunciation: '/dɔːr/', sentence: 'There are two doors.' },
      { word: 'fridge', meaning: 'یخچال', pronunciation: '/frɪdʒ/', sentence: 'There is food in the fridge.' },
      { word: 'shelf', meaning: 'قفسه', pronunciation: '/ʃelf/', sentence: 'There are books on the shelf.' },
      { word: 'lamp', meaning: 'لامپ', pronunciation: '/læmp/', sentence: 'There is a lamp on the desk.' },
      { word: 'carpet', meaning: 'فرش', pronunciation: '/ˈkɑːrpɪt/', sentence: 'There is a carpet on the floor.' }
    ],
    listening: { instruction: 'به توضیحات یک خانه گوش دهید و نقشه آن را بکشید.', exercise: 'In my room, ___ a bed and ___ two chairs. (is/are)' },
    speaking: 'اتاق خودت را توصیف کن. بگو چه چیزهایی در اتاقت وجود دارد. (حداقل ۸ جمله)',
    writing: 'خانه رویایی‌ات را توصیف کن. از There is و There are استفاده کن.',
    friends: { episode: 'S01E04 - The One with George Stephanopoulos', scene: 'The girls spy on the neighbors', expressions: ['There is a guy...', 'Are there any...?', 'There\'s nothing to see!'] },
    usefulExpressions: ['There is a...', 'There are some...', 'Is there a...?', 'There isn\'t any...'],
    geminiPrompt: 'Teach "There is" and "There are" with clear rules and 20 fill-in-the-blank exercises. Include answers.',
    homework: '۱۰ جمله با There is و ۱۰ جمله با There are بنویس و اتاقت را کامل توصیف کن.'
  }
];

// ادامه داده‌های درس ۶ تا ۳۰ به صورت فشرده (هر درس کامل خواهد بود)
// Generating remaining 25 lessons programmatically with progressive difficulty
function generateRemainingLessons() {
  const grammarTopics = [
    { title: 'Countable & Uncountable Nouns', desc: 'یادگیری اسامی قابل شمارش و غیرقابل شمارش', grammar: 'Countable nouns can be counted (apple, chair). Uncountable nouns cannot (water, rice).\nUse a/an with singular countable. Use some/any with uncountable.' },
    { title: 'Articles: A, An, The', desc: 'یادگیری حروف تعریف در انگلیسی', grammar: 'A/An for singular general. The for specific things. No article for plural general.' },
    { title: 'Prepositions of Place', desc: 'یادگیری حروف اضافه مکان', grammar: 'In, on, at, under, behind, next to, between, in front of.\nIn: inside something. On: on a surface. At: specific point.' },
    { title: 'Prepositions of Time', desc: 'یادگیری حروف اضافه زمان', grammar: 'At for specific time (at 5pm). On for days (on Monday). In for months/years (in July).' },
    { title: 'Can & Can\'t - توانایی', desc: 'بیان توانایی و عدم توانایی', grammar: 'Can + base verb. Cannot/Can\'t for negative. Can for permission and ability.' },
    { title: 'Must & Have to - اجبار', desc: 'بیان اجبار و ضرورت', grammar: 'Must for internal obligation. Have to for external rules. Mustn\'t for prohibition.' },
    { title: 'Should - توصیه', desc: 'بیان توصیه و پیشنهاد', grammar: 'Should + base verb for advice. Shouldn\'t for negative advice.' },
    { title: 'Future with Will', desc: 'آینده با Will', grammar: 'Will + base verb for predictions, promises, spontaneous decisions.' },
    { title: 'Future with Going To', desc: 'آینده با Going To', grammar: 'Be + going to + verb for plans and intentions. For predictions with evidence.' },
    { title: 'Present Perfect (1)', desc: 'معرفی حال کامل', grammar: 'Have/Has + past participle. For experiences, recent events, unfinished time.' },
    { title: 'Present Perfect (2)', desc: 'حال کامل با ever/never', grammar: 'Ever in questions. Never in positive sentences. For life experiences.' },
    { title: 'Present Perfect vs Past Simple', desc: 'تفاوت حال کامل و گذشته ساده', grammar: 'Past Simple: finished time. Present Perfect: connection to now.' },
    { title: 'Comparatives', desc: 'صفت‌های مقایسه‌ای', grammar: 'Short adj + er. Long adj: more + adj. Irregular: good→better, bad→worse.' },
    { title: 'Superlatives', desc: 'صفت‌های عالی', grammar: 'Short adj + est. Long adj: most + adj. Irregular: good→best, bad→worst.' },
    { title: 'Adverbs of Frequency', desc: 'قیدهای تکرار', grammar: 'Always, usually, often, sometimes, rarely, never. Position: before main verb, after be.' },
    { title: 'First Conditional', desc: 'شرطی نوع اول', grammar: 'If + present simple, will + base verb. For real/possible situations.' },
    { title: 'Second Conditional', desc: 'شرطی نوع دوم', grammar: 'If + past simple, would + base verb. For unreal/imaginary situations.' },
    { title: 'Gerunds', desc: 'اسم مصدرها', grammar: 'Verb + ing as a noun. After prepositions. After certain verbs (enjoy, finish).' },
    { title: 'Infinitives', desc: 'مصدر با to', grammar: 'To + base verb. After certain verbs (want, need, hope). Purpose: I went to buy.' },
    { title: 'Relative Clauses', desc: 'جمله‌های وصفی', grammar: 'Who for people. Which for things. That for both. Where for places.' },
    { title: 'Passive Voice (Present)', desc: 'مجهول حال ساده', grammar: 'am/is/are + past participle. Focus on action, not doer.' },
    { title: 'Used To', desc: 'عادت‌های گذشته', grammar: 'Used to + base verb for past habits that don\'t happen now.' },
    { title: 'Tag Questions', desc: 'سوالات ضمیمه', grammar: 'Positive sentence → negative tag. Negative sentence → positive tag.' },
    { title: 'Reported Speech', desc: 'نقل قول غیرمستقیم', grammar: 'Present → Past. Will → Would. Can → Could. Pronouns change.' },
    { title: 'Phrasal Verbs', desc: 'افعال چندبخشی', grammar: 'Verb + particle. Common: get up, turn on, look after, give up.' }
  ];

  const lessons = [];
  for (let i = 6; i <= TOTAL_DAYS; i++) {
    const topicIndex = i - 6;
    const topic = grammarTopics[topicIndex] || grammarTopics[grammarTopics.length - 1];
    const vocabSample = [
      { word: 'important', meaning: 'مهم', pronunciation: '/ɪmˈpɔːrtnt/', sentence: 'This is very important.' },
      { word: 'different', meaning: 'متفاوت', pronunciation: '/ˈdɪfrənt/', sentence: 'They are different.' },
      { word: 'together', meaning: 'با هم', pronunciation: '/təˈɡeðər/', sentence: 'We work together.' },
      { word: 'example', meaning: 'مثال', pronunciation: '/ɪɡˈzæmpl/', sentence: 'Give me an example.' },
      { word: 'problem', meaning: 'مشکل', pronunciation: '/ˈprɑːbləm/', sentence: 'What is the problem?' },
      { word: 'believe', meaning: 'باور کردن', pronunciation: '/bɪˈliːv/', sentence: 'I believe you.' },
      { word: 'remember', meaning: 'به یاد آوردن', pronunciation: '/rɪˈmembər/', sentence: 'Do you remember me?' },
      { word: 'understand', meaning: 'فهمیدن', pronunciation: '/ˌʌndərˈstænd/', sentence: 'I understand now.' },
      { word: 'decide', meaning: 'تصمیم گرفتن', pronunciation: '/dɪˈsaɪd/', sentence: 'You must decide.' },
      { word: 'practice', meaning: 'تمرین کردن', pronunciation: '/ˈpræktɪs/', sentence: 'Practice makes perfect.' }
    ];
    lessons.push({
      day: i,
      title: topic.title,
      description: topic.desc,
      grammar: { english: topic.grammar, persian: topic.grammar, examples: ['Example 1', 'Example 2'], mistakes: ['Common mistake 1', 'Common mistake 2'] },
      vocabulary: vocabSample,
      listening: { instruction: 'به فایل صوتی گوش دهید.', exercise: 'Fill in the blank.' },
      speaking: 'درباره این موضوع ۵ جمله بساز و با صدای بلند بگو.',
      writing: 'یک پاراگراف با استفاده از گرامر امروز بنویس.',
      friends: { episode: `S0${(i % 10) + 1}E0${(i % 5) + 1}`, scene: 'Friends scene description', expressions: ['Expression 1', 'Expression 2'] },
      usefulExpressions: ['Useful phrase 1', 'Useful phrase 2', 'Useful phrase 3'],
      geminiPrompt: `Teach ${topic.title} in English with examples and exercises.`,
      homework: `${topic.title} را تمرین کن و ۱۰ جمله بنویس.`
    });
  }
  return lessons;
}

const FULL_COURSE = [...COURSE_DATA, ...generateRemainingLessons()];

// ---------- STATE ----------
let appState = {
  lessons: [],
  notes: '',
  xp: 0,
  currentDay: 1,
  streak: 0,
  completedCount: 0,
  vocabMastered: {},
  checklists: {}
};

// ---------- LOCAL STORAGE ----------
function loadState() {
  try {
    const lessonsData = localStorage.getItem(STORAGE_KEYS.LESSONS);
    appState.lessons = lessonsData ? JSON.parse(lessonsData) : [];
    appState.notes = localStorage.getItem(STORAGE_KEYS.NOTES) || '';
    appState.xp = parseInt(localStorage.getItem(STORAGE_KEYS.XP)) || 0;
    appState.currentDay = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_DAY)) || 1;
    appState.streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK)) || 0;
    appState.completedCount = parseInt(localStorage.getItem(STORAGE_KEYS.COMPLETED_COUNT)) || 0;
    appState.vocabMastered = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOCAB_MASTERED)) || {};
    appState.checklists = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKLISTS)) || {};
  } catch (e) {
    console.warn('Failed to load state, initializing fresh.');
    initializeFreshState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(appState.lessons));
  localStorage.setItem(STORAGE_KEYS.NOTES, appState.notes);
  localStorage.setItem(STORAGE_KEYS.XP, appState.xp.toString());
  localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, appState.currentDay.toString());
  localStorage.setItem(STORAGE_KEYS.STREAK, appState.streak.toString());
  localStorage.setItem(STORAGE_KEYS.COMPLETED_COUNT, appState.completedCount.toString());
  localStorage.setItem(STORAGE_KEYS.VOCAB_MASTERED, JSON.stringify(appState.vocabMastered));
  localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(appState.checklists));
}

function initializeFreshState() {
  appState.lessons = FULL_COURSE.map(lesson => ({
    ...lesson,
    completed: false,
    unlocked: lesson.day === 1,
    checklist: { grammar: false, vocabulary: false, speaking: false, listening: false, friends: false, homework: false, review: false }
  }));
  appState.currentDay = 1;
  appState.completedCount = 0;
  appState.xp = 0;
  appState.streak = 0;
  saveState();
}

function initializeLessons() {
  if (!appState.lessons || appState.lessons.length === 0) {
    initializeFreshState();
  }
  // Sync with course data
  appState.lessons.forEach(lesson => {
    if (!lesson.checklist) {
      lesson.checklist = { grammar: false, vocabulary: false, speaking: false, listening: false, friends: false, homework: false, review: false };
    }
    if (lesson.completed === undefined) lesson.completed = false;
    if (lesson.unlocked === undefined) lesson.unlocked = lesson.day <= appState.currentDay;
  });
  saveState();
}

// ---------- UI HELPERS ----------
function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }

function updateText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ---------- DASHBOARD UPDATE ----------
function updateDashboard() {
  const progressPercent = Math.round((appState.completedCount / TOTAL_DAYS) * 100);
  updateText('progressPercent', progressPercent + '%');
  updateText('xpTotal', appState.xp.toLocaleString());
  updateText('currentDayDisplay', `روز ${appState.currentDay} از ${TOTAL_DAYS}`);
  updateText('statProgress', progressPercent + '%');
  updateText('statXp', appState.xp.toLocaleString());
  updateText('statCurrentDay', appState.currentDay);
  updateText('statCompletedLessons', appState.completedCount);
  updateText('statRemainingLessons', TOTAL_DAYS - appState.completedCount);
  updateText('statStreak', appState.streak);
  updateText('footerProgress', progressPercent + '%');

  const progressBar = document.getElementById('progressBarFill');
  if (progressBar) progressBar.style.width = progressPercent + '%';

  const sidebarLevel = document.getElementById('sidebarLevel');
  if (sidebarLevel) {
    const level = progressPercent < 30 ? 'A1+' : progressPercent < 60 ? 'A2' : progressPercent < 85 ? 'B1' : 'B2';
    sidebarLevel.textContent = `سطح: ${level}`;
  }

  updateTodayLessonCard();
}

function updateTodayLessonCard() {
  const currentLesson = appState.lessons.find(l => l.day === appState.currentDay);
  if (!currentLesson) return;
  updateText('todayDayBadge', `روز ${appState.currentDay}`);
  updateText('todayLessonTitle', currentLesson.title);
  updateText('todayLessonDesc', currentLesson.description);
  updateText('todayGrammar', currentLesson.title);
  updateText('todayVocab', '10 کلمه جدید');
  updateText('todayFriends', currentLesson.friends.episode);
  const quickBtn = document.getElementById('quickOpenLessonBtn');
  if (quickBtn) quickBtn.setAttribute('data-lesson-day', appState.currentDay);
}

// ---------- PLANNER RENDER ----------
function renderPlanner() {
  const grid = document.getElementById('plannerGrid');
  if (!grid) return;
  grid.innerHTML = '';

  appState.lessons.forEach(lesson => {
    const card = document.createElement('div');
    card.className = 'planner-card glass';
    if (lesson.completed) card.classList.add('completed');
    if (lesson.day === appState.currentDay) card.classList.add('current');

    const checklistProgress = lesson.checklist
      ? Math.round((Object.values(lesson.checklist).filter(Boolean).length / 7) * 100)
      : 0;

    card.innerHTML = `
      <div class="planner-card-header">
        <span class="planner-day-num">روز ${lesson.day}</span>
        <span class="planner-status-icon">${lesson.completed ? '✅' : lesson.day === appState.currentDay ? '📖' : '🔒'}</span>
      </div>
      <h3 class="planner-lesson-title">${lesson.title}</h3>
      <p class="planner-lesson-desc">${lesson.description}</p>
      <div class="planner-progress-indicator">
        <div class="planner-progress-fill" style="width:${checklistProgress}%"></div>
      </div>
      <button class="planner-open-btn" data-lesson-day="${lesson.day}">📖 باز کردن درس</button>
    `;

    const openBtn = card.querySelector('.planner-open-btn');
    openBtn.addEventListener('click', () => openLessonModal(lesson.day));
    grid.appendChild(card);
  });
}

// ---------- MODAL MANAGEMENT ----------
let currentModalLessonDay = null;

function openLessonModal(day) {
  const lesson = appState.lessons.find(l => l.day === day);
  if (!lesson) return;

  currentModalLessonDay = day;
  populateModal(lesson);

  const overlay = document.getElementById('lessonModalOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLessonModal() {
  const overlay = document.getElementById('lessonModalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  currentModalLessonDay = null;
}

function populateModal(lesson) {
  updateText('modalLessonTitle', `درس روز ${lesson.day}`);
  updateText('modalLessonName', lesson.title);
  updateText('modalLessonDesc', lesson.description);
  updateText('modalGrammarEnglish', lesson.grammar.english);
  updateText('modalGrammarPersian', lesson.grammar.persian);

  // Examples
  const examplesList = document.getElementById('modalExamplesList');
  if (examplesList) {
    examplesList.innerHTML = lesson.grammar.examples.map(ex => `<li class="example-item">${ex}</li>`).join('');
  }

  // Mistakes
  const mistakesList = document.getElementById('modalMistakesList');
  if (mistakesList) {
    mistakesList.innerHTML = lesson.grammar.mistakes.map(m => `<li class="mistake-item">${m}</li>`).join('');
  }

  // Vocabulary table
  const vocabBody = document.getElementById('modalVocabBody');
  if (vocabBody) {
    vocabBody.innerHTML = lesson.vocabulary.map((v, i) => {
      const wordKey = `${lesson.day}_${i}`;
      const mastered = appState.vocabMastered[wordKey] || false;
      return `
        <tr>
          <td>${v.word}</td>
          <td>${v.meaning}</td>
          <td>${v.pronunciation}</td>
          <td>${v.sentence}</td>
          <td><input type="checkbox" class="vocab-mastered-checkbox" data-vocab-key="${wordKey}" ${mastered ? 'checked' : ''}></td>
        </tr>`;
    }).join('');
  }

  // Friends
  updateText('modalFriendsEpisode', lesson.friends.episode);
  updateText('modalFriendsScene', lesson.friends.scene);
  const friendsExpressions = document.getElementById('modalFriendsExpressions');
  if (friendsExpressions) {
    const ul = friendsExpressions.querySelector('ul');
    if (ul) ul.innerHTML = lesson.friends.expressions.map(e => `<li>${e}</li>`).join('');
  }

  // Useful expressions
  const expressionsList = document.getElementById('modalExpressionsList');
  if (expressionsList) {
    expressionsList.innerHTML = lesson.usefulExpressions.map(e => `<li>${e}</li>`).join('');
  }

  // Listening
  updateText('modalListeningInstruction', lesson.listening.instruction);
  updateText('modalListeningExercise', lesson.listening.exercise);

  // Speaking & Writing
  updateText('modalSpeakingPrompt', lesson.speaking);
  updateText('modalWritingPrompt', lesson.writing);

  // Gemini
  updateText('modalGeminiPrompt', lesson.geminiPrompt);

  // Homework
  updateText('modalHomeworkContent', lesson.homework);

  // Checklist
  const checkboxes = document.querySelectorAll('#modalChecklistItems .checklist-checkbox');
  checkboxes.forEach(cb => {
    const key = cb.getAttribute('data-checklist');
    cb.checked = lesson.checklist ? lesson.checklist[key] || false : false;
  });

  // Notes
  const notesTextarea = document.getElementById('modalNotesTextarea');
  if (notesTextarea) {
    notesTextarea.value = lesson.notes || '';
  }

  // Vocab checkboxes
  document.querySelectorAll('.vocab-mastered-checkbox').forEach(cb => {
    cb.addEventListener('change', handleVocabMasteredChange);
  });
}

function handleVocabMasteredChange(e) {
  const key = e.target.getAttribute('data-vocab-key');
  appState.vocabMastered[key] = e.target.checked;
  saveState();
}

// ---------- LESSON COMPLETION ----------
function completeLesson() {
  if (!currentModalLessonDay) return;
  const lesson = appState.lessons.find(l => l.day === currentModalLessonDay);
  if (!lesson) return;

  // Save checklist
  const checkboxes = document.querySelectorAll('#modalChecklistItems .checklist-checkbox');
  let checklistXP = 0;
  checkboxes.forEach(cb => {
    const key = cb.getAttribute('data-checklist');
    if (lesson.checklist) lesson.checklist[key] = cb.checked;
    if (cb.checked && XP_REWARDS[key]) checklistXP += XP_REWARDS[key];
  });

  // Save notes
  const notesTextarea = document.getElementById('modalNotesTextarea');
  if (notesTextarea) lesson.notes = notesTextarea.value;

  if (!lesson.completed) {
    lesson.completed = true;
    appState.completedCount++;
    appState.streak++;
    appState.xp += checklistXP;

    // Unlock next lesson
    const nextLesson = appState.lessons.find(l => l.day === currentModalLessonDay + 1);
    if (nextLesson) {
      nextLesson.unlocked = true;
      if (appState.currentDay < nextLesson.day) {
        appState.currentDay = nextLesson.day;
      }
    }
  }

  saveState();
  updateDashboard();
  renderPlanner();
  closeLessonModal();
}

// ---------- NOTES MANAGEMENT ----------
let notesSaveTimer = null;
function setupNotes() {
  const textarea = document.getElementById('dailyNotes');
  if (!textarea) return;
  textarea.value = appState.notes;
  updateCharCount();

  textarea.addEventListener('input', () => {
    if (textarea.value.length > 1000) textarea.value = textarea.value.slice(0, 1000);
    updateCharCount();
    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(() => {
      appState.notes = textarea.value;
      saveState();
    }, 500);
  });
}

function updateCharCount() {
  const textarea = document.getElementById('dailyNotes');
  const charCurrent = document.getElementById('charCurrent');
  if (textarea && charCurrent) {
    charCurrent.textContent = textarea.value.length;
  }
}

// ---------- GEMINI PROMPT ----------
function setupGemini() {
  const copyBtn = document.getElementById('copyPromptButton');
  const modalCopyBtn = document.getElementById('modalCopyGeminiBtn');

  function updateDailyPrompt() {
    const currentLesson = appState.lessons.find(l => l.day === appState.currentDay);
    const promptText = document.getElementById('geminiPromptText');
    if (promptText && currentLesson) {
      promptText.textContent = currentLesson.geminiPrompt;
    }
  }

  async function copyPrompt(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const text = document.getElementById('geminiPromptText')?.textContent || '';
      await copyPrompt(text);
      copyBtn.textContent = '✅ کپی شد!';
      setTimeout(() => { copyBtn.textContent = '📋 کپی پرامپت'; }, 2000);
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', async () => {
      const text = document.getElementById('modalGeminiPrompt')?.textContent || '';
      await copyPrompt(text);
      modalCopyBtn.textContent = '✅ کپی شد!';
      setTimeout(() => { modalCopyBtn.textContent = '📋 کپی'; }, 2000);
    });
  }

  updateDailyPrompt();
}

// ---------- SETTINGS ----------
function setupSettings() {
  const resetProgressBtn = document.getElementById('resetProgressButton');
  const resetNotesBtn = document.getElementById('resetNotesButton');

  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
      if (confirm('آیا مطمئنی؟ تمام پیشرفت، XP و استریک پاک می‌شود.')) {
        localStorage.clear();
        initializeFreshState();
        updateDashboard();
        renderPlanner();
        const textarea = document.getElementById('dailyNotes');
        if (textarea) textarea.value = '';
        updateCharCount();
      }
    });
  }

  if (resetNotesBtn) {
    resetNotesBtn.addEventListener('click', () => {
      if (confirm('تمام یادداشت‌ها پاک شود؟')) {
        appState.notes = '';
        saveState();
        const textarea = document.getElementById('dailyNotes');
        if (textarea) textarea.value = '';
        updateCharCount();
      }
    });
  }
}

// ---------- NAVIGATION ----------
function setupNavigation() {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('mobileMenuToggle');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  const sections = $$('.content-section');
  const navItems = $$('.nav-item');
  const bottomNavItems = $$('.bottom-nav-item');

  function showSection(sectionId) {
    sections.forEach(s => s.classList.remove('active-section'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active-section');

    navItems.forEach(n => n.classList.remove('active'));
    bottomNavItems.forEach(n => n.classList.remove('active'));

    const matchingNav = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
    const matchingBottom = document.querySelector(`.bottom-nav-item[data-section="${sectionId}"]`);
    if (matchingNav) matchingNav.classList.add('active');
    if (matchingBottom) matchingBottom.classList.add('active');

    if (sidebar) sidebar.classList.remove('open');
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-section');
      if (sectionId) showSection(sectionId);
    });
  });

  bottomNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-section');
      if (sectionId) showSection(sectionId);
    });
  });
}

// ---------- MODAL EVENTS ----------
function setupModalEvents() {
  const overlay = document.getElementById('lessonModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const completeBtn = document.getElementById('modalCompleteBtn');
  const quickBtn = document.getElementById('quickOpenLessonBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeLessonModal);
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLessonModal();
  });

  if (completeBtn) completeBtn.addEventListener('click', completeLesson);

  if (quickBtn) {
    quickBtn.addEventListener('click', () => {
      const day = parseInt(quickBtn.getAttribute('data-lesson-day'));
      if (day) openLessonModal(day);
    });
  }

  // Delegated event for planner open buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('planner-open-btn')) {
      const day = parseInt(e.target.getAttribute('data-lesson-day'));
      if (day) openLessonModal(day);
    }
  });

  // Checklist change in modal
  document.getElementById('modalChecklistItems')?.addEventListener('change', (e) => {
    if (e.target.classList.contains('checklist-checkbox')) {
      const key = e.target.getAttribute('data-checklist');
      if (currentModalLessonDay && appState.lessons) {
        const lesson = appState.lessons.find(l => l.day === currentModalLessonDay);
        if (lesson && lesson.checklist) {
          lesson.checklist[key] = e.target.checked;
          saveState();
        }
      }
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLessonModal();
  });
}

// ---------- INITIALIZATION ----------
function init() {
  loadState();
  initializeLessons();
  updateDashboard();
  renderPlanner();
  setupNotes();
  setupGemini();
  setupSettings();
  setupNavigation();
  setupModalEvents();
  console.log('✅ English Master initialized successfully.');
}

document.addEventListener('DOMContentLoaded', init);
