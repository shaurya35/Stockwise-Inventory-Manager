import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/static/Dashboard.css";
import StockForm from "../components/Forms/StocksForm";
import { useCompaniesContext } from "./../hooks/useCompaniesContext";

export default function StocksDashboard() {
  const { companies, dispatch } = useCompaniesContext();
  const { companyId } = useParams();
  const [stocks, setStocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchStocks = async () => {
    try {
      const response = await fetch(
        `/api/dashboard/companies/${companyId}/stocks`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setStocks(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [companyId, dispatch]);

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

  const handleFormClose = () => {
    setShowForm(false);
    fetchStocks();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stocks || stocks.length === 0) {
    return <div>No stocks available.</div>;
  }

  return (
    <>
      <main className="app_company_dashboard">
        <div className="company_dashboard_heading sora">
          All your stocks are listed <br /> here
          <button
            className="company_dashboard_button sora"
            onClick={() => setShowForm(true)}
          >
            Add Stocks
          </button>
        </div>
        <div className="company_dashboard">
          <div className="company_dashboard_blocks">
            {stocks &&
              stocks.map((stock, index) => (
                <div
                  className="company_dashboard_block"
                  key={stock._id || index}
                >
                  <div className="company_dashboard_block_name sora">
                    <div className="block_name_name">{stock.name}</div>
                    <div className="block_name_tag">#{index + 1}</div>
                  </div>
                  <div className="company_dashboard_block_address outfit ">
                    <span className="stock_span">Total Units: </span>
                    {stock.totalUnits}
                  </div>
                  <div className="company_dashboard_block_contactEmail outfit">
                    <span className="stock_span">Units Sold: </span>
                    {stock.unitsSold}
                  </div>
                  <div className="company_dashboard_block_contactNumber outfit">
                    <span className="stock_span">Price Per Unit: </span>
                    {stock.pricePerUnit}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
      {showForm && <StockForm onClose={handleFormClose} />}
    </>
  );
}
