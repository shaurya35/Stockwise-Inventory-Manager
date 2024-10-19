import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/static/PredictionDashboard.css";
import ButtonBar from "../components/ButtonBar";
import { useAuthContext } from "./../hooks/useAuthContext";

export default function PredictionDashboard() {
  const { user } = useAuthContext();
  const { companyId } = useParams();
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch(
          `https://stockwise-server-8006.onrender.com/api/dashboard/companies/prediction/${companyId}`,
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

        setPredictions(json);
      } catch (error) {
        setError(error.message);
      } 
    };

    if (user && companyId) {
      fetchPredictions();
    }
  }, [user, companyId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="global"></div>
      <main className="app_prediction_dashboard">
        <ButtonBar companyId={companyId} />
        <div className="prediction_dashboard_heading sora">
          Prediction Dashboard
        </div>
        <div className="prediction_dashboard">
          <div className="prediction_dashboard_blocks">
            {predictions &&
              predictions.map((prediction, index) => (
                <div className="prediction_dashboard_block" key={index}>
                  <div className="prediction_dashboard_block_name sora">
                    Product: {prediction.stockName}
                  </div>
                  <div className="prediction_dashboard_block_address outfit">
                    Purchase Quantity: {prediction.purchaseQuantity}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
