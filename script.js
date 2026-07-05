/* ============================================
   English Master – 30 Day Learning System
   Core Application Logic
   ============================================ */

// ==========================================
// 1. COMPLETE LESSON DATA (30 Days)
// ==========================================
// Each day contains structured educational content.
// To avoid breaking UI, placeholder strings are used for long HTML blocks.
const lessons = [
  {
    day: 1,
    title: "Welcome to English Master",
    objectives: ["خودت را معرفی کنی", "از دیگران اسم بپرسی", "سلام و خداحافظی کنی"],
    grammar: `<h4>فعل To Be (مثبت)</h4>
      <table class="grammar-table"><tr><th>Subject</th><th>Verb</th></tr>
      <tr><td>I</td><td class="en-cell">am</td></tr>
      <tr><td>You / We / They</td><td class="en-cell">are</td></tr>
      <tr><td>He / She / It</td><td class="en-cell">is</td></tr></table>
      <div class="grammar-example">I am Mohammad. / She is a doctor.</div>
      <div class="mistake-block"><div class="mistake-title">⚠ اشتباه رایج</div>
      <div class="mistake-item"><span class="wrong">I am engineer</span> → <span class="correct">I am an engineer</span></div></div>`,
    vocabulary: [
      { word: "Hello", meaning: "سلام" }, { word: "Name", meaning: "اسم" },
      { word: "Student", meaning: "دانشجو" }, { word: "Teacher", meaning: "معلم" },
      { word: "Friend", meaning: "دوست" }, { word: "Country", meaning: "کشور" },
      { word: "City", meaning: "شهر" }, { word: "Happy", meaning: "خوشحال" },
      { word: "Goodbye", meaning: "خداحافظ" }, { word: "Morning", meaning: "صبح" }
    ],
    sentences: ["Hello!", "My name is Mohammad.", "I am from Iran.", "Nice to meet you.", "How are you?", "I'm fine, thank you."],
    speaking: "بلند بگو: Hello. My name is... I am from... I am a student. Nice to meet you.",
    writing: "۵ جمله درباره خودت بنویس. (مثال: I am Mohammad. I am from Iran.)",
    listening: "روی عبارات سلام و معرفی تمرکز کن.",
    geminiPrompt: `Today I am studying Day 1 of my English course.\nMy level is A1+.\nPlease act as my English teacher.\nToday's grammar is "To Be".\nTeach me step by step.\nAsk me questions and correct every mistake.`,
    friends: { episode: "S01E01", focus: ["Greeting", "Introducing yourself", "People's names"], phrases: ["Nice to meet you.", "How are you?", "Come in."] },
    checklist: ["گرامر To Be", "۱۰ لغت جدید", "جملات کاربردی", "تمرین مکالمه", "نوشتن ۵ جمله", "۵ دقیقه Friends"],
    challenge: "بدون نگاه کردن بگو: Hello! My name is ___. I am from ___. Nice to meet you."
  },
  {
    day: 2,
    title: "Articles (A / An / The)",
    objectives: ["حروف تعریف را درست استفاده کنی", "تفاوت a و an را بدانی"],
    grammar: `<h4>حروف تعریف</h4>
      <div class="grammar-example">I am <b>a</b> student. (صامت)</div>
      <div class="grammar-example">She is <b>an</b> engineer. (صدادار)</div>
      <div class="grammar-example">The sun is hot. (مشخص)</div>
      <div class="mistake-block"><div class="mistake-title">⚠ اشتباه رایج</div>
      <div class="mistake-item"><span class="wrong">She is a doctor</span> → <span class="correct">She is a doctor (correct)</span></div>
      <div class="mistake-item"><span class="wrong">I am an boy</span> → <span class="correct">I am a boy</span></div></div>`,
    vocabulary: [
      { word: "Apple", meaning: "سیب" }, { word: "Book", meaning: "کتاب" },
      { word: "Egg", meaning: "تخم مرغ" }, { word: "Umbrella", meaning: "چتر" },
      { word: "University", meaning: "دانشگاه" }, { word: "Hour", meaning: "ساعت" },
      { word: "Car", meaning: "ماشین" }, { word: "Dog", meaning: "سگ" },
      { word: "Ice", meaning: "یخ" }, { word: "Orange", meaning: "پرتقال" }
    ],
    sentences: ["I have a book.", "She is an artist.", "The car is red.", "It's an hour.", "He is a university student."],
    speaking: "۵ شیء اطرافت را با a یا an توصیف کن.",
    writing: "۱۰ جمله با حروف تعریف بنویس.",
    listening: "به کاربرد a/an/the در مکالمات دقت کن.",
    geminiPrompt: `Today is Day 2. Topic: Articles (a, an, the).\nTest me with 10 fill-in-the-blank questions.\nExplain why each answer is correct.`,
    friends: { episode: "S01E01", focus: ["Articles in natural speech"], phrases: ["I have a date.", "An old friend."] },
    checklist: ["تفاوت a و an", "استفاده از The", "۱۰ لغت", "تمرین نوشتن", "مکالمه"],
    challenge: "۵ جمله بنویس و a/an/the را مشخص کن."
  },
  {
    day: 3,
    title: "Possessive Adjectives",
    objectives: ["ضمایر ملکی را یاد بگیری", "مالکیت را بیان کنی"],
    grammar: `<h4>ضمایر ملکی (Possessive Adjectives)</h4>
      <table class="grammar-table"><tr><th>Subject</th><th>Possessive</th><th>Example</th></tr>
      <tr><td>I</td><td class="en-cell">My</td><td class="en-cell">My name</td></tr>
      <tr><td>You</td><td class="en-cell">Your</td><td class="en-cell">Your book</td></tr>
      <tr><td>He</td><td class="en-cell">His</td><td class="en-cell">His car</td></tr>
      <tr><td>She</td><td class="en-cell">Her</td><td class="en-cell">Her bag</td></tr>
      <tr><td>We</td><td class="en-cell">Our</td><td class="en-cell">Our house</td></tr>
      <tr><td>They</td><td class="en-cell">Their</td><td class="en-cell">Their friends</td></tr></table>`,
    vocabulary: [
      { word: "Family", meaning: "خانواده" }, { word: "Mother", meaning: "مادر" },
      { word: "Father", meaning: "پدر" }, { word: "Brother", meaning: "برادر" },
      { word: "Sister", meaning: "خواهر" }, { word: "Husband", meaning: "شوهر" },
      { word: "Wife", meaning: "همسر" }, { word: "Son", meaning: "پسر" },
      { word: "Daughter", meaning: "دختر" }, { word: "Job", meaning: "شغل" }
    ],
    sentences: ["My name is Ali.", "Her mother is a teacher.", "His job is very hard.", "Our house is big.", "What is your phone number?"],
    speaking: "اعضای خانواده‌ات را با ضمایر ملکی معرفی کن.",
    writing: "پاراگراف کوتاهی درباره خانواده‌ات بنویس.",
    listening: "وقتی شخصی از my/your/his/her استفاده می‌کند توجه کن.",
    geminiPrompt: `Day 3: Possessive Adjectives.\nAsk me to describe my family using my, your, his, her, our, their.\nCorrect my mistakes.`,
    friends: { episode: "S01E02", focus: ["Talking about family", "Possessives"], phrases: ["My sister", "His apartment", "Her job"] },
    checklist: ["حفظ ضمایر ملکی", "۱۰ لغت خانواده", "نوشتن پاراگراف", "مکالمه"],
    challenge: "بدون مکث بگو: My name is___. My mother is___. My father is___."
  },
  {
    day: 4,
    title: "Present Simple (Affirmative)",
    objectives: ["زمان حال ساده را بسازی", "عادت‌های روزمره را بگویی"],
    grammar: `<h4>حال ساده (مثبت)</h4>
      <div class="grammar-example">I <b>play</b> football every day.</div>
      <div class="grammar-example">She <b>plays</b> tennis. (فعل + s/es برای he/she/it)</div>
      <div class="mistake-block"><div class="mistake-title">⚠ اشتباه رایج</div>
      <div class="mistake-item"><span class="wrong">She play music</span> → <span class="correct">She plays music</span></div></div>`,
    vocabulary: [
      { word: "Every day", meaning: "هر روز" }, { word: "Usually", meaning: "معمولاً" },
      { word: "Sometimes", meaning: "گاهی" }, { word: "Always", meaning: "همیشه" },
      { word: "Never", meaning: "هرگز" }, { word: "Often", meaning: "اغلب" },
      { word: "Work", meaning: "کار کردن" }, { word: "Study", meaning: "درس خواندن" },
      { word: "Cook", meaning: "آشپزی کردن" }, { word: "Watch", meaning: "تماشا کردن" }
    ],
    sentences: ["I drink coffee every morning.", "She usually studies at night.", "We never eat fast food.", "He always wakes up early."],
    speaking: "روتین روزمره‌ات را با حال ساده بگو.",
    writing: "۱۰ جمله درباره عادت‌های روزمره‌ات بنویس.",
    listening: "به افعالی که با s/es تمام می‌شوند دقت کن.",
    geminiPrompt: `Day 4: Present Simple Affirmative.\nAsk me about my daily routine.\nCheck if I add 's' correctly for 3rd person singular.`,
    friends: { episode: "S01E02", focus: ["Daily routines", "Habits"], phrases: ["I always...", "She usually..."] },
    checklist: ["قاعده اضافه شدن s/es", "۱۰ لغت", "روتین روزمره", "نوشتن"],
    challenge: "روتین کامل یک روزت را بدون توقف بگو."
  },
  {
    day: 5,
    title: "Present Simple (Negative & Question)",
    objectives: ["جمله منفی و سوالی حال ساده بسازی"],
    grammar: `<h4>منفی: Subject + do/does + not + base verb</h4>
      <div class="grammar-example">I <b>do not</b> (don't) like coffee.</div>
      <div class="grammar-example">She <b>does not</b> (doesn't) play tennis.</div>
      <h4>سوالی: Do/Does + subject + base verb?</h4>
      <div class="grammar-example"><b>Do</b> you speak English?</div>
      <div class="grammar-example"><b>Does</b> he work here?</div>`,
    vocabulary: [
      { word: "Like", meaning: "دوست داشتن" }, { word: "Want", meaning: "خواستن" },
      { word: "Need", meaning: "نیاز داشتن" }, { word: "Live", meaning: "زندگی کردن" },
      { word: "Speak", meaning: "صحبت کردن" }, { word: "Understand", meaning: "فهمیدن" },
      { word: "Eat", meaning: "خوردن" }, { word: "Drink", meaning: "نوشیدن" },
      { word: "Go", meaning: "رفتن" }, { word: "Come", meaning: "آمدن" }
    ],
    sentences: ["Do you like pizza?", "She doesn't speak French.", "Do they live in Tehran?", "He doesn't want to go."],
    speaking: "از من با do/does سوال بپرس (Roleplay).",
    writing: "۵ جمله منفی و ۵ جمله سوالی بنویس.",
    listening: "به سوالات در Friends دقت کن.",
    geminiPrompt: `Day 5: Present Simple Negative & Question.\nHave a conversation with me. Ask questions using Do/Does. Correct my negatives.`,
    friends: { episode: "S01E03", focus: ["Questions in daily life"], phrases: ["Do you want...?", "Does she know...?"] },
    checklist: ["تفاوت do/does", "ساختار سوالی", "۱۰ لغت", "نقش‌آفرینی", "نوشتن"],
    challenge: "۵ سوال واقعی از دوستت بپرس (ذهنی) و جواب بده."
  },
  {
    day: 6, title: "Can / Can't (Ability)", objectives: ["توانایی‌ها را بیان کنی"],
    grammar: `<h4>Can + base verb (توانستن)</h4><div class="grammar-example">I <b>can</b> swim.</div><div class="grammar-example">She <b>can't</b> (cannot) drive.</div><div class="grammar-example"><b>Can</b> you help me?</div>`,
    vocabulary: [{ word: "Swim", meaning: "شنا کردن" }, { word: "Drive", meaning: "رانندگی کردن" }, { word: "Cook", meaning: "آشپزی کردن" }, { word: "Dance", meaning: "رقصیدن" }, { word: "Sing", meaning: "خواندن" }, { word: "Draw", meaning: "نقاشی کشیدن" }, { word: "Speak", meaning: "صحبت کردن" }, { word: "Play", meaning: "بازی کردن" }, { word: "Run", meaning: "دویدن" }, { word: "Write", meaning: "نوشتن" }],
    sentences: ["I can speak English.", "She can't cook.", "Can you play the guitar?", "They can swim very fast."],
    speaking: "۵ توانایی و ۵ ناتوانی‌ات را بگو.",
    writing: "关于你能做什么和不能做什么写۱۰句话。",
    listening: "به can/can't در مکالمات دقت کن.",
    geminiPrompt: `Day 6: Can/Can't. Ask me what I can and can't do. Correct my sentences.`,
    friends: { episode: "S01E03", focus: ["Talking about abilities"], phrases: ["I can't believe it!", "Can you help me?"] },
    checklist: ["ساختار can", "۱۰ لغت", "مکالمه", "نوشتن"],
    challenge: "در ۳۰ ثانیه ۱۰ چیزی که می‌توانی بکن بگو."
  },
  {
    day: 7, title: "There is / There are", objectives: ["وجود چیزها و افراد را بیان کنی"],
    grammar: `<h4>There is (مفرد) / There are (جمع)</h4><div class="grammar-example"><b>There is</b> a book on the table.</div><div class="grammar-example"><b>There are</b> three cars outside.</div><div class="grammar-example"><b>Is there</b> a bank near here?</div><div class="grammar-example"><b>Are there</b> any students?</div>`,
    vocabulary: [{ word: "Table", meaning: "میز" }, { word: "Chair", meaning: "صندلی" }, { word: "Room", meaning: "اتاق" }, { word: "Kitchen", meaning: "آشپزخانه" }, { word: "Bathroom", meaning: "حمام" }, { word: "Bedroom", meaning: "اتاق خواب" }, { word: "Garden", meaning: "باغ" }, { word: "Near", meaning: "نزدیک" }, { word: "Next to", meaning: "کنار" }, { word: "Between", meaning: "بین" }],
    sentences: ["There is a cat in the room.", "There are two windows.", "Is there a supermarket here?", "There aren't any chairs."],
    speaking: "اتاقت را با there is/there are توصیف کن.",
    writing: "توصیف کامل یک اتاق بنویس.",
    listening: "به توصیف مکان‌ها در فیلم دقت کن.",
    geminiPrompt: `Day 7: There is/There are. Ask me to describe different rooms. Correct prepositions and is/are usage.`,
    friends: { episode: "S01E04", focus: ["Describing apartments"], phrases: ["There is a...", "There are no..."] },
    checklist: ["تفاوت is/are", "حروف اضافه مکان", "۱۰ لغت", "توصیف اتاق"],
    challenge: "اتاقت را در ۶۰ ثانیه بدون مکث توصیف کن."
  },
  {
    day: 8, title: "Past Simple (Was / Were)", objectives: ["گذشته فعل to be را یاد بگیری"],
    grammar: `<h4>گذشته To Be</h4><table class="grammar-table"><tr><th>Subject</th><th>Past</th></tr><tr><td>I / He / She / It</td><td class="en-cell">was</td></tr><tr><td>You / We / They</td><td class="en-cell">were</td></tr></table><div class="grammar-example">I <b>was</b> tired yesterday.</div><div class="grammar-example">They <b>were</b> at home.</div>`,
    vocabulary: [{ word: "Yesterday", meaning: "دیروز" }, { word: "Last week", meaning: "هفته پیش" }, { word: "Last night", meaning: "دیشب" }, { word: "Two days ago", meaning: "دو روز پیش" }, { word: "Tired", meaning: "خسته" }, { word: "Hungry", meaning: "گرسنه" }, { word: "Busy", meaning: "مشغول" }, { word: "Ready", meaning: "آماده" }, { word: "Angry", meaning: "عصبانی" }, { word: "Worried", meaning: "نگران" }],
    sentences: ["I was sick yesterday.", "We were happy.", "Was she at the party?", "They weren't ready."],
    speaking: "۵ جمله درباره حالتت دیروز بگو.",
    writing: "چه چیزی دیروز اتفاق افتاد؟ بنویس.",
    listening: "به was/were در داستان‌ها دقت کن.",
    geminiPrompt: `Day 8: Past Simple (was/were). Ask me about my yesterday. Correct was/were usage.`,
    friends: { episode: "S01E04", focus: ["Talking about past events"], phrases: ["I was...", "We were..."] },
    checklist: ["جدول was/were", "۱۰ لغت احساس", "مکالمه گذشته", "نوشتن"],
    challenge: "کل دیروزت را با was/were تعریف کن."
  },
  {
    day: 9, title: "Past Simple (Regular Verbs)", objectives: ["گذشته افعال منظم را بسازی"],
    grammar: `<h4>گذشته افعال منظم (verb + ed)</h4><div class="grammar-example">work → work<b>ed</b></div><div class="grammar-example">play → play<b>ed</b></div><div class="grammar-example">study → studi<b>ed</b> (y → ied)</div>`,
    vocabulary: [{ word: "Worked", meaning: "کار کرد" }, { word: "Played", meaning: "بازی کرد" }, { word: "Studied", meaning: "درس خواند" }, { word: "Watched", meaning: "تماشا کرد" }, { word: "Listened", meaning: "گوش داد" }, { word: "Cooked", meaning: "آشپزی کرد" }, { word: "Walked", meaning: "پیاده روی کرد" }, { word: "Talked", meaning: "صحبت کرد" }, { word: "Cleaned", meaning: "تمیز کرد" }, { word: "Finished", meaning: "تمام کرد" }],
    sentences: ["I worked late yesterday.", "She studied English.", "We watched a movie.", "Did you play football?"],
    speaking: "دیروزت را با افعال منظم تعریف کن.",
    writing: "پاراگرافی درباره آخرین تعطیلاتت بنویس.",
    listening: "به شناسه ed در انتهای افعال گوش بده.",
    geminiPrompt: `Day 9: Past Simple Regular Verbs. Ask me what I did yesterday. Make sure I use -ed correctly.`,
    friends: { episode: "S01E05", focus: ["Past tense stories"], phrases: ["We talked about...", "I finished..."] },
    checklist: ["قواعد اضافه کردن ed", "۱۰ لغت", "روایت گذشته", "نوشتن"],
    challenge: "۱۰ فعل منظم گذشته به ترتیب بگو."
  },
  {
    day: 10, title: "Past Simple (Irregular Verbs)", objectives: ["افعال بی‌قاعده گذشته را یاد بگیری"],
    grammar: `<h4>افعال بی‌قاعده</h4><div class="grammar-example">go → <b>went</b></div><div class="grammar-example">eat → <b>ate</b></div><div class="grammar-example">see → <b>saw</b></div><div class="grammar-example">have → <b>had</b></div>`,
    vocabulary: [{ word: "Went", meaning: "رفت" }, { word: "Ate", meaning: "خورد" }, { word: "Saw", meaning: "دید" }, { word: "Had", meaning: "داشت" }, { word: "Got", meaning: "گرفت" }, { word: "Made", meaning: "ساخت" }, { word: "Took", meaning: "برد" }, { word: "Came", meaning: "آمد" }, { word: "Bought", meaning: "خرید" }, { word: "Knew", meaning: "می‌دانست" }],
    sentences: ["I went to the park.", "She ate lunch.", "Did you see the movie?", "We had a great time."],
    speaking: "دیروزت را فقط با افعال بی‌قاعده بگو.",
    writing: "داستان کوتاهی با ۱۰ فعل بی‌قاعده بنویس.",
    listening: "افعال بی‌قاعده در مکالمه خیلی رایج هستند.",
    geminiPrompt: `Day 10: Irregular Verbs. Test me on 20 common irregular verbs. Use them in a story.`,
    friends: { episode: "S01E05", focus: ["Irregular verbs in speech"], phrases: ["I went...", "She got...", "He saw..."] },
    checklist: ["حفظ ۱۰ فعل بی‌قاعده", "ساختار سوالی Did", "مکالمه", "نوشتن داستان"],
    challenge: "داستانی با ۱۵ فعل بی‌قاعده بگو."
  },
  {
    day: 11, title: "Future (Going to)", objectives: ["برنامه‌های آینده را بیان کنی"],
    grammar: `<h4>Subject + am/is/are + going to + base verb</h4><div class="grammar-example">I <b>am going to</b> study tonight.</div><div class="grammar-example">She <b>is going to</b> travel next week.</div>`,
    vocabulary: [{ word: "Tonight", meaning: "امشب" }, { word: "Tomorrow", meaning: "فردا" }, { word: "Next week", meaning: "هفته آینده" }, { word: "Next month", meaning: "ماه آینده" }, { word: "Plan", meaning: "برنامه" }, { word: "Trip", meaning: "سفر" }, { word: "Party", meaning: "مهمانی" }, { word: "Meeting", meaning: "جلسه" }, { word: "Invitation", meaning: "دعوتنامه" }, { word: "Decide", meaning: "تصمیم گرفتن" }],
    sentences: ["I am going to read a book.", "They are going to visit us.", "Are you going to come?", "She isn't going to work."],
    speaking: "۳ برنامه آینده‌ات را بگو.",
    writing: "برنامه‌هایت برای هفته آینده را بنویس.",
    listening: "به going to در برنامه‌ریزی‌ها دقت کن.",
    geminiPrompt: `Day 11: Future with Going to. Ask about my plans for next week. Correct my sentences.`,
    friends: { episode: "S01E06", focus: ["Making plans"], phrases: ["I'm going to...", "Are we going to...?"] },
    checklist: ["ساختار going to", "۱۰ لغت آینده", "برنامه‌ریزی", "نوشتن"],
    challenge: "برنامه ۵ روز آینده‌ات را بدون مکث بگو."
  },
  {
    day: 12, title: "Countable & Uncountable Nouns", objectives: ["تفاوت شمارشی و غیرشمارشی را بدانی"],
    grammar: `<h4>شمارشی (Countable): a/an, some, many, a few</h4><div class="grammar-example">I have <b>some</b> books. / How <b>many</b> apples?</div><h4>غیرشمارشی (Uncountable): some, much, a little</h4><div class="grammar-example">I need <b>some</b> water. / How <b>much</b> money?</div>`,
    vocabulary: [{ word: "Water", meaning: "آب" }, { word: "Bread", meaning: "نان" }, { word: "Money", meaning: "پول" }, { word: "Information", meaning: "اطلاعات" }, { word: "Furniture", meaning: "اثاثیه" }, { word: "Apple", meaning: "سیب" }, { word: "Eggs", meaning: "تخم مرغ" }, { word: "Rice", meaning: "برنج" }, { word: "Coffee", meaning: "قهوه" }, { word: "Sugar", meaning: "شکر" }],
    sentences: ["How many students are there?", "How much money do you have?", "I need some water.", "There are a few apples."],
    speaking: "از من سوال بپرس با how much/how many.",
    writing: "لیست خریدی بنویس و much/many درست استفاده کن.",
    listening: "به much/many در مکالمه دقت کن.",
    geminiPrompt: `Day 12: Countable vs Uncountable. Give me a shopping list quiz. Test much/many/some/any.`,
    friends: { episode: "S01E06", focus: ["Food discussions"], phrases: ["How much...?", "Some coffee..."] },
    checklist: ["تفاوت دو نوع اسم", "much/many", "۱۰ لغت", "لیست خرید"],
    challenge: "در ۳۰ ثانیه ۵ اسم شمارشی و ۵ غیرشمارشی بگو."
  },
  {
    day: 13, title: "Prepositions of Time", objectives: ["حروف اضافه زمان را درست استفاده کنی"],
    grammar: `<h4>IN: ماه، سال، فصل، صبح/عصر</h4><div class="grammar-example">in June / in 2024 / in the morning</div><h4>ON: روز، تاریخ</h4><div class="grammar-example">on Monday / on my birthday</div><h4>AT: ساعت دقیق</h4><div class="grammar-example">at 5 o'clock / at night</div>`,
    vocabulary: [{ word: "In the morning", meaning: "صبح" }, { word: "In the evening", meaning: "عصر" }, { word: "At night", meaning: "شب" }, { word: "On Friday", meaning: "جمعه" }, { word: "In summer", meaning: "تابستان" }, { word: "At weekend", meaning: "آخر هفته" }, { word: "On time", meaning: "سر وقت" }, { word: "Late", meaning: "دیر" }, { word: "Early", meaning: "زود" }, { word: "Schedule", meaning: "برنامه زمانی" }],
    sentences: ["I wake up at 7.", "We meet on Friday.", "She was born in May.", "The class is in the morning."],
    speaking: "برنامه روزانه‌ات را با حروف اضافه زمان بگو.",
    writing: "برنامه هفتگی‌ات را بنویس.",
    listening: "به in/on/at در زمان‌ها دقت کن.",
    geminiPrompt: `Day 13: Prepositions of Time. Ask me when I do things. Correct in/on/at.`,
    friends: { episode: "S01E07", focus: ["Time expressions"], phrases: ["On Friday", "At 8 o'clock"] },
    checklist: ["جدول in/on/at", "۱۰ لغت", "برنامه هفتگی", "مکالمه"],
    challenge: "برنامه کامل یک هفته‌ات را با حروف اضافه درست بگو."
  },
  {
    day: 14, title: "Present Continuous", objectives: ["کارهایی که الان انجام می‌دهی را بگویی"],
    grammar: `<h4>Subject + am/is/are + verb-ing</h4><div class="grammar-example">I <b>am studying</b> English now.</div><div class="grammar-example">She <b>is working</b> at the moment.</div><div class="grammar-example"><b>Are</b> you <b>listening</b>?</div>`,
    vocabulary: [{ word: "Now", meaning: "الان" }, { word: "At the moment", meaning: "در این لحظه" }, { word: "Right now", meaning: "همین الان" }, { word: "Waiting", meaning: "منتظر بودن" }, { word: "Sitting", meaning: "نشستن" }, { word: "Standing", meaning: "ایستادن" }, { word: "Reading", meaning: "خواندن" }, { word: "Writing", meaning: "نوشتن" }, { word: "Sleeping", meaning: "خوابیدن" }, { word: "Running", meaning: "دویدن" }],
    sentences: ["I am reading a book now.", "She is cooking dinner.", "They are not watching TV.", "What are you doing?"],
    speaking: "الان دقیقاً دار چه کار می‌کنی؟ بگو.",
    writing: "تصویری از یک اتاق توصیف کن و بگو هرکس چه کار می‌کند.",
    listening: "به ing در انتهای افعال گوش بده.",
    geminiPrompt: `Day 14: Present Continuous. Ask me what I am doing right now. Have a real-time conversation.`,
    friends: { episode: "S01E07", focus: ["Actions happening now"], phrases: ["I'm doing...", "What are you...?"] },
    checklist: ["ساختار ing", "تفاوت با حال ساده", "۱۰ لغت", "توصیف لحظه‌ای"],
    challenge: "۱۰ کار که اطرافت الان انجام می‌شود بگو."
  },
  {
    day: 15, title: "Mid-Course Review", objectives: ["مرور ۱۴ روز اول"],
    grammar: `<h4>مرور قواعد</h4><div class="grammar-example">To Be → am/is/are, was/were</div><div class="grammar-example">Present Simple → play / plays</div><div class="grammar-example">Past Simple → played / went</div><div class="grammar-example">Future → am going to play</div><div class="grammar-example">Continuous → am playing</div>`,
    vocabulary: [{ word: "Review", meaning: "مرور" }, { word: "Practice", meaning: "تمرین" }, { word: "Improve", meaning: "بهبود دادن" }, { word: "Mistake", meaning: "اشتباه" }, { word: "Correct", meaning: "صحیح" }, { word: "Remember", meaning: "به خاطر داشتن" }, { word: "Forget", meaning: "فراموش کردن" }, { word: "Understand", meaning: "فهمیدن" }, { word: "Explain", meaning: "توضیح دادن" }, { word: "Repeat", meaning: "تکرار کردن" }],
    sentences: ["I need to review grammar.", "She improved a lot.", "Don't forget to practice.", "Can you explain this?"],
    speaking: "هر زمانی که می‌گویم یک جمله بگو.",
    writing: "خلاصه‌ای از چیزهایی که یاد گرفتی بنویس.",
    listening: "یک قسمت Friends را ببین و سعی کن بیشتر بفهمی.",
    geminiPrompt: `Day 15: Mid-Course Review. Test me on Days 1-14. Mix grammar, vocabulary, and conversation.`,
    friends: { episode: "S01E08", focus: ["Full review"], phrases: ["Review all previous phrases"] },
    checklist: ["مرور قواعد", "مرور لغات", "مکالمه آزاد", "نوشتن خلاصه"],
    challenge: "۲ دقیقه بدون مکث درباره هر چیزی که یاد گرفتی حرف بزن."
  },
  {
    day: 16, title: "Comparatives & Superlatives", objectives: ["مقایسه کردن و بهترین را بیان کنی"],
    grammar: `<h4>مقایسه (Comparative): adj + er / more + adj</h4><div class="grammar-example">tall → tall<b>er</b> / beautiful → <b>more</b> beautiful</div><h4>عالی (Superlative): the + adj + est / the most + adj</h4><div class="grammar-example">tall → the tall<b>est</b> / beautiful → the <b>most</b> beautiful</div>`,
    vocabulary: [{ word: "Taller", meaning: "قدبلندتر" }, { word: "Shorter", meaning: "کوتاه‌تر" }, { word: "Bigger", meaning: "بزرگتر" }, { word: "Smaller", meaning: "کوچکتر" }, { word: "More expensive", meaning: "گرانتر" }, { word: "Cheaper", meaning: "ارزانتر" }, { word: "Better", meaning: "بهتر" }, { word: "Worse", meaning: "بدتر" }, { word: "The best", meaning: "بهترین" }, { word: "The worst", meaning: "بدترین" }],
    sentences: ["Ali is taller than me.", "This is the best movie.", "Tehran is bigger than Isfahan.", "She is more beautiful than her sister."],
    speaking: "۳ نفر را با هم مقایسه کن.",
    writing: "شهر محل سکونتت را با شهر دیگر مقایسه کن.",
    listening: "به comparative/superlative در تبلیغات دقت کن.",
    geminiPrompt: `Day 16: Comparatives & Superlatives. Ask me to compare things. Correct better/worse/best/worst.`,
    friends: { episode: "S01E09", focus: ["Comparisons"], phrases: ["That's worse", "The best thing"] },
    checklist: ["قواعد مقایسه", "افعال بی‌قاعده (بهتر/بدتر)", "۱۰ لغت", "مقایسه نوشتاری"],
    challenge: "۵ جفت چیز را مقایسه کن بدون مکث."
  },
  {
    day: 17, title: "Should / Shouldn't (Advice)", objectives: ["نصیحت کردن و توصیه دادن"],
    grammar: `<h4>Should + base verb (باید / توصیه)</h4><div class="grammar-example">You <b>should</b> sleep early.</div><div class="grammar-example">She <b>shouldn't</b> eat fast food.</div><div class="grammar-example"><b>Should</b> I go to the doctor?</div>`,
    vocabulary: [{ word: "Advice", meaning: "نصیحت" }, { word: "Healthy", meaning: "سالم" }, { word: "Exercise", meaning: "ورزش کردن" }, { word: "Relax", meaning: "استراحت کردن" }, { word: "Worry", meaning: "نگران بودن" }, { word: "Smoking", meaning: "سیگار کشیدن" }, { word: "Medicine", meaning: "دارو" }, { word: "Rest", meaning: "استراحت" }, { word: "Drink water", meaning: "آب خوردن" }, { word: "See a doctor", meaning: "پزشک دیدن" }],
    sentences: ["You should drink more water.", "He shouldn't smoke.", "Should I call her?", "They should exercise more."],
    speaking: "به ۳ مشکل رایج نصیحت بده.",
    writing: "۵ نصیحت برای یک دوست که می‌خواهد انگلیسی یاد بگیرد بنویس.",
    listening: "به should در توصیه‌ها دقت کن.",
    geminiPrompt: `Day 17: Should/Shouldn't. Give me problems and ask for advice. Correct my sentences.`,
    friends: { episode: "S01E09", focus: ["Giving advice"], phrases: ["You should...", "Maybe you shouldn't..."] },
    checklist: ["ساختار should", "۱۰ لغت سلامت", "نصیحت دادن", "نوشتن"],
    challenge: "در ۶۰ ثانیه ۱۰ نصیحت مختلف بده."
  },
  {
    day: 18, title: "Present Perfect (Experience)", objectives: ["تجربیات زندگی را بیان کنی"],
    grammar: `<h4>Have/Has + past participle</h4><div class="grammar-example">I <b>have been</b> to Turkey.</div><div class="grammar-example">She <b>has seen</b> this movie.</div><div class="grammar-example"><b>Have</b> you ever <b>eaten</b> sushi?</div>`,
    vocabulary: [{ word: "Ever", meaning: "تا به حال" }, { word: "Never", meaning: "هرگز" }, { word: "Already", meaning: "قبلاً" }, { word: "Yet", meaning: "هنوز" }, { word: "Just", meaning: "همین الان" }, { word: "Been to", meaning: "رفتن به (تجربه)" }, { word: "Seen", meaning: "دیده" }, { word: "Tried", meaning: "امتحان کرده" }, { word: "Traveled", meaning: "سفر کرده" }, { word: "Lived", meaning: "زندگی کرده" }],
    sentences: ["I have never been to Japan.", "She has already finished.", "Have you ever tried sushi?", "They have just arrived."],
    speaking: "۵ جایی که رفتی و ۵ کاری که نکردی بگو.",
    writing: "تجربیات سفرت را بنویس.",
    listening: "به have/has + past participle گوش بده.",
    geminiPrompt: `Day 18: Present Perfect. Ask me about my life experiences using Have you ever...?`,
    friends: { episode: "S01E10", focus: ["Life experiences"], phrases: ["I've never...", "Have you ever...?"] },
    checklist: ["ساختار have+pp", "ever/never", "۱۰ لغت", "تجربیات"],
    challenge: "۲۰ سوال Have you ever... سریع جواب بده."
  },
  {
    day: 19, title: "Modal Verbs (Must / Have to)", objectives: ["الزام و اجبار را بیان کنی"],
    grammar: `<h4>Must / Have to (باید / مجبور بودن)</h4><div class="grammar-example">I <b>must</b> go now. (اجبار درونی)</div><div class="grammar-example">I <b>have to</b> work tomorrow. (اجبار بیرونی)</div>`,
    vocabulary: [{ word: "Must", meaning: "باید (الزام قوی)" }, { word: "Have to", meaning: "باید (مجبور بودن)" }, { word: "Don't have to", meaning: "نیازی نیست" }, { word: "Mustn't", meaning: "نباید (ممنوع)" }, { word: "Rule", meaning: "قانون" }, { word: "Permission", meaning: "اجازه" }, { word: "Obligation", meaning: "الزام" }, { word: "Allowed", meaning: "مجاز" }, { word: "Forbidden", meaning: "ممنوع" }, { word: "Required", meaning: "ضروری" }],
    sentences: ["You must stop here.", "I have to wake up early.", "You don't have to come.", "You mustn't park here."],
    speaking: "۵ قانون مدرسه یا کار را بگو.",
    writing: "قوانین یک مکان عمومی را بنویس.",
    listening: "به must/have to در دستورات دقت کن.",
    geminiPrompt: `Day 19: Must vs Have to. Explain the difference. Test me with situations.`,
    friends: { episode: "S01E10", focus: ["Obligations"], phrases: ["I have to...", "You must..."] },
    checklist: ["تفاوت must/have to", "mustn't/don't have to", "۱۰ لغت", "نوشتن قوانین"],
    challenge: "۱۰ قانون رانندگی با must/have to بگو."
  },
  {
    day: 20, title: "Conditional Type 1", objectives: ["شرط حقیقی (اگر... entonces...) بسازی"],
    grammar: `<h4>If + present simple, will + base verb</h4><div class="grammar-example"><b>If</b> it rains, I <b>will stay</b> home.</div><div class="grammar-example">I <b>will help</b> you <b>if</b> you ask.</div>`,
    vocabulary: [{ word: "If", meaning: "اگر" }, { word: "Rain", meaning: "باران" }, { word: "Snow", meaning: "برف" }, { word: "Win", meaning: "بردن" }, { word: "Lose", meaning: "باختن" }, { word: "Pass", meaning: "قبول شدن" }, { word: "Fail", meaning: "مردود شدن" }, { word: "Happen", meaning: "اتفاق افتادن" }, { word: "Maybe", meaning: "شاید" }, { word: "Depend on", meaning: "بستگی داشتن به" }],
    sentences: ["If I study hard, I will pass.", "If she comes, we will be happy.", "Will you go if it rains?", "If you don't eat, you will be hungry."],
    speaking: "۵ شرط درباره زندگی واقعی‌ات بگو.",
    writing: "۵ شرط بنویس: اگر... тогда...",
    listening: "به if در مکالمات دقت کن.",
    geminiPrompt: `Day 20: First Conditional. Give me situations and ask me to complete with if/will.`,
    friends: { episode: "S01E11", focus: ["If clauses"], phrases: ["If you..., I'll..."] },
    checklist: ["ساختار شرط نوع ۱", "۱۰ لغت", "ساختن شرط", "نوشتن"],
    challenge: "۱۰ شرط مختلف در ۶۰ ثانیه بگو."
  },
  {
    day: 21, title: "Question Words", objectives: ["سوالات کامل با کلمات پرسشی بسازی"],
    grammar: `<h4>کلمات پرسشی</h4><table class="grammar-table"><tr><th>Word</th><th>Usage</th></tr><tr><td class="en-cell">What</td><td>چه چیزی</td></tr><tr><td class="en-cell">Where</td><td>کجا</td></tr><tr><td class="en-cell">When</td><td>کی</td></tr><tr><td class="en-cell">Why</td><td>چرا</td></tr><tr><td class="en-cell">Who</td><td>چه کسی</td></tr><tr><td class="en-cell">How</td><td>چطور</td></tr><tr><td class="en-cell">Which</td><td>کدام</td></tr><tr><td class="en-cell">Whose</td><td>مال کی</td></tr></table>`,
    vocabulary: [{ word: "What", meaning: "چه" }, { word: "Where", meaning: "کجا" }, { word: "When", meaning: "کی" }, { word: "Why", meaning: "چرا" }, { word: "Who", meaning: "چه کسی" }, { word: "How", meaning: "چطور" }, { word: "How much", meaning: "چقدر (قیمت)" }, { word: "How many", meaning: "چند تا" }, { word: "How often", meaning: "چند بار" }, { word: "How long", meaning: "چقدر طول" }],
    sentences: ["What is your name?", "Where do you live?", "Why are you late?", "How much is this?"],
    speaking: "از من ۱۰ سوال مختلف بپرس.",
    writing: "مصاحبه‌ای تصوری بنویس (۱۰ سوال و جواب).",
    listening: "به WH- questions در Friends دقت کن.",
    geminiPrompt: `Day 21: Question Words. Conduct an interview with me using all WH- words.`,
    friends: { episode: "S01E11", focus: ["Interviews & questions"], phrases: ["What do you...?", "How come...?"] },
    checklist: ["تمام WH- words", "ساختار سوال", "۱۰ لغت", "مصاحبه"],
    challenge: "در ۶۰ ثانیه ۱۵ سوال بپرس."
  },
  {
    day: 22, title: "Conjunctions", objectives: ["جملات را با حروف ربط وصل کنی"],
    grammar: `<h4>حروف ربط پرکاربرد</h4><div class="grammar-example">and (و) / but (اما) / or (یا) / because (چون)</div><div class="grammar-example">so (بنابراین) / although (اگرچه) / if (اگر)</div><div class="grammar-example">I like tea <b>but</b> she likes coffee.</div>`,
    vocabulary: [{ word: "And", meaning: "و" }, { word: "But", meaning: "اما" }, { word: "Or", meaning: "یا" }, { word: "Because", meaning: "چون" }, { word: "So", meaning: "بنابراین" }, { word: "Although", meaning: "اگرچه" }, { word: "However", meaning: "با این حال" }, { word: "Also", meaning: "همچنین" }, { word: "Too", meaning: "هم" }, { word: "Either", meaning: "هم (منفی)" }],
    sentences: ["I am tired but happy.", "She studied hard so she passed.", "I like tea and coffee.", "He didn't come because he was sick."],
    speaking: "جملات طولانی‌تر با حروف ربط بگو.",
    writing: "پاراگرافی با حداقل ۶ حرف ربط بنویس.",
    listening: "به but/because/so در مکالمه دقت کن.",
    geminiPrompt: `Day 22: Conjunctions. Ask me to combine sentences using and/but/because/so.`,
    friends: { episode: "S01E12", focus: ["Complex sentences"], phrases: ["...but...", "...because..."] },
    checklist: ["حروف ربط اصلی", "۱۰ لغت", "ترکیب جملات", "نوشتن پاراگراف"],
    challenge: "یک داستان ۱ دقیقه‌ای با حروف ربط مختلف بگو."
  },
  {
    day: 23, title: "Present Perfect vs Past Simple", objectives: ["تفاوت دو زمان گذشته را بدانی"],
    grammar: `<h4>Past Simple: زمان مشخص در گذشته</h4><div class="grammar-example">I <b>saw</b> him <b>yesterday</b>.</div><h4>Present Perfect: نتیجه در حال حاضر / تجربه</h4><div class="grammar-example">I <b>have seen</b> this movie (before).</div>`,
    vocabulary: [{ word: "Already", meaning: "قبلاً" }, { word: "Yet", meaning: "هنوز" }, { word: "Just", meaning: "همین الان" }, { word: "Since", meaning: "از زمان" }, { word: "For", meaning: "به مدت" }, { word: "Recently", meaning: "اخیراً" }, { word: "Lately", meaning: "اخیراً" }, { word: "So far", meaning: "تا الان" }, { word: "Ago", meaning: "پیش" }, { word: "Recently", meaning: "اخیراً" }],
    sentences: ["I have just finished.", "She went to Paris last year.", "Have you eaten yet?", "I lived there for 2 years."],
    speaking: "جملاتی بگو و بگو کدام زمان است.",
    writing: "۱۰ جمله بنویس: ۵ Past Simple + ۵ Present Perfect.",
    listening: "به تفاوت ظریف دو زمان در مکالمه دقت کن.",
    geminiPrompt: `Day 23: Present Perfect vs Past Simple. Mix questions. I must choose the correct tense.`,
    friends: { episode: "S01E12", focus: ["Tense mixing"], phrases: ["I've already...", "I went..."] },
    checklist: ["تفاوت دو زمان", "since/for", "already/yet", "تمرین"],
    challenge: "۲۰ جمله بگو و هر بار زمان درست را انتخاب کن."
  },
  {
    day: 24, title: "Passive Voice (Present & Past)", objectives: "جملات مجهول بسازی",
    grammar: `<h4>مجهول حال: am/is/are + past participle</h4><div class="grammar-example">English <b>is spoken</b> here.</div><h4>مجهول گذشته: was/were + past participle</h4><div class="grammar-example">The letter <b>was sent</b> yesterday.</div>`,
    vocabulary: [{ word: "Built", meaning: "ساخته شد" }, { word: "Written", meaning: "نوشته شد" }, { word: "Spoken", meaning: "گفته شد" }, { word: "Made", meaning: "ساخته شد" }, { word: "Sent", meaning: "فرستاده شد" }, { word: "Found", meaning: "پیدا شد" }, { word: "Known", meaning: "شناخته شده" }, { word: "Broken", meaning: "شکسته شده" }, { word: "Opened", meaning: "باز شد" }, { word: "Closed", meaning: "بسته شد" }],
    sentences: ["This car was made in Germany.", "English is spoken worldwide.", "The door was opened.", "These books are written in Persian."],
    speaking: "۵ جمله معلوم را به مجهول تبدیل کن.",
    writing: "توصیف یک مکان با جملات مجهول بنویس.",
    listening: "به مجهول در اخبار دقت کن.",
    geminiPrompt: `Day 24: Passive Voice. Give me active sentences to convert to passive.`,
    friends: { episode: "S01E13", focus: ["Passive in context"], phrases: ["It was done", "It is known"] },
    checklist: ["ساختار مجهول", "تبدیل معلوم به مجهول", "۱۰ لغت", "نوشتن"],
    challenge: "۱۰ جمله معلوم را فوری به مجهول تبدیل کن."
  },
  {
    day: 25, title: "Reported Speech", objectives: ["حرف دیگران را نقل کنی"],
    grammar: `<h4>نقل قول غیرمستقیم</h4><div class="grammar-example">He said, "I am tired." → He said (that) he <b>was</b> tired.</div><div class="grammar-example">She said, "I will come." → She said she <b>would</b> come.</div>`,
    vocabulary: [{ word: "Said", meaning: "گفت" }, { word: "Told", meaning: "به کسی گفت" }, { word: "Asked", meaning: "پرسید" }, { word: "Explained", meaning: "توضیح داد" }, { word: "Promised", meaning: "قول داد" }, { word: "Denied", meaning: "انکار کرد" }, { word: "Admitted", meaning: "اعتراف کرد" }, { word: "Suggested", meaning: "پیشنهاد داد" }, { word: "Agreed", meaning: "موافقت کرد" }, { word: "Complained", meaning: "شکایت کرد" }],
    sentences: ["She said she was happy.", "He told me to come.", "They asked where I lived.", "She said she would help."],
    speaking: "حرفی که دوستت دیروز زد را نقل کن.",
    writing: "مکالمه‌ای بنویس و سپس آن را به reported speech تبدیل کن.",
    listening: "به said that در داستان‌ها دقت کن.",
    geminiPrompt: `Day 25: Reported Speech. Give me direct quotes to convert to reported speech.`,
    friends: { episode: "S01E14", focus: ["Reporting what others said"], phrases: ["He said that...", "She told me..."] },
    checklist: ["قواعد تغییر زمان", "said vs told", "۱۰ لغت", "تبدیل جملات"],
    challenge: "۱۰ جمله مستقیم را به غیرمستقیم تبدیل کن."
  },
  {
    day: 26, title: "Used to / Didn't use to", objectives: ["عادت‌های گذشته را بیان کنی"],
    grammar: `<h4>Used to + base verb (عادت گذشته که دیگر نیست)</h4><div class="grammar-example">I <b>used to</b> play football. (دیگر بازی نمی‌کنم)</div><div class="grammar-example">She <b>didn't use to</b> like coffee.</div>`,
    vocabulary: [{ word: "Childhood", meaning: "کودکی" }, { word: "Memory", meaning: "خاطره" }, { word: "Changed", meaning: "تغییر کرد" }, { word: "Different", meaning: "متفاوت" }, { word: "Grew up", meaning: "بزرگ شد" }, { word: "Young", meaning: "جوان" }, { word: "Old", meaning: "پیر" }, { word: "Past", meaning: "گذشته" }, { word: "Habit", meaning: "عادت" }, { word: "Anymore", meaning: "دیگر نه" }],
    sentences: ["I used to ride a bike.", "She didn't use to wear glasses.", "Did you use to live here?", "We used to be best friends."],
    speaking: "۳ چیزی که در کودکی عادت داشتی و دیگر نداری بگو.",
    writing: "مقایسه خودت در کودکی و الان بنویس.",
    listening: "به used to در خاطره‌گویی دقت کن.",
    geminiPrompt: `Day 26: Used to. Ask me about my childhood habits. Make sure I don't confuse it with Past Simple.`,
    friends: { episode: "S01E14", focus: ["Childhood memories"], phrases: ["I used to...", "We didn't use to..."] },
    checklist: ["ساختار used to", "تفاوت با past simple", "۱۰ لغت", "خاطره‌نویسی"],
    challenge: "در ۶۰ ثانیه ۱۰ عادت کودکی‌ات را بگو."
  },
  {
    day: 27, title: "I Wish / If Only", objectives: ["آرزوها و حسرت‌ها را بیان کنی"],
    grammar: `<h4>I wish + past simple (آرزوی حال)</h4><div class="grammar-example">I wish I <b>was</b> taller.</div><div class="grammar-example">I wish I <b>could</b> speak French.</div><div class="grammar-example">I wish I <b>had</b> more money.</div>`,
    vocabulary: [{ word: "Wish", meaning: "آرزو کردن" }, { word: "Hope", meaning: "امید داشتن" }, { word: "Dream", meaning: "رویا" }, { word: "Goal", meaning: "هدف" }, { word: "Future", meaning: "آینده" }, { word: "Chance", meaning: "شانس" }, { word: "Impossible", meaning: "غیرممکن" }, { word: "Possible", meaning: "ممکن" }, { word: "Reality", meaning: "واقعیت" }, { word: "Imagine", meaning: "تصور کردن" }],
    sentences: ["I wish I spoke English perfectly.", "I wish it was Friday.", "She wishes she had a car.", "I wish I could travel."],
    speaking: "۵ آرزوی واقعی‌ات را بگو.",
    writing: "اگر ۳ آرزوت برآورده شود چه می‌کنی؟ بنویس.",
    listening: "به I wish در آهنگ‌ها و فیلم‌ها دقت کن.",
    geminiPrompt: `Day 27: I Wish / If Only. Ask me about my wishes. Correct the tense after wish.`,
    friends: { episode: "S01E15", focus: ["Wishes & dreams"], phrases: ["I wish...", "If only I..."] },
    checklist: ["ساختار wish", "تفاوت wish/hope", "۱۰ لغت", "نوشتن آرزوها"],
    challenge: "۱۰ آرزو با I wish در ۶۰ ثانیه بگو."
  },
  {
    day: 28, title: "Phrasal Verbs (Common)", objectives: ["افعال دو قسمتی رایج را یاد بگیری"],
    grammar: `<h4>Phrasal Verb = verb + particle</h4><div class="grammar-example">wake <b>up</b> = بیدار شدن</div><div class="grammar-example">turn <b>on</b> = روشن کردن</div><div class="grammar-example">give <b>up</b> = تسلیم شدن</div>`,
    vocabulary: [{ word: "Wake up", meaning: "بیدار شدن" }, { word: "Turn on/off", meaning: "روشن/خاموش کردن" }, { word: "Give up", meaning: "تسلیم شدن" }, { word: "Find out", meaning: "فهمیدن" }, { word: "Look up", meaning: "جستجو کردن" }, { word: "Take off", meaning: "درآوردن / پرواز" }, { word: "Put on", meaning: "پوشیدن" }, { word: "Go on", meaning: "ادامه دادن" }, { word: "Come back", meaning: "برگشتن" }, { word: "Sit down", meaning: "نشستن" }],
    sentences: ["Wake up! It's late.", "Turn on the light.", "Don't give up!", "I found out the truth."],
    speaking: "۱۰ جمله با phrasal verbs بگو.",
    writing: "داستان کوتاهی با ۸ phrasal verb بنویس.",
    listening: "Phrasal verbs در مکالمه خیلی رایج هستند.",
    geminiPrompt: `Day 28: Phrasal Verbs. Teach me 15 common phrasal verbs with examples. Test me.`,
    friends: { episode: "S01E15", focus: ["Phrasal verbs in speech"], phrases: ["Give up", "Find out", "Wake up"] },
    checklist: ["حفظ ۱۰ phrasal verb", "معنی در contex", "مکالمه", "نوشتن داستان"],
    challenge: "در ۶۰ ثانیه ۱۵ phrasal verb با معنی بگو."
  },
  {
    day: 29, title: "Common Idioms", objectives: ["اصطلاحات نیتیو را بفهمی و استفاده کنی"],
    grammar: `<h4>Idioms: معانی غیرمستقیم و فرهنگی</h4><div class="grammar-example"><b>Break the ice</b> = شروع مکالمه</div><div class="grammar-example"><b>Piece of cake</b> = خیلی آسان</div><div class="grammar-example"><b>Under the weather</b> = حالم بد است</div>`,
    vocabulary: [{ word: "Break the ice", meaning: "شروع صحبت" }, { word: "Piece of cake", meaning: "خیلی آسان" }, { word: "Hit the books", meaning: "درس خواندن جدی" }, { word: "Under the weather", meaning: "حال بد" }, { word: "Big deal", meaning: "مهم" }, { word: "Once in a blue moon", meaning: "خیلی کم" }, { word: "Keep an eye on", meaning: "مراقب بودن" }, { word: "Hang out", meaning: "وقت گذراندن" }, { word: "No problem", meaning: "مشکلی نیست" }, { word: "All right", meaning: "اوکی" }],
    sentences: ["This test is a piece of cake.", "I feel under the weather.", "We hang out every weekend.", "It's not a big deal."],
    speaking: "۵ اصطلاح را در جمله استفاده کن.",
    writing: "۱۰ جمله با اصطلاحات مختلف بنویس.",
    listening: "سعی کن idioms را در Friends شناسایی کنی.",
    geminiPrompt: `Day 29: Common Idioms. Teach me 15 idioms with meaning and example. Use them in roleplay.`,
    friends: { episode: "S01E16", focus: ["Idioms & slang"], phrases: ["Piece of cake", "Break the ice", "Hang out"] },
    checklist: ["حفظ ۱۰ idiom", "استفاده در جمله", "پیدا کردن در Friends", "نوشتن"],
    challenge: "یک مکالمه ۱ دقیقه‌ای با ۱۰ idiom بگو."
  },
  {
    day: 30, title: "Final Exam & Graduation", objectives: ["جمع‌بندی نهایی و ارزیابی"],
    grammar: `<h4>🧪 آزمون نهایی</h4><p>Part 1: یک جمله با هر زمان بساز (Present, Past, Future, Perfect, Continuous)</p><p>Part 2: به ۵ سوال شخصی جواب بده</p><p>Part 3: پاراگراف ۱۰ جمله‌ای درباره زندگیت بنویس</p><p>Part 4: ۵ لغت تصادفی در جمله استفاده کن</p><p>Part 5: مکالمه شبیه‌سازی‌شده با یک خارجی</p>`,
    vocabulary: [{ word: "Graduate", meaning: "فارغ‌التحصیل شدن" }, { word: "Achievement", meaning: "دستاورد" }, { word: "Progress", meaning: "پیشرفت" }, { word: "Confidence", meaning: "اعتماد به نفس" }, { word: "Fluency", meaning: "روانی" }, { word: "Vocabulary", meaning: "واژگان" }, { word: "Grammar", meaning: "گرامر" }, { word: "Pronunciation", meaning: "تلفظ" }, { word: "Continue", meaning: "ادامه دادن" }, { word: "Improve", meaning: "بهبود دادن" }],
    sentences: ["I have completed 30 days of English.", "My English has improved a lot.", "I can now have basic conversations.", "I will continue learning every day."],
    speaking: "خودت را ارزیابی کن: چه چیزی یاد گرفتی؟",
    writing: "نامه‌ای به خودت بنویس: از روز اول تا امروز چه تغییری کردی؟",
    listening: "یک قسمت کامل Friends ببین و سعی کن ۸۰٪ بفهمی.",
    geminiPrompt: `Day 30: FINAL EXAM. Test me on everything from Day 1-30. Grammar, vocabulary, speaking, writing, conversation. Be strict. Give me a score out of 100. Tell my level and weaknesses.`,
    friends: { episode: "S01E16", focus: ["Full comprehension"], phrases: ["Understand everything", "Natural conversation"] },
    checklist: ["آزمون گرامر", "مکالمه", "نوشتن", "شنیدار کامل", "ارزیابی نهایی"],
    challenge: "بدون مکث ۲ دقیقه درباره ۳۰ روز یادگیریت حرف بزن. 🎓"
  }
];


// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
// Default state structure for a fresh user
const DEFAULT_STATE = {
  currentDay: 1,
  xp: 0,
  streak: 0,
  maxStreak: 0,
  completedDays: [],
  unlockedDays: [1],
  notes: {}, // { "1": "note text", "2": "" }
  checklistState: {}, // { "1": [true, false, true...], "2": [...] }
  theme: 'dark'
};

let appState = {};

// Load state from localStorage or initialize
function loadState() {
  try {
    const saved = localStorage.getItem('englishMasterState');
    if (saved) {
      appState = { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } else {
      appState = { ...DEFAULT_STATE };
    }
  } catch (e) {
    console.error("Failed to load state:", e);
    appState = { ...DEFAULT_STATE };
  }
}

// Save current state to localStorage
function saveState() {
  try {
    localStorage.setItem('englishMasterState', JSON.stringify(appState));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}


// ==========================================
// 3. DOM REFERENCES
// ==========================================
// Cache frequently used DOM elements
const DOM = {
  currentDayLabel: document.getElementById('current-day-label'),
  progressFill: document.getElementById('main-progress-fill'),
  progressPercent: document.getElementById('main-progress-percent'),
  xpValue: document.getElementById('xp-value'),
  streakValue: document.getElementById('streak-value'),
  
  // Settings
  settingsToggle: document.getElementById('settings-toggle-btn'),
  settingsClose: document.getElementById('settings-close-btn'),
  settingsOverlay: document.getElementById('settings-overlay'),
  settingsPanel: document.getElementById('settings-panel'),
  themeToggle: document.getElementById('theme-toggle-btn'),
  themeText: document.getElementById('theme-toggle-text'),
  resetBtn: document.getElementById('reset-progress-btn'),
  exportBtn: document.getElementById('export-progress-btn'),
  importBtn: document.getElementById('import-progress-btn'),
  importInput: document.getElementById('import-file-input'),
  statCompleted: document.getElementById('stat-completed'),
  statTotalXp: document.getElementById('stat-total-xp'),
  statMaxStreak: document.getElementById('stat-max-streak'),
  statNotes: document.getElementById('stat-notes'),

  // Tabs
  tabBar: document.getElementById('tab-bar'),
  
  // Dashboard
  heroDayBadge: document.getElementById('hero-day-badge'),
  heroTitle: document.getElementById('hero-title'),
  heroSubtitle: document.getElementById('hero-subtitle'),
  heroObjectives: document.getElementById('hero-objectives'),
  completeDayBtn: document.getElementById('complete-day-btn'),
  grammarContent: document.getElementById('grammar-content'),
  vocabGrid: document.getElementById('vocab-grid'),
  sentencesList: document.getElementById('sentences-list'),
  speakingContent: document.getElementById('speaking-content'),
  writingContent: document.getElementById('writing-content'),
  listeningContent: document.getElementById('listening-content'),
  geminiPromptText: document.getElementById('gemini-prompt-text'),
  copyGeminiBtn: document.getElementById('copy-gemini-btn'),
  friendsContent: document.getElementById('friends-content'),
  dailyChecklist: document.getElementById('daily-checklist'),
  challengeContent: document.getElementById('challenge-content'),
  prevDayBtn: document.getElementById('prev-day-btn'),
  nextDayBtn: document.getElementById('next-day-btn'),

  // Planner
  plannerGrid: document.getElementById('planner-grid'),

  // Notes
  notesDaySelect: document.getElementById('notes-day-select'),
  notesTextarea: document.getElementById('notes-textarea'),
  notesCharCount: document.getElementById('notes-char-count'),
  notesSaveStatus: document.getElementById('notes-save-status'),
  saveNotesBtn: document.getElementById('save-notes-btn'),
  notesList: document.getElementById('notes-list'),

  // Modals & Toasts
  toastContainer: document.getElementById('toast-container'),
  confirmOverlay: document.getElementById('confirm-modal-overlay'),
  confirmMessage: document.getElementById('confirm-modal-message'),
  confirmYes: document.getElementById('confirm-modal-yes'),
  confirmNo: document.getElementById('confirm-modal-no'),
  
  // XP Popup
  xpPopup: document.getElementById('xp-popup'),
  xpPopupText: document.getElementById('xp-popup-text')
};


// ==========================================
// 4. UTILITY FUNCTIONS
// ==========================================

// Convert English digits to Persian
function toPersianNum(num) {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return String(num).replace(/[0-9]/g, d => persianDigits[parseInt(d)]);
}

// Show a toast notification (auto-dismisses)
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  DOM.toastContainer.appendChild(toast);
  // Remove from DOM after animation completes
  setTimeout(() => toast.remove(), 3000);
}

// Show the animated XP gain popup
function showXpPopup(amount) {
  DOM.xpPopupText.textContent = `+${toPersianNum(amount)} XP`;
  DOM.xpPopup.classList.remove('active');
  // Force reflow to restart animation
  void DOM.xpPopup.offsetWidth;
  DOM.xpPopup.classList.add('active');
  setTimeout(() => DOM.xpPopup.classList.remove('active'), 1300);
}

// Show a confirmation modal, returns a Promise
function showConfirm(message) {
  return new Promise((resolve) => {
    DOM.confirmMessage.textContent = message;
    DOM.confirmOverlay.classList.add('active');
    
    const cleanup = (result) => {
      DOM.confirmOverlay.classList.remove('active');
      DOM.confirmYes.removeEventListener('click', onYes);
      DOM.confirmNo.removeEventListener('click', onNo);
      resolve(result);
    };
    const onYes = () => cleanup(true);
    const onNo = () => cleanup(false);
    
    DOM.confirmYes.addEventListener('click', onYes);
    DOM.confirmNo.addEventListener('click', onNo);
  });
}


// ==========================================
// 5. UI UPDATE FUNCTIONS
// ==========================================

// Update all progress indicators in the header
function updateHeader() {
  const day = appState.currentDay;
  DOM.currentDayLabel.textContent = `روز ${toPersianNum(day)}`;
  DOM.xpValue.textContent = toPersianNum(appState.xp);
  DOM.streakValue.textContent = toPersianNum(appState.streak);

  // Calculate progress percentage
  const percent = Math.round((appState.completedDays.length / 30) * 100);
  DOM.progressFill.style.width = `${percent}%`;
  DOM.progressPercent.textContent = `${toPersianNum(percent)}٪`;
}

// Render the full lesson content for a specific day
function renderLesson(dayNum) {
  const lesson = lessons[dayNum - 1];
  if (!lesson) return;

  // Hero Card
  DOM.heroDayBadge.textContent = `روز ${toPersianNum(dayNum)}`;
  DOM.heroTitle.textContent = lesson.title;
  DOM.heroTitle.classList.toggle('en-title', /[a-zA-Z]/.test(lesson.title));
  DOM.heroSubtitle.textContent = `سطح A1+ – درس ${toPersianNum(dayNum)} از ۳۰`;

  // Objectives
  DOM.heroObjectives.innerHTML = '';
  if (lesson.objectives) {
    lesson.objectives.forEach(obj => {
      const li = document.createElement('li');
      li.textContent = obj;
      DOM.heroObjectives.appendChild(li);
    });
  }

  // Complete button state
  const isCompleted = appState.completedDays.includes(dayNum);
  DOM.completeDayBtn.classList.toggle('completed', isCompleted);
  DOM.completeDayBtn.innerHTML = isCompleted 
    ? '<span class="check-icon">✓</span><span>تکمیل شده</span>'
    : '<span class="check-icon">✓</span><span>تکمیل این روز</span>';

  // Grammar
  DOM.grammarContent.innerHTML = lesson.grammar || '<p>امروز گرامر خاصی نداریم.</p>';

  // Vocabulary
  DOM.vocabGrid.innerHTML = '';
  if (lesson.vocabulary) {
    lesson.vocabulary.forEach(v => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.innerHTML = `<span class="vocab-word">${v.word}</span><span class="vocab-meaning">${v.meaning}</span>`;
      DOM.vocabGrid.appendChild(card);
    });
  }

  // Sentences
  DOM.sentencesList.innerHTML = '';
  if (lesson.sentences) {
    lesson.sentences.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      DOM.sentencesList.appendChild(li);
    });
  }

  // Speaking
  DOM.speakingContent.innerHTML = `<p>${lesson.speaking || ''}</p>`;

  // Writing
  DOM.writingContent.innerHTML = `<div class="writing-task">${lesson.writing || ''}</div>`;

  // Listening
  DOM.listeningContent.innerHTML = `<p>${lesson.listening || ''}</p>`;

  // Gemini Prompt
  DOM.geminiPromptText.textContent = lesson.geminiPrompt || '';
  DOM.copyGeminiBtn.classList.remove('copied');
  DOM.copyGeminiBtn.innerHTML = '<span>📋</span><span>کپی پرامپت</span>';

  // Friends
  DOM.friendsContent.innerHTML = '';
  if (lesson.friends) {
    let html = `<span class="friends-episode">📺 ${lesson.friends.episode}</span>`;
    if (lesson.friends.focus && lesson.friends.focus.length) {
      html += '<div class="friends-focus-list">';
      lesson.friends.focus.forEach(f => {
        html += `<li>${f}</li>`;
      });
      html += '</div>';
    }
    if (lesson.friends.phrases && lesson.friends.phrases.length) {
      html += '<div class="friends-phrases">';
      lesson.friends.phrases.forEach(p => {
        html += `<span class="friends-phrase-tag">${p}</span>`;
      });
      html += '</div>';
    }
    DOM.friendsContent.innerHTML = html;
  }

  // Checklist
  DOM.dailyChecklist.innerHTML = '';
  if (lesson.checklist) {
    const savedChecks = appState.checklistState[dayNum] || new Array(lesson.checklist.length).fill(false);
    lesson.checklist.forEach((item, i) => {
      const li = document.createElement('li');
      li.className = `checklist-item${savedChecks[i] ? ' checked' : ''}`;
      li.innerHTML = `<span class="checklist-box">${savedChecks[i] ? '✓' : ''}</span><span class="checklist-text">${item}</span>`;
      li.addEventListener('click', () => toggleChecklistItem(dayNum, i, li));
      DOM.dailyChecklist.appendChild(li);
    });
  }

  // Challenge
  DOM.challengeContent.innerHTML = '';
  if (lesson.challenge) {
    DOM.challengeContent.innerHTML = `<p>چالش نهایی این روز:</p><div class="challenge-text">${lesson.challenge}</div>`;
  }

  // Day navigation buttons
  DOM.prevDayBtn.disabled = dayNum <= 1;
  DOM.nextDayBtn.disabled = dayNum >= 30;

  // Scroll to top of dashboard smoothly
  document.getElementById('tab-dashboard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Toggle a checklist item and save state
function toggleChecklistItem(dayNum, index, element) {
  if (!appState.checklistState[dayNum]) {
    const lesson = lessons[dayNum - 1];
    appState.checklistState[dayNum] = new Array(lesson.checklist.length).fill(false);
  }
  
  // Flip the boolean
  appState.checklistState[dayNum][index] = !appState.checklistState[dayNum][index];
  const isChecked = appState.checklistState[dayNum][index];
  
  element.classList.toggle('checked', isChecked);
  element.querySelector('.checklist-box').textContent = isChecked ? '✓' : '';
  
  // Small XP reward for checking items
  if (isChecked) {
    addXP(2);
  }
  
  saveState();
}

// Render the 30-day planner grid
function renderPlanner() {
  DOM.plannerGrid.innerHTML = '';
  for (let i = 1; i <= 30; i++) {
    const card = document.createElement('div');
    const isUnlocked = appState.unlockedDays.includes(i);
    const isCompleted = appState.completedDays.includes(i);
    const isCurrent = i === appState.currentDay;

    let classes = 'day-card';
    if (!isUnlocked) classes += ' locked';
    else if (isCompleted) classes += ' completed';
    else if (isCurrent) classes += ' current';

    card.className = classes;
    card.innerHTML = `
      <span class="day-card-num">${toPersianNum(i)}</span>
      <span class="day-card-label">${isCompleted ? 'تکمیل' : isUnlocked ? 'آزاد' : 'قفل'}</span>
    `;

    if (isUnlocked) {
      card.addEventListener('click', () => {
        appState.currentDay = i;
        saveState();
        updateHeader();
        renderLesson(i);
        switchTab('dashboard');
      });
    }

    DOM.plannerGrid.appendChild(card);
  }
}

// Render the notes section
function renderNotes() {
  // Populate day selector
  DOM.notesDaySelect.innerHTML = '';
  for (let i = 1; i <= 30; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `روز ${toPersianNum(i)}`;
    if (i === appState.currentDay) opt.selected = true;
    DOM.notesDaySelect.appendChild(opt);
  }

  loadNoteForDay(appState.currentDay);
  renderNotesList();
}

// Load a specific day's note into the textarea
function loadNoteForDay(dayNum) {
  const text = appState.notes[dayNum] || '';
  DOM.notesTextarea.value = text;
  DOM.notesCharCount.textContent = `${toPersianNum(text.length)} کاراکتر`;
  DOM.notesSaveStatus.classList.remove('visible');
}

// Render the list of saved notes
function renderNotesList() {
  DOM.notesList.innerHTML = '';
  const daysWithNotes = Object.keys(appState.notes).filter(d => appState.notes[d].trim() !== '');
  
  if (daysWithNotes.length === 0) {
    DOM.notesList.innerHTML = '<li class="notes-empty">هنوز یادداشتی ننوشتی.</li>';
    return;
  }

  daysWithNotes.sort((a, b) => a - b).forEach(day => {
    const li = document.createElement('li');
    li.className = 'notes-list-item';
    li.innerHTML = `
      <span class="notes-list-day">روز ${toPersianNum(day)}</span>
      <span class="notes-list-preview">${appState.notes[day].substring(0, 50)}...</span>
    `;
    li.addEventListener('click', () => {
      DOM.notesDaySelect.value = day;
      loadNoteForDay(parseInt(day));
    });
    DOM.notesList.appendChild(li);
  });
}


// ==========================================
// 6. CORE ACTIONS
// ==========================================

// Add XP and animate
function addXP(amount) {
  appState.xp += amount;
  saveState();
  updateHeader();
  showXpPopup(amount);
}

// Complete a day: mark done, award XP, unlock next day
async function completeDay(dayNum) {
  if (appState.completedDays.includes(dayNum)) return;

  appState.completedDays.push(dayNum);
  
  // Award XP for completing the day
  addXP(50);
  
  // Unlock next day if not already
  const nextDay = dayNum + 1;
  if (nextDay <= 30 && !appState.unlockedDays.includes(nextDay)) {
    appState.unlockedDays.push(nextDay);
  }

  // Update streak logic
  // A simple streak: increment if consecutive days are completed
  appState.streak = appState.completedDays.length; // Simplified: total completed days
  if (appState.streak > appState.maxStreak) {
    appState.maxStreak = appState.streak;
  }

  saveState();
  updateHeader();
  renderLesson(dayNum);
  renderPlanner();
  updateSettingsStats();

  showToast(`روز ${toPersianNum(dayNum)} تکمیل شد! +۵۰ XP`, 'success');

  // Auto-switch to next day after a short delay
  if (nextDay <= 30) {
    setTimeout(() => {
      appState.currentDay = nextDay;
      saveState();
      updateHeader();
      renderLesson(nextDay);
      renderPlanner();
    }, 1000);
  }
}

// Switch between tabs
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.toggle('active', section.id === `tab-${tabName}`);
  });
  
  // Refresh content when switching tabs
  if (tabName === 'planner') renderPlanner();
  if (tabName === 'notes') renderNotes();
}

