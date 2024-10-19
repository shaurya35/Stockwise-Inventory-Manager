import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/static/ChatDashboard.css";
import ButtonBar from "../components/ButtonBar";
import { useAuthContext } from "./../hooks/useAuthContext";
import { FaCheckCircle } from "react-icons/fa";

export default function ChatDashboard() {
  const { companyId } = useParams();
  const [predictions, setPredictions] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const { user } = useAuthContext();

  const fetchPredictions = async () => {
    try {
      const response = await fetch(
        `https://stockwise-server-8006.onrender.com/api/dashboard/companies/chat/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setPredictions(json);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    }
  };

  const sendMessage = async () => {
    try {
      setIsSending(true);
      const response = await fetch(
        `https://stockwise-server-8006.onrender.com/api/dashboard/companies/chat/${companyId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsOrdered(true);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (user && companyId) {
      fetchPredictions();
    }
  }, [user, companyId]);

  return (
    <>
      <div className="global"></div>
      <main className="app_chat_dashboard">
        <ButtonBar companyId={companyId} />
        <div className="chat_dashboard_heading sora">
          Order Now!
          <button
            className="chat_dashboard_button sora"
            onClick={sendMessage}
            disabled={isSending}
          >
            Send
          </button>
          {isOrdered && <FaCheckCircle className="check-icon-heading" />}
        </div>
        <div className={`chat_dashboard ${isOrdered ? "fade-out" : ""}`}>
          <div className="chat_dashboard_blocks">
            {predictions.map((prediction, index) => (
              <div className="chat_dashboard_block" key={index}>
                <div className="chat_dashboard_block_name sora">
                  <div className="block_name_name">
                    Stock: {prediction.stockName}
                  </div>
                  <div className="block_name_tag">#{index + 1}</div>
                </div>
                <div className="chat_dashboard_block_info outfit">
                  <span className="prediction_span">Purchase Quantity: </span>
                  {prediction.purchaseQuantity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
