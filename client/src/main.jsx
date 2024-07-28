import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CompaniesContextProvider } from "./context/CompanyContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CompaniesContextProvider>
        <App />
      </CompaniesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
