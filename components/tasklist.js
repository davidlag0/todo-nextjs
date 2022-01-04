import TaskItem from "./taskitem";
import React from "react";
import styles from "../styles/TaskList.module.css";

export default function TaskList() {
  const [tasks, updateTasks] = React.useState([]);

  const addTask = (text) => {
    const newTask = {
      text,
      checked: false,
      id: Date.now(),
    };

    updateTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  };

  const handleDeleteTask = (event) => {
    updateTasks((prevTasks) => {
      return prevTasks.filter(
        (task) => task.id !== Number(event.target.dataset.deleteid)
      );
    });
  };

  const handleAddTask = (event) => {
    // To avoid the default form behavior of sending the content to the web server.
    event.preventDefault();

      const input = document.querySelector("form > input");

    const text = input.value.trim();
    if (text !== "") {
      addTask(text);
      input.value = "";
    }
  };

  return (
    <div className={styles.global}>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          aria-label="Enter a new task"
          placeholder="Add a task..."
          className={styles.taskFormInput}
        />
      </form>

      <ul className={styles.ul}>
        {tasks.length === 0 ? (
          <li>
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyStateSVG}
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-labelledby="tasklistIconTitle"
              >
                <title id="tasklistIconTitle">Task List</title>
                <rect width="20" height="20" x="2" y="2"></rect>
                <path d="M11 7L17 7M11 12L17 12M11 17L17 17"></path>
                <line x1="7" y1="7" x2="7" y2="7"></line>
                <line x1="7" y1="12" x2="7" y2="12"></line>
                <line x1="7" y1="17" x2="7" y2="17"></line>
              </svg>
              <h2>Add your first task</h2>
              <p>What will you work on today?</p>
            </div>
          </li>
        ) : (
          tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                text={task.text}
                id={task.id}
                handleDelete={handleDeleteTask}
              ></TaskItem>
            );
          })
        )}
      </ul>
    </div>
  );
}
