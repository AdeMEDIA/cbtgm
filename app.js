// ============================================
// YOUR QUESTION BANK
// ============================================
const questionBank = [
  {
    "question": "Which note-making system encourages questions in the cue column to reinforce learning?",
    "options": ["Cornell Method", "Mind Mapping", "Outline Method", "Listing Method"],
    "answer": 0
  },
  {
    "question": "What is the difference between Intensive and Extensive Reading?",
    "options": ["Intensive focuses on detail; Extensive focuses on general understanding", "Intensive is faster; Extensive is slower", "Intensive is for pleasure; Extensive is for exams", "They are the same"],
    "answer": 0
  },
  {
    "question": "Which type of listening evaluates the logic and reasoning of the message?",
    "options": ["Critical Listening", "Discriminative Listening", "Appreciative Listening", "Informational Listening"],
    "answer": 0
  },
  {
    "question": "Which reading habit is considered inefficient when the reader moves their head instead of eyes?",
    "options": ["Vocalization", "Pointing", "Head Movement", "Internal Voicing"],
    "answer": 2
  },
  {
    "question": "Which technique helps the reader mentally organize information into categories for easier recall?",
    "options": ["Clustering", "Highlighting", "Underlining", "Listing"],
    "answer": 0
  },
  {
    "question": "Which listening type focuses on enjoying sounds, music, or the speaker’s delivery without analyzing content?",
    "options": ["Appreciative Listening", "Discriminative Listening", "Critical Listening", "Transactional Listening"],
    "answer": 0
  },
  {
    "question": "In the communication process, what does 'Semantic Noise' refer to?",
    "options": ["Misunderstanding due to ambiguous words or language", "Technical failure in the communication channel", "External physical sounds", "Emotional state of the listener"],
    "answer": 0
  },
  {
    "question": "Which note-making method uses diagrams, lines, and symbols to show relationships between ideas?",
    "options": ["Mind Mapping", "Outline Method", "Listing", "Highlighting"],
    "answer": 0
  },
  {
    "question": "Which reading skill helps the reader find specific information like dates, names, or numbers quickly?",
    "options": ["Skimming", "Scanning", "Intensive Reading", "Extensive Reading"],
    "answer": 1
  },
  {
    "question": "Which note-taking approach is best for hierarchical organization of ideas?",
    "options": ["Outline Method", "Mind Mapping", "Listing", "Cornell Method"],
    "answer": 0
  },
  {
    "question": "Which barrier to listening occurs when the listener is distracted by their own thoughts?",
    "options": ["Psychological Noise", "Semantic Noise", "Physical Noise", "Cultural Noise"],
    "answer": 0
  },
  {
    "question": "What is the main purpose of 'Predicting' while reading?",
    "options": ["To anticipate content and enhance comprehension", "To memorize every word", "To skim through headings only", "To underline keywords"],
    "answer": 0
  },
  {
    "question": "What is the primary role of the 'Channel' in communication?",
    "options": ["To encode the message", "To carry the message from sender to receiver", "To provide feedback", "To interpret meaning"],
    "answer": 1
  },
  {
    "question": "Which reading skill involves scanning for specific keywords or phrases to locate information quickly?",
    "options": ["Skimming", "Scanning", "Previewing", "Intensive Reading"],
    "answer": 1
  },
  {
    "question": "In effective listening, which barrier arises when the listener focuses on irrelevant distractions?",
    "options": ["Physical Noise", "Psychological Noise", "Semantic Noise", "Cultural Noise"],
    "answer": 0
  },
  {
    "question": "Which type of listening evaluates the emotional tone or feelings expressed by the speaker?",
    "options": ["Empathetic Listening", "Critical Listening", "Informational Listening", "Discriminative Listening"],
    "answer": 0
  },
  {
    "question": "What is the purpose of 'Signposts' in communication?",
    "options": ["To guide the audience through the structure of the message", "To distract listeners", "To highlight difficult words", "To mark the end of the message"],
    "answer": 0
  },
  {
    "question": "Which reading technique is used to get a general overview of content quickly?",
    "options": ["Skimming", "Scanning", "Intensive Reading", "Extensive Reading"],
    "answer": 0
  },
  {
    "question": "Which type of note-making involves creating diagrams with lines and branches to connect ideas?",
    "options": ["Mind Mapping", "Outline Method", "Listing", "Highlighting"],
    "answer": 0
  },
  {
    "question": "Which type of listening focuses on understanding information and instructions accurately?",
    "options": ["Informational Listening", "Critical Listening", "Appreciative Listening", "Discriminative Listening"],
    "answer": 0
  },
  {
    "question": "In reading, which skill allows anticipation of upcoming words or ideas?",
    "options": ["Predicting", "Skimming", "Scanning", "Intensive Reading"],
    "answer": 0
  },
  {
    "question": "Which note-taking system uses a cue column, note section, and summary section?",
    "options": ["Cornell Method", "Mind Mapping", "Outline Method", "Listing Method"],
    "answer": 0
  },
  {
    "question": "Which barrier occurs when the listener pays more attention to personal thoughts than the speaker?",
    "options": ["Psychological Noise", "Physical Noise", "Semantic Noise", "Cultural Noise"],
    "answer": 0
  },
  {
    "question": "Which reading habit is inefficient due to moving the head instead of the eyes along a line?",
    "options": ["Head Movement", "Vocalization", "Pointing", "Internal Voicing"],
    "answer": 0
  },
  {
    "question": "Which note-making technique uses abbreviations and symbols to save time?",
    "options": ["Outline Method", "Mind Mapping", "Abbreviations Method", "Highlighting"],
    "answer": 2
  },
  {
    "question": "Which type of listening focuses on enjoyment rather than analysis?",
    "options": ["Appreciative Listening", "Critical Listening", "Informational Listening", "Discriminative Listening"],
    "answer": 0
  },
  {
    "question": "Which reading skill helps locate specific details such as dates and numbers quickly?",
    "options": ["Scanning", "Skimming", "Previewing", "Intensive Reading"],
    "answer": 0
  },
  {
    "question": "Which note-taking approach is ideal for showing hierarchy and structure using headings?",
    "options": ["Outline Method", "Mind Mapping", "Listing", "Cornell Method"],
    "answer": 0
  },
  {
    "question": "Which listening type focuses on interpreting emotions expressed by the speaker?",
    "options": ["Empathetic Listening", "Critical Listening", "Informational Listening", "Discriminative Listening"],
    "answer": 0
  },
  {
    "question": "Which reading technique is most suitable for academic study requiring deep comprehension?",
    "options": ["Intensive Reading", "Extensive Reading", "Skimming", "Scanning"],
    "answer": 0
  },
  {
    "question": "Which of the following is NOT a barrier to effective listening?",
    "options": ["Preoccupation", "Environmental Noise", "Active Engagement", "Emotional Bias"],
    "answer": 2
  },
  {
    "question": "What is the primary purpose of the 'Cue Column' in the Cornell Note-taking system?",
    "options": ["To summarize key points for self-testing", "To write down detailed lecture notes", "To list references", "To record dates and page numbers"],
    "answer": 0
  },
  {
    "question": "Which type of note-taking is best for capturing the structure and relationships between concepts?",
    "options": ["Linear Notes", "Mind Mapping", "Listing", "Highlighting"],
    "answer": 1
  },
  {
    "question": "Which reading skill allows the reader to anticipate what comes next in the text based on context?",
    "options": ["Skimming", "Predicting", "Scanning", "Critical Reading"],
    "answer": 1
  },
  {
    "question": "What distinguishes Note Making from Note Taking?",
    "options": ["Note Making involves personal processing and summarization; Note Taking is recording information", "Note Making is done during lectures; Note Taking is done while reading", "Note Making is faster than Note Taking", "They are the same"],
    "answer": 0
  },
  {
    "question": "In listening, which barrier occurs when the listener focuses more on the speaker’s personal characteristics than on the message?",
    "options": ["Preoccupation", "Selective Listening", "Physical Noise", "Bias/Attractiveness"],
    "answer": 3
  },
  {
    "question": "Which technique involves the eye capturing blocks of words rather than reading word by word?",
    "options": ["Linear Reading", "Block Consumption", "Vocalization", "Scanning"],
    "answer": 1
  },
  {
    "question": "Which of the following is the main purpose of Critical Listening?",
    "options": ["To enjoy music or poetry", "To analyze and evaluate the message", "To memorize facts", "To respond interactively"],
    "answer": 1
  },
  {
    "question": "In effective reading, what is the purpose of 'Previewing'?",
    "options": ["To read word by word carefully", "To get a general idea of the text before detailed reading", "To memorize the content", "To ignore unfamiliar words"],
    "answer": 1
  },
  {
    "question": "Which type of note-making method uses symbols, abbreviations, and indentations to show hierarchy?",
    "options": ["Mind Mapping", "Outline Method", "Listing", "Highlighting"],
    "answer": 1
  },
  {
    "question": "What does 'Feedback' refer to in the communication process?",
    "options": ["The message transmitted", "The channel of communication", "The response from the receiver to the sender", "The physical medium used"],
    "answer": 2
  },
  {
    "question": "Which reading approach is most suitable for quickly locating a specific piece of information?",
    "options": ["Skimming", "Scanning", "Intensive Reading", "Extensive Reading"],
    "answer": 1
  },
  {
    "question": "Which listening type is primarily concerned with obtaining information or instructions?",
    "options": ["Appreciative Listening", "Informational Listening", "Critical Listening", "Discriminative Listening"],
    "answer": 1
  },
  {
    "question": "What is the function of 'Signposts' in written or spoken communication?",
    "options": ["To indicate the end of the message", "To guide the audience through the structure of the message", "To emphasize difficult words", "To distract the listener"],
    "answer": 1
  },
  {
    "question": "Which barrier to effective listening is caused by fatigue, illness, or hearing impairment?",
    "options": ["Semantic Noise", "Physical Noise", "Psychological Noise", "Cultural Noise"],
    "answer": 1
  },
  {
    "question": "In the Cornell Note-taking system, where should the summary be written?",
    "options": ["At the top of the page", "In the cue column", "At the bottom of the page", "In the main notes area"],
    "answer": 2
  },
  {
    "question": "What is the main benefit of using Abbreviations in note-making?",
    "options": ["To decorate notes", "To save time and space", "To make notes more complex", "To confuse others reading the notes"],
    "answer": 1
  },
  {
    "question": "Which of the following is an example of Top-Down reading strategy?",
    "options": ["Recognizing letters and forming words", "Predicting content based on prior knowledge", "Reading every word carefully", "Translating each word individually"],
    "answer": 1
  },
  {
    "question": "Which note-taking method is linear and uses headings and subheadings to organize ideas?",
    "options": ["Outline Method", "Mind Mapping", "Listing", "Flow Notes"],
    "answer": 0
  },
  {
    "question": "Which barrier occurs when the listener pays attention to only what aligns with their own beliefs?",
    "options": ["Selective Listening", "Physical Noise", "Semantic Noise", "Appreciative Listening"],
    "answer": 0
  },
  {
    "question": "Which listening type focuses on interpreting emotions and feelings expressed by the speaker?",
    "options": ["Discriminative Listening", "Appreciative Listening", "Empathetic Listening", "Informational Listening"],
    "answer": 2
  },
  {
    "question": "In reading, what is the main purpose of 'Scanning'?",
    "options": ["To understand every word in detail", "To quickly locate specific information", "To get a general idea of the content", "To memorize important passages"],
    "answer": 1
  },
  {
    "question": "Which reading technique is most appropriate for academic study requiring deep understanding?",
    "options": ["Extensive Reading", "Intensive Reading", "Skimming", "Scanning"],
    "answer": 1
  },
  {
    "question": "Which note-making technique arranges ideas around a central concept using lines and branches?",
    "options": ["Listing", "Clustering", "Outlining", "Highlighting"],
    "answer": 1
  },
  {
    "question": "In listening, which barrier arises from preoccupation with personal thoughts rather than the message?",
    "options": ["Semantic Noise", "Psychological Noise", "Physical Noise", "Cultural Noise"],
    "answer": 1
  },
  {
    "question": "Which reading habit involves mentally predicting what comes next based on context and prior knowledge?",
    "options": ["Skimming", "Predicting", "Scanning", "Linear Reading"],
    "answer": 1
  },
  {
    "question": "In communication, what is the primary role of the 'Channel'?",
    "options": ["To encode the message", "To carry the message from sender to receiver", "To provide feedback", "To interpret meaning"],
    "answer": 1
  },
  {
    "question": "Which reading skill involves previewing the material to get a general idea before reading in detail?",
    "options": ["Skimming", "Scanning", "Intensive Reading", "Extensive Reading"],
    "answer": 0
  },
  {
    "question": "Which type of listening involves responding to the speaker and interacting during communication?",
    "options": ["Transactional Listening", "Discriminative Listening", "Critical Listening", "Appreciative Listening"],
    "answer": 0
  },
  {
    "question": "Regarding the communication model, which element is specifically defined as the 'idea that triggers the communication process' and occurs during the 'ideational stage'?",
    "options": ["Source", "Encoding", "Stimulus", "Medium"],
    "answer": 2
  },
  {
    "question": "In the study of phonetics and articulation, which specific sound is produced in the vocal folds and articulated by the glottis?",
    "options": ["/p/", "/g/", "/h/", "/a:/"],
    "answer": 2
  },
  {
    "question": "Which note-taking technique is specifically used in manufacturing to outline process steps and identify where quality control issues might arise?",
    "options": ["Cornell System", "Ishikawa Diagram", "Clustering", "Semantic Network"],
    "answer": 1
  },
  {
    "question": "When a reader is able to tell ahead of time what will be contained in the following word or text based on clues, they are employing which skill?",
    "options": ["Browsing", "Guessing from context", "Predicting", "Critical reading"],
    "answer": 2
  },
  {
    "question": "According to the provided materials, what is the hierarchical relationship between Scanning and Skimming in terms of speed?",
    "options": ["Skimming is faster than Scanning", "Scanning is faster than Skimming", "They are performed at the same speed", "Speed depends solely on the reader's eye movement"],
    "answer": 1
  },
  {
    "question": "How does 'Internal Voicing' or 'Inaudible Vocalizing' differ from regular 'Vocalization'?",
    "options": ["It involves reading aloud for rhythmic quality", "It involves moving lips in silent pronunciation", "It is a technique for visually impaired readers", "It is the act of pointing at words with a finger"],
    "answer": 1
  },
  {
    "question": "In information processing, the Top-Down approach is characterized by which of the following?",
    "options": ["Starting from the known to the unknown", "Starting from the unknown to the known", "Piecing together systems to give rise to complex systems", "Building words from individual alphabets"],
    "answer": 0
  },
  {
    "question": "Which type of listening involves evaluating a message in terms of its reasoning, use of evidence, or truth in light of one's own experience?",
    "options": ["Transactional Listening", "Interactive Listening", "Appreciative Listening", "Critical Listening"],
    "answer": 3
  },
  {
    "question": "In the communication process, what is 'Linguistic Noise'?",
    "options": ["Physical screaming or banging of tables", "Headache or emotional imbalance", "Poor expression or distracting mannerisms", "A faulty hearing aid or device"],
    "answer": 2
  },
  {
    "question": "What is the primary difference between 'Note Taking' and 'Note Making'?",
    "options": ["Note taking is done while reading; Note making is done during lectures", "Note taking is done during lectures; Note making is done while reading/researching", "Note taking involves processing; Note making is simple recording", "Note taking is slower than Note making"],
    "answer": 1
  },
  {
    "question": "According to the 'Mechanics' of reading, which of the following is NOT listed as a factor cultivated at the early stage of education?",
    "options": ["Speed", "Concentration", "Assimilation", "Critical analysis"],
    "answer": 3
  },
  {
    "question": "Which technique involves the eye taking a 'snapshot' of word groups and transporting them to the brain for interpretation?",
    "options": ["Scanning", "Block Consumption", "Vocalization", "Linear Outlining"],
    "answer": 1
  },
  {
    "question": "What is the 'Point of Saturation' in the context of reading?",
    "options": ["The stage where all information is memorized", "The moment a reader must defer reading due to absorption limits", "The point where a reader moves from skimming to scanning", "The transition from intensive to extensive reading"],
    "answer": 1
  },
  {
    "question": "Which of these constitutes a barrier to effective listening by focusing on feelings about the communicator rather than the message?",
    "options": ["Preoccupation", "Identifying", "Communicator Attractiveness", "Selective Listening"],
    "answer": 2
  },
  {
    "question": "Under the Cornell Note-taking system, what is the specific purpose of the 'Self-test column'?",
    "options": ["To record the main lecture notes", "To review notes and create a column for testing yourself", "To write a summary for the lecturer", "To list the date and course title"],
    "answer": 1
  },
  {
    "question": "According to the text, 'Listening' is distinct from 'Hearing' because Listening is:",
    "options": ["An innate ability", "A passive perception of visual stimuli", "The conscious processing of auditory stimuli", "Maintaining a polite silence"],
    "answer": 2
  },
  {
    "question": "Which brainstorming variation is also known as 'Mapping' or 'Webbing'?",
    "options": ["Listing", "Clustering", "Group passing technique", "Free writing"],
    "answer": 1
  },
  {
    "question": "What distinguishes 'Intensive Reading' from 'Extensive Reading' regarding its primary objective?",
    "options": ["Intensive reading is for pleasure; Extensive is for points", "Intensive reading is thorough/meticulous; Extensive is to keep abreast with the times", "Intensive reading involves scanning; Extensive involves skimming", "Intensive reading is faster than Extensive reading"],
    "answer": 1
  },
  {
    "question": "Identify the faulty reading habit that specifically involves the shifting of the head rather than the gaze along a line?",
    "options": ["Pointing", "Vocalization", "Head Movement", "Internal Voicing"],
    "answer": 2
  },
  {
    "question": "Which of the following is the simplest meaningful unit or smallest meaningful form of language?",
    "options": ["A word", "A morpheme", "A phrase", "A clause"],
    "answer": 1
  },
  {
    "question": "In the communication model, what does 'Encoding' refer to?",
    "options": ["The creation of a message", "Translating ideas into symbols or language", "The channel used to transmit the message", "The feedback received from the listener"],
    "answer": 1
  },
  {
    "question": "What is the main goal of 'Skimming' as a reading technique?",
    "options": ["To read every word carefully", "To get a general overview of the content", "To memorize specific facts", "To evaluate the author's argument"],
    "answer": 1
  },
  {
    "question": "Which type of listening is focused on understanding and enjoying the speaker's message rather than analyzing it critically?",
    "options": ["Critical Listening", "Appreciative Listening", "Transactional Listening", "Interactive Listening"],
    "answer": 1
  },
  {
    "question": "What does 'Semantic Noise' in communication refer to?",
    "options": ["Physical disturbance affecting hearing", "Emotional state of the listener", "Misunderstanding due to ambiguous words or language", "Technical failure in the communication channel"],
    "answer": 2
  },
  {
    "question": "In effective note-making, what is the main purpose of 'Abstraction'?",
    "options": ["Writing down everything verbatim", "Summarizing and condensing information", "Copying diagrams accurately", "Highlighting key terms only"],
    "answer": 1
  },
  {
    "question": "Which reading skill involves scanning the text for specific information like dates, names, or numbers?",
    "options": ["Skimming", "Scanning", "Intensive Reading", "Extensive Reading"],
    "answer": 1
  },
  {
    "question": "Which technique helps improve concentration by mentally organizing information into categories or groups?",
    "options": ["Clustering", "Listing", "Highlighting", "Underlining"],
    "answer": 0
  },
  {
    "question": "What is the main characteristic of Top-Down reading processing?",
    "options": ["Reading starts with individual letters", "Reading starts from general ideas to specific details", "Reading involves memorizing word by word", "Reading focuses only on syntax and grammar"],
    "answer": 1
  },
];



