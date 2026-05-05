// app.js - Professional CBT Quiz App with Firebase Auth

// ============================================
// FIREBASE IMPORTS
// ============================================
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// ============================================
// FIREBASE REFERENCES (initialized in index.html)
// ============================================
// window.auth - Firebase Auth instance
// window.db - Firestore instance

// ============================================
// GAME STATE
// ============================================
const STORAGE_KEY = 'cbtQuizHighScores';
const STATS_KEY = 'cbtQuizStats';

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
  reviewMode: false,
  timerInterval: null,
  
  // Practice mode properties
  practiceMode: false,
  mistakes: [],
  practiceScore: 0,
  showExplanation: false,
  showHint: false,
  resultSaved: false,
  
  // Mode and life tracking
  mode: null,
  lives: null,
  maxLives: null,
  isTimed: false,
  questionLimit: null,
  customQuizEnabled: false,
  customQuizSize: 10,
  customTimerValue: 15,
  difficulty: 'medium',
  selectedCategories: [],
  availableCategories: [],
  
  // Streak and performance
  currentStreak: 0,
  bestStreak: 0,
  
  // Navigation states
  showingModeSelection: false,
  showingCourseSelection: false,
  showingDifficultySelection: false,
  
  // Authentication states
  showingLogin: true,
  showingSignup: false,
  showingForgotPassword: false,
  currentUser: null,
  loginError: '',
  signupError: '',
  forgotPasswordError: '',
  forgotPasswordSuccess: '',
  
  // Current course
  currentCourse: null,
  courseName: ''
};

// ============================================
// COURSE QUESTION BANKS
// ============================================
const courseBanks = {
  'gst101': {
    name: 'Communication in English',
    questions: window.questionBankGST101 || questionBankGST101,
    icon: '📚',
    color: 'course-gst'
  },
  'bio101': {
    name: 'General Biology I',
    questions: window.questionBankBIO101 || questionBankBIO101,
    icon: '🧬',
    color: 'course-bio'
  },
  'phy101': {
    name: 'General Physics I',
    questions: window.questionBankPHY101 || questionBankPHY101,
    icon: '⚛️',
    color: 'course-phy'
  },
  'mls101': {
    name: 'Introduction to Medical Lab I',
    questions: window.questionBankMLS101 || questionBankMLS101,
    icon: '🔬',
    color: 'course-mls'
  },
  'gst103': {
    name: 'Use of Library and Act',
    questions: window.questionBankGST103 || questionBankGST103,
    icon: '📚',
    color: 'course-gst'
  },
  'ent101': {
    name: 'Entrepreneurship',
    questions: window.questionBankENT101 || questionBankENT101,
    icon: '📚',
    color: 'course-gst'
  },
  'mth101': {
    name: 'General Mathematics',
    questions: window.questionBankMTH101 || questionBankMTH101,
    icon: '📚',
    color: 'course-mth'
  },
  'mls102': {
    name: 'Introduction to Medical Lab II',
    questions: window.questionBankMLS102 || questionBankMLS102,
    icon: '🔬',
    color: 'course-mls'
  },
  'mls104': {
    name: 'Introduction to Biology of Disease',
    questions: window.questionBankMLS104 || questionBankMLS104,
    icon: '🔬',
    color: 'course-mls'
  }
};

// ============================================
// MODE CONFIGURATION
// ============================================
const MODE_CONFIGS = {
  challenge: {
    label: 'Challenge Mode',
    description: '15 seconds per question. One wrong answer ends the game.',
    timer: 15,
    lives: 1,
    questionLimit: 100,
    isTimed: true,
    gameOverOnWrong: true
  },
  practice: {
    label: 'Practice Mode',
    description: 'Unlimited time. Learn from mistakes with explanations.',
    timer: null,
    lives: null,
    questionLimit: 100,
    isTimed: false,
    gameOverOnWrong: false
  },
  survival: {
    label: 'Survival Mode',
    description: '3 lives. Keep playing until your lives run out.',
    timer: 15,
    lives: 3,
    questionLimit: 100,
    isTimed: true,
    gameOverOnWrong: false
  },
  marathon: {
    label: 'Marathon Mode',
    description: 'No timer. Finish the full question set to see your score.',
    timer: null,
    lives: null,
    questionLimit: 100,
    isTimed: false,
    gameOverOnWrong: false
  },
  quickfire: {
    label: 'Quickfire Mode',
    description: '20 fast questions with 10 seconds each. Great for speed training.',
    timer: 10,
    lives: 1,
    questionLimit: 20,
    isTimed: true,
    gameOverOnWrong: true
  },
  customtimer: {
    label: 'Custom Timer Mode',
    description: 'Pick your own timer and tackle a custom quiz.',
    timer: null,
    lives: 1,
    questionLimit: 50,
    isTimed: true,
    gameOverOnWrong: true
  },
  custom: {
    label: 'Custom Mode',
    description: 'Set your own timer and question count.',
    timer: null,
    lives: 1,
    questionLimit: 50,
    isTimed: true,
    gameOverOnWrong: true
  },
  daily: {
    label: 'Daily Challenge',
    description: 'A shared daily quiz. Same questions for everyone today.',
    timer: 12,
    lives: 1,
    questionLimit: 10,
    isTimed: true,
    gameOverOnWrong: true
  }
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

function getSavedScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (error) {
    console.warn('Failed to load saved scores:', error);
    return {};
  }
}

function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.warn('Failed to save scores:', error);
  }
}

function getScoreKey(courseId, mode) {
  return `${courseId}:${mode}`;
}

function getSavedScore(courseId, mode) {
  const saved = getSavedScores();
  return saved[getScoreKey(courseId, mode)] || null;
}

