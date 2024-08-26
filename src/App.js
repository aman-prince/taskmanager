import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

  const totalTasks = tasks.length;
  const tasksCompleted = tasks.filter(task => task.completed).length;
  const tasksRemaining = totalTasks - tasksCompleted;

  const checkAllTasksCompleted = useCallback((updatedTasks = tasks) => {
    const allCompleted = updatedTasks.length > 0 && updatedTasks.every(task => task.completed);
    setAllTasksCompleted(allCompleted);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    checkAllTasksCompleted();
  }, [tasks, checkAllTasksCompleted]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addTask = (title) => {
    const newTask = { title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (taskToToggle) => {
    const updatedTasks = tasks.map((task) =>
      task === taskToToggle
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
    checkAllTasksCompleted(updatedTasks);
  };

  const deleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    checkAllTasksCompleted(updatedTasks);
  };

  return (
    <div className="App">
      <Header />
      <button className="toggle-theme" onClick={toggleTheme}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
      
      <div className="task-stats">
        <p>Total Tasks: {totalTasks}</p>
        <p>Tasks Accomplished: {tasksCompleted}</p>
        <p>Tasks Yet to Complete: {tasksRemaining}</p>
      </div>

      {allTasksCompleted && (
        <div className="congrats-message">
          🎉 Congratulations! You have completed all your tasks for today! 🎉
        </div>
      )}
    </div>
  );
}

export default App;