// ============================================
// GAME STATE
// ============================================
let state = {
  questions: [],
  currentQ: 0,
  score: 0,
  selected: null,
  answered: false,
  gameOver: false,
  timer: 15,
  gameStarted: false,
  failed: false,
  reviewMode: false, // NEW: 5s review for wrong or timeout
  timerInterval: null
};

// ============================================
// HELPER FUNCTIONS
// ============================================
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function startGame() {
  const shuffled = shuffleArray(questionBank);
  state.questions = shuffled.slice(0, Math.min(100, questionBank.length));
  state.gameStarted = true;
  state.timer = 15;
  render();
  startTimer();
}

// ============================================
// TIMER WITH CIRCULAR ANIMATION & TIMEOUT
// ============================================
function startTimer() {
  if (state.timerInterval) cancelAnimationFrame(state.timerInterval);

  const timerCircle = document.querySelector('.timer-circle');
  const timerNumber = timerCircle.querySelector('.timer-number');

  let canvas = timerCircle.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    timerCircle.prepend(canvas);
  }
  const ctx = canvas.getContext('2d');
  const radius = canvas.width / 2 - 8;

  let totalTime = state.timer;
  let startTime = null;

  function drawCircle(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 8;
    ctx.stroke();

    // foreground
    const angle = -Math.PI / 2 + 2 * Math.PI * progress;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, -Math.PI / 2, angle, false);
    ctx.strokeStyle = progress <= 0.33 ? '#f87171' : '#34d399';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;
    const remaining = Math.max(totalTime - elapsed, 0);
    timerNumber.textContent = Math.ceil(remaining);
    const progress = remaining / totalTime;

    drawCircle(progress);

    if (!state.answered && remaining > 0) {
      state.timerInterval = requestAnimationFrame(animate);
    } else if (!state.answered && remaining <= 0) {
      // TIMEOUT = fail
      state.failed = true;
      state.answered = true;
      state.reviewMode = true;
      render();

      setTimeout(() => {
        state.reviewMode = false;
        state.gameOver = true;
        render();
      }, 5000);
    }
  }

  state.timerInterval = requestAnimationFrame(animate);
}