function updateSavedScore(courseId, mode, score, percentage, streak) {
  const scores = getSavedScores();
  const key = getScoreKey(courseId, mode);
  const current = scores[key];
  const record = {
    score,
    percentage,
    streak,
    updatedAt: new Date().toISOString()
  };

  if (!current || score > current.score || percentage > current.percentage || streak > current.streak) {
    scores[key] = record;
    saveScores(scores);
  }
  return scores[key];
}

function getGlobalBest() {
  const scores = getSavedScores();
  const entries = Object.entries(scores);
  if (!entries.length) return null;
  return entries.reduce((best, [key, value]) => {
    if (!best || value.percentage > best.percentage || (value.percentage === best.percentage && value.streak > best.streak)) {
      return { key, ...value };
    }
    return best;
  }, null);
}

function getSavedStats() {
  if (!state.currentUser) {
    try {
      return JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
    } catch {
      return {};
    }
  }
  return {};
}

async function saveStats(stats) {
  if (!state.currentUser) {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch {
      console.warn('Failed to save stats locally');
    }
    return;
  }
  
  try {
    await updateDoc(doc(window.db, 'users', state.currentUser.uid), {
      stats: stats
    });
  } catch (error) {
    console.warn('Failed to save stats to Firestore:', error);
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch {
      // Ignore
    }
  }
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email')?.trim();
  const password = formData.get('password');

  if (!email || !password) {
    state.loginError = 'Please fill in all fields';
    render();
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(window.auth, email, password);
    state.currentUser = userCredential.user;
    state.showingLogin = false;
    state.loginError = '';
    render();
  } catch (error) {
    console.error('Login error:', error);
    state.loginError = getAuthErrorMessage(error.code);
    render();
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email')?.trim();
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (!email || !password || !confirmPassword) {
    state.signupError = 'Please fill in all fields';
    render();
    return;
  }

  if (password.length < 6) {
    state.signupError = 'Password must be at least 6 characters';
    render();
    return;
  }

  if (password !== confirmPassword) {
    state.signupError = 'Passwords do not match';
    render();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    state.signupError = 'Please enter a valid email address';
    render();
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(window.auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(window.db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
      stats: {
        totalGames: 0,
        bestStreak: 0,
        perfectScores: 0,
        dailyStreak: 0,
        lastDaily: null,
        categoriesUsed: []
      },
      achievements: [],
      highScores: {}
    });

    state.currentUser = user;
    state.showingSignup = false;
    state.signupError = '';
    render();
  } catch (error) {
    console.error('Signup error:', error);
    state.signupError = getAuthErrorMessage(error.code);
    render();
  }
}

async function handleForgotPassword(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email')?.trim();

  if (!email) {
    state.forgotPasswordError = 'Please enter your email address';
    render();
    return;
  }

  try {
    await sendPasswordResetEmail(window.auth, email);
    state.forgotPasswordSuccess = 'Password reset email sent! Check your inbox.';
    state.forgotPasswordError = '';
    render();
  } catch (error) {
    console.error('Forgot password error:', error);
    state.forgotPasswordError = getAuthErrorMessage(error.code);
    state.forgotPasswordSuccess = '';
    render();
  }
}

function getAuthErrorMessage(code) {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'An error occurred. Please try again.';
  }
}

