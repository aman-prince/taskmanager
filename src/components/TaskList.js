import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
