import React, { useEffect, useState } from "react";

function MyTasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:5000/api/tasks/mytasks/${user.email}`)
      .then(res => res.json())
      .then(data => setTasks(data));

  }, []);

  return (

    <div>

      <h2>My Tasks</h2>

      {tasks.map(task => (

        <div key={task.id}>

          <h3>{task.title}</h3>
          <p>{task.description}</p>

        </div>

      ))}

    </div>

  );

}

export default MyTasks;
