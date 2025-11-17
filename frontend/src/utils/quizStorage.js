const QUIZ_RESULTS_KEY = "olfactum_quiz_results";
const QUIZ_EXPIRY_HOURS = 24; // 24 hours expiry
// const QUIZ_EXPIRY_SECONDS = 10; // 10 seconds expiry for testing

export const saveQuizResults = (answers, results) => {
  const quizData = {
    answers,
    results,
    timestamp: new Date().getTime(),
    expiry: new Date().getTime() + QUIZ_EXPIRY_HOURS * 60 * 60 * 1000,
  };
  localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(quizData));
  return quizData;
};

// export const saveQuizResults = (answers) => {
//   const quizData = {
//     answers,
//     timestamp: new Date().getTime(),
//     expiry: new Date().getTime() + QUIZ_EXPIRY_SECONDS * 1000,
//   };
//   localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(quizData));
//   return quizData;
// };

// export const loadQuizResults = () => {
//   const stored = localStorage.getItem(QUIZ_RESULTS_KEY);
//   if (!stored) return null;

//   const quizData = JSON.parse(stored);
//   const now = new Date().getTime();

//   if (now > quizData.expiry) {
//     localStorage.removeItem(QUIZ_RESULTS_KEY);
//     return null;
//   }

//   return quizData;
// };
export const loadQuizResults = () => {
  const stored = localStorage.getItem(QUIZ_RESULTS_KEY);
  if (!stored) return null;

  const quizData = JSON.parse(stored);
  const now = new Date().getTime();

  // Don't remove expired quizzes - just mark them as expired
  if (now > quizData.expiry) {
    quizData.isExpired = true; // Add expired flag
    return quizData;
  }

  quizData.isExpired = false;
  return quizData;
};

export const clearQuizResults = () => {
  localStorage.removeItem(QUIZ_RESULTS_KEY);
};
