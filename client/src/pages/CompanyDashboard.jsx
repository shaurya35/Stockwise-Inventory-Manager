import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/static/CompanyDashboard.css";
import CompanyForm from "../components/Forms/CompanyForm";
import { useCompaniesContext } from "../hooks/useCompaniesContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function CompanyDashboard() {
  const { companies, dispatch } = useCompaniesContext();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!user) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const response = await fetch("/api/dashboard/companies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        // Check if the content-type is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text(); // Read response as text
          console.error(
            `Unexpected content-type: ${contentType}, body: ${text}`
          );
          throw new Error(`Unexpected content-type: ${contentType}`);
        }

        // Attempt to parse JSON response
        const json = await response.json();

        if (!response.ok) {
          // Handle non-OK responses
          console.error(
            `HTTP error! status: ${response.status}, body: ${JSON.stringify(
              json
            )}`
          );
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Dispatch action with received JSON data
        dispatch({ type: "SET_COMPANIES", payload: json });
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
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
            {companies && companies.length > 0 ? (
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
              ))
            ) : (
              <p>No companies found.</p>
            )}
          </div>
        </div>
      </main>
      {showForm && <CompanyForm onClose={() => setShowForm(false)} />}
    </>
  );
}