// Toggle theme between dark and light
function toggleTheme() {
  if (appState.theme === 'dark') {
    appState.theme = 'light';
    document.body.classList.add('light');
    DOM.themeText.textContent = 'روشن';
  } else {
    appState.theme = 'dark';
    document.body.classList.remove('light');
    DOM.themeText.textContent = 'تاریک';
  }
  saveState();
}

// Apply saved theme on load
function applyTheme() {
  if (appState.theme === 'light') {
    document.body.classList.add('light');
    DOM.themeText.textContent = 'روشن';
  } else {
    document.body.classList.remove('light');
    DOM.themeText.textContent = 'تاریک';
  }
}

// Reset all progress
async function resetProgress() {
  const confirmed = await showConfirm('آیا مطمئنی؟ تمام پیشرفت و یادداشت‌هایت پاک خواهد شد.');
  if (!confirmed) return;
  
  appState = { ...DEFAULT_STATE };
  saveState();
  updateHeader();
  renderLesson(1);
  renderPlanner();
  renderNotes();
  updateSettingsStats();
  applyTheme();
  showToast('پیشرفت بازنشانی شد.', 'error');
}

// Export progress as JSON file
function exportProgress() {
  const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'english-master-progress.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('فایل پیشرفت دانلود شد.', 'success');
}

