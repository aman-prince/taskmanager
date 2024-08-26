import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter today's task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
