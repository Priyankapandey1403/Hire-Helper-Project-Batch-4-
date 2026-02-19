import Feed from "../components/Feed";
import Notifications from "./Notifications";
import "../styles/Dashboard.css";

function Dashboard() {

  // Get user from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));

  const firstName = userData?.firstName || "User";

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">
        <Routes>
          {/* Default Dashboard Page */}
          <Route path="/" element={<Feed />} />

          {/* Notifications Page */}
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </div>

    </div>
  );
}

export default Dashboard;