// ============================================
// ANSWER HANDLING WITH 5s REVIEW
// ============================================
function handleAnswer(idx) {
  if (state.answered) return;

  state.selected = idx;
  state.answered = true;
  if (state.timerInterval) cancelAnimationFrame(state.timerInterval);

  const currentQ = state.questions[state.currentQ];
  const isCorrect = idx === currentQ.answer;

  if (isCorrect) {
    state.score++;
    render();
  } else {
    state.failed = true;
    state.reviewMode = true; // activate 5s review
    render();

    setTimeout(() => {
      state.reviewMode = false;
      state.gameOver = true;
      render();
    }, 5000);
  }
}

// ============================================
// NEXT QUESTION / RESTART
// ============================================
function nextQuestion() {
  if (state.currentQ + 1 < state.questions.length) {
    state.currentQ++;
    state.selected = null;
    state.answered = false;
    state.failed = false;
    state.timer = 15;
    render();
    startTimer();
  } else {
    state.gameOver = true;
    if (state.timerInterval) cancelAnimationFrame(state.timerInterval);
    render();
  }
}

function restart() {
  if (state.timerInterval) cancelAnimationFrame(state.timerInterval);
  state = {
    questions: [],
    currentQ: 0,
    score: 0,
    selected: null,
    answered: false,
    gameOver: false,
    timer: 15,
    gameStarted: false,
    failed: false,
    reviewMode: false,
    timerInterval: null
  };
  render();
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderQuizScreen() {
  const currentQuestion = state.questions[state.currentQ];
  const progress = ((state.currentQ + 1) / state.questions.length) * 100;

  let optionsHTML = '';
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = currentQuestion.options[i];
    const isCorrect = i === currentQuestion.answer;
    const isSelected = i === state.selected;

    let btnClass = 'option-btn';
    let icon = '';

    if (state.answered) {
      if (isCorrect) {
        btnClass += ' option-correct';
        icon = '<span class="option-icon">✓</span>';
      } else if (isSelected && !isCorrect) {
        btnClass += ' option-wrong';
        icon = '<span class="option-icon">✗</span>';
      }
    }

    const letter = String.fromCharCode(65 + i);
    const disabled = state.answered || state.reviewMode ? 'disabled' : '';

    optionsHTML += `
      <button class="${btnClass}" onclick="handleAnswer(${i})" ${disabled}>
        <div class="option-content">
          <div class="option-letter">${letter}</div>
          <span>${option}</span>
        </div>
        ${icon}
      </button>
    `;
  }

  const nextBtnHTML =
    state.answered && !state.reviewMode
      ? `<button class="btn" onclick="nextQuestion()"> ${
          state.currentQ + 1 < state.questions.length ? 'Next Question →' : 'See Results 🏆'
        } </button>`
      : '';

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="timer-circle">
      <div class="timer-number">${state.timer}</div>
    </div>

    <div class="progress-info">
      <span>Question ${state.currentQ + 1}/${state.questions.length}</span>
      <span>Score: ${state.score}</span>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar-fill" style="width: ${progress}%"></div>
    </div>

    <div class="question-box">
      <h3>${currentQuestion.question}</h3>
    </div>

    <div class="options-container">
      ${optionsHTML}
    </div>

    ${nextBtnHTML}
  </div>
</div>
`;
}

function renderStartScreen() {
  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">🏆</div>
    <h1>CBT Quiz Challenge</h1>
    <p>Answer questions before time runs out!</p>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">⏱️</div>
        <div class="stat-content">
          <div class="stat-label">Time per Question</div>
          <div class="stat-value">15 seconds</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🎯</div>
        <div class="stat-content">
          <div class="stat-label">Total Questions</div>
          <div class="stat-value">${Math.min(100, questionBank.length)}</div>
        </div>
      </div>
    </div>

    <div class="warning-box">
      <p class="warning-text">
        ⚡ One wrong answer or timeout = Game Over!
      </p>
    </div>

    <button class="btn" onclick="startGame()">Start Quiz</button>
  </div>
</div>
`;
}

