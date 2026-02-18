import React from "react";
import "../styles/Feed.css";

const Feed = () => {
  const tasks = [
  {
    title: "Moving Furniture",
    description: "Need help moving furniture from apartment to house.",
    category: "moving",
    date: "Jul 3",
    location: "Downtown",
    time: "Jul 5, 2:00 PM - 6:00 PM",
    user: "Sarah Johnson",
    image:"https://images.pexels.com/photos/7464425/pexels-photo-7464425.jpeg",
  },
  
  {
    title: "Garden / Yard Work",
    description: "Looking for someone to help clean up my backyard garden.",
    category: "gardening",
    date: "Jul 3",
    location: "Bellevue",
    time: "Jul 6, 9:00 AM - 1:00 PM",
    user: "Robert Wilson",
    image:"https://images.pexels.com/photos/4505167/pexels-photo-4505167.jpeg",
  },
  {
    title: "Painting / Home Improvement",
    description: "Need help painting two bedrooms. Paint provided.",
    category: "painting",
    date: "Jul 2",
    location: "Redmond",
    time: "Jul 7, 8:00 AM - 5:00 PM",
    user: "Emily Chen",
    image:"https://images.pexels.com/photos/5691624/pexels-photo-5691624.jpeg",
  },
];
return (
    <div className="feed-container">
      <h2>Feed</h2>

      <div className="card-grid">
        {tasks.map((task, index) => (
          <div className="card" key={index}>
            <img src={task.image} alt={task.title} />
            <div className="card-body">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;