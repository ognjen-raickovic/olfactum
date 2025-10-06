import { ThemeProviderContext } from "./contexts/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProviderContext>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProviderContext>
  );
}

export default App;
