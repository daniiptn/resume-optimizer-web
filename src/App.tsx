import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} /> {/* ⬅️ catch-all */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