// Import progress from JSON file
function importProgress(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      // Basic validation
      if (data.currentDay && data.completedDays) {
        appState = { ...DEFAULT_STATE, ...data };
        saveState();
        updateHeader();
        renderLesson(appState.currentDay);
        renderPlanner();
        renderNotes();
        updateSettingsStats();
        applyTheme();
        showToast('پیشرفت با موفقیت بارگذاری شد.', 'success');
      } else {
        showToast('فایل نامعتبر است.', 'error');
      }
    } catch (err) {
      showToast('خطا در خواندن فایل.', 'error');
    }
  };
  reader.readAsText(file);
}

// Update stats in settings panel
function updateSettingsStats() {
  DOM.statCompleted.textContent = toPersianNum(appState.completedDays.length);
  DOM.statTotalXp.textContent = toPersianNum(appState.xp);
  DOM.statMaxStreak.textContent = toPersianNum(appState.maxStreak);
  const notesCount = Object.values(appState.notes).filter(n => n && n.trim() !== '').length;
  DOM.statNotes.textContent = toPersianNum(notesCount);
}


// ==========================================
// 7. COLLAPSIBLE SECTIONS
// ==========================================
function initCollapsibles() {
  document.querySelectorAll('.collapse-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering section header click
      const targetId = btn.dataset.target;
      const body = document.getElementById(targetId);
      if (body) {
        body.classList.toggle('collapsed');
        btn.classList.toggle('collapsed');
      }
    });
  });
}


