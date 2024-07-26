import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navigationbar';
import Homepage from './pages/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import CompanyDashboard from './pages/CompanyDashboard';
import StocksDashboard from './pages/StocksDashboard';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Navigate to="/dashboard/companies" replace />} />
                        <Route path="/dashboard/companies" element={<CompanyDashboard />} />
                        <Route path="/dashboard/companies/:companyId/" element={<Navigate to="/dashboard/companies/:companyId/stocks" replace />} />
                        <Route path="/dashboard/companies/:companyId/stocks" element={<StocksDashboard />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
