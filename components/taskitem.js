import React from "react";
import styles from "../styles/TaskItem.module.css";

export default function TaskItem({ text, checked, id, handleDelete }) {
  const [done, setDone] = React.useState(checked);

  const handleSetDone = (event) => {
    setDone(!done);
  };

  return (
    <div className={styles.global}>
      <li className={styles.listTaskItem} data-key={id}>
        <input
          className={styles.inputCheckbox}
          id={id}
          type="checkbox"
          onClick={handleSetDone}
        />
        <label htmlFor={id} className={styles.listTaskLabel}>
          <svg className={styles.svg}>
            <rect width="18" height="18" x="3" y="3" />
            <path
              title="Task Checkmark"
              className={
                done
                  ? styles.listTaskCheckmarkChecked
                  : styles.listTaskCheckmark
              }
              d="M6.66666 12.6667L9.99999 16L17.3333 8.66669"
              strokeDasharray="16"
              strokeDashoffset="16"
            />
          </svg>
        </label>
        <span
          title="Task Item"
          className={done ? styles.listTaskTextCrossed : styles.listTaskText}
        >
          {text}
        </span>
        <button
          className={styles.listTaskButton}
          data-deleteid={id}
          onClick={handleDelete}
        >
          <svg className={styles.listTaskButtonSVG}>
            <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339" />
            <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z" />
          </svg>
        </button>
      </li>
    </div>
  );
}
