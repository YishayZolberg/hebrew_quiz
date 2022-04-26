import React from 'react'
import localDb from '../data/Data'
function Question({ currentQuestion, length, handleClick }) {
  return (
    <>
      <div className='question-section'>
        <div className='question-count'>
          <span>שאלה {currentQuestion + 1}</span>/{length}
        </div>
        <div className='question-text'>
          {localDb[currentQuestion].questionText}
        </div>
      </div>
      <div className='answer-section'>
        {localDb[currentQuestion].answerOptions.map((answerOption, index) => (
          <button
            key={index}
            onClick={() => handleClick(answerOption.isCorrect)}
          >
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </>
  )
}

export default Question
