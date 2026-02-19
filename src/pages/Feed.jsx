import React from "react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/Feed.css";

const Feed = () => {
  const navigate = useNavigate();

  const tasks = [
    {
      title: "Moving Furniture",
      description: "Need help moving furniture from apartment to house.",
      category: "moving",
      date: "Jul 3",
      location: "Downtown",
      time: "Jul 5, 2:00 PM - 6:00 PM",
      user: "Sarah Johnson",
      image:
        "https://images.pexels.com/photos/7464425/pexels-photo-7464425.jpeg",
    },
    {
      title: "Garden / Yard Work",
      description:
        "Looking for someone to help clean up my backyard garden.",
      category: "gardening",
      date: "Jul 3",
      location: "Bellevue",
      time: "Jul 6, 9:00 AM - 1:00 PM",
      user: "Robert Wilson",
      image:
        "https://images.pexels.com/photos/4505167/pexels-photo-4505167.jpeg",
    },
    {
      title: "Painting / Home Improvement",
      description:
        "Need help painting two bedrooms. Paint provided.",
      category: "painting",
      date: "Jul 2",
      location: "Redmond",
      time: "Jul 7, 8:00 AM - 5:00 PM",
      user: "Emily Chen",
      image:
        "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg",
    },
    {
      title: "Grocery Pickup Needed",
      description:
        "Need someone to pick up groceries from local supermarket.",
      category: "Errands",
      date: "Jul 4",
      location: "Kirkland",
      time: "Jul 6, 10:00 AM - 12:00 PM",
      user: "Michael Brown",
      budget: "₹300",
      image:
        "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
    },
    {
      title: "AC Installation Support",
      description:
        "Looking for technician to install split AC in bedroom.",
      category: "Home Service",
      date: "Jul 5",
      location: "Bellevue",
      time: "Jul 7, 1:00 PM - 4:00 PM",
      user: "Anna Smith",
      budget: "₹1500",
      image:
        "https://images.pexels.com/photos/4489707/pexels-photo-4489707.jpeg",
    },
    {
      title: "Birthday Party Decoration",
      description:
        "Need help with balloon decoration and simple backdrop setup.",
      category: "Event Support",
      date: "Jul 6",
      location: "Seattle",
      time: "Jul 8, 3:00 PM - 7:00 PM",
      user: "Jessica Lee",
      budget: "₹1200",
      image:
        "https://images.pexels.com/photos/7180618/pexels-photo-7180618.jpeg",
    },
  ];

  return (
    <div className="feed-container">
      {/* Header Section */}
      <div className="feed-top">
        <div>
          <h2>Feed</h2>
          <p className="feed-subtitle">Find tasks that need help</p>
        </div>

        {/* Right Side (Search + Notification) */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="search-box">
            <input type="text" placeholder="Search tasks..." />
          </div>

          <div
            className="notification"
            onClick={() => navigate("/dashboard/notifications")}
          >
            <FiBell size={22} />
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="card-grid">
        {tasks.map((task, index) => (
          <div className="card" key={index}>
            <img src={task.image} alt={task.title} />

            <div className="card-body">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="info">
                <p><strong>Location:</strong> {task.location}</p>
                <p><strong>Time:</strong> {task.time}</p>
                <p><strong>Posted by:</strong> {task.user}</p>
                {task.budget && (
                  <p><strong>Budget:</strong> {task.budget}</p>
                )}
              </div>

              <div className="card-footer">
                <button>Request</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;