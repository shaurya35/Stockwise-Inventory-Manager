import "../styles/static/Homepage.css";
import logo from "../assets/logo.svg";
import img from "../assets/img.svg"

export default function Homepage() {
  return (
    <>
      {/* header */}
      <header className="app_header">
        <div className="header sora">
          <div className="header_left">
            <img src={logo} className="left_logo" alt="Logo" />
            Stockwise
          </div>
          <div className="header_right">
            <ul className="right_list">
              <a href="">About Us</a>
              <a href="">Contact Us</a>
            </ul>
          </div>
        </div>
      </header>

      {/* main */}
      <main className="app_main">
        <div className="main">
          <div className="main_left">
            <div className="main_left_heading sora">Revolutionize Your <br /> Inventory Management <br /> with Stockwise</div>
            <div className="main_left_paragraph outfit">The ultimate solution for seamless Inventory <br />  management and demand forecasting. <br /> Say goodbye to stockouts and overstocking, <br /> and embrace a smarter way to manage your <br /> inventory with Stockwise</div>
            <button className="main_left_button sora">Get Started</button>
          </div>
          <div className="main_right">
            <img src={img} className="right_image" alt="Image" />
          </div>
        </div>
      </main>

      <div className="app_gap">

      </div>
      {/* section */}
      <section className="app_section">
        <div className="section">
        <div className="section_heading sora">What we offer?</div>
        <div className="section_paragraph outfit">Comprehensive inventory management solution designed to streamline <br /> your operations and boost your business efficiency.</div>
        <div className="section_blocks">
          <div className="blocks_block1">
            <div className="block_heading"></div>
            <div className="block_content"></div>
          </div>
          <div className="blocks_block2">
          <div className="block_heading"></div>
          <div className="block_content"></div>
          </div>
          <div className="blocks_block3">
          <div className="block_heading"></div>
          <div className="block_content"></div>
          </div>
          <div className="blocks_block4">
          <div className="block_heading"></div>
          <div className="block_content"></div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
