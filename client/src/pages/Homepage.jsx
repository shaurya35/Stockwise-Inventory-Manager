import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/static/Homepage.css";
import logo from "../assets/logo.svg";
import img from "../assets/img.svg";
import linkedin from "../assets/linkedin.svg";

export default function Homepage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/auth/signup");
  };

  return (
    <>
      {/* main */}
      <main className="app_main">
        <div className="main">
          <div className="main_left">
            <div className="main_left_heading sora">
              Revolutionize Your <br /> Inventory Management <br /> with
              Stockwise
            </div>
            <div className="main_left_paragraph outfit">
              The ultimate solution for seamless Inventory <br /> management and
              demand forecasting. <br /> Say goodbye to stockouts and
              overstocking, <br /> and embrace a smarter way to manage your{" "}
              <br /> inventory with Stockwise
            </div>
            <button
              className="main_left_button sora"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <div className="main_right">
            <img src={img} className="right_image" alt="Image" />
          </div>
        </div>
      </main>

      <div className="app_gap"></div>
      {/* section */}
      <section className="app_section">
        <div className="section">
          <div className="section_heading sora" id="x1">
            What we offer?
          </div>
          <div className="section_paragraph outfit">
            Comprehensive inventory management solution designed to streamline{" "}
            <br /> your operations and boost your business efficiency.
          </div>
          <div className="section_blocks">
            <div className="blocks_block">
              <div className="block_heading sora">
                Real-Time Inventory Tracking
              </div>
              <div className="block_content outfit">
                Stay updated with the latest inventory levels in real-time. Our
                system provides accurate and instant tracking of your stock,
                ensuring you never run out of essential items.
              </div>
            </div>
            <div className="blocks_block">
              <div className="block_heading sora">
                Automated Order Management
              </div>
              <div className="block_content outfit">
                Simplify your order processing with our automated workflows.
                From purchase orders to sales orders, our application handles
                everything seamlessly, reducing manual effort and errors.
              </div>
            </div>
            <div className="blocks_block">
              <div className="block_heading sora">
                Advanced Reporting and Analytics
              </div>
              <div className="block_content outfit">
                Gain valuable insights into your business operations with our
                advanced reporting tools. Analyze sales trends, monitor stock
                levels, and make data-driven decisions to optimize your
                inventory.
              </div>
            </div>
            <div className="blocks_block">
              <div className="block_heading sora">Predictive Analysis</div>
              <div className="block_content outfit">
                Our inventory management application provides you with a wealth
                of analytics data, enabling you to forecast demand, optimize
                stock levels, and anticipate market trends.{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer  */}
      <footer className="app_footer">
        <div className="footer">
          <div className="footer_details">
            <img src={logo} className="details_logo" alt="logo" />
            <div className="details_heading sora">Stockwise</div>
          </div>
          <div className="footer_contacts">
            <div className="contacts_contacts sora">Find Us</div>
            <ul className="contacts_list sora">
              <li className="list_items">
                <a
                  href="https://www.linkedin.com/in/shaurya--jha/"
                  className="items_links"
                  target="_blank"
                >
                  Shaurya Jha
                  <img
                    src={linkedin}
                    className="items_linkedin"
                    alt="linkedin"
                  />
                </a>
              </li>
              <li className="list_items">
                <a
                  href="https://www.linkedin.com/in/om-shankar-deshmukh-7431b9245/"
                  className="items_links"
                  target="_blank"
                >
                  Om Shankar Deshmukh
                  <img
                    src={linkedin}
                    className="items_linkedin"
                    alt="linkedin"
                  />
                </a>
              </li>
              <li className="list_items">
                <a
                  href="https://www.linkedin.com/in/satyamkumar1018/"
                  className="items_links"
                  target="_blank"
                >
                  Satyam Kumar
                  <img
                    src={linkedin}
                    className="items_linkedin"
                    alt="linkedin"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
