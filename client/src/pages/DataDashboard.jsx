import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/static/DataDashboard.css";
import ButtonBar from "../components/ButtonBar";
import { useAuthContext } from "./../hooks/useAuthContext";

export default function DataDashboard() {
  const { user } = useAuthContext();
  const { companyId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://stockwise-server-8006.onrender.com/api/dashboard/companies/data/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setData(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && companyId) {
      fetchData();
    }
  }, [user, companyId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="global"></div>
      <main className="app_data_dashboard">
        <ButtonBar companyId={companyId} />
        <div className="data_dashboard_heading sora">Analytics Dashboard</div>
        <div className="data_dashboard">
          <div className="data_dashboard_blocks">
            {data && (
              <>
                <div className="data_dashboard_block">
                  <div className="data_dashboard_block_name sora">
                    Top Selling Product: {data.topSellingProduct.name}
                  </div>
                  <div className="data_dashboard_block_address outfit">
                    Units Sold: {data.topSellingProduct.unitsSold}
                  </div>
                  <div className="data_dashboard_block_contactEmail outfit">
                    Revenue: ₹
                    {data.topSellingProduct.unitsSold *
                      data.topSellingProduct.pricePerUnit}
                  </div>
                </div>
                <div className="data_dashboard_block">
                  <div className="data_dashboard_block_name sora">
                    Least Selling Product: {data.leastSellingProduct.name}
                  </div>
                  <div className="data_dashboard_block_address outfit">
                    Units Sold: {data.leastSellingProduct.unitsSold}
                  </div>
                  <div className="data_dashboard_block_contactEmail outfit">
                    Revenue: ₹
                    {data.leastSellingProduct.unitsSold *
                      data.leastSellingProduct.pricePerUnit}
                  </div>
                </div>
                <div className="data_dashboard_block">
                  <div className="data_dashboard_block_name sora">
                    Total Net Revenue:
                  </div>
                  <div className="data_dashboard_block_address outfit">
                    ₹ {data.totalNetRevenue}
                  </div>
                </div>
                <div className="data_dashboard_block">
                  <div className="data_dashboard_block_name sora">
                    Inventory Turnover:
                  </div>
                  <div className="data_dashboard_block_address outfit">
                    {data.inventoryTurnover}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
