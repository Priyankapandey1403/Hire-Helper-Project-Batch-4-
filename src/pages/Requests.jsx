import React from "react";
import "./Requests.css";

const Requests = ({ incomingRequests = [] }) => {
  return (
    <div className="requests-page">

      <div className="requests-header">
        <div>
          <h2>Requests</h2>
          <p>People who want to help with your tasks</p>
        </div>

        <input
          className="search-input"
          placeholder="Search tasks..."
        />
      </div>

      <div className="request-list">
        {incomingRequests.map((req, index) => (
          <div className="request-card" key={index}>

            <div className="request-left">
              <div className="avatar">
                {req.name.charAt(0)}
              </div>

              <div>
                <h4>{req.name}</h4>
                <p className="message">
                  {req.message}
                </p>

                <div className="request-meta">
                  <span>📅 {req.date}</span>
                  <span>📍 {req.location}</span>
                </div>
              </div>
            </div>

            <div className="request-actions">
              <button className="accept-btn">Accept</button>
              <button className="decline-btn">Decline</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Requests;