import { useState, useEffect } from 'react';
import Result from './Result';


const initialResult = { score: 0, stressLevel: 0, anxietyLevel: 0, depressionLevel: 0 };

export default function Quiz({ questions, navigation }) {  // Thêm `navigation` từ props
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [result, setResult] = useState(initialResult);
  const [showResult, setShowResult] = useState(false);


  const { question, choices, class: questionClass } = questions[currentQuestion];

  const onAnswerClick = (index) => {
    setAnswerIdx(index);
  };


  const onClickNext = () => {
    setAnswerIdx(null);

    setResult((prev) => ({
      ...prev,
      score: prev.score + answerIdx,
      stressLevel: questionClass === 'S' ? prev.stressLevel + answerIdx : prev.stressLevel,
      anxietyLevel: questionClass === 'A' ? prev.anxietyLevel + answerIdx : prev.anxietyLevel,
      depressionLevel: questionClass === 'D' ? prev.depressionLevel + answerIdx : prev.depressionLevel,
    }));

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(initialResult);
    setShowResult(false);
    setCurrentQuestion(0); // Đặt lại câu hỏi hiện tại về câu đầu tiên
  };

  const getAnswerUI = () => (
    <ul className="mt-5">
      {choices?.map((answer, index) => (
        <li
          key={answer}
          onClick={() => onAnswerClick(index)}
          className={`border border-default rounded-lg p-3 mt-4 cursor-pointer ${answerIdx === index
            ? 'bg-green-500/85 shadow-green-400/50 border-green-400 shadow-sm font-semibold text-white'
            : ''
            }`}
        >
          {answer}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {showResult ? (
        <Result totalQuestion={questions.length} result={result} onTryAgain={onTryAgain} />
      ) : (
        <div className="p-8">
          <div>
            <span className="text-4xl font-semibold text-green-500">{currentQuestion + 1}</span>
            <span className="text-lg text-default">/{questions.length}</span>
          </div>
          <div className="grid gap-4">
            <p className="text-xl">{question}</p>
            {getAnswerUI()}
            <button
              className={`${answerIdx === null && 'cursor-not-allowed !bg-default/50'
                } flex items-center justify-center min-w-[150px] p-2 text-white transition-colors duration-300 rounded-md  focus:outline-none bg-green-500 hover:bg-green-500/90`}
              onClick={onClickNext}
              disabled={answerIdx === null}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
