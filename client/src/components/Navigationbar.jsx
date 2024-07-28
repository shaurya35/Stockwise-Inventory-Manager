import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import ContactForm from "../components/Forms/Contactform";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navigationbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    logout();
  };

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

  const isAuthRoute = location.pathname.startsWith("/auth");
  const isHomeRoute = location.pathname === "/";

  return (
    <>
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
              {isHomeRoute && <a href="#x1">Features</a>}
              <a href="#" onClick={openContactForm}>
                Contact Us
              </a>
              {user && (
                <button className="navbar_button sora" onClick={handleClick}>
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
      </header>

      <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
    </>
  );
}
