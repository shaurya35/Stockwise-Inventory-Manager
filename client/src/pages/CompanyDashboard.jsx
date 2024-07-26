import { useEffect, useState } from "react";
import "../styles/static/CompanyDashboard.css";

export default function CompanyDashboard() {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/api/dashboard/companies");
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Oops, we did not get JSON!");
      }
      setCompanies(json);
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <main className="app_company_dashboard">
        <div className="company_dashboard">
          <div className="company_dashboard_heading sora">All your companies are <br /> listed here</div>
          <div className="company_dashboard_blocks">
            {companies &&
              companies.map((company, index) => (
                <div className="company_dashboard_block" key={company._id}>
                  <div className="company_dashboard_block_name sora">
                    <div className="block_name_name"> {company.name}</div>
                    <div className="block_name_tag">#{index + 1}</div>
                  </div>
                  <div className="company_dashboard_block_address outfit">
                    {company.address} 
                  </div>
                  <div className="company_dashboard_block_contactEmail outfit">
                    <span className="contact_span"> mail: </span>{" "}
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
    </>
  );
}
