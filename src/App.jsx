import { useState } from 'react';
import './App.css';

function App() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [quizMode, setQuizMode] = useState(false);

  // Colors for the buttons
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FDCB6E', // Yellow
    '#6C5CE7', // Purple
    '#A8E6CF', // Mint
    '#FD79A8', // Pink
    '#00B894'  // Green
  ];

  const renderMainMenu = () => (
    <div className="main-menu">
      <h1 className="title bounce">✨ 알록달록 구구단 놀이! ✨</h1>
      <p className="subtitle">배우고 싶은 숫자를 골라볼까요?</p>
      
      <div className="number-grid">
        {[2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
          <button
            key={num}
            className="number-btn pop-anim"
            style={{ backgroundColor: colors[index], borderBottom: `6px solid ${adjustColor(colors[index], -30)}` }}
            onClick={() => setSelectedNumber(num)}
          >
            {num}단
          </button>
        ))}
      </div>
    </div>
  );

  const renderTable = () => (
    <div className="table-view">
      <button className="back-btn pop-anim" onClick={() => setSelectedNumber(null)}>
        ⬅️ 뒤로가기
      </button>
      
      <h2 className="table-title bounce" style={{ color: colors[selectedNumber - 2] }}>
        🌟 {selectedNumber}단 🌟
      </h2>
      
      <div className="equations-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div 
            key={i} 
            className="equation-card slide-up"
            style={{ 
              animationDelay: `${i * 0.1}s`,
              backgroundColor: '#fff',
              borderColor: colors[selectedNumber - 2]
            }}
          >
            <span className="num1">{selectedNumber}</span>
            <span className="operator">×</span>
            <span className="num2">{i}</span>
            <span className="equals">=</span>
            <span className="result" style={{ color: colors[selectedNumber - 2] }}>{selectedNumber * i}</span>
          </div>
        ))}
      </div>
      
      <button 
        className="quiz-btn pop-anim" 
        style={{ backgroundColor: '#FF9F43', borderBottom: '6px solid #E58E26' }}
        onClick={() => setQuizMode(true)}
      >
        🎯 {selectedNumber}단 퀴즈 풀기!
      </button>
    </div>
  );

  const renderQuizMode = () => {
    // A simplified placeholder for now
    return (
      <div className="quiz-view">
         <button className="back-btn pop-anim" onClick={() => setQuizMode(false)}>
          ⬅️ 구구단 보기
        </button>
        <h2 className="title bounce">🎯 {selectedNumber}단 퀴즈 시간! 🎯</h2>
        <div className="quiz-container">
            <p className="quiz-question">{selectedNumber} × ? = 알아맞혀보세요!</p>
            <p>(아직 준비 중이에요 😅 다른 단을 외워봐요!)</p>
        </div>
      </div>
    );
  };

  // Helper function to darken color for 3D button effect
  function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  return (
    <div className="app-container">
      {!selectedNumber && renderMainMenu()}
      {selectedNumber && !quizMode && renderTable()}
      {selectedNumber && quizMode && renderQuizMode()}
    </div>
  );
}

export default App;
