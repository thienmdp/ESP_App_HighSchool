import { useState } from 'react'
import Result from './Result'

const initialResult = { score: 0, correctAnswers: 0, wrongAnswers: 0 }

export default function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answerIdx, setAnswerIdx] = useState(null)
  const [answer, setAnswer] = useState(false)
  const [result, setResult] = useState(initialResult)
  const [showResult, setShowResult] = useState(false)

  const { question, choices, correctAnswer, type } = questions[currentQuestion]

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index)
    setAnswer(answer === correctAnswer)
  }

  const onClickNext = () => {
    setAnswerIdx(null)
    setResult((prev) => ({
      ...prev,
      score: answer ? prev.score + 5 : prev.score,
      correctAnswers: answer ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: answer ? prev.wrongAnswers : prev.wrongAnswers + 1
    }))
    setCurrentQuestion((prev) => (currentQuestion !== questions.length - 1 ? prev + 1 : 0))
    if (currentQuestion === questions.length - 1) setShowResult(true)
  }

  const onTryAgain = () => {
    setResult(initialResult)
    setShowResult(false)
  }

  const getAnswerUI = () => (
    <ul className='mt-5 '>
      {choices?.map((answer, index) => (
        <li
          key={answer}
          onClick={() => onAnswerClick(answer, index)}
          className={`border border-default rounded-lg p-3 mt-4 cursor-pointer ${
            answerIdx === index
              ? 'bg-green-500/85 shadow-green-400/50 border-green-400 shadow-sm font-semibold text-white'
              : ''
          }`}
        >
          {answer}
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {showResult ? (
        <Result totalQuestion={questions.length} result={result} onTryAgain={onTryAgain} />
      ) : (
        <div className='p-8'>
          <div>
            <span className='text-4xl font-semibold text-green-500'>{currentQuestion + 1}</span>
            <span className='text-lg text-default'>/{questions.length}</span>
          </div>
          <div className='grid gap-4'>
            <p className='text-xl '>{question}</p>
            {getAnswerUI(type)}
            <button
              className={`${answerIdx === null && 'cursor-not-allowed !bg-default/50'} flex items-center justify-center min-w-[150px] p-2 text-white transition-colors duration-300 rounded-md  focus:outline-none bg-green-500 hover:bg-green-500/90`}
              onClick={onClickNext}
              disabled={answerIdx === null}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
