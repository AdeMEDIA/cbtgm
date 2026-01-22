const { useState, useEffect } = React;
const { CheckCircle, XCircle, Trophy, Clock, RotateCcw, Zap, Target } = lucide;

// ============================================
// YOUR QUESTION BANK - EDIT HERE
// ============================================
const questionBank = [
{
id: 1,
question: “The world’s first computer bug is”,
options: [“A Moth”, “The Morris worm”, “Y2K Bug”, “Functional Bugs”],
correctAnswer: 0
},
{
id: 2,
question: “What does HTML stand for?”,
options: [“Hyper Text Markup Language”, “High Tech Modern Language”, “Home Tool Markup Language”, “Hyperlinks and Text Markup Language”],
correctAnswer: 0
},
{
id: 3,
question: “Which company developed JavaScript?”,
options: [“Microsoft”, “Netscape”, “Oracle”, “Sun Microsystems”],
correctAnswer: 1
},
{
id: 4,
question: “What is the brain of a computer?”,
options: [“Hard Drive”, “RAM”, “CPU”, “Motherboard”],
correctAnswer: 2
},
{
id: 5,
question: “What does CPU stand for?”,
options: [“Central Processing Unit”, “Computer Personal Unit”, “Central Processor Utility”, “Core Processing Unit”],
correctAnswer: 0
},
// ADD MORE QUESTIONS BELOW - Just copy the format above
];

