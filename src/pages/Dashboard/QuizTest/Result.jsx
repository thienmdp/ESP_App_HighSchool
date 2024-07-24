export default function Result({ totalQuestion, result, onTryAgain }) {
  return (
    <div className='text-center p-8 text-lg tracking-[1.5px] text-default min-h-[450px] mb-32 flex flex-col justify-center items-center'>
      <p className='mb-8 text-3xl font-semibold text-center text-green-500'>Result</p>
      <p className='mb-4'>
        Total Questions: <span className='font-bold text-green-500'>{totalQuestion}</span>
      </p>
      <p className='mb-4'>
        Total Score: <span className='font-bold text-green-500'>{result.score}</span>
      </p>
      <p className='mb-4'>
        Correct Answers: <span className='font-bold text-green-500'>{result.correctAnswers}</span>
      </p>
      <p className='mb-8 '>
        Wrong Answers: <span className='font-bold text-green-500'>{result.wrongAnswers}</span>
      </p>
      <button
        className='flex items-center justify-center min-w-[150px] p-2 text-white transition-colors duration-300 rounded-md focus:outline-none bg-green-500 hover:bg-green-500/90'
        onClick={onTryAgain}
      >
        Try Again
      </button>
    </div>
  )
}