// ==========================================
// 8. EVENT LISTENERS
// ==========================================
function initEventListeners() {
  // Tab navigation
  DOM.tabBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (btn) switchTab(btn.dataset.tab);
  });

  // Settings panel toggle
  DOM.settingsToggle.addEventListener('click', () => {
    DOM.settingsOverlay.classList.add('active');
    DOM.settingsPanel.classList.add('active');
    updateSettingsStats();
  });

  const closeSettings = () => {
    DOM.settingsOverlay.classList.remove('active');
    DOM.settingsPanel.classList.remove('active');
  };
  DOM.settingsClose.addEventListener('click', closeSettings);
  DOM.settingsOverlay.addEventListener('click', closeSettings);

  // Theme toggle
  DOM.themeToggle.addEventListener('click', toggleTheme);

  // Settings actions
  DOM.resetBtn.addEventListener('click', resetProgress);
  DOM.exportBtn.addEventListener('click', exportProgress);
  DOM.importBtn.addEventListener('click', () => DOM.importInput.click());
  DOM.importInput.addEventListener('change', (e) => {
    if (e.target.files[0]) importProgress(e.target.files[0]);
    e.target.value = ''; // Reset input
  });

  // Complete day button
  DOM.completeDayBtn.addEventListener('click', () => completeDay(appState.currentDay));

  // Copy Gemini prompt
  DOM.copyGeminiBtn.addEventListener('click', async () => {
    const text = DOM.geminiPromptText.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      DOM.copyGeminiBtn.classList.add('copied');
      DOM.copyGeminiBtn.innerHTML = '<span>✅</span><span>کپی شد!</span>';
      setTimeout(() => {
        DOM.copyGeminiBtn.classList.remove('copied');
        DOM.copyGeminiBtn.innerHTML = '<span>📋</span><span>کپی پرامپت</span>';
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('پرامپت کپی شد!', 'success');
    }
  });

  // Day navigation
  DOM.prevDayBtn.addEventListener('click', () => {
    if (appState.currentDay > 1) {
      appState.currentDay--;
      saveState();
      updateHeader();
      renderLesson(appState.currentDay);
    }
  });

  DOM.nextDayBtn.addEventListener('click', () => {
    if (appState.currentDay < 30) {
      appState.currentDay++;
      saveState();
      updateHeader();
      renderLesson(appState.currentDay);
    }
  });

  // Notes
  DOM.notesDaySelect.addEventListener('change', (e) => {
    loadNoteForDay(parseInt(e.target.value));
  });

  DOM.notesTextarea.addEventListener('input', () => {
    DOM.notesCharCount.textContent = `${toPersianNum(DOM.notesTextarea.value.length)} کاراکتر`;
    DOM.notesSaveStatus.classList.remove('visible');
  });

  DOM.saveNotesBtn.addEventListener('click', () => {
    const dayNum = parseInt(DOM.notesDaySelect.value);
    appState.notes[dayNum] = DOM.notesTextarea.value;
    saveState();
    DOM.notesSaveStatus.textContent = '✓ ذخیره شد!';
    DOM.notesSaveStatus.classList.add('visible');
    renderNotesList();
    showToast('یادداشت ذخیره شد.', 'success');
    setTimeout(() => DOM.notesSaveStatus.classList.remove('visible'), 2500);
  });
}


// ==========================================
// 9. INITIALIZATION
// ==========================================
function init() {
  // Load saved data
  loadState();
  
  // Apply theme
  applyTheme();
  
  // Render initial UI
  updateHeader();
  renderLesson(appState.currentDay);
  renderPlanner();
  renderNotes();
  
  // Setup interactions
  initCollapsibles();
  initEventListeners();
  
  console.log(`English Master initialized. Day ${appState.currentDay}, XP: ${appState.xp}`);
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
