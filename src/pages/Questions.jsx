import React from 'react'
import { useState, useEffect } from 'react'
import localDb from '../data/Data'
import Question from './Question'
import FinalScore from './FinalScore'
function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < localDb.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className='app'>
      {showScore ? (
        <FinalScore score={score} number={localDb.length} />
      ) : (
        <Question
          currentQuestion={currentQuestion}
          length={localDb.length}
          handleClick={handleClick}
        />
      )}
    </div>
  )
}

export default Questions
