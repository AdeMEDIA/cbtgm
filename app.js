// app.js - WITH COURSE SELECTION AND EXIT PRACTICE BUTTON (FIXED)

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
  reviewMode: false,
  timerInterval: null,
  
  // Practice mode properties
  practiceMode: false,
  mistakes: [],
  practiceScore: 0,
  showExplanation: false,
  
  // Navigation states
  showingModeSelection: false,
  showingCourseSelection: false,
  
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
    questions: questionBankGST101, // From questions_gst101.js
    icon: '📚',
    color: 'course-gst'
  },
  'bio101': {
    name: 'General Biology I',
    questions: questionBankBIO101, // From questions_bio101.js
    icon: '🧬',
    color: 'course-bio'
  },
  'phy101': {
    name: 'General Physics I',
    questions: questionBankPHY101,
    icon: '⚛️',
    color: 'course-phy'
  }
  // Add more courses here as you create question files
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

function selectCourse(courseId) {
  state.currentCourse = courseId;
  state.courseName = courseBanks[courseId].name;
  state.showingCourseSelection = false;
  state.showingModeSelection = true;
  render();
}

function selectMode(mode) {
  state.practiceMode = (mode === 'practice');
  state.timer = 15;
  state.showingModeSelection = false;
  startGame();
}

function startGame() {
  // Get questions for selected course
  const course = courseBanks[state.currentCourse];
  const courseQuestions = course.questions;
  
  // Reset state
  const shuffledQuestions = shuffleArray(courseQuestions);
  const selectedQuestions = shuffledQuestions.slice(0, Math.min(100, courseQuestions.length));
  
  const processedQuestions = selectedQuestions.map(question => {
    return shuffleOptions(question);
  });

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
  state.gameStarted = true;
  state.timer = 15;
  
  // FIRST render
  render();
  
  // THEN start timer AFTER DOM is ready
  if (!state.practiceMode) {
    setTimeout(() => {
      startTimer();
    }, 10);
  }
}

// ============================================
// TIMER FUNCTIONS (unchanged from working version)
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
  
  timerNumber.textContent = '15';
  state.timer = 15;

  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 120;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  timerCircle.prepend(canvas);
  
  const ctx = canvas.getContext('2d');
  const radius = canvas.width / 2 - 8;
  const totalTime = 15;
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
// ANSWER HANDLING (unchanged)
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
    if (state.practiceMode) {
      state.practiceScore++;
      state.showExplanation = true;
    }
    render();
  } else {
    if (state.practiceMode) {
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
      render();

      setTimeout(() => {
        state.reviewMode = false;
        state.gameOver = true;
        render();
      }, 5000);
    }
  }
}

