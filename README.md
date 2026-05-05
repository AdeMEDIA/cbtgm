# CBT Quiz Challenge

A comprehensive quiz game for CBT (Computer-Based Testing) with multiple game modes, achievements, and real-time multiplayer support.

## Features

- 🎯 **Multiple Game Modes**: Challenge, Practice, Survival, Marathon, Quickfire, Custom Timer
- 🏆 **Achievements & Badges**: Unlock rewards for different accomplishments
- 📊 **Statistics Tracking**: Personal best scores, streaks, and daily challenges
- 🎮 **Real Multiplayer**: Study with friends using WebRTC peer-to-peer connections
- 👤 **Login / Signup System**: Track your progress, badges, and high scores by account
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎵 **Audio Feedback**: Sound effects for correct/incorrect answers
- 🔍 **Advanced Filtering**: Filter by difficulty, categories, and question types
- 📝 **Review Mode**: Review mistakes and explanations
- 🎯 **Professional Flow**: Step-by-step selection process (Course → Difficulty → Mode)

## Setup

### Basic Setup
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start playing!

### Multiplayer Setup
For multiplayer functionality, you need to run a signaling server:

1. **Install Node.js** (if not already installed)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the signaling server**:
   ```bash
   npm start
   ```
4. **Open the game** in your browser at `http://localhost:3001`
5. **For multiplayer**:
   - Player 1 clicks "Study with a Friend" to create a session
   - Player 2 opens the shared link to join
   - Both players can now study together!

## Game Flow

The app follows a professional, step-by-step selection process:

1. **Start Screen**: View stats, badges, and choose to play solo or with a friend
2. **Course Selection**: Choose which subject/course to study
3. **Difficulty Selection**: Select Easy, Medium, or Hard difficulty level
4. **Game Mode Selection**: Choose your preferred game mode
5. **Quiz Gameplay**: Answer questions based on your selections
6. **Results & Review**: View score, review mistakes, earn badges

## Game Modes

- **Challenge**: Timed quiz with 15 seconds per question
- **Practice**: Unlimited time, learn at your own pace
- **Survival**: Lose a life for each wrong answer
- **Marathon**: Answer as many questions as possible
- **Quickfire**: Very fast-paced with 5-second timer
- **Custom Timer**: Set your own time limit

## Difficulty Levels

- **Easy**: Basic concepts, more time to think, great for beginners
- **Medium**: Balanced mix of topics, standard time pressure
- **Hard**: Complex problems, higher time pressure, expert level

## Courses Available

- GST101: Use of English
- BIO101: General Biology
- PHY101: General Physics
- MLS101: Medical Laboratory Science
- GST103: Introduction to Philosophy
- ENT101: Introduction to Entrepreneurship
- MTH101: Elementary Mathematics

## Multiplayer Features

- **Real-time Chat**: Discuss questions with your study partner
- **Synchronized Gameplay**: Both players see the same questions
- **Peer-to-Peer**: No external servers needed for gameplay
- **Session Management**: Create or join study sessions with unique IDs

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

WebRTC multiplayer requires a modern browser with WebRTC support.

## Development

### File Structure
```
├── index.html              # Main HTML file
├── app.js                  # Game logic and state management
├── style.css               # Styling and responsive design
├── signaling-server.js     # WebRTC signaling server
├── package.json            # Node.js dependencies
├── questions_*.js          # Question banks for each course
└── README.md              # This file
```

### Adding New Courses

1. Create a new `questions_[course].js` file
2. Follow the existing format:
```javascript
const questions_[course] = [
  {
    question: "Question text?",
    options: ["A", "B", "C", "D"],
    answer: 0, // Index of correct answer
    explanation: "Explanation text",
    category: "category_name",
    difficulty: "easy|medium|hard"
  }
];
```

3. Add the course to `courseBanks` in `app.js`
4. Include the script in `index.html`

## Troubleshooting

### Multiplayer Issues
- Make sure the signaling server is running (`npm start`)
- Both players must be able to access the same server
- Check browser console for WebRTC errors
- Ensure firewall allows WebSocket connections on port 3002

### Game Issues
- Clear browser cache if styles don't load
- Check browser console for JavaScript errors
- Ensure all question bank files are loaded

## License

MIT License - feel free to use and modify!