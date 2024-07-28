import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/static/Dashboard.css";
import CompanyForm from "../components/Forms/CompanyForm";
import { useCompaniesContext } from "./../hooks/useCompaniesContext";
import { useAuthContext } from './../hooks/useAuthContext';

export default function CompanyDashboard() {
  const { companies, dispatch } = useCompaniesContext();
  const {user} = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/api/dashboard/companies", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        dispatch({ type: "SET_COMPANIES", payload: json });
      }
    };
    if(user){
      fetchCompanies();
    }
    
  }, [dispatch, user]);

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showForm]);

  const handleCompanyClick = (companyId) => {
    navigate(`/dashboard/companies/${companyId}/stocks`);
  };

  return (
    <>
      <div className="global"></div>
      <main className="app_company_dashboard">
        <div className="company_dashboard_heading sora">
          All your companies are <br /> listed here <br />
          <button
            className="company_dashboard_button sora"
            onClick={() => setShowForm(true)}
          >
            Add Company
          </button>
        </div>
        <div className="company_dashboard">
          <div className="company_dashboard_blocks">
            {companies &&
              companies.map((company, index) => (
                <div
                  className="company_dashboard_block"
                  key={company._id || index}
                  onClick={() => handleCompanyClick(company._id)}
                >
                  <div className="company_dashboard_block_name sora">
                    <div className="block_name_name"> {company.name}</div>
                    <div className="block_name_tag">#{index + 1}</div>
                  </div>
                  <div className="company_dashboard_block_address outfit">
                    {company.address}
                  </div>
                  <div className="company_dashboard_block_contactEmail outfit">
                    <span className="contact_span"> mail: </span>
                    {company.contactEmail}
                  </div>
                  <div className="company_dashboard_block_contactNumber outfit">
                    <span className="contact_span"> phone: </span>
                    {company.contactNumber}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
      {showForm && <CompanyForm onClose={() => setShowForm(false)} />}
    </>
  );
}
