import TaskItem from "./taskitem";
import React from "react";

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

    const input = document.querySelector(".task-form__input");

    const text = input.value.trim();
    if (text !== "") {
      addTask(text);
      input.value = "";
    }
  };

  return (
    <>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          aria-label="Enter a new task"
          placeholder="Add a task..."
          className="task-form__input"
        />
      </form>

      <ul>
        {tasks.length === 0 ? (
          <li>
            <div className="empty-state">
              <svg
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
              <h2 className="empty-state__title">Add your first task</h2>
              <p className="empty-state__description">
                What will you work on today?
              </p>
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
      <style jsx>{`
        * {
          box-sizing: inherit;
        }

        .task-form__input {
          display: inline-block;
          color: var(--background-color);
          background-color: var(--primary-color);
          width: 100%;
          border-radius: var(--border-radius);
          padding: 15px 10px 15px 10px;
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: normal;
        }

        .task-form__input::placeholder {
          color: var(--background-color);
        }

        ul {
          padding: 0;
          list-style-type: none;
        }

        .empty-state {
          background-color: var(--background-color);
          border-radius: var(--border-radius);
          margin-top: 10px;
          padding-bottom: 1px;
          display: flex;
          flex-direction: column;
          align-items: center;
          align-content: center;
          color: var(--primary-color);
        }

        .empty-state svg {
          width: 120px;
          height: 120px;
          stroke: var(--primary-color);
          stroke-width: 0.4;
          stroke-linecap: square;
          stroke-linejoin: miter;
          fill: none;
          color: var(--primary-color);
        }
      `}</style>
    </>
  );
}