// ============================================
// NEW FUNCTION: Exit to Game Mode Selection (SIMPLIFIED)
// ============================================
function exitPracticeMode() {
  console.log("Exit practice mode clicked!");
  
  if (state.timerInterval) {
    cancelAnimationFrame(state.timerInterval);
    state.timerInterval = null;
  }
  
  // Simple confirmation - always go to mode selection
  state.gameStarted = false;
  state.showingModeSelection = true;
  state.showingCourseSelection = false;
  
  // Keep the current course selected
  // Don't reset currentCourse or courseName
  
  console.log("Going to mode selection for course:", state.currentCourse);
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
    
    render();
    
    if (!state.practiceMode) {
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
    showingModeSelection: false,
    showingCourseSelection: false,
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

function goToCourseSelection() {
  if (state.timerInterval) cancelAnimationFrame(state.timerInterval);
  
  state.showingCourseSelection = true;
  state.showingModeSelection = false;
  state.gameStarted = false;
  render();
}

function showModeSelection() {
  state.showingModeSelection = true;
  state.showingCourseSelection = false;
  render();
}

function showCourseSelection() {
  state.showingCourseSelection = true;
  render();
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderStartScreen() {
  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">🏆</div>
    <h1>CBT Quiz Challenge</h1>
    <p>Test your knowledge across multiple courses with timed challenges or practice mode</p>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <div class="stat-label">Multiple Courses</div>
          <div class="stat-value">GST101, BIO101+</div>
          <!-- <div class="stat-note">More coming soon</div> -->
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🎮</div>
        <div class="stat-content">
          <div class="stat-label">Two Game Modes</div>
          <div class="stat-value">Challenge & Practice</div>
          <div class="stat-note">Test speed or learn</div>
        </div>
      </div>
    </div>

    <div class="warning-box">
      <p class="warning-text">
        ⚡ Select a course to begin your challenge!
      </p>
    </div>

    <button class="btn" onclick="showCourseSelection()">Select Course</button>
  </div>
</div>
`;
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
      
      <!-- Coming soon courses -->
      <div class="course-card course-mth">
        <div class="course-icon">∫</div>
        <div class="course-code">MTH101</div>
        <div class="course-title">General Mathematics I</div>
        <div class="course-stats">
          <div class="course-stat">
            <span>⏳</span>
            <span>Coming soon</span>
          </div>
        </div>
        <div class="course-highlight" style="background: rgba(59, 130, 246, 0.2); color: #3b82f6;">
          Soon
        </div>
      </div>
      <div class="course-card course-chem" style="opacity: 0.6; cursor: not-allowed;">
        <div class="course-icon">🧪</div>
        <div class="course-code">CHM101</div>
        <div class="course-title">General Chemistry I</div>
        <div class="course-stats">
          <div class="course-stat">
            <span>⏳</span>
            <span>Coming soon</span>
          </div>
        </div>
        <div class="course-highlight" style="background: rgba(168, 85, 247, 0.2); color: #a855f7;">
          Soon
        </div>
      </div>
    </div>
    
    <button class="btn btn-back" onclick="state.showingCourseSelection = false; render()">
      ← Back to Start
    </button>
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
    
    <div class="mode-options">
      <div class="mode-card" onclick="selectMode('challenge')">
        <div class="mode-icon">⚡</div>
        <h3>Challenge Mode</h3>
        <p><strong>15 seconds per question</strong></p>
        <p>One wrong answer or timeout = Game Over!</p>
        <p>Test your speed and accuracy</p>
        <div class="mode-highlight">High Pressure</div>
      </div>
      
      <div class="mode-card" onclick="selectMode('practice')">
        <div class="mode-icon">📚</div>
        <h3>Practice Mode</h3>
        <p><strong>Unlimited time</strong></p>
        <p>Learn from mistakes with explanations</p>
        <p>Track progress and review weak areas</p>
        <div class="mode-highlight">Learning Focus</div>
      </div>
    </div>
    
    <div class="button-group">
      <button class="btn btn-secondary" onclick="goToCourseSelection()">
        ← Change Course
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

  // SIMPLIFIED Back button for practice mode
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

  const nextBtnHTML = (state.answered || state.showExplanation) ? `
    <button class="btn" onclick="nextQuestion()">
      ${state.currentQ + 1 < state.questions.length ? 'Next Question →' : 'Finish Quiz 🏁'}
    </button>
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
          ${state.practiceMode ? `<span>  Mistakes: ${state.mistakes.length}</span>` : ''}
        </div>
      </div>
      
      ${backButtonHTML}
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

    ${explanationHTML}
    
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
        ${state.mistakes.slice(0, 3).map((mistake, i) => `
          <div class="mistake-item">
            <div class="mistake-question"><strong>${i + 1}.</strong> ${mistake.question.substring(0, 80)}...</div>
            <div class="mistake-detail">You chose: <span class="wrong-answer">${mistake.selectedOption}</span></div>
            <div class="mistake-detail">Correct: <span class="correct-answer">${mistake.correctOption}</span></div>
          </div>
        `).join('')}
        ${state.mistakes.length > 3 ? 
          `<p class="more-mistakes">...and ${state.mistakes.length - 3} more mistake${state.mistakes.length - 3 > 1 ? 's' : ''} to review</p>` : ''}
      </div>
    `;
  }

  const title = isPractice ? 
    (correct === totalQuestions ? 'Perfect Practice! 🎉' : 'Practice Complete! 📚') :
    (state.failed ? 'Game Over! ❌' : 'Perfect Score! 🏆');

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
      <div class="score-details">Mode: ${isPractice ? 'Practice' : 'Challenge'}</div>
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
  
  if (!state.gameStarted && !state.showingModeSelection && !state.showingCourseSelection) {
    root.innerHTML = renderStartScreen();
  } else if (state.showingCourseSelection) {
    root.innerHTML = renderCourseSelection();
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
    if ((state.answered || state.showExplanation) && !state.gameOver) {
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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}

// Debug helper - check if functions are available
console.log("exitPracticeMode function available:", typeof exitPracticeMode);