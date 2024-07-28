import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ButtonBar({ companyId }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="stocks_dashboard_menu">
            <div className="stocks_dashboard_menu_inner_1"></div>
            <div className="stocks_dashboard_menu_inner_2">
                {currentPath !== `/dashboard/companies/${companyId}/data` && (
                    <button
                        className="stocks_dashboard_menu_inner_button sora"
                        onClick={() => navigate(`/dashboard/companies/${companyId}/data`)}
                    >
                        Analytics
                    </button>
                )}
                {currentPath !== `/dashboard/companies/${companyId}/stocks` && (
                    <button
                        className="stocks_dashboard_menu_inner_button sora"
                        onClick={() => navigate(`/dashboard/companies/${companyId}/stocks`)}
                    >
                        Stocks
                    </button>
                )}
                {currentPath !== `/dashboard/companies/${companyId}/prediction` && (
                    <button
                        className="stocks_dashboard_menu_inner_button sora"
                        onClick={() => navigate(`/dashboard/companies/${companyId}/prediction`)}
                    >
                        Prediction
                    </button>
                )}
                {currentPath !== `/chat` && (
                    <button
                        className="stocks_dashboard_menu_inner_button sora"
                        onClick={() => navigate(`/chat`)}
                    >
                        Chat
                    </button>
                )}
            </div>
        </div>
    );
}
