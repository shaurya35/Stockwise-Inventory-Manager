import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/static/StocksDashboard.css";
import StockForm from "../components/Forms/StocksForm";
import { useCompaniesContext } from './../hooks/useCompaniesContext';

export default function StocksDashboard() {
  const { companyId } = useParams();
  const [stocks, setStocks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { dispatch } = useCompaniesContext();

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
      console.error("Failed to fetch stocks:", error);
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

  return (
    <>
      <div className="global"></div>
      <main className="app_stocks_dashboard">
        <div className="stocks_dashboard_heading sora">
          All your stocks are listed <br /> here
          <button
            className="stocks_dashboard_button sora"
            onClick={() => setShowForm(true)}
          >
            Add Stocks
          </button>
        </div>
        <div className="stocks_dashboard">
          <div className="stocks_dashboard_blocks">
            {stocks.map((stock, index) => (
              <div
                className="stocks_dashboard_block"
                key={stock._id || index}
              >
                <div className="stocks_dashboard_block_name sora">
                  <div className="block_name_name">{stock.name}</div>
                  <div className="block_name_tag">#{index + 1}</div>
                </div>
                <div className="stocks_dashboard_block_address outfit">
                  <span className="stock_span">Total Units: </span>
                  {stock.totalUnits}
                </div>
                <div className="stocks_dashboard_block_contactEmail outfit">
                  <span className="stock_span">Units Sold: </span>
                  {stock.unitsSold}
                </div>
                <div className="stocks_dashboard_block_contactNumber outfit">
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
