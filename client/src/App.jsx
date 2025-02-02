import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navigationbar";
import Homepage from "./pages/Homepage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CompanyDashboard from "./pages/CompanyDashboard";
import StocksDashboard from "./pages/StocksDashboard";
import DataDashboard from "./pages/DataDashboard";
import PredictionDashboard from "./pages/PredictionDashboard";
import ChatDashboard from "./pages/ChatDashboard";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="/dashboard/companies" /> : <Homepage />
                }
              />
              <Route
                path="/auth/signup"
                element={
                  user ? <Navigate to="/dashboard/companies" /> : <Signup />
                }
              />
              <Route
                path="/auth/login"
                element={
                  user ? <Navigate to="/dashboard/companies" /> : <Login />
                }
              />
              <Route
                path="/dashboard"
                element={
                user ? <Navigate to="/dashboard/companies" replace /> : <Signup /> 
              }
              />
              <Route
                path="/dashboard/companies"
                element={
                  user ? <CompanyDashboard /> : <Navigate to="/auth/signup" />
                }
              />
              <Route
                path="/dashboard/companies/:companyId/stocks"
                element={user ? <StocksDashboard /> : <Navigate to="/auth/login" />
                }
              />
              <Route
                path="/dashboard/companies/:companyId/data"
                element={user ? <DataDashboard /> : <Navigate to="/auth/login" />}
              />
              <Route
                path="/dashboard/companies/:companyId/prediction"
                element={ user ? <PredictionDashboard /> : <Navigate to="/auth/login" />}
              />

              <Route
                path="/dashboard/companies/:companyId/chat"
                element={user ? <ChatDashboard /> : <Navigate to="/auth/login" />}
              />
              <Route
                path="/company/:companyId"
                element={
                 user ?  <Navigate to="/dashboard/companies/:companyId/stocks" replace /> : <Navigate to="/auth/login" />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
