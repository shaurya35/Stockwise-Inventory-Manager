import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/components/Forms/AddForm.css";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";

const StockForm = ({ onClose }) => {
  const { companyId } = useParams();
  const { dispatch } = useCompaniesContext();
  const [name, setName] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [unitsSold, setUnitsSold] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const [error, setError] = useState(null);

  const handleAddStock = async (e) => {
    e.preventDefault();
    const stock = { name, totalUnits, unitsSold, pricePerUnit };
    const response = await fetch(
      `/api/dashboard/companies/${companyId}/stocks`,
      {
        method: "POST",
        body: JSON.stringify(stock),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setName("");
      setTotalUnits("");
      setUnitsSold("");
      setPricePerUnit("");
      setError(null);
      dispatch({ type: "CREATE_STOCK", payload: json });
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content auth-form">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="sora">Add Stock</h2>
        <form onSubmit={handleAddStock}>
          <input
            type="text"
            placeholder="Name"
            className="outfit"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type="number"
            placeholder="Total Units"
            className="outfit"
            onChange={(e) => setTotalUnits(e.target.value)}
            value={totalUnits}
            required
          />
          <input
            type="number"
            placeholder="Units Sold"
            className="outfit"
            onChange={(e) => setUnitsSold(e.target.value)}
            value={unitsSold}
            required
          />
          <input
            type="number"
            placeholder="Price Per Unit"
            className="outfit"
            onChange={(e) => setPricePerUnit(e.target.value)}
            value={pricePerUnit}
            required
          />
          <button type="submit" className="outfit">
            Add Stock
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default StockForm;
