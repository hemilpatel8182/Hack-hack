import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizModal from '../components/QuizModal';

const topics = [
  "Budgeting Basics",
  "How Taxes Work",
  "Understanding Credit Score",
  "Smart Banking",
  "Intro to Investing"
];

const experiences = [
  "Beginner",
  "Intermediate",
  "Expert"
];

const TopicSelectionPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [response, setResponse] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [stepScores, setStepScores] = useState({});
  const [xp, setXp] = useState(0);
  const [displayXp, setDisplayXp] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const [currentStepNumber, setCurrentStepNumber] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/signup');
      return;
    }
  }, [navigate]);

  const fetchCompletedChapters = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`https://hack-hack-2025-production.up.railway.app/progress/completed/${userId}`);
      const data = await res.json();
      setCompletedChapters(data);
    } catch (error) {
      console.error('Error fetching completed chapters:', error);
    }
  };

  const fetchXP = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`https://hack-hack-2025-production.up.railway.app/progress/${userId}`);
      const data = await res.json();
      setXp(data.xp || 0);
      animateXP(data.xp || 0);
    } catch (error) {
      console.error('Error fetching XP:', error);
    }
  };

  const animateXP = (targetXp) => {
    let start = displayXp;
    const increment = (targetXp - start) / 20;

    const animation = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= targetXp) || (increment < 0 && start <= targetXp)) {
        start = targetXp;
        clearInterval(animation);
      }
      setDisplayXp(Math.round(start));
    }, 30);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in first!');
      navigate('/signup');
      return;
    }

    if (!selectedTopic || !selectedExperience) {
      alert('Please select a topic and experience level.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`https://hack-hack-2025-production.up.railway.app/learning_path/generate/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_goal: selectedTopic }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.path);
        await fetchCompletedChapters();
        await fetchXP();
      } else {
        alert(data.detail || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get personalized learning.');
    } finally {
      setLoading(false);
    }
  };

  const openQuizForStep = (step) => {
    setCurrentQuizQuestions(step.quiz || []);
    setCurrentStepNumber(step.step);
    setQuizOpen(true);
  };

  const handleQuizSubmit = async (score) => {
    const key = `${selectedExperience}_${currentStepNumber}`;
    setStepScores(prev => ({ ...prev, [key]: score }));
  
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await fetch(`https://hack-hack-2025-production.up.railway.app/progress/complete_chapter/${userId}/1/${currentStepNumber}/1`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            experience_level: selectedExperience
          })
        });
        await fetchXP();  // Refresh XP counter
        await fetchCompletedChapters();  // Refresh completed chapters
      } catch (error) {
        console.error('Error completing step:', error);
      }
    }
  
    setQuizOpen(false);
  };
  
  

  const getStepScore = (stepNumber) => {
    const key = `${selectedExperience}_${stepNumber}`;
    return stepScores[key];
  };

  const calculateProgress = () => {
    if (!response) return 0;

    let totalSteps = response.length;
    let completed = 0;

    response.forEach(step => {
      if (getStepScore(step.step) !== undefined) {
        completed++;
      }
    });

    if (totalSteps === 0) return 0;
    return Math.round((completed / totalSteps) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">

      {/* XP Counter */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Your XP: {displayXp}</h2>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Personalize Your Learning</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            required
          >
            <option value="">Select a Topic</option>
            {topics.map((topic, idx) => (
              <option key={idx} value={topic}>{topic}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            required
          >
            <option value="">Select Your Experience Level</option>
            {experiences.map((level, idx) => (
              <option key={idx} value={level}>{level}</option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Personalized Learning
          </button>
        </form>
      </div>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {response && (
        <div className="mt-8 p-4 bg-white shadow-md rounded-lg w-full max-w-4xl">

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-6 mb-6">
            <div
              className="bg-blue-600 h-6 rounded-full text-center text-white font-semibold"
              style={{ width: `${calculateProgress()}%` }}
            >
              {calculateProgress()}%
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-blue-700">Your Learning Path:</h3>

          {response.map((step, index) => (
            <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-blue-800">
                Step {step.step}: {step.title}
                {getStepScore(step.step) !== undefined && (
                  <span className="ml-4 text-green-600 font-semibold text-sm">
                    Score: {getStepScore(step.step)}/5
                  </span>
                )}
              </h4>
              <p className="text-gray-700 mt-2">{step.description}</p>

              <h5 className="font-semibold mt-2 text-gray-800">Chapters & Resources:</h5>
              <ul className="list-disc ml-6 text-gray-600">
                {step.chapters.map((chapter, idx) => {
                  const resource = step.resources[idx];
                  return (
                    <li key={idx} className="mb-2">
                      <a
                        href={resource?.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {chapter.title} - {resource.title}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Take Quiz Button */}
              <div className="mt-4">
                <button
                  onClick={() => openQuizForStep(step)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {quizOpen && (
        <QuizModal
          questions={currentQuizQuestions}
          onClose={() => setQuizOpen(false)}
          onSubmit={handleQuizSubmit}
        />
      )}
    </div>
  );
};

export default TopicSelectionPage;
