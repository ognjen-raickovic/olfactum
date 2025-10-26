import { ThemeProviderContext } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import FragrancesPage from "./pages/FragrancesPage";
import LearnPage from "./pages/LearnPage";
import Module1 from "./components/learn/module1";
import Module2 from "./components/learn/module2";
import LibraryPage from "./pages/LibraryPage";
import AboutPage from "./pages/AboutPage";
import QuizPage from "./pages/QuizPage";
import FAQ from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ThemeProviderContext>
      <Router>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fragrances" element={<FragrancesPage />} />
            <Route path="/fragrances/:slug?" element={<FragrancesPage />} />
            <Route path="/browse" element={<FragrancesPage />} />
            {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
            {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/module1" element={<Module1 />} />
            <Route path="/learn/module2" element={<Module2 />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/find-your-fragrance" element={<QuizPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProviderContext>
  );
}

export default App;
