import React, { useState } from "react";
import "../styles/components/CompanyForm.css";
import { useCompaniesContext } from './../hooks/useCompaniesContext';

const CompanyForm = ({ onClose }) => {
  const { dispatch} = useCompaniesContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  
  const [error, setError] = useState(null);

  const handleAddCompany = async (e) => {
    e.preventDefault();
    const company = { name, address, contactEmail: email,contactNumber: contact}; 
    const response = await fetch('/api/dashboard/companies', {
      method: 'POST',
      body: JSON.stringify(company),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if(!response.ok){
      setError(json.error);
    }

    if(response.ok){
      setName('')
      setAddress('')
      setEmail('')
      setContact('')
      setError(null);
      // console.log("new workout added");
      dispatch({type: 'CREATE_COMPANIES', payload: json})
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content auth-form">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="sora">Add Company</h2>
        <form onSubmit={handleAddCompany}>
          <input
            type="text"
            placeholder="Name"
            className="outfit"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="outfit"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="outfit"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="outfit"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            required
          />
          <button type="submit" className="outfit">
            Add Company
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
