import "../styles/static/Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <main className="app_dashboard">
        {/* <div className="dashboard_left">hi</div> */}
        <div className="dashboard">
          <div className="dashboard_nav">
            <h2 className="sora">Dashboard</h2>
          </div>

          <form>
            <input type="email" placeholder="Email" className="outfit" />
            <input type="password" placeholder="Password" className="outfit" />
            <button type="submit" className="outfit">
              Logins
            </button>
          </form>
          <p className="outfit">Don't have an account?</p>
        </div>
        {/* <div className="dashboard_right">z</div> */}
      </main>
    </>
  );
}
