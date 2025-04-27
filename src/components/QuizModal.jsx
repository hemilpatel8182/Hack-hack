import { useState } from 'react';

const QuizModal = ({ questions, onClose, onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleSelect = (qIdx, optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    answers.forEach((answer, idx) => {
      if (answer === questions[idx].correctAnswer) {
        score++;
      }
    });
    onSubmit(score);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg relative">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Quick Quiz</h2>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {questions.map((q, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-800 mb-2">{idx + 1}. {q.question}</h4>
              <ul className="space-y-2">
                {q.options.map((option, oIdx) => (
                  <li key={oIdx} className="flex items-center">
                    <input
                      type="radio"
                      id={`q${idx}_o${oIdx}`}
                      name={`question_${idx}`}
                      checked={answers[idx] === oIdx}
                      onChange={() => handleSelect(idx, oIdx)}
                      className="mr-2"
                    />
                    <label htmlFor={`q${idx}_o${oIdx}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitQuiz}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