// ============================================
// MAIN APP COMPONENT
// ============================================
function CBTGame() {
const [questions, setQuestions] = useState([]);
const [currentQ, setCurrentQ] = useState(0);
const [score, setScore] = useState(0);
const [selected, setSelected] = useState(null);
const [answered, setAnswered] = useState(false);
const [gameOver, setGameOver] = useState(false);
const [timer, setTimer] = useState(15);
const [gameStarted, setGameStarted] = useState(false);
const [failed, setFailed] = useState(false);

// Start game and shuffle questions
const startGame = () => {
const shuffled = […questionBank].sort(() => Math.random() - 0.5);
const selected = shuffled.slice(0, Math.min(100, questionBank.length));
setQuestions(selected);
setGameStarted(true);
setTimer(15);
};

// Timer countdown
useEffect(() => {
if (!gameStarted || gameOver || answered) return;

```
if (timer === 0) {
  setFailed(true);
  setGameOver(true);
  return;
}

const interval = setInterval(() => {
  setTimer(t => t - 1);
}, 1000);

return () => clearInterval(interval);
```

}, [timer, gameStarted, gameOver, answered]);

// Handle answer selection
const handleAnswer = (idx) => {
if (answered) return;

```
setSelected(idx);
setAnswered(true);

const isCorrect = idx === questions[currentQ].correctAnswer;

if (isCorrect) {
  setScore(score + 1);
} else {
  setTimeout(() => {
    setFailed(true);
    setGameOver(true);
  }, 1500);
}
```

};

// Move to next question
const nextQuestion = () => {
if (currentQ + 1 < questions.length) {
setCurrentQ(currentQ + 1);
setSelected(null);
setAnswered(false);
setTimer(15);
} else {
setGameOver(true);
}
};

// Restart game
const restart = () => {
setCurrentQ(0);
setScore(0);
setSelected(null);
setAnswered(false);
setGameOver(false);
setTimer(15);
setGameStarted(false);
setFailed(false);
};

// ============================================
// START SCREEN
// ============================================
if (!gameStarted) {
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
<div className="absolute inset-0 overflow-hidden">
<div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
<div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
</div>

```
    <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-white/20">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          CBT Quiz Challenge
        </h1>
        <p className="text-white/90 text-lg mb-8">
          Answer questions before time runs out!
        </p>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/30">
          <div className="grid grid-cols-2 gap-4 text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-300" />
              <div className="text-left">
                <p className="text-sm opacity-80">Time per Question</p>
                <p className="font-bold text-xl">15 seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-300" />
              <div className="text-left">
                <p className="text-sm opacity-80">Total Questions</p>
                <p className="font-bold text-xl">{Math.min(100, questionBank.length)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 mb-6 border border-red-400/30">
          <p className="text-red-200 font-semibold flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            One wrong answer or timeout = Game Over!
          </p>
        </div>

        <button
          onClick={startGame}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
        >
          Start Quiz
        </button>
      </div>
    </div>
  </div>
);
```

}

// ============================================
// GAME OVER SCREEN
// ============================================
if (gameOver) {
const percentage = questions.length > 0 ? ((score / questions.length) * 100).toFixed(0) : 0;

```
return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    </div>

    <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-white/20">
      <div className="text-center">
        {failed ? (
          <>
            <div className="mb-6 flex justify-center">
              <div className="bg-red-500 p-4 rounded-full">
                <XCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-white/80 mb-6">
              {timer === 0 ? "Time ran out!" : "Wrong answer!"}
            </p>
          </>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full animate-bounce">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Perfect Score! 🎉</h2>
          </>
        )}

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/30">
          <p className="text-6xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2">
            {score}/{questions.length}
          </p>
          <p className="text-white/90 text-lg">
            Score: {percentage}%
          </p>
          <div className="mt-4 text-white/70">
            Questions Answered: {currentQ + 1}
          </div>
        </div>

        <button
          onClick={restart}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-6 h-6" />
          Try Again
        </button>
      </div>
    </div>
  </div>
);
```

}

// ============================================
// QUIZ SCREEN
// ============================================
const currentQuestion = questions[currentQ];
const progress = ((currentQ + 1) / questions.length) * 100;

return (
<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
<div className="absolute inset-0 overflow-hidden">
<div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
<div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
</div>

```
  <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 max-w-3xl w-full border border-white/20">
    {/* Timer */}
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-8 border-white/20 flex items-center justify-center">
          <span className={`text-3xl font-bold ${timer <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {timer}
          </span>
        </div>
      </div>
    </div>

    {/* Progress Info */}
    <div className="flex justify-between items-center mb-4 text-white/90">
      <span className="font-semibold">Question {currentQ + 1}/{questions.length}</span>
      <span className="font-semibold">Score: {score}</span>
    </div>

    {/* Progress Bar */}
    <div className="w-full bg-white/20 rounded-full h-3 mb-8">
      <div 
        className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>

    {/* Question */}
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/30">
      <h3 className="text-2xl font-bold text-white">{currentQuestion.question}</h3>
    </div>

    {/* Options */}
    <div className="space-y-3 mb-6">
      {currentQuestion.options.map((option, idx) => {
        const isCorrect = idx === currentQuestion.correctAnswer;
        const isSelected = idx === selected;
        
        let bgColor = 'bg-white/10 hover:bg-white/20 border-white/30';
        let icon = null;

        if (answered) {
          if (isCorrect) {
            bgColor = 'bg-green-500/30 border-green-400';
            icon = <CheckCircle className="w-6 h-6 text-green-300" />;
          } else if (isSelected) {
            bgColor = 'bg-red-500/30 border-red-400';
            icon = <XCircle className="w-6 h-6 text-red-300" />;
          }
        }

        return (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={answered}
            className={`w-full p-4 rounded-xl border-2 ${bgColor} backdrop-blur-md text-left font-semibold text-white transition-all transform hover:scale-102 ${!answered ? 'cursor-pointer' : 'cursor-default'} flex items-center justify-between`}
          >
            <span className="flex items-center gap-3">
              <span className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </span>
            {icon}
          </button>
        );
      })}
    </div>

    {/* Next Button */}
    {answered && !failed && (
      <button
        onClick={nextQuestion}
        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
      >
        {currentQ + 1 < questions.length ? 'Next Question →' : 'See Results 🏆'}
      </button>
    )}
  </div>
</div>
```

);
}

// ============================================
// RENDER APP
// ============================================
const root = ReactDOM.createRoot(document.getElementById(‘root’));
root.render(<CBTGame />);