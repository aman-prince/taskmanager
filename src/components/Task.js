import React from "react";

const Task = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div className="task">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task)}
        />
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.title}
        </span>
      </div>
      <button onClick={() => deleteTask(task)}>Delete</button>
    </div>
  );
};

export default Task;
