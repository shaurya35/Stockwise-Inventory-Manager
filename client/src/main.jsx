import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CompaniesContextProvider } from "./context/CompanyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CompaniesContextProvider>
      <App />
    </CompaniesContextProvider>
  </React.StrictMode>
);
