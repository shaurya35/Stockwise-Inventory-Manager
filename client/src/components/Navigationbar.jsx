import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg";
import ContactForm from "../components/Forms/Contactform";

export default function Navigationbar() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = (e) => {
    e.preventDefault();
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const handleReload = () => {
    window.location.href = "/";
  };
  return (
    <>
      {/* header */}
      <header className="app_header">
        <div className="header sora">
          <div
            className="header_left"
            onClick={handleReload}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} className="left_logo" alt="Logo" />
            Stockwise
          </div>
          <div className="header_right">
            <ul className="right_list">
              <a href="#x1">Features</a>
              <a href="#" onClick={openContactForm}>
                Contact Us
              </a>
            </ul>
          </div>
        </div>
      </header>

      {/* Contact Form */}
      <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
    </>
  );
}
