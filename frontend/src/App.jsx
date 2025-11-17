import { ThemeProviderContext } from "./contexts/ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import FragrancesPage from "./pages/FragrancesPage";
import LearnPage from "./pages/LearnPage";
import Module1 from "./components/learn/module1";
import Module2 from "./components/learn/module2";
import Module3 from "./components/learn/module3";
import Module4 from "./components/learn/module4";
import Module5 from "./components/learn/module5";
import Module6 from "./components/learn/module6";
import LibraryPage from "./pages/LibraryPage";
import AboutPage from "./pages/AboutPage";
import QuizPage from "./pages/QuizPage";
import FAQ from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";

function AppRoutes() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/fragrances" element={<FragrancesPage />} />
        {/* <Route path="/browse" element={<FragrancesPage />} /> */}
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/module1" element={<Module1 />} />
        <Route path="/learn/module2" element={<Module2 />} />
        <Route path="/learn/module3" element={<Module3 />} />
        <Route path="/learn/module4" element={<Module4 />} />
        <Route path="/learn/module5" element={<Module5 />} />
        <Route path="/learn/module6" element={<Module6 />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/find-your-fragrance" element={<QuizPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Show modal when background is present */}
      {background && (
        <Routes>
          <Route path="/fragrances/:slug" element={<FragrancesPage />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProviderContext>
      <Router>
        <ScrollToTop />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </ThemeProviderContext>
  );
}

export default App;
