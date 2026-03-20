const QUIZ_RESULTS_KEY = "olfactum_quiz_results";

export const saveQuizResults = (answers, results) => {
  const quizData = { answers, results };
  localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(quizData));
  return quizData;
};

export const loadQuizResults = () => {
  const stored = localStorage.getItem(QUIZ_RESULTS_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
};

export const clearQuizResults = () => {
  localStorage.removeItem(QUIZ_RESULTS_KEY);
};