function renderGameOverScreen() {
  const percentage = state.questions.length > 0 ? ((state.score / state.questions.length) * 100).toFixed(0) : 0;
  const iconHTML = state.failed
    ? '<div class="icon-container icon-failed">❌</div>'
    : '<div class="icon-container bounce">🏆</div>';

  const titleHTML = state.failed
    ? '<h2>Game Over!</h2><p>' + (state.timer === 0 ? 'Time ran out!' : 'Wrong answer!') + '</p>'
    : '<h2>Perfect Score! 🎉</h2>';

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    ${iconHTML}
    ${titleHTML}
    <div class="score-display">
      <div class="score-number">${state.score}/${state.questions.length}</div>
      <div class="score-percentage">Score: ${percentage}%</div>
      <div class="score-details">Questions Answered: ${state.currentQ + 1}</div>
    </div>
    <button class="btn" onclick="restart()">🔄 Try Again</button>
  </div>
</div>
`;
}

// ============================================
// RENDER MAIN
// ============================================
function render() {
  const root = document.getElementById('root');
  if (!state.gameStarted) root.innerHTML = renderStartScreen();
  else if (state.gameOver) root.innerHTML = renderGameOverScreen();
  else root.innerHTML = renderQuizScreen();
}

// ============================================
// INITIALIZE APP
// ============================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}

// ============================================
// KEYBOARD INTERACTIONS
// ============================================
document.addEventListener('keydown', (e) => {
  if (!state.gameStarted) return;

  const key = e.key.toLowerCase();

  // Map A/B/C/D to option indices
  const keyMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };

  if (keyMap.hasOwnProperty(key)) {
    const idx = keyMap[key];

    // Only trigger if question not yet answered and not in review
    if (!state.answered && !state.reviewMode && idx < state.questions[state.currentQ].options.length) {
      handleAnswer(idx);
      // Optionally highlight the button visually
      const btns = document.querySelectorAll('.option-btn');
      btns.forEach((btn, i) => {
        btn.classList.remove('option-selected');
        if (i === idx) btn.classList.add('option-selected');
      });
    }
  }

  // Enter key → next question if answered and not in review
  if (key === 'enter') {
    if (state.answered && !state.reviewMode && !state.gameOver) {
      nextQuestion();
    }
  }
});
