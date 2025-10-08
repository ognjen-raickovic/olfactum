import { ThemeProviderContext } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import FragrancesPage from "./pages/FragrancesPage";
import AboutPage from "./pages/AboutPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <ThemeProviderContext>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fragrances" element={<FragrancesPage />} />
            <Route path="/browse" element={<FragrancesPage />} />{" "}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/find-your-fragrance" element={<QuizPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProviderContext>
  );
}

export default App;
