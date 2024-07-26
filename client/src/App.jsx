import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navigationbar';
import Homepage from './pages/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './pages/CompanyDashboard';
import CompanyDashboard from './pages/Dashboard';

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
                        <Route path="/dashboard/companies" element={<Dashboard />} />
                        <Route path="/dashboard/companies/:companyId/stocks" element={<CompanyDashboard />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
