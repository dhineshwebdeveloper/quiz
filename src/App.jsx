import { useEffect, useState } from 'react';
import './App.css';
import questionsData from './questions.json';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showscore, setShowscore] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);

  // Timer countdown logic
  useEffect(() => {
    let interval;

    if (timer > 0 && !showscore) {
      interval = setInterval(() => {
        setTimer((prevValue) => prevValue - 1);
      }, 1000);
    } else if (timer === 0 && !showscore) {
      handleNextQuestion(); // Automatically move to the next question
    }

    return () => clearInterval(interval);
  }, [timer, showscore]);

  const handleAnswerclick = (selectedOption) => {
    if (selectedOption === questionsData[currentQuestion].correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10); // Reset the timer for the next question
    } else {
      setShowscore(true); // End the quiz
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setShowscore(false);
    setScore(0);
    setTimer(10);
  };

  return (
    <div className="quiz-app">
      {showscore ? (
        <div className="score-section">
          <h2>Your Score: {score}/{questionsData.length}</h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questionsData[currentQuestion].question}</p>
          <div className="option">
            {questionsData[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerclick(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">
            Time Left: <span>{timer}s</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
