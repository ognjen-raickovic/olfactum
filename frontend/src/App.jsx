import { ThemeProviderContext } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
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
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function AppRoutes() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/fragrances" element={<FragrancesPage />} />

        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/module1" element={<Module1 />} />
        <Route path="/learn/module2" element={<Module2 />} />
        <Route path="/learn/module3" element={<Module3 />} />
        <Route path="/learn/module4" element={<Module4 />} />
        <Route path="/learn/module5" element={<Module5 />} />
        <Route path="/learn/module6" element={<Module6 />} />

        <Route path="/library" element={<LibraryPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/find-your-fragrance" element={<QuizPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

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
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </Router>
      </AuthProvider>
    </ThemeProviderContext>
  );
}

export default App;
