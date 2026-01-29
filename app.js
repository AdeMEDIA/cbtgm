// app.js - WITH COURSE SELECTION AND EXIT PRACTICE BUTTON (FIXED)
// NOW WITH MULTIPLAYER MODE ADDED

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
// MULTIPLAYER STATE (NEW)
// ============================================
let multiplayer = {
  sessionId: null,
  isHost: false,
  partnerConnected: false,
  inMultiplayerMode: false,
  chatMessages: []
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
  },
  'mls101': {
  name: 'Introduction to Medical Lab I',
  questions: questionBankMLS101,
  icon: '🔬',
  color: 'course-mls'
},
'gst103': {
  name: 'Use of Library and Act',
  questions: questionBankGST103, // From questions_gst103.js
  icon: '📚',
  color: 'course-gst'
},
'ent101': {
  name: 'ENTREPRENUERSHIP',
  questions: questionBankENT101, // From questions_gst103.js
  icon: '📚',
  color: 'course-gst'
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
  const selectedQuestions = shuffledQuestions.slice(0, Math.min(150, courseQuestions.length));
  
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
// MULTIPLAYER FUNCTIONS (NEW - ADDED)
// ============================================

// Create a new multiplayer session
async function createMultiplayerSession() {
  console.log("Creating multiplayer session...");
  
  if (!window.firebaseDB) {
    alert("Firebase not loaded yet! Wait a moment and try again.");
    return;
  }
  
  try {
    // Import Firebase functions
    const { ref, set, onValue } = await import("https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js");
    
    // Generate session ID
    const sessionId = Math.random().toString(36).substring(2, 8);
    multiplayer.sessionId = sessionId;
    multiplayer.isHost = true;
    multiplayer.inMultiplayerMode = true;
    
    console.log("Session ID:", sessionId);
    
    // Create session in Firebase
    const sessionRef = ref(window.firebaseDB, 'sessions/' + sessionId);
    await set(sessionRef, {
      created: new Date().toISOString(),
      hostConnected: true,
      guestConnected: false,
      currentQuestion: 0,
      messages: []
    });
    
    // Create shareable link
    const shareLink = `https://cbtgm.vercel.app/?session=${sessionId}`;
    
    // Show popup with link
    showMultiplayerLink(shareLink, sessionId);
    
    // Listen for partner
    listenForPartner(sessionId);
    
  } catch (error) {
    console.error("Multiplayer error:", error);
    alert("Error creating session. Check console.");
  }
}

// Show multiplayer link popup
function showMultiplayerLink(link, sessionId) {
  // Remove any existing modal
  const existingModal = document.querySelector('.multiplayer-modal');
  if (existingModal) existingModal.remove();
  
  const modalHTML = `
    <div class="multiplayer-modal">
      <div class="modal-content">
        <h3>🎮 Invite a Study Partner</h3>
        <p>Share this link to study together:</p>
        
        <div class="link-box">
          <input type="text" value="${link}" readonly id="session-link">
          <button onclick="copyMultiplayerLink()">Copy</button>
        </div>
        
        <p class="session-id">Session ID: <strong>${sessionId}</strong></p>
        <p class="waiting-text">⏳ Waiting for partner to join...</p>
        
        <div class="modal-buttons">
          <button class="btn" onclick="startMultiplayerStudy()">Start Study Session</button>
          <button class="btn-secondary" onclick="closeMultiplayerModal()">Cancel</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Copy link to clipboard
function copyMultiplayerLink() {
  const linkInput = document.getElementById('session-link');
  if (linkInput) {
    linkInput.select();
    document.execCommand('copy');
    alert("✅ Link copied to clipboard!");
  }
}

// Close multiplayer modal
function closeMultiplayerModal() {
  const modal = document.querySelector('.multiplayer-modal');
  if (modal) modal.remove();
  multiplayer.inMultiplayerMode = false;
}

// Listen for partner joining
async function listenForPartner(sessionId) {
  try {
    const { ref, onValue } = await import("https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js");
    
    const sessionRef = ref(window.firebaseDB, 'sessions/' + sessionId);
    
    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.guestConnected) {
        multiplayer.partnerConnected = true;
        
        // Update waiting text
        const waitingText = document.querySelector('.waiting-text');
        if (waitingText) {
          waitingText.innerHTML = "✅ Partner connected! Ready to study!";
        }
      }
    });
  } catch (error) {
    console.error("Error listening for partner:", error);
  }
}

// Start multiplayer study
function startMultiplayerStudy() {
  closeMultiplayerModal();
  alert("🎮 Multiplayer mode ready!\n\n1. Share the link with your friend\n2. Select a course together\n3. Discuss questions in chat (coming soon!)");
  
  // Go to course selection
  state.showingCourseSelection = true;
  state.showingModeSelection = false;
  state.gameStarted = false;
  render();
}

// Check URL for session join
function checkForJoinSession() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session');
  
  if (sessionId && sessionId.length === 6) {
    joinMultiplayerSession(sessionId);
  }
}

// Join existing session
async function joinMultiplayerSession(sessionId) {
  console.log("Joining session:", sessionId);
  
  if (!window.firebaseDB) {
    setTimeout(() => joinMultiplayerSession(sessionId), 1000);
    return;
  }
  
  try {
    const { ref, set, get } = await import("https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js");
    
    const sessionRef = ref(window.firebaseDB, 'sessions/' + sessionId);
    const snapshot = await get(sessionRef);
    
    if (snapshot.exists()) {
      // Mark as guest connected
      await set(ref(window.firebaseDB, 'sessions/' + sessionId + '/guestConnected'), true);
      
      multiplayer.sessionId = sessionId;
      multiplayer.isHost = false;
      multiplayer.inMultiplayerMode = true;
      
      alert(`✅ Joined study session: ${sessionId}\n\nYou are the study partner. Wait for host to select a course.`);
      
      // Listen for host actions
      listenForHostActions(sessionId);
      
    } else {
      alert("❌ Session not found or expired.");
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } catch (error) {
    console.error("Join error:", error);
    alert("Error joining session.");
  }
}

// Listen for host actions
async function listenForHostActions(sessionId) {
  try {
    const { ref, onValue } = await import("https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js");
    
    const sessionRef = ref(window.firebaseDB, 'sessions/' + sessionId);
    
    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // You can add sync logic here later
        console.log("Session updated:", data);
      }
    });
  } catch (error) {
    console.error("Listen error:", error);
  }
}

// Exit multiplayer mode
function exitMultiplayerMode() {
  multiplayer = {
    sessionId: null,
    isHost: false,
    partnerConnected: false,
    inMultiplayerMode: false,
    chatMessages: []
  };
  
  // Clean URL
  window.history.replaceState({}, document.title, window.location.pathname);
  
  alert("Left multiplayer session.");
  render();
}

// ============================================
// RENDER FUNCTIONS (UPDATED WITH MULTIPLAYER)
// ============================================
function renderStartScreen() {
  // Check if we're in multiplayer mode
  let multiplayerIndicator = '';
  let multiplayerButton = '';
  
  if (multiplayer.inMultiplayerMode) {
    multiplayerIndicator = `
      <div class="multiplayer-status">
        <span class="multiplayer-badge">🎮 STUDY SESSION</span>
        <p>Session ID: <strong>${multiplayer.sessionId}</strong></p>
        <p>You are the ${multiplayer.isHost ? 'HOST' : 'PARTNER'}</p>
        <button class="btn-secondary" onclick="exitMultiplayerMode()" style="margin: 10px 0;">
          Leave Session
        </button>
      </div>
    `;
  }
  
  // Different button for multiplayer vs single player
  if (multiplayer.inMultiplayerMode) {
    multiplayerButton = `
      <button class="btn multiplayer-btn" onclick="showCourseSelection()" 
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        🎮 Select Course (Multiplayer)
      </button>
    `;
  } else {
    multiplayerButton = `
      <button class="btn multiplayer-btn" onclick="createMultiplayerSession()" 
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin-top: 10px;">
        🎮 Study with a Friend
      </button>
    `;
  }

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">🏆</div>
    <h1>CBT Quiz Challenge</h1>
    <p>Test your knowledge across multiple courses with timed challenges or practice mode</p>
    
    ${multiplayerIndicator}
    
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <div class="stat-label">Multiple Courses</div>
          <div class="stat-value">GST101, BIO101+</div>
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
    
    ${multiplayerButton}
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

  // Multiplayer indicator
  const multiplayerHeader = multiplayer.inMultiplayerMode ? `
    <div class="multiplayer-header">
      <span class="multiplayer-tag">🎮 Multiplayer Session</span>
      <p><small>Session ID: ${multiplayer.sessionId} • You are ${multiplayer.isHost ? 'Host' : 'Partner'}</small></p>
    </div>
  ` : '';

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">📚</div>
    <h1>Select Course</h1>
    ${multiplayerHeader}
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
    
    ${multiplayer.inMultiplayerMode ? `
      <button class="btn-secondary" onclick="exitMultiplayerMode()" style="margin-top: 10px;">
        Leave Multiplayer Session
      </button>
    ` : ''}
  </div>
</div>
`;
}

function renderModeSelection() {
  const course = courseBanks[state.currentCourse];
  
  // Multiplayer indicator
  const multiplayerInfo = multiplayer.inMultiplayerMode ? `
    <div class="multiplayer-notice">
      <p><strong>🎮 Multiplayer Mode Active</strong></p>
      <p>Both players will see the same questions. Discuss answers together!</p>
    </div>
  ` : '';

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">${course.icon}</div>
    <h1>Select Game Mode</h1>
    <p>Playing: <strong>${state.courseName} (${state.currentCourse.toUpperCase()})</strong></p>
    
    ${multiplayerInfo}
    
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
    
    ${multiplayer.inMultiplayerMode ? `
      <button class="btn-secondary" onclick="exitMultiplayerMode()" style="margin-top: 10px;">
        Leave Multiplayer Session
      </button>
    ` : ''}
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

  // Multiplayer indicator in quiz
  const multiplayerIndicator = multiplayer.inMultiplayerMode ? `
    <div class="multiplayer-quiz-badge">
      🎮 Study Session • ${multiplayer.isHost ? 'Host' : 'Partner'} • ID: ${multiplayer.sessionId}
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
    ${multiplayerIndicator}

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
    
    ${multiplayer.inMultiplayerMode ? `
      <div style="margin-top: 20px; text-align: center;">
        <small>🎮 Discuss this question with your study partner!</small>
      </div>
    ` : ''}
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
    (state.failed ? 'Game Over! ❌' : 'Perfect Score! 🏆');

  // Multiplayer finish message
  const multiplayerFinish = multiplayer.inMultiplayerMode ? `
    <div class="multiplayer-finish">
      <p>🎮 <strong>Study Session Complete!</strong></p>
      <p>Discuss your results with your partner!</p>
    </div>
  ` : '';

  return `
<div class="bg-blob blob-1"></div>
<div class="bg-blob blob-2"></div>
<div class="container">
  <div class="glass-card">
    <div class="icon-container">${course.icon}</div>
    
    <h2>${title}</h2>
    <p><strong>${state.courseName} (${state.currentCourse.toUpperCase()})</strong></p>
    
    ${multiplayerFinish}
    
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
    
    ${multiplayer.inMultiplayerMode ? `
      <button class="btn" onclick="exitMultiplayerMode()" style="margin-top: 20px;">
        🎮 End Study Session
      </button>
    ` : ''}
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
// INITIALIZE APP & MULTIPLAYER
// ============================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    render();
    // Check for join session after a short delay
    setTimeout(checkForJoinSession, 1500);
  });
} else {
  render();
  setTimeout(checkForJoinSession, 1500);
}

