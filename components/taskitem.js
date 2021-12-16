import React from "react";

export default function TaskItem({ text, checked, id, handleDelete }) {
  const [done, setDone] = React.useState(checked);

  const handleSetDone = (event) => {
    setDone(!done);
  };

  return (
    <>
      <li className="list__task-item" data-key={id}>
        <input id={id} type="checkbox" onClick={handleSetDone} />
        <label htmlFor={id} className="list__task-label">
          <svg className="list__task-checkbox">
            <rect
              className="list__task-box"
              width="18"
              height="18"
              x="3"
              y="3"
            />
            <path
              className={
                done
                  ? "list__task-checkmark list__task-checkmark_checked"
                  : "list__task-checkmark"
              }
              d="M6.66666 12.6667L9.99999 16L17.3333 8.66669"
              strokeDasharray="16"
              strokeDashoffset="16"
            />
          </svg>
        </label>
        <span
          className={
            done ? "list__task-text list__task-text_crossed" : "list__task-text"
          }
        >
          {text}
        </span>
        <button
          className="list__task-button"
          data-deleteid={id}
          onClick={handleDelete}
        >
          <svg>
            <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339" />
            <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z" />
          </svg>
        </button>
      </li>
      <style jsx>{`
        * {
          box-sizing: inherit;
        }

        input[type="checkbox"] {
          display: none;
        }

        svg {
          width: 24px;
          height: 24px;
          stroke: var(--primary-color);
          stroke-width: 2;
          stroke-linecap: square;
          stroke-linejoin: miter;
          fill: none;
          color: var(--primary-color);
        }

        .list__task-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--border-radius);
          padding: 8px 10px 8px 10px;
          background-color: var(--background-color);
          color: #000000;
          font-size: 16px;
          font-weight: normal;
          margin: 3px 0 3px 0;
        }

        .list__task-label {
          border: none;
          background-color: transparent;
          outline: none;
          cursor: pointer;
        }

        .list__task-checkmark {
          transition: stroke-dashoffset 0.1s linear;
        }

        .list__task-checkmark_checked {
          stroke-dashoffset: 0;
        }

        .list__task-text {
          width: 100%;
          padding-left: 7px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .list__task-text_crossed {
          text-decoration: line-through;
        }

        .list__task-button {
          border: none;
          background-color: transparent;
          outline: none;
          cursor: pointer;
          padding: 0;
        }

        .list__task-button svg {
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