async function logout() {
  try {
    await signOut(window.auth);
    state.currentUser = null;
    state.showingLogin = true;
    state.showingSignup = false;
    state.showingForgotPassword = false;
    state.loginError = '';
    state.signupError = '';
    state.forgotPasswordError = '';
    state.forgotPasswordSuccess = '';
    render();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

function skipLogin() {
  state.showingLogin = false;
  state.showingSignup = false;
  state.showingForgotPassword = false;
  state.currentUser = null;
  state.loginError = '';
  state.signupError = '';
  state.forgotPasswordError = '';
  state.forgotPasswordSuccess = '';
  render();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function seededShuffle(array, seed) {
  const result = [...array];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }

  function random() {
    hash = Math.imul(48271, hash) % 2147483647;
    return (hash & 0x7fffffff) / 2147483647;
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getQuestionCategories(questions) {
  return [...new Set(questions.filter(q => q.category).map(q => q.category))];
}

function buildQuestionPool(courseQuestions) {
  let pool = [...courseQuestions];

  if (state.difficulty) {
    pool = pool.filter(q => !q.difficulty || q.difficulty.toLowerCase() === state.difficulty);
  }

  if (state.selectedCategories.length) {
    pool = pool.filter(q => state.selectedCategories.includes(q.category || 'General'));
  }

  if (!pool.length) {
    pool = [...courseQuestions];
  }

  const modeSettings = MODE_CONFIGS[state.mode] || MODE_CONFIGS.challenge;
  const limit = state.customQuizEnabled ? Math.min(state.customQuizSize, pool.length) : Math.min(modeSettings.questionLimit, pool.length);

  if (state.mode === 'daily') {
    const shuffled = seededShuffle(pool, getTodayKey());
    return shuffled.slice(0, limit);
  }

  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, limit);
}

function getBadgeSet(stats) {
  const badges = [];
  if (stats.totalGames >= 1) {
    badges.push({ key: 'first-play', title: 'First Quiz', description: 'Complete your first session.' });
  }
  if (stats.perfectScores >= 1) {
    badges.push({ key: 'perfect-score', title: 'Perfect Score', description: 'Achieve a 100% result.' });
  }
  if (stats.bestStreak >= 10) {
    badges.push({ key: 'streak-master', title: 'Streak Master', description: '10 correct answers in a row.' });
  }
  if (stats.dailyStreak >= 3) {
    badges.push({ key: 'daily-habit', title: 'Daily Habit', description: 'Complete three daily challenges in a row.' });
  }
  if (stats.totalGames >= 10) {
    badges.push({ key: 'quiz-collector', title: 'Quiz Collector', description: 'Finish 10 quiz sessions.' });
  }
  if ((stats.categoriesUsed || []).length >= 3) {
    badges.push({ key: 'category-explorer', title: 'Category Explorer', description: 'Answer questions from 3+ different categories.' });
  }
  return badges;
}

function recordSessionStats() {
  const stats = getSavedStats();
  stats.totalGames = (stats.totalGames || 0) + 1;
  stats.bestStreak = Math.max(stats.bestStreak || 0, state.bestStreak);

  const total = state.questions.length;
  const correct = state.practiceMode ? state.practiceScore : state.score;
  if (total > 0 && correct === total) {
    stats.perfectScores = (stats.perfectScores || 0) + 1;
  }

  const today = getTodayKey();
  if (state.mode === 'daily') {
    if (stats.lastDaily === today) {
      stats.dailyStreak = stats.dailyStreak || 1;
    } else if (stats.lastDaily === new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10)) {
      stats.dailyStreak = (stats.dailyStreak || 0) + 1;
    } else {
      stats.dailyStreak = 1;
    }
    stats.lastDaily = today;
  }

  stats.categoriesUsed = Array.from(new Set([...(stats.categoriesUsed || []), ...state.questions.filter(q => q.category).map(q => q.category)]));
  saveStats(stats);

  return stats;
}

// ============================================
// AUDIO FUNCTIONS
// ============================================
let audioContext = null;
function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playTone(frequency, duration = 0.12, type = 'sine') {
  try {
    const ctx = ensureAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn('Audio not available:', error);
  }
}

function playFeedback(type) {
  if (type === 'correct') {
    playTone(660, 0.12, 'triangle');
  } else if (type === 'wrong') {
    playTone(220, 0.2, 'sawtooth');
  } else if (type === 'complete') {
    playTone(880, 0.15, 'sine');
  } else if (type === 'notice') {
    playTone(440, 0.1, 'square');
  }
}

function shuffleOptions(question) {
  const optionsWithIndex = question.options.map((text, index) => ({
    text,
    originalIndex: index
  }));
  
  const shuffled = shuffleArray(optionsWithIndex);
  
  const correctOriginalIndex = question.answer;
  const newCorrectIndex = shuffled.findIndex(
    option => option.originalIndex === correctOriginalIndex
  );
  
  const shuffledOptions = shuffled.map(option => option.text);
  
  return {
    ...question,
    options: shuffledOptions,
    answer: newCorrectIndex
  };
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function selectCourse(courseId) {
  state.currentCourse = courseId;
  state.courseName = courseBanks[courseId].name;
  const course = courseBanks[courseId];
  state.availableCategories = getQuestionCategories(course.questions);
  state.selectedCategories = [];
  state.showingCourseSelection = false;
  state.showingDifficultySelection = true;
  render();
}

function selectDifficulty(level) {
  state.difficulty = level;
  render();
}

function proceedToModeSelection() {
  state.showingDifficultySelection = false;
  state.showingModeSelection = true;
  render();
}

function goToDifficultySelection() {
  state.showingModeSelection = false;
  state.showingDifficultySelection = true;
  render();
}

function goToCourseSelection() {
  state.showingDifficultySelection = false;
  state.showingModeSelection = false;
  state.showingCourseSelection = true;
  render();
}

function selectMode(mode) {
  state.mode = mode;
  state.practiceMode = (mode === 'practice');

  if (mode === 'customtimer' || mode === 'custom') {
    const value = parseInt(prompt('Set timer per question (5-30 seconds):', state.customTimerValue), 10);
    if (!value || value < 5 || value > 30) {
      alert('Please enter a valid timer between 5 and 30 seconds.');
      return;
    }
    state.customTimerValue = value;
  }

  state.showingModeSelection = false;
  startGame();
}

function startGame() {
  const course = courseBanks[state.currentCourse];
  const courseQuestions = course.questions;
  const modeSettings = MODE_CONFIGS[state.mode] || MODE_CONFIGS.challenge;
  
  const selectedQuestions = buildQuestionPool(courseQuestions);
  const processedQuestions = selectedQuestions.map(question => shuffleOptions(question));

  state.questions = processedQuestions;
  state.currentQ = 0;
  state.score = 0;
  state.practiceScore = 0;
  state.selected = null;
  state.answered = false;
  state.gameOver = false;
  state.failed = false;
  state.reviewMode = false;
  state.mistakes = [];
  state.showExplanation = false;
  state.showHint = false;
  state.resultSaved = false;
  state.mode = state.mode || 'challenge';
  state.lives = modeSettings.lives;
  state.maxLives = modeSettings.lives;
  state.isTimed = modeSettings.isTimed;
  state.questionLimit = selectedQuestions.length;
  state.currentStreak = 0;
  state.bestStreak = 0;
  state.gameStarted = true;
  state.timer = state.mode === 'customtimer' || state.mode === 'custom' ? state.customTimerValue : (modeSettings.timer || 0);
  
  render();
  
  if (state.isTimed && !state.practiceMode) {
    setTimeout(() => {
      startTimer();
    }, 10);
  }
}

// ============================================
// TIMER FUNCTIONS
// ============================================
function startTimer() {
  if (state.timerInterval) {
    cancelAnimationFrame(state.timerInterval);
    state.timerInterval = null;
  }

  const timerCircle = document.querySelector('.timer-circle');
  if (!timerCircle) return;

  const existingCanvas = timerCircle.querySelector('canvas');
  if (existingCanvas) {
    existingCanvas.remove();
  }

  const timerNumber = timerCircle.querySelector('.timer-number');
  if (!timerNumber) return;
  
  const initialTime = state.timer || 15;
  timerNumber.textContent = initialTime;
  state.timer = initialTime;

  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 120;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  timerCircle.prepend(canvas);
  
  const ctx = canvas.getContext('2d');
  const radius = canvas.width / 2 - 8;
  const totalTime = initialTime;
  let startTime = null;

  function drawCircle(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 8;
    ctx.stroke();

    const angle = -Math.PI / 2 + 2 * Math.PI * progress;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, -Math.PI / 2, angle, false);
    
    let color;
    if (progress > 0.66) color = '#34d399';
    else if (progress > 0.33) color = '#fbbf24';
    else color = '#f87171';
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;
    const remaining = Math.max(totalTime - elapsed, 0);
    const currentTime = Math.ceil(remaining);
    
    if (state.timer !== currentTime) {
      state.timer = currentTime;
      timerNumber.textContent = currentTime;
    }
    
    const progress = remaining / totalTime;
    drawCircle(progress);

    if (!state.answered && remaining > 0 && !state.gameOver) {
      state.timerInterval = requestAnimationFrame(animate);
    } else if (!state.answered && remaining <= 0) {
      if (!state.practiceMode) {
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
  }

  drawCircle(1);
  state.timerInterval = requestAnimationFrame(animate);
}

// ============================================
// ANSWER HANDLING
// ============================================
function handleAnswer(idx) {
  if (state.answered || state.gameOver) return;

  state.selected = idx;
  state.answered = true;
  
  if (state.timerInterval && !state.practiceMode) {
    cancelAnimationFrame(state.timerInterval);
  }

  const currentQ = state.questions[state.currentQ];
  const isCorrect = idx === currentQ.answer;

  if (isCorrect) {
    state.score++;
    state.currentStreak++;
    state.bestStreak = Math.max(state.bestStreak, state.currentStreak);
    playFeedback('correct');
    if (state.practiceMode) {
      state.practiceScore++;
      state.showExplanation = true;
    }
    render();
  } else {
    playFeedback('wrong');
    state.currentStreak = 0;
    const modeSettings = MODE_CONFIGS[state.mode] || MODE_CONFIGS.challenge;
    const isSurvival = state.mode === 'survival';
    const isMarathon = state.mode === 'marathon';

    if (isSurvival) {
      state.lives = Math.max((state.lives || 0) - 1, 0);
    }

    if (state.practiceMode || isMarathon || (isSurvival && state.lives > 0)) {
      state.mistakes.push({
        question: currentQ.question,
        selectedOption: currentQ.options[idx],
        correctOption: currentQ.options[currentQ.answer],
        explanation: currentQ.explanation || "No explanation available."
      });
      state.showExplanation = true;
      render();
    } else {
      state.failed = true;
      state.reviewMode = true;
      state.showExplanation = true;
      render();

      setTimeout(() => {
        state.reviewMode = false;
        state.gameOver = true;
        render();
      }, 3000);
    }
  }
}

async function saveGameResult() {
  const courseId = state.currentCourse;
  if (!courseId) return;

  const mode = state.mode || (state.practiceMode ? 'practice' : 'challenge');
  const total = state.questions.length;
  const correct = state.practiceMode ? state.practiceScore : state.score;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  updateSavedScore(courseId, mode, correct, percentage, state.bestStreak);
  recordSessionStats();

  if (state.currentUser) {
    try {
      const userDocRef = doc(window.db, 'users', state.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.exists() ? userDoc.data() : {};
      
      const userRecord = {
        score: correct,
        percentage,
        streak: state.bestStreak,
        updatedAt: new Date().toISOString()
      };
      
      const highScores = userData.highScores || {};
      highScores[`${courseId}:${mode}`] = userRecord;
      
      await updateDoc(userDocRef, {
        highScores: highScores
      });
    } catch (error) {
      console.warn('Failed to save user high scores to Firestore:', error);
    }
  }
}

function toggleHint() {
  state.showHint = !state.showHint;
  render();
}

function setDifficulty(level) {
  state.difficulty = level;
  render();
}

function toggleCategory(category) {
  const idx = state.selectedCategories.indexOf(category);
  if (idx >= 0) {
    state.selectedCategories.splice(idx, 1);
  } else {
    state.selectedCategories.push(category);
  }
  render();
}

function toggleCustomQuiz(enabled) {
  state.customQuizEnabled = enabled;
  render();
}

function setCustomQuizSize(value) {
  const size = parseInt(value, 10);
  if (!Number.isNaN(size) && size > 0) {
    state.customQuizSize = size;
    render();
  }
}

// ============================================
// EXIT PRACTICE MODE
// ============================================
function exitPracticeMode() {
  if (state.timerInterval) {
    cancelAnimationFrame(state.timerInterval);
    state.timerInterval = null;
  }
  
  state.gameStarted = false;
  state.showingModeSelection = true;
  state.showingCourseSelection = false;
  
  render();
}

// ============================================
// NAVIGATION
// ============================================
function nextQuestion() {
  state.showExplanation = false;
  
  if (state.currentQ + 1 < state.questions.length) {
    state.currentQ++;
    state.selected = null;
    state.answered = false;
    state.failed = false;
    state.showExplanation = false;
    
    render();
    
    if (state.isTimed && !state.practiceMode) {
      setTimeout(() => {
        startTimer();
      }, 10);
    }
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
    timerInterval: null,
    practiceMode: false,
    mistakes: [],
    practiceScore: 0,
    showExplanation: false,
    showHint: false,
    resultSaved: false,
    mode: null,
    lives: null,
    maxLives: null,
    isTimed: false,
    questionLimit: null,
    customQuizEnabled: false,
    customQuizSize: 10,
    customTimerValue: 15,
    difficulty: 'medium',
    selectedCategories: [],
    availableCategories: [],
    currentStreak: 0,
    bestStreak: 0,
    showingModeSelection: false,
    showingCourseSelection: false,
    showingDifficultySelection: false,
    showingLogin: state.showingLogin,
    showingSignup: state.showingSignup,
    showingForgotPassword: state.showingForgotPassword,
    currentUser: state.currentUser,
    loginError: '',
    signupError: '',
    forgotPasswordError: '',
    forgotPasswordSuccess: '',
    currentCourse: null,
    courseName: ''
  };
  
  render();
}

function goToModeSelection() {
  if (state.timerInterval) cancelAnimationFrame(state.timerInterval);
  
  state.showingModeSelection = true;
  state.gameStarted = false;
  render();
}

function showLogin() {
  state.showingLogin = true;
  state.showingSignup = false;
  state.showingForgotPassword = false;
  state.loginError = '';
  state.signupError = '';
  state.forgotPasswordError = '';
  state.forgotPasswordSuccess = '';
  render();
}

function showSignup() {
  state.showingSignup = true;
  state.showingLogin = false;
  state.showingForgotPassword = false;
  state.loginError = '';
  state.signupError = '';
  state.forgotPasswordError = '';
  state.forgotPasswordSuccess = '';
  render();
}

function showForgotPassword() {
  state.showingForgotPassword = true;
  state.showingLogin = false;
  state.showingSignup = false;
  state.loginError = '';
  state.signupError = '';
  state.forgotPasswordError = '';
  state.forgotPasswordSuccess = '';
  render();
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderLoginScreen() {
  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card auth-card">
    <div class="icon-container">🔐</div>
    <h1>Welcome Back</h1>
    <p>Sign in to your account to continue your learning journey</p>
    
    ${state.loginError ? `<div class="error-message">${state.loginError}</div>` : ''}
    
    <form class="auth-form" onsubmit="event.preventDefault(); handleLogin(event)">
      <div class="form-group">
        <label for="login-email">Email</label>
        <input type="email" id="login-email" name="email" required 
               placeholder="your.email@example.com" autocomplete="email">
      </div>
      
      <div class="form-group">
        <label for="login-password">Password</label>
        <input type="password" id="login-password" name="password" required 
               placeholder="Enter your password" autocomplete="current-password">
      </div>
      
      <button type="submit" class="btn auth-btn">Sign In</button>
    </form>
    
    <div class="auth-links">
      <p><a href="#" onclick="showForgotPassword(); return false;">Forgot your password?</a></p>
      <p>Don't have an account? 
        <a href="#" onclick="showSignup(); return false;">Create one here</a>
      </p>
    </div>
    
    <div style="margin-top: 20px; text-align: center;">
      <button class="btn btn-secondary" onclick="skipLogin()" style="max-width: 200px; margin: 0 auto;">
        Continue as Guest
      </button>
    </div>
  </div>
</div>
`;
}

function renderSignupScreen() {
  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card auth-card">
    <div class="icon-container">✨</div>
    <h1>Join CBT Quiz</h1>
    <p>Create your account to track progress and unlock achievements</p>
    
    ${state.signupError ? `<div class="error-message">${state.signupError}</div>` : ''}
    
    <form class="auth-form" onsubmit="event.preventDefault(); handleSignup(event)">
      <div class="form-group">
        <label for="signup-email">Email</label>
        <input type="email" id="signup-email" name="email" required 
               placeholder="your.email@example.com" autocomplete="email">
      </div>
      
      <div class="form-group">
        <label for="signup-password">Password</label>
        <input type="password" id="signup-password" name="password" required 
               placeholder="Create a strong password" autocomplete="new-password"
               minlength="6">
        <small class="form-hint">At least 6 characters</small>
      </div>
      
      <div class="form-group">
        <label for="signup-confirm-password">Confirm Password</label>
        <input type="password" id="signup-confirm-password" name="confirmPassword" required 
               placeholder="Confirm your password" autocomplete="new-password">
      </div>
      
      <button type="submit" class="btn auth-btn">Create Account</button>
    </form>
    
    <div class="auth-links">
      <p>Already have an account? 
        <a href="#" onclick="showLogin(); return false;">Sign in here</a>
      </p>
    </div>
    
    <div style="margin-top: 20px; text-align: center;">
      <button class="btn btn-secondary" onclick="skipLogin()" style="max-width: 200px; margin: 0 auto;">
        Continue as Guest
      </button>
    </div>
  </div>
</div>
`;
}

function renderForgotPasswordScreen() {
  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card auth-card">
    <div class="icon-container">🔑</div>
    <h1>Reset Password</h1>
    <p>Enter your email address and we'll send you a link to reset your password</p>
    
    ${state.forgotPasswordError ? `<div class="error-message">${state.forgotPasswordError}</div>` : ''}
    ${state.forgotPasswordSuccess ? `<div class="success-message">${state.forgotPasswordSuccess}</div>` : ''}
    
    <form class="auth-form" onsubmit="event.preventDefault(); handleForgotPassword(event)">
      <div class="form-group">
        <label for="forgot-email">Email</label>
        <input type="email" id="forgot-email" name="email" required 
               placeholder="your.email@example.com" autocomplete="email">
      </div>
      
      <button type="submit" class="btn auth-btn">Send Reset Link</button>
    </form>
    
    <div class="auth-links">
      <p>Remember your password? 
        <a href="#" onclick="showLogin(); return false;">Back to sign in</a>
      </p>
    </div>
  </div>
</div>
`;
}

function renderStartScreen() {
  const globalBest = getGlobalBest();
  const stats = getSavedStats();
  const badges = getBadgeSet(stats);
  const badgeHTML = badges.length ? badges.slice(0, 3).map(b => `
      <span class="badge-chip">${b.title}</span>
    `).join('') : '<span class="badge-chip badge-empty">No badges yet</span>';
  const dailyText = stats.dailyStreak ? `${stats.dailyStreak} day streak` : 'Play daily challenges';
  const bestText = globalBest ? `${globalBest.percentage}% (${globalBest.streak} streak)` : 'No attempts yet';

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">🏆</div>
    <h1>CBT Quiz Challenge</h1>
    
    ${state.currentUser ? `
      <div class="user-header">
        <span class="user-welcome">Welcome back, <strong>${state.currentUser.email}</strong>!</span>
        <button class="btn-secondary logout-btn" onclick="logout()">Logout</button>
      </div>
    ` : ''}
    
    <p>Test your knowledge across multiple courses with timed challenges or practice mode</p>
    
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">🏅</div>
        <div class="stat-content">
          <div class="stat-label">Best Score</div>
          <div class="stat-value">${bestText}</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🔥</div>
        <div class="stat-content">
          <div class="stat-label">Daily Streak</div>
          <div class="stat-value">${dailyText}</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🎖️</div>
        <div class="stat-content">
          <div class="stat-label">Badges</div>
          <div class="stat-value badges-row">${badgeHTML}</div>
        </div>
      </div>
    </div>

    <div class="warning-box">
      <p class="warning-text">
        ⚡ Choose a course, then pick a mode or try the Daily Challenge!
      </p>
    </div>

    <button class="btn" onclick="showCourseSelection()">Select Course</button>
  </div>
</div>
`;
}

function showCourseSelection() {
  state.showingCourseSelection = true;
  render();
}

function renderCourseSelection() {
  const courses = Object.entries(courseBanks);
  
  const coursesHTML = courses.map(([id, course]) => `
    <div class="course-card ${course.color}" onclick="selectCourse('${id}')">
      <div class="course-icon">${course.icon}</div>
      <div class="course-code">${id.toUpperCase()}</div>
      <div class="course-title">${course.name}</div>
      <div class="course-stats">
        <div class="course-stat">
          <span>📝</span>
          <span>${course.questions.length} questions</span>
        </div>
      </div>
      <div class="course-highlight">Available</div>
    </div>
  `).join('');

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">📚</div>
    <h1>Select Course</h1>
    <p>Choose which course you want to practice</p>
    
    <div class="courses-grid">
      ${coursesHTML}
    </div>
    
    <button class="btn btn-back" onclick="state.showingCourseSelection = false; render()">
      ← Back to Start
    </button>
  </div>
</div>
`;
}

function renderDifficultySelection() {
  const course = courseBanks[state.currentCourse];

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">${course.icon}</div>
    <h1>Select Difficulty Level</h1>
    <p>Playing: <strong>${state.courseName} (${state.currentCourse.toUpperCase()})</strong></p>

    <div class="difficulty-options">
      <div class="difficulty-card ${state.difficulty === 'easy' ? 'selected' : ''}" onclick="selectDifficulty('easy')">
        <div class="difficulty-icon">🌱</div>
        <h3>Easy</h3>
        <p>Perfect for beginners</p>
        <ul class="difficulty-features">
          <li>Basic concepts and straightforward questions</li>
          <li>More time to think through answers</li>
          <li>Great for building confidence</li>
        </ul>
        <div class="difficulty-highlight">Beginner Friendly</div>
      </div>

      <div class="difficulty-card ${state.difficulty === 'medium' ? 'selected' : ''}" onclick="selectDifficulty('medium')">
        <div class="difficulty-icon">⚖️</div>
        <h3>Medium</h3>
        <p>Balanced challenge</p>
        <ul class="difficulty-features">
          <li>Mix of fundamental and advanced topics</li>
          <li>Standard time pressure</li>
          <li>Good for regular practice</li>
        </ul>
        <div class="difficulty-highlight">Balanced</div>
      </div>

      <div class="difficulty-card ${state.difficulty === 'hard' ? 'selected' : ''}" onclick="selectDifficulty('hard')">
        <div class="difficulty-icon">🔥</div>
        <h3>Hard</h3>
        <p>For advanced learners</p>
        <ul class="difficulty-features">
          <li>Complex problems and edge cases</li>
          <li>Higher time pressure</li>
          <li>Challenge your expertise</li>
        </ul>
        <div class="difficulty-highlight">Expert Level</div>
      </div>
    </div>

    <div class="button-group">
      <button class="btn btn-secondary" onclick="goToCourseSelection()">
        ← Change Course
      </button>
      <button class="btn btn-secondary" onclick="state.showingDifficultySelection = false; render()">
        ← Back to Start
      </button>
    </div>

    <div class="next-step-indicator">
      <button class="btn btn-primary" onclick="proceedToModeSelection()">
        Continue to Game Mode Selection →
      </button>
    </div>

  </div>
</div>
`;
}

function renderModeSelection() {
  const course = courseBanks[state.currentCourse];

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">${course.icon}</div>
    <h1>Select Game Mode</h1>
    <p>Playing: <strong>${state.courseName} (${state.currentCourse.toUpperCase()})</strong></p>
    <p>Difficulty: <strong>${state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1)}</strong></p>

    <div class="mode-options">
      <div class="mode-card" onclick="selectMode('challenge')">
        <div class="mode-icon">⚡</div>
        <h3>Challenge Mode</h3>
        <p><strong>15 seconds per question</strong></p>
        <p>One wrong answer or timeout = Game Over!</p>
        <p>Test your speed and accuracy under pressure</p>
        <div class="mode-highlight">High Pressure</div>
      </div>

      <div class="mode-card" onclick="selectMode('practice')">
        <div class="mode-icon">📚</div>
        <h3>Practice Mode</h3>
        <p><strong>Unlimited time</strong></p>
        <p>Learn from mistakes with detailed explanations</p>
        <p>Perfect for studying and skill building</p>
        <div class="mode-highlight">Learning Focus</div>
      </div>

      <div class="mode-card" onclick="selectMode('survival')">
        <div class="mode-icon">❤️</div>
        <h3>Survival Mode</h3>
        <p><strong>3 lives</strong></p>
        <p>Keep going after mistakes until lives run out</p>
        <p>Endurance test for high-score chasers</p>
        <div class="mode-highlight">Stay Alive</div>
      </div>

      <div class="mode-card" onclick="selectMode('marathon')">
        <div class="mode-icon">🏁</div>
        <h3>Marathon Mode</h3>
        <p><strong>No timer</strong></p>
        <p>Answer every question and complete the full set</p>
        <p>See how many you can get right in one session</p>
        <div class="mode-highlight">Long Play</div>
      </div>

      <div class="mode-card" onclick="selectMode('quickfire')">
        <div class="mode-icon">🚀</div>
        <h3>Quickfire Mode</h3>
        <p><strong>10 seconds per question</strong></p>
        <p>Ultra-fast paced challenge</p>
        <p>For those who want maximum intensity</p>
        <div class="mode-highlight">Extreme Speed</div>
      </div>

      <div class="mode-card" onclick="selectMode('custom')">
        <div class="mode-icon">⚙️</div>
        <h3>Custom Mode</h3>
        <p><strong>Set your own timer</strong></p>
        <p>Customize time limit and question count</p>
        <p>Personalized challenge experience</p>
        <div class="mode-highlight">Flexible</div>
      </div>
    </div>

    <div class="button-group">
      <button class="btn btn-secondary" onclick="goToDifficultySelection()">
        ← Change Difficulty
      </button>
      <button class="btn btn-secondary" onclick="state.showingModeSelection = false; render()">
        ← Back to Start
      </button>
    </div>
  </div>
</div>
`;
}

function renderQuizScreen() {
  const currentQuestion = state.questions[state.currentQ];
  const progress = ((state.currentQ + 1) / state.questions.length) * 100;
  const score = state.practiceMode ? state.practiceScore : state.score;
  const course = courseBanks[state.currentCourse];
  const modeLabel = MODE_CONFIGS[state.mode]?.label || 'Challenge Mode';
  const livesHTML = state.mode === 'survival' ? `<span>Lives: ${state.lives}/${state.maxLives}</span>` : '';

  let optionsHTML = '';
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = currentQuestion.options[i];
    const isCorrect = i === currentQuestion.answer;
    const isSelected = i === state.selected;

    let btnClass = 'option-btn';
    let icon = '';

    if (state.answered || state.showExplanation) {
      if (isCorrect) {
        btnClass += ' option-correct';
        icon = '<span class="option-icon">✓</span>';
      } else if (isSelected && !isCorrect) {
        btnClass += ' option-wrong';
        icon = '<span class="option-icon">✗</span>';
      }
    }

    const letter = String.fromCharCode(65 + i);
    const disabled = (state.answered || state.showExplanation) ? 'disabled' : '';

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

  const explanationHTML = state.showExplanation && currentQuestion.explanation ? `
    <div class="explanation-box">
      <div class="explanation-header">
        <span class="explanation-icon">💡</span>
        <h4>Explanation</h4>
      </div>
      <p>${currentQuestion.explanation}</p>
      ${state.selected !== currentQuestion.answer ? 
        `<div class="correction-note">
          <span class="correction-icon">✅</span>
          Correct answer: <strong>${currentQuestion.options[currentQuestion.answer]}</strong>
        </div>` : ''
      }
    </div>
  ` : '';

  const backButtonHTML = state.practiceMode ? `
    <button class="practice-back-btn" onclick="exitPracticeMode()">
      ← Exit </button>
  ` : '';

  const timerOrIndicator = state.practiceMode ? `
    <div class="practice-mode-indicator">
      <div class="practice-icon">📚</div>
      <div>Practice Mode</div>
      <small>Unlimited Time</small>
    </div>
  ` : `
    <div class="timer-circle">
      <div class="timer-number">${state.timer}</div>
    </div>
  `;

  const showNextButton = (state.answered || state.showExplanation) && !(state.failed && !state.practiceMode);
  const nextBtnHTML = showNextButton ? `
    <button class="btn" onclick="nextQuestion()">
      ${state.currentQ + 1 < state.questions.length ? 'Next Question →' : 'Finish Quiz 🏁'}
    </button>
  ` : '';

  const failNotice = state.failed && !state.practiceMode ? `
    <div class="warning-box">
      <p class="warning-text">❌ Incorrect answer. Final score will appear shortly...</p>
    </div>
  ` : '';

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    ${timerOrIndicator}

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 15px; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <div class="progress-info">
          <span>${state.currentCourse.toUpperCase()}: ${state.currentQ + 1}/${state.questions.length}</span>
          <span>. Score: ${score}</span>
          <span>. Mode: ${modeLabel}</span>
          ${livesHTML}
          ${state.practiceMode ? `<span>  Mistakes: ${state.mistakes.length}</span>` : ''}
          <span>  Streak: ${state.currentStreak}</span>
        </div>
      </div>
      
      ${backButtonHTML}
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar-fill" style="width: ${progress}%"></div>
    </div>

    <div class="question-box">
      <div class="question-headline">
        <h3>${currentQuestion.question}</h3>
        ${currentQuestion.difficulty ? `<span class="question-tag">${currentQuestion.difficulty}</span>` : ''}
        ${currentQuestion.category ? `<span class="question-tag">${currentQuestion.category}</span>` : ''}
      </div>
    </div>

    ${currentQuestion.hint ? `
      <div class="hint-bar">
        <button class="btn btn-secondary" onclick="toggleHint()">
          ${state.showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>
      ${state.showHint ? `<div class="explanation-box"><strong>Hint:</strong> ${currentQuestion.hint}</div>` : ''}
    ` : ''}

    <div class="options-container">
      ${optionsHTML}
    </div>

    ${explanationHTML}
    ${failNotice}
    
    <div style="margin-top: 20px;">
      ${nextBtnHTML}
    </div>
    
  </div>
</div>
`;
}

function renderGameOverScreen() {
  const isPractice = state.practiceMode;
  const totalQuestions = state.questions.length;
  const correct = isPractice ? state.practiceScore : state.score;
  const percentage = totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(0) : 0;
  const course = courseBanks[state.currentCourse];
  
  let resultsHTML = '';
  
  if (isPractice && state.mistakes.length > 0) {
    resultsHTML = `
      <div class="mistakes-review">
        <h4>Areas to Review (${state.mistakes.length} mistake${state.mistakes.length > 1 ? 's' : ''}):</h4>
        <div class="mistakes-scroll-container">
          ${state.mistakes.map((mistake, i) => `
            <div class="mistake-item">
              <div class="mistake-question"><strong>${i + 1}.</strong> ${mistake.question}</div>
              <div class="mistake-detail">You chose: <span class="wrong-answer">${mistake.selectedOption}</span></div>
              <div class="mistake-detail">Correct: <span class="correct-answer">${mistake.correctOption}</span></div>
              ${mistake.explanation ? `<div class="explanation-detail">💡 ${mistake.explanation}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  const title = isPractice ? 
    (correct === totalQuestions ? 'Perfect Practice! 🎉' : 'Practice Complete! 📚') :
    (state.failed ? 'Game Over! ❌' : 'Quiz Complete! 🏆');

  if (!state.resultSaved) {
    saveGameResult();
    state.resultSaved = true;
  }

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">${course.icon}</div>
    
    <h2>${title}</h2>
    <p><strong>${state.courseName} (${state.currentCourse.toUpperCase()})</strong></p>
    
    <div class="score-display">
      <div class="score-number">${correct}/${totalQuestions}</div>
      <div class="score-percentage">${percentage}% Correct</div>
      <div class="score-details">Mode: ${MODE_CONFIGS[state.mode]?.label || (isPractice ? 'Practice' : 'Challenge')}</div>
      <div class="score-details">Best Streak: ${state.bestStreak}</div>
    </div>
    
    ${resultsHTML}
    
    <div class="button-group">
      <button class="btn btn-secondary" onclick="goToModeSelection()">Change Mode</button>
      <button class="btn btn-secondary" onclick="goToCourseSelection()">Change Course</button>
      ${isPractice ? `<button class="btn btn-secondary" onclick="exitPracticeMode()">← Exit Practice</button>` : ''}
    </div>
    
  </div>
</div>
`;
}

// ============================================
// MAIN RENDER FUNCTION
// ============================================
function render() {
  const root = document.getElementById('root');

  if (state.showingLogin) {
    root.innerHTML = renderLoginScreen();
  } else if (state.showingSignup) {
    root.innerHTML = renderSignupScreen();
  } else if (state.showingForgotPassword) {
    root.innerHTML = renderForgotPasswordScreen();
  } else if (!state.gameStarted && !state.showingModeSelection && !state.showingCourseSelection && !state.showingDifficultySelection) {
    root.innerHTML = renderStartScreen();
  } else if (state.showingCourseSelection) {
    root.innerHTML = renderCourseSelection();
  } else if (state.showingDifficultySelection) {
    root.innerHTML = renderDifficultySelection();
  } else if (state.showingModeSelection) {
    root.innerHTML = renderModeSelection();
  } else if (state.gameOver) {
    root.innerHTML = renderGameOverScreen();
  } else {
    root.innerHTML = renderQuizScreen();
  }
}

// ============================================
// KEYBOARD INTERACTIONS
// ============================================
document.addEventListener('keydown', (e) => {
  if (!state.gameStarted || state.gameOver) return;
  
  const key = e.key.toLowerCase();
  
  const keyMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
  
  if (keyMap.hasOwnProperty(key)) {
    const idx = keyMap[key];
    const currentQ = state.questions[state.currentQ];
    
    if (!state.answered && !state.showExplanation && idx < currentQ.options.length) {
      handleAnswer(idx);
    }
  }
  
  if (key === 'enter') {
    if ((state.answered || state.showExplanation) && !state.gameOver && !state.failed) {
      nextQuestion();
    }
  }
  
  if (key === ' ' && state.gameOver) {
    restart();
  }
});

// ============================================
// INITIALIZE APP
// ============================================
function initializeApp() {
  if (window.firebaseReady) {
    startApp();
  } else {
    window.addEventListener('firebaseReady', () => {
      startApp();
    });
  }
}

function startApp() {
  onAuthStateChanged(window.auth, (user) => {
    state.currentUser = user;
    if (user) {
      state.showingLogin = false;
      state.showingSignup = false;
      state.showingForgotPassword = false;
    } else {
      state.showingLogin = true;
    }
    render();
  });
  
  render();
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Expose functions to global scope for onclick handlers
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleForgotPassword = handleForgotPassword;
window.logout = logout;
window.showLogin = showLogin;
window.showSignup = showSignup;
window.showForgotPassword = showForgotPassword;
window.skipLogin = skipLogin;
window.selectCourse = selectCourse;
window.selectDifficulty = selectDifficulty;
window.proceedToModeSelection = proceedToModeSelection;
window.goToCourseSelection = goToCourseSelection;
window.goToDifficultySelection = goToDifficultySelection;
window.selectMode = selectMode;
window.handleAnswer = handleAnswer;
window.nextQuestion = nextQuestion;
window.restart = restart;
window.exitPracticeMode = exitPracticeMode;
window.toggleHint = toggleHint;
window.showCourseSelection = showCourseSelection;
window.goToModeSelection = goToModeSelection;