// ============================================
// ADD MULTIPLAYER CSS (injected automatically)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const multiplayerStyles = `
    .multiplayer-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      padding: 20px;
    }
    
    .modal-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      border-radius: 20px;
      max-width: 500px;
      width: 100%;
      color: white;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    .link-box {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    
    .link-box input {
      flex: 1;
      padding: 12px 15px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      background: rgba(255,255,255,0.9);
    }
    
    .link-box button {
      padding: 12px 20px;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .link-box button:hover {
      transform: scale(1.05);
    }
    
    .session-id {
      background: rgba(255, 255, 255, 0.2);
      padding: 10px 15px;
      border-radius: 10px;
      margin: 15px 0;
      font-family: monospace;
      font-size: 18px;
    }
    
    .waiting-text {
      font-size: 18px;
      margin: 20px 0;
      padding: 10px;
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
    }
    
    .modal-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 25px;
    }
    
    .multiplayer-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 10px auto;
      transition: all 0.3s;
    }
    
    .multiplayer-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }
    
    .multiplayer-status {
      background: rgba(102, 126, 234, 0.1);
      border: 2px solid #667eea;
      border-radius: 15px;
      padding: 15px;
      margin: 15px 0;
      text-align: center;
    }
    
    .multiplayer-badge {
      background: #667eea;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 10px;
    }
    
    .multiplayer-header {
      background: rgba(102, 126, 234, 0.1);
      padding: 10px;
      border-radius: 10px;
      margin: 10px 0;
    }
    
    .multiplayer-tag {
      background: #667eea;
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: bold;
    }
    
    .multiplayer-notice {
      background: rgba(255, 193, 7, 0.1);
      border: 2px solid #ffc107;
      border-radius: 10px;
      padding: 15px;
      margin: 15px 0;
      text-align: center;
    }
    
    .multiplayer-quiz-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 15px;
    }
    
    .multiplayer-finish {
      background: rgba(102, 126, 234, 0.1);
      border-radius: 15px;
      padding: 15px;
      margin: 15px 0;
      text-align: center;
    }
  `;
  
  // Add styles if not already added
  if (!document.querySelector('#multiplayer-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'multiplayer-styles';
    styleEl.textContent = multiplayerStyles;
    document.head.appendChild(styleEl);
  }
});

console.log("✅ App.js loaded with multiplayer mode!");